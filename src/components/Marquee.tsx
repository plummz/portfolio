"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef } from "react";

// A strip of words that drifts on its own and speeds up (or reverses) with your scrolling.
function Band({ words, base, className, star }: { words: string[]; base: number; className: string; star: string }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const dir = useRef(1);
  const calm = useReducedMotion();
  const skew = useTransform(velocity, [-2000, 2000], [-8, 8]);

  useAnimationFrame((_, delta) => {
    if (calm) return;
    const b = boost.get();
    if (b < 0) dir.current = -1;
    else if (b > 0) dir.current = 1;
    const move = dir.current * base * (delta / 1000) * (1 + Math.abs(b));
    x.set(wrap(-50, 0, x.get() + move));
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-6 md:px-10">{w}</span>
          <span aria-hidden className="text-[0.6em]">
            {star}
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div className={`overflow-hidden py-3 md:py-5 ${className}`}>
      <motion.div
        className="flex w-max whitespace-nowrap font-display text-4xl font-extrabold uppercase tracking-tight md:text-7xl"
        style={{ x: useTransform(x, (v) => `${v}%`), skewX: skew }}
      >
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative z-20 -my-10 py-16" aria-hidden>
      <Band
        words={["Research", "Write", "Design", "Build", "Test", "Repeat"]}
        base={-2.2}
        star="✺"
        className="relative z-10 -rotate-3 bg-lime text-ink"
      />
      <Band
        words={["Engineer", "Writer", "Researcher", "Figma to code", "Words that help"]}
        base={1.6}
        star="●"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-2 bg-violet text-white"
      />
    </div>
  );
}
