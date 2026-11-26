/*
 * Beacon Labs offers: the three doors approved Nov 26, 2026.
 * Edit prices and links here only.
 */

// >>> PLACEHOLDER: BOB PASTES THE STRIPE PAYMENT LINK HERE <<<
// Create in Stripe: one-time product "Signal Check Working Session (Black Friday)", $197,
// limit 5 payments, custom fields "Business website" and "Your one question".
// While this stays empty, the Working Session button opens a pre-filled email instead
// of a checkout, so nothing on the page is broken.
export const WORKING_SESSION_PAYMENT_LINK = "";

export const CONTACT_EMAIL = "hello@beaconlabs.ai";

// Black Friday rate shows through Mon Dec 1, 2026, 11:59 PM ET (Dec 2, 04:59 UTC).
export const BLACK_FRIDAY_ENDS_AT = Date.parse("2026-12-02T04:59:59Z");
export const isBlackFriday = (now: number = Date.now()) => now <= BLACK_FRIDAY_ENDS_AT;

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
