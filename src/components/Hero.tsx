"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { person } from "@/lib/content";
import { gsap, onIntro, SplitText, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "./SmoothScroll";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function RoleFlipper() {
  const words = person.roles.map((r) => r.replace("UX ", ""));
  const [i, setI] = useState(0);
  const word = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t = window.setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => window.clearInterval(t);
  }, [words.length]);

  useEffect(() => {
    if (i === 0 || !word.current) return;
    gsap.fromTo(
      word.current,
      { yPercent: 90, rotateX: -70, opacity: 0 },
      { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.7, ease: "back.out(2)" },
    );
  }, [i]);

  return (
    <span className="relative inline-flex h-[1.15em] items-center overflow-hidden rounded-full bg-lime px-[0.45em] align-middle text-ink [perspective:400px]">
      <span className="invisible">Researcher</span>
      <span ref={word} className="absolute inset-x-0 text-center">
        {words[i]}
      </span>
    </span>
  );
}

const stickers = [
  { text: "hi, it's me 👋", className: "bg-white text-ink -rotate-6", pos: "left-[-14%] top-[16%]" },
  { text: "made in PH ☀", className: "bg-orange text-ink rotate-6", pos: "right-[-16%] top-[46%]" },
  { text: "drag me!", className: "bg-pink text-ink -rotate-3", pos: "left-[-8%] bottom-[14%]" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const bounds = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const first = new SplitText(".hero-first", { type: "chars", charsClass: "inline-block will-change-transform" });
      const last = new SplitText(".hero-last", { type: "chars", charsClass: "inline-block will-change-transform" });

      gsap.set([first.chars, last.chars], { yPercent: 120, rotate: 12, opacity: 0 });
      gsap.set(".hero-arch", { scale: 0.2, opacity: 0, rotate: -12 });
      gsap.set(".hero-sticker", { scale: 0, opacity: 0 });
      gsap.set(".hero-fade", { y: 20, opacity: 0 });

      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(".hero-arch", { scale: 1, opacity: 1, rotate: 0, duration: 1.4, ease: "elastic.out(1, 0.6)" })
          .to(first.chars, { yPercent: 0, rotate: 0, opacity: 1, duration: 1.1, stagger: 0.04 }, 0.1)
          .to(last.chars, { yPercent: 0, rotate: 0, opacity: 1, duration: 1.1, stagger: 0.035 }, 0.25)
          .to(".hero-fade", { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, 0.5)
          .to(".hero-sticker", { scale: 1, opacity: 1, duration: 0.8, stagger: 0.12, ease: "back.out(2.5)" }, 0.8);
      };
      const off = onIntro(play);

      // on scroll, the names slide apart and the portrait sinks away
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero-first-wrap", { xPercent: -18, ease: "none", scrollTrigger: st });
        gsap.to(".hero-last-wrap", { xPercent: 12, ease: "none", scrollTrigger: st });
        gsap.to(".hero-portrait", { yPercent: 25, scale: 0.88, ease: "none", scrollTrigger: st });
        gsap.to(".hero-scene", { opacity: 0.2, yPercent: -10, ease: "none", scrollTrigger: st });
      });

      return () => {
        off();
        first.revert();
        last.revert();
      };
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="grid-bg grain relative flex min-h-[100svh] flex-col overflow-hidden pb-8 pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(123,92,255,.55), rgba(255,95,168,.15) 45%, transparent 70%)",
        }}
      />
      <div className="hero-scene absolute inset-0">
        <HeroScene />
      </div>

      <div ref={bounds} className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-4 md:px-8">
        <div className="hero-fade label flex justify-between text-white/60">
          <span>Portfolio · 2026</span>
          <span className="hidden sm:inline">Based in the {person.location}</span>
        </div>

        <div className="relative grid flex-1 items-center gap-6 py-6 md:grid-cols-12">
          <div className="order-2 md:order-1 md:col-span-7">
            <h1 className="sr-only">
              {person.first} {person.last}, {person.roles.join(", ")}
            </h1>
            <div className="hero-first-wrap">
              <p
                aria-hidden
                className="hero-first font-display text-[clamp(3.4rem,10.5vw,10.5rem)] font-extrabold leading-[0.86] tracking-[-0.05em]"
              >
                {person.first}
              </p>
            </div>
            <div className="hero-last-wrap">
              <p
                aria-hidden
                className="hero-last -mt-[0.05em] font-serif text-[clamp(3.2rem,9.6vw,9.6rem)] italic leading-[0.95] tracking-[-0.03em] text-pink"
              >
                {person.last}
              </p>
            </div>
          </div>

          <div className="hero-portrait pointer-events-none relative z-10 order-1 mx-auto w-[min(56vw,300px)] md:order-2 md:col-span-5 md:w-[min(30vw,400px,calc((100svh-260px)*0.786))] md:justify-self-center">
            <div className="hero-arch relative aspect-[33/42] w-full">
              <div className="absolute inset-0 overflow-hidden rounded-t-full rounded-b-[2rem] bg-lime">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    background:
                      "repeating-radial-gradient(circle at 50% 38%, transparent 0 18px, rgba(13,12,17,.18) 18px 19px)",
                  }}
                />
                <Image
                  src="/img/john-cutout.webp"
                  alt="Portrait of John Rey Marquillero"
                  width={1036}
                  height={898}
                  priority
                  className="absolute bottom-0 left-1/2 w-[128%] max-w-none -translate-x-1/2"
                />
              </div>
              {stickers.map((s) => (
                <motion.div
                  key={s.text}
                  drag
                  dragConstraints={bounds}
                  dragElastic={0.2}
                  whileDrag={{ scale: 1.15, rotate: 0 }}
                  whileHover={{ scale: 1.08 }}
                  data-cursor="Drag"
                  className={`hero-sticker sticker pointer-events-auto absolute ${s.pos} z-20 touch-none select-none whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${s.className}`}
                >
                  {s.text}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-balance font-display text-2xl font-semibold leading-tight md:text-3xl">
            UX <RoleFlipper /> who also writes the code, the copy, and the interview notes.
          </p>
          <button
            onClick={() => scrollToTarget("#about")}
            className="hero-fade group label flex items-center gap-3 self-start text-white/70 transition-colors hover:text-lime md:self-end"
          >
            <span className="relative grid h-12 w-8 place-items-start justify-center rounded-full border border-current pt-2">
              <span className="h-2 w-1 animate-bounce rounded-full bg-current" />
            </span>
            Scroll, there&apos;s more
          </button>
        </div>
      </div>
    </section>
  );
}
