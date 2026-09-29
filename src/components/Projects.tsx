"use client";

import Image from "next/image";
import { useRef } from "react";
import { bocofi, kioskFlow, studyArena } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import CaseStudy from "./CaseStudy";
import { BuildNote, Sticky } from "./lens-ui";

/* ---------------- Study Arena: a phone you scroll through ---------------- */

function StudyArenaArtifact() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // the phone screen scrolls through the real home screen as the page scrolls past
        const screen = root.current?.querySelector<HTMLElement>(".phone-screen");
        const frame = root.current?.querySelector<HTMLElement>(".phone-frame");
        if (!screen || !frame) return;
        gsap.to(screen, {
          y: () => -(screen.offsetHeight - frame.clientHeight),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 md:grid-cols-12 md:gap-5 md:px-10">
      <figure className="md:col-span-4">
        <div
          data-spec="phone / 360 x 780 / screen scrolls with page"
          className="phone-frame shot relative mx-auto aspect-[360/740] w-[min(78vw,320px)] overflow-hidden rounded-[2.6rem] border-[10px] border-ink bg-white shadow-[0_40px_60px_-30px_rgba(25,28,58,0.55)]"
        >
          <Image
            src="/img/sa-mobile-home.webp"
            alt="Study Arena's mobile home screen: 'A little progress, Alex', three useful next steps and a study library"
            width={360}
            height={2526}
            sizes="320px"
            className="phone-screen absolute left-0 top-0 w-full"
          />
        </div>
        <figcaption className="mt-5 text-center text-[0.95rem] text-fg-soft">
          The home screen on a phone. Keep scrolling and it scrolls too, or{" "}
          <a href="/img/sa-mobile-home.webp" target="_blank" rel="noreferrer" className="prose-link">
            open the full screen
          </a>
          .
        </figcaption>
      </figure>

      <figure className="md:col-span-8">
        <a
          href="/img/sa-companions.webp"
          target="_blank"
          rel="noreferrer"
          data-spec="img / 1060 x 720 / companion picker"
          className="shot block overflow-hidden rounded-2xl bg-[#1f2d27]"
        >
          <Image
            src="/img/sa-companions.webp"
            alt="The companion picker: Moss the owl, Lumi, Coral the fox, Sky, Plum, Sunny, Mint and Nova, all free to unlock"
            width={1060}
            height={720}
            sizes="(min-width: 768px) 800px, 100vw"
            className="h-auto w-full"
          />
        </a>
        <figcaption className="mt-4 max-w-[40em] text-[0.95rem] text-fg-soft">
          Study companions are free. Coins buy small extras, never the characters, and a streak only ever adds things.
        </figcaption>
        <div className="mt-6">
          <Sticky tilt={1.5}>Fixed prices, no random boxes. Students always know what a reward costs.</Sticky>
        </div>
      </figure>
    </div>
  );
}

function StudyArenaBuild() {
  return (
    <BuildNote title="Study Arena, the parts">
      <pre className="whitespace-pre-wrap">{`Android (Capacitor) ─┐
Browser client ──────┼─► Java 17 API ─► SQLite (WAL)
                     │   HttpServer, JDBC
Offline workspace ───┘   Railway
IndexedDB + AES-GCM
sync queue, idempotent keys

Godot dungeon ─► web export, GitHub Pages`}</pre>
    </BuildNote>
  );
}

/* ---------------- BOCO-FI: the kiosk flow, screen by screen ---------------- */

function KioskFlow() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // desktop: pin the section and move the strip sideways as you scroll down
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector<HTMLElement>(".flow-track");
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth + 80;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="flow relative overflow-hidden py-6 md:flex md:min-h-[100svh] md:flex-col md:justify-center"
    >
      <p className="mx-auto mb-6 w-full max-w-[1240px] px-5 text-[1rem] text-fg-soft md:px-10">
        Four of the 27 kiosk screens, numbered as they are in Figma. A guest drops in one bottle.
      </p>
      <ol
        className="flow-track flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:w-max md:snap-none md:overflow-visible md:px-10"
        aria-label="Kiosk flow"
      >
        {kioskFlow.map((s, i) => (
          <li key={s.id} className="w-[86vw] shrink-0 snap-center md:w-[min(58vw,760px)]">
            <figure>
              <a
                href={s.img}
                target="_blank"
                rel="noreferrer"
                data-spec={`frame ${s.id} / 1280 x 800`}
                className="shot block overflow-hidden rounded-xl border border-line bg-white transition-transform hover:-translate-y-1"
              >
                <Image
                  src={s.img}
                  alt={`${s.alt} (opens full size)`}
                  width={1280}
                  height={800}
                  sizes="(min-width: 900px) 760px, 86vw"
                  className="h-auto w-full"
                />
              </a>
              <figcaption className="mt-3 flex items-baseline gap-3">
                <span className="font-display text-[1.6rem] font-extrabold tabular-nums">{s.id}</span>
                <span className="text-fg-soft">{s.title}</span>
                {i < kioskFlow.length - 1 && (
                  <span aria-hidden className="ml-auto font-display text-[1.6rem] text-fg-soft">
                    ⟶
                  </span>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
        <li className="w-[70vw] shrink-0 snap-center md:w-[330px]">
          <figure>
            <div
              data-spec="phone / 390 x 770 / recycler app"
              className="shot mx-auto w-[min(70vw,300px)] overflow-hidden rounded-[2.2rem] border-[9px] border-ink bg-white"
            >
              <Image
                src="/img/bo-app-home.webp"
                alt="The recycler app: 850 stacked points, ₱12.50 coin balance and 45 minutes of Wi-Fi left"
                width={780}
                height={1540}
                sizes="300px"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline gap-3">
              <span className="font-display text-[1.6rem] font-extrabold">App</span>
              <span className="text-fg-soft">Later, in the recycler&apos;s pocket</span>
            </figcaption>
          </figure>
        </li>
      </ol>
    </div>
  );
}

function BocofiBuild() {
  return (
    <BuildNote title="BOCO-FI, the parts">
      <pre className="whitespace-pre-wrap">{`kiosk/   touchscreen, state machine
         SCREENS['4.2'] = Figma frame 4.2
app/     recycler PWA, wallet, Wi-Fi timer
admin/   owner dashboard, CSV export
assets/tokens.css   colours from Figma

all three read and write one shared
data layer, so every tab updates live`}</pre>
    </BuildNote>
  );
}

export default function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <h2 id="work-title" className="max-w-[18em] font-display text-[1.75rem] font-bold leading-tight">
          Two projects, from the first question to the working thing.
        </h2>
      </div>
      <CaseStudy study={studyArena} artifact={<StudyArenaArtifact />} buildExtra={<StudyArenaBuild />} />
      <div aria-hidden className="mx-auto max-w-[1240px] px-5 md:px-10">
        <div className="h-px bg-line" />
      </div>
      <CaseStudy study={bocofi} artifact={<KioskFlow />} buildExtra={<BocofiBuild />} />
    </section>
  );
}
