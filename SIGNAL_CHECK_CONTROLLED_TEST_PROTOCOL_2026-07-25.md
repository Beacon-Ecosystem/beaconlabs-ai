# Beacon Labs Signal Check — Controlled Test Protocol

**Purpose.** This protocol governs one controlled production submission for the free Beacon Labs Signal Check. It validates the current intake-to-CRM behavior without treating the public form as ready for broad promotion or for the optional $297 expanded Signal Check.

## Scope and safeguards

The test must use one owner-approved, clearly labeled identity and an email inbox the owner can inspect. The submission must identify itself as an internal test in the business name and description. It will create or update a real GoHighLevel contact and create a zero-value, open opportunity if the live route succeeds. It must not use a customer, prospect, payment method, or an unapproved email address.

| Control | Required condition |
|---|---|
| Test identity | First name `Beacon`, last name `QA`, business name beginning `INTERNAL TEST — Signal Check` |
| Email destination | Owner-approved monitored test inbox; never a prospect or fabricated mailbox |
| Website | `https://beaconlabs.ai` or another owner-approved public test URL |
| Marketing source | `src=QA-CONTROLLED-20260725` so the submission is traceable without impersonating a campaign lead |
| Payment | None; this is a free intake test only |
| CRM retention | Preserve the test record until evidence is reviewed; then owner decides whether to retain, close, tag, or delete it |

## Expected live behavior

The current `POST /api/signal-check` route validates `firstName`, `lastName`, `email`, and `businessName`; creates or reuses a GHL contact; applies the `signal-check-requested`, `free-signal-check`, and `beacon-labs` tags plus the source tag; then creates a zero-value open opportunity in the configured Signal Check Requested stage. A successful request returns HTTP `201` with `{ "success": true, "status": "requested" }`.

The controlled test must capture the HTTP status and response, the CRM contact identity, contact tags/source, the opportunity identity/pipeline/stage/value, and any server-side error output. A pre-existing safe invalid-payload probe returning HTTP `400` documents the input-validation path and must not be repeated with a valid identity until owner confirmation.

## Current readiness findings

| Area | Observed current state | Test interpretation |
|---|---|---|
| CRM intake | The active route owns GHL contact and opportunity creation. | Testable through one approved production submission. |
| Report delivery | The active server source has no implemented report-generation, SendGrid-send, or completion-callback path for this route. | A CRM success does **not** prove report delivery; report delivery remains an open release gate. |
| Consent | The public form has no affirmative consent control. | Do not treat a successful test as consent readiness for a real prospect campaign. |
| Privacy notice | The Signal Check form has only a short “no cost / no obligation” statement and the tracked app has no dedicated privacy-policy route. | Do not publish or scale the paid expansion until approved privacy/disclosure controls are added. |
| CRM inspection | The current HighLevel connector lacks access to the Beacon AI Labs location; production may still use its separate service credential. | Capture server-side outcome and obtain proper CRM-location access before relying on connector-based evidence. |

## Go / no-go evidence

The test is a **partial pass** only if the live endpoint returns HTTP `201` and evidence confirms the correct contact and $0 opportunity. It remains a **no-go for broad free promotion or the $297 stage** unless all three release gates below are addressed:

1. The report-generation and delivery workflow must have an owned, observable queue and a confirmed delivery outcome.
2. The public form must have approved affirmative consent and linked privacy/disclosure controls appropriate to the data collected and future communications.
3. Authorized CRM access must permit verification of contact, opportunity, attribution, and any downstream report-completion status without relying solely on server logs.

## Execution sequence

1. Obtain the owner’s confirmation of the exact test inbox and permission to create the test CRM record.
2. Submit the controlled payload through the public HTTPS endpoint.
3. Record the response and retrieve the GHL contact/opportunity evidence using authorized access or production logs.
4. Verify that no report-delivery claim is marked complete unless a verifiable delivery artifact exists.
5. Document results, decide test-record disposition, and retain the protocol and results in the canonical repository.

## Controlled execution record — 2026-07-25

The owner approved a monitored test inbox and authorized one live CRM record. Before submission, the authenticated Beacon Labs HighLevel opportunity view showed the `Signal Check Requested` stage and zero current opportunities. The production `POST /api/signal-check` submission returned **HTTP 201**, confirming that the live intake accepted the controlled payload and completed its server-side success path.

Direct CRM contact and opportunity inspection remains in progress. The active server still has no observable report-generation or email-delivery action for this route; therefore, this HTTP success must not be interpreted as report delivery, paid-stage readiness, or broad-promotion approval.

The owner’s authenticated HighLevel browser session is available in the correct Beacon Labs location. Its opportunity view previously exposed the configured `Signal Check Requested` stage, while the Contacts Smart List interface did not finish rendering its searchable table during the initial inspection. The next verification step is therefore limited to confirming the controlled opportunity in the working Opportunities view or through a read-only production-side CRM lookup.

## CRM evidence observed after submission

The controlled record resolved to the owner-approved existing Beacon Labs contact and displayed all expected intake tags: `signal-check-requested`, `free-signal-check`, `beacon-labs`, and the traceability tag beginning `signal-source-qa-controlled-20260725`. This verifies contact reuse, source-tag application, and the contact-side attribution path.

The associated zero-value opportunity was visible with source `beaconlabs.ai/signal-check`, but appeared in the `New Inquiry` stage of the visible `[ARCHIVED] Beacon Labs AI Services` pipeline rather than in the intended `Signal Check Requested` stage. This is a verified CRM-attribution discrepancy and a **no-go** for a final pass until the active pipeline/stage identifiers are reconciled and a follow-up controlled validation is completed.

The authenticated HighLevel pipeline inventory shows that the visible legacy Beacon Labs pipeline is explicitly named `[ARCHIVED] Beacon Labs AI Services` and contains ten stages, while `BL_Delivery` and `BL_Sales` are the currently named non-archived pipelines. The deployed server’s hard-coded Signal Check pipeline/stage identifiers must therefore be reconciled against the chosen active operating pipeline before the next validation; the existing opportunity must not be treated as correctly staged simply because it was created successfully.

Read-only inspection confirmed that `BL_Delivery` is a delivery-workflow pipeline with stages `BL_Kickoff`, `BL_In_Progress`, `BL_Review`, `BL_Revision`, `BL_Delivered`, and `BL_Support`. It does not contain an intake-stage equivalent to `Signal Check Requested`, so it is not an appropriate drop-in target for the free Signal Check form without an explicit process redesign.

Read-only inspection also confirmed that `BL_Sales` contains the active sales sequence `BL_New_Lead`, `BL_Discovery_Booked`, `BL_Qualified`, `BL_Proposal_Sent`, `BL_Negotiation`, `BL_Closed_Won`, and `BL_Closed_Lost`. Of the currently available active stages, `BL_New_Lead` is the only plausible existing intake destination. Selecting it would be a business-process decision; it should not be inferred automatically from the legacy `Signal Check Requested` label.

Following owner approval of the dedicated-path option, the Beacon Labs CRM was updated to create an active `BL_Signal_Check` pipeline. The confirmed creation flow specified four explicit stages: `SC_Requested`, `SC_In_Review`, `SC_Delivered`, and `SC_Follow_Up`. The CRM confirmed creation of the named pipeline with four stages; the next control is to re-open it, capture the actual pipeline/stage identifiers, and configure the public intake from those identifiers rather than the legacy archived values.

Read-only CRM metadata confirmed the active `BL_Signal_Check` pipeline identifier is `FvAibf6Jpluw7IaL5OHq` and its requested-intake stage identifier is `d6aa566d-b1ac-441b-80e7-48dd488f1a8a`. The canonical intake source and PM2 configuration now use these values as explicit active defaults, while still allowing intentional environment overrides. They do not fall back to the archived legacy pipeline or stage.

The same source-controlled remediation adds required affirmative consent to the public request, records that consent with the CRM request context, exposes a public operational Privacy Notice, and removes unimplemented automatic scan, report, email, and 24-hour delivery promises. These changes require deployment and a second controlled verification before the CRM-routing gate can be marked passed.

During the first post-change public consent probe, the endpoint returned `502` rather than the expected consent-validation response. The completed GitHub Actions deployment had rebuilt and reloaded Nginx but had not reloaded the active `beaconlabs` PM2 Express process, so server-owned API changes could remain stale while the static client changed. The canonical deployment workflow now reloads (or starts) the `beaconlabs` PM2 process with `--update-env` after each successful build. The consent and routing gate remains unverified until that workflow update deploys successfully and the public endpoint is retested.

The scoped connector can update application content but cannot push workflow files without GitHub `workflows` permission. Following explicit owner confirmation, the narrowly reviewed workflow correction is being committed through the authenticated repository-owner browser session; no other workflow, credential, CRM, or payment setting is changed by that fallback.

After the corrected workflow completed successfully, a consent-negative production probe returned HTTP 400 before CRM processing. The subsequent owner-approved positive QA request returned HTTP 201. The HighLevel Opportunities board initially opened on the legacy archived pipeline and displayed the original `INTERNAL TEST — Signal Check` record in `New Inquiry`; the dedicated `BL_Signal_Check` board must be selected explicitly to verify the new record rather than treating this default board view as a routing failure.

The interactive board retained its archived-pipeline default during follow-up inspection, so final routing evidence will be obtained from the dedicated pipeline selection or a credential-safe read-only metadata query rather than inferred from the default board.

The dedicated-pipeline board was opened directly using pipeline identifier `FvAibf6Jpluw7IaL5OHq`; the authenticated interface was still loading at the time of inspection, so no final placement conclusion has been recorded from that screen yet.

Final CRM routing verification passed: the owner-approved positive QA request appears in active `BL_Signal_Check` at `SC_Requested` as one $0 opportunity, with `beaconlabs.ai/signal-check` shown as its source. The legacy `INTERNAL TEST — Signal Check` record remains separately visible in the archived pipeline and is the only controlled record awaiting the approved migration.

For the approved legacy-record migration, the current official HighLevel contract was reviewed at <https://marketplace.gohighlevel.com/docs/ghl/opportunities/update-opportunity/>. It documents `PUT https://services.leadconnectorhq.com/opportunities/:id` with API version `v3`, supporting an explicit `pipelineId`, `pipelineStageId`, `status`, and `monetaryValue`; the migration will preserve the record as open and $0 while moving it to the dedicated requested stage.

The authorized legacy QA opportunity was identified as `PPnDCDbTqNxjsssKtp0y` and opened directly in the authenticated CRM after its API migration attempt returned a validation error. UI-based migration is being used as the safe fallback.

The production HighLevel API accepted the established `2021-07-28` version header for the update route but returned `422` when `locationId` was supplied (`property locationId should not exist`). The next approved migration attempt will omit that unsupported field while retaining the exact opportunity ID, dedicated pipeline and requested-stage IDs, open status, $0 value, and existing record name.

The final API migration attempt without `locationId` was rejected with `400 Can not create duplicate opportunity for the contact.` The new QA opportunity is already correctly present in `BL_Signal_Check → SC_Requested`; the legacy $0 QA opportunity remains open in the archived pipeline and must be manually moved, closed, or deleted through the HighLevel interface. No further API migration retries will be made.

At the owner’s direction, the legacy QA opportunity’s displayed primary email was updated in the authenticated HighLevel interface to the approved secondary test address and saved successfully. The opportunity remains the same $0 internal test record; its archived pipeline and `New Inquiry` stage have not been changed by that email update.

The owner-approved manual pipeline reassignment then selected `BL_Signal_Check → SC_Requested`, but HighLevel blocked saving it with `Duplicate opportunity detected`: the contact already has the final QA opportunity in the dedicated pipeline. The interface offered enabling account-wide duplicate opportunities, but that global setting has not been changed. The pending legacy migration therefore remains unsaved.

The owner subsequently deleted the redundant legacy QA opportunity. Authenticated HighLevel board verification at `https://app.gohighlevel.com/v2/location/Z4OoFmxrotxASibl2PKv/opportunities?pipelineId=FvAibf6Jpluw7IaL5OHq` shows exactly one remaining opportunity: `Beacon QA — Signal Check (INTERNAL QA — Signal Check)` in `BL_Signal_Check → SC_Requested`, open at `$0.00`. The other dedicated stages (`SC_In_Review`, `SC_Delivered`, and `SC_Follow_Up`) each show zero opportunities.

## Fulfillment and parallel-intake release controls — 2026-07-25

Read-only production inspection found no deployed `fulfillment_pipeline.py`, no Signal Check fulfillment worker process, no Signal Check systemd service, and no Signal Check scheduler. The live `beaconlabs` PM2 process has explicit CRM-routing configuration but no configured scan-orchestration or report-delivery runtime path.

An existing production `pdf-service` is online and exposes `POST /api/generate-signal-check-pdf`. Its visible handler accepts a prospect/company/website/industry and score payload, writes a generated PDF to the public Beacon Labs reports directory, and returns a public report URL plus a base64 payload. It is a rendering component only: it does not establish request ownership, queue state, reviewer approval, CRM completion state, outbound email delivery, delivery-event evidence, or a privacy-safe failure notification. The visible service setup also does not show request-authentication middleware. It must not be treated as an independently safe public fulfillment API without a reviewed access and delivery design.

The public legacy `/audit` page remains a separate, published Signal Check-like intake. It posts directly to `/api/contact`, lacks affirmative consent and a linked privacy control, and makes unverified promises that AI/strategist review and email delivery will occur within 24 hours. It therefore bypasses the validated `/signal-check` consent gate and dedicated `BL_Signal_Check` routing. Before broad free promotion or any paid expansion, this parallel route must be retired, redirected to `/signal-check`, or rebuilt to use the same consent, privacy, CRM, and delivery controls; its unsupported delivery claims must not remain public.

The remaining release gates are: (1) establish an owned fulfillment worker or queue that produces bounded report data, (2) use the PDF renderer behind authenticated internal orchestration only if its access model is approved, (3) send through a monitored delivery channel and store delivery state in `SC_Delivered`, (4) create a staff exception path and privacy-safe applicant notification for failures, and (5) consolidate `/audit` behind the validated intake before publishing either free or $297 expansion traffic.
