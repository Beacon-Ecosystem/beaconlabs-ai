/**
 * Beacon Labs AI — Marketing Partnerships Section
 * Design: Blueprint / Dark Teal + Gold Mono Typography
 *
 * This section surfaces the owner-approved PatchPilot endorsement on the Beacon
 * Labs B2B Blueprint homepage. It makes partner status, pricing ownership, and
 * the separate product/data relationship explicit.
 */

import { Handshake, Shield, Server, Smartphone, Lock } from "lucide-react";

interface Partner {
  name: string;
  tagline: string;
  description: string;
  url: string;
  partnerStatement: string;
  highlights: { icon: React.ReactNode; label: string }[];
  tags: string[];
  pricing: string;
}

const PARTNERS: Partner[] = [
  {
    name: "PatchPilot",
    tagline: "Agentless server patching for practical infrastructure stewardship.",
    description:
      "PatchPilot is an independent server-patching product for teams that want a defined operational process without adding a persistent agent to production infrastructure. Beacon Labs recommends it as a resource for the kind of accountable systems work we practice.",
    url: "https://patchpilot.beaconlabs.ai/overlay.html",
    partnerStatement:
      "Beacon Labs uses PatchPilot in the Beacon environment and publicly endorses it as an independent partner product. If you follow this link, PatchPilot handles its own product, account, terms, and data relationship separately.",
    highlights: [
      { icon: <Server className="w-4 h-4" />, label: "Infrastructure resource" },
      { icon: <Shield className="w-4 h-4" />, label: "Agentless approach" },
      { icon: <Lock className="w-4 h-4" />, label: "Separate product account" },
      { icon: <Smartphone className="w-4 h-4" />, label: "Beacon-endorsed product" },
    ],
    tags: ["Patching", "Operations", "Infrastructure", "Security", "DevOps"],
    pricing: "Current plans and pricing are provided directly by PatchPilot.",
  },
];

export default function TrustedPartners() {
  return (
    <section id="partners" className="py-24 px-6 bg-[oklch(0.14_0.02_195)]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[oklch(0.65_0.08_185)] mb-3">
            Recommended partner resource
          </p>
          <h2 className="font-serif text-4xl text-[oklch(0.95_0.005_80)] mb-4">
            A resource we publicly endorse
          </h2>
          <p className="text-[oklch(0.60_0.02_185)] max-w-2xl leading-relaxed">
            Beacon Labs recommends PatchPilot as an independent product resource; following the link below takes you to a separate product experience with its own plans, terms, and data practices.
          </p>
        </div>

        {/* Partner Cards */}
        <div className="space-y-8">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="border border-[oklch(0.25_0.03_195)] rounded-sm overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-6 p-8 border-b border-[oklch(0.20_0.03_195)]">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-serif text-[oklch(0.95_0.005_80)]">
                      {partner.name}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-mono tracking-widest uppercase border border-[oklch(0.75_0.12_80)] text-[oklch(0.75_0.12_80)]">
                      <Handshake className="w-3 h-3" />
                      Beacon-endorsed partner
                    </span>
                  </div>
                  <p className="text-[oklch(0.65_0.05_185)] font-mono text-sm tracking-wide">
                    {partner.tagline}
                  </p>
                </div>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-5 py-2.5 rounded-sm text-xs font-mono tracking-widest uppercase bg-[oklch(0.35_0.08_185)] text-[oklch(0.90_0.05_185)] hover:bg-[oklch(0.40_0.10_185)] transition-colors"
                >
                  Explore PatchPilot
                </a>
              </div>

              {/* Partner Statement */}
              <div className="px-8 py-6 border-b border-[oklch(0.20_0.03_195)] bg-[oklch(0.12_0.02_195)]">
                <blockquote className="font-serif text-[oklch(0.80_0.02_80)] italic leading-relaxed text-sm border-l-2 border-[oklch(0.75_0.12_80)] pl-4">
                  "{partner.partnerStatement}"
                </blockquote>
              </div>

              {/* Description + Highlights */}
              <div className="p-8 grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[oklch(0.65_0.02_185)] leading-relaxed text-sm mb-6">
                    {partner.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {partner.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-sm text-xs font-mono text-[oklch(0.55_0.04_185)] border border-[oklch(0.22_0.03_195)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {partner.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-3 rounded-sm bg-[oklch(0.12_0.02_195)] border border-[oklch(0.20_0.03_195)]"
                      >
                        <span className="text-[oklch(0.65_0.08_185)]">
                          {h.icon}
                        </span>
                        <span className="text-xs font-mono text-[oklch(0.70_0.02_185)]">
                          {h.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-mono text-[oklch(0.55_0.04_185)] tracking-wide">
                    {partner.pricing}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs font-mono text-[oklch(0.40_0.02_185)] tracking-wide">
          Need help determining whether PatchPilot or a Beacon Labs systems engagement is the right fit?{" "}
          <a
            href="mailto:partnerships@beaconlabs.ai"
            className="text-[oklch(0.65_0.08_185)] hover:text-[oklch(0.75_0.10_185)] transition-colors"
          >
            Contact Beacon Labs
          </a>
        </p>
      </div>
    </section>
  );
}
