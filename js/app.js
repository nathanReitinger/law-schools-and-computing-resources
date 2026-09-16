(function () {
  "use strict";

  var TIER_META = {
    frontier:      { label: "Frontier (H100/H200/B200)",     cls: "tier-frontier",    rank: 0 },
    modern:        { label: "Modern (A100/A40/L40)",         cls: "tier-modern",      rank: 1 },
    older:         { label: "Older-gen (V100/T4/P100)",      cls: "tier-older",       rank: 2 },
    unspecified:   { label: "GPU present, model unnamed",    cls: "tier-unspecified", rank: 3 },
    undetailed:    { label: "HPC exists, GPU unconfirmed",   cls: "tier-undetailed",  rank: 4 },
    cpuonly:       { label: "No GPU (CPU/RAM only)",         cls: "tier-cpuonly",     rank: 5 },
    construction:  { label: "Under construction",            cls: "tier-construction",rank: 6 },
    none:          { label: "No HPC resource found",         cls: "tier-none",        rank: 7 },
    standalone:    { label: "N/A — standalone school",       cls: "tier-standalone",  rank: 8 }
  };

  var state = {
    all: [],
    q: "",
    stateFilter: "",
    tierFilter: "",
    networkFilter: "",
    expanded: null
  };

  var els = {};

  function $(id) { return document.getElementById(id); }

  function escapeHtml(s) {
    if (!s) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function tierMeta(slug) {
    return TIER_META[slug] || TIER_META.undetailed;
  }

  function uniqueSorted(arr) {
    return Array.from(new Set(arr)).sort(function (a, b) { return a.localeCompare(b); });
  }

  function buildFilterOptions() {
    var states = uniqueSorted(state.all.map(function (s) { return s.state; }));
    states.forEach(function (st) {
      var opt = document.createElement("option");
      opt.value = st; opt.textContent = st;
      els.filterState.appendChild(opt);
    });

    var tierOrder = Object.keys(TIER_META).sort(function (a, b) {
      return TIER_META[a].rank - TIER_META[b].rank;
    });
    tierOrder.forEach(function (slug) {
      var count = state.all.filter(function (s) { return s.tier === slug; }).length;
      if (!count) return;
      var opt = document.createElement("option");
      opt.value = slug; opt.textContent = TIER_META[slug].label + " (" + count + ")";
      els.filterTier.appendChild(opt);
    });

    var nets = uniqueSorted(
      state.all.reduce(function (acc, s) { return acc.concat(s.networks || []); }, [])
    );
    nets.forEach(function (n) {
      var opt = document.createElement("option");
      opt.value = n; opt.textContent = n;
      els.filterNetwork.appendChild(opt);
    });
  }

  function renderStats() {
    var total = state.all.length;
    var real = state.all.filter(function (s) { return !s.standalone; }).length;
    var frontier = state.all.filter(function (s) { return s.tier === "frontier"; }).length;
    var withGpu = state.all.filter(function (s) {
      return ["frontier", "modern", "older", "unspecified"].indexOf(s.tier) > -1;
    }).length;
    var states = uniqueSorted(state.all.map(function (s) { return s.state; })).length;

    els.stats.innerHTML =
      stat(total, "schools tracked") +
      stat(states, "states / territories") +
      stat(withGpu, "with confirmed GPU access") +
      stat(frontier, "on H100/H200/B200-class hardware") +
      stat(real, "with a parent university to check");

    els.masthead.textContent = total + " schools · " + states + " states · community-editable";
  }

  function stat(num, label) {
    return '<div class="stat"><span class="num">' + num + '</span><span class="label">' + label + "</span></div>";
  }

  function matches(s) {
    if (state.stateFilter && s.state !== state.stateFilter) return false;
    if (state.tierFilter && s.tier !== state.tierFilter) return false;
    if (state.networkFilter && (s.networks || []).indexOf(state.networkFilter) === -1) return false;
    if (state.q) {
      var hay = (s.school + " " + s.university + " " + (s.networks || []).join(" ") + " " + s.hpcName)
        .toLowerCase();
      if (hay.indexOf(state.q.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function render() {
    var filtered = state.all.filter(matches);

    els.resultCount.textContent = filtered.length === state.all.length
      ? "Showing all " + filtered.length + " schools"
      : "Showing " + filtered.length + " of " + state.all.length + " schools";

    els.rows.innerHTML = "";
    els.empty.hidden = filtered.length !== 0;

    filtered.forEach(function (s, i) {
      var tm = tierMeta(s.tier);
      var tr = document.createElement("tr");
      tr.tabIndex = 0;
      tr.setAttribute("role", "button");
      tr.setAttribute("aria-expanded", state.expanded === s._id ? "true" : "false");

      tr.innerHTML =
        '<td class="col-state" data-label="State">' + escapeHtml(s.state) + "</td>" +
        '<td class="col-school" data-label="School">' + escapeHtml(s.school) + "</td>" +
        '<td class="col-univ" data-label="University">' + (escapeHtml(s.university) || "—") + "</td>" +
        '<td class="col-tier" data-label="GPU tier"><span class="tier-chip ' + tm.cls + '"><i class="tier-dot"></i>' + tm.label + "</span></td>" +
        '<td class="col-gpu" data-label="Hardware">' + (escapeHtml(truncate(s.gpu, 46)) || "—") + "</td>" +
        '<td class="col-slurm" data-label="SLURM">' + (escapeHtml(truncate(s.slurm, 18)) || "—") + "</td>";

      tr.addEventListener("click", function () { toggleExpand(s._id); });
      tr.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleExpand(s._id); }
      });

      els.rows.appendChild(tr);

      if (state.expanded === s._id) {
        els.rows.appendChild(detailRow(s));
      }
    });
  }

  function truncate(str, n) {
    if (!str) return "";
    return str.length > n ? str.slice(0, n - 1) + "…" : str;
  }

  function detailRow(s) {
    var tr = document.createElement("tr");
    tr.className = "detail-row";
    var netHtml = (s.networks && s.networks.length)
      ? s.networks.map(function (n) { return '<span class="network-tag">' + escapeHtml(n) + "</span>"; }).join("")
      : "<span style=\"color:var(--ink-faint)\">none identified</span>";

    var td = document.createElement("td");
    td.colSpan = 6;
    td.innerHTML =
      '<div class="detail-grid">' +
        block("HPC / research-computing resource", s.hpcName || "—") +
        block("Full hardware detail", s.gpu || "Not confirmed") +
        block("SLURM confirmation", s.slurm || "Not confirmed") +
        block("Other specs", s.specs || "—") +
        block("Access notes", s.notes || "—") +
        (s.caveat ? '<div class="detail-block caveat-block"><div class="k">Caveat</div><div class="v">' + escapeHtml(s.caveat) + "</div></div>" : "") +
        '<div class="detail-block"><div class="k">Shared networks</div><div class="v">' + netHtml + "</div></div>" +
        (s.link ? '<div class="detail-block"><div class="k">Source link</div><div class="v"><a href="' + escapeHtml(s.link) + '" target="_blank" rel="noopener">' + escapeHtml(s.link) + "</a></div></div>" : "") +
      "</div>";
    tr.appendChild(td);
    return tr;
  }

  function block(label, value) {
    return '<div class="detail-block"><div class="k">' + escapeHtml(label) + '</div><div class="v">' + escapeHtml(value) + "</div></div>";
  }

  function toggleExpand(id) {
    state.expanded = state.expanded === id ? null : id;
    render();
  }

  function resetFilters() {
    state.q = ""; state.stateFilter = ""; state.tierFilter = ""; state.networkFilter = "";
    els.q.value = ""; els.filterState.value = ""; els.filterTier.value = ""; els.filterNetwork.value = "";
    render();
  }

  function init(data) {
    state.all = data.map(function (s, i) { s._id = i; return s; });

    els.q = $("q");
    els.filterState = $("filter-state");
    els.filterTier = $("filter-tier");
    els.filterNetwork = $("filter-network");
    els.resetBtn = $("reset-filters");
    els.rows = $("rows");
    els.resultCount = $("result-count");
    els.empty = $("empty-state");
    els.stats = $("stats-row");
    els.masthead = $("masthead-meta");

    buildFilterOptions();
    renderStats();
    render();

    els.q.addEventListener("input", function (e) { state.q = e.target.value; render(); });
    els.filterState.addEventListener("change", function (e) { state.stateFilter = e.target.value; render(); });
    els.filterTier.addEventListener("change", function (e) { state.tierFilter = e.target.value; render(); });
    els.filterNetwork.addEventListener("change", function (e) { state.networkFilter = e.target.value; render(); });
    els.resetBtn.addEventListener("click", resetFilters);
  }

  fetch("data/schools.json")
    .then(function (r) { return r.json(); })
    .then(init)
    .catch(function (err) {
      document.getElementById("rows").innerHTML =
        '<tr><td colspan="6" style="padding:24px;color:var(--tier-frontier)">' +
        "Could not load data/schools.json (" + escapeHtml(err.message) + "). " +
        "If you're previewing this locally, serve the folder with a local server " +
        "(e.g. <code>python3 -m http.server</code>) rather than opening index.html directly — " +
        "browsers block file:// fetches. GitHub Pages doesn't have this problem." +
        "</td></tr>";
    });
})();
