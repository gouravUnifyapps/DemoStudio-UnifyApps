# Mockups: three to five directions, drawn in Claude, one chosen by the person

A prose brief tells the Code Builder what to do; a mockup shows it. After two builds that came
out grey, the lesson is that words about design are read loosely and a reference page is
copied closely. So before any app is built, the Mockups agent draws three to five complete,
self-contained HTML pages of the demo's lead screen, each in a genuinely different direction,
with the storyline's real content and the client's real brand. The person picks one. That file
becomes `design-reference.html`: the Text2Code prompt carries its CSS and structure and says
"match this", the Critic scores the built app against it, and the Designer re-derives Nebula's
look line and page designs from it.

This is the one question the person asked to be asked. The profile's `mockups` line controls
it: a number from 3 to 5 (default 4) draws that many and asks; `auto` draws them and takes the
recommendation without asking; `off` skips the step and the brief alone drives the build.

## What a mockup is

- One HTML file, `mockup-<letter>.html`, everything inline: CSS in a `<style>` block, data in
  the markup, at most one Google Fonts `<link>` and the client's logo by URL from `brand.md`.
  No build step, no framework, no external script. Under 150 KB.
- The storyline's **lead page** (the one beat 1 opens, usually the home page) complete: the
  header with the logo, the page title in the client's words, the hero or KPI band with the
  headline number from the story row, the main list or table with 8 to 12 realistic fictional
  rows including the story row, the main action, one status chip per state, a secondary
  region, and the empty-state copy somewhere visible (a small "No <items> yet" card is fine).
- Below it, separated by a labelled divider, **the lean-forward screen** of the storyline as a
  second section: the approval decision, the assistant's answer, whatever the last beat
  shows. Two screens in one file, so the person sees the bold moment too.
- Laid out at 1440 wide, readable down to 1200. Hover states on rows, cards and buttons.
  One entrance animation on the hero (300ms fade and rise) that respects
  `prefers-reduced-motion`.
- CSS variables at the top of the `<style>` block for every colour, font, radius, gap and
  shadow, named by role (`--brand`, `--brand-dark`, `--surface`, `--text`, `--radius-card`,
  `--gap-between`, …). The Text2Code prompt lifts these as the palette, so they are the
  contract, not decoration.
- A 3-line HTML comment at the top: the letter, the direction's name, and why it fits this
  client in one sentence.

## The directions

Choose N of these so that no two share a header treatment, a density or a colour strategy.
Each is flavoured by `brand.md` (the real colours, fonts, logo, the subject's own world) so
none of them could be another company's app. Names are for the gallery; the files hold the
work.

| Letter | Direction | What makes it itself |
|---|---|---|
| A | **Brand band** | a 64px header band in brand dark with the logo and nav in white; a light body; a hero band with the headline number in display type; cards with one soft shadow; the table under a card |
| B | **Editorial** | no band: a thin rule under a large wordmark; generous whitespace; large display type for the number and the title; hairline rules instead of borders; two colours plus the status hues; the table as ruled rows with tabular figures |
| C | **Operations board** | a left rail nav in brand dark; compact density; the table is the page, sticky header, status chips with dots, right-aligned numbers; KPIs as a thin strip above the table, not tiles; built for someone who reads it every day |
| D | **Saturated** | the brand colour as large surfaces: a gradient hero from brand dark to brand filling the top third, white cards floating over its lower edge, the bold moment lit in the highlight colour; the most "demo" of the five |
| E | **Control room** | dark surfaces throughout, brand as the accent with a faint glow on the active row, a texture from the subject's world at 5% in the background, numbers in the display font; for a night-shift or dispatch story |

With 3 mockups take A, B and D unless the brand or the story says otherwise (a dispatch story
wants E; an expert audience wants C). With 5 take all. Never two variants of one direction.

## Quality bar for a mockup

Refuse your own file for any of these before you hand it over:

- The brand appears only in the logo.
- A font that is not the client's (or its named nearest) actually loaded via the `<link>`.
- Pure `#000000` text, untinted greys, or a default blue.
- A table with visible cell borders, centred numbers or grey status text.
- Placeholder words: "Lorem", "Item 1", "John Doe", "Company". Every string is the client's
  world and the storyline's data.
- A screen that would pass as another company's app with the logo swapped.
- Two mockups that differ only in colour.

## The gallery

`gallery.html` in the same folder: a page that shows each mockup in an `<iframe>` scaled to
about half size in a two-column grid, with its letter, direction, the one-sentence fit, and a
link to open it full size. Above the grid, one line: `Recommended: <letter>, because <reason
tied to the audience and the intent>`. The gallery is a convenience: the moderator also sends
the mockup files themselves, so the person can open each one full size.

Screenshots are optional. If Nebula's browser wrapper is available, a PNG of each mockup can
be made with `open file://…` then `screenshot` in a fresh browser folder; when that fails,
skip it. The gallery and the choice need no screenshots.

## The choice

The moderator shows the files and asks one question, header `Mockup`, `Which design should the
demo follow?`, one option per mockup (its letter and direction in a few words, the recommended
one first and marked), at most four options, the fifth reachable through the free-text answer.
The free-text answer may also ask for a change ("B, with A's header band" or "C but lighter");
that goes to a fresh Mockups agent as `round 2` with the request quoted, and the question is
asked once more. Two rounds at most. With `mockups: auto` the recommendation is taken.

## After the choice

1. The chosen file is copied to `$STUDIO/design-reference.html`, and a `mockup.png` of it
   when a screenshot exists.
2. The Designer runs `phase: refine`: it rewrites `code-design.md` so the mockup's CSS
   variables are the palette, its loaded fonts and sizes the type scale, its header and grid
   the layout language, and its components the component specs; and it re-derives Nebula's
   `app look` line and the page `design` blocks in `design.md` from the same mockup, within
   Nebula's limits, checked again with the look script.
3. The Text2Code prompt gains a `## Reference mockup` section with the mockup's `<style>`
   block and the trimmed HTML skeleton of the lead page, and the instruction to match it in
   layout, type, colour and spacing. Where the browser offers an attachment control the Coder
   can drive, the file is attached as well.
4. The Critic scores a new quality, `fidelity`: the built app matches the chosen mockup. It
   opens the mockup beside the preview and compares.
5. The runbook names the chosen mockup and links the gallery, so the choice is on record.
