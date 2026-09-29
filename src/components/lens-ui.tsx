"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { LENSES, useLens } from "@/lib/lens";

const pop = {
  initial: { opacity: 0, scale: 0.6, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 6 },
  transition: { type: "spring" as const, stiffness: 380, damping: 24 },
};

/** Research lens: a yellow sticky note with the reason behind a decision. */
export function Sticky({
  children,
  className = "",
  tilt = -2,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  const { lens } = useLens();
  return (
    <AnimatePresence>
      {lens === "research" && (
        <motion.aside
          {...pop}
          style={{ rotate: tilt }}
          className={`relative z-30 w-full max-w-[17rem] bg-sticky px-5 pb-5 pt-6 font-hand text-[1.45rem] leading-[1.15] text-ink shadow-[0_14px_24px_-14px_rgba(25,28,58,0.55)] ${className}`}
        >
          <span
            aria-hidden
            className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-white/60 shadow-sm backdrop-blur-[1px]"
          />
          <span className="sr-only">Research note: </span>
          {children}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

/** Words lens: a red-pen comment in the margin. */
export function RedPen({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { lens } = useLens();
  return (
    <AnimatePresence>
      {lens === "words" && (
        <motion.aside
          {...pop}
          className={`relative z-30 max-w-[18rem] font-hand text-[1.5rem] leading-[1.1] text-redpen ${className}`}
        >
          <span className="sr-only">Editor&apos;s note: </span>
          {children}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

/** Words lens: shows the usual line struck through before the line that shipped. */
export function Swap({ usual, children }: { usual: string; children: ReactNode }) {
  const { lens } = useLens();
  return (
    <>
      <AnimatePresence initial={false}>
        {lens === "words" && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="block overflow-hidden"
          >
            <span className="block font-hand text-[1.15rem] font-normal leading-none text-redpen">
              what most apps say
            </span>
            <del className="strike mb-1 inline-block">{usual}</del>
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}

/** Build lens: a technical note on blueprint paper. */
export function BuildNote({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const { lens } = useLens();
  return (
    <AnimatePresence>
      {lens === "build" && (
        <motion.aside
          {...pop}
          className={`relative z-30 border border-white/70 bg-white/[0.07] p-5 font-mono text-[0.8rem] leading-relaxed text-white ${className}`}
        >
          <p className="mb-2 font-bold">{title}</p>
          {children}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

/** Build lens: the 12-column grid the page is laid out on. */
export function GridOverlay() {
  return (
    <div aria-hidden className="build-only pointer-events-none fixed inset-0 z-0">
      <div className="mx-auto grid h-full max-w-[1240px] grid-cols-4 gap-5 px-5 md:grid-cols-12 md:px-10">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={`h-full bg-white/[0.06] ${i >= 4 ? "hidden md:block" : ""}`} />
        ))}
      </div>
    </div>
  );
}

const swatch: Record<string, string> = {
  finished: "bg-paper border border-ink/30",
  research: "bg-sticky",
  words: "bg-redpen",
  build: "bg-blueprint border border-white/60",
};

/** The switch at the bottom of the screen. */
export function LensDock() {
  const { lens, setLens } = useLens();
  const current = LENSES.find((l) => l.id === lens)!;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-50 flex flex-col items-center gap-2 px-3 md:bottom-6">
      <p
        aria-live="polite"
        className="pointer-events-auto max-w-[calc(100vw-1.5rem)] rounded-full bg-ink px-4 py-1.5 text-center text-[0.8rem] leading-snug text-white shadow-lg sm:text-[0.9rem]"
      >
        {current.caption}
      </p>
      <div
        role="group"
        aria-label="Look at this page as"
        className="pointer-events-auto flex w-full max-w-[25rem] items-center gap-0.5 rounded-full border border-ink/15 bg-white p-1 shadow-[0_18px_40px_-18px_rgba(25,28,58,0.6)] sm:w-auto sm:max-w-none sm:gap-1 sm:p-1.5"
      >
        {LENSES.map((l) => {
          const on = l.id === lens;
          return (
            <button
              key={l.id}
              aria-pressed={on}
              aria-keyshortcuts={l.key}
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setLens(l.id, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
              }}
              className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-full min-h-11 px-1.5 py-2 font-display text-[0.82rem] font-semibold transition-colors sm:flex-none sm:gap-2 sm:px-4 sm:text-[0.95rem] ${
                on ? "text-white" : "text-ink hover:bg-mist"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="lens-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span
                aria-hidden
                className={`relative h-2.5 w-2.5 shrink-0 rounded-full sm:h-3 sm:w-3 ${swatch[l.id]}`}
              />
              <span className="relative">{l.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
