/* =====================================================================
   Perpustakaan simulasi Studio Sains Cilik
   Diadaptasi dari Rescue Squad Quiz. Konten JSON hanya boleh memilih
   simulasi lewat "jenis" yang terdaftar di SIMS (lihat bagian bawah).
   Menambah simulasi baru = pekerjaan manusia, lalu tambahkan juga namanya
   ke daftar JENIS_SIMULASI di tools/validasi.mjs.
   ===================================================================== */
"use strict";

const SIM_TEXT = {
  id: {
    base: "Dasar", narrow: "Sempit", wide: "Lebar",
    bracing: "Penguat", noBraces: "Tanpa penguat", triBraces: "Penguat segitiga",
    heavy: "Bagian berat", atTop: "Di atas", atBottom: "Di bawah",
    strength: "Kekuatan guncangan", shakes: "Guncangan bertahan", result: "Hasil",
    startQuake: "Mulai gempa", reset: "Ulang", ready: "Siap", shaking: "Mengguncang…",
    fell: "Menaranya roboh!", stood: "Menaranya tetap berdiri!", seismo: "Seismograf",
    towerAria: "Menara di atas meja getar",
    mangrove: "Hutan mangrove", siren: "Sirene peringatan", off: "Mati", on: "Nyala",
    depth: "Kedalaman air di sini", speed: "Kecepatan gelombang", height: "Tinggi gelombang", village: "Desa",
    startUndersea: "Mulai gempa bawah laut", calm: "Tenang", coming: "Gelombang datang…",
    onLand: "Di darat", slowing: "Melambat",
    stopped: "Air berhenti sebelum desa", floodedSafe: "Banjir, tetapi semua aman di bukit", floodedDanger: "Banjir: warga dalam bahaya!",
    deepOcean: "Laut dalam", coast: "Pantai", hill: "Bukit", quake: "Gempa!",
    tsunamiAria: "Tsunami bergerak dari laut ke desa"
  },
  en: {
    base: "Base", narrow: "Narrow", wide: "Wide",
    bracing: "Bracing", noBraces: "No braces", triBraces: "Triangle braces",
    heavy: "Heavy part", atTop: "At the top", atBottom: "At the bottom",
    strength: "Shaking strength", shakes: "Shakes survived", result: "Result",
    startQuake: "Start the earthquake", reset: "Reset", ready: "Ready", shaking: "Shaking…",
    fell: "The tower fell!", stood: "The tower stood!", seismo: "Seismograph",
    towerAria: "A tower on a shake table",
    mangrove: "Mangrove forest", siren: "Warning siren", off: "Off", on: "On",
    depth: "Water depth here", speed: "Wave speed", height: "Wave height", village: "Village",
    startUndersea: "Start the undersea earthquake", calm: "Calm", coming: "Wave coming…",
    onLand: "On land", slowing: "Slowing",
    stopped: "Water stopped before the village", floodedSafe: "Flooded, but everyone is safe on the hill", floodedDanger: "Flooded: people in danger!",
    deepOcean: "Deep ocean", coast: "Coast", hill: "Hill", quake: "Earthquake!",
    tsunamiAria: "A tsunami crossing the ocean to a village"
  }
};
function st(k) { return (SIM_TEXT[typeof LANG !== "undefined" ? LANG : "id"] || SIM_TEXT.id)[k]; }
function numFmt(n) { return Math.round(n).toLocaleString(typeof LANG !== "undefined" && LANG === "en" ? "en-US" : "id-ID"); }

function cssv(n) { return getComputedStyle(document.documentElement).getPropertyValue("--" + n).trim(); }
function makeStage(parent, h) {
  const c = el("canvas", "stage"); c.setAttribute("role", "img"); parent.append(c);
  const ctx = c.getContext("2d"); const s = { cv: c, ctx, w: 300, h };
  s.fit = () => { s.w = Math.max(260, parent.clientWidth || 300); c.width = s.w * devicePixelRatio; c.height = h * devicePixelRatio; c.style.height = h + "px"; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); };
  s.fit(); return s;
}
function runLoop(fn) {
  let alive = true, lastT = performance.now();
  const f = (time) => { if (!alive) return; const dt = Math.min(0.05, (time - lastT) / 1000); lastT = time; fn(dt, time / 1000); requestAnimationFrame(f); };
  requestAnimationFrame(f); return () => { alive = false; };
}
function seg(parent, label, opts, value, onChange) {
  const wrap = el("div", "ctl"); wrap.append(el("span", "ctl-label", label));
  const row = el("div", "seg"); row.setAttribute("role", "group"); row.setAttribute("aria-label", label);
  opts.forEach(([v, txt]) => {
    const b = el("button", null, txt); b.type = "button"; b.setAttribute("aria-pressed", String(v === value));
    b.addEventListener("click", () => { row.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); onChange(v); });
    row.append(b);
  });
  wrap.append(row); parent.append(wrap); return wrap;
}
let sliderN = 0;
function slider(parent, label, min, max, stepV, value, fmt, onChange) {
  const id = "sl-" + (++sliderN);
  const wrap = el("div", "ctl"); const lab = el("label", "ctl-label"); lab.htmlFor = id;
  const val = el("b", null, fmt(value)); lab.append(document.createTextNode(label + ": "), val);
  const inp = el("input"); inp.type = "range"; inp.id = id; inp.min = min; inp.max = max; inp.step = stepV; inp.value = value;
  inp.addEventListener("input", () => { val.textContent = fmt(+inp.value); onChange(+inp.value); });
  wrap.append(lab, inp); parent.append(wrap); return wrap;
}
function readout(parent, items) {
  const r = el("div", "readout"); const map = {};
  items.forEach(([k, label]) => { const c = el("div", "stat"); const v = el("b", null, "–"); c.append(el("span", null, label), v); r.append(c); map[k] = v; });
  parent.append(r); return map;
}
function simButtons(parent, list) {
  const row = el("div", "actions sim-actions");
  const out = list.map(([txt, cls, fn]) => { const b = el("button", "btn " + cls, txt); b.type = "button"; b.addEventListener("click", fn); row.append(b); return b; });
  parent.append(row); return out;
}

/* ---------- 1. meja getar / shake table ---------- */
function simShake(box) {
  const s = { base: "narrow", brace: "none", heavy: "top", power: 6, running: false, t: 0, fell: false, angle: 0, shakes: 0, trace: [], result: "" };
  const ctl = el("div", "sim-controls"); box.append(ctl);
  seg(ctl, st("base"), [["narrow", st("narrow")], ["wide", st("wide")]], s.base, (v) => { s.base = v; reset(); });
  seg(ctl, st("bracing"), [["none", st("noBraces")], ["tri", st("triBraces")]], s.brace, (v) => { s.brace = v; reset(); });
  seg(ctl, st("heavy"), [["top", st("atTop")], ["bottom", st("atBottom")]], s.heavy, (v) => { s.heavy = v; reset(); });
  slider(ctl, st("strength"), 1, 10, 1, s.power, (v) => v + " / 10", (v) => { s.power = v; reset(); });
  const stage = makeStage(box, 300); stage.cv.setAttribute("aria-label", st("towerAria"));
  const ro = readout(box, [["shakes", st("shakes")], ["result", st("result")]]);
  simButtons(box, [[st("startQuake"), "btn-go", () => { reset(); s.running = true; }], [st("reset"), "btn-ghost", reset]]);
  function calc() {
    const k = s.brace === "tri" ? 2.5 : 1, wf = s.heavy === "top" ? 1.6 : 1, half = s.base === "wide" ? 40 : 18;
    const A = s.power * 4 * wf / k, thr = half * 1.2;
    return { A, half, fallAt: A > thr ? Math.max(2, Math.round(20 * thr / A)) : null };
  }
  function reset() { Object.assign(s, { running: false, t: 0, fell: false, angle: 0, shakes: 0, trace: [], result: "" }); ro.shakes.textContent = "0 / 20"; ro.result.textContent = st("ready"); }
  reset();
  return runLoop((dt) => {
    const { A, half, fallAt } = calc();
    if (s.running) {
      s.t += dt; s.shakes = Math.min(20, Math.floor(s.t / 0.4));
      if (fallAt && s.shakes >= fallAt && !s.fell) { s.fell = true; s.result = st("fell"); sound("bad"); }
      if (s.t >= 8) { s.running = false; if (!s.fell) { s.result = st("stood"); sound("good"); burst(); } }
      ro.shakes.textContent = (s.fell ? fallAt : s.shakes) + " / 20"; ro.result.textContent = s.result || st("shaking");
    }
    if (s.fell) s.angle = Math.min(1.15, s.angle + dt * (0.6 + s.angle * 2.5));
    const g = s.running ? s.power * 1.6 * Math.sin(s.t * Math.PI * 5) : 0;
    s.trace.push(g); if (s.trace.length > stage.w) s.trace.shift();
    const { ctx, w, h } = stage; ctx.clearRect(0, 0, w, h);
    const groundY = h - 80, cx = w / 2;
    ctx.fillStyle = cssv("line"); ctx.fillRect(0, groundY + 14, w, 4);
    ctx.fillStyle = cssv("muted"); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(cx - 80 + i * 40 + g, groundY + 9, 5, 0, 7); ctx.fill(); }
    ctx.fillStyle = cssv("ink"); ctx.fillRect(cx - 110 + g, groundY, 220, 5);
    const floors = 6, fh = 30, sway = s.running && !s.fell ? A * Math.sin(s.t * Math.PI * 5 - 0.7) : (s.fell ? A : 0);
    ctx.save(); ctx.translate(cx + g, groundY);
    if (s.fell) { ctx.translate(half, 0); ctx.rotate(s.angle); ctx.translate(-half, 0); }
    for (let i = 0; i < floors; i++) {
      const o0 = sway * (i / floors) ** 1.3, o1 = sway * ((i + 1) / floors) ** 1.3, y0 = -i * fh, y1 = -(i + 1) * fh;
      ctx.beginPath(); ctx.moveTo(-half + o0, y0); ctx.lineTo(half + o0, y0); ctx.lineTo(half + o1, y1); ctx.lineTo(-half + o1, y1); ctx.closePath();
      ctx.fillStyle = cssv("surface"); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = cssv("orange"); ctx.stroke();
      if (s.brace === "tri") { ctx.lineWidth = 2; ctx.strokeStyle = cssv("blue"); ctx.beginPath(); ctx.moveTo(-half + o0, y0); ctx.lineTo(half + o1, y1); ctx.moveTo(half + o0, y0); ctx.lineTo(-half + o1, y1); ctx.stroke(); }
      if ((s.heavy === "top" && i === floors - 1) || (s.heavy === "bottom" && i === 0)) { ctx.fillStyle = cssv("ink"); ctx.fillRect(-half * 0.6 + (o0 + o1) / 2, y0 - fh * 0.75, half * 1.2, fh * 0.5); }
    }
    ctx.restore();
    const sy = h - 32; ctx.strokeStyle = cssv("line"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(w, sy); ctx.stroke();
    ctx.strokeStyle = cssv("red"); ctx.lineWidth = 1.5; ctx.beginPath();
    s.trace.forEach((v, i) => { const x = w - s.trace.length + i; i ? ctx.lineTo(x, sy - v) : ctx.moveTo(x, sy - v); }); ctx.stroke();
    ctx.fillStyle = cssv("muted"); ctx.font = "12px " + cssv("body"); ctx.fillText(st("seismo"), 8, h - 8);
  });
}

/* ---------- 2. tsunami ---------- */
function simTsunami(box) {
  const s = { running: false, x: 0, mangrove: false, warning: false, t: 0, landX: null, result: "", people: [] };
  const ctl = el("div", "sim-controls"); box.append(ctl);
  seg(ctl, st("mangrove"), [[false, st("off")], [true, st("on")]], false, (v) => { s.mangrove = v; reset(); });
  seg(ctl, st("siren"), [[false, st("off")], [true, st("on")]], false, (v) => { s.warning = v; reset(); });
  const stage = makeStage(box, 280); stage.cv.setAttribute("aria-label", st("tsunamiAria"));
  const ro = readout(box, [["depth", st("depth")], ["speed", st("speed")], ["height", st("height")], ["result", st("village")]]);
  simButtons(box, [[st("startUndersea"), "btn-go", () => { reset(); s.running = true; }], [st("reset"), "btn-ghost", reset]]);
  const geo = () => { const w = stage.w; return { w, shore: w * 0.7, village: w * 0.79, hill: w * 0.94, sea: 100, deep: 150 }; };
  function depthFrac(x) { const G = geo(); if (x >= G.shore) return 0; if (x < G.w * 0.38) return 1; return 1 - (x - G.w * 0.38) / (G.shore - G.w * 0.38); }
  function meters(f) { return Math.max(5, 5000 * f ** 3); }
  function reset() {
    const G = geo();
    Object.assign(s, { running: false, x: G.w * 0.12, t: 0, landX: null, result: "", people: [0, 1, 2].map((i) => ({ x: G.village + i * 8 - 8, safe: false })) });
    ro.depth.textContent = numFmt(5000) + " m"; ro.speed.textContent = "–"; ro.height.textContent = "–"; ro.result.textContent = st("calm");
  }
  reset();
  return runLoop((dt) => {
    const G = geo(); const { ctx, w, h } = stage;
    let H = 0;
    if (s.running) {
      s.t += dt;
      if (s.landX == null) {
        const f = depthFrac(s.x), d = meters(f);
        s.x += (30 + 130 * Math.sqrt(f)) * dt;
        H = 1.5 * (5000 / d) ** 0.25;
        ro.depth.textContent = numFmt(d) + " m";
        ro.speed.textContent = numFmt(Math.sqrt(9.8 * d) * 3.6) + " km/" + (LANG === "en" ? "h" : "jam");
        ro.height.textContent = H.toFixed(1) + " m";
        ro.result.textContent = st("coming");
        if (s.x >= G.shore) { s.landX = G.shore; s.Hshore = 1.5 * (5000 / 5) ** 0.25 * (s.mangrove ? 0.55 : 1); }
      } else {
        const reach = G.shore + (G.hill - G.shore) * (s.mangrove ? 0.52 : 0.8);
        s.landX = Math.min(reach, s.landX + 45 * dt);
        H = s.Hshore;
        ro.depth.textContent = st("onLand"); ro.speed.textContent = st("slowing");
        ro.height.textContent = s.Hshore.toFixed(1) + " m";
        if (s.landX >= reach && !s.result) {
          const flooded = reach >= G.village - 4;
          const safe = s.people.every((p) => p.safe);
          s.result = !flooded ? st("stopped") : safe ? st("floodedSafe") : st("floodedDanger");
          ro.result.textContent = s.result; sound(!flooded || safe ? "good" : "bad"); if (!flooded || safe) burst();
          s.running = false;
        }
      }
      if (s.warning) s.people.forEach((p) => { if (p.x < G.hill - 10) p.x += 26 * dt; else p.safe = true; });
    }
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = cssv("blue"); ctx.globalAlpha = 0.18; ctx.fillRect(0, G.sea, G.shore, h - G.sea); ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 4) {
      let y;
      if (x < G.shore) y = G.sea + 8 + G.deep * depthFrac(x);
      else if (x < G.hill - 30) y = G.sea - (x - G.shore) * 0.15;
      else y = G.sea - (G.hill - 30 - G.shore) * 0.15 - (x - (G.hill - 30)) * 1.4;
      ctx.lineTo(x, Math.max(18, y));
    }
    ctx.lineTo(w, h); ctx.closePath(); ctx.fillStyle = cssv("line"); ctx.fill();
    ctx.fillStyle = cssv("muted"); ctx.font = "12px " + cssv("body");
    ctx.fillText(st("deepOcean"), 8, h - 10); ctx.fillText(st("coast"), G.shore - 30, G.sea + 24); ctx.fillText(st("hill"), G.hill - 22, 14);
    if (s.mangrove) { ctx.fillStyle = cssv("teal"); for (let i = 0; i < 5; i++) { const x = G.shore + 6 + i * 7; ctx.beginPath(); ctx.arc(x, G.sea - 12 - (x - G.shore) * 0.15, 6, 0, 7); ctx.fill(); } }
    for (let i = 0; i < 2; i++) { const x = G.village + i * 18 - 10, y = G.sea - (x - G.shore) * 0.15; ctx.fillStyle = cssv("orange"); ctx.fillRect(x, y - 14, 14, 12); ctx.beginPath(); ctx.moveTo(x - 2, y - 14); ctx.lineTo(x + 7, y - 22); ctx.lineTo(x + 16, y - 14); ctx.fill(); }
    s.people.forEach((p) => { const xx = Math.min(p.x, G.hill - 10); const yy = xx < G.hill - 30 ? G.sea - (xx - G.shore) * 0.15 : G.sea - (G.hill - 30 - G.shore) * 0.15 - (xx - (G.hill - 30)) * 1.4; ctx.fillStyle = cssv("ink"); ctx.beginPath(); ctx.arc(xx, Math.max(20, yy) - 8, 3.5, 0, 7); ctx.fill(); ctx.fillRect(xx - 1.5, Math.max(20, yy) - 5, 3, 6); });
    ctx.strokeStyle = cssv("blue"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, G.sea);
    const wx = s.landX != null ? s.landX : s.x, amp = 4 + H * 4.5;
    for (let x = 0; x <= (s.landX != null ? s.landX : G.shore); x += 3) {
      const bump = (s.running || s.landX != null || s.t > 0) ? amp * Math.exp(-(((x - wx) / (s.landX != null ? 40 : 28)) ** 2)) : 0;
      ctx.lineTo(x, G.sea - bump - (s.landX != null && x > G.shore ? (x - G.shore) * 0.15 - 2 : 0));
    }
    ctx.stroke();
    if (s.landX != null) { ctx.fillStyle = cssv("blue"); ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.moveTo(G.shore, G.sea); for (let x = G.shore; x <= s.landX; x += 3) ctx.lineTo(x, G.sea - (x - G.shore) * 0.15 - 6); ctx.lineTo(s.landX, G.sea - (s.landX - G.shore) * 0.15); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; }
    if (s.running && s.t < 0.8) { ctx.fillStyle = cssv("red"); ctx.font = "bold 13px " + cssv("body"); ctx.fillText(st("quake"), w * 0.08, G.sea + G.deep + 2); }
  });
}

/* Daftar resmi simulasi. Nama di sini = nilai "pelajaran.simulasi.jenis" di konten JSON. */
const SIMS = { shake: simShake, tsunami: simTsunami };
