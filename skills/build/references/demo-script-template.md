# The demo script

Written by the moderator after `plan finish`, from the chosen storyline's beats and what the
plan actually built: real page addresses, real record names from the seed rows, real
automation and agent names. Rehearsal walks it; the runbook carries it with a shot per beat.

## Shape

```markdown
# <Client> demo — script

- App: <app name> · published <version> · live <published URL> · preview host <host>
- Presenter plays: <role>, at <place>
- Story row: <record name> · <the values that matter>
- Length: <n> minutes · <n> beats

## Beats

### 1. <Beat title>
- Say: <one sentence the presenter says>
- Do: <the click, the typed value, the menu item, in order>
- Open: https://<host>/p/0/interfaces/<appId>/preview/<path>
- See: <what must be on screen, in the words that are on it: headings, the story row's values, a badge and its state>
- Check: <the one thing Rehearsal reads to pass this beat, such as "the row Truck 214 shows Overdue in error red">

### 2. …

### H1. <Hood beat title> (platform or both intent only)
- Say: <one sentence: what the audience is about to see configured>
- Open: <the builder link `entity link <kind> <id>` returned for the automation, object, page or agent>
- See: <the nodes, fields or blocks by name; the branch or rule the story depends on; the one-line descriptions>
- Check: <what Rehearsal reads on the canvas or schema to pass this beat>
```

## Rules

- `Open` is the preview route for a browser that `open-page` started; the published address
  is in the header for the presenter. A detail page's `:param` is replaced by the story
  row's real id, taken from the seed task's report or a `get_records` read.
- `See` quotes the words on the screen. Rehearsal passes a beat only on what it reads or
  sees, never on what the builder reported.
- The failure beat says what the refusal looks like (the banner's text, the badge's colour).
- An AI agent beat names the exact question typed and the fact the answer must contain.
- The last story beat is the lean-forward moment. Hood beats follow it (`both`) or sit where
  the storyline put them (`platform`); a `use-case` script has none.
- A hood beat's `Open` is a builder link, not the preview route. Rehearsal takes a plain
  `screenshot` there and reads the canvas or schema.
