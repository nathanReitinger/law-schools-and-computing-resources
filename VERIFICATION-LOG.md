# Re-verification log — September 2026

**132 schools listed of ~198 ABA-accredited. Every listed row carries its own sources.
108 rows fully re-verified; 24 tier-claim rows still to check.**
Schema validated on every pass; one `tierLabel` per tier.

---

## Correction notice: I inflated the source counts, and reverted it

Kept at the top because it affected the file's credibility, not just its contents.

After finding that NSF ACCESS is open to any US academic researcher, I applied it in bulk: five
identical ACCESS URLs and an identical ~250-word paragraph appended to 40 rows at once. Two problems.

1. **The sources weren't sources.** `CONTRIBUTING.md` defines `sources` as "every URL you actually
   used to verify this row." Those URLs verify a national program; they verify nothing about
   Washburn or Vermont Law. That put **200 entries** into the file nobody had used to check anything.
2. **It hid the real gap.** Nine rows had zero sources because nobody had researched them. After the
   bulk edit each showed five, and I reported "every row now has at least one source" as progress.
   The number was manufactured.

**Reverted:** all 200 removed, the duplicated essay condensed to a one-line pointer, honest count
restored. The ACCESS finding is real and now lives once, in `meta.json`, `index.html` and
`README.md`. The `networks` tag stays on those 40 rows — that tag *is* accurate per-row, and makes
them filterable.

Rule written down so it doesn't recur: **a finding that applies to every row is a site-copy change,
not a per-row data change.**

The zero-source count is now genuinely 0, reached by researching the nine rows individually.

## The slow pass: 10 rows, one at a time

### Tier change found by reading past the headline

**Washburn University School of Law — `none` → `cpuonly`.** Washburn *does* have a named resource
the old row missed: **HiPACE**, the High-Performance Academic Computing Environment, run by faculty
and students in the Natural Sciences Division at its own subdomain.

But the specification page is the whole story. The hardware is fully enumerated and contains **no
GPU at all**: a master node plus 34 compute nodes of dual-core Opterons with 4GB RAM each, a 16-core
SMP with 64GB, a 12TB filesystem — all running **OpenSuSE Linux 10.2**, a release that went
end-of-life in 2008. Funded by an Innovation Grant covering 2006–2009.

So: a genuine resource on paper, an eighteen-year-old CPU cluster on an unsupported OS in practice.
A fast pass that saw "high-performance computing system" and stopped would have upgraded this row
wrongly. Reading the actual specs produced `cpuonly` plus a caveat to confirm it still runs.

### Standalone confirmations, each with a lead chased down

- **California Western** — independent on three footings (its own description, WSCUC listing
  Sponsorship as "No related entity," separate WSCUC accreditation). *Lead ruled out:* joint JD/MBA
  and JD/MSW **with San Diego State**, which has real HPC. Looks like the Albany Law case; isn't —
  Albany's affiliation funds joint *faculty* research, these are *student* degree programs.
- **Brooklyn Law** — "an independent institution, unaffiliated with any university or college."
  Independence is deliberate: St. Lawrence University moved to close it in 1968 and alumni
  repurchased the assets. *Lead ruled out:* Empire AI is a closed ten-member consortium.
- **Southwestern** — independent since 1911. *Leads ruled out:* an unusually long partnership list
  (CSU Northridge, CSU Dominguez Hills, Drucker, Pardee RAND, Keck Graduate Institute) — every one a
  student degree or certificate pathway, none a faculty affiliation.
- **New England Law Boston** — independent; founded 1908 as Portia Law School, the nation's first
  law school exclusively for women. MGHPCC ruled out, same as Suffolk.
- **New York Law School** — independent since 1891. **Now dual-accredited**: MSCHE institutional
  accreditation, called "a landmark moment in the 134-year history," which the school says lets it
  build "interdisciplinary programs and degrees typically available at law schools within larger
  universities." Flagged for re-check — an independent school building interdisciplinary programs is
  more likely to need compute. *Disambiguation recorded:* NYLS is **not** NYU School of Law, exactly
  the confusion that produced this dataset's "John Marshall closed 2020" error.
- **South Texas College of Law Houston** — independent since 1923. *The A&M question resolved:* STCL
  signed a 1998 affiliation and attempted a merger that would have branded it the Texas A&M Law
  Center. **That deal fell through**; A&M instead acquired Texas Wesleyan's school in 2013. What
  remains is student joint degrees. Also added MSCHE as a backstop accreditor in 2025, same move as
  NYLS.
- **Vermont Law and Graduate School** — independent since 1972, NEASC-accredited since 1980,
  renamed in 2022 on an anonymous $8M gift. *Re-check trigger recorded:* between presidents, with a
  national search launched April 2026.

### Confirmed `none`

**Western New England** — a ~3,700-student master's-level university; no research computing on
either the central-IT or academic side. Historical note recorded: it began in 1919 as a branch of
**Northeastern** and took an independent charter in 1951 — long severed, and conferring nothing, but
worth stating because Northeastern's Explorer cluster would otherwise look like a connection.

### Data/text inconsistency

**NYU School of Law** — the row already *named* NYU's Empire AI membership in two fields but carried
no `networks` entry, so the shared-networks filter silently failed to group it with Columbia, Cornell
and CUNY. Tag added.

## Tier-claim verification (in progress) — 6 rows checked, 2 wrong

This is the group flagged as riskiest: a stale `frontier` overclaims publicly in a way a wrong
`none` does not. Two of the first six checked were wrong, **both overstating**.

### Tier changes

**University of Arizona — `frontier` → `older`.** This is the exact mirror of the Alabama error.
Alabama was scored `construction` while A100s were already running; Arizona was scored `frontier` on
hardware that hasn't arrived. UArizona's docs are explicit on both halves: the H200s belong to
**Lynx**, "scheduled for assembly and installation in September 2026" with public rollout "sometime
in late Fall semester" and no firm date — while **"both El Gato and Ocelote have been
decommissioned."** What a researcher can use today is Puma, whose GPU nodes carry V100S. Should flip
to frontier once Lynx is live; re-check early 2027.

**University of Hawai'i — `frontier` → `modern`.** The "148 GPUs" headline is *correct* and verified
three ways including a peer-reviewed ACM paper by Koa's architects. The tier drawn from it was not:
the same paper says the fleet runs "from Nvidia GeForce RTX 2070 up to Nvidia Tesla L40" — an Ada
Lovelace ceiling. The only Hopper hardware is **two H100s in a researcher condo purchase**, reachable
by community users only when idle and preemptible. A right number, a wrong tier.

### Confirmed, with the headline sharpened

- **ASU** — frontier holds, but "580+ GPU accelerators" was a stale aggregate: **Agave has been
  decommissioned.** Current estate is Sol (290+ GPUs) plus Phoenix (360, "public access coming
  soon"). Caveat added — ASU's own wiki says Sol carries A100s "and a few H100s", so frontier rests
  on a small Hopper presence.
- **Nebraska** — exact, and the arithmetic reconciles: 15 L40S nodes procured, 13 live in Swan
  (52 cards), 2 diverted to the National Research Platform, plus 3 nodes × 2 H200. Unusually
  inclusive framing: "researchers across the disciplinary spectrum... business, architecture, the
  social sciences and more."
- **Maryland** — exact: 20 nodes × 4 A100 = 80, 8 nodes × 4 H100 = 32. All faculty get a free 50 KSU
  allocation, up to 550 by proposal. Note the GPU premium (48× A100, 144× H100) means 50 KSU buys
  ~347 H100-hours. Same cluster used to rule *out* University of Baltimore — the Carey School has the
  UMD directory ID that UBalt lacks.
- **Louisville** — frontier holds on **LARCC's 20 H100s, explicitly "ready for use"**; the DGX H200
  platform is separately "under development." The old row blurred the two.

### The pattern in this group

Three of six rows had a *correct number attached to a wrong or stale conclusion*. Hawaii's 148 GPUs,
ASU's 580+, Louisville's H200 — each traceable to a real source, each misleading about what a
researcher can use today. The check that works is not "is this number real?" but **"what is
operational right now, and who can run on it?"**

## Two external cross-checks picked up along the way

- The ABA Journal reports **15 law schools have no parent university.** This dataset has **13**
  standalone rows — so roughly two standalone schools are probably missing.
- There are **198 ABA-accredited law schools in 2026**, not the ~195 I had been estimating. The gap
  is therefore ~66 schools, and site copy has been corrected to 198.

---

## Everything from earlier passes (still standing)

### Tier changes (9 total)

| School | Was | Now | Why |
|---|---|---|---|
| Harvard Law | `older` | `frontier` | Cannon runs A100/H100/H200, dedicated `gpu_h200` and Kempner partitions. |
| Cornell Law | `older` | `frontier` | G2 documents `a100`/`h100`; Empire AI member. |
| Alabama | `construction` | `modern` | UA already runs two clusters; CHPC documents an A100 `gpu` QoS today. |
| Washburn | `none` | `cpuonly` | HiPACE exists but is CPU-only and dates to 2006–2009. |
| Arizona | `frontier` | `older` | H200s are on Lynx, not yet rolled out; Ocelote/El Gato decommissioned. |
| Hawai'i | `frontier` | `modern` | Fleet tops out at L40; the only H100s are preemptible condo nodes. |
| Creighton | `none` | `undetailed` | IT division explicitly offers HPC to faculty. |
| Chicago-Kent | `none` | `undetailed` | Ocient Computational Center is real CS-department infrastructure. |
| Western State | `standalone` | `none` | Schema fix — claimed no parent while naming Westcliff. |

### The structural gap

The original pass worked alphabetically by state and stopped after New York. Sixteen states had zero
entries. Ohio, Pennsylvania, Tennessee, Texas, Virginia and Washington were **never reached**.

### New schools added (11)

**Ohio (8)** via the Ohio Supercomputer Center — covers Ohio higher education "both public and
private," eligibility written at the level of institution and appointment, not discipline. Cardinal:
128 H100, Slurm. **Texas (1)** UT Austin via TACC. **Pennsylvania (2)** Penn State's two law schools.

### Access caveats — the recurring theme

- **Harvard** — frontier hardware, but FASRC lists the schools it serves as FAS, SEAS, HSPH, HBS,
  GSE. Law is not among them.
- **Capital University Law** — no resource of its own, but any Ohio faculty member qualifies for OSC.
- **Albany Law** — standalone, but its UAlbany affiliation funds joint faculty research and UAlbany
  runs 192 A100s. **Still the best single follow-up call in the dataset.**
- **Georgetown** — `unspecified` is correct for a documented reason: spec pages are behind NetID.

---

## Remaining work

**~66 schools missing.** Partially covered: Texas 3/10, Pennsylvania 2/9, Virginia 1/8, New York
9/15, Florida 9/10, South Carolina 1/2. Entirely missing: Delaware, North Carolina (6), North Dakota,
Oklahoma (3), Oregon (3), Puerto Rico (3), Rhode Island, South Dakota, Tennessee (5), Utah (2),
Washington (3), West Virginia, Wisconsin (2), Wyoming. Plus ~2 standalone schools implied by the ABA
Journal's count of 15.

**24 existing rows still unverified**, mostly `frontier`/`modern` claims in pre-"New York" states. A
stale `frontier` overclaims publicly in a way a wrong `none` does not. Highest-value: Arizona State
("580+ GPU accelerators"), Hawaii, New Mexico, Louisville, Nebraska, Washington University, Georgia,
Maryland, DePaul.

## Patterns worth reusing

1. **Find the statewide centre, then read its *eligibility* page.** Highest leverage available — OSC
   added eight frontier rows. But eligibility decides everything: MCSR (public-only), LONI (member
   list), USM/Zaratan (campus account), MGHPCC and Empire AI (closed consortia) all failed where OSC
   passed. Cite the eligibility page, never the specs page.
2. **Check central IT, not just the CS department.** Creighton's cluster sat on the DoIT site;
   Washburn's HiPACE on its own subdomain.
3. **Then read the specs page before scoring it.** HiPACE is called a "high-performance computing
   system" and is an eighteen-year-old CPU cluster. The name is not the finding.
4. **Check which *schools* an HPC centre says it serves.** Harvard's is frontier hardware Law may not
   be able to touch.
5. **Distinguish announced from operational** (Alabama) **and operational from maintained** (Washburn).
6. **Chase the affiliation lead, then test whether it reaches faculty.** Albany Law's UAlbany tie
   funds joint faculty research (real); California Western's SDSU tie and Southwestern's five
   partnerships are student programs (not). Identical from a distance.
7. **Watch for name collisions.** New York Law School ≠ NYU. Atlanta's John Marshall ≠ Chicago's.
   Southwestern Law School ≠ Southwestern University. One such confusion already put a false
   "closed 2020" into this dataset.
8. **A finding that applies to every row is a site-copy change, not a data change.**

## Schema suggestion

`tier` measures hardware and cannot express access, and the work keeps producing clean examples in
both directions. `caveat` is carrying that weight in prose. A structured `lawAccess` field —
`confirmed` / `institution-wide-policy` / `unconfirmed` / `excluded` / `national-only` — would make it
filterable and let the site answer what it exists to ask: not "who has H100s," but **"who can I
actually get an account on."**
