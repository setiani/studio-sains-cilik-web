/* =====================================================================
   Studio Sains Cilik Web — mesin situs
   Berbasis Rescue Squad Quiz. Konten TIDAK ditulis di file ini:
   semua pelajaran dan soal dibaca dari konten/*.json yang dibuat tim agen
   dan disetujui manusia. File ini hanya diubah oleh manusia.
   ===================================================================== */
"use strict";

/* ---------- teks antarmuka / UI text ---------- */
const UI = {
  id: {
    eyebrow: "Sains siaga bencana · Kelas 4–6",
    heroText: "Pelajari sainsnya dengan simulasi interaktif, lalu uji dirimu dengan kuis. Main sendiri atau berdua tim di satu layar.",
    loadErrTitle: "Konten belum bisa dimuat",
    loadErrFile: "Halaman ini dibuka langsung dari file. Buka lewat server web (misalnya hosting atau `python -m http.server`) agar konten bisa dimuat.",
    loadErrOther: "Konten tidak bisa dimuat: ",
    learnTitle: "Belajar dulu",
    learnNote: "Setiap pelajaran berisi ide kunci, simulasi untuk dicoba, dan kuis singkat di akhir.",
    lessonN: (i, n) => "Pelajaran " + i + " dari " + n,
    lessonCard: (i) => "Pelajaran " + i,
    simLabel: "Simulasi: ",
    playLabel: "Main di layar ini",
    whoPlays: "Siapa yang main?",
    soloTitle: "Main sendiri", soloText: "Satu pemain menjawab semua soal.",
    teamsTitle: "Dua tim", teamsText: "Bergantian. Kalau satu tim salah, tim lain boleh merebut soalnya.",
    team1: "Nama tim 1", team2: "Nama tim 2", team1Default: "Tim Oranye", team2Default: "Tim Biru",
    pickMission: "Pilih misi", options: "Pilihan",
    quickTitle: "Ronde cepat", quickText: "Main 10 soal acak, bukan semua soal misi.",
    timerTitle: "Penghitung waktu", timerText: "25 detik per soal. Jawaban cepat dapat poin bonus.",
    soundTitle: "Efek suara", soundText: "Bunyi pendek untuk jawaban benar dan salah.",
    startMission: "Mulai misi",
    scoringTitle: "Cara menghitung skor",
    scoring: ["<b>100 poin</b> untuk setiap jawaban benar, ditambah hingga <b>50 poin kecepatan</b> jika penghitung waktu menyala.",
      "<b>Bonus beruntun:</b> setiap 3 jawaban benar berturut-turut menambah <b>50 poin</b>.",
      "<b>Bantuan 50:50:</b> menghapus dua jawaban salah, sekali per permainan.",
      "<b>Dua tim:</b> jika satu tim salah, tim lain boleh merebut soal untuk <b>50 poin</b>.",
      "Tombol 1–4 atau A–D untuk memilih jawaban."],
    footer: "Konten dibuat oleh tim agen Studio Sains Cilik, diperiksa terhadap buku aturan, dan disetujui manusia sebelum terbit.",
    missionN: (i, name) => "Misi " + i + ": " + name,
    mixed: "Tantangan campuran", mixedBlurb: "Soal acak dari semua misi",
    all: "Maraton", allBlurb: "Semua soal dari semua misi",
    review: "Latihan soal yang salah",
    nQuestions: (n) => n + " soal", best: "Skor terbaik: ",
    keyIdeas: "Ide kunci", safetyTitle: "Keselamatan", tryThis: "Coba ini",
    quizMe: (name, n) => "Kuis " + name + " (" + n + " soal)", nextLesson: "Pelajaran berikutnya: ",
    backMenu: "Kembali ke menu",
    qCount: (i, n) => "Soal " + i + " dari " + n,
    soundOn: "Suara nyala", soundOff: "Suara mati", endGame: "Akhiri permainan",
    endConfirm: "Akhiri permainan ini dan lihat hasilnya?", keepPlaying: "Lanjut main",
    rescuedOf: (s, n) => "Warga terselamatkan: " + s + " dari " + n,
    turn: (n) => "Giliran " + n, pickBest: "Pilih jawaban terbaik.",
    fifty: "Pakai 50:50", fiftyUsed: "50:50 sudah dipakai",
    rescued: "Terselamatkan!", rescuedBy: (n) => n + " menyelamatkan mereka!", inARow: (n) => n + " berturut-turut! +50",
    notThisTime: "Belum kali ini", stoleIt: (n) => n + " berhasil merebut!", nobody: "Tidak ada yang menyelamatkan soal ini",
    stealPrompt: (n) => n + ", rebut soalnya! Pilih jawaban yang benar untuk 50 poin.",
    stealTimeUp: (n) => "Waktu habis! " + n + ", rebut untuk 50 poin.",
    answering: (n) => n + " sedang menjawab.",
    timeUp: "Waktu habis!", timeUpNobody: "Waktu habis! Tidak ada yang menyelamatkan soal ini",
    answer: "Jawaban: ", source: "Sumber: ",
    nextQ: "Soal berikutnya", seeReport: "Lihat laporan misi",
    you: "Kamu",
    yourAnswer: "Jawabanmu: ", ranOut: "waktu habis", correct: "Benar: ", stolenBy: (n) => " (direbut " + n + ")",
    report: " · laporan", tie: "Seri!", wins: (n) => n + " menang!",
    hero: "Pahlawan penyelamat!", great: "Kerja penyelamatan yang hebat!", good: "Usaha bagus, penyelamat!", keep: "Terus berlatih, penyelamat!",
    savedSub: (s, n) => "Warga terselamatkan: " + s + " dari " + n + " soal yang dimainkan.",
    rightAnswers: (n) => n + " jawaban benar", rescuedN: (n) => n + " diselamatkan", streak: (n) => " · beruntun " + n,
    noAnswers: "Belum ada soal yang dijawab.", allRight: "Semua soal benar pada percobaan pertama. Hebat!",
    byMission: "Benar pada percobaan pertama, per misi", toReview: "Soal untuk diulang",
    playAgain: "Main lagi", practiceMissed: "Latihan soal yang salah"
  },
  en: {
    eyebrow: "Disaster-ready science · Grades 4–6",
    heroText: "Learn the science with interactive simulations, then test yourself with a quiz. Play alone or as two teams on one screen.",
    loadErrTitle: "Content could not be loaded",
    loadErrFile: "This page was opened straight from a file. Open it through a web server (for example your hosting or `python -m http.server`) so the content can load.",
    loadErrOther: "Content could not be loaded: ",
    learnTitle: "Learn first",
    learnNote: "Each lesson has the key ideas, a simulation to try, and a short quiz at the end.",
    lessonN: (i, n) => "Lesson " + i + " of " + n,
    lessonCard: (i) => "Lesson " + i,
    simLabel: "Simulation: ",
    playLabel: "Play on this screen",
    whoPlays: "Who is playing?",
    soloTitle: "Solo player", soloText: "One player answers every question.",
    teamsTitle: "Two teams", teamsText: "Take turns. Miss one and the other team can steal it.",
    team1: "Team 1 name", team2: "Team 2 name", team1Default: "Team Orange", team2Default: "Team Blue",
    pickMission: "Pick a mission", options: "Options",
    quickTitle: "Quick round", quickText: "Play 10 random questions instead of the full mission.",
    timerTitle: "Countdown timer", timerText: "25 seconds per question. Faster answers earn bonus points.",
    soundTitle: "Sound effects", soundText: "Short beeps for right and wrong answers.",
    startMission: "Start the mission",
    scoringTitle: "How scoring works",
    scoring: ["<b>100 points</b> for each right answer, plus up to <b>50 speed points</b> with the timer on.",
      "<b>Streak bonus:</b> every 3 right answers in a row adds <b>50 points</b>.",
      "<b>50:50 lifeline:</b> removes two wrong answers, once per game.",
      "<b>Two teams:</b> if a team misses, the other team can steal it for <b>50 points</b>.",
      "Keys 1–4 or A–D pick an answer."],
    footer: "Content is made by the Studio Sains Cilik agent team, checked against a rulebook, and approved by a person before it is published.",
    missionN: (i, name) => "Mission " + i + ": " + name,
    mixed: "Mixed challenge", mixedBlurb: "Random questions from every mission",
    all: "Marathon", allBlurb: "Every question in every mission",
    review: "Practice missed questions",
    nQuestions: (n) => n + " questions", best: "Best score: ",
    keyIdeas: "Key ideas", safetyTitle: "Safety", tryThis: "Try this",
    quizMe: (name, n) => "Quiz me on " + name + " (" + n + " questions)", nextLesson: "Next lesson: ",
    backMenu: "Back to menu",
    qCount: (i, n) => "Question " + i + " of " + n,
    soundOn: "Sound on", soundOff: "Sound off", endGame: "End game",
    endConfirm: "End this game and see the results?", keepPlaying: "Keep playing",
    rescuedOf: (s, n) => "Villagers rescued: " + s + " of " + n,
    turn: (n) => n + "'s turn", pickBest: "Pick the best answer.",
    fifty: "Use 50:50", fiftyUsed: "50:50 used",
    rescued: "Rescued!", rescuedBy: (n) => n + " rescued them!", inARow: (n) => n + " in a row! +50",
    notThisTime: "Not this time", stoleIt: (n) => n + " stole it!", nobody: "Nobody rescued this one",
    stealPrompt: (n) => n + ", steal it! Pick the right answer for 50 points.",
    stealTimeUp: (n) => "Time's up! " + n + ", steal it for 50 points.",
    answering: (n) => n + " is answering now.",
    timeUp: "Time's up!", timeUpNobody: "Time's up! Nobody rescued this one",
    answer: "Answer: ", source: "Source: ",
    nextQ: "Next question", seeReport: "See the mission report",
    you: "You",
    yourAnswer: "Your answer: ", ranOut: "time ran out", correct: "Correct: ", stolenBy: (n) => " (stolen by " + n + ")",
    report: " · report", tie: "It's a tie!", wins: (n) => n + " wins!",
    hero: "Rescue hero!", great: "Great rescue work!", good: "Good effort, rescuer!", keep: "Keep training, rescuer!",
    savedSub: (s, n) => "Villagers rescued: " + s + " of " + n + " questions played.",
    rightAnswers: (n) => n + " right answers", rescuedN: (n) => n + " rescued", streak: (n) => " · streak " + n,
    noAnswers: "No questions answered yet.", allRight: "Every question was right on the first try. Amazing!",
    byMission: "Right on the first try, by mission", toReview: "Questions to review",
    playAgain: "Play again", practiceMissed: "Practice missed questions"
  }
};

/* ---------- utilitas ---------- */
const $ = (s) => document.querySelector(s);
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
let LANG = store.get("ssc-lang") === "en" ? "en" : "id";
function t(key, ...args) { const v = UI[LANG][key]; return typeof v === "function" ? v(...args) : v; }
/* Teks konten selalu objek {id, en}. textContent dipakai di mana-mana, jadi isi konten tidak pernah dijalankan sebagai HTML. */
function tx(o) { return o ? (o[LANG] || o.id || "") : ""; }
function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
function shuffle(arr, rnd) { rnd = rnd || Math.random; const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function seeded(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let r = Math.imul(a ^ (a >>> 15), 1 | a); r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r; return ((r ^ (r >>> 14)) >>> 0) / 4294967296; }; }
const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const LET = ["A", "B", "C", "D"];
const ANSWER_TIME = 25, STEAL_TIME = 15;

/* ---------- data ---------- */
let TOPICS = [];   // [{id, judul, ringkas, pelajaran, kuis, id_run, versi_draf}]
let ALL = [];      // semua soal

async function loadContent() {
  const idx = await (await fetch("konten/index.json", { cache: "no-cache" })).json();
  const list = [];
  for (const item of idx.topik || []) {
    try {
      const res = await fetch("konten/" + item.file, { cache: "no-cache" });
      if (!res.ok) throw new Error(item.file + " " + res.status);
      const d = await res.json();
      if (d && d.id && Array.isArray(d.kuis)) list.push(d);
    } catch (e) { console.warn("Lewati topik", item, e); }
  }
  TOPICS = list;
  ALL = TOPICS.flatMap((m) => m.kuis.map((q, i) => ({ key: m.id + "-" + i, missionId: m.id, q })));
}

function missionName(id) { const m = TOPICS.find((x) => x.id === id); return m ? tx(m.judul) : ""; }
function missionLabel(id) {
  if (id === "mixed") return t("mixed");
  if (id === "all") return t("all");
  if (id === "review") return t("review");
  return missionName(id);
}
/* Opsi diacak sebagai indeks, jadi urutan sama di kedua bahasa dan bahasa bisa diganti kapan saja. */
function buildList(missionId, quick, rnd, onlyKeys) {
  rnd = rnd || Math.random;
  let pick;
  if (missionId === "review") pick = shuffle(ALL.filter((x) => (onlyKeys || []).includes(x.key)), rnd);
  else if (missionId === "mixed") pick = shuffle(ALL, rnd).slice(0, quick ? 10 : 20);
  else if (missionId === "all") pick = TOPICS.flatMap((m) => shuffle(ALL.filter((x) => x.missionId === m.id), rnd));
  else { pick = shuffle(ALL.filter((x) => x.missionId === missionId), rnd); if (quick) pick = pick.slice(0, 10); }
  return pick.map((x) => ({ ...x, order: shuffle([0, 1, 2, 3], rnd) }));
}
function optText(q, k) { return tx(q.q.pilihan[q.order[k]]); }
function optOk(q, k) { return q.order[k] === q.q.benar; }
function rightText(q) { return tx(q.q.pilihan[q.q.benar]); }

function missionOptions() {
  const o = TOPICS.map((m, i) => ({ id: m.id, title: t("missionN", i + 1, tx(m.judul)), blurb: tx(m.ringkas), n: m.kuis.length }));
  if (TOPICS.length > 1) {
    o.push({ id: "mixed", title: t("mixed"), blurb: t("mixedBlurb"), n: Math.min(20, ALL.length) });
    o.push({ id: "all", title: t("all"), blurb: t("allBlurb"), n: ALL.length });
  }
  return o;
}
const SCREENS = ["setup", "play", "end", "learn"];
function show(id) { SCREENS.forEach((s) => ($("#" + s).hidden = s !== id)); window.scrollTo(0, 0); }

/* ---------- bahasa / language ---------- */
function applyStatic() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-t]").forEach((n) => { n.textContent = t(n.dataset.t); });
  document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === LANG)));
  const rules = $("#scoring-rules"); rules.textContent = "";
  t("scoring").forEach((h) => { const li = document.createElement("li"); li.innerHTML = h; rules.append(li); }); // teks tetap milik situs, bukan konten
  ["name0", "name1"].forEach((id, k) => { const inp = $("#" + id); const defs = [UI.id, UI.en].map((d) => d[k ? "team2Default" : "team1Default"]); if (!inp.value || defs.includes(inp.value)) inp.value = t(k ? "team2Default" : "team1Default"); });
  syncSoundBtn();
}
function setLang(l) {
  LANG = l; store.set("ssc-lang", l); applyStatic();
  renderMissionChoices(); renderLessonCards();
  if (!$("#learn").hidden && lessonId) openLesson(lessonId);
  if (!$("#play").hidden && S) refreshPlayText();
  if (!$("#end").hidden && S) finish(true);
}
document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

/* =====================================================================
   PERMAINAN SATU LAYAR / ONE-SCREEN GAME
   ===================================================================== */
const cfg = { mode: "solo", mission: null };
let S = null, last = null;

function renderMissionChoices() {
  const box = $("#missions"); box.textContent = "";
  const quick = $("#opt-quick").checked;
  if (!cfg.mission && TOPICS[0]) cfg.mission = TOPICS[0].id;
  for (const o of missionOptions()) {
    const b = el("button", "choice"); b.dataset.mission = o.id; b.id = "mission-" + o.id;
    b.setAttribute("aria-pressed", String(cfg.mission === o.id));
    const n = o.id === "all" ? o.n : quick ? Math.min(10, o.n) : o.n;
    b.append(el("strong", null, o.title), el("span", null, o.blurb + " · " + t("nQuestions", n)));
    const best = store.get("ssc-best-" + o.id + (quick && o.id !== "all" ? "-q" : ""));
    if (best) b.append(el("span", "best", t("best") + best));
    b.addEventListener("click", () => { cfg.mission = o.id; renderMissionChoices(); });
    box.append(b);
  }
  $("#start").disabled = !TOPICS.length;
}
$("#opt-quick").addEventListener("change", renderMissionChoices);
document.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => {
  cfg.mode = b.dataset.mode;
  document.querySelectorAll("[data-mode]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  $("#names").hidden = cfg.mode !== "teams";
}));
$("#start").addEventListener("click", () => {
  if (!cfg.mission) return;
  unlockAudio();
  const quick = $("#opt-quick").checked && cfg.mission !== "all";
  startGame(buildList(cfg.mission, quick), cfg.mission, quick);
});

function startGame(list, missionId, quick) {
  if (!list.length) return;
  last = { keys: list.map((x) => x.key), missionId, quick };
  const teams = cfg.mode === "teams" ? [($("#name0").value.trim() || t("team1Default")), ($("#name1").value.trim() || t("team2Default"))] : [null];
  S = { mode: cfg.mode, missionId, quick, timer: $("#opt-timer").checked,
    teams: teams.map((n) => ({ name: n, score: 0, streak: 0, right: 0, fifty: true })),
    qs: list, i: 0, phase: "answer", results: [], wrongK: null, fb: null };
  soundOn = $("#opt-sound").checked; syncSoundBtn();
  show("play"); renderQ();
}
function teamName(tm) { return tm.name || t("you"); }
function turnIdx() { return S.mode === "teams" ? S.i % 2 : 0; }
function actingIdx() { return S.phase === "steal" ? 1 - turnIdx() : turnIdx(); }

function renderScores() {
  const box = $("#scores"); box.textContent = "";
  S.teams.forEach((tm, k) => {
    const c = el("div", "team t" + k + (S.phase !== "reveal" && actingIdx() === k ? " active" : ""));
    const left = el("div"); left.append(el("div", "tname", teamName(tm)), el("div", "tsub", t("rescuedN", tm.right) + (tm.streak >= 2 ? t("streak", tm.streak) : "")));
    c.append(left, el("span", "num tscore", String(tm.score)));
    box.append(c);
  });
}
function renderRoute() {
  const r = $("#route"); r.textContent = "";
  let saved = 0;
  S.qs.forEach((q, k) => {
    const res = S.results[k]; const dot = el("i");
    if (res) { if (res.ok) { dot.className = "ok"; saved++; } else if (res.stolen) { dot.className = "stolen"; saved++; } else dot.className = "miss"; }
    else if (k === S.i) dot.className = "now";
    r.append(dot);
  });
  $("#route-label").textContent = t("rescuedOf", saved, S.qs.length);
}
function renderQ() {
  S.phase = "answer"; S.wrongK = null; S.fb = null;
  $("#steal").hidden = true; $("#feedback").hidden = true; $("#confirm").hidden = true;
  const box = $("#answers"); box.textContent = "";
  for (let k = 0; k < 4; k++) {
    const b = el("button", "ans"); b.id = "ans-" + k;
    b.append(el("span", "chip", LET[k]), el("span", "txt"));
    b.addEventListener("click", () => choose(k));
    box.append(b);
  }
  refreshPlayText();
  renderScores(); renderRoute(); renderFifty();
  startTimer(ANSWER_TIME);
}
/* Menulis ulang semua teks layar main dalam bahasa aktif tanpa mengubah keadaan permainan. */
function refreshPlayText() {
  const q = S.qs[S.i];
  $("#q-count").textContent = t("qCount", S.i + 1, S.qs.length);
  $("#q-mission").textContent = missionLabel(S.missionId);
  $("#q-topic").textContent = missionName(q.missionId);
  $("#q-text").textContent = tx(q.q.tanya);
  buttons().forEach((b, k) => { b.querySelector(".txt").textContent = optText(q, k); });
  const turn = $("#turn");
  if (S.mode === "teams") { turn.hidden = false; turn.className = "turn t" + turnIdx(); turn.textContent = t("turn", teamName(S.teams[turnIdx()])); }
  else turn.hidden = true;
  if (S.phase === "answer") $("#helper-note").textContent = t("pickBest");
  if (S.phase === "steal") { paintSteal(); }
  if (S.phase === "reveal" && S.fb) paintFeedback();
  renderScores(); renderRoute(); renderFifty();
}
function renderFifty() {
  const tm = S.teams[actingIdx()]; const b = $("#btn-fifty");
  b.disabled = !tm.fifty || S.phase === "reveal";
  b.textContent = tm.fifty ? t("fifty") : t("fiftyUsed");
}
function buttons() { return Array.from(document.querySelectorAll("#answers .ans")); }

function choose(k) {
  if (S.phase !== "answer" && S.phase !== "steal") return;
  const btn = buttons()[k]; if (!btn || btn.disabled) return;
  const q = S.qs[S.i]; const remaining = stopTimer();
  const right = optOk(q, k);
  if (S.phase === "answer") {
    const tm = S.teams[turnIdx()];
    if (right) {
      tm.streak++; tm.right++;
      const speed = S.timer ? Math.round(50 * remaining / ANSWER_TIME) : 0;
      const streakBonus = tm.streak % 3 === 0 ? 50 : 0;
      const pts = 100 + speed + streakBonus; tm.score += pts;
      S.results[S.i] = { ok: true, stolen: false, pick: k };
      sound("good"); burst();
      reveal("good", tm.name ? ["rescuedBy", tm.name] : ["rescued"], "+" + pts, streakBonus ? ["inARow", tm.streak] : null);
    } else {
      tm.streak = 0; btn.classList.add("wrong"); btn.disabled = true; S.wrongK = k;
      sound("bad");
      if (S.mode === "teams") startSteal(); else { S.results[S.i] = { ok: false, stolen: false, pick: k }; reveal("bad", ["notThisTime"], "+0", null); }
    }
  } else {
    const o = S.teams[1 - turnIdx()];
    if (right) {
      o.score += 50; o.right++;
      S.results[S.i] = { ok: false, stolen: true, pick: S.wrongK, stealer: teamName(o) };
      sound("good"); burst();
      reveal("steal-ok", ["stoleIt", teamName(o)], "+50", null);
    } else {
      btn.classList.add("wrong"); btn.disabled = true; sound("bad");
      S.results[S.i] = { ok: false, stolen: false, pick: S.wrongK };
      reveal("bad", ["nobody"], "+0", null);
    }
  }
}
function paintSteal() {
  const o = S.teams[1 - turnIdx()];
  const s = $("#steal"); s.hidden = false;
  s.textContent = S.wrongK != null ? t("stealPrompt", teamName(o)) : t("stealTimeUp", teamName(o));
  $("#helper-note").textContent = t("answering", teamName(o));
}
function startSteal() {
  S.phase = "steal"; paintSteal();
  renderScores(); renderFifty();
  startTimer(STEAL_TIME);
}
function timeout() {
  if (!S) return;
  if (S.phase === "answer") {
    S.teams[turnIdx()].streak = 0; sound("bad");
    if (S.mode === "teams") { S.wrongK = null; startSteal(); }
    else { S.results[S.i] = { ok: false, stolen: false, pick: null }; reveal("bad", ["timeUp"], "+0", null); }
  } else if (S.phase === "steal") {
    sound("bad"); S.results[S.i] = { ok: false, stolen: false, pick: S.wrongK };
    reveal("bad", ["timeUpNobody"], "+0", null);
  }
}
function explainInto(node, q) {
  node.textContent = "";
  node.append(el("b", null, t("answer") + rightText(q)), document.createTextNode(tx(q.q.bahas)));
  if (q.q.fakta && q.q.fakta.length) { const f = el("span", "facts"); f.append(el("span", null, t("source"))); q.q.fakta.forEach((id) => f.append(el("span", "fact", id))); node.append(el("br"), f); }
}
function paintFeedback() {
  const q = S.qs[S.i], fb = S.fb;
  const box = $("#feedback"); box.hidden = false; box.className = "feedback " + fb.kind;
  $("#fb-title").textContent = t(...fb.title);
  $("#fb-pts").textContent = fb.pts;
  const bd = $("#fb-badge"); bd.hidden = !fb.badge; bd.textContent = fb.badge ? t(...fb.badge) : "";
  explainInto($("#fb-explain"), q);
  $("#btn-next").textContent = S.i + 1 < S.qs.length ? t("nextQ") : t("seeReport");
  $("#helper-note").textContent = "";
}
function reveal(kind, title, pts, badge) {
  S.phase = "reveal"; stopTimer();
  const q = S.qs[S.i];
  buttons().forEach((b, k) => {
    b.disabled = true;
    if (optOk(q, k)) b.classList.add("right");
    else if (!b.classList.contains("wrong")) b.classList.add("dim");
  });
  $("#steal").hidden = true;
  S.fb = { kind, title, pts, badge };
  paintFeedback();
  renderScores(); renderRoute(); renderFifty();
  $("#btn-next").focus({ preventScroll: true });
  $("#feedback").scrollIntoView({ block: "nearest", behavior: reduceMotion() ? "auto" : "smooth" });
}
$("#btn-next").addEventListener("click", () => { if (S.i + 1 < S.qs.length) { S.i++; renderQ(); window.scrollTo(0, 0); } else finish(); });
$("#btn-fifty").addEventListener("click", () => {
  if (S.phase !== "answer" && S.phase !== "steal") return;
  const tm = S.teams[actingIdx()]; if (!tm.fifty) return;
  const q = S.qs[S.i];
  const wrong = buttons().map((b, k) => ({ b, k })).filter(({ b, k }) => !optOk(q, k) && !b.disabled);
  shuffle(wrong).slice(0, Math.max(0, wrong.length - 1)).slice(0, 2).forEach(({ b }) => { b.disabled = true; b.classList.add("gone"); });
  tm.fifty = false; renderFifty();
});

/* timer */
let tId = null, tEnd = 0, tLen = 0;
function startTimer(sec) {
  stopTimer();
  $("#timer-row").hidden = !S.timer;
  if (!S.timer) return;
  tLen = sec; tEnd = performance.now() + sec * 1000;
  tick(); tId = setInterval(tick, 100);
}
function tick() {
  const left = Math.max(0, (tEnd - performance.now()) / 1000);
  $("#timer-fill").style.transform = "scaleX(" + Math.max(0, left / tLen) + ")";
  $("#timer").classList.toggle("low", left <= 5);
  $("#timer-num").textContent = String(Math.ceil(left));
  if (left <= 0) { stopTimer(); timeout(); }
}
function stopTimer() {
  if (tId) { clearInterval(tId); tId = null; }
  return S && S.timer ? Math.max(0, (tEnd - performance.now()) / 1000) : 0;
}

$("#btn-quit").addEventListener("click", () => { $("#confirm").hidden = false; });
$("#quit-no").addEventListener("click", () => { $("#confirm").hidden = true; });
$("#quit-yes").addEventListener("click", () => finish());

function reviewInto(box, items, emptyText) {
  box.textContent = "";
  if (!items.length) { box.append(el("p", "allright", emptyText)); return; }
  items.forEach(({ q, pick, extra }) => {
    const m = el("div", "miss");
    m.append(el("div", "q", tx(q.q.tanya)));
    m.append(el("div", "yours", t("yourAnswer") + (pick != null ? optText(q, pick) : t("ranOut"))));
    m.append(el("div", "correct", t("correct") + rightText(q) + (extra || "")));
    m.append(el("div", "why", tx(q.q.bahas)));
    box.append(m);
  });
}
function finish(rerender) {
  stopTimer();
  const played = S.results.filter(Boolean).length;
  const missed = [];
  $("#end-mission").textContent = missionLabel(S.missionId) + t("report");
  if (S.mode === "teams") {
    const [a, b] = S.teams;
    $("#end-title").textContent = a.score === b.score ? t("tie") : t("wins", teamName(a.score > b.score ? a : b));
  } else {
    const pct = played ? Math.round(100 * S.teams[0].right / played) : 0;
    $("#end-title").textContent = pct >= 90 ? t("hero") : pct >= 70 ? t("great") : pct >= 50 ? t("good") : t("keep");
    if (!rerender && S.missionId !== "review" && played === S.qs.length) {
      const k = "ssc-best-" + S.missionId + (S.quick ? "-q" : ""); const prev = store.get(k) || 0;
      if (S.teams[0].score > prev) store.set(k, S.teams[0].score);
    }
  }
  const saved = S.results.filter((r) => r && (r.ok || r.stolen)).length;
  $("#end-sub").textContent = t("savedSub", saved, played);
  const fin = $("#final"); fin.textContent = "";
  S.teams.forEach((tm, k) => {
    const c = el("div", "team t" + k);
    c.append(el("span", "tname", teamName(tm)), el("span", "num tscore", String(tm.score)), el("span", "tsub", t("rightAnswers", tm.right)));
    fin.append(c);
  });
  const bars = $("#bars"); bars.textContent = "";
  const by = {};
  S.qs.forEach((q, k) => { const r = S.results[k]; if (!r) return; const name = missionName(q.missionId); (by[name] ||= { n: 0, ok: 0 }); by[name].n++; if (r.ok) by[name].ok++; else missed.push({ q, pick: r.pick, extra: r.stolen ? t("stolenBy", r.stealer) : "" }); });
  Object.entries(by).forEach(([name, v]) => {
    const row = el("div", "bar-row");
    const tr = el("div", "track"); const f = el("div"); f.style.width = (100 * v.ok / v.n) + "%"; tr.append(f);
    row.append(el("span", null, name), el("span", "num", v.ok + " / " + v.n), tr);
    bars.append(row);
  });
  if (!Object.keys(by).length) bars.append(el("p", "empty", t("noAnswers")));
  reviewInto($("#review"), missed, played ? t("allRight") : t("noAnswers"));
  $("#practice").hidden = !missed.length;
  $("#practice").dataset.keys = JSON.stringify(missed.map((x) => x.q.key));
  show("end");
  if (!rerender && played && missed.length < played / 2) burst(true);
}
$("#again").addEventListener("click", () => startGame(buildList(last.missionId, last.quick, null, last.keys), last.missionId, last.quick));
$("#practice").addEventListener("click", () => { const keys = JSON.parse($("#practice").dataset.keys || "[]"); if (keys.length) startGame(buildList("review", false, null, keys), "review", false); });
$("#menu").addEventListener("click", () => { renderMissionChoices(); show("setup"); });

document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
  const map = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
  const k = map[e.key.toLowerCase()];
  if (k == null) return;
  if (!$("#play").hidden && S && (S.phase === "answer" || S.phase === "steal")) { e.preventDefault(); choose(k); }
});

/* =====================================================================
   SUARA + KONFETI / SOUND + CONFETTI
   ===================================================================== */
let actx = null, soundOn = true;
function unlockAudio() { try { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === "suspended") actx.resume(); } catch (e) { actx = null; } }
function sound(kind) {
  if (!soundOn || !actx) return;
  const notes = kind === "good" ? [523, 659, 784] : [220, 175];
  notes.forEach((f, i) => {
    const o = actx.createOscillator(), g = actx.createGain(), t0 = actx.currentTime + i * 0.11;
    o.type = kind === "good" ? "triangle" : "square"; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
    o.connect(g).connect(actx.destination); o.start(t0); o.stop(t0 + 0.2);
  });
}
function syncSoundBtn() { const b = $("#btn-sound"); b.textContent = soundOn ? t("soundOn") : t("soundOff"); b.setAttribute("aria-pressed", String(soundOn)); }
$("#btn-sound").addEventListener("click", () => { unlockAudio(); soundOn = !soundOn; syncSoundBtn(); });

const cv = $("#confetti"), cctx = cv.getContext("2d");
let parts = [], raf = null;
function burst(big) {
  if (reduceMotion()) return;
  const cs = getComputedStyle(document.documentElement);
  const cols = ["--orange", "--blue", "--teal", "--yellow"].map((v) => cs.getPropertyValue(v).trim());
  cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio;
  const n = big ? 160 : 60;
  for (let i = 0; i < n; i++) parts.push({
    x: innerWidth * (big ? Math.random() : 0.5), y: big ? -20 : innerHeight * 0.45,
    vx: (Math.random() - 0.5) * (big ? 4 : 12), vy: big ? Math.random() * 3 + 2 : -Math.random() * 10 - 4,
    s: Math.random() * 6 + 5, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, c: cols[i % cols.length], life: big ? 220 : 90
  });
  if (!raf) raf = requestAnimationFrame(step);
}
function step() {
  cctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  cctx.clearRect(0, 0, innerWidth, innerHeight);
  parts.forEach((p) => { p.vy += 0.3; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life--;
    cctx.save(); cctx.translate(p.x, p.y); cctx.rotate(p.r); cctx.fillStyle = p.c; cctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); cctx.restore(); });
  parts = parts.filter((p) => p.life > 0 && p.y < innerHeight + 40);
  if (parts.length) raf = requestAnimationFrame(step); else { raf = null; cctx.clearRect(0, 0, innerWidth, innerHeight); }
}

/* =====================================================================
   PELAJARAN + SIMULASI / LESSONS + SIMULATIONS
   ===================================================================== */
let simStop = null, lessonId = null;
function renderLessonCards() {
  const box = $("#lessons"); box.textContent = "";
  TOPICS.forEach((m, i) => {
    const L = m.pelajaran; if (!L) return;
    const b = el("button", "choice lesson-card"); b.id = "lesson-" + m.id; b.type = "button";
    const simName = SIMS[L.simulasi.jenis] ? tx(L.simulasi.judul) : "–";
    b.append(el("span", "eyebrow", t("lessonCard", i + 1) + " · " + tx(m.judul)), el("strong", null, tx(L.judul)), el("span", null, t("simLabel") + simName));
    b.addEventListener("click", () => openLesson(m.id));
    box.append(b);
  });
}
function factChips(ids) { const f = el("span", "facts"); (ids || []).forEach((id) => f.append(el("span", "fact", id))); return f; }
function openLesson(id) {
  if (simStop) { simStop(); simStop = null; }
  lessonId = id; unlockAudio();
  const idx = TOPICS.findIndex((m) => m.id === id), m = TOPICS[idx], L = m.pelajaran;
  $("#l-eyebrow").textContent = t("lessonN", idx + 1, TOPICS.length);
  $("#l-title").textContent = tx(L.judul);
  const ideas = $("#l-ideas"); ideas.textContent = "";
  L.ide.forEach((it) => { const li = el("li"); li.append(el("strong", null, tx(it.judul)), el("span", null, tx(it.isi)), factChips(it.fakta)); ideas.append(li); });
  $("#l-sim-title").textContent = tx(L.simulasi.judul); $("#l-sim-intro").textContent = tx(L.simulasi.pengantar);
  const safe = $("#l-safety"); safe.textContent = "";
  (L.keselamatan || []).forEach((s) => safe.append(el("li", null, tx(s))));
  $("#l-safety-card").hidden = !(L.keselamatan || []).length;
  const tries = $("#l-tries"); tries.textContent = ""; (L.coba || []).forEach((s) => tries.append(el("li", null, tx(s))));
  $("#l-quiz").textContent = t("quizMe", tx(m.judul), Math.min(10, m.kuis.length));
  const next = TOPICS[idx + 1]; $("#l-next").hidden = !next; if (next) $("#l-next").textContent = t("nextLesson") + tx(next.pelajaran.judul);
  $("#l-prov").textContent = ""; $("#l-prov").append(provNode(m));
  show("learn");
  const box = $("#l-sim"); box.textContent = "";
  const sim = SIMS[L.simulasi.jenis];
  simStop = sim ? sim(box) : null;
}
function provNode(m) {
  // Bangun teks asal-usul tanpa innerHTML agar id_run dari JSON tidak pernah menjadi HTML.
  const p = el("span");
  const parts = LANG === "id" ? ["Asal konten: run ", m.id_run, ", draf versi " + m.versi_draf + ". Label kecil di setiap ide adalah ID fakta dari materi sumber."]
    : ["Content source: run ", m.id_run, ", draft version " + m.versi_draf + ". The small tags on each idea are fact IDs from the source material."];
  p.append(document.createTextNode(parts[0]), el("b", null, String(parts[1] || "-")), document.createTextNode(parts[2]));
  return p;
}
function closeLesson() { if (simStop) { simStop(); simStop = null; } }
$("#l-back").addEventListener("click", () => { closeLesson(); show("setup"); });
$("#l-quiz").addEventListener("click", () => { closeLesson(); unlockAudio(); startGame(buildList(lessonId, true), lessonId, true); });
$("#l-next").addEventListener("click", () => { const i = TOPICS.findIndex((m) => m.id === lessonId); if (TOPICS[i + 1]) openLesson(TOPICS[i + 1].id); });
let lastW = innerWidth;
window.addEventListener("resize", () => { if (innerWidth === lastW) return; lastW = innerWidth; if (!$("#learn").hidden && lessonId) openLesson(lessonId); });

/* ---------- mulai / boot ---------- */
(async function boot() {
  applyStatic();
  try { await loadContent(); }
  catch (e) {
    $("#load-error").hidden = false;
    $("#load-error-text").textContent = location.protocol === "file:" ? t("loadErrFile") : t("loadErrOther") + e.message;
  }
  renderMissionChoices();
  renderLessonCards();
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register("sw.js").catch(() => {});
})();
