# Beacon Labs Signal Check — Staged Fulfillment and Handoff Design

**Status:** Design and release-gate specification only. It does not authorize an outbound report email, a paid offer, or automated marketing.

## Purpose and operating boundary

This design completes the control model around the validated free Signal Check intake. A consented public request already creates a `$0` opportunity in the active `BL_Signal_Check → SC_Requested` stage. The next system must transform that request into a bounded, reviewable report only after durable job ownership, internal PDF rendering, monitored delivery evidence, and a safe exception path exist.

> The public free Signal Check remains a diagnostic request. It must not promise implementation, credentials access, guaranteed performance, or a paid upgrade. Any later `$297` expanded Signal Check remains separately gated.

## Verified current state

| Control | Current state | Design consequence |
|---|---|---|
| Public intake | `/signal-check` requires affirmative consent and routes consented requests to the active `BL_Signal_Check` pipeline. | Retain as the sole public request path. |
| Legacy parallel form | `/audit` previously bypassed the controlled intake and made unsupported delivery claims. | Redirect it to `/signal-check`; do not keep an independent form or promise. |
| CRM stages | `SC_Requested`, `SC_In_Review`, `SC_Delivered`, and `SC_Follow_Up` are active. | Treat these as the workflow state machine; do not use legacy archived pipeline identifiers. |
| PDF rendering | A production PDF renderer can create a report artifact from structured inputs. | Use it only behind authenticated internal orchestration; it is not the job owner or delivery system. |
| Existing legacy script | `fulfillment_pipeline.py` runs scan → PDF → CRM → SMTP, but is not deployed as a worker and contains stale commercial language. | Use as source material only; do not deploy it unchanged. |

## Target lifecycle

| Stage | Entry condition | Required work and evidence | Exit rule |
|---|---|---|---|
| `SC_Requested` | Consent-validated public request creates the `$0` opportunity. | Persist an immutable request ID, consent timestamp/version, normalized website URL, submitted scope, and initial owner. | A worker claims the job exactly once and records a run ID. |
| `SC_In_Review` | Worker claim succeeds. | Run bounded scan/research; validate output; render the report internally; retain job logs and report artifact metadata. | A human reviewer accepts the report or records an exception. |
| `SC_Delivered` | Reviewer approves and monitored transactional delivery succeeds. | Store delivery provider message ID, send timestamp, recipient, report artifact reference, and result. | Delivery evidence is present; no marketing sequence starts automatically. |
| `SC_Follow_Up` | Separate staff decision after delivery. | Record explicit authorized follow-up basis and assigned owner. | Proceed only under the approved outreach and privacy rules. |

## Required system components

| Component | Responsibility | Minimum control |
|---|---|---|
| Intake API | Validate consent; normalize fields; create/update contact and one `$0` opportunity; issue a request ID. | Idempotency key based on request ID; no CRM call when consent is absent. |
| Durable job store | Keep the request, run state, timestamps, retry count, report reference, delivery evidence, and exception reason. | A backed-up store owned by Beacon Labs; do not use transient process memory or untracked local files as the system of record. |
| Worker | Claim one request, perform bounded research/analysis, build structured report data, and transition state safely. | One active run per request; explicit timeout, retry ceiling, and audit log. |
| Internal PDF adapter | Submit reviewed structured report data to the existing renderer and store only the returned artifact reference. | Authenticated/internal-only access; no public unauthenticated report-generation endpoint. |
| Transactional delivery adapter | Send an approved report notification through the monitored Beacon Labs channel. | Store provider message ID and outcome before moving to `SC_Delivered`; no marketing email or offer copy by default. |
| GHL updater | Update the correct opportunity stage and record non-sensitive status metadata. | Use configured active pipeline/stage IDs; never fall back to archived pipeline IDs. |
| Staff exception queue | Surface scan, render, delivery, policy, or data-quality failures to a named owner. | Do not mark delivered on partial failure; notify the requester only through the approved transactional path. |

## Data and privacy controls

The public form should collect only the information required for the requested review: contact name, work email, business name, public website, optional business context, and recorded consent. The system should not request credentials, analytics access, payment data, or sensitive personal data for the free Signal Check.

The job store must separate operational metadata from report content. The report artifact should have a non-guessable reference, restricted internal generation access, an approved retention period, and a documented deletion procedure. The public PDF renderer’s current visible handler returns a public report URL and base64 payload; the new adapter should avoid exposing either directly to the browser and should not make report generation publicly callable without a reviewed access control.

The operational privacy notice is a working implementation artifact, not legal advice. Counsel must approve the final notice, terms, transactional-email language, retention schedule, and request/deletion process before broad public acquisition or a paid expansion.

## Exception and escalation contract

| Failure point | System action | CRM state | External communication |
|---|---|---|---|
| Invalid or missing consent | Reject before CRM creation. | No opportunity. | Inline form validation only. |
| Intake/CRM failure | Preserve request attempt and alert the assigned staff owner. | Remain out of delivery stages. | No unsupported success message. |
| Scan or report-quality failure | Stop automation and create a staff exception. | Keep `SC_In_Review`; add exception metadata. | Send only a vetted transactional status message if approved. |
| PDF-render failure | Preserve structured report data and retry under a bounded policy. | Keep `SC_In_Review`; add exception metadata. | No delivery claim. |
| Delivery failure or bounce | Record provider failure, stop stage progression, and route to staff. | Do not move to `SC_Delivered`. | Use the approved recovery process; do not expose internal error details. |

## Recommended implementation sequence

1. **Consolidate intake:** deploy the `/audit → /signal-check` redirect and verify that all public Signal Check traffic reaches the consent gate.
2. **Introduce request ownership:** add a durable request/job record plus a visible request ID and GHL status metadata. The deployed API should enqueue work rather than generate or email a report inside the request/response cycle.
3. **Build the worker:** adapt the existing research and PDF capabilities behind an internal job runner, replacing stale `fulfillment_pipeline.py` claims and direct SMTP assumptions with current approved configuration.
4. **Constrain PDF rendering:** put the renderer behind internal authentication or a localhost-only adapter, keep the raw report response off the public request path, and save only approved artifact metadata.
5. **Add controlled delivery:** use the approved monitored transactional channel, update GHL only after a successful provider response, and retain delivery evidence.
6. **Run one final QA flow:** use a clearly labeled test contact, verify all stage transitions and delivery evidence, then delete or close the QA record under the approved cleanup rule.

## Release gates

The free Signal Check may be broadly promoted only when all gates below are met.

| Gate | Evidence required |
|---|---|
| One public intake | `/audit` redirects to `/signal-check`; no parallel public form bypasses consent. |
| Consent and privacy | Consent version/timestamp is recorded; counsel-approved privacy and retention disclosures are live. |
| CRM integrity | The active pipeline/stage IDs are configuration-driven and a consented request lands in `SC_Requested`. |
| Fulfillment safety | One durable job owner, internal PDF authentication, a bounded retry policy, and named staff exception ownership are active. |
| Delivery evidence | Transactional delivery has a monitored result, a stored provider message ID, and a failure path. |
| QA evidence | A controlled test proves request → review → delivery → follow-up without unintended CRM duplication or unsupported public claims. |
| Paid expansion boundary | The approved `$297` scope, payment, consent, and post-payment access controls have separate owner approval and validation. |
