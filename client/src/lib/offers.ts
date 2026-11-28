/*
 * Beacon Labs offers: the three doors approved Nov 26, 2026.
 * Edit prices and links here only.
 */

// Working Session checkout stays on beaconlabs.ai (/working-session/): Stripe's Payment Element runs on our page and
// Stripe processes the payment; the price is fixed on the server ($197 until 12:01 AM ET Dec 12, 2026, then $297). Nov 27, 2026.
// The earlier buy.stripe.com Payment Link was retired because Beacon does not send buyers to Stripe-hosted pages.
export const WORKING_SESSION_PAYMENT_LINK = "/working-session/";

export const CONTACT_EMAIL = "hello@beaconlabs.ai";

// Black Friday: $100 off. $197 instead of $297, from 12:01 AM ET Nov 27 until 12:01 AM ET Dec 12, 2026 (= 2026-12-12T05:01:00Z).
// Must match ONSITE_LABS_BF_ENDS in the guides-store onsiteCheckout.ts. No sales cap (Bob, Nov 27).
export const BLACK_FRIDAY_ENDS_AT = Date.parse("2026-12-12T05:01:00Z");
export const isBlackFriday = (now: number = Date.now()) => now < BLACK_FRIDAY_ENDS_AT;

export const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

export const workingSessionHref = () =>
  WORKING_SESSION_PAYMENT_LINK ||
  mailto("Signal Check Working Session");

export const whatHappensNext = [
  "I read what you sent within one business day.",
  "If I can help, I tell you so and when you'll hear back. If I can't, I tell you that too.",
  "You get my findings in writing. Nothing is charged, and nothing starts, unless you choose it.",
];

export const wontDo = [
  "Promise rankings, traffic, ad returns or revenue. Nobody honest can.",
  "Put you on a standing weekly call.",
  "Put your data into public AI services or sell it.",
  "Start work or charge you without a clear yes from you.",
];
