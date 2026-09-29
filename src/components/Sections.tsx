"use client";

import { useEffect, useState } from "react";
import { person, toolbox } from "@/lib/content";
import { BuildNote, RedPen, Sticky } from "./lens-ui";
import { scrollToTarget } from "./SmoothScroll";

export function Header() {
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget(id);
    history.replaceState(null, "", `${window.location.search}${id}`);
    // move keyboard focus along with the scroll
    const el = document.querySelector<HTMLElement>(id);
    if (el) {
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    }
  };
  return (
    <header className="relative z-40 mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 pt-6 md:px-10">
      <a href="#top" onClick={go("#top")} className="font-display text-[1.1rem] font-extrabold tracking-tight">
        {person.name}
      </a>
      <nav aria-label="Sections" className="flex gap-5 text-[1rem]">
        <a href="#work" onClick={go("#work")} className="hover:underline">
          Work
        </a>
        <a href="#toolbox" onClick={go("#toolbox")} className="hidden hover:underline sm:inline">
          Toolbox
        </a>
        <a href="#contact" onClick={go("#contact")} className="hover:underline">
          Contact
        </a>
      </nav>
    </header>
  );
}

export function Toolbox() {
  return (
    <section
      id="toolbox"
      aria-labelledby="toolbox-title"
      className="mx-auto max-w-[1240px] px-5 py-20 md:px-10 md:py-32"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-5">
        <div className="md:col-span-4">
          <h2
            id="toolbox-title"
            className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-extrabold leading-[1] tracking-[-0.02em]"
          >
            What I work with
          </h2>
          <p className="mt-4 max-w-[22em] text-fg-soft">
            Grouped by when I reach for it. Where there&apos;s a note, it says which project it was for.
          </p>
          <div className="mt-8">
            <Sticky tilt={2}>
              Only tools I&apos;ve actually used. No skill bars; nobody knows what 80% of Java means.
            </Sticky>
          </div>
        </div>

        <dl className="md:col-span-8">
          {toolbox.map((group) => (
            <div key={group.stage} className="grid gap-3 border-t border-line py-6 sm:grid-cols-[11rem_1fr] sm:gap-5">
              <dt className="font-display text-[1.25rem] font-bold">{group.stage}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-8 gap-y-3">
                  {group.tools.map((t) => (
                    <li key={t.name} className="min-w-[9rem]">
                      <span className="block text-[1.2rem] font-bold">{t.name}</span>
                      {t.note && <span className="block text-[0.95rem] text-fg-soft">{t.note}</span>}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-PH", { hour: "numeric", minute: "2-digit", timeZone: person.timezone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = window.setInterval(tick, 30_000);
    return () => window.clearInterval(t);
  }, []);
  return <time className="tabular-nums">{time}</time>;
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-[1240px] px-5 pb-48 pt-20 md:px-10 md:pt-32"
    >
      <h2
        id="contact-title"
        data-spec="h2 / Anybody 800 / wdth 110 / clamp(2.6rem, 6.5vw, 5.8rem)"
        className="max-w-[14em] font-display text-[clamp(2.6rem,6.5vw,5.8rem)] font-extrabold leading-[1] tracking-[-0.025em] [font-variation-settings:'wdth'_110]"
      >
        Got a screen people keep giving up on? Send it to me.
      </h2>
      <div className="mt-6">
        <RedPen>Name the problem they have, not the job title I want.</RedPen>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          onClick={copy}
          className="rounded-full bg-fg px-7 py-4 font-display text-[1.15rem] font-bold text-bg transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {copied ? "Email copied" : "Copy my email"}
        </button>
        <a href={`mailto:${person.email}`} className="prose-link text-[1.15rem] font-semibold">
          {person.email}
        </a>
        <span role="status" className="sr-only">
          {copied ? "Email address copied to clipboard" : ""}
        </span>
      </div>

      <footer className="mt-24 grid gap-4 border-t border-line pt-6 text-[0.95rem] text-fg-soft sm:grid-cols-3">
        <p>
          It&apos;s <LocalTime /> for me in the Philippines.
        </p>
        <p>
          <a href={person.github} target="_blank" rel="noreferrer" className="prose-link">
            GitHub
          </a>
        </p>
        <p className="sm:text-right">Press 4 to see how this page is built.</p>
      </footer>
      <div className="mt-6">
        <BuildNote title="This page">
          <p>
            Next.js 16 and Tailwind CSS. GSAP runs the typing in the hero and the pinned kiosk strip; Lenis smooths the
            scrolling.
          </p>
          <p className="mt-2">
            Switching layers uses the View Transitions API: the new layer grows out of the button you pressed. With
            reduced motion on, it just swaps.
          </p>
          <p className="mt-2">Type: Anybody (width axis 50 to 150), Atkinson Hyperlegible Next, Caveat for notes.</p>
        </BuildNote>
      </div>
    </section>
  );
}
