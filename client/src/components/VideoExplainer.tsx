/*
 * VideoExplainer — Blueprint Aesthetic (V6 Final)
 * Founder briefing for the Beacon Labs B2B Blueprint homepage.
 * It preserves the approved Bob Burr video asset while reframing the surrounding
 * copy and CTA around the free-report-first Signal Check pathway, including the
 * separately chosen paid follow-up described in the report when appropriate.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Search, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";

const VIDEO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/bzYejrWwNWFmBWbF.mp4";
const POSTER_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/SjkajeBhRNKbGKdL.jpg";

const keyPoints = [
  {
    icon: Search,
    title: "Make the work legible",
    description:
      "Clear service language, evidence, and ownership help people and emerging discovery systems understand what an organization actually does.",
  },
  {
    icon: MessageSquare,
    title: "Set the handoff on purpose",
    description:
      "A request should arrive with a responsible team and clear expectations—not disappear into an opaque funnel.",
  },
  {
    icon: TrendingUp,
    title: "Choose the next step consciously",
    description:
      "The free report can explain an optional paid follow-up. It remains a separate, affirmative decision—not an automatic next step.",
  },
];

export default function VideoExplainer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setHasStarted(true);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="founder-brief" className="relative bg-[oklch(0.18_0.035_200)] py-20 md:py-28 overflow-hidden">
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid-dark opacity-20" />

      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[oklch(0.45_0.09_185/0.08)] blur-[120px]" />

      <div className="relative container" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
          <span className="section-label text-[oklch(0.75_0.14_85)]">
              A founder briefing on responsible next steps
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            {/* Blueprint frame annotations */}
            <div className="absolute -inset-3 border border-[oklch(0.45_0.09_185/0.12)] rounded-sm hidden md:block" />
            <div className="absolute -top-7 -left-3 font-mono text-[0.55rem] text-[oklch(0.45_0.09_185/0.4)] hidden md:block">
              <div>VID: BL-AEO-001</div>
            </div>
            <div className="absolute -top-7 -right-3 font-mono text-[0.55rem] text-[oklch(0.45_0.09_185/0.4)] hidden md:block">
              <div>FOUNDER BRIEF</div>
            </div>

            {/* Video container */}
            <div
              className="relative rounded-sm overflow-hidden shadow-2xl cursor-pointer group"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src={VIDEO_URL}
                className="w-full aspect-[1920/1180] object-cover bg-[oklch(0.12_0.03_240)]"
                playsInline
                preload="metadata"
                poster={POSTER_URL}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
              />

              {/* Play overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-[oklch(0.10_0.03_240/0.4)] transition-opacity">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[oklch(0.75_0.14_85)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play
                      size={28}
                      className="text-[oklch(0.16_0.03_240)] ml-1"
                      fill="oklch(0.16 0.03 240)"
                    />
                  </div>
                </div>
              )}

              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[oklch(0.10_0.03_240/0.6)] to-transparent pointer-events-none" />
            </div>

            {/* Speaker attribution */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-3 mt-4"
            >
              <div className="w-8 h-8 rounded-full bg-[oklch(0.40_0.08_185)] flex items-center justify-center">
                <span className="font-mono text-[0.6rem] font-bold text-[oklch(0.95_0.005_80)]">
                  BB
                </span>
              </div>
              <div>
                <div className="font-sans text-sm font-medium text-[oklch(0.90_0.005_80)]">
                  Bob Burr
                </div>
                <div className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[oklch(0.55_0.03_185)]">
                  Founder, Beacon Labs AI
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Key Points */}
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-serif text-2xl md:text-3xl leading-tight text-[oklch(0.95_0.005_80)] mb-3"
            >
              The operating question is real.
              <br />
              <span className="text-[oklch(0.75_0.14_85)]">The next step should be clear.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-[oklch(0.65_0.03_185)] mb-8 leading-relaxed"
            >
              In this briefing, Bob explains the discipline behind Beacon Labs: make the operating problem visible, establish accountability, and choose the next decision on purpose. The free Signal Check report makes the immediate need easier to see; when it fits, that report also introduces a separately chosen paid follow-up that begins answering the questions it surfaces.
            </motion.p>

            <div className="space-y-5 mb-8">
              {keyPoints.map((point, i) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-sm bg-[oklch(0.45_0.09_185/0.15)] flex items-center justify-center shrink-0 mt-0.5">
                    <point.icon size={16} className="text-[oklch(0.75_0.14_85)]" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-[oklch(0.92_0.005_80)] mb-0.5">
                      {point.title}
                    </h4>
                    <p className="text-sm text-[oklch(0.55_0.03_185)] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <a
                href="/signal-check"
                className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.1em] uppercase px-6 py-3 bg-[oklch(0.75_0.14_85)] text-[oklch(0.16_0.03_240)] rounded-sm hover:bg-[oklch(0.80_0.13_85)] transition-all duration-300 hover:shadow-[0_0_25px_oklch(0.75_0.14_85/0.3)]"
              >
                Request the free Signal Check
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <p className="font-mono text-[0.6rem] tracking-[0.1em] text-[oklch(0.45_0.03_185)] mt-3">
                A free request is reviewed first. It does not begin an automatic scan, report, paid follow-up, or service engagement.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom edge — smooth transition to trust signals */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-px">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-8 md:h-12">
          <path d="M0 60 L0 30 Q360 0 720 15 Q1080 30 1440 5 L1440 60 Z" fill="#1a3d3f" />
        </svg>
      </div>
    </section>
  );
}
