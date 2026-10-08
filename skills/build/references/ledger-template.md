# The decision ledger

One file, `$STUDIO/ledger.md`, kept by the moderator. It is the whole discussion: every
decision the team had to take, who proposed what, who settled it and how. The two Nebula
questionnaire documents and the brief's `## Assumptions` are written from it, and the runbook's
`Decisions taken for you` list is its `STAND-IN`, `JUDGE`, `DESIGNER` and `MODERATOR` rows.

## Shape

```markdown
# <Client> demo — ledger

- Round: <0|1|2|3>
- Converged: <no|yes, round n>
- Storyline: <open | chosen: <title> (round n)>

## Rows

| Key | Question | Candidates | Raised by | Settled | Source | Status |
|---|---|---|---|---|---|---|
| demo.intent | What does the client want out of the demo? | use-case · platform · both | Moderator | both: "show us the approval flow" and "how hard is it for us to change the limit" (#acme-deal, 2026-10-02) | SLACK | settled |
| approval.threshold | What repair cost needs a manager? | $2,000 (Ideator) · $5,000 (Scout: existing rule) | Ideator, Scout | $5,000, it matches the existing Approve Repair automation | READ | settled |
| table.search_event | Can the fleet table's search trigger the assistant? | — | Ideator | No: a Table's toolbar search fires no event (task-kinds.md); the assistant gets its own input block | NEBULA | settled |
| app.visibility | Who can open the app without sign-in? | PRIVATE · PUBLIC | Scout | PRIVATE, the profile says in-person demo | PROFILE | settled |
| fleet.story_row | Which truck is the story? | — | Ideator | Truck 214, overdue brake service, $6,400 estimate | STAND-IN | settled |
| assistant.model | Which model runs the assistant? | — | Scout | the tenant's default from list_models | SCOUT | settled |

## Objections

| Key | From | Objection | Resolved by |
|---|---|---|---|
| assistant.scope | Scout | no tool reads the maintenance PDF the bold storyline wanted | Judge: cut the PDF; the assistant answers from the object |

## Round log

- Round 1: storyline chosen "Keep the fleet moving"; 6 rows settled, 4 open.
- Round 2: look and 3 pages designed; Scout cleared every line; 4 rows settled; converged.
```

## Keys

The first row is always `demo.intent`, settled by the Stand-in before any storyline is chosen
(demo-defaults.md § Demo intent). A question about what the platform can do or store is a
`platform question` row, answered through ask-nebula.md and tagged `NEBULA`; it is never
settled by opinion.

A key is `subject.decision` in snake_case, the same idea as Nebula's questionnaire decision
keys. Before adding a row, compare its meaning with every existing row and with the request
and profile; a settled meaning is not added again under a new word. Cover the twelve
fact-types of Nebula's requirements checklist (outcome, users and access, scope, workflow,
data, rules, UI states, integrations, failures, constraints, acceptance, rollout) at least
once each; a type the demo does not touch gets one row marked `N/A` with its reason.

## Sources

| Source | Means |
|---|---|
| `REQUEST` | the person's words settled it; quote them |
| `PROFILE` | the client profile settled it; name the line |
| `READ` | a tenant or platform read settled it; name the read and the fact |
| `SLACK` | a Slack message settled it; name the channel and date, quote at most two sentences |
| `NEBULA` | Nebula's knowledge skill, a knowledge sheet or a Nebula read answered a platform question; name which |
| `STAND-IN` | the Stand-in answered for the person |
| `SCOUT` | a platform fact the Scout established beyond a plain read (feasibility, sizing) |
| `DESIGNER` | a look or layout choice the Designer made |
| `JUDGE` | the Judge ruled between candidates, or closed a row at the round cap |
| `MODERATOR` | the moderator fixed a refusal with the nearest passing value |

## Status

`open` while more than one candidate stands or an objection is unresolved; `settled` when one
candidate stands with a source; `user-only` for a credential or a delete, which goes to the
person; `N/A` for a fact-type the demo does not touch.

## The convergence test

A round converges when, at its end, all three hold:

1. every row is `settled`, `N/A` or `user-only`;
2. the Objections table has no row without `Resolved by`;
3. the round added no new `open` row.

The storyline converges when `Storyline:` reads `chosen` and the Scout's capability table for
it has no `no tool` line left unresolved. Three rounds at most; past the cap the Judge rules on
every open row and the ledger says `Converged: by ruling, round 3`.
