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

// ───────────────────────────────────────────────────────
// The Keeper's Log sign-up (Nov 27, 2026). Store only: no email is sent.
// Writes to the Beacon CRM Postgres on this Hub through crm.keepers_log_subscribe(),
// using the crm_keepers role, which can execute that one function and nothing else.
// Credentials come from /etc/beaconlabs-ai/keepers-log.env (root, mode 600), never from the repo.
// ───────────────────────────────────────────────────────
const KL_ENV_FILE = process.env.KEEPERS_LOG_ENV_FILE || "/etc/beaconlabs-ai/keepers-log.env";
const KL_CONSENT_TEXT =
  "The Keeper's Log is free. I only send it when there's something worth saying. By joining, you agree to receive it by email. You can unsubscribe at any time.";
let klCfg: { url: URL; salt: string } | null = null;
async function klConfig() {
  if (klCfg) return klCfg;
  const fs = await import("fs/promises");
  const vars: Record<string, string> = {};
  try {
    for (const line of (await fs.readFile(KL_ENV_FILE, "utf8")).split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m) vars[m[1]] = m[2];
    }
  } catch { /* fall through to process.env */ }
  const dbUrl = process.env.KEEPERS_LOG_DATABASE_URL || vars.KEEPERS_LOG_DATABASE_URL;
  const salt = process.env.KEEPERS_LOG_IP_SALT || vars.KEEPERS_LOG_IP_SALT;
  if (!dbUrl || !salt) throw new Error("Keeper's Log sign-up is not configured.");
  klCfg = { url: new URL(dbUrl), salt };
  return klCfg;
}
const klHits = new Map<string, number[]>();
let klGlobal: number[] = [];
function klRateLimited(key: string) {
  const now = Date.now();
  const mine = (klHits.get(key) || []).filter((t) => now - t < 10 * 60 * 1000);
  klGlobal = klGlobal.filter((t) => now - t < 60 * 60 * 1000);
  if (mine.length >= 5 || klGlobal.length >= 300) { klHits.set(key, mine); return true; }
  mine.push(now); klGlobal.push(now); klHits.set(key, mine);
  if (klHits.size > 5000) for (const [k, v] of klHits) if (!v.some((t) => now - t < 10 * 60 * 1000)) klHits.delete(k);
  return false;
}
async function klSubscribe(f: { email: string; name: string; source: string; ipHash: string; userAgent: string; isTest: boolean }) {
  const { execFile } = await import("child_process");
  const { url } = await klConfig();
  const sql = "SELECT contact_created FROM crm.keepers_log_subscribe(:'email', :'name', :'source', true, :'consent', :'iphash', :'ua', :'is_test'::boolean);\n";
  const args = [
    "-X", "-q", "-At", "-v", "ON_ERROR_STOP=1",
    "-h", url.hostname, "-p", url.port || "5432", "-U", decodeURIComponent(url.username), "-d", url.pathname.replace(/^\//, ""),
    "-v", `email=${f.email}`, "-v", `name=${f.name}`, "-v", `source=${f.source}`, "-v", `consent=${KL_CONSENT_TEXT}`,
    "-v", `iphash=${f.ipHash}`, "-v", `ua=${f.userAgent}`, "-v", `is_test=${f.isTest ? "true" : "false"}`, "-f", "-",
  ];
  return new Promise<string>((resolve, reject) => {
    const child = execFile("psql", args, { timeout: 8000, env: { PATH: process.env.PATH || "/usr/bin:/bin", PGPASSWORD: decodeURIComponent(url.password), PGCONNECT_TIMEOUT: "5" } },
      (err, stdout) => (err ? reject(new Error("keepers-log store failed")) : resolve(String(stdout).trim())));
    child.stdin?.end(sql);
  });
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

  // ───────────────────────────────────────────────────────
  // The Keeper's Log sign-up. Honeypot, rate limit, server-side validation; dedupe is on email in the CRM.
  // Answers the same for new and existing addresses so the form cannot be used to check who is subscribed.
  // ───────────────────────────────────────────────────────
  app.post("/api/keepers-log/subscribe", async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    try {
      const b = (req.body && typeof req.body === "object" ? req.body : {}) as Record<string, unknown>;
      const str = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "");
      const crypto = await import("crypto");
      const { salt } = await klConfig();
      const ip = String(req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.socket.remoteAddress || "");
      const ipHash = crypto.createHmac("sha256", salt).update(ip).digest("hex");
      if (klRateLimited(ipHash)) {
        res.status(429).json({ ok: false, error: "too_many_attempts" });
        return;
      }
      // Honeypot: real visitors never see or fill this field. Pretend success, store nothing.
      if (str(b.website, 200) || str(b.company_url, 200)) {
        res.json({ ok: true });
        return;
      }
      const email = str(b.email, 254).toLowerCase();
      if (!/^[^\s@,;<>()"]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(email) || email.length > 254 || email.split("@")[0].length > 64) {
        res.status(400).json({ ok: false, error: "invalid_email" });
        return;
      }
      if (b.consent !== true) {
        res.status(400).json({ ok: false, error: "consent_required" });
        return;
      }
      const page = str(b.source, 120);
      const source = "beaconlabs.ai" + (/^\/[a-z0-9\-\/]*$/i.test(page) ? page : "");
      await klSubscribe({
        email,
        name: str(b.name, 100),
        source,
        ipHash,
        userAgent: str(req.headers["user-agent"], 300),
        isTest: /^test\+[a-z0-9._-]+@beaconmomentum\.com$/.test(email),
      });
      res.json({ ok: true });
    } catch (err) {
      console.error("Keeper's Log sign-up error:", err instanceof Error ? err.message : "unknown");
      res.status(503).json({ ok: false, error: "temporarily_unavailable" });
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
