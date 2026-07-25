# Beacon Labs Signal Check Recovery and GitHub Access Record — July 25, 2026

> This is the final operational record for the free Signal Check recovery. It intentionally excludes credentials, secret values other than the verified non-sensitive host address, and any customer data.

## Verified outcome

| Area | Final state | Verification |
|---|---|---|
| Canonical source | Recovery commit `a036fb8` is on `Beacon-Ecosystem/beaconlabs-ai` `main`. | Local TypeScript check and production build passed before delivery. |
| Connector scope | The Manus Connector GitHub App is installed for `Beacon-Ecosystem` and restricted to exactly `Beacon-Ecosystem/beaconlabs-ai`. | Organization installation settings confirmed **Only select repositories** with one selected repository. |
| Initial CI/CD failure | The first deployment attempt, GitHub Actions run `30176900800`, built successfully but timed out in the SSH deployment step. | The production origin was reachable directly, so the failure was not a server outage. |
| CI/CD correction | `BEACON_WEB_PRODUCTION_IP` was updated through the owner-authorized GitHub UI to the verified production origin `159.203.81.39`; the SSH-key secret was not changed. | The re-run of `30176900800` completed with **success**. |
| Production API | `POST https://beaconlabs.ai/api/signal-check` reaches the restored Express route. | A deliberately invalid `{}` payload returned JSON validation status **400**, rather than the prior 404, and could not create a GHL contact or opportunity. |

## Recovery chronology

The public Signal Check form was already implemented to send its intake payload to `/api/signal-check`, but the server route had been absent from the active production process. The recovered route validates `firstName`, `lastName`, `email`, and `businessName`; cleans optional intake fields; and only then creates the configured GHL contact and Signal Check opportunity.

The canonical recovery was pushed only after local type and production-bundle validation. The first workflow run completed its build but could not establish its SSH connection. A controlled manual deployment aligned `/var/www/beaconlabs-ai` to canonical `main`, rebuilt the application, and restarted the existing `beaconlabs` PM2 process. Restarting that process was necessary because it was serving an in-memory pre-recovery bundle from `/var/www/beaconlabs-ai/dist/index.js`.

After owner authorization, the repository deployment-host secret was corrected to the confirmed origin and the original workflow was re-run. The retry completed successfully, restoring the normal GitHub-to-production delivery path for subsequent commits. The public endpoint was then rechecked through Cloudflare and returned the expected validation response.

## Scope safeguards

No valid public-form submission was sent during verification. No GHL contact, opportunity, or report was intentionally created by the validation request. The optional paid $297 expanded Signal Check stage remains unstarted; this record covers only the restored free intake and its deployment path.

## Reference

The successful workflow attempt is retained in GitHub Actions: [Build and Deploy to Beacon-Web-Production, run `30176900800`](https://github.com/Beacon-Ecosystem/beaconlabs-ai/actions/runs/30176900800).
