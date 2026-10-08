# Text2Code: the prompt, and driving the Code Builder

UnifyApps has two app builders. Nebula builds **Config** apps (pages as a block tree). The
**Code Builder** ("Text2Code") takes a prompt, plans, and writes real front-end source code.
Demo Studio always writes a Text2Code prompt from what Nebula built, so the same demo can be
made as a code app too; when the profile's `frontend` line says `code` or `both`, the Coder
agent takes that prompt into the Code Builder in a browser, approves the plan, iterates until
the storyline's beats pass, and publishes. The person's `code-builder` skill, when the session
lists it (`anthropic-skills:code-builder` or `unifyapps-operator:code-builder`), is the
reference for the screens; load it first.

## The `frontend` line

| Value | Nebula builds | Code Builder builds | Rehearsal walks |
|---|---|---|---|
| `nebula` (default) | objects, seeds, automations, agents, the Config app | nothing; the prompt is written for the person to use later | the Config app |
| `code` | objects, seeds, automations, agents; no page lines, no publish | the app, from the prompt, iterated and published by the Coder | the code app, by the Coder |
| `both` | everything, as `nebula` | the app too, as `code` | both; good for a `platform` demo that compares the two builders |

With `code`, the brief has no `page`, `job`, `design` or `app look` lines and no `publish`;
the Designer still writes the look and the page designs, because the prompt needs them.

## The prompt

Written by the Coder to `<Client> Text2Code Prompt.md` in the working folder, from reads of
what Nebula built (cache first: `cache obj <id>`, `cache wf <id> --contract`, `cache agent
<id>`; `entity link` for each id), never from the brief alone. Every id in it is one a read
returned. The shape:

```markdown
# <App name>

## What this app is
<Two or three sentences: who uses it, what goes wrong in their world, what they see fixed. The client's words.>

## Pages
For each page of the storyline, in order:
### <Page name> at /<path>
- For: <who, where, how often> · answers <first question>; <second question>
- Shows: <the regions in order, each in one line, from the Designer's design block>
- Main action: <what most visits end with>, which calls <automation name> (`<workflowId>`)
- States: loading · empty ("No <items> yet.") · error ("Couldn't load <items>." with Retry)

## Look
- Colours by role: page <#>, surface <#> / <#alt>, text <#> / <#secondary>, primary <#> / <#hover> / <#pressed>, borders <#> / <#light>, success <#>, warning <#>, error <#>
- Font: <font> · sizes <…> · weights <…> · radius <small/medium/large> · <compact|comfortable> · gaps <inside/between>
- Logo: <URL> at the top left of every page
- <The one bold thing and where it lives> · motion: <the one moment, or none>

## Data: use these objects, create none
For each object:
- `<OBJ_id>` <Name>: <field> (<type>), … · picklist <field>: <code> "Label", … · <n> seeded rows exist, including <the story row by name>

## Logic: call these automations, write no object directly
For each automation:
- `<workflowId>` <Name>: call from <page / button> · input {<key>: <type>, …} · returns <result vocabulary> · deployed

## Assistant (when there is one)
- Agent `<agentId>` <Name>: embed it on <page> · it answers <what> from <the objects and automations above> · the demo asks it: "<q1>", "<q2>", "<q3>"

## Rules
- Build only the pages and actions above. Nothing extra: no admin page, no settings, no export, no second role.
- Read and write data only through the objects and automations listed, by these exact ids. Do not create objects, automations or sample data.
- Every list has loading, empty and error states; every form keeps its values on failure and shows one Retry.
- Use the client's words: <term list from the profile and the context notes>.
- Dates are epoch milliseconds; picklists store the codes above and show the labels.

## Done when
<One line per storyline beat: "the presenter does X and sees Y".>
```

Keep it under two screens. A line the Code Builder does not need is a line it may misread.

## Driving the Code Builder (frontend `code` or `both`)

The Coder works in a browser signed in to the tenant. In order of preference: the Claude
desktop app's built-in browser (`mcp__Claude_Browser__*`, loaded with one ToolSearch; it is the
pane beside the chat, the person is usually already signed in to the tenant there, and they
can watch), then Claude in Chrome (`+chrome`; the person's own Chrome), then Nebula's
Playwright server (a fresh browser with no sign-in). Take the first whose tools the session
has; never mix two. A browser that lands on a sign-in page is the one allowed stop: say so in
one line and wait; never type a password.

1. **Open the create screen.** From the tenant's home, Applications in the left navigation,
   then Create Application. The screen says "Prompt. Build. Ship." with two tabs above the
   prompt box, Code and Config. Select **Code**. If the Code tab is missing, the Code Builder
   is not enabled on this tenant: write that in `code-app.md`, mark the code app unverified,
   and stop. Ask nobody.
2. **Paste the prompt** whole into the box and press Build. A failure in red under the box is
   read, the prompt fixed for exactly what it names (an attachment too big, a line it
   refused), and sent once more; a second failure ends the attempt as unverified.
3. **The plan.** A Plan card appears. Open Review plan and hold it against the prompt's
   `## Done when` and `## Rules`: every beat covered, nothing extra, the listed ids used.
   Something missing or extra: type the correction in the composer (it goes back to the
   planner), at most twice. Then Approve.
4. **Clarifying questions** from the builder's agent take over the preview on the first turn
   and sit above the composer later. Answer each from the prompt, the ledger and the
   Stand-in's answers, in one specific line. Never relay one to the person. A question that
   needs a credential ends the attempt as unverified, with the question in the report.
5. **Wait for the build** by reading the page every 30 seconds or so, never by sleeping
   blindly: the Preview tab unlocks when the first build is done. Twenty minutes with no
   preview is a failed build; Retry once, then report.
6. **Walk the beats in the Preview tab.** The page switcher opens each page; the device
   switcher stays on Laptop. For each beat of the storyline do what the script says and read
   the page. Pass or fix, as Rehearsal judges a Config page.
7. **Iterate one change at a time.** For each failing beat, type one change in the composer
   ("the Rejected badge should use the error colour, not grey"), wait for the turn, re-read.
   At most 6 turns. A fix that makes another beat worse is undone with the next turn. Design
   mode is for a colour, size or spacing that is easier to click than describe.
8. **Publish** from the Preview tab: tag `demo-v1`, version notes "Demo Studio build for
   <client>", and copy the Application URL. Publish greyed out as Up to date means nothing
   changed since the last publish; greyed out for a branch means switch to the default
   branch first.
9. **Report** `code-app.md`: the app name, the builder link, the published URL, the plan
   corrections made, every clarifying question and the answer given, pass or fix per beat
   with what was seen, the turns used, and what is unverified. For a `platform` or `both`
   intent, note what the Code and Trace tabs show, for the hood beats.

The Coder never touches the Config app, never opens Nebula's builder, and never writes to the
tenant except through the Code Builder's own chat and Publish button.
