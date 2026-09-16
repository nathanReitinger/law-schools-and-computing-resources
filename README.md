# Law School Compute Index

A directory of US law schools and whether their **parent university** runs a
shared SLURM/GPU research-computing cluster that law faculty could plausibly
use — the kind of thing a Denver Law professor taps via
[DU's Research Data Analysis Cluster](https://www.du.edu/it/services/research-services/research-computing),
or a Northwestern Law professor reaches through Quest.

Live site: `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/` (once deployed — see below)

## What's here

- **121 law schools researched** across ~31 states/territories as of Sept 2026 (of ~200 ABA-accredited
  schools total — this is a starting point, not a finished census; see Contributing).
- Each school is tagged with a **GPU support tier** (Frontier / Modern / Older-gen / present-but-unnamed /
  no confirmed GPU / no resource / standalone), the specific hardware named in public sources, whether
  SLURM was confirmed as the scheduler, and a link back to the source.
- A handful of entries carry a **caveat** flagging real uncertainty — e.g. a cluster that's really
  department-level rather than campus-wide, or a shared multi-campus system where this specific campus's
  access wasn't independently confirmed.
- Schools on a shared multi-institution resource (a state optical network, a regional green-computing
  center, a university system-wide cluster) are tagged with that **network**, so you can search
  "LONI" or "MGHPCC" and see everyone on it.

## Running it locally

This is a plain HTML/CSS/JS site — no build step, no framework, no dependencies.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

You need a local server (not just double-clicking `index.html`) because the page `fetch()`s
`data/schools.json`, and browsers block `fetch` against `file://` URLs. GitHub Pages always serves over
HTTPS, so this is a local-preview-only issue — the deployed site works with no extra setup.

## Deploying to GitHub Pages

1. Push this folder to a new GitHub repo.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch," branch `main`, folder `/ (root)`.
4. Save. GitHub will publish to `https://<username>.github.io/<repo>/` within a minute or two.

## Before you publish — 3 things to replace

Search the repo for these placeholders and swap in your own values:

| Placeholder | Where | Replace with |
|---|---|---|
| `YOUR_GITHUB_USERNAME` / `YOUR_REPO_NAME` | `index.html`, this file, `CONTRIBUTING.md` | your GitHub username and the repo name you push to |
| `YOUR_NAME` | footer of `index.html` | your name |
| `YOUR_EMAIL@example.com` | footer of `index.html` | an email people can reach you at |

## Project structure

```
index.html          the page itself
css/style.css        styling
js/app.js            search/filter logic, reads data/schools.json, no dependencies
data/schools.json     the actual data — this is what a pull request usually touches
CONTRIBUTING.md       field schema + how to submit a correction or a new school
.github/ISSUE_TEMPLATE/correction.yml   the form used by "Suggest a correction"
```

## Updating the data

See [CONTRIBUTING.md](CONTRIBUTING.md) — short version: edit `data/schools.json` directly (either locally
and open a PR, or via GitHub's in-browser editor, which forks and proposes the change for you
automatically), or open an issue with the correction if you'd rather not touch JSON.

## License

MIT — see [LICENSE](LICENSE). Reuse, fork, and adapt freely; attribution appreciated but not required.
