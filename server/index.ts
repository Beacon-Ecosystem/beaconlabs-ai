import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GHL_PIT = process.env.GHL_API_KEY || "";
const GHL_LOCATION_ID = "Z4OoFmxrotxASibl2PKv"; // Beacon AI Labs
// Active BL_Signal_Check routing. Environment values can override these
// versioned defaults after a deliberate CRM migration; never fall back to an
// archived pipeline or stage.
const GHL_SIGNAL_CHECK_PIPELINE_ID = process.env.GHL_SIGNAL_CHECK_PIPELINE_ID || "FvAibf6Jpluw7IaL5OHq";
const GHL_SIGNAL_CHECK_REQUESTED_STAGE_ID =
  process.env.GHL_STAGE_SIGNAL_CHECK_REQUESTED || "d6aa566d-b1ac-441b-80e7-48dd488f1a8a";




// ─────────────────────────────────────────────────────────────
// Nov 26, 2026: GoHighLevel is cancelled. Intake now goes by email to
// hello@beaconlabs.ai through SendGrid, with a local JSONL copy so
// nothing is lost if email fails.
// ─────────────────────────────────────────────────────────────
// hello@beaconlabs.ai bounced (550 address does not exist) on Nov 26, so intake also goes to admin@beaconmomentum.com.
const LABS_INTAKE_TO = (process.env.LABS_INTAKE_TO || "hello@beaconlabs.ai,admin@beaconmomentum.com").split(",").map((e) => e.trim()).filter(Boolean);
const LABS_INTAKE_FROM = process.env.LABS_INTAKE_FROM || "hello@beaconlabs.ai";
const LABS_INTAKE_LOG = process.env.LABS_INTAKE_LOG || path.join(process.cwd(), "intake", "labs-intake.jsonl");

async function recordLabsIntake(kind: string, fields: Record<string, unknown>) {
  const fs = await import("fs/promises");
  const entry = { kind, receivedAt: new Date().toISOString(), ...fields };
  let saved = false;
  try {
    await fs.mkdir(path.dirname(LABS_INTAKE_LOG), { recursive: true, mode: 0o700 });
    await fs.appendFile(LABS_INTAKE_LOG, JSON.stringify(entry) + "\n", { mode: 0o600 });
    saved = true;
  } catch (err) {
    console.error("[Intake] local save failed:", err);
  }
  let emailed = false;
  const key = process.env.SENDGRID_API_KEY || "";
  if (key) {
    const lines = Object.entries(fields)
      .map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`)
      .join("\n");
    const name = [fields.firstName, fields.lastName].filter(Boolean).join(" ");
    const replyTo =
      typeof fields.email === "string" && fields.email ? { email: fields.email, name: name || undefined } : undefined;
    try {
      const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          personalizations: [{ to: LABS_INTAKE_TO.map((email) => ({ email })) }],
          from: { email: LABS_INTAKE_FROM, name: "Beacon Labs intake" },
          ...(replyTo ? { reply_to: replyTo } : {}),
          subject: `[Beacon Labs] ${kind}: ${name || "new request"}${fields.businessName ? " — " + fields.businessName : ""}`,
          content: [
            {
              type: "text/plain",
              value: `${kind} received ${entry.receivedAt}\n\n${lines}\n\nReply to this email to answer the requester directly.`,
            },
          ],
        }),
      });
      emailed = res.ok;
      if (!res.ok) console.error("[Intake] SendGrid error:", res.status, (await res.text()).slice(0, 300));
    } catch (err) {
      console.error("[Intake] SendGrid request failed:", err);
    }
  } else {
    console.error("[Intake] SENDGRID_API_KEY missing; intake saved locally only.");
  }
  if (!saved && !emailed) throw new Error("Intake could not be saved or emailed.");
  return { saved, emailed };
}

async function createGHLContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  businessName?: string;
  industry?: string;
  website?: string;
  monthlyAdSpend?: string;
  investmentRange?: string;
  serviceInterest?: string;
  primaryGoal?: string;
  consentRecordedAt?: string;
  tags?: string[];
  source?: string;
}) {
  const payload: Record<string, unknown> = {
    locationId: GHL_LOCATION_ID,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    tags: data.tags || ["signal-check-request", "audit-form"],
    source: data.source || "beaconlabs.ai/audit",
  };

  if (data.phone) payload.phone = data.phone;
  if (data.businessName) payload.companyName = data.businessName;
  if (data.website) payload.website = data.website;

  // Add custom fields as notes
  const notes: string[] = [];
  if (data.industry) notes.push(`Industry: ${data.industry}`);
  if (data.monthlyAdSpend) notes.push(`Monthly Ad Spend: ${data.monthlyAdSpend}`);
  if (data.investmentRange) notes.push(`Package or investment range: ${data.investmentRange}`);
  if (data.serviceInterest) notes.push(`Package or service interest: ${data.serviceInterest}`);
  if (data.primaryGoal) notes.push(`Primary Goal: ${data.primaryGoal}`);
  if (data.consentRecordedAt) {
    notes.push(
      `Signal Check consent: confirmed for request-related contact and processing; privacy notice version signal-check-privacy-2026-07; recorded ${data.consentRecordedAt}.`
    );
  }

  const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GHL_PIT}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json() as Record<string, unknown>;

  if (!res.ok) {
    if (res.status === 400 && (json as any)?.meta?.contactId) {
      const existingId = (json as any).meta.contactId as string;
      console.log(`[GHL] Duplicate contact, using existing: ${existingId}`);
      await fetch(`https://services.leadconnectorhq.com/contacts/${existingId}`, { method: "PUT", headers: { Authorization: `Bearer ${GHL_PIT}`, Version: "2021-07-28", "Content-Type": "application/json" }, body: JSON.stringify({ tags: data.tags || ["signal-check-request", "audit-form"] }) });
      return { contact: { id: existingId } };
    }
    throw new Error(`GHL API error: ${res.status} - ${JSON.stringify(json)}`);
  }

  // If there are notes, add them to the contact
  if (notes.length > 0 && json.contact) {
    const contact = json.contact as Record<string, unknown>;
    const contactId = contact.id as string;
    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GHL_PIT}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: contactId,
        body: notes.join("\n"),
      }),
    });
  }

  return json;
}

async function createGHLSignalCheckOpportunity(data: {
  contactId: string;
  firstName: string;
  lastName: string;
  businessName: string;
}) {
  const response = await fetch("https://services.leadconnectorhq.com/opportunities/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GHL_PIT}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pipelineId: GHL_SIGNAL_CHECK_PIPELINE_ID,
      locationId: GHL_LOCATION_ID,
      pipelineStageId: GHL_SIGNAL_CHECK_REQUESTED_STAGE_ID,
      status: "open",
      contactId: data.contactId,
      monetaryValue: 0,
      source: "beaconlabs.ai/signal-check",
      name: `${data.firstName} ${data.lastName} — Signal Check (${data.businessName})`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GHL Signal Check opportunity error: ${response.status} - ${detail}`);
  }

  return response.json() as Promise<Record<string, unknown>>;
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // ─────────────────────────────────────────────────────────────
  // Audit / Signal Check form submission endpoint
  // ─────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────
  // Signal Check / Audit form — /api/contact
  // Called by Audit.tsx and Contact.tsx
  // ─────────────────────────────────────────────────────────────
  app.post("/api/contact", async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        company,
        website,
        service,
        budget,
        message,
      } = req.body;
      if (!firstName || !lastName || !email) {
        res.status(400).json({ error: "firstName, lastName, and email are required" });
        return;
      }
      await recordLabsIntake("Project inquiry", {
        firstName, lastName, email, phone, company, website, service, budget, message,
        source: "beaconlabs.ai/pricing",
      });
      res.json({ success: true });
    } catch (err) {
      console.error("Contact form error:", err);
      res.status(500).json({ error: "Failed to submit request. Please try again." });
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Free Signal Check — Stage 1 of the Beacon Labs B2B funnel.
  // The public page has always posted here; this tracked route restores
  // the server-owned CRM/report-queue handoff after a production 404.
  // ─────────────────────────────────────────────────────────────
  app.post("/api/signal-check", async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        businessName,
        website,
        industry,
        description,
        reelKeyword,
        consentToContact,
      } = req.body as Record<string, unknown>;

      const clean = (value: unknown, maxLength: number) =>
        typeof value === "string" ? value.trim().slice(0, maxLength) : "";

      const submission = {
        firstName: clean(firstName, 100),
        lastName: clean(lastName, 100),
        email: clean(email, 254).toLowerCase(),
        businessName: clean(businessName, 180),
        website: clean(website, 500),
        industry: clean(industry, 120),
        description: clean(description, 2_000),
        reelKeyword: clean(reelKeyword, 50).toLowerCase(),
        consentToContact: consentToContact === true,
      };

      if (!submission.firstName || !submission.lastName || !submission.email || !submission.businessName) {
        res.status(400).json({
          error: "firstName, lastName, email, and businessName are required.",
        });
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
        res.status(400).json({ error: "Please provide a valid email address." });
        return;
      }

      if (!submission.consentToContact) {
        res.status(400).json({
          error: "Please confirm consent for Beacon Labs to process and respond to this Signal Check request.",
        });
        return;
      }

      const consentRecordedAt = new Date().toISOString();
      await recordLabsIntake("Free Signal Check request", {
        ...submission,
        consentRecordedAt,
        source: "beaconlabs.ai/signal-check",
      });

      res.status(201).json({ success: true, status: "requested" });
    } catch (err) {
      console.error("Signal Check intake error:", err);
      res.status(502).json({
        error: "We could not queue your Signal Check. Please try again or contact Beacon Labs.",
      });
    }
  });

  // Retired Nov 26, 2026: the $997 Growth Blueprint checkout (/api/blueprint/*) and the
  // unused /api/audit GHL form. Answer 410 so old clients get a clear response.
  app.all(["/api/blueprint/*", "/api/audit"], (_req, res) => {
    res.status(410).json({ error: "This endpoint has been retired." });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
