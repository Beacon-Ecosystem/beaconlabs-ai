/*
 * BEACON BRAND SYSTEM — Founder briefing route
 * The retained Bob Burr video is intentionally presented as a focused orientation
 * resource, with a consented Signal Check handoff instead of a generic funnel CTA.
 */
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VideoExplainer from "@/components/VideoExplainer";

export default function FounderBrief() {
  return (
    <>
      <Navbar />
      <main>
        <section className="beacon-paper-noise relative isolate overflow-hidden px-0 pt-32 md:pt-40">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute left-[8%] top-0 h-full w-px bg-[oklch(0.45_0.09_185/0.12)]" />
          <div className="relative container py-16 md:py-22">
            <a href="/" className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] text-[oklch(0.45_0.09_185)] uppercase transition-colors hover:text-[oklch(0.16_0.03_240)]"><ArrowLeft className="size-3.5" /> Back to Beacon Labs</a>
            <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <div className="mb-6 flex items-center gap-3 font-mono text-[0.65rem] font-medium tracking-[0.2em] text-[oklch(0.45_0.09_185)] uppercase"><span className="h-px w-10 bg-[oklch(0.75_0.14_85)]" /> Founder briefing</div>
                <h1 className="max-w-4xl font-serif text-[clamp(3.2rem,6vw,6rem)] leading-[0.9] tracking-[-0.05em] text-[oklch(0.16_0.03_240)]">The operating question comes before the <span className="text-[oklch(0.40_0.08_185)]">tool.</span></h1>
              </div>
              <p className="max-w-xl border-l border-[oklch(0.75_0.14_85/0.72)] pl-7 text-lg leading-8 text-[oklch(0.38_0.03_240)] md:pl-10">A concise orientation from Bob Burr on making a decision visible, establishing accountable ownership, and choosing a responsible next step.</p>
            </div>
          </div>
        </section>
        <VideoExplainer />
        <section className="beacon-paper-noise relative py-20 md:py-24">
          <div className="relative container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div><div className="font-mono text-[0.62rem] tracking-[0.16em] text-[oklch(0.45_0.09_185)] uppercase">Ready for the first step?</div><p className="mt-3 max-w-2xl font-serif text-2xl leading-tight text-[oklch(0.16_0.03_240)]">Request a no-cost Signal Check and tell us what is becoming hard to see, run, or hand off.</p></div>
            <a href="/signal-check" className="group inline-flex min-h-12 shrink-0 items-center gap-3 bg-[oklch(0.40_0.08_185)] px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] text-[oklch(0.98_0.003_80)] uppercase transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[oklch(0.35_0.07_185)] hover:shadow-[0_18px_28px_oklch(0.16_0.03_240/0.16)] active:translate-y-0">Request a Signal Check <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
