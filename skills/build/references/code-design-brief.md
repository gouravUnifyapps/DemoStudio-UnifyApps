# The code design brief: a UI the client recognises as theirs, and the audience remembers

A Config page built by Nebula is held to Nebula's app look: 13 colour roles, one of 12 fonts,
a closed block catalog. A code app has none of those limits. The Code Builder writes real
front-end code, so it can load the client's actual web font, use the client's full palette,
draw a hero band, animate an entrance, and lay out a page the way the client's own site does.
When the brief does not say so, it falls back to its default: a grey page, a white table, the
system font, and the logo in the corner. That is the screen nobody wants to demo.

So the Designer writes two outputs in phase `look`: the Nebula `app look` line
(`brand-to-look.md`) for Config pages, and `code-design.md`, this brief, for the Text2Code
prompt. Both come from the same `brand.md`. This one goes further.

## What the brief must decide

Write each as a decision with a value, never a wish. "Modern" is not a value; "a 64px dark
header band in brand navy with the logo at 28px, white nav text, and a 1px warm hairline
below" is.

1. **Direction in one line.** The subject's own world and the client's brand, fused:
   "a site office at dawn: concrete grey, safety orange, stencilled type, drawings pinned to
   a board". From `brand.md` § the subject's own world and the client's tone words.

2. **Palette, 12 to 16 values with roles.** From the site's computed styles: brand primary,
   primary hover and pressed, a brand dark for header bands, a brand tint at 8 to 12% for
   selected rows and hero backgrounds, page background, surface, surface raised, text,
   text secondary, text on brand, border, border strong, success, warning, error, and one
   highlight for the bold moment. Greys lean one way, toward the primary when it is soft.
   Text never pure black. Every text colour meets 4.5:1 on its background; say which.

3. **Typography.** The client's actual heading and body fonts as declared in the site's CSS
   (load them from Google Fonts or the client's own CDN when public; else the nearest Google
   Font, named). A scale of 5 to 6 sizes with the largest at least 3x the body: display 40
   to 56 for the hero number or title, 28 for page titles, 20 for section titles, 16 body,
   14 secondary, 12 labels. Weights 400 / 600, and 700 or 800 for the display size. Tabular
   figures for every number column.

4. **Layout language.** How the client's site holds content, carried into the app: a dark or
   light top bar with the logo and the page switcher; a hero band on the home page with the
   headline number and its meaning; a 12-column grid at 1440 with a max content width;
   cards for things a person acts on as one, open sections elsewhere; a table for things a
   person compares; 8pt spacing, with 24 to 32 between groups and 8 to 12 inside.

5. **Components, each specified.**
   - Buttons: primary filled in brand, hover one step darker with a 150ms transition; secondary
     outlined; destructive in error; 40px tall; radius from the brand.
   - Status chips: filled tints with dark text of the same hue, one per state, never grey for
     a state that means something; a dot or icon beside the word.
   - Tables: first column a name, numbers right-aligned in tabular figures, a hover row tint,
     no vertical lines, a sticky header, status as a chip, an aging value with its colour.
   - KPI tiles: the number large in the display font, the label small above, a trend or
     context line below, one tile carries the brand tint.
   - Cards: surface raised, 1px border or a soft shadow (one of the two, chosen), radius from
     the brand, 20 to 24px padding.
   - Forms: labels above, 44px fields, inline errors in error colour with an icon, a disabled
     submit while saving, a success toast naming the record.
   - Icons: one set (Lucide or Phosphor), one stroke, 16 and 20px, always beside a word.
   - Loading: skeletons in surface raised, never a spinner alone. Empty: a one-line message
     with one action, and a small illustration or icon in the brand tint.

6. **Motion.** One entrance on first load of the home page (a 300ms fade and 8px rise,
   staggered 40ms per card), hover lift of 2px with a shadow step on cards and rows, 150 to
   200ms transitions on every interactive colour change, a 400ms highlight when a record's
   state changes (the approval beat). All of it respects `prefers-reduced-motion`.

7. **Depth and texture.** Flat, hairline borders, or two soft shadows, chosen once. One
   textured surface for the hero band (a subtle gradient from brand dark to brand, or a faint
   pattern from the subject's world at 4 to 6% opacity). Nothing else is decorated.

8. **The bold moment.** The one thing the audience remembers, taken from the storyline's
   lean-forward beat, and where it lives: "the approval decision slides a full-width band
   from amber to green with the manager's name and the time". Spend the design there; keep
   the rest quiet.

9. **Dark or light**, with the reason from the audience's setting. A projector in a bright
   room wants light with a dark header band; a control-room story wants dark.

10. **Logo use.** The logo file from `brand.md`, its clear space, its size in the header,
    and whether the mark alone appears anywhere (a favicon, an empty state).

11. **Not.** Read Nebula's `default-looks.md` (`NEBULA/skills/app-craft/references/`) and
    name the default the first idea was closest to, then say what changed. Then add the
    code-app defaults the Code Builder itself reaches for when a brief is thin: a grey page
    with a white bordered table and the system font; a logo-only header with no colour;
    centred titles over centred subtitles; generic blue buttons; chips in grey; three identical
    stat cards in a row; no hover, no motion, no empty state. Each is a refusal in the
    prompt's quality bar.

## The quality bar, pasted into the prompt

The prompt's `## Quality bar` section is the brief's teeth. It says what is refused:

- A page where the brand appears only in the logo.
- The system font, Arial, Inter or Roboto when the brief names another.
- An unstyled table: visible cell borders, centred numbers, grey status text.
- Pure `#000000` text or untinted greys.
- A heading that is not at least 2x the body size.
- No hover state, no transition, no entrance, no skeleton, no empty state.
- Any screen that would pass as a different company's app with the logo swapped.

## How the Critic uses it

The Critic reviews the code app's preview against this brief, section by section: palette
applied, fonts loaded (not fallen back), layout language present, each component as specified,
motion present, the bold moment delivered, the `not` list avoided. A brief line not met is a
finding with the exact change to send the Code Builder. That is why every line here is a
value: a wish cannot be checked.
