/*
 * Beacon Brand System — B2B Blueprint: a role-aware navigation shell for the
 * focused Beacon Labs B2B journey. It provides clear discovery links to the
 * governed services, approach, endorsed resource, and conversation pathways.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

const navLinks = [
  { label: "Signal Check", href: "/signal-check" },
  { label: "Work with me", href: "/#work" },
  { label: "Founder Brief", href: "/founder-brief" },
  { label: "PatchPilot", href: "/patchpilot" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // If it's a hash link on the home page and we're already home, scroll to it
    if (href.startsWith("/#") && location === "/") {
      const el = document.querySelector(href.replace("/", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // Otherwise navigate normally
    window.location.href = href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#09161f]/98 backdrop-blur-xl shadow-[0_1px_0_rgba(125,211,199,0.14),0_10px_30px_rgba(0,0,0,0.24)]"
          : "bg-[#09161f]/94 backdrop-blur-md"
      }`}
    >
      <div className="border-b border-white/10 bg-[#061019] text-slate-200">
        <div className="container flex h-8 items-center justify-between gap-3 overflow-hidden whitespace-nowrap font-mono text-[0.58rem] tracking-[0.15em] uppercase">
          <span><span className="text-[#d6b45a]">Beacon Momentum, LLC</span><span className="mx-2 text-slate-600">/</span>Beacon Labs · B2B Systems</span>
          <a href="https://beaconmomentum.com" target="_blank" rel="noopener noreferrer" className="hidden shrink-0 text-[#7dd3c7] transition-colors hover:text-white sm:inline">Parent-company front door ↗</a>
        </div>
      </div>
      <nav className="container flex items-center justify-between h-16 md:h-[4.75rem]">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <img
            src="/brand/beacon-mark.svg"
            alt="Beacon"
            className="h-9 w-9 rounded-lg border border-white/10 bg-[#0d1f2b] p-1.5 transition-transform duration-300 group-hover:scale-105 md:h-11 md:w-11"
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg font-normal tracking-tight text-white md:text-xl">
              Beacon Labs
            </span>
            <span className="-mt-0.5 hidden font-mono text-[0.6rem] tracking-[0.2em] text-[#7dd3c7] uppercase md:block">
              B2B Systems Engineering
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith("/#") && location === "/") {
                  e.preventDefault();
                  handleNavClick(link.href);
                }
              }}
              className={`font-mono text-xs tracking-[0.1em] uppercase px-4 py-2 transition-colors duration-300 relative group ${
                location === link.href
                  ? "text-[#7dd3c7]"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-[oklch(0.75_0.14_85)] transition-all duration-300 ${
                  location === link.href ? "w-3/4" : "w-0 group-hover:w-3/4"
                }`}
              />
            </a>
          ))}
          <a
            href="/signal-check"
            className="ml-4 rounded-sm bg-[#2f7b75] px-5 py-2.5 font-mono text-xs tracking-[0.1em] text-white uppercase transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#276661] hover:shadow-[0_0_20px_rgba(125,211,199,0.24)] active:translate-y-0"
          >
            Request a Signal Check
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-100 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-[#09161f]/98 backdrop-blur-xl lg:hidden"
          >
            <div className="container py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`font-mono text-sm tracking-[0.1em] uppercase px-4 py-3 rounded-sm transition-colors ${
                    location === link.href
                      ? "bg-[#7dd3c7]/10 text-[#7dd3c7]"
                      : "text-slate-100 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/signal-check"
                className="mt-3 rounded-sm bg-[#2f7b75] px-4 py-3 text-center font-mono text-sm tracking-[0.1em] text-white uppercase"
              >
                Request a Signal Check
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
