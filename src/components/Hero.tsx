"use client";

import Image from "next/image";
import { useRef } from "react";
import { hero, person } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { RedPen, Sticky } from "./lens-ui";

const chars = (s: string) =>
  s.split("").map((c, i) => (
    <span key={i} className="ch">
      {c}
    </span>
  ));

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  // The one automatic animation on the page: a first draft is typed, struck out, and rewritten.
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const lead = q(".lead .ch");
      const draft = q(".draft .ch");
      const fin = q(".final .ch");
      const done = () => {
        root.current?.classList.add("typed");
        window.dispatchEvent(new Event("jr:typed"));
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        done();
        return;
      }

      gsap.set([...lead, ...draft, ...fin], { display: "none" });
      gsap.set(q(".draft-line"), { scaleX: 0 });
      gsap.set(q(".intro, .photo"), { opacity: 0, y: 16 });

      const type = (els: Element[], speed: number) => {
        const t = gsap.timeline();
        els.forEach((el) => t.set(el, { display: "inline" }, `+=${speed}`));
        return t;
      };

      gsap
        .timeline({ delay: 0.25, onComplete: done })
        .add(type(lead, 0.035))
        .add(type(draft, 0.035))
        .to({}, { duration: 0.35 })
        .to(q(".draft-line"), { scaleX: 1, duration: 0.35, ease: "power2.inOut" })
        .to(q(".draft"), { opacity: 0.45, duration: 0.2 })
        .to(q(".draft"), { fontVariationSettings: "'wdth' 50", duration: 0.35, ease: "power2.in" }, "+=0.2")
        .to(q(".draft"), { width: 0, opacity: 0, duration: 0.3, ease: "power2.in" })
        .set(q(".draft"), { display: "none" })
        .add(type(fin, 0.018))
        .to(q(".intro, .photo"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 }, "-=0.6");
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="hero relative mx-auto max-w-[1240px] px-5 pb-24 pt-10 md:px-10 md:pb-36 md:pt-16"
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-5">
        <div className="relative md:col-span-8">
          <h1 className="sr-only">
            {hero.lead} {hero.final}
          </h1>
          <p
            aria-hidden
            data-spec="h1 / Anybody 800 / clamp(2.9rem, 7vw, 6.4rem) / line 1.0 / wdth 100"
            className="font-display text-[clamp(2.9rem,7vw,6.4rem)] font-extrabold leading-[1] tracking-[-0.025em] [font-variation-settings:'wdth'_100]"
          >
            <span className="lead">{chars(hero.lead + " ")}</span>
            <span className="draft relative inline-block whitespace-nowrap align-baseline text-fg-soft">
              {chars(hero.draft)}
              <span
                aria-hidden
                className="draft-line absolute inset-x-0 top-[55%] h-[0.09em] origin-left -rotate-1 rounded-full bg-redpen"
              />
            </span>
            <span className="final">{chars(hero.final)}</span>
            <span
              aria-hidden
              className="caret ml-1 inline-block h-[0.8em] w-[0.08em] translate-y-[0.08em] animate-pulse bg-redpen"
            />
          </p>

          <p
            data-spec="p / Atkinson Hyperlegible Next 400 / 1.3rem / line 1.55 / max 34em"
            className="intro mt-10 max-w-[34em] text-[1.3rem] leading-[1.55] text-fg-soft"
          >
            {hero.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-start gap-8">
            <Sticky tilt={-3}>
              People skim portfolios in seconds, so the first line says what I do for people, not who I am.
            </Sticky>
            <RedPen>
              Crossed out &ldquo;{hero.draft.replace(".", "")}&rdquo;. Say what the work does for people, not how it
              looks.
            </RedPen>
          </div>
        </div>

        <figure className="photo relative mx-auto w-[min(72vw,300px)] self-start md:col-span-4 md:mt-4 md:w-full md:max-w-[300px] md:justify-self-end">
          <div
            data-spec="img / 4:5 / printed ID photo"
            className="shot relative rotate-[3deg] bg-white p-3 pb-14 shadow-[0_24px_40px_-24px_rgba(25,28,58,0.6)]"
          >
            <span aria-hidden className="absolute -top-3 left-6 h-6 w-20 -rotate-6 bg-sticky/70" />
            <span aria-hidden className="absolute -top-2 right-5 h-6 w-16 rotate-12 bg-sticky/70" />
            <div className="relative aspect-[4/5] overflow-hidden bg-mist">
              <Image
                src="/img/john-portrait.webp"
                alt={`${person.name} in a navy polo shirt`}
                fill
                priority
                sizes="300px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="absolute bottom-3 left-4 font-hand text-[1.6rem] leading-none text-ink">
              John Rey, hi!
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
