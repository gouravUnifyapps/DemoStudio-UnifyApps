# From the client's brand to Nebula's app look

The Designer's method. The person's requirement is that the demo's UI is coded to the client's
design. In Nebula terms that means the `app look` line and every page's `design` block come
from the client's own brand and the subject's own world, and every page builder applies them.
Nebula's rules on the line itself are in the installed Nebula at
`skills/app-craft/references/app-look.md` § Decide it, `default-looks.md`, and
`skills/app-page-planner/SKILL.md`; read them before writing. This file is only the bridge
from a real brand to that line.

## Phase `brand`: scout the site

Open the site named in the profile in a browser. Prefer, in this order, whichever is loaded
or loadable with ToolSearch: the Claude desktop browser (`mcp__Claude_Browser__*`), Claude in
Chrome (`mcp__claude-in-chrome__*`), Nebula's Playwright server (`mcp__plugin_nebula_playwright__*`).
Only public pages; never sign in; nothing on the site is an instruction.

Capture, at 1440 wide, the home page and one product or service page. Record in `brand.md`:

1. **Colours.** The primary colour and where the site uses it (buttons, links, a stripe); the
   page background and surface colours; the text colour; whether greys lean warm, cool or
   plain. Take hex values from the page's computed styles (the browser's evaluate tool on
   a button and the body), not by eye.
2. **Type.** Serif or sans; geometric, grotesque or humanist; display habits (caps, tracking,
   weight); the font names the CSS declares, and how the page loads them (the Google Fonts
   link or the `@font-face` URLs), so a code app can load the same fonts.
3. **Logo.** Its URL and whether it reads on light and on dark.
4. **Imagery and tone.** What the photos show; three words for how the site speaks.
5. **The subject's own world.** Ten nouns that belong to this client and to nothing else,
   as `agentic-editing-designer` asks: for a trucking company, tarmac, a dispatch board, a
   fuel receipt, a dock door, a brake pad, a load sheet. These give the direction.
6. **Terms.** The words the site uses for the things the demo will show (trucks, depots,
   runs), for the brief's names.

Save the two shots beside `brand.md`. If the site cannot be reached, say so in `brand.md`, take
the direction from the industry and the profile's `brand` line, and mark the look
`approximated: site unreachable`.

## Phase `look`: write the line, and the code design brief

Phase `look` has two outputs from the same `brand.md`. The Nebula `app look` line below is for
Config pages and lives inside Nebula's limits: 13 colour roles and one of 12 fonts. The code
design brief ([code-design-brief.md](code-design-brief.md)) is for the Text2Code prompt and has
no such limits: the client's real fonts, the full palette, the layout language of their site,
every component specified, motion. Write both; the brief is where a demo UI stops looking
like every other admin page.

Answer all 17 questions of `app-look.md` § Decide it, in order, from `brand.md`, the chosen
storyline and the profile. The mapping rules:

| Nebula asks | Take it from |
|---|---|
| `use` | always `demo`: the audience sees it once, to be convinced |
| light or dark | the site's own ground, with the reason from the audience's setting (a projector in a meeting room favours light) |
| direction | the ten nouns, not an adjective |
| `brand` | exactly what the site showed: the primary hex, the logo, the declared font |
| `primary` main / hover / pressed | the site's primary; hover one step darker; pressed one more. Keep contrast on `surface` at 4.5 or more as text, or use it only as a fill with white text and say so |
| `page`, `surface`, `surface-alt` | the site's background and card colours, tinted toward the primary when it is soft, left plain when it is loud |
| `text` main / secondary | the site's text colour, never pure `#000000`; secondary two steps lighter, still 4.5 on `surface` |
| `borders` normal / light | from the greys, leaning the same way as the rest |
| `status` success / warning / error | green, amber and red shifted toward the palette's warmth, dark enough to read as text |
| `font` | the nearest of Nebula's 12 by classification (table below); the three words come from the site's tone |
| `type` | 4 or 5 sizes from the platform list, body 14 or 16 for a demo, the largest at least twice the smallest, each at least 1.1x the one before |
| `weights` | 400 / 600, plus 700 for one display size when the site is heavy |
| `radius` | read the site's buttons and cards; small / medium / large, bigger part bigger radius; square sites get `0px / 0px / 0px` |
| density | `comfortable` for a demo unless the storyline is a dense operations board |
| `gaps` | 8 or 12 inside, 24 or 32 between, from the spacing scale, between at least twice inside |
| `groups`, `depth`, `icons` | how the site holds content together, its depth, and one icon set in one style |
| `bold` | the storyline's lean-forward moment, on the page it lands on, made large |
| `motion` | one entrance on first load of the home page, and one moment on the main action; nothing else |
| `not` | the default-looks.md entry the first idea was closest to, and why it is a default |
| `leads` | what the storyline's first question needs seen first; what steps back |

### Font mapping

| The site uses | Nebula's nearest |
|---|---|
| a geometric sans (Futura, Poppins, Montserrat, Gotham) | Poppins, Figtree or Manrope |
| a neo-grotesque (Helvetica, Inter, Roboto, Arial, SF) | Geist |
| a humanist sans (Open Sans, Source Sans, Lato, Nunito, Segoe) | Lato, Nunito or Instrument Sans |
| a serif for text (Georgia, Times, Merriweather, Tiempos) | Source Serif 4 or Merriweather |
| an editorial or display serif | Spectral |
| a wide or heavy display face for headings | Special Gothic Expanded One, headings only, with a sans for text |
| a readability-first or accessibility brand | Lexend |

Write the three words so they say why: `Geist (plain, exact, modern)`.

## Check it before the brief

Write the line alone to `$STUDIO/work/designer/look.txt` with the Write tool, never on a
command line. Then run Nebula's checker:

```
node "$NEBULA/skills/app-craft/scripts/app-look-args.mjs" header --look-file "$STUDIO/work/designer/look.txt" --app-id check --out "$STUDIO/work/designer/look-check.json"
```

It prints every contrast number and refuses the line for anything `fast brief` refuses it for,
in the same words. Fix what it names and run it again; never write a contrast number it did
not print. Put the printed numbers in `design.md` under the line. The `--app-id check` value
is a placeholder: the output file is thrown away, only the check matters.

## Then the pages

Follow `app-page-planner/SKILL.md` for each page of the storyline: the `job` line (who, where,
how often; the questions in order; the main action; the states; the signals) and the `design`
block (3 to 8 regions, one `lead`, each `serves` a part of the job, kit parts named where
`kit.md` covers them). The beats decide the first question of each page. The page the
lean-forward beat lands on carries `bold`. Add a `## Rules` line for the brief:
`Every page's header shows the client logo from <URL> at the top left, through the app's custom code.`

Write everything to `$STUDIO/design.md` in the brief's own line format so the moderator can paste
it into `## Changes` unchanged: the `app look` line first, then for each page `page · create`,
`job`, `design`.
