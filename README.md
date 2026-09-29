# John Rey Marquillero — Portfolio

Personal site for a UX engineer, writer and researcher.

The page has four layers you can switch between with the bar at the bottom (or keys 1–4):

- **Finished** — the page as a visitor sees it
- **Research** — yellow sticky notes with the reasons behind decisions
- **Words** — red pen: the usual line struck out next to the one that shipped
- **Build** — blueprint mode: the grid, type specs and how each project is made

Add `?lens=research`, `?lens=words` or `?lens=build` to a link to open the page in that layer.

Built with Next.js, Tailwind CSS, GSAP (ScrollTrigger), Motion, Lenis and the View Transitions API. The design reasoning is in `DESIGN.md`.

## Run it

On Windows, double-click **Open Portfolio.cmd**. Or from a terminal:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All copy (hero, case studies, toolbox) lives in `src/lib/content.ts`. Images are in `public/img`.

## Deploy

Pushed to GitHub and imported into Vercel. Every push to `main` redeploys.
