# Law School Compute Index

A directory of US law schools and whether their **parent university** runs a
shared SLURM/GPU research-computing cluster that law faculty could plausibly
use.

Live site: `https://nathanReitinger.github.io/law-schools-and-computing-resources/` (once deployed — see below)

## What's here

- **121 law schools researched** across ~31 states/territories, data pulled September 2026 (of ~200
  ABA-accredited schools total — this is a starting point, not a finished census; see Contributing).
  The pull date is shown on the site itself and lives in `data/meta.json`.
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
- **This was compiled with AI (Claude) assistance and has not been hand-verified line by line.** Say so
  on the site, on purpose — see the disclaimer banner at the top of the page.

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
