/*
 * BEACON BRAND SYSTEM — B2B Blueprint / Role-first public surface
 * Beacon Labs is an explicit, separate B2B systems-engineering experience.
 * The composition prioritizes service boundary, operational method, and an
 * accountable conversation over unverified prices, promises, or automation claims.
 */
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Compass,
  Layers3,
  Mail,
  SearchCheck,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const HERO_IMG =
  "https://private-us-east-1.manuscdn.com/sessionFile/tKxNRtyvM8Zgu1fmytfZDx/sandbox/BXhkVKYtT6l6H8loNhJpdd-img-1_1771628136000_na1fn_aGVyby1iYW5uZXI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdEt4TlJ0eXZNOFpndTFmbXl0ZlpEeC9zYW5kYm94L0JYaGtWS1l0VDZsNkg4bG9OaEpwZGQtaW1nLTFfMTc3MTYyODEzNjAwMF9uYTFmbl9hR1Z5YnkxaVlXNXVaWEkucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Mi3StgOw56Ednu7xP0wV1YLLK1xHKGUwCxMUFaVWoTA--8kXPGYhA1LK~k8IWxYaqruEJ021tGsEKo74DdoGXYeyX2-z8p9GL53DsKjA2E3~lhX8GA9jexeCXdbeaFZMqcm46Us9l13WrmPrdMijhcBfU21lpy5IFSgTQGtMC9B~AwowDtbuP3muSS0EfmMkTg11gbNJo-Iay~Y2HLksjMNSbp4hr26TR3EpGnxq2qF9Q~caPmJb-z9AcOOM1mrrYVT~t6snsPWFtHSjhp3y1p4Trcdo6v3kmhmR7NIU4eyGaSeiN6JJr-hRGUx32XRgNMc-cNRP9bVacPbhTYm6kA__";

const capabilityGroups = [
  {
    icon: SearchCheck,
    code: "01 / SIGNAL",
    title: "Make the operating reality visible.",
    copy: "We organize the information, handoffs, and decision points that determine whether your organization is easy to understand and ready to act.",
  },
  {
    icon: Workflow,
    code: "02 / SYSTEM",
    title: "Build the workflow around the work.",
    copy: "The focus is not a stack of disconnected tools. It is a practical service, client, and team workflow with clear ownership and useful outputs.",
  },
  {
    icon: ShieldCheck,
    code: "03 / STEWARDSHIP",
    title: "Keep judgment in the loop.",
    copy: "We design for review, accountability, and continuity so the people responsible for the work can see what is happening and intervene when it matters.",
  },
];

const engagementSteps = [
  {
    number: "01",
    label: "Orient",
    title: "Frame the operating question.",
    copy: "We begin with the decision, the people affected by it, and the system boundary—not with a preselected tool.",
  },
  {
    number: "02",
    label: "Design",
    title: "Create a buildable operating model.",
    copy: "Together, we define the information flow, accountable owners, review gates, and what a useful result should look like.",
  },
  {
    number: "03",
    label: "Deliver",
    title: "Implement with clear stewardship.",
    copy: "The selected work is delivered against an agreed scope, with documentation and a responsible handoff rather than a black-box launch.",
  },
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-[0.65rem] font-medium tracking-[0.2em] text-[oklch(0.45_0.09_185)] uppercase">
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
        <section className="beacon-paper-noise relative isolate overflow-hidden pt-28 md:pt-32">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute left-[8%] top-0 h-full w-px bg-[oklch(0.45_0.09_185/0.12)]" />
          <div className="pointer-events-none absolute right-[10%] top-0 hidden h-full w-px bg-[oklch(0.45_0.09_185/0.08)] lg:block" />

          <div className="relative container grid min-h-[min(780px,calc(100vh-7rem))] items-center gap-14 py-16 lg:grid-cols-[minmax(0,0.94fr)_minmax(420px,0.86fr)] lg:gap-20 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="relative max-w-2xl"
            >
              <SectionEyebrow>Beacon Labs AI / B2B Systems Engineering</SectionEyebrow>
              <h1 className="max-w-xl font-serif text-[clamp(3.4rem,7vw,6.7rem)] leading-[0.88] tracking-[-0.045em] text-[oklch(0.16_0.03_240)]">
                Make the next
                <br />
                system <span className="text-[oklch(0.40_0.08_185)]">worth</span>
                <br />
                running.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[oklch(0.35_0.035_240)] md:text-xl md:leading-9">
                Beacon Labs helps organizations translate real operating problems into accountable systems—so the work is clearer to run, easier to improve, and ready for responsible use of AI.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#conversation"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[oklch(0.40_0.08_185)] px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] text-[oklch(0.98_0.003_80)] uppercase transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[oklch(0.35_0.07_185)] hover:shadow-[0_18px_28px_oklch(0.16_0.03_240/0.16)] active:translate-y-0"
                >
                  Start a B2B conversation
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#approach"
                  className="inline-flex min-h-12 items-center justify-center gap-3 border border-[oklch(0.35_0.07_185/0.34)] px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] text-[oklch(0.30_0.04_240)] uppercase transition-colors duration-200 hover:border-[oklch(0.75_0.14_85)] hover:bg-[oklch(0.75_0.14_85/0.08)]"
                >
                  See the operating model
                  <ArrowDownRight className="size-4" />
                </a>
              </div>

              <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-[oklch(0.35_0.07_185/0.18)] py-5">
                {[
                  ["B2B", "client service"],
                  ["Human", "reviewed work"],
                  ["Built", "for continuity"],
                ].map(([value, label]) => (
                  <div key={value} className="border-r border-[oklch(0.35_0.07_185/0.14)] px-3 first:pl-0 last:border-r-0">
                    <div className="font-serif text-2xl text-[oklch(0.16_0.03_240)]">{value}</div>
                    <div className="mt-1 font-mono text-[0.55rem] tracking-[0.14em] text-[oklch(0.48_0.02_240)] uppercase">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97, x: 12 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
              className="relative mx-auto w-full max-w-[680px] lg:mx-0"
            >
              <div className="pointer-events-none absolute -left-3 -top-3 h-16 w-16 border-l border-t border-[oklch(0.75_0.14_85/0.86)]" />
              <div className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 border-b border-r border-[oklch(0.40_0.08_185/0.7)]" />
              <div className="relative border border-[oklch(0.16_0.03_240/0.14)] bg-[oklch(0.98_0.003_80)] p-3 shadow-[0_28px_70px_oklch(0.16_0.03_240/0.14)] sm:p-4">
                <img
                  src={HERO_IMG}
                  alt="A lighthouse illuminating a digital operating landscape"
                  className="aspect-[4/3] w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-x-8 bottom-0 h-32 bg-gradient-to-t from-[oklch(0.13_0.03_240/0.7)] to-transparent" />
                <div className="absolute bottom-7 left-7 right-7 flex flex-wrap items-end justify-between gap-4 text-[oklch(0.98_0.003_80)]">
                  <div>
                    <div className="font-mono text-[0.55rem] tracking-[0.2em] text-[oklch(0.78_0.12_85)] uppercase">Operating principle</div>
                    <div className="mt-2 max-w-[17rem] font-serif text-2xl leading-none">System before surface.</div>
                  </div>
                  <div className="border-l border-[oklch(0.98_0.003_80/0.34)] pl-4 font-mono text-[0.55rem] leading-5 tracking-[0.13em] uppercase">
                    Inquiry<br />→ Design<br />→ Stewardship
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-7 -left-2 hidden border border-[oklch(0.16_0.03_240/0.14)] bg-[oklch(0.98_0.003_80/0.96)] px-5 py-4 shadow-lg sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center border border-[oklch(0.75_0.14_85/0.52)] text-[oklch(0.40_0.08_185)]"><Compass className="size-4" /></div>
                  <div>
                    <div className="font-mono text-[0.55rem] tracking-[0.16em] text-[oklch(0.45_0.09_185)] uppercase">B2B service boundary</div>
                    <div className="mt-1 text-sm text-[oklch(0.30_0.04_240)]">A scoped conversation begins here.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="approach" className="relative overflow-hidden bg-[oklch(0.14_0.032_240)] py-24 text-[oklch(0.92_0.005_80)] md:py-32">
          <div className="blueprint-grid-dark pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative container">
            <div className="grid gap-10 border-b border-[oklch(0.75_0.14_85/0.24)] pb-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <SectionEyebrow>What Beacon Labs is for</SectionEyebrow>
                <p className="max-w-sm text-base leading-7 text-[oklch(0.68_0.025_240)]">A B2B service for organizations that have a meaningful operational question and want a disciplined way to answer it.</p>
              </div>
              <h2 className="max-w-4xl font-serif text-[clamp(2.9rem,5vw,5.5rem)] leading-[0.95] tracking-[-0.04em]">
                We do not add another layer of tools. We make the <span className="text-[oklch(0.76_0.14_85)]">existing work</span> easier to see, own, and improve.
              </h2>
            </div>

            <div className="grid divide-y divide-[oklch(0.92_0.005_80/0.14)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              {capabilityGroups.map((group, index) => (
                <motion.article
                  key={group.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group px-0 py-10 lg:px-8 lg:py-14 first:lg:pl-0 last:lg:pr-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <group.icon className="size-6 text-[oklch(0.76_0.14_85)]" strokeWidth={1.35} />
                    <span className="font-mono text-[0.58rem] tracking-[0.16em] text-[oklch(0.57_0.05_185)] uppercase">{group.code}</span>
                  </div>
                  <h3 className="mt-12 max-w-xs font-serif text-3xl leading-[1.02] tracking-[-0.025em]">{group.title}</h3>
                  <p className="mt-5 max-w-sm text-[0.98rem] leading-7 text-[oklch(0.69_0.025_240)]">{group.copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="capabilities" className="beacon-paper-noise relative overflow-hidden py-24 md:py-32">
          <div className="pointer-events-none absolute right-[9%] top-0 h-full w-px bg-[oklch(0.45_0.09_185/0.1)]" />
          <div className="relative container">
            <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-24">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <SectionEyebrow>Working model</SectionEyebrow>
                <h2 className="max-w-md font-serif text-[clamp(3rem,4.7vw,5rem)] leading-[0.92] tracking-[-0.04em] text-[oklch(0.16_0.03_240)]">
                  A clear sequence for serious work.
                </h2>
                <p className="mt-7 max-w-md text-lg leading-8 text-[oklch(0.38_0.03_240)]">
                  Each engagement is scoped around an actual operating need. The shape may differ, but the shared discipline remains: make the decision visible, design the system deliberately, and deliver with stewardship.
                </p>
              </div>

              <div className="border-t border-[oklch(0.35_0.07_185/0.2)]">
                {engagementSteps.map((step, index) => (
                  <motion.article
                    key={step.number}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="group grid gap-5 border-b border-[oklch(0.35_0.07_185/0.2)] py-9 md:grid-cols-[80px_0.92fr_1.08fr] md:gap-7 md:py-11"
                  >
                    <span className="font-mono text-xs tracking-[0.14em] text-[oklch(0.75_0.14_85)]">{step.number}</span>
                    <div>
                      <div className="font-mono text-[0.6rem] tracking-[0.18em] text-[oklch(0.45_0.09_185)] uppercase">{step.label}</div>
                      <h3 className="mt-3 font-serif text-3xl leading-none tracking-[-0.025em] text-[oklch(0.16_0.03_240)]">{step.title}</h3>
                    </div>
                    <p className="max-w-md text-[0.97rem] leading-7 text-[oklch(0.43_0.03_240)]">{step.copy}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-[oklch(0.82_0.105_85)] px-0 py-0 text-[oklch(0.16_0.03_240)]">
          <div className="container grid gap-8 py-12 md:grid-cols-[0.8fr_1.2fr] md:items-center md:py-16">
            <div className="flex items-center gap-4 font-mono text-[0.6rem] font-medium tracking-[0.17em] uppercase">
              <span className="flex size-9 items-center justify-center border border-[oklch(0.16_0.03_240/0.3)]"><Layers3 className="size-4" /></span>
              Separate B2B service
            </div>
            <p className="max-w-3xl font-serif text-2xl leading-[1.1] tracking-[-0.02em] md:text-3xl">
              Beacon Labs is a separate client-service experience within the Beacon Momentum family. A conversation here does not create a membership account or transfer your information to another Beacon property.
            </p>
          </div>
        </section>

        <section id="conversation" className="relative overflow-hidden bg-[oklch(0.16_0.03_240)] py-24 text-[oklch(0.92_0.005_80)] md:py-32">
          <div className="blueprint-grid-dark pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative container grid gap-12 lg:grid-cols-[1fr_0.86fr] lg:items-end">
            <div>
              <SectionEyebrow>Start with the actual question</SectionEyebrow>
              <h2 className="max-w-3xl font-serif text-[clamp(3.4rem,6vw,6rem)] leading-[0.89] tracking-[-0.045em]">
                Bring the system you are trying to make <span className="text-[oklch(0.76_0.14_85)]">work better.</span>
              </h2>
            </div>
            <div className="border-l border-[oklch(0.76_0.14_85/0.5)] pl-7 md:pl-10">
              <p className="max-w-lg text-lg leading-8 text-[oklch(0.70_0.025_240)]">
                Tell us what has become hard to see, hard to run, or hard to hand off. We will determine together whether a scoped Beacon Labs engagement is the right next step.
              </p>
              <a
                href="mailto:hello@beaconlabs.ai?subject=Beacon%20Labs%20B2B%20conversation"
                className="group mt-8 inline-flex min-h-12 items-center gap-3 border border-[oklch(0.76_0.14_85/0.62)] px-6 py-3 font-mono text-xs font-medium tracking-[0.14em] text-[oklch(0.92_0.005_80)] uppercase transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[oklch(0.82_0.105_85)] hover:text-[oklch(0.16_0.03_240)] active:translate-y-0"
              >
                <Mail className="size-4" />
                Email Beacon Labs
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="mt-5 font-mono text-[0.58rem] leading-5 tracking-[0.12em] text-[oklch(0.50_0.03_240)] uppercase">
                Your inquiry stays with Beacon Labs unless you expressly agree to a different handoff.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
