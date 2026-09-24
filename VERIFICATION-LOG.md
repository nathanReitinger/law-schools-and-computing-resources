# Re-verification log — September 2026

**138 schools listed of ~195–198 ABA-accredited. ALL 138 ROWS RE-VERIFIED with their own sources.
15 tier changes. 132 of 138 pass the full consistency audit; the 6 flags are single-source tier
claims, named below. An audit tool and a structured backlog of the 57 remaining schools both ship
with the repo.**
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

## Tier-claim verification — all 30 rows checked, 11 wrong

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

### Second batch (6 more)

**Missouri — `frontier` → `modern`.** This row conflated **three** separate systems. It named
*Nautilus*, which is not a University of Missouri machine at all — it's the National Research
Platform's national NSF cluster. It attributed H100s to Missouri; those sit in one node of **The Mill
at Missouri S&T in Rolla**, a different campus. MU Columbia's actual cluster is **Hellbender**: 17
nodes × 4 A100 80GB. That's `modern`. MU's own wiki warns that "due to differences in funding sources
for the resource, some of them have different access rules" — so cross-campus access to The Mill
can't be assumed, the same failure mode documented for UBalt and Zaratan.

**GWU — tier right, hardware string wrong.** The row was internally inconsistent: scored `frontier`
while listing only V100, which is `older` by this project's own table. It resolved in favour of the
tier — Pegasus now carries **NVIDIA Grace Hopper superchip nodes** and L40S. The V100 text described
the pre-expansion cluster. Caveat added: GW names its school-level HPC contributors as CCAS, SEAS,
Public Health and Medicine — Law isn't among them, though access language is university-wide.

**DePaul — frontier holds on hardware, but it's a School of Computing cluster** at
hpcc.cs.depaul.edu, not a central service. Same situation as Chicago-Kent. One unusually concrete
pathway recorded though: DePaul's **Cybersecurity Clinic is a standing collaboration between the
School of Computing, Driehaus Business, and the College of Law** — a better-evidenced route than most
affiliation leads in this project.

**Washington University — confirmed, plus a structural update.** 80+ A100/H100 on RCIF/CHPC. But
**Compute1 is being decommissioned (EOL 1 July 2027)** in favour of Compute2, and the scheduler
changed with it — LSF on Compute1, **Slurm on Compute2**. Work from Compute2 documentation.

**New Mexico and Georgia — exact.** UNM's Easley has precisely 36 L40S + 8 H100 and Hopper 37 A100,
matching CARC's infrastructure page and GitHub README independently; CARC is free of charge to all
UNM faculty, staff and students. UGA's Sapelo2 gained 12 quad-H100 nodes in a $2.4M 2024 investment,
215 GPUs total, Slurm on Rocky 9.5.

### Third batch (9 more)

**Indiana (both law schools) — `modern` → `frontier`. The first UNDERSTATEMENT in this group.** The
row stopped at Big Red 200's 256 A100s, which are real. But IU also runs a **Hopper GPU partition on
Quartz — 12 nodes × 4 H100**, explicitly for work that won't fit on the V100s or A100s. IU describes
Quartz and Research Desktop as *open to all students, faculty and staff*, "generally free to use,
unlimited access."

**Tulane — another conflation, same shape as Missouri's.** Tulane's own Cypress cluster has **no
NVIDIA GPUs at all** — its accelerators are Intel Xeon Phi 7120P coprocessors, and it dates to 2014.
The "960 NVIDIA Tesla K20x" in the row belongs to **LONI's Queen Bee 2**, not to any Tulane machine.
`modern` survives on different grounds: Tulane is a confirmed LONI member and LONI's Queen Bee 4
offers 10 four-GPU A100 nodes at no cost.

**American — exact.** Lovelace has one node with dual H100 80GB and six with quad L40, matching AU's
spec page verbatim. Best-stated access in the dataset: "Lovelace supports research projects in **all
academic units**." Its licensed stack (Stata MP, MATLAB Econometrics) suits empirical legal work
better than most clusters.

**Arkansas (both) — statewide claim genuine.** AHPCC is available to faculty at *all Arkansas public
universities*, free. Note the contrast with Mississippi's MCSR, also public-only: the difference is
simply that both Arkansas law schools sit at public universities.

**Rutgers (both) — confirmed.** New Clark phase adds 3× L40S nodes; free access across disciplines.
Camden faculty additionally get Amarel-C.

**New Hampshire — apparent inconsistency resolved.** The row looked wrong (K80, V100 — both `older`)
but the truncated remainder is **14 nodes × 1 A100**, which carries the tier. One H100 exists too;
kept at `modern` for consistency with the Hawai'i reasoning — one card in a buy-in cluster isn't a
frontier site.

### Fourth batch — and the direction of error flipped

The overclaims were front-loaded. Once past the `frontier` rows, the errors ran the *other* way:
three `modern` rows were understating current hardware, because each was written accurately and then
overtaken by an upgrade.

- **Minnesota — `modern` → `frontier`.** Agate's mid-cycle upgrade added 80 nodes of H100 and L40S.
  Confirmed operational rather than announced because MSI's pricing page quotes a live H100 rate
  (1 SU = 1.08 H100 GPU-hours). *Cross-reference logged:* MSI serves "other institutions of higher
  education in Minnesota" at $3/SU — a possible paid pathway for Mitchell Hamline and St. Thomas.
- **Colorado — `modern` → `frontier`.** Alpine now exposes `ah200`, `gh200` and `artxpro6000` as
  first-class Slurm partitions, plus 2 Grace-Hopper nodes. "All nodes are available to all users."
- **Indiana (×2) — `modern` → `frontier`** (above).
- **USC — confirmed `modern`.** 180+ GPUs, no Hopper. Carries the sharpest data restriction in the
  dataset: CARC does **not** support HIPAA, FERPA or CUI data at all.
- **Northeastern — re-sourced** after the audit flagged a 248-B200 claim resting on one source.
  *Cross-reference logged:* AICR is shared across **all six MGHPCC members**, so BU, Harvard, UMass
  and Yale may each have an AICR pathway none of their rows records.

### Final batch — the last six

**Southern Illinois — `modern` → `older`.** The third instance of the Missouri failure mode.
The modern tier rested on an **NVIDIA A6000 that sits in one professor's research lab** (Engineering
A0405C, permitted students only), not on the shared cluster. BigDawg's own documented GPUs are
2 NVIDIA K40 nodes. The access story is better than the tier though: SIU offers BigDawg **free**,
explicitly contrasting itself with institutions where HPC is "limited and often scheduled."

**Kansas — hardware retained, but access is the real finding.** KU's HPC docs state the rule
bluntly: *"You must be an owner of hardware in the KU Community Cluster or be sponsored by an owner
group within the cluster to gain access."* No free general tier at all — a materially higher barrier
than Nebraska, New Mexico, Indiana or Northeastern. CRC also doesn't publish a GPU inventory, so the
cards in this row remain provisional.

**Pepperdine — `cpuonly` confirmed with exact hardware.** Two Cisco blades, Xeon Gold 6238, 1TB RAM
each, 30TB storage. No GPU appears anywhere in the published description — which *confirms* the tier
rather than merely failing to contradict it.

**Chapman — exact.** 24 Tesla A100/V100 modules, word-for-word against Chapman's own page.

**Emory and Denver — confirmed.** Denver matters disproportionately: DU's RDAC is the worked example
in this site's own footer and in CONTRIBUTING.md, so an error there would propagate into every
contributor's mental model. It holds up.

### An unexpected finding: who can compute on regulated data

Three rows permit sensitive data where most forbid it — **Emory** (HyPER C3 is HIPAA-compliant),
**Chapman** (Azure SRE supporting NIST 800-171, CMMC, HIPAA and CUI) and **Michigan** (Armis2, the
secure PHI cluster). **USC is the explicit opposite**: CARC states it does *not* support HIPAA,
FERPA or CUI data at all, and Hawai'i bars sensitive data from standard storage.

For a law faculty member working with sealed records, client files or protected student data, that
distinction may matter more than the GPU generation — and it is not currently a filterable field.

### The pattern in this group

Three of six rows had a *correct number attached to a wrong or stale conclusion*. Hawaii's 148 GPUs,
ASU's 580+, Louisville's H200 — each traceable to a real source, each misleading about what a
researcher can use today. The check that works is not "is this number real?" but **"what is
operational right now, and who can run on it?"**


## Random-sample audit — and a tool that now ships with the repo

Ran a seeded random 30-row consistency check. It independently rediscovered **four of the six known
gaps** without being told about them, which is the main evidence it works.

It also found one real issue I'd introduced: **Northeastern carried a 248-B200 claim on a single
source.** Now backed by four Northeastern pages plus a training repo.

Six of the eleven initial flags were the tool's fault, not the data's, and fixing them shaped it:

- It flagged rows for "naming a Hopper part" when the prose said *"no Hopper-class hardware was
  found"* — negation now scrubbed before matching.
- It flagged accurate `legacy` labels (New Mexico's "Xena: K40 (legacy)") — dropped, since honest
  labelling is the desired behaviour.
- **Michigan** was flagged for naming a Blackwell part while scored `modern`. That is *correct as
  written*: CONTRIBUTING.md's tier table lists RTX PRO 6000 under `modern`, because it's a
  workstation part rather than a datacenter training GPU. **The tool now follows the project's own
  tier table rather than NVIDIA's architecture names**, and the row carries a note so nobody "fixes"
  it into a wrong upgrade later.
- Tier/hardware divergence is now satisfied by a `caveat` field, since that's exactly where a
  deliberate divergence gets explained (Berkeley's condo H200s, Arizona's unreleased Lynx).

Two caveats were added because the audit asked for them: **Berkeley** (Statistics department owns
8× H200 as condo nodes; the general FCA pool tops out at L40, so `modern` is the consistent call)
and **Louisville** (LARCC's 20 H100s are live; the DGX H200 platform is still "under development").

**Current state: 121 of 132 rows clean.** The 11 remaining flags are 10 single-source positive tier
claims and the 6 unverified rows — a precise, actionable backlog rather than a vague one.

```bash
python3 audit.py                          # every row
python3 audit.py --sample 30 --seed 42    # reproducible spot check
```

Exits non-zero when anything is flagged, so it can gate CI on pull requests.


## Filling the gap: 6 added, 57 enumerated

Six new rows this pass, then a deliberate stop.

**Oklahoma (3) — OneOCII, the second genuinely inclusive statewide programme found in this project
after Ohio's OSC.** It describes itself as a statewide *all-inclusive* collaboration whose stated aim
is to "serve every higher education institution in Oklahoma that has relevant curricula," and it has
reached 100+ institutions. Critically, the OneOCII-RAML grant abstract says the system supports
growing AI/ML use **beyond computer science disciplines**. That covers OU, Oklahoma City University
and Tulsa — including the two private schools, which is what MCSR's public-only rule would have
excluded. Scored `modern` on 28 confirmed A100s; the 10 H100 cards are *anticipated* grant-funded
hardware and deliberately **not** counted, per the Arizona lesson.

**North Carolina (2).** UNC's Longleaf is available "to researchers, students, faculty and staff
across the University," with Open OnDemand lowering the barrier for non-shell users. **Duke is
scored `undetailed` on purpose** — Duke plainly has GPUs, but this pass could not separate the
*shared* DCC complement from individual lab purchases, and this project has been bitten three times
by exactly that conflation (Missouri, Tulane, Southern Illinois). An honest "resource confirmed,
hardware unknown" beats an unverified `modern`.

**South Carolina (1) — and a name collision worth recording.** The "Hyperion" cluster that kept
surfacing in searches belongs to the University of South **Carolina**, not Southern California. Both
are "USC" with a research computing group. Given this dataset already contains USC Gould, that was a
live risk. Scored `older`: 44 GPU nodes of dual V100, with the operators' own paper noting the modest
GPU complement was meant as a *development* environment for work that then scales to national
resources.

### Why I stopped at six

Sixty-plus schools at this project's standard is not one session's work, and the failure mode is
known: an earlier pass in this project added bulk content across 40 rows and had to be reverted
because it made unresearched rows *look* verified. Rather than repeat that, the remaining schools
ship as **`TODO-missing-schools.csv`** — 57 rows, each naming the specific cluster or statewide
programme to check first, plus the trap to avoid. Examples:

- **University at Buffalo is the highest-priority missing school in the file.** UB *hosts* Empire AI
  Alpha (144 H100). Likely a frontier row.
- **Pittsburgh** sits alongside the Pittsburgh Supercomputing Center, an NSF ACCESS resource provider.
- **Wyoming** may have a path to Derecho via the NCAR-Wyoming Supercomputing Center.
- **George Mason's cluster is named Hopper** — do not confuse the name with the GPU architecture.
- **Widener has two law schools** (Delaware and Pennsylvania Commonwealth) under one parent; verify
  separately.
- **UNT Dallas, Texas A&M and South Dakota** all need the system-membership question asked explicitly,
  since that assumption failed for Missouri and the University of Baltimore.

138 + 57 = 195, which matches the ABA's approximate count.

## Two external cross-checks picked up along the way

- The ABA Journal reports **15 law schools have no parent university.** This dataset has **13**
  standalone rows — so roughly two standalone schools are probably missing.
- There are **198 ABA-accredited law schools in 2026**, not the ~195 I had been estimating. The gap
  is therefore ~66 schools, and site copy has been corrected to 198.

---

## Everything from earlier passes (still standing)

### Tier changes (15 total)

| School | Was | Now | Why |
|---|---|---|---|
| Harvard Law | `older` | `frontier` | Cannon runs A100/H100/H200, dedicated `gpu_h200` and Kempner partitions. |
| Cornell Law | `older` | `frontier` | G2 documents `a100`/`h100`; Empire AI member. |
| Alabama | `construction` | `modern` | UA already runs two clusters; CHPC documents an A100 `gpu` QoS today. |
| Washburn | `none` | `cpuonly` | HiPACE exists but is CPU-only and dates to 2006–2009. |
| Arizona | `frontier` | `older` | H200s are on Lynx, not yet rolled out; Ocelote/El Gato decommissioned. |
| Hawai'i | `frontier` | `modern` | Fleet tops out at L40; the only H100s are preemptible condo nodes. |
| Southern Illinois | `modern` | `older` | Tier rested on an A6000 in one professor's lab; BigDawg has 2 K40 nodes. |
| Minnesota | `modern` | `frontier` | Agate upgrade added 80 nodes of H100/L40S; live H100 pricing confirms. |
| Colorado | `modern` | `frontier` | Alpine has ah200/gh200 partitions and 2 Grace-Hopper nodes. |
| Missouri | `frontier` | `modern` | Row conflated Hellbender (A100), The Mill at S&T (H100), and NRP's Nautilus. |
| Indiana (×2) | `modern` | `frontier` | Quartz has a Hopper partition: 12 nodes × 4 H100. First understatement found. |
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

**No unverified rows remain.** Six rows still rest on a single source for a positive tier claim and
are the next thing to strengthen: UC Irvine, Denver, Iowa, Southern University, Maine, UMKC. Run
`python3 audit.py` to re-list them, mostly `frontier`/`modern` claims in pre-"New York" states. A
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
