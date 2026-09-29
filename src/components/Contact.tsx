"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { person } from "@/lib/content";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import Magnetic from "./Magnetic";
import { scrollToTarget } from "./SmoothScroll";

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      timeZone: person.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, []);
  return <span className="tabular-nums">{time || "--:--"}</span>;
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  useGSAP(
    () => {
      const split = new SplitText(".contact-title", { type: "lines,chars", linesClass: "split-line" });
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(split.chars, {
          yPercent: 120,
          rotate: 8,
          duration: 1,
          ease: "expo.out",
          stagger: 0.015,
          scrollTrigger: { trigger: ".contact-title", start: "top 80%" },
        });
        gsap.from(".contact-ball", {
          scale: 0,
          rotate: -180,
          duration: 1.4,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: { trigger: ".contact-ball", start: "top 90%" },
        });
        gsap.to(".contact-spin", { rotate: 360, duration: 14, ease: "none", repeat: -1 });
      });
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className="grid-bg grain relative overflow-hidden bg-ink pb-10 pt-32">
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="label flex items-center gap-3 text-white/70">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-lime text-[0.6rem] text-ink">04</span>
          Contact
        </p>

        <h2 className="contact-title mt-8 font-display text-[clamp(3.2rem,10vw,10rem)] font-extrabold leading-[0.86] tracking-[-0.05em]">
          Got a messy flow? <span className="font-serif font-normal italic text-pink">Send it over.</span>
        </h2>

        <div className="mt-16 grid items-center gap-12 md:grid-cols-12">
          <div className="space-y-6 md:col-span-7">
            <p className="max-w-lg text-xl leading-relaxed text-white/80">
              I&apos;m happy to talk about internships, a freelance build, or a screen you think is confusing and want a
              second pair of eyes on.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={copy}
                data-cursor="Copy"
                className="group relative overflow-hidden rounded-full border-2 border-white/80 px-6 py-3 font-display text-lg font-bold md:text-2xl"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-lime transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-y-0" />
                <span className="relative transition-colors group-hover:text-ink">{person.email}</span>
              </button>
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="label rounded-full bg-lime px-3 py-1.5 text-ink"
                    role="status"
                  >
                    Copied ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="flex gap-6 pt-2">
              <a
                href={person.github}
                target="_blank"
                rel="noreferrer"
                className="label underline decoration-lime decoration-2 underline-offset-8 hover:text-lime"
              >
                GitHub ↗
              </a>
              <a
                href={`mailto:${person.email}`}
                className="label underline decoration-pink decoration-2 underline-offset-8 hover:text-pink"
              >
                Open mail app ↗
              </a>
            </div>
          </div>

          <div className="flex justify-center md:col-span-5 md:justify-end">
            <Magnetic strength={0.45}>
              <a
                href={`mailto:${person.email}?subject=Hi%20John%20Rey`}
                data-cursor="Write"
                className="contact-ball relative grid h-56 w-56 place-items-center rounded-full bg-pink text-ink transition-transform duration-500 hover:scale-110 md:h-72 md:w-72"
              >
                <svg viewBox="0 0 200 200" className="contact-spin absolute inset-0 h-full w-full" aria-hidden>
                  <defs>
                    <path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                  </defs>
                  <text className="fill-ink font-mono text-[13px] uppercase tracking-[0.3em]">
                    <textPath href="#circle" textLength="486" lengthAdjust="spacing">
                      say hello · say hello · say hello ·
                    </textPath>
                  </text>
                </svg>
                <span className="font-display text-5xl font-extrabold md:text-6xl">Hi!</span>
              </a>
            </Magnetic>
          </div>
        </div>

        <footer className="mt-28 flex flex-col gap-6 border-t border-white/15 pt-8 text-white/60 md:flex-row md:items-center md:justify-between">
          <p className="label">
            © 2026 {person.first} {person.last}
          </p>
          <p className="label flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime" />
            My local time · <LocalTime />
          </p>
          <button onClick={() => scrollToTarget(0)} className="label text-left hover:text-lime">
            Back to top ↑
          </button>
        </footer>
      </div>

      <p
        aria-hidden
        className="pointer-events-none mt-10 select-none whitespace-nowrap text-center font-display text-[19vw] font-extrabold leading-[0.75] tracking-[-0.06em] text-white/[0.04]"
      >
        {person.first}
      </p>
    </section>
  );
}
