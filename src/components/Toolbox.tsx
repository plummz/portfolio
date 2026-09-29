"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { toolbox } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

type Group = { key: string; title: string; note: string; items: string[]; chip: string; big: boolean };

const groups: Group[] = [
  {
    key: "lang",
    title: "Languages",
    note: "what I write in",
    items: toolbox.languages,
    chip: "bg-lime text-ink",
    big: true,
  },
  {
    key: "plat",
    title: "Platforms & apps",
    note: "where things get built, stored and shipped",
    items: toolbox.platforms,
    chip: "bg-paper text-ink",
    big: false,
  },
  {
    key: "ai",
    title: "AI sidekicks",
    note: "pair programmers that never sleep",
    items: toolbox.ai,
    chip: "bg-orange text-ink",
    big: true,
  },
];

// fixed tilts so server and client render the same thing
const tilts = [-8, 5, -3, 9, -6, 2, 7, -10, 4, -2, 6, -5, 3, -7, 8, -4, 1, -9, 5, -1];

export default function Toolbox() {
  const root = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // toys dropped into the box, one after another
        gsap.from(".toy", {
          y: () => -window.innerHeight * 0.6,
          rotate: () => gsap.utils.random(-90, 90),
          opacity: 0,
          duration: 1.3,
          ease: "bounce.out",
          stagger: { each: 0.05, from: "random" },
          scrollTrigger: { trigger: box.current, start: "top 75%" },
        });
        gsap.from(".toolbox-head > *", {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".toolbox-head", start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="toolbox" ref={root} className="relative z-10 overflow-hidden bg-violet py-28 text-white md:py-36">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="toolbox-head grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="label flex items-center gap-3 text-white/80">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[0.6rem] text-violet">
                03
              </span>
              Toolbox
            </p>
            <h2 className="mt-6 font-display text-[clamp(3rem,8vw,8rem)] font-extrabold leading-[0.88] tracking-[-0.05em]">
              What&apos;s in my <span className="font-serif font-normal italic text-lime">backpack</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg text-white/85 md:col-span-4 md:justify-self-end">
            Everything below is something I&apos;ve used on a real project, not a list copied from a job post. Go on,
            grab one and throw it.
          </p>
        </div>

        <div
          ref={box}
          className="relative mt-14 min-h-[560px] rounded-[2.5rem] border-2 border-dashed border-white/40 p-5 md:p-10"
        >
          <div className="flex flex-col gap-10">
            {groups.map((g, gi) => (
              <div key={g.key}>
                <p className="label mb-4 text-white/75">
                  {g.title} <span className="normal-case tracking-normal text-white/50">· {g.note}</span>
                </p>
                <ul className="flex flex-wrap gap-3 md:gap-4">
                  {g.items.map((item, ii) => {
                    const offset = groups.slice(0, gi).reduce((sum, x) => sum + x.items.length, 0);
                    const t = tilts[(offset + ii) % tilts.length];
                    return (
                      <motion.li
                        key={item}
                        drag
                        dragConstraints={box}
                        dragElastic={0.35}
                        dragTransition={{ bounceStiffness: 300, bounceDamping: 12 }}
                        whileHover={{ scale: 1.08, rotate: 0 }}
                        whileDrag={{ scale: 1.2, rotate: t * -1.5, zIndex: 50 }}
                        style={{ rotate: t }}
                        data-cursor="Throw"
                        className={`toy sticker relative touch-none select-none rounded-full font-display font-extrabold tracking-tight ${g.chip} ${
                          g.big ? "px-6 py-3 text-2xl md:px-8 md:py-4 md:text-4xl" : "px-5 py-2.5 text-lg md:text-2xl"
                        }`}
                      >
                        {item}
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <p className="label mt-10 text-right text-white/60">↖ everything here is draggable</p>
        </div>
      </div>
    </section>
  );
}
