/*
 * BEACON LABS — home page (Black Friday cleanup, Nov 26, 2026)
 * One operator, written async delivery. Three doors only: the free Signal Check,
 * the Signal Check Working Session, and the 90-Day Operator Engagement.
 * Prices and links live in client/src/lib/offers.ts.
 */
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, FileSearch, SearchCheck, Workflow } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { isBlackFriday, mailto, whatHappensNext, wontDo, workingSessionHref, CONTACT_EMAIL } from "@/lib/offers";

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-[0.64rem] font-medium tracking-[0.2em] text-[oklch(0.45_0.09_185)] uppercase">
      <span className="h-px w-10 bg-[oklch(0.75_0.14_85)]" />
      {children}
    </div>
  );
}

type Door = {
  icon: typeof SearchCheck;
  label: string;
  title: string;
  price: string;
  priceNote?: string;
  copy: string;
  gets: string[];
  how: string;
  action: string;
  href: string;
  external?: boolean;
  featured?: boolean;
};

export default function Home() {
  const bf = isBlackFriday();
  const doors: Door[] = [
    {
      icon: SearchCheck,
      label: "Start here",
      title: "Signal Check",
      price: "Free",
      copy: "Send me your website and the one question on your mind. I'll look at how your organization shows up today: on your own site, in search, and when someone asks an AI tool who to trust.",
      gets: [
        "A short written snapshot within five business days",
        "What I checked and when",
        "My honest read on what to look at first",
      ],
      how: "You fill in one form. I read it, and if I can help, the snapshot comes by email. I take a few of these each week.",
      action: "Request a Signal Check",
      href: "/signal-check",
      featured: true,
    },
    {
      icon: FileSearch,
      label: "The full picture",
      title: "Signal Check Working Session",
      price: bf ? "$197" : "$297",
      priceNote: bf ? "Through Monday, Dec 1, five spots. $297 after." : undefined,
      copy: "When you want the full picture and a plan you can act on.",
      gets: [
        "Up to seven findings, in order of what to fix first",
        "A 30/60/90-day action brief",
        "A 15-minute recorded walkthrough you can watch when it suits you",
        "One round of written follow-up questions within 14 days",
      ],
      how: "I confirm within one business day whether I can help. If I can't, you get a full refund. Delivery is within seven business days. All in writing, no calls.",
      action: "Book a Working Session",
      href: workingSessionHref(),
      external: true,
    },
    {
      icon: Workflow,
      label: "Ongoing help",
      title: "90-Day Operator Engagement",
      price: "$15,000",
      priceNote: "Per 90 days, or $6,000 a month. Founding terms for a January start.",
      copy: "For founders, small teams and nonprofits that need an operator without making a hire.",
      gets: [
        "A written review and a 90-day plan in week one",
        "Hands-on work we agree on: your site, your offers, your workflows, and local AI tools you own",
        "A written status brief every week, and written answers within one business day",
        "A handoff document at the end, so nothing depends on me",
      ],
      how: "It starts with a short written inquiry. I reply with a written proposal. I take two engagements at a time, and January has two openings. Larger builds by written proposal.",
      action: "Ask about an engagement",
      href: mailto("90-Day Operator Engagement inquiry"),
      external: true,
    },
  ];

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
              <SectionLabel>Beacon Labs · Bob Burr</SectionLabel>
              <h1 className="max-w-5xl font-serif text-[clamp(3.75rem,7vw,7.25rem)] leading-[0.86] tracking-[-0.06em] text-[oklch(0.16_0.03_240)]">
                Find the signal.<br />
                <span className="text-[oklch(0.40_0.08_185)]">Choose the next move.</span>
              </h1>
              <p className="mt-9 max-w-2xl text-lg leading-8 text-[oklch(0.38_0.03_240)] md:text-xl">
                I'm Bob Burr. I run Beacon Labs myself, from a private AI lab in my home. You tell me what's getting hard to see, run or hand off. I look, I write down what I found, and I tell you what I'd do first. It's all in writing, on your schedule. No sales calls.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="/signal-check" className="group inline-flex min-h-13 items-center justify-center gap-3 bg-[oklch(0.40_0.08_185)] px-7 py-4 font-mono text-xs font-medium tracking-[0.15em] text-[oklch(0.98_0.003_80)] uppercase transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[oklch(0.35_0.07_185)] hover:shadow-[0_20px_30px_oklch(0.16_0.03_240/0.18)] active:translate-y-0">
                  Send me your question <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a href="#work" className="inline-flex min-h-13 items-center justify-center gap-3 border border-[oklch(0.35_0.07_185/0.3)] px-7 py-4 font-mono text-xs font-medium tracking-[0.15em] text-[oklch(0.30_0.04_240)] uppercase transition-colors duration-200 hover:border-[oklch(0.75_0.14_85)] hover:bg-[oklch(0.75_0.14_85/0.08)]">
                  See the three ways to work with me
                </a>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-6 text-[oklch(0.43_0.03_240)]">
                I do the analysis on my own equipment, with local AI models. I don't paste client details into public AI services.
              </p>
            </motion.div>

            <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.12 }} className="relative overflow-hidden border border-[oklch(0.35_0.07_185/0.24)] bg-[oklch(0.14_0.032_240)] p-7 text-[oklch(0.92_0.005_80)] shadow-[0_22px_55px_oklch(0.12_0.03_240/0.18)] md:p-9">
              <div className="blueprint-grid-dark pointer-events-none absolute inset-0 opacity-30" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[0.6rem] tracking-[0.18em] text-[oklch(0.76_0.14_85)] uppercase">What happens after you send it</span>
                  <FileSearch className="size-5 text-[oklch(0.76_0.14_85)]" strokeWidth={1.3} />
                </div>
                <ol className="mt-8 space-y-5 border-l border-[oklch(0.76_0.14_85/0.48)] pl-5">
                  {whatHappensNext.map((line, i) => (
                    <li key={line}>
                      <span className="font-mono text-[0.58rem] tracking-[0.16em] text-[oklch(0.76_0.14_85)] uppercase">Step {i + 1}</span>
                      <p className="mt-1 text-base leading-7 text-[oklch(0.80_0.02_240)]">{line}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.aside>
          </div>
        </section>

        <section id="work" className="beacon-paper-noise relative scroll-mt-28 overflow-hidden border-y border-[oklch(0.35_0.07_185/0.16)] py-24 md:py-32">
          <div className="relative container">
            <div className="grid gap-10 border-b border-[oklch(0.35_0.07_185/0.2)] pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <SectionLabel>Three ways to work with me</SectionLabel>
                <p className="max-w-sm text-[0.98rem] leading-7 text-[oklch(0.38_0.03_240)]">Each one is delivered in writing. Start with whichever fits. If you're not sure, start with the free Signal Check.</p>
              </div>
              <h2 className="max-w-4xl font-serif text-[clamp(2.8rem,5vw,5.25rem)] leading-[0.94] tracking-[-0.045em] text-[oklch(0.16_0.03_240)]">
                Fewer doors. <span className="text-[oklch(0.40_0.08_185)]">Clear next steps.</span>
              </h2>
            </div>
            <div className="mt-14 grid gap-px bg-[oklch(0.35_0.07_185/0.2)] lg:grid-cols-3">
              {doors.map((door) => (
                <article key={door.title} className={`flex flex-col p-7 md:p-8 ${door.featured ? "bg-[oklch(0.40_0.08_185)] text-[oklch(0.98_0.003_80)]" : "bg-[oklch(0.98_0.004_80)] text-[oklch(0.16_0.03_240)]"}`}>
                  <door.icon className={`size-6 ${door.featured ? "text-[oklch(0.82_0.105_85)]" : "text-[oklch(0.45_0.09_185)]"}`} strokeWidth={1.3} />
                  <div className={`mt-8 font-mono text-[0.59rem] tracking-[0.16em] uppercase ${door.featured ? "text-[oklch(0.82_0.105_85)]" : "text-[oklch(0.45_0.09_185)]"}`}>{door.label}</div>
                  <h3 className="mt-3 font-serif text-3xl leading-[1.02] tracking-[-0.025em]">{door.title}</h3>
                  <div className="mt-5 font-serif text-4xl tracking-[-0.03em]">{door.price}</div>
                  {door.priceNote && <p className={`mt-2 text-sm leading-6 ${door.featured ? "text-[oklch(0.90_0.02_185)]" : "text-[oklch(0.43_0.03_240)]"}`}>{door.priceNote}</p>}
                  <p className={`mt-5 text-[0.98rem] leading-7 ${door.featured ? "text-[oklch(0.94_0.01_185)]" : "text-[oklch(0.38_0.03_240)]"}`}>{door.copy}</p>
                  <div className={`mt-6 font-mono text-[0.58rem] tracking-[0.16em] uppercase ${door.featured ? "text-[oklch(0.82_0.105_85)]" : "text-[oklch(0.45_0.09_185)]"}`}>What you get</div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
                    {door.gets.map((g) => <li key={g}>{g}</li>)}
                  </ul>
                  <div className={`mt-6 font-mono text-[0.58rem] tracking-[0.16em] uppercase ${door.featured ? "text-[oklch(0.82_0.105_85)]" : "text-[oklch(0.45_0.09_185)]"}`}>How it works</div>
                  <p className="mt-3 text-sm leading-6">{door.how}</p>
                  <div className="mt-auto pt-8">
                    <a href={door.href} className={`inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-200 ${door.featured ? "bg-[oklch(0.98_0.003_80)] text-[oklch(0.30_0.06_185)] hover:bg-[oklch(0.92_0.02_85)]" : "border border-[oklch(0.35_0.07_185/0.34)] text-[oklch(0.30_0.04_240)] hover:border-[oklch(0.75_0.14_85)] hover:bg-[oklch(0.75_0.14_85/0.08)]"}`}>
                      {door.action} <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-[oklch(0.14_0.032_240)] py-24 text-[oklch(0.92_0.005_80)] md:py-28">
          <div className="blueprint-grid-dark pointer-events-none absolute inset-0 opacity-35" />
          <div className="relative container grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <SectionLabel>What I won't do</SectionLabel>
              <p className="max-w-sm text-[0.98rem] leading-7 text-[oklch(0.68_0.025_240)]">So you know where the edges are before you send anything.</p>
            </div>
            <ul className="grid gap-px bg-[oklch(0.92_0.005_80/0.14)] md:grid-cols-2">
              {wontDo.map((line) => (
                <li key={line} className="bg-[oklch(0.14_0.032_240)] p-6 text-base leading-7 text-[oklch(0.86_0.01_240)]">{line}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[oklch(0.82_0.105_85)] py-16 text-[oklch(0.16_0.03_240)] md:py-20">
          <div className="container grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
            <span className="flex size-12 items-center justify-center border border-[oklch(0.16_0.03_240/0.3)]"><Compass className="size-5" strokeWidth={1.4} /></span>
            <p className="max-w-2xl text-lg leading-8">
              Looking for a practical infrastructure resource instead? Explore PatchPilot—an independently operated, Beacon-endorsed software resource.
            </p>
            <a href="/patchpilot" className="inline-flex min-h-12 items-center justify-center gap-3 border border-[oklch(0.16_0.03_240/0.4)] px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-200 hover:bg-[oklch(0.16_0.03_240/0.08)]">
              Explore PatchPilot <ArrowUpRight className="size-4" />
            </a>
          </div>
        </section>

        <section className="relative bg-[oklch(0.14_0.032_240)] py-20 text-[oklch(0.92_0.005_80)] md:py-24">
          <div className="blueprint-grid-dark pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <SectionLabel>Not sure which fits?</SectionLabel>
              <h2 className="max-w-2xl font-serif text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.98] tracking-[-0.035em]">
                Send me the question anyway.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[oklch(0.72_0.02_240)]">
                I'll tell you in writing which door makes sense, including "none of them." Or watch the short <a href="/founder-brief" className="underline decoration-[oklch(0.76_0.14_85)] underline-offset-4 hover:text-white">founder briefing</a> first.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="/signal-check" className="inline-flex min-h-12 items-center justify-center gap-3 bg-[oklch(0.76_0.14_85)] px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] text-[oklch(0.16_0.03_240)] uppercase transition-colors duration-200 hover:bg-[oklch(0.82_0.105_85)]">
                Send me your question <ArrowUpRight className="size-4" />
              </a>
              <a href={mailto("Beacon Labs question")} className="inline-flex min-h-12 items-center justify-center gap-3 border border-[oklch(0.92_0.005_80/0.3)] px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-200 hover:border-[oklch(0.76_0.14_85)]">
                Email {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
