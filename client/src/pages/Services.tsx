/*
 * BEACON BRAND SYSTEM — B2B Blueprint / Dedicated services route
 * This page carries the fuller approved service architecture away from the
 * focused homepage. It uses scope-and-quote language only, with the no-cost
 * Signal Check as the intentional public first step.
 */
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Compass,
  FileSearch,
  Mail,
  SearchCheck,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const serviceAreas = [
  {
    icon: SearchCheck,
    code: "01 / SIGNAL",
    title: "Position and operating visibility",
    copy: "Clarify what the organization does, where people lose the thread, and which decision or handoff deserves attention first.",
  },
  {
    icon: Workflow,
    code: "02 / SYSTEM",
    title: "Service and workflow design",
    copy: "Map the information, ownership, client experience, and internal rhythm required to make the work easier to run.",
  },
  {
    icon: Compass,
    code: "03 / IMPLEMENT",
    title: "Practical systems delivery",
    copy: "Turn the agreed model into a documented, usable implementation with a responsible handoff—not a black-box launch.",
  },
  {
    icon: ShieldCheck,
    code: "04 / STEWARD",
    title: "Responsible AI readiness",
    copy: "Assess where assisted systems may be useful and define the review, accountability, and continuity controls around their use.",
  },
];

const engagementSteps = [
  ["01", "Request", "Begin with the operating question", "The no-cost Signal Check request gives Beacon Labs enough context to decide whether a diagnostic conversation is appropriate."],
  ["02", "Review", "Confirm fit before work begins", "We review the request; no automatic scan, report, service, or account is created merely by submitting it."],
  ["03", "Scope", "Agree the work deliberately", "If a deeper engagement is useful, the scope, terms, owners, timing, and investment are established in a separate affirmative conversation."],
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-[0.65rem] font-medium tracking-[0.2em] text-[oklch(0.45_0.09_185)] uppercase">
      <span className="h-px w-10 bg-[oklch(0.75_0.14_85)]" />
      {children}
    </div>
  );
}

export default function Services() {
  return (
    <>
      <Navbar />
      <main>
        <section className="beacon-paper-noise relative isolate overflow-hidden px-0 pt-32 md:pt-40">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute left-[8%] top-0 h-full w-px bg-[oklch(0.45_0.09_185/0.12)]" />
          <div className="relative container py-16 md:py-24">
            <a href="/" className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] text-[oklch(0.45_0.09_185)] uppercase transition-colors hover:text-[oklch(0.16_0.03_240)]">
              <ArrowLeft className="size-3.5" /> Back to Beacon Labs
            </a>
            <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.75fr] lg:items-end">
              <div>
                <Eyebrow>B2B services</Eyebrow>
                <h1 className="max-w-4xl font-serif text-[clamp(3.25rem,6vw,6.2rem)] leading-[0.9] tracking-[-0.05em] text-[oklch(0.16_0.03_240)]">
                  Build the system around the work that <span className="text-[oklch(0.40_0.08_185)]">matters now.</span>
                </h1>
              </div>
              <div className="border-l border-[oklch(0.75_0.14_85/0.72)] pl-7 md:pl-10">
                <p className="max-w-xl text-lg leading-8 text-[oklch(0.38_0.03_240)]">
                  Beacon Labs works with organizations that have a meaningful operating question and need a disciplined way to make progress. The public path starts with a no-cost, consented Signal Check request—not a package commitment.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="/signal-check" className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[oklch(0.40_0.08_185)] px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] text-[oklch(0.98_0.003_80)] uppercase transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[oklch(0.35_0.07_185)] hover:shadow-[0_18px_28px_oklch(0.16_0.03_240/0.16)] active:translate-y-0">
                    Request a Signal Check <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a href="mailto:hello@beaconlabs.ai?subject=Beacon%20Labs%20B2B%20conversation" className="inline-flex min-h-12 items-center justify-center gap-3 border border-[oklch(0.35_0.07_185/0.34)] px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] text-[oklch(0.30_0.04_240)] uppercase transition-colors duration-200 hover:border-[oklch(0.75_0.14_85)] hover:bg-[oklch(0.75_0.14_85/0.08)]">
                    <Mail className="size-4" /> Discuss an engagement
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-[oklch(0.14_0.032_240)] py-24 text-[oklch(0.92_0.005_80)] md:py-32">
          <div className="blueprint-grid-dark pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative container">
            <div className="grid gap-10 border-b border-[oklch(0.75_0.14_85/0.24)] pb-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <Eyebrow>Where we help</Eyebrow>
                <p className="max-w-sm text-base leading-7 text-[oklch(0.68_0.025_240)]">The work is shaped around an actual organizational context, not a pre-bundled promise.</p>
              </div>
              <h2 className="max-w-4xl font-serif text-[clamp(2.8rem,5vw,5.25rem)] leading-[0.95] tracking-[-0.04em]">Four service areas. <span className="text-[oklch(0.76_0.14_85)]">One accountable operating model.</span></h2>
            </div>
            <div className="grid divide-y divide-[oklch(0.92_0.005_80/0.14)] lg:grid-cols-2 lg:divide-x lg:divide-y-0">
              {serviceAreas.map((area, index) => (
                <motion.article key={area.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.06 }} className="px-0 py-10 even:lg:pl-10 odd:lg:pr-10 lg:py-14">
                  <div className="flex items-center justify-between gap-4"><area.icon className="size-6 text-[oklch(0.76_0.14_85)]" strokeWidth={1.35} /><span className="font-mono text-[0.58rem] tracking-[0.16em] text-[oklch(0.57_0.05_185)] uppercase">{area.code}</span></div>
                  <h3 className="mt-10 max-w-md font-serif text-3xl leading-[1.02] tracking-[-0.025em]">{area.title}</h3>
                  <p className="mt-5 max-w-lg text-[0.98rem] leading-7 text-[oklch(0.69_0.025_240)]">{area.copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="beacon-paper-noise relative overflow-hidden py-24 md:py-32">
          <div className="pointer-events-none absolute right-[9%] top-0 h-full w-px bg-[oklch(0.45_0.09_185/0.1)]" />
          <div className="relative container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <Eyebrow>How an engagement starts</Eyebrow>
              <h2 className="max-w-md font-serif text-[clamp(3rem,4.7vw,5rem)] leading-[0.92] tracking-[-0.04em] text-[oklch(0.16_0.03_240)]">A request is an opening—not an automatic commitment.</h2>
              <p className="mt-7 max-w-md text-lg leading-8 text-[oklch(0.38_0.03_240)]">This sequence keeps the public entry point useful, consented, and honest about what happens next.</p>
            </div>
            <div className="border-t border-[oklch(0.35_0.07_185/0.2)]">
              {engagementSteps.map(([number, label, title, copy]) => (
                <article key={number} className="grid gap-5 border-b border-[oklch(0.35_0.07_185/0.2)] py-9 md:grid-cols-[80px_0.92fr_1.08fr] md:gap-7 md:py-11">
                  <span className="font-mono text-xs tracking-[0.14em] text-[oklch(0.75_0.14_85)]">{number}</span>
                  <div><div className="font-mono text-[0.6rem] tracking-[0.18em] text-[oklch(0.45_0.09_185)] uppercase">{label}</div><h3 className="mt-3 font-serif text-3xl leading-none tracking-[-0.025em] text-[oklch(0.16_0.03_240)]">{title}</h3></div>
                  <p className="max-w-md text-[0.97rem] leading-7 text-[oklch(0.43_0.03_240)]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[oklch(0.82_0.105_85)] py-14 text-[oklch(0.16_0.03_240)] md:py-18">
          <div className="container grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
            <span className="flex size-11 items-center justify-center border border-[oklch(0.16_0.03_240/0.3)]"><FileSearch className="size-5" /></span>
            <p className="max-w-4xl font-serif text-2xl leading-[1.1] tracking-[-0.02em] md:text-3xl">The Initial Signal Check request is no-cost. The free report may introduce a separately chosen paid follow-up when it fits the questions surfaced. Professional Beacon Labs work is separately scoped and quoted.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
