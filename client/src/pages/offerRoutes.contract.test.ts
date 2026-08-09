import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const readSource = (relativePath: string) =>
  readFileSync(resolve(process.cwd(), relativePath), "utf8");

describe("Beacon Labs public B2B offer routes", () => {
  it("registers and exposes the restored pricing and inquiry journey", () => {
    const app = readSource("client/src/App.tsx");
    const navbar = readSource("client/src/components/Navbar.tsx");
    const footer = readSource("client/src/components/Footer.tsx");
    const pricing = readSource("client/src/components/Pricing.tsx");
    const pricingPage = readSource("client/src/pages/PricingPage.tsx");

    expect(app).toContain('path={"/pricing"}');
    expect(navbar).toContain('{ label: "Packages", href: "/pricing" }');
    expect(footer).toContain('{ label: "Packages & pricing", href: "/pricing" }');
    expect(pricingPage).toContain("<Pricing />");
    expect(pricingPage).toContain("<Contact />");

    [
      "AI Automation",
      "Digital Infrastructure",
      "Enterprise AI",
      "Campaign Build",
      "Growth Retainer",
      "Full-Stack Growth",
      "$3,000",
      "$5,000",
      "$10,000",
    ].forEach((value) => expect(pricing).toContain(value));
    expect(pricing).toContain("optional $297 paid follow-up");
  });

  it("keeps the free Signal Check and optional $297 follow-up distinct from packages", () => {
    const signalCheck = readSource("client/src/pages/SignalCheck.tsx");
    expect(signalCheck).toContain("separate $297 paid follow-up");
    expect(signalCheck).toContain("It is optional and never automatic");
  });
});
