"use client";

import type { ReactNode } from "react";
import type { CaseStudy as Study } from "@/lib/content";
import { BuildNote, RedPen, Sticky, Swap } from "./lens-ui";

export default function CaseStudy({
  study,
  artifact,
  buildExtra,
}: {
  study: Study;
  artifact: ReactNode;
  buildExtra?: ReactNode;
}) {
  const headingId = `${study.id}-title`;

  return (
    <article id={study.id} aria-labelledby={headingId} className="relative py-20 md:py-32">
      <header className="mx-auto max-w-[1240px] px-5 md:px-10">
        <div className="grid gap-6 md:grid-cols-12 md:gap-5">
          <div className="md:col-span-8">
            <h3
              id={headingId}
              data-spec="h3 / Anybody 800 / wdth 125 / clamp(3.2rem, 9vw, 7.5rem)"
              className="font-display text-[clamp(3.2rem,9vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.03em] [font-variation-settings:'wdth'_125]"
            >
              {study.name}
            </h3>
            <p className="mt-5 max-w-[26em] font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium leading-[1.2]">
              {study.outcome}
            </p>
          </div>
          <dl className="grid content-end gap-4 text-[1rem] md:col-span-4">
            <div>
              <dt className="text-fg-soft">Context</dt>
              <dd className="font-semibold">{study.context}</dd>
            </div>
            <div>
              <dt className="text-fg-soft">My part</dt>
              <dd className="font-semibold">{study.role}</dd>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
              <a href={study.live} target="_blank" rel="noreferrer" className="prose-link font-semibold">
                Open the live demo
              </a>
              <a href={study.repo} target="_blank" rel="noreferrer" className="prose-link font-semibold">
                Read the code on GitHub
              </a>
            </div>
          </dl>
        </div>
      </header>

      <div className="my-14 md:my-20">{artifact}</div>

      <div className="mx-auto grid max-w-[1240px] gap-x-5 gap-y-16 px-5 md:grid-cols-12 md:px-10">
        <section className="md:col-span-5" aria-label="The problem">
          <h4 className="font-display text-[1.75rem] font-bold">The problem</h4>
          <p className="mt-4 max-w-[36em]">{study.problem}</p>
          <div className="mt-8 flex flex-col gap-8">
            {study.notes.map((n, i) => (
              <Sticky key={n} tilt={i % 2 ? 2.5 : -2}>
                {n}
              </Sticky>
            ))}
          </div>
        </section>

        <section className="md:col-span-6 md:col-start-7" aria-label="What we decided">
          <h4 className="font-display text-[1.75rem] font-bold">What we decided</h4>
          <ol className="mt-4 space-y-4">
            {study.decisions.map((d, i) => (
              <li key={d} className="grid grid-cols-[2.25rem_1fr] gap-2">
                <span aria-hidden className="font-display text-[1.1rem] font-bold text-fg-soft">
                  {i + 1}.
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="md:col-span-12" aria-label="Lines from the app">
          <h4 className="font-display text-[1.75rem] font-bold">Lines from the app</h4>
          <ul className="mt-6 grid gap-10 md:grid-cols-3 md:gap-5">
            {study.copy.map((c) => (
              <li key={c.shipped} className="border-t-2 border-fg pt-5">
                <p
                  data-spec="quote / Anybody 700 / 1.6rem"
                  className="font-display text-[1.6rem] font-bold leading-[1.15]"
                >
                  <Swap usual={c.usual}>
                    <q className="block">{c.shipped}</q>
                  </Swap>
                </p>
                <RedPen className="mt-3">{c.why}</RedPen>
              </li>
            ))}
          </ul>
        </section>

        <section className="md:col-span-7" aria-label="How it's built">
          <h4 className="font-display text-[1.75rem] font-bold">How it&apos;s built</h4>
          <p className="mt-4 max-w-[36em]">{study.build.summary}</p>
          <ul className="mt-5 space-y-2.5">
            {study.build.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span aria-hidden className="mt-[0.7em] h-1.5 w-3 shrink-0 bg-fg" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {buildExtra && <div className="md:col-span-5">{buildExtra}</div>}

        <section className="md:col-span-12" aria-label="Where it stands">
          <h4 className="font-display text-[1.75rem] font-bold">Where it stands</h4>
          <div className="mt-5 grid gap-8 md:grid-cols-2 md:gap-5">
            <div className="border-l-4 border-fg pl-5">
              <p className="font-display text-[1.15rem] font-bold">Working and checked</p>
              <ul className="mt-2 space-y-2">
                {study.status.works.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
            <div className="border-l-4 border-dashed border-fg-soft pl-5">
              <p className="font-display text-[1.15rem] font-bold">Not proven yet</p>
              <ul className="mt-2 space-y-2 text-fg-soft">
                {study.status.notYet.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

export { BuildNote };
