# The client profile

One file per client at `studio/profiles/<client-slug>.md` in the working folder. It is the only
input Demo Studio needs beyond the request, and the lever that drives questions to zero: every
decision the runbook lists under `Decisions taken for you` names the line that would have
settled it. The request overrides any line for one run.

When no profile exists, the build skill drafts one from the request, fills the rest with the
defaults below, and marks it `drafted by Studio`. The `profile` skill writes or edits one on
request.

## Shape

```markdown
# <Client name>

- status: <confirmed | drafted by Studio on <date>>
- client: <name> · site <https://…> · industry <one line>
- audience: <who watches> · <n> minutes · <in person | call | recorded> · <projector | laptop | phone>
- presenter: <who> · tells the story from <whose seat>
- show off: <the two or three things the demo must make obvious>
- intent: <use-case | platform | both | find out> · <why, in the client's words when known>
- sources: <slack gmail calendar, any subset, or none> · <what to look for, when known>
- slack: <channels to read, such as #acme-deal #sales-emea, or "find them">
- frontend: <nebula | code | both> · <nebula builds the Config app; code builds it in the Code Builder from the Text2Code prompt; both does both>
- innovate: <nebula | all | off> · <nebula admits platform-feature ideas Nebula can build; all admits ideas a browser agent could build from the operator skills; off skips the Innovator>
- avoid: <what must not appear or happen>
- tenant: <host> · solution: <name> (create if missing)
- release: <publish and deploy without asking | leave unpublished> · visibility <PRIVATE | shareable>
- data: fictional people and places · <15 to 20> rows per object · one story row the script leans on
- budget: <3> discussion rounds · <4> pages · <3> objects · <3> automations · <1> AI agent · <2> rehearsal rounds
- voice: plain words · the client's own terms (<their word>, not <ours>)
- brand: <logo URL, colours or fonts already known, or "scout the site">
- notes: <anything the Stand-in should know: past demos, what the audience disliked, a competitor they compare with>
```

## Defaults when a line is missing

| Line | Default |
|---|---|
| audience | a senior operations leader · 20 minutes · in person · projector |
| presenter | the person who asked · from the seat of the client's team lead |
| show off | the request's own nouns; else approvals that route by a rule, an AI assistant over live data, clean tables |
| intent | `find out`: the Researcher's Slack signals and the request decide; when neither does, `both`, marked `Check this` |
| sources | `slack gmail calendar`: whichever is connected is read; a missing one is noted and skipped |
| slack | `find them`: the Researcher searches channels by the client's name, domain and the demo words |
| frontend | `nebula`; the Text2Code prompt is written in every case |
| innovate | `nebula`: the Innovator runs, and the Judge admits at most two ideas Nebula can build |
| avoid | deletes · anything needing a connection the tenant lacks · more pages than the budget |
| tenant | the host of a builder link in the request; else the folder's Nebula solution; else the most recent tenant Nebula's `state next` lists |
| solution | `<Client> Demo` |
| release | publish and deploy without asking · PRIVATE |
| data | fictional · 15 to 20 rows · one story row |
| budget | 3 rounds · 4 pages · 3 objects · 3 automations · 1 AI agent · 2 rehearsal rounds |
| voice | plain words · the client's terms as the site uses them |
| brand | scout the site |

A drafted profile is still a profile: the build never asks for one. The runbook shows which
defaults were used so the person can confirm or change them.
