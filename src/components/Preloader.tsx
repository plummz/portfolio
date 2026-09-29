"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, INTRO_EVENT } from "@/lib/gsap";
import { getLenis } from "./SmoothScroll";

const greetings = ["Hello", "Kumusta", "Maayong adlaw", "Hola", "Bonjour", "Ciao", "Hi, I'm JR"];

function finishIntro() {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event(INTRO_EVENT));
}

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const curve = useRef<SVGPathElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [word, setWord] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("jr-intro") === "1";
    } catch {}
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || calm) {
      if (root.current) root.current.style.display = "none";
      finishIntro();
      return;
    }

    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";

    const counter = { v: 0 };
    const w = window.innerWidth;
    const h = window.innerHeight;
    const flat = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;
    const bent = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 260} 0 ${h} L0 0`;
    gsap.set(curve.current, { attr: { d: flat } });

    let i = 0;
    const cycle = window.setInterval(() => {
      i = Math.min(i + 1, greetings.length - 1);
      setWord(i);
    }, 290);

    const tl = gsap.timeline({
      onComplete: () => {
        setGone(true);
      },
    });

    tl.to(counter, {
      v: 100,
      duration: 2.1,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
      },
    })
      .add(() => {
        window.clearInterval(cycle);
        setWord(greetings.length - 1);
      })
      .to(".pl-fade", { opacity: 0, y: -30, duration: 0.45, ease: "power3.in", stagger: 0.05 }, "+=0.25")
      .to(curve.current, { attr: { d: bent }, duration: 0.5, ease: "power2.in" }, "<0.1")
      .to(root.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "<0.1")
      .to(curve.current, { attr: { d: flat }, duration: 0.6, ease: "power2.out" }, "<0.35")
      .add(() => {
        try {
          sessionStorage.setItem("jr-intro", "1");
        } catch {}
        document.documentElement.style.overflow = "";
        getLenis()?.start();
        finishIntro();
      }, "<-0.2");

    return () => {
      window.clearInterval(cycle);
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className="preloader fixed inset-0 z-[300]" aria-hidden>
      <svg className="absolute inset-0 h-[calc(100%+300px)] w-full" preserveAspectRatio="none">
        <path ref={curve} fill="var(--lime)" />
      </svg>
      <div className="relative flex h-full flex-col justify-between p-6 text-ink md:p-10">
        <div className="pl-fade label flex justify-between">
          <span>John Rey Marquillero</span>
          <span>Portfolio · 2026</span>
        </div>
        <div className="pl-fade flex items-center gap-4 self-center">
          <span className="h-3 w-3 animate-pulse rounded-full bg-ink" />
          <span className="font-display text-5xl font-bold tracking-tight md:text-7xl">{greetings[word]}</span>
        </div>
        <div className="pl-fade flex items-end justify-between">
          <span className="label max-w-[14rem]">Loading the fun parts first</span>
          <span ref={count} className="font-display text-7xl font-extrabold leading-none tabular-nums md:text-[9rem]">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
