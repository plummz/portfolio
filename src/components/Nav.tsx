"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { person } from "@/lib/content";
import Magnetic from "./Magnetic";
import { getLenis, scrollToTarget } from "./SmoothScroll";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#toolbox", label: "Toolbox" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !open);
  });

  useEffect(() => {
    if (open) getLenis()?.stop();
    else getLenis()?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[120] h-[3px] origin-left bg-lime"
        style={{ scaleX: scrollYProgress }}
        aria-hidden
      />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[110] flex items-center justify-between px-4 py-4 md:px-8"
      >
        <a
          href="#top"
          onClick={go("#top")}
          className="group flex items-center gap-2 font-display text-lg font-extrabold"
          aria-label="Back to top"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-lime text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
            {person.short}
          </span>
          <span className="hidden text-sm font-semibold text-white/80 sm:inline">
            {person.first} {person.last}
          </span>
        </a>

        <nav
          className="hidden items-center rounded-full border border-white/10 bg-ink/60 p-1 backdrop-blur-md md:flex"
          onMouseLeave={() => setHover(null)}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={go(l.href)}
              onMouseEnter={() => setHover(l.href)}
              className="relative px-4 py-2 text-sm font-medium"
            >
              {hover === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative transition-colors ${hover === l.href ? "text-ink" : "text-white/80"}`}>
                {l.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic className="hidden md:inline-block">
            <a
              href="#contact"
              onClick={go("#contact")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-pink"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#1fbf5f]" />
              Let&apos;s talk
            </a>
          </Magnetic>
          <button
            onClick={() => setOpen((o) => !o)}
            className="relative z-[130] grid h-11 w-11 place-items-center rounded-full bg-white text-ink md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[105] flex flex-col justify-between bg-lime px-6 pb-10 pt-28 text-ink md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 38px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 38px) 38px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 38px) 38px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="space-y-2">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={go(l.href)}
                    className="flex items-baseline gap-3 font-display text-6xl font-extrabold tracking-tight"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="label">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="label flex justify-between">
              <a href={`mailto:${person.email}`}>Email</a>
              <a href={person.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
