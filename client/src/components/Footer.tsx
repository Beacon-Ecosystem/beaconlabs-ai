/*
 * Beacon Brand System — B2B Blueprint: a Labs-specific technical footer with explicit parent-company context and unchanged ecosystem routes.
 */

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/PvMfhRKIZBrzDTem.png";

const ecosystemBrands = [
  { name: "Beacon Momentum", url: "https://beaconmomentum.com" },
  { name: "Beacon Trading \u00b7 Simulation Academy", url: "https://beacontrading.ai" },
  { name: "Beacon Community", url: "https://beaconcommunity.net" },
  { name: "Hollow Threads", url: "https://hollowthreads.store" },
  { name: "Digital Grandpa", url: "https://digitalgrandpa.org" },
];

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[oklch(0.12_0.03_240)] py-16 text-[oklch(0.60_0.02_240)]">
      <div className="absolute inset-0 blueprint-grid-dark opacity-10" />
      <div className="absolute inset-x-0 top-0 h-px beacon-family-rule" />

      <div className="relative container">
        {/* Cross-navigation banner to Beacon Momentum */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 border border-[oklch(0.45_0.09_185/0.22)] bg-[oklch(0.14_0.03_240/0.72)] p-6 shadow-[0_18px_50px_oklch(0.08_0.02_240/0.28)] sm:flex-row">
          <div>
            <div className="mb-1 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[oklch(0.75_0.14_85)]">Beacon Momentum, LLC · Parent Company</div>
            <p className="font-serif text-lg text-[oklch(0.90_0.005_80)]">
              Start with the ecosystem. Continue with the right operating system.
            </p>
            <p className="text-sm text-[oklch(0.55_0.02_185)] mt-1">
              Beacon Labs AI is the B2B systems and support arm. Beacon Momentum is the public front door.
            </p>
          </div>
          <a
            href="https://beaconmomentum.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-mono text-xs tracking-[0.1em] uppercase px-5 py-2.5 border border-[oklch(0.45_0.09_185/0.4)] text-[oklch(0.65_0.06_185)] hover:border-[oklch(0.45_0.09_185/0.7)] hover:text-[oklch(0.80_0.005_80)] transition-all duration-300 rounded-sm whitespace-nowrap"
          >
            Visit the parent site &rarr;
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="Beacon Labs" className="h-10 w-auto" />
              <div>
                <span className="font-serif text-lg text-[oklch(0.90_0.005_80)]">
                  Beacon Labs AI
                </span>
                <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[oklch(0.45_0.09_185)] -mt-0.5">
                  B2B systems and support
                </div>
              </div>
            </a>
            <p className="text-sm leading-relaxed max-w-xs mt-4">
              We build the systems, supports, and operating rhythms that make your organization easier to find and easier to run.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[oklch(0.75_0.14_85)] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-[oklch(0.85_0.005_80)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[oklch(0.75_0.14_85)] mb-4">
              Beacon Ecosystem
            </h4>
            <ul className="space-y-2">
              {ecosystemBrands.map((brand) => (
                <li key={brand.name}>
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-[oklch(0.85_0.005_80)] transition-colors"
                  >
                    {brand.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[oklch(0.45_0.09_185/0.1)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[0.6rem] tracking-[0.1em] text-[oklch(0.40_0.02_240)]">
              &copy; {new Date().getFullYear()} Beacon Labs &mdash; a Beacon Momentum, LLC company. All rights reserved.
            </span>
            <span className="font-mono text-[0.55rem] tracking-[0.08em] text-[oklch(0.35_0.02_240)]">
              1309 Coffeen Avenue, Suite # 1200 &bull; Sheridan, WY 82801 &bull; (307) 461-5184
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[0.6rem] tracking-[0.1em] text-[oklch(0.40_0.02_240)]">
            <a href="/privacy" className="hover:text-[oklch(0.85_0.005_80)] transition-colors">
              Privacy Notice
            </a>
            <span>Guiding the Way Forward. Always.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
