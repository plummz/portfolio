"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { flushSync } from "react-dom";
import { ScrollTrigger } from "./gsap";

export const LENSES = [
  { id: "finished", label: "Finished", key: "1", caption: "The page as a visitor sees it." },
  { id: "research", label: "Research", key: "2", caption: "Yellow notes: why things are the way they are." },
  { id: "words", label: "Words", key: "3", caption: "Red pen: the usual line, struck, next to the one I wrote." },
  { id: "build", label: "Build", key: "4", caption: "Blueprint: the grid, the type specs and how it's made." },
] as const;

export type Lens = (typeof LENSES)[number]["id"];

type Ctx = { lens: Lens; setLens: (lens: Lens, origin?: { x: number; y: number }, instant?: boolean) => void };

const LensContext = createContext<Ctx>({ lens: "finished", setLens: () => {} });

export const useLens = () => useContext(LensContext);

export function LensProvider({ children }: { children: ReactNode }) {
  const [lens, setLensState] = useState<Lens>("finished");

  const setLens = useCallback((next: Lens, origin?: { x: number; y: number }, instant = false) => {
    const apply = () => {
      document.documentElement.dataset.lens = next;
      setLensState(next);
      const url = new URL(window.location.href);
      if (next === "finished") url.searchParams.delete("lens");
      else url.searchParams.set("lens", next);
      history.replaceState(null, "", url);
    };
    // notes appearing or leaving change the page height; re-measure scroll animations after they settle
    const remeasure = () => window.setTimeout(() => ScrollTrigger.refresh(), 450);
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || calm || instant) {
      apply();
      remeasure();
      return;
    }
    // the new lens wipes in as a circle growing out of the button that was pressed
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? window.innerHeight;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const root = document.documentElement.style;
    root.setProperty("--vt-x", `${x}px`);
    root.setProperty("--vt-y", `${y}px`);
    root.setProperty("--vt-r", `${r}px`);
    document.startViewTransition(() => flushSync(apply)).finished.then(remeasure, remeasure);
  }, []);

  // ?lens=build (etc.) opens the page in that layer, so a layer can be shared as a link
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("lens");
    if (wanted && wanted !== "finished" && LENSES.some((l) => l.id === wanted))
      setLens(wanted as Lens, undefined, true);
  }, [setLens]);

  // 1-4 on the keyboard switch lenses, unless someone is typing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat || t.closest("input, textarea, select, [contenteditable]"))
        return;
      const hit = LENSES.find((l) => l.key === e.key);
      if (hit) setLens(hit.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setLens]);

  return (
    <LensContext.Provider value={{ lens, setLens }}>
      {/* note and pill animations follow the visitor's reduced-motion setting */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LensContext.Provider>
  );
}
