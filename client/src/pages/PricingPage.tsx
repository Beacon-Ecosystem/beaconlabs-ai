import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import { ArrowLeft } from "lucide-react";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="beacon-paper-noise relative isolate overflow-hidden px-0 pt-32 md:pt-40">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute left-[8%] top-0 h-full w-px bg-[oklch(0.45_0.09_185/0.12)]" />
          <div className="relative container py-16 md:py-24">
            <a
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] text-[oklch(0.45_0.09_185)] uppercase transition-colors hover:text-[oklch(0.16_0.03_240)]"
            >
              <ArrowLeft className="size-3.5" /> Back to Beacon Labs
            </a>
            <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.75fr] lg:items-end">
              <div>
                <div className="mb-6 flex items-center gap-3 font-mono text-[0.65rem] font-medium tracking-[0.2em] text-[oklch(0.45_0.09_185)] uppercase">
                  <span className="h-px w-10 bg-[oklch(0.75_0.14_85)]" /> Founding packages
                </div>
                <h1 className="max-w-4xl font-serif text-[clamp(3.25rem,6vw,6.2rem)] leading-[0.9] tracking-[-0.05em] text-[oklch(0.16_0.03_240)]">
                  Clear package options. <span className="text-[oklch(0.40_0.08_185)]">Clear pricing.</span>
                </h1>
              </div>
              <div className="border-l border-[oklch(0.75_0.14_85/0.72)] pl-7 md:pl-10">
                <p className="max-w-xl text-lg leading-8 text-[oklch(0.38_0.03_240)]">
                  Beacon Labs publishes its current founding-package price anchors so an organization can see the work, the investment level, and the right next conversation before asking for a proposal.
                </p>
                <p className="mt-5 max-w-xl text-sm leading-6 text-[oklch(0.43_0.03_240)]">
                  The free Signal Check and optional $297 follow-up remain separate entry points. A package selection begins a qualified project conversation; it does not create an automatic engagement or payment obligation.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
