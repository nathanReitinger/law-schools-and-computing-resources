# Law School Compute Index

A directory of US law schools and whether their **parent university** runs a
shared SLURM/GPU research-computing cluster that law faculty could plausibly
use — the kind of thing a Denver Law professor taps via
[DU's Research Data Analysis Cluster](https://www.du.edu/it/services/research-services/research-computing),
or a Northwestern Law professor reaches through Quest.

Live site: `https://nathanReitinger.github.io/law-schools-and-computing-resources/` (once deployed — see below)

## What's here

- **138 law schools listed** across 39 states/territories, data pulled September 2026, of roughly 198
  ABA-accredited schools total. **This is not a finished census — and the gap is systematic, not
  random.** The original pass worked alphabetically by state and stopped after New York, so states
  later in the alphabet are underrepresented; Ohio, Pennsylvania, Tennessee, Texas, Virginia and
  Washington were never reached rather than checked and found empty. About 60 schools remain to be added; **`TODO-missing-schools.csv`** lists every one with the
  specific cluster or statewide programme to check first. The pull date is shown on the site
  itself and lives in `data/meta.json`.
- **All 138 listed rows have been through a deep re-verification pass** and carry the sources used
  to check them; their notes begin "Re-verified", "RECLASSIFIED", "CORRECTED", "UPDATED" or "ADDED".
  Six rows still rest on a single source for a positive tier claim — `audit.py` names them.
- Each school is tagged with a **GPU support tier** (Frontier / Modern / Older-gen / present-but-unnamed /
  no confirmed GPU / no resource / standalone), the specific hardware named in public sources, whether
  SLURM was confirmed as the scheduler, and a link back to the source.
- A handful of entries carry a **caveat** flagging real uncertainty — e.g. a cluster that's really
  department-level rather than campus-wide, or a shared multi-campus system where this specific campus's
  access wasn't independently confirmed.
- Schools on a shared multi-institution resource (a state optical network, a regional green-computing
  center, a university system-wide cluster) are tagged with that **network**, so you can search
  "LONI" or "MGHPCC" and see everyone on it.
- Every column (state, school, university, resource, tier, hardware, SLURM) is **sortable** — click a
  heading, click again to reverse.
- **A grey chip means no *institutional* resource — not no compute.** NSF ACCESS allocates national
  supercomputing time to any researcher at a US academic institution, in any field, at no cost and
  with no supporting grant; the entry tier needs only a short abstract, and the hardware is
  frontier-class (NCSA DeltaAI is 608 GH200 superchips; Delta adds H200s). The 40 rows where this is
  the operative route are tagged `NSF ACCESS (national — any US academic institution)` in the
  `networks` field, so they're filterable on the site.
- Some rows carry a **caveat** flagging that the hardware tier and actual *law-school* access can
  diverge. Harvard is the clearest case: Cannon is frontier-class, but FASRC lists its supported
  schools as FAS, SEAS, HSPH, HBS and GSE — Law is not among them. Read the caveat before assuming a
  tier means an account.
- **This was compiled with AI (Claude) assistance and has not been hand-verified line by line.** Say so
  on the site, on purpose — see the disclaimer banner at the top of the page.

## Checking the data

`audit.py` validates `data/schools.json` against the rules in CONTRIBUTING.md and catches the
failure modes this dataset has actually hit — a tier that contradicts its own hardware string,
hardware attributed to the wrong machine, announced-but-not-operational GPUs, and big claims on a
single source. Run it before opening a pull request:

```bash
python3 audit.py                            # every row
python3 audit.py --sample 30 --seed 42      # reproducible spot check
```

It exits non-zero when anything is flagged, so it can gate CI.

## Running it locally

This is a plain HTML/CSS/JS site — no build step, no framework, no dependencies.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

You need a local server (not just double-clicking `index.html`) because the page `fetch()`s
`data/schools.json`, and browsers block `fetch` against `file://` URLs. GitHub Pages always serves over
HTTPS, so this is a local-preview-only issue — the deployed site works with no extra setup.

## Deploying to GitHub Pages (auto-updates on every push)

This repo ships with `.github/workflows/deploy.yml`, so once it's turned on, **every push to `main`
(including a merged correction PR) automatically rebuilds and redeploys the live site** — no manual
steps after the one-time setup below.

1. Push this folder to a new GitHub repo.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **"GitHub Actions"** (not "Deploy from a branch").
4. Push to `main` (or click **Run workflow** on the "Deploy to GitHub Pages" workflow in the **Actions**
   tab). The first run publishes to `https://<username>.github.io/<repo>/` within a minute or two, and
   every push after that redeploys automatically.

## Project structure

```
index.html            the page itself
css/style.css          styling
js/app.js              search/filter/sort logic, reads data/*.json, no dependencies
data/schools.json       the actual data — this is what a pull request usually touches
data/meta.json          just the "data pulled" date shown at the top of the site
CONTRIBUTING.md         field schema + how to submit a correction or a new school
.github/workflows/deploy.yml       auto-deploys to Pages on every push to main
.github/ISSUE_TEMPLATE/correction.yml   optional GitHub issue form (the site's primary
                                        "report an error" link goes to email instead — see below)
```

## Updating the data

Two ways in, both described on the site itself and in [CONTRIBUTING.md](CONTRIBUTING.md):

1. **Email a correction** — the "Report an error" link on the site opens a pre-addressed email with a
   fill-in-the-blanks template. Good for anyone who'd rather not touch JSON or GitHub at all.
2. **Edit `data/schools.json` directly** — via GitHub's in-browser editor (which forks and proposes a
   pull request automatically if you don't have write access), or locally if you'd rather work in your
   own editor and push a branch.

Whichever path someone uses, once a change lands on `main` the site redeploys itself automatically (see
Deploying, above) — nobody has to remember to republish.

## License

MIT — see [LICENSE](LICENSE). Reuse, fork, and adapt freely; attribution appreciated but not required.
