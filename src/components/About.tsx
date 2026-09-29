"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { about } from "@/lib/content";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

function TiltCard({ children, color }: { children: React.ReactNode; color: string }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  return (
    <motion.article
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      whileHover={{ y: -8 }}
      className="role-card group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[2rem] border-2 border-ink bg-white p-7"
    >
      <span
        aria-hidden
        className="absolute -right-16 -top-16 h-44 w-44 rounded-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[5]"
        style={{ background: color }}
      />
      <div className="relative">{children}</div>
    </motion.article>
  );
}

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(".about-intro", { type: "words" });
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // words light up one by one as you read down the page
        gsap.fromTo(
          split.words,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ".about-intro", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );

        gsap.from(".role-card", {
          y: 120,
          rotate: (i) => [-6, 4, -3][i] ?? 0,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".role-grid", start: "top 85%" },
        });

        gsap.from(".about-photo", {
          clipPath: "inset(100% 0% 0% 0% round 1.5rem)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: ".about-photo", start: "top 85%" },
        });
      });

      // count stats up from zero when they come into view
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="relative z-10 rounded-t-[3rem] bg-paper pb-28 pt-32 text-ink md:pt-40">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="label flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-[0.6rem] text-paper">01</span>
              About me
            </p>
            <div className="about-photo relative mt-8 hidden aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-3xl bg-sky md:block">
              <Image
                src="/img/john-portrait.webp"
                alt="John Rey smiling in a navy polo"
                fill
                sizes="260px"
                className="object-cover object-top"
              />
              <span className="label absolute bottom-3 left-3 rounded-full bg-paper px-3 py-1 text-[0.6rem]">
                that&apos;s me
              </span>
            </div>
          </div>
          <p className="about-intro font-display text-[clamp(1.7rem,3.6vw,3.4rem)] font-semibold leading-[1.12] tracking-tight md:col-span-9">
            {about.intro}
          </p>
        </div>

        <div className="role-grid mt-24 grid gap-5 md:grid-cols-3">
          {about.roles.map((r, i) => (
            <TiltCard key={r.title} color={r.color}>
              <div className="flex items-start justify-between">
                <span className="label">0{i + 1}</span>
                <span className="label rounded-full border border-ink px-3 py-1">{r.tag}</span>
              </div>
              <h3 className="mt-16 font-display text-4xl font-extrabold tracking-tight">{r.title}</h3>
              <p className="mt-4 text-lg leading-snug text-ink/75 transition-colors group-hover:text-ink">{r.body}</p>
            </TiltCard>
          ))}
        </div>

        <div className="mt-24 grid gap-10 border-t-2 border-ink pt-10 md:grid-cols-3">
          {about.stats.map((s) => (
            <div key={s.label} className="flex items-end gap-4">
              <p className="font-display text-[5.5rem] font-extrabold leading-[0.8] tracking-[-0.05em] tabular-nums">
                <span className="stat-num" data-value={s.value}>
                  {s.value}
                </span>
              </p>
              <p className="max-w-[12rem] pb-2 text-ink/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
