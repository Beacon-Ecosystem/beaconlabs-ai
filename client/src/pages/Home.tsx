/*
 * BEACON BRAND SYSTEM — B2B Blueprint / Signal-Check-first public surface
 * The homepage remains deliberately focused: it describes Beacon Labs, makes the
 * free consented Signal Check the primary entry point, and directs fuller detail
 * to dedicated services, founder-brief, and PatchPilot resource pages.
 */
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Compass,
  FileSearch,
  PlayCircle,
  SearchCheck,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const entryPoints = [
  {
    icon: SearchCheck,
    label: "Start here",
    title: "Free Signal Check",
    copy: "A consented request for organizations that want a clearer view of what is becoming hard to see, run, or hand off.",
    href: "/signal-check",
    action: "Request a Signal Check",
    featured: true,
  },
  {
    icon: Workflow,
    label: "Understand the work",
    title: "B2B services",
    copy: "Explore the operating, service, workflow, and implementation questions Beacon Labs can scope with a qualified organization.",
    href: "/services",
    action: "Explore services",
    featured: false,
  },
  {
    icon: PlayCircle,
    label: "Hear the approach",
    title: "Founder briefing",
    copy: "A concise orientation from Bob Burr on turning an unclear operating question into a responsible next decision.",
    href: "/founder-brief",
    action: "Watch the briefing",
    featured: false,
  },
];

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
    copy: "Map the information, ownership, client experience, and internal rhythm that make the work easier to run.",
  },
  {
    icon: Compass,
    code: "03 / IMPLEMENT",
    title: "Practical systems delivery",
    copy: "Turn an agreed model into a documented, usable implementation with a responsible handoff—not a black-box launch.",
  },
  {
    icon: ShieldCheck,
    code: "04 / STEWARD",
    title: "Responsible AI readiness",
    copy: "Assess where assisted systems may help and define the review, accountability, and continuity controls around their use.",
  },
];

const diagnosticSteps = [
  {
    number: "01",
    title: "Request the free Signal Check",
    copy: "Share enough context for Beacon Labs to review the question. The request is no-cost and requires your affirmative permission to be processed.",
  },
  {
    number: "02",
    title: "Receive the first clear picture",
    copy: "If Beacon Labs accepts the request, the free report identifies the need and gives you a grounded place to begin. Submission does not create an automatic scan, report, account, or service engagement.",
  },
  {
    number: "03",
    title: "Choose any deeper work separately",
    copy: "The report can introduce an optional, separately chosen paid follow-up for organizations that want to begin answering the questions it surfaces. It is never automatic, bundled into membership, or a substitute for scoped services.",
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-[0.64rem] font-medium tracking-[0.2em] text-[oklch(0.45_0.09_185)] uppercase">
      <span className="h-px w-10 bg-[oklch(0.75_0.14_85)]" />
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="beacon-paper-noise relative isolate overflow-hidden pt-32 md:pt-40">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute left-[8%] top-0 h-full w-px bg-[oklch(0.45_0.09_185/0.12)]" />
          <div className="pointer-events-none absolute right-[14%] top-20 size-[24rem] rounded-full bg-[oklch(0.75_0.14_85/0.12)] blur-[110px]" />
          <div className="relative container grid min-h-[650px] gap-14 py-18 md:py-24 lg:grid-cols-[1.1fr_0.7fr] lg:items-end">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <SectionLabel>Beacon Momentum, LLC · B2B operating arm</SectionLabel>
              <h1 className="max-w-5xl font-serif text-[clamp(3.75rem,7vw,7.25rem)] leading-[0.86] tracking-[-0.06em] text-[oklch(0.16_0.03_240)]">
                Find the signal.<br />
                <span className="text-[oklch(0.40_0.08_185)]">Choose the next move.</span>
              </h1>
              <p className="mt-9 max-w-2xl text-lg leading-8 text-[oklch(0.38_0.03_240)] md:text-xl">
                Beacon Labs helps organizations make their operating reality easier to see, explain, and improve. Start with the free Signal Check when there is a meaningful question to examine.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="/signal-check" className="group inline-flex min-h-13 items-center justify-center gap-3 bg-[oklch(0.40_0.08_185)] px-7 py-4 font-mono text-xs font-medium tracking-[0.15em] text-[oklch(0.98_0.003_80)] uppercase transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[oklch(0.35_0.07_185)] hover:shadow-[0_20px_30px_oklch(0.16_0.03_240/0.18)] active:translate-y-0">
                  Request the free Signal Check <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a href="/founder-brief" className="inline-flex min-h-13 items-center justify-center gap-3 border border-[oklch(0.35_0.07_185/0.3)] px-7 py-4 font-mono text-xs font-medium tracking-[0.15em] text-[oklch(0.30_0.04_240)] uppercase transition-colors duration-200 hover:border-[oklch(0.75_0.14_85)] hover:bg-[oklch(0.75_0.14_85/0.08)]">
                  Watch the founder briefing <PlayCircle className="size-4" />
                </a>
              </div>
              <p className="mt-5 max-w-xl font-mono text-[0.63rem] leading-5 tracking-[0.05em] text-[oklch(0.47_0.03_185)]">
                A request is reviewed first. It does not begin an automatic scan, create an account, promise a report, or create a paid engagement.
              </p>
            </motion.div>

            <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.12 }} className="relative overflow-hidden border border-[oklch(0.35_0.07_185/0.24)] bg-[oklch(0.14_0.032_240)] p-7 text-[oklch(0.92_0.005_80)] shadow-[0_22px_55px_oklch(0.12_0.03_240/0.18)] md:p-9">
              <div className="blueprint-grid-dark pointer-events-none absolute inset-0 opacity-30" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4"><span className="font-mono text-[0.6rem] tracking-[0.18em] text-[oklch(0.76_0.14_85)] uppercase">The intentional entry point</span><FileSearch className="size-5 text-[oklch(0.76_0.14_85)]" /></div>
                <h2 className="mt-8 max-w-sm font-serif text-4xl leading-[0.96] tracking-[-0.035em]">A free report first. A deeper decision only if it serves the work.</h2>
                <ol className="mt-9 space-y-5 border-l border-[oklch(0.76_0.14_85/0.48)] pl-5">
                  <li><span className="font-mono text-[0.58rem] tracking-[0.16em] text-[oklch(0.76_0.14_85)] uppercase">Free request</span><p className="mt-1 text-sm leading-6 text-[oklch(0.69_0.025_240)]">We review the operating question and consented context.</p></li>
                  <li><span className="font-mono text-[0.58rem] tracking-[0.16em] text-[oklch(0.76_0.14_85)] uppercase">Free report</span><p className="mt-1 text-sm leading-6 text-[oklch(0.69_0.025_240)]">The report makes the immediate need visible and explains the possible next paths.</p></li>
                  <li><span className="font-mono text-[0.58rem] tracking-[0.16em] text-[oklch(0.76_0.14_85)] uppercase">Optional follow-up</span><p className="mt-1 text-sm leading-6 text-[oklch(0.69_0.025_240)]">A separate paid follow-up is introduced in the report when a deeper diagnostic conversation is appropriate.</p></li>
                </ol>
              </div>
            </motion.aside>
          </div>
          <div className="relative container pb-10"><div className="flex items-center gap-3 font-mono text-[0.58rem] tracking-[0.15em] text-[oklch(0.45_0.09_185)] uppercase"><span className="h-px w-16 bg-[oklch(0.75_0.14_85)]" /> B2B systems engineering · responsible engagement</div></div>
        </section>

        <section className="beacon-paper-noise relative overflow-hidden border-y border-[oklch(0.35_0.07_185/0.16)] py-24 md:py-32">
          <div className="pointer-events-none absolute right-[9%] top-0 h-full w-px bg-[oklch(0.45_0.09_185/0.1)]" />
          <div className="relative container">
            <div className="grid gap-10 border-b border-[oklch(0.35_0.07_185/0.2)] pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <SectionLabel>What Beacon Labs helps make clearer</SectionLabel>
                <p className="max-w-sm text-[0.98rem] leading-7 text-[oklch(0.38_0.03_240)]">For organizations responding to a meaningful operating question—not a pre-bundled promise.</p>
              </div>
              <div>
                <h2 className="max-w-4xl font-serif text-[clamp(2.8rem,5vw,5.25rem)] leading-[0.94] tracking-[-0.045em] text-[oklch(0.16_0.03_240)]">Four service areas. <span className="text-[oklch(0.40_0.08_185)]">One accountable way forward.</span></h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[oklch(0.43_0.03_240)]">A direct conversation is welcome, but the no-cost Signal Check remains the clearest first step when the question is still taking shape.</p>
              </div>
            </div>
            <div className="grid divide-y divide-[oklch(0.35_0.07_185/0.2)] md:grid-cols-2 md:divide-x md:divide-y-0">
              {serviceAreas.map((area, index) => (
                <motion.article key={area.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.42, delay: index * 0.06 }} className="px-0 py-10 even:md:pl-9 odd:md:pr-9 md:py-14">
                  <div className="flex items-center justify-between gap-4"><area.icon className="size-6 text-[oklch(0.45_0.09_185)]" strokeWidth={1.3} /><span className="font-mono text-[0.58rem] tracking-[0.16em] text-[oklch(0.45_0.09_185)] uppercase">{area.code}</span></div>
                  <h3 className="mt-10 max-w-md font-serif text-3xl leading-[1.02] tracking-[-0.025em] text-[oklch(0.16_0.03_240)]">{area.title}</h3>
                  <p className="mt-5 max-w-lg text-[0.98rem] leading-7 text-[oklch(0.43_0.03_240)]">{area.copy}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="/services" className="group inline-flex min-h-12 items-center justify-center gap-3 border border-[oklch(0.35_0.07_185/0.34)] px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] text-[oklch(0.30_0.04_240)] uppercase transition-colors duration-200 hover:border-[oklch(0.75_0.14_85)] hover:bg-[oklch(0.75_0.14_85/0.08)]">Explore the service path <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
              <a href="/signal-check" className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[oklch(0.40_0.08_185)] px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] text-[oklch(0.98_0.003_80)] uppercase transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[oklch(0.35_0.07_185)] active:translate-y-0">Request the free Signal Check <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
            </div>
          </div>
        </section>

        <section className="relative bg-[oklch(0.14_0.032_240)] py-24 text-[oklch(0.92_0.005_80)] md:py-32">
          <div className="blueprint-grid-dark pointer-events-none absolute inset-0 opacity-35" />
          <div className="relative container">
            <div className="grid gap-10 border-b border-[oklch(0.92_0.005_80/0.15)] pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div><SectionLabel>How the diagnostic path works</SectionLabel><p className="max-w-sm text-[0.98rem] leading-7 text-[oklch(0.68_0.025_240)]">Clear language and explicit consent keep the entry point useful without pretending a form submission is a finished service.</p></div>
              <h2 className="max-w-4xl font-serif text-[clamp(2.8rem,5vw,5.25rem)] leading-[0.94] tracking-[-0.045em]">A practical path from <span className="text-[oklch(0.76_0.14_85)]">question</span> to <span className="text-[oklch(0.76_0.14_85)]">choice.</span></h2>
            </div>
            <div className="grid divide-y divide-[oklch(0.92_0.005_80/0.14)] md:grid-cols-3 md:divide-x md:divide-y-0">
              {diagnosticSteps.map((step, index) => (
                <motion.article key={step.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.42, delay: index * 0.08 }} className="px-0 py-10 md:px-7 md:py-14 first:md:pl-0 last:md:pr-0">
                  <div className="font-mono text-xs tracking-[0.18em] text-[oklch(0.76_0.14_85)]">{step.number}</div>
                  <h3 className="mt-10 max-w-xs font-serif text-3xl leading-[1.02] tracking-[-0.025em]">{step.title}</h3>
                  <p className="mt-5 max-w-sm text-sm leading-7 text-[oklch(0.69_0.025_240)]">{step.copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="beacon-paper-noise relative overflow-hidden py-24 md:py-32">
          <div className="pointer-events-none absolute right-[9%] top-0 h-full w-px bg-[oklch(0.45_0.09_185/0.1)]" />
          <div className="relative container">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><SectionLabel>More ways in</SectionLabel><p className="max-w-sm text-lg leading-8 text-[oklch(0.38_0.03_240)]">The front page stays clear. Each of these routes gives the rest of the story a place to live.</p></div><h2 className="max-w-4xl font-serif text-[clamp(2.8rem,5vw,5.25rem)] leading-[0.94] tracking-[-0.045em] text-[oklch(0.16_0.03_240)]">Choose the context you need.</h2></div>
            <div className="mt-14 grid gap-px bg-[oklch(0.35_0.07_185/0.2)] md:grid-cols-3">
              {entryPoints.map((entry) => (
                <a key={entry.title} href={entry.href} className={`group relative min-h-[315px] overflow-hidden p-7 transition-colors duration-300 md:p-8 ${entry.featured ? "bg-[oklch(0.40_0.08_185)] text-[oklch(0.98_0.003_80)] hover:bg-[oklch(0.35_0.07_185)]" : "bg-[oklch(0.97_0.005_80)] text-[oklch(0.16_0.03_240)] hover:bg-[oklch(0.94_0.01_85)]"}`}>
                  <entry.icon className={`size-6 ${entry.featured ? "text-[oklch(0.82_0.105_85)]" : "text-[oklch(0.45_0.09_185)]"}`} strokeWidth={1.3} />
                  <div className="mt-12"><div className={`font-mono text-[0.59rem] tracking-[0.16em] uppercase ${entry.featured ? "text-[oklch(0.82_0.105_85)]" : "text-[oklch(0.45_0.09_185)]"}`}>{entry.label}</div><h3 className="mt-3 font-serif text-3xl leading-none tracking-[-0.03em]">{entry.title}</h3><p className={`mt-4 max-w-xs text-sm leading-6 ${entry.featured ? "text-[oklch(0.88_0.01_185)]" : "text-[oklch(0.43_0.03_240)]"}`}>{entry.copy}</p></div>
                  <span className={`absolute bottom-7 inline-flex items-center gap-2 font-mono text-[0.62rem] font-medium tracking-[0.14em] uppercase ${entry.featured ? "text-[oklch(0.82_0.105_85)]" : "text-[oklch(0.40_0.08_185)]"}`}>{entry.action}<ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[oklch(0.82_0.105_85)] py-16 text-[oklch(0.16_0.03_240)] md:py-20">
          <div className="container grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center"><span className="flex size-12 items-center justify-center border border-[oklch(0.16_0.03_240/0.3)]"><Compass className="size-5" /></span><p className="max-w-3xl font-serif text-2xl leading-[1.08] tracking-[-0.02em] md:text-3xl">Looking for a practical infrastructure resource instead? Explore PatchPilot—an independently operated, Beacon-endorsed software resource.</p><a href="/patchpilot" className="group inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.14em] uppercase hover:underline">Explore PatchPilot <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></a></div>
        </section>

        <section className="relative bg-[oklch(0.14_0.032_240)] py-20 text-[oklch(0.92_0.005_80)] md:py-24">
          <div className="blueprint-grid-dark pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div><SectionLabel>Need a direct conversation?</SectionLabel><h2 className="max-w-2xl font-serif text-4xl leading-[0.98] tracking-[-0.035em] md:text-5xl">Start with the Signal Check—or tell us what the organization is trying to solve.</h2></div><a href="mailto:hello@beaconlabs.ai?subject=Beacon%20Labs%20B2B%20conversation" className="group inline-flex min-h-12 shrink-0 items-center gap-3 border border-[oklch(0.76_0.14_85/0.6)] px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] text-[oklch(0.92_0.005_80)] uppercase transition-colors hover:bg-[oklch(0.76_0.14_85)] hover:text-[oklch(0.16_0.03_240)]">Email Beacon Labs <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
