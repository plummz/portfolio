"use client";

import Image from "next/image";
import { useRef } from "react";
import { projects, type Project } from "@/lib/content";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import Magnetic from "./Magnetic";

function BrowserFrame({ p }: { p: Project }) {
  const host = p.live.replace("https://", "").replace(/\/$/, "");
  return (
    <a
      href={p.live}
      target="_blank"
      rel="noreferrer"
      data-cursor="Open"
      className="work-shot group block overflow-hidden rounded-2xl border-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,.55)] transition-transform duration-500 hover:-rotate-1 hover:scale-[1.02]"
      style={{ borderColor: p.theme.fg, background: p.theme.fg }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ color: p.theme.bg }}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="label ml-3 truncate text-[0.62rem] opacity-80">{host}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-white">
        <Image
          src={p.image}
          alt={p.imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="work-img object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </a>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article
      className="work-card relative flex min-h-[100svh] items-center overflow-hidden rounded-[2.5rem] px-5 py-24 md:px-12"
      style={{ background: p.theme.bg, color: p.theme.fg }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[4vw] -top-[6vw] select-none font-display text-[38vw] font-extrabold leading-none opacity-[0.07] md:text-[26vw]"
      >
        {p.index}
      </span>

      <div aria-hidden className="work-dim pointer-events-none absolute inset-0 z-20 bg-black opacity-0" />
      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label" style={{ color: p.theme.muted }}>
            {p.index} / {p.kicker}
          </p>
          <h3 className="mt-5 font-display text-[clamp(3rem,7vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
            {p.name}
          </h3>
          <p className="mt-4 font-serif text-3xl italic leading-tight md:text-4xl">{p.summary}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-85">{p.body}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-transform hover:scale-105"
                style={{ background: p.theme.fg, color: p.theme.bg }}
              >
                Try the live demo <span aria-hidden>↗</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 font-semibold transition-colors"
                style={{ borderColor: p.theme.fg }}
              >
                Read the code <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="md:col-span-7">
          <BrowserFrame p={p} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <ul className="space-y-2.5">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 leading-snug">
                  <span
                    aria-hidden
                    className="mt-1.5 h-2.5 w-2.5 shrink-0 rotate-45 rounded-[3px]"
                    style={{ background: p.theme.accent }}
                  />
                  {h}
                </li>
              ))}
            </ul>
            <div>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="label" style={{ color: p.theme.muted }}>
                    Year
                  </dt>
                  <dd className="mt-1 font-semibold">{p.year}</dd>
                </div>
                <div>
                  <dt className="label" style={{ color: p.theme.muted }}>
                    My part
                  </dt>
                  <dd className="mt-1 font-semibold">{p.role}</dd>
                </div>
              </dl>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li key={s} className="rounded-full border px-3 py-1 text-sm" style={{ borderColor: p.theme.muted }}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const title = new SplitText(".work-title", { type: "lines,words", linesClass: "split-line" });
      const mm = gsap.matchMedia();

      // a card taller than the screen should stick by its bottom edge, otherwise its lower half is never visible
      const fitSticky = () => {
        gsap.utils.toArray<HTMLElement>(".work-sticky").forEach((el) => {
          el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
        });
      };
      fitSticky();
      window.addEventListener("resize", fitSticky);

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(title.words, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".work-title", start: "top 85%" },
        });

        const cards = gsap.utils.toArray<HTMLElement>(".work-card");
        cards.forEach((card, i) => {
          // screenshot drifts a little slower than the card
          gsap.fromTo(
            card.querySelector(".work-shot"),
            { yPercent: 12, rotate: 2 },
            {
              yPercent: -6,
              rotate: -1,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
            },
          );

          // as the next card slides over, this one shrinks back into the stack
          const next = cards[i + 1];
          if (!next) return;
          const st = { trigger: next, start: "top bottom", end: "top top", scrub: true };
          gsap.to(card, { scale: 0.9, borderRadius: "4rem", ease: "none", scrollTrigger: st });
          gsap.to(card.querySelector(".work-dim"), { opacity: 0.45, ease: "none", scrollTrigger: st });
        });
      });

      return () => {
        window.removeEventListener("resize", fitSticky);
        title.revert();
      };
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className="relative bg-ink pt-32">
      <div className="mx-auto max-w-[1400px] px-4 pb-20 md:px-8">
        <p className="label flex items-center gap-3 text-white/70">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[0.6rem] text-ink">02</span>
          Selected work
        </p>
        <h2 className="work-title mt-6 font-display text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.88] tracking-[-0.05em]">
          Stuff I built <span className="font-serif font-normal italic text-lime">and</span>{" "}
          <span className="outline-text">actually shipped</span>
        </h2>
      </div>

      <div className="relative">
        {projects.map((p) => (
          <div key={p.id} className="work-sticky sticky top-0">
            <ProjectCard p={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
