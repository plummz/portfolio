# Design plan: "Three layers"

## The idea
Every screen John ships has three layers under it: the **research** (why it exists), the **words** (what it says), and the **build** (how it works). A finished portfolio usually hides all three. This one lets you peel them back.

A lens switch sits at the bottom of the page: **Finished · Research · Words · Build**.

- **Research** pins yellow sticky notes in the margins with the real reasons behind decisions (from project docs, never invented).
- **Words** marks the page up in red pen: struck drafts, replacements, margin comments on why the copy changed.
- **Build** turns the page into a blueprint: blue paper, the 12-column grid shows, elements get spec tags (type, size, spacing), and code/architecture notes appear.

The one bold moment is this switch. Everything else stays quiet and disciplined.

## Colour (each colour has exactly one job)
| Name | Hex | Job |
|---|---|---|
| Paper | `#F7F8FC` | page background, cool white with a faint dot grid like a whiteboard |
| Ink | `#191C3A` | all text, deep indigo instead of black |
| Blueprint | `#2340D8` | Build lens surface, links |
| Sticky | `#FFD23F` | Research lens notes only |
| Red pen | `#E4402F` | Words lens edits only |
| Mist | `#E7EAF6` | quiet surfaces, dividers |

Project screenshots keep their own colours; the frame around them never competes.

## Type
- **Anybody** (variable wdth 50–150, wght 100–900): headlines and UI. The width axis is used on purpose: the hero headline compresses and stretches as it's edited, and Build lens shows the live axis values.
- **Atkinson Hyperlegible Next**: body text. Designed for low-vision readers; picked because a UX person should read easily first.
- **Caveat**: handwriting, only inside Research sticky notes.
- **JetBrains Mono**: only for code and spec tags in the Build lens.

Scale (1.25 ratio, 18px base): 14.4 / 18 / 22.5 / 28 / 35 / 44 / 55 / 69 / 86 / 108+. Body line length 60–72ch, line-height 1.6.

## Layout
Left-aligned editorial layout on a 12-column grid (max 1240px). Generous whitespace; sections separated by space, not boxes.

```
HERO
[ headline, 7 cols, typed then red-pen edited  ]   [ printed photo, taped ]
[ one-line intro                              ]
[ lens dock, fixed bottom centre                                        ]

CASE STUDY (each one has its own artifact, not a shared template)
[ title + one-line outcome                     ]
[ artifact: phone scroller / kiosk flow strip   full bleed ]
[ Problem ][ What I decided ][ Words ][ Build ]  <- short blocks, 4 cols each on desktop
```

- Study Arena artifact: a phone that scrolls through the real mobile home screen as you scroll, plus the companion cast.
- BOCO-FI artifact: the kiosk flow as a horizontal strip of real screens with their Figma numbers (a true sequence, so numbering is honest).

## Motion
1. Page load: the headline is typed, then a red pen strikes the weak draft and writes the better one. That's the only automatic animation.
2. Lens switch: a View Transition wipes the new lens in from the button you pressed.
3. Scroll-driven, user-controlled: the phone screen scrolls, the kiosk strip moves sideways.
No fade-up-on-every-section. Reduced motion: everything is shown in its final state.

## Things deliberately avoided
Dark background with an acid accent, cream + terracotta, uppercase tracked eyebrows, "01/02/03" on non-sequences, single italic word in headlines, 3D blobs that don't relate to the work, identical card grids.
