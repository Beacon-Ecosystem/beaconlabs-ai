# Beacon Labs Signal Check — Canonical Implementation Baseline

**Status:** Free-intake route restored in canonical source and locally validated; CI/CD deployment and production verification remain required before paid-stage adaptation  
**Canonical repository:** `beaconmomentum-dev/beaconlabs-ai`  
**Date:** July 25, 2026

> The live free Signal Check is owned by the Beacon Labs application, but its current production submission route is broken. The paid expanded follow-up must extend the repaired Beacon Labs application; it must not be duplicated in the Beacon Momentum marketing site or implemented as a hosted-checkout redirect.

## Verified implementation facts

| Area | Existing canonical behavior | Required Signal Check adaptation |
|---|---|---|
| **Free intake page** | `client/src/pages/SignalCheck.tsx` renders the free Signal Check and posts to `POST /api/signal-check`. A no-data production health request on July 25, 2026 returned `404 Cannot POST /api/signal-check`. | Restore the free server route before exposing or adapting the paid follow-up. |
| **Actual production API owner** | Nginx proxies `/api/` to port `3025`, which is the PM2 `beaconlabs` process running `/var/www/beaconlabs-ai/dist/index.js`. The tracked `server/index.ts` currently has no `/api/signal-check` route. | Add the recovered free-intake route to the tracked main server (or a tracked module registered by it), then deploy through the canonical GitHub workflow. |
| **Legacy form handler** | `server/form-handler.mjs` contains an older free-intake/GHL pattern and is conditionally copied by the deployment workflow only if a `beaconlabs-form` process exists. The live process inventory did not show that service active. | Treat it as a reference implementation, not the active production source; migrate only the required server-owned validation and GHL-handoff behavior into tracked code. |
| **Payment UI precedent** | `client/src/pages/GrowthBlueprint.tsx` already uses embedded Stripe Elements and keeps the buyer on Beacon Labs. | Reuse the on-site branded interaction model for the $297 expanded follow-up. |
| **Existing payment-confirmation gap** | The separate Blueprint flow currently accepts a browser-triggered confirmation endpoint after client-side payment confirmation. | Do **not** use that browser confirmation as paid-work authority. Only a verified, signed processor webhook may create the paid state, receipt/report queue, CRM transition, or service-handoff eligibility. |
| **CRM handoff** | The legacy form-handler implementation uses server-side configuration to upsert the contact and create/update the Beacon Labs pipeline state. | Reuse the configured Beacon Labs location and add clearly differentiated free, paid-expanded, and services-interest lifecycle tags/stages after the free route is restored. |

## Required implementation controls

1. Create the payment intent server-side with the product amount fixed at **$297.00** and record the related Signal Check context as metadata.
2. Collect payment details in a Beacon-branded on-site embedded payment form. No hosted-checkout redirect is permitted.
3. Register a raw-body webhook route before ordinary JSON parsing, verify the processor signature, and make the fulfillment transition idempotent using durable payment-intent/event state.
4. On verified payment only, update the CRM lifecycle, create the paid report queue, send the receipt/confirmation, and expose the appropriate consent-based Beacon Labs service pathway.
5. Keep the initial Signal Check free and make the expanded follow-up optional. Neither must be presented as part of The Watch membership.

## Immediate recovery sequence

1. **Completed locally:** Port the free `POST /api/signal-check` validation and server-side GHL handoff from the legacy handler into the tracked Beacon Labs main server, without exposing credentials or relying on browser confirmation.
2. **Completed locally:** Add a no-data endpoint test proving invalid input is rejected by the restored route and cannot create a contact or report request.
3. **Next:** Commit, build, deploy through the existing GitHub workflow, and verify the live free form against the restored canonical route before adding any paid checkout surface.
4. Only after Stage 1 is verified may the project add the optional $297 on-site payment intent, signed webhook, idempotent paid state, and report-queue transition.

## Local validation completed

| Check | Result | Boundary preserved |
|---|---|---|
| `pnpm check` | Passed after resolving the committed branch's Stripe SDK API-version type mismatch and optional pricing-tier ceiling type mismatch. | No secret or live-service dependency was used. |
| `pnpm build` | Passed; Vite emitted an existing HTML parsing warning for the Meta Pixel `<noscript>` element and a bundle-size advisory, neither of which blocked the production artifact. | The tracked client and server bundle were produced successfully. |
| Invalid `POST /api/signal-check` | Returned HTTP `400` with required-field validation. | The request was rejected before CRM interaction. |
| Valid-format request with CRM credentials intentionally unset | Returned HTTP `503`. | No GHL contact, opportunity, report request, or external payment action was created. |

## Deployment boundary

All changes must follow the existing repository workflow: GitHub commit → CI/CD build and deploy → production service restart → end-to-end verification. Credentials, webhook secrets, and payment configuration remain server-only and are not recorded in this repository.
