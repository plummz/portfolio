"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

// A dot that sticks to the pointer and a ring that lags behind it.
// Anything with data-cursor="Label" makes the ring grow and show that label.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm || !dot.current || !ring.current) return;
    // the cursor elements stay display:none until this class is on <html>
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      if (!el) {
        setLabel("");
        gsap.to(ring.current, { scale: 1, duration: 0.35, ease: "power3" });
        return;
      }
      const text = el.dataset.cursor ?? "";
      setLabel(text);
      gsap.to(ring.current, { scale: text ? 3.2 : 1.8, duration: 0.35, ease: "back.out(2)" });
    };

    const down = () => gsap.to(ring.current, { scale: "*=0.8", duration: 0.15 });
    const up = () => gsap.to(ring.current, { scale: "/=0.8", duration: 0.2 });
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="cursor-el pointer-events-none fixed left-0 top-0 z-[200] -ml-5 -mt-5 grid h-10 w-10 place-items-center rounded-full border border-white/70 mix-blend-difference"
      >
        <span className="label text-[0.28rem] tracking-[0.1em] text-white">{label}</span>
      </div>
      <div
        ref={dot}
        aria-hidden
        className="cursor-el pointer-events-none fixed left-0 top-0 z-[201] -ml-1 -mt-1 h-2 w-2 rounded-full bg-white mix-blend-difference"
      />
    </>
  );
}
