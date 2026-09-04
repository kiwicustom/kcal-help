# Lesson body content (Phase 2)

JSON bodies for Buddy Academy lessons and Help feature coaches.

**Do not edit** `catalog.json` or the generator to change lesson prose — edit the matching file here.

Generator looks up `help-site/content/bodies/{id}.json` by catalog page `id` (Help pages use a `help-` prefix in filenames, e.g. `help-home.json` for catalog id `home`).

## Schema

```json
{
  "intro": "short intro paragraph",
  "time": "8 min",
  "buddyTip": "one coaching tip",
  "mission": "optional today's mission",
  "why": ["paragraph", "paragraph"],
  "what": {
    "lead": "optional",
    "points": ["...", "..."],
    "misconceptions": [{ "myth": "...", "truth": "..." }]
  },
  "how": {
    "lead": "optional",
    "steps": ["...", "..."],
    "buddyHelps": "how the app helps"
  },
  "sections": [
    { "title": "...", "paras": ["..."], "steps": ["optional"] }
  ],
  "mistakes": [
    { "quote": "user quote", "why": "explanation" }
  ],
  "encouragement": "warm closing"
}
```

### Field notes

| Field | Required | Notes |
|-------|----------|--------|
| `intro` | yes | 1–3 sentences; sets the lesson frame |
| `time` | yes | Reading estimate, e.g. `"8 min"` |
| `buddyTip` | yes | One practical coaching tip in Buddy voice |
| `mission` | no | Optional “today’s mission”; omit or `null` if unused |
| `why` | yes | 2+ short paragraphs — why this matters |
| `what.lead` | no | Optional lead-in before bullet points |
| `what.points` | yes | Concrete takeaways |
| `what.misconceptions` | no | Myth / truth pairs when useful |
| `how.lead` | no | Optional lead-in for steps |
| `how.steps` | yes | Actionable steps |
| `how.buddyHelps` | yes | How kCal Buddy supports this in the app |
| `sections` | no | Extra titled blocks (`paras`; optional `steps`) |
| `mistakes` | yes | 2–3 realistic user quotes + explanations |
| `encouragement` | yes | Warm close — coach, not marketing |

## Writing rules

- Coach voice: short paragraphs, plain language, science-based without jargon walls
- Actionable — every lesson should leave one clear next action
- English only (FI/DE product context still ships English Academy bodies in Phase 2)
- No marketing buzzwords; no shame language
- Target ~400–900 words equivalent across all fields per lesson
- Align with product beliefs: Progress over Perfection, Knowledge over Guessing, Honesty over Shame, Health Operating System, Scale Health Success

## File list

Academy / journeys: `why-kcal-buddy`, `philosophy`, `first-30-days`, `daily-success`, `weekly-success`, `monthly-success`, nutrition lessons (`nutrition-*`).

Help feature coaches: `help-home`, `help-foodiary`, `help-voice`, `help-camera`, `help-meal-plan`, `help-progress`, `help-spaces`, `help-settings`, `help-auth`, `help-troubleshooting`.
