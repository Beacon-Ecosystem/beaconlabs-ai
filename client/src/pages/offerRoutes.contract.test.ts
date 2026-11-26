import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const src = (p: string) => readFileSync(resolve(process.cwd(), p), "utf8");

describe("Beacon Labs three-door site (Nov 2026 cleanup)", () => {
  it("redirects the retired catalog and funnel routes", () => {
    const app = src("client/src/App.tsx");
    for (const route of ["/pricing", "/services", "/ecommerce", "/coaches", "/growth-blueprint", "/blueprint-thank-you"]) {
      expect(app).toMatch(new RegExp(`path=\\{"${route}"\\}>\\s*<Redirect`));
    }
    for (const f of ["PricingPage", "GrowthBlueprint", "BlueprintThankYou", "Ecommerce", "Coaches", "Services"]) {
      expect(existsSync(resolve(process.cwd(), `client/src/pages/${f}.tsx`))).toBe(false);
    }
  });

  it("shows the three approved offers and no performance or call promises", () => {
    const home = src("client/src/pages/Home.tsx");
    const sc = src("client/src/pages/SignalCheck.tsx");
    const offers = src("client/src/lib/offers.ts");
    expect(home).toContain("Signal Check Working Session");
    expect(home).toContain("90-Day Operator Engagement");
    expect(home).toContain("$15,000");
    expect(home).toContain("$6,000 a month");
    expect(home).toContain("within five business days");
    expect(offers).toContain("PLACEHOLDER: BOB PASTES THE STRIPE PAYMENT LINK HERE");
    const all = home + sc + src("client/src/components/Navbar.tsx") + src("client/src/components/Footer.tsx");
    for (const banned of ["ROAS", "Strategy Call", "strategy call", "24/7", "Slack channel", "discovery call", "guarantee", "does not begin an automatic scan"]) {
      expect(all).not.toContain(banned);
    }
  });

  it("retires the Blueprint checkout and audit API", () => {
    const server = src("server/index.ts");
    expect(server).not.toContain("paymentIntents.create");
    expect(server).toContain('app.all(["/api/blueprint/*", "/api/audit"]');
    expect(src("ops/nginx/beaconlabs-ai.conf")).toMatch(/location = \/api\/generate-report-page \{\s*return 410;/);
  });
});
