# Innovation: using the platform's features for the use case

A demo that shows a form, a table and one automation shows what every tool can do. UnifyApps
has features most audiences have not seen used well: AI agents over live data, evaluations
that grade an agent, a context graph and an ontology that connect records across systems,
enterprise search, campaigns and segments, data pipelines, an API manager. The Innovator's job
in the discussion is to propose how one or two of these would serve this client's use case,
so the storyline has a lean-forward moment the audience could not have predicted. The Scout
checks whether each can be built, the Stand-in says whether the client would care, and the
Judge admits at most two within the budget.

## The feature catalogue, and who can build each

| Feature | What it shows an audience | Built by |
|---|---|---|
| AI agent over the demo's data | a question in plain words answered from live records, with an action it can take | Nebula (`agent-builder`) |
| Agent evaluation (dataset, metrics, experiment) | the agent graded on real questions, a scorecard the audience can read; "how do you know it is right" | Nebula (`agent-builder`, `evaluation`) |
| Agent team | a manager agent handing questions to specialist agents | Nebula (`create_agent` kind `team`) |
| Guardrails | what the agent refuses, shown live | Nebula (`set_guardrails`) |
| Automations with approvals, retries, schedules | a rule that routes, waits, retries and reports | Nebula (`automation-agent`) |
| Objects with audit trail and retention | who changed what, when; data that expires | Nebula (`fde-agent`) |
| Context graph (ECG) and ontology | records from several systems joined into one graph; a question answered across them | not Nebula: the operator skills `unifyapps-context-graph` and `ontology-and-context` describe the screens; `browser` or `manual` |
| Enterprise search | one search across apps, documents and records | operator skill `enterprise-search`; `browser` or `manual` |
| Campaigns and segments | a segment of records and a message sent to it | operator skill `campaigns-and-segments`; `browser` or `manual` |
| Data pipelines | data moved from a source system into objects on a schedule | operator skill `data-pipelines`; `browser` or `manual` |
| API manager | the demo's automation exposed as an API with a key and a rate limit | Nebula's api skills say their tool server is not built yet; `manual` |
| UI tests in Test Studio | the demo re-checked before the day by recorded tests | Nebula (`app-test-author`), opt-in |
| Mobile app | the same data on a phone | Nebula (`app-native`) |
| Multiple languages | the app in the client's second language | Nebula (`app-localization`, where live) |

`Built by` is the Innovator's first guess at feasibility; the Scout confirms it against
`task-kinds.md` and the operator skills. `browser` means a browser agent could build it from
the operator skill's screen descriptions; `manual` means the person builds it in the UI and
the runbook says so. The profile's `innovate` line says how far to go: `nebula` (default)
admits only ideas Nebula can build; `all` admits `browser` ideas too; `off` skips the
Innovator.

## An idea

```markdown
## <Idea title, in the client's words>
- Feature: <from the catalogue>
- Why here: <the moment in this client's world where it earns its place, in one sentence>
- The audience sees: <what is on screen, what the presenter says, in two sentences>
- Fits: <storyline title> · beat <n> (replaces | adds) · lean-forward: <yes | no>
- Costs: <entities added, time to show in minutes>
- Built by: <nebula | browser | manual>
- Risk: <the one way it falls flat>
```

## Rules

- Three to six ideas, each a different feature. An idea must be a beat: something the
  presenter does and the audience sees in under two minutes. A feature with no beat is not an
  idea.
- Prefer the idea that becomes the lean-forward moment over the one that adds a page.
- Stay inside the budget's entity counts; an idea that needs more says so under `Costs` and
  the Judge decides.
- Nothing beyond the beats still holds: an admitted idea replaces or sharpens a beat; it
  never adds a feature the storyline does not show.
- An idea's feasibility is a guess until the Scout confirms it. Never promise the platform
  can do something the catalogue does not list; raise it as a `platform question` instead.
- Use the client's vocabulary from the profile and the context notes.
