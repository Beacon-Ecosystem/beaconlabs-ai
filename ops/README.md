# Beacon Labs Production Operations

The authoritative source repository is deployed to `/var/www/beaconlabs-ai` on the Beacon Brands Hub. The public site is served by Nginx from `dist/public`, while the `beaconlabs` PM2 process on port `3025` owns the application APIs.

Before a release, pull the approved GitHub commit on the origin, run `pnpm build`, and restart only the `beaconlabs` process. Verify `/`, `/pricing`, `/services`, `/signal-check`, and the required static bundle at the origin before reporting the release complete.

The canonical virtual-host record is `ops/nginx/beaconlabs-ai.conf`. Its named `@beaconlabs_spa_entry` fallback is required for client-side routes. Do not replace it with a direct `/index.html` fallback without validating every client route, because a prior direct fallback generated an internal redirect cycle and returned a public 500 error for `/pricing`.
