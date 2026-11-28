// Manual re-run of the Signal Check first-read pipeline for ONE saved request, for testing or after an outage.
//   node dist/replay-signal-check.js --row 3 --only-email someone@example.com [--dry]
// Safety: it refuses unless --only-email matches the saved row's address exactly, and it only ever emails that address.
// The same-day duplicate guard still applies (it reads intake/signal-check-replies.jsonl).
import fs from "fs";
import path from "path";
import { processSignalCheck, buildEmail, readSite, localFirstRead, siteHost, signalCheckIpHash } from "./signalCheckReply";

const arg = (k: string) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : ""; };
const row = Number(arg("--row")); const only = (arg("--only-email") || "").trim().toLowerCase(); const dry = process.argv.includes("--dry");
if (!row || !only) { console.error("usage: --row N --only-email addr [--dry]"); process.exit(2); }
const lines = fs.readFileSync(path.join(process.cwd(), "intake", "labs-intake.jsonl"), "utf8").split("\n").filter(Boolean);
const d = JSON.parse(lines[row - 1] || "null");
if (!d || d.kind !== "Free Signal Check request") { console.error("row is not a Signal Check request"); process.exit(2); }
if (String(d.email).toLowerCase() !== only) { console.error("refusing: --only-email does not match that row"); process.exit(3); }
const s = { firstName: d.firstName || "", lastName: d.lastName || "", email: String(d.email).toLowerCase(), businessName: d.businessName || "", website: d.website || "",
  industry: d.industry || "", description: d.description || "", consentToContact: d.consentToContact === true };
if (!s.consentToContact) { console.error("refusing: no recorded consent"); process.exit(3); }
if (dry) {
  const site = await readSite(s.website); const m = site.facts ? await localFirstRead(s, site.facts) : { read: null, ms: 0, error: site.error };
  const mail = buildEmail(s, siteHost(s.website), m.read, "it didn't answer in time");
  console.log(JSON.stringify({ dry: true, siteOk: !!site.facts, model_ms: m.ms, error: m.error }), "\n" + mail.subject + "\n\n" + mail.text);
} else {
  const ipHash = await signalCheckIpHash("replay-row-" + row);
  console.log(JSON.stringify(await processSignalCheck(s, { ipHash, userAgent: "replay-cli", source: d.source || "beaconlabs.ai/signal-check" })));
}
