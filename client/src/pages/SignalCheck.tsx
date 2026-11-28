/*
 * Signal Check Landing Page
 * Consent-based request form for the free Signal Check report.
 * Free written snapshot within 5 business days. The paid Working Session is a
 * separate door (see client/src/lib/offers.ts).
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import {
  ArrowRight,
  Check,
  Zap,
  Search,
  BarChart3,
  Brain,
  Send,
  Building2,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Checkbox } from "@/components/ui/checkbox";
import { isBlackFriday, workingSessionHref } from "@/lib/offers";

const benefits = [
  {
    icon: Brain,
    title: "Only what you choose to share",
    description:
      "I start with what you send me and what anyone can see in public. I never ask for passwords or access to your systems.",
  },
  {
    icon: Search,
    title: "A short written snapshot",
    description:
      "If I can help, you get a written snapshot within five business days: what I saw, when I looked, and how I checked.",
  },
  {
    icon: BarChart3,
    title: "The option to go deeper",
    description:
      "If you want the full picture and a plan, the Signal Check Working Session is a separate paid option. You only buy it if you choose to.",
  },
  {
    icon: Zap,
    title: "A straight answer",
    description:
      "If your question isn't something I can help with, I'll tell you that in writing instead of leaving you waiting.",
  },
  {
    icon: Globe,
    title: "Done by me, in my own lab",
    description:
      "I do the analysis myself, on my own equipment, with local AI models. I don't paste your details into public AI services.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Send your question",
    description: "Tell me about the organization and the one question on your mind.",
  },
  {
    step: "02",
    title: "I read it",
    description:
      "Within one business day I tell you whether I can help, and when you'll hear back.",
  },
  {
    step: "03",
    title: "Get your written snapshot",
    description:
      "Within five business days you get what I found, in writing, with what I checked and when.",
  },
  {
    step: "04",
    title: "Decide what's next, if anything",
    description:
      "If it helps, you can book a Working Session for the full plan. If not, the snapshot is yours to keep.",
  },
];

const industries = [
  "E-Commerce / DTC Brand",
  "Coach / Consultant",
  "Course Creator",
  "SaaS / Software",
  "Local Service Business",
  "Restaurant / Food & Beverage",
  "Health & Wellness",
  "Real Estate",
  "Professional Services",
  "Nonprofit",
  "Other",
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  website: string;
  industry: string;
  description: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  businessName: "",
  website: "",
  industry: "",
  description: "",
};

export default function SignalCheck() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consentToContact, setConsentToContact] = useState(false);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: "-100px" });

  // Extract reel keyword from URL params (set by GHL DM link)
  const reelKeyword = new URLSearchParams(window.location.search).get("src")?.toUpperCase() || "";

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.businessName) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!consentToContact) {
      setError("Please confirm consent so Beacon Labs can review and respond to your request.");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      const apiBase =
        import.meta.env.VITE_API_BASE_URL ||
        (window.location.hostname === "localhost" ? "http://localhost:3005" : "");

      const res = await fetch(`${apiBase}/api/signal-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, reelKeyword, consentToContact }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error ${res.status}`);
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg text-center"
          >
            <div className="w-20 h-20 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-[#00d4ff]" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Signal Check Request Received</h1>
            <p className="text-gray-400 text-lg mb-6">
              Thank you. I've got it. I'll read what you sent and reply by email within one
              business day.
            </p>
            <p className="text-gray-500 text-sm">
              Nothing is charged and nothing starts unless you choose it. — Bob
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative pt-28 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00d4ff]/5 via-transparent to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Free. Written. Read by me.
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Start with the question.{" "}
            <span className="text-[#00d4ff]">Choose the next step on purpose.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Send me your website and the one question on your mind. I'll look at how your
            organization shows up today: on your own site, in search, and when someone asks an AI
            tool who to trust. If I can help, you'll get a short written snapshot within five
            business days.
          </p>
          <a
            href="#signal-check-form"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00d4ff] text-black font-bold rounded-lg hover:bg-[#00b8d9] transition-colors text-lg"
          >
            Request My Free Signal Check
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What the Signal Check Makes Clear</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            A clear starting point, in writing, from the person who will do the work.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-[#00d4ff]/30 transition-colors"
              >
                <b.icon className="w-8 h-8 text-[#00d4ff] mb-4" />
                <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What happens after you send it</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="text-4xl font-bold text-[#00d4ff]/20 leading-none mt-1 min-w-[3rem]">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      {/* Working Session: the paid door */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto rounded-xl border border-[#00d4ff]/30 bg-[#00d4ff]/5 p-8">
          <p className="text-sm font-medium uppercase tracking-widest text-[#00d4ff]">Want the full picture?</p>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold">Signal Check Working Session</h2>
          <p className="mt-3 text-xl text-white">
            {isBlackFriday() ? "$197 instead of $297. Black Friday: $100 off, from 12:01 AM ET Nov 27 until 12:01 AM ET Dec 12, 2026." : "$297"}
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-gray-300">
            <li>Up to seven findings, in order of what to fix first</li>
            <li>A 30/60/90-day action brief</li>
            <li>A 15-minute recorded walkthrough you can watch when it suits you</li>
            <li>One round of written follow-up questions within 14 days</li>
          </ul>
          <p className="mt-5 text-gray-400">
            I confirm within one business day whether I can help. If I can't, you get a full refund. Delivery is
            within seven business days. All in writing, no calls.
          </p>
          <a
            href={workingSessionHref()}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 border border-[#00d4ff] text-[#00d4ff] font-semibold rounded-lg hover:bg-[#00d4ff]/10 transition-colors"
          >
            Book a Working Session
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <section id="signal-check-form" ref={formRef} className="py-20 px-6 bg-[#0f0f0f]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Run Your Signal Check</h2>
            <p className="text-gray-400">
              No credit card. No purchase required. Submit a consented request for Beacon Labs to review.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  First Name <span className="text-[#00d4ff]">*</span>
                </label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                  placeholder="First"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Last Name <span className="text-[#00d4ff]">*</span>
                </label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                  placeholder="Last"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email Address <span className="text-[#00d4ff]">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                placeholder="you@yourbusiness.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Business Name <span className="text-[#00d4ff]">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                  placeholder="Your Business Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Website
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  name="website"
                  type="url"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                  placeholder="https://yourbusiness.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Industry
              </label>
              <select
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00d4ff]/50 transition-colors appearance-none"
              >
                <option value="" className="bg-[#1a1a1a]">Select your industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind} className="bg-[#1a1a1a]">
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                What is becoming hard to see, run, or hand off in the organization?
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-colors resize-none"
                placeholder="Briefly describe the operating question, decision, workflow, or handoff you want to examine."
              />
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/10 p-4">
              <Checkbox
                id="signal-check-consent"
                checked={consentToContact}
                onCheckedChange={(checked) => setConsentToContact(checked === true)}
                className="mt-0.5 border-[#00d4ff]/60 data-[state=checked]:bg-[#00d4ff] data-[state=checked]:text-black"
              />
              <label htmlFor="signal-check-consent" className="cursor-pointer text-sm leading-relaxed text-gray-300">
                I agree that Beacon Labs may use the information in this form to review this Signal
                Check request and contact me about it. I have read the{" "}
                <a href="/privacy" className="text-[#00d4ff] underline underline-offset-2 hover:text-white">
                  Privacy Notice
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#00d4ff] text-black font-bold rounded-lg hover:bg-[#00b8d9] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-lg"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Request My Free Signal Check
                </>
              )}
            </button>

            <p className="text-center text-gray-500 text-xs">
              Free. No credit card. I reply by email within one business day.
            </p>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
