/*
 * BEACON BRAND SYSTEM — Partner resource route
 * Provides a distinct, clearly disclosed route to CTO John Sanborn's PatchPilot
 * product without blurring product accounts, pricing, terms, or data boundaries.
 */
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TrustedPartners from "@/components/TrustedPartners";

export default function PatchPilotResource() {
  return (
    <>
      <Navbar />
      <main>
        <section className="beacon-paper-noise relative isolate overflow-hidden px-0 pt-32 md:pt-40">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute right-[9%] top-0 h-full w-px bg-[oklch(0.45_0.09_185/0.1)]" />
          <div className="relative container py-16 md:py-22">
            <a href="/" className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] text-[oklch(0.45_0.09_185)] uppercase transition-colors hover:text-[oklch(0.16_0.03_240)]"><ArrowLeft className="size-3.5" /> Back to Beacon Labs</a>
            <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <div className="mb-6 flex items-center gap-3 font-mono text-[0.65rem] font-medium tracking-[0.2em] text-[oklch(0.45_0.09_185)] uppercase"><span className="h-px w-10 bg-[oklch(0.75_0.14_85)]" /> Recommended partner resource</div>
                <h1 className="max-w-4xl font-serif text-[clamp(3.2rem,6vw,6rem)] leading-[0.9] tracking-[-0.05em] text-[oklch(0.16_0.03_240)]">A practical resource for infrastructure <span className="text-[oklch(0.40_0.08_185)]">stewardship.</span></h1>
              </div>
              <p className="max-w-xl border-l border-[oklch(0.75_0.14_85/0.72)] pl-7 text-lg leading-8 text-[oklch(0.38_0.03_240)] md:pl-10">Beacon Labs publicly endorses PatchPilot, CTO John Sanborn’s software, as an independent resource for teams that want an agentless patching approach.</p>
            </div>
          </div>
        </section>
        <TrustedPartners />
        <section className="beacon-paper-noise relative py-20 md:py-24">
          <div className="relative container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <p className="max-w-2xl font-serif text-2xl leading-tight text-[oklch(0.16_0.03_240)]">Need help deciding whether a systems engagement or PatchPilot is the right next conversation?</p>
            <a href="mailto:partnerships@beaconlabs.ai?subject=Beacon%20Labs%20partner%20resource%20question" className="group inline-flex min-h-12 shrink-0 items-center gap-3 border border-[oklch(0.35_0.07_185/0.34)] px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] text-[oklch(0.30_0.04_240)] uppercase transition-colors duration-200 hover:border-[oklch(0.75_0.14_85)] hover:bg-[oklch(0.75_0.14_85/0.08)]">Contact Beacon Labs <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
