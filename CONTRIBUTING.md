# Contributing

This directory is only useful if it stays accurate, and it covers about 121 of ~200 US law schools so
far. It was also compiled with AI (Claude) assistance and has **not** been hand-verified line by line —
corrections, missing schools, and updated specs are all genuinely welcome. Pick whichever path is easier
for you.

## Option A — email a correction (no GitHub account needed)

Click **Report an error** on the site — it opens your email client addressed to the maintainer with a
short fill-in-the-blanks template (school / what's wrong / source). This is the easiest path if you don't
want to touch JSON or GitHub at all. See the site footer for the address directly.

## Option B — edit `data/schools.json` directly

This is the faster path if you're comfortable with a text editor and don't mind a bit of JSON, and it
skips the round-trip through the maintainer's inbox.

1. Click **Edit the data on GitHub** on the site (or open `data/schools.json` in the repo and click the
   pencil icon). If you don't have write access, GitHub automatically forks the repo for you.
2. Find or add the row for the school in question.
3. Edit the fields (schema below), save, and GitHub will walk you through opening a pull request.
4. Once the PR merges to `main`, the site redeploys itself automatically (see README) — no extra step.
5. If GitHub's in-browser editor gives you trouble, clone the repo, edit `data/schools.json` locally, and
   push a branch + PR the normal way — or fall back to Option A and email the maintainer instead.

## Option C — open a GitHub issue

`.github/ISSUE_TEMPLATE/correction.yml` still works if you'd rather file something in the repo's Issues
tab than send an email — it's just not linked from the site's main "Report an error" button anymore.

### Field schema

Each school is one object in the top-level JSON array:

```json
{
  "state": "Colorado",
  "school": "University of Denver Sturm College of Law",
  "university": "University of Denver",
  "standalone": false,
  "tier": "modern",
  "tierLabel": "Modern — A100/A40/L40-class confirmed",
  "gpu": "2 nodes w/ 1x V100 each; 4 nodes w/ 4x A100 80GB each; 2 nodes w/ 8x RTX PRO 6000 96GB each",
  "slurm": "Yes",
  "hpcName": "Research Data Analysis Cluster (RDAC)",
  "specs": "24 compute nodes; 1TB user storage quota (Rocky Linux 9)",
  "link": "https://www.du.edu/it/services/research-services/research-computing",
  "notes": "Available to Faculty, Graduate and PhD Students; SLURM 25.11.4",
  "networks": []
}
```

| Field | Type | Notes |
|---|---|---|
| `state` | string | US state/territory, matches the source law-school list |
| `school` | string | the law school's name |
| `university` | string | the parent university; empty string `""` if standalone |
| `standalone` | boolean | `true` if the law school has no parent research university |
| `tier` | string | one of the slugs below — controls the color chip and filter grouping |
| `tierLabel` | string | the human-readable version shown in the UI; keep it matched to `tier` |
| `gpu` | string | specific hardware named in a real source, e.g. GPU models and counts |
| `slurm` | string | e.g. `"Yes"`, `"Not confirmed"`, `"Likely (...)"` — say what you actually confirmed |
| `hpcName` | string | the name of the cluster/center, e.g. `"Quest"`, `"HPC@LSU"` |
| `specs` | string | cores, storage, RAM — whatever else is documented |
| `link` | string | a real, working URL to the source. Leave `""` rather than guessing |
| `notes` | string | access policy, eligibility, anything else worth knowing |
| `caveat` | string, optional | only add this if there's a real reason to doubt the resource applies cleanly (department-only, campus access unconfirmed, etc.) — omit the field entirely otherwise |
| `networks` | array of strings | tag any shared multi-institution or multi-campus system this resource belongs to (see below); `[]` if none |

### Tier slugs (`tier` field)

Pick based on the most specific hardware actually named in a source — don't upgrade a tier because you
assume newer hardware exists if it isn't confirmed.

| slug | meaning |
|---|---|
| `frontier` | H100, H200, B200, or GH200/Grace Hopper confirmed |
| `modern` | A100, A40, L40/L40S, A6000, RTX PRO 6000, or similar confirmed |
| `older` | V100, T4, RTX8000, P100, K80/K40, or similar confirmed |
| `unspecified` | GPUs confirmed present, but no specific model named in the source |
| `undetailed` | a real HPC/research-computing center exists, but public docs don't say whether it has GPUs |
| `cpuonly` | a research-computing resource exists but is CPU/RAM-only, or GPUs were explicitly ruled out |
| `construction` | funded/announced but not yet operational |
| `none` | no dedicated research-computing resource could be found for the parent university |
| `standalone` | the law school has no parent research university at all |

### Networks

Use `networks` for any resource shared across more than one campus or institution — a state optical
network, a regional green-computing facility, a state-wide AI compute initiative, or a university system
cluster serving multiple campuses. Examples already in use: `"LONI (Louisiana)"`,
`"MGHPCC (Massachusetts consortium)"`, `"Empire AI (New York State)"`,
`"AHPCC (Arkansas statewide)"`, `"University of Nebraska System (HCC)"`. Reuse an existing network name
exactly (so the filter groups schools together) rather than inventing a near-duplicate label.

### Sources

Prefer the university's own IT/research-computing pages over secondhand summaries. Link the most specific
page you can (a cluster's own docs page beats the department's general homepage).

### Updating "data pulled"

`data/meta.json` holds the single line shown at the top of the site ("Data pulled: ..."). If you do a
real pass of re-verifying or refreshing entries, update `dataPulled` to reflect that — don't bump it for
a single one-line fix, since the date is meant to describe how recently the dataset as a whole was
checked, not the repo's commit history.

## Adding a school that's missing entirely

Same process — add a new object to the array in roughly alphabetical position by state, then by school
name. If you're not sure a field applies (e.g. the school is standalone), see the schema notes above for
what to leave blank vs. omit.
