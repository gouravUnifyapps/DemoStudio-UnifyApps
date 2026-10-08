# Demo Studio

Builds client-branded UnifyApps demo assets from one request, with no clarifying questions in
between. A team of agents settles every open decision itself, the installed Nebula plugin
builds the result through its own plan and builder agents, and a rehearsal agent walks the
finished demo in a browser the way the presenter will.

Requires the **Nebula** plugin (written against 3.47.0, checked for 3.46.0 and later 3.x).

## What you type

```
/demo-studio:build Build a demo for Acme Logistics (acmelogistics.com): fleet maintenance with
approvals and an AI assistant, 20 minutes for their COO on Friday.
```

Optional, once per client, so later demos need even fewer decisions:

```
/demo-studio:profile Acme Logistics · site acmelogistics.com · audience COO, 20 minutes, in person ·
show off approvals by amount and an AI assistant · tenant orbit.uat.unifyapps.com
```

## What happens

| Act | Who | What |
|---|---|---|
| 0 Setup | the skill | Nebula setup from the profile: tenant, sign-in, solution, Sonic mode. Sign-in is the only possible stop. |
| 1 Discovery | Scout, Researcher, Ideator, Designer, then Stand-in | the tenant and platform map; what the client said in Slack, from channels the Researcher finds itself; three storylines; the client's brand from its site; the demo intent (use case, platform configuration, or both) settled from the client's own sentences; every open decision answered for you |
| 2 Convergence | Judge, Designer, Scout, Stand-in | one storyline chosen to match the intent and cut to budget, with everything no beat uses removed; the app look and every page designed; every line checked against what the platform can build, with any platform question asked of Nebula rather than guessed; the Nebula brief filed |
| 3 Build | Nebula | the plan, the builders, the page reviewer, read-back proof, publish and deploy |
| 4 Rehearsal | Rehearsal | every beat of the demo walked in a browser with a shot; fixes filed as Nebula later tasks; two rounds at most |
| 5 Handoff | the skill | a runbook with the script, shots, links, the look, and every decision taken for you with the profile line that would have avoided it |

## Three rules worth knowing

- **It asks Nebula, never guesses.** Any question about what the platform can do or store is
  answered from Nebula's knowledge skills, the platform's knowledge sheets or a tenant read
  (`skills/build/references/ask-nebula.md`). The platform fails silently, so a guess is worse
  than no answer.
- **It pulls context from Slack.** The Researcher searches channels by the client's name,
  domain and the demo words, ranks them, reads the top five, and writes what the client and
  the team actually said. No personal data leaves Slack; with no Slack connected the build
  simply goes on.
- **It builds nothing a beat does not use, and it decides the demo's intent first.** Is the
  audience there for the use case, for a look at how it is configured on the platform, or
  both? The Stand-in settles that from the request, the profile and Slack before any
  storyline is chosen; a `platform` demo keeps the use case small and the configuration
  legible, with hood beats that open the builder; a `use-case` demo keeps the platform out of
  sight. Everything no beat shows is cut by the Judge.

## What still reaches you

An expired sign-in, a delete, a real credential or connection the tenant lacks, and a budget
the Judge cannot meet. Nothing else.

## Files

```
demo-studio/
  .claude-plugin/plugin.json
  skills/build/SKILL.md            the five acts
  skills/build/references/         nebula-bridge, ask-nebula, slack-research, demo-defaults,
                                   ledger, storyline, demo-script, runbook and profile
                                   templates, brand-to-look
  skills/profile/SKILL.md          write or edit a client profile
  agents/                          stand-in, scout, researcher, ideator, designer, judge, rehearsal
  scripts/nebula-root.mjs          finds the installed Nebula and checks its version
```

Working files go under `.sessions/<sessionId>/drafts/studio/`; profiles under
`studio/profiles/`; the runbook in the working folder.

## Design notes

Nebula's Sonic mode already answers its own questions, but with a safety bias (smallest scope,
no release, no seed rows) that is wrong for demos, and it still asks setup, execution and
builder questions. Demo Studio replaces Sonic's single-mind scoping with a bounded team debate
over a decision ledger, carries its own demo defaults, and reuses everything downstream of the
brief unchanged. The full design is in `Demo Studio - Skill Design.md` beside this folder.
