#!/usr/bin/env node
/* =====================================================================
   Validator konten Studio Sains Cilik Web (tanpa dependensi)

   Pemakaian (dari folder repo web):
     node tools/validasi.mjs                         -> periksa index.json + semua topik
     node tools/validasi.mjs konten/gempa.json       -> periksa satu file
     node tools/validasi.mjs --sumber ../01-sumber   -> juga cocokkan ID fakta dengan materi sumber
     node tools/validasi.mjs --draf ../08-draf/RUN/web-v2.json --sumber ../01-sumber
                                                     -> periksa draf sebelum terbit (nama file bebas)

   Kode keluar 0 = LULUS, 1 = GAGAL. Push hanya boleh dilakukan jika LULUS.
   ===================================================================== */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname, basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const JENIS_SIMULASI = ["shake", "tsunami"];          // harus sama dengan SIMS di assets/sims.js
const POLA_FAKTA = /^[A-Z][A-Z0-9]*-\d{2}$/;           // contoh: G-04, V-11
const POLA_ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const LARANGAN = [
  [/[<>]/, "tanda < atau > (tidak boleh ada HTML)"],
  [/https?:\/\/|www\./i, "tautan/URL"],
  [/javascript:|data:|on\w+\s*=/i, "kode atau atribut skrip"],
  [/\{\{|\}\}|\$\{/, "template/placeholder"]
];
const BATAS = { pendek: 120, sedang: 300, panjang: 400 };

const args = process.argv.slice(2);
let sumberDir = null, draf = false; const files = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--sumber") sumberDir = resolve(args[++i] || "");
  else if (args[i] === "--draf") draf = true;
  else files.push(resolve(args[i]));
}

const errors = [], warns = [];
const err = (f, m) => errors.push(`${f}: ${m}`);
const warn = (f, m) => warns.push(`${f}: ${m}`);

/* ID fakta yang ada di materi sumber */
let FAKTA_SUMBER = null;
if (sumberDir) {
  if (!existsSync(sumberDir)) { console.error("Folder sumber tidak ditemukan: " + sumberDir); process.exit(1); }
  FAKTA_SUMBER = new Set();
  for (const f of readdirSync(sumberDir)) {
    if (!/^topik-.*\.md$/.test(f)) continue;   // hanya file topik resmi, bukan catatan lama atau file uji
    const txt = readFileSync(join(sumberDir, f), "utf8");
    for (const m of txt.matchAll(/^\|\s*([A-Z][A-Z0-9]*-\d{2})\s*\|/gm)) FAKTA_SUMBER.add(m[1]);
  }
}

function readJson(path, label) {
  try { return JSON.parse(readFileSync(path, "utf8").replace(/^﻿/, "")); }
  catch (e) { err(label, "bukan JSON yang valid (" + e.message + ")"); return null; }
}
/* Angka di versi ID dan EN harus sama (BAHASA-01). Pemisah ribuan/desimal diabaikan. */
function numbers(s) { return (s.replace(/(\d)[.,](?=\d)/g, "$1").match(/(?<![A-Za-z\d])\d+(?![A-Za-z\d])/g) || []).sort().join(","); }

function teks(f, path, o, max, wajib = true) {
  if (o == null) { if (wajib) err(f, path + " wajib ada"); return; }
  if (typeof o !== "object" || Array.isArray(o)) { err(f, path + " harus berupa objek {\"id\": ..., \"en\": ...}"); return; }
  for (const k of Object.keys(o)) if (k !== "id" && k !== "en") err(f, path + " punya kunci tidak dikenal \"" + k + "\"");
  for (const lang of ["id", "en"]) {
    const v = o[lang];
    if (typeof v !== "string" || !v.trim()) { err(f, `${path}.${lang} wajib diisi`); continue; }
    if (v.length > max) err(f, `${path}.${lang} terlalu panjang (${v.length} > ${max} karakter)`);
    for (const [re, why] of LARANGAN) if (re.test(v)) err(f, `${path}.${lang} memuat ${why}`);
  }
  if (typeof o.id === "string" && typeof o.en === "string" && numbers(o.id) !== numbers(o.en))
    err(f, `${path}: angka di versi ID dan EN berbeda (ID: ${numbers(o.id) || "-"} / EN: ${numbers(o.en) || "-"})`);
}
function fakta(f, path, arr, used) {
  if (!Array.isArray(arr) || !arr.length) { err(f, path + " wajib berisi minimal 1 ID fakta"); return; }
  for (const id of arr) {
    if (typeof id !== "string" || !POLA_FAKTA.test(id)) { err(f, `${path}: "${id}" bukan format ID fakta (contoh G-04)`); continue; }
    if (FAKTA_SUMBER && !FAKTA_SUMBER.has(id)) err(f, `${path}: ID fakta ${id} tidak ada di materi sumber`);
    used.add(id);
  }
}
function arr(f, path, a, min, max) {
  if (!Array.isArray(a)) { err(f, path + " harus berupa daftar"); return false; }
  if (a.length < min || a.length > max) err(f, `${path} harus berisi ${min}–${max} item (sekarang ${a.length})`);
  return true;
}

function cekTopik(path) {
  const f = basename(path);
  const d = readJson(path, f); if (!d) return null;
  const used = new Set();
  const izin = ["skema", "id", "id_run", "versi_draf", "kelas", "judul", "ringkas", "pelajaran", "kuis", "sumber"];
  for (const k of Object.keys(d)) if (!izin.includes(k)) err(f, `kunci tidak dikenal "${k}"`);
  if (d.skema !== 1) err(f, "skema harus 1");
  if (typeof d.id !== "string" || !POLA_ID.test(d.id)) err(f, "id harus huruf kecil/angka/tanda hubung, misalnya \"gunung-api-pantai\"");
  else if (!draf && f !== d.id + ".json") err(f, `nama file harus ${d.id}.json`);
  if (typeof d.id_run !== "string" || !/^[A-Za-z0-9-]{3,60}$/.test(d.id_run)) err(f, "id_run wajib diisi (contoh 20261022-1930-gempa)");
  if (!Number.isInteger(d.versi_draf) || d.versi_draf < 1) err(f, "versi_draf harus bilangan bulat ≥ 1");
  if (d.kelas !== "4-6" && !/^[1-6](-[1-6])?$/.test(String(d.kelas))) err(f, "kelas tidak valid (contoh \"4-6\" atau \"5\")");
  teks(f, "judul", d.judul, 60);
  teks(f, "ringkas", d.ringkas, BATAS.pendek);

  const L = d.pelajaran;
  if (!L || typeof L !== "object") err(f, "pelajaran wajib ada");
  else {
    teks(f, "pelajaran.judul", L.judul, 80);
    if (arr(f, "pelajaran.ide", L.ide, 3, 6)) L.ide.forEach((it, i) => {
      teks(f, `pelajaran.ide[${i}].judul`, it.judul, 60);
      teks(f, `pelajaran.ide[${i}].isi`, it.isi, BATAS.sedang);
      fakta(f, `pelajaran.ide[${i}].fakta`, it.fakta, used);
    });
    const sm = L.simulasi || {};
    if (!JENIS_SIMULASI.includes(sm.jenis)) err(f, `pelajaran.simulasi.jenis harus salah satu dari: ${JENIS_SIMULASI.join(", ")}`);
    teks(f, "pelajaran.simulasi.judul", sm.judul, 60);
    teks(f, "pelajaran.simulasi.pengantar", sm.pengantar, BATAS.sedang);
    if (L.keselamatan != null && arr(f, "pelajaran.keselamatan", L.keselamatan, 0, 8)) L.keselamatan.forEach((s, i) => teks(f, `pelajaran.keselamatan[${i}]`, s, BATAS.panjang));
    if (arr(f, "pelajaran.coba", L.coba, 2, 5)) L.coba.forEach((s, i) => teks(f, `pelajaran.coba[${i}]`, s, BATAS.sedang));
  }

  if (arr(f, "kuis", d.kuis, 5, 20)) {
    const seen = new Set();
    d.kuis.forEach((q, i) => {
      const p = `kuis[${i}]`;
      teks(f, p + ".tanya", q.tanya, 200);
      if (q.tanya && seen.has(q.tanya.id)) err(f, p + ": soal kembar"); else if (q.tanya) seen.add(q.tanya.id);
      if (!Array.isArray(q.pilihan) || q.pilihan.length !== 4) err(f, p + ".pilihan harus tepat 4 pilihan");
      else {
        q.pilihan.forEach((o, k) => teks(f, `${p}.pilihan[${k}]`, o, BATAS.pendek));
        const ids = q.pilihan.map((o) => (o && o.id || "").trim().toLowerCase());
        if (new Set(ids).size !== 4) err(f, p + ": ada pilihan jawaban yang sama");
      }
      if (!Number.isInteger(q.benar) || q.benar < 0 || q.benar > 3) err(f, p + ".benar harus 0, 1, 2, atau 3");
      teks(f, p + ".bahas", q.bahas, BATAS.sedang);
      fakta(f, p + ".fakta", q.fakta, used);
    });
    const pos = [0, 0, 0, 0]; d.kuis.forEach((q) => { if (Number.isInteger(q.benar) && q.benar >= 0 && q.benar <= 3) pos[q.benar]++; });
    if (Math.max(...pos) > Math.ceil(d.kuis.length * 0.6)) warn(f, "jawaban benar terlalu sering di posisi yang sama (mesin tetap mengacak saat bermain)");
  }

  if (!Array.isArray(d.sumber)) err(f, "sumber wajib berupa daftar ID fakta");
  else {
    const s = new Set(d.sumber);
    for (const id of used) if (!s.has(id)) err(f, `sumber tidak memuat ${id} yang dipakai di konten`);
    for (const id of s) if (!used.has(id)) warn(f, `sumber memuat ${id} tetapi tidak dipakai`);
  }
  return d;
}

/* ---------- jalankan ---------- */
const indexPath = join(ROOT, "konten", "index.json");
let targets = files;
if (!targets.length) {
  const idx = readJson(indexPath, "index.json");
  if (idx) {
    if (idx.skema !== 1) err("index.json", "skema harus 1");
    if (!Array.isArray(idx.topik) || !idx.topik.length) err("index.json", "topik wajib berisi minimal 1 item");
    else {
      const ids = new Set();
      idx.topik.forEach((t, i) => {
        if (!t || typeof t.id !== "string" || t.file !== t.id + ".json") err("index.json", `topik[${i}]: file harus <id>.json`);
        if (ids.has(t && t.id)) err("index.json", `topik[${i}]: id kembar`); ids.add(t && t.id);
        const p = join(ROOT, "konten", String(t && t.file));
        if (!existsSync(p)) err("index.json", `topik[${i}]: file ${t && t.file} tidak ada`); else targets.push(p);
      });
    }
  }
}
for (const p of targets) { if (!existsSync(p)) err(basename(p), "file tidak ditemukan"); else cekTopik(p); }

for (const w of warns) console.log("PERINGATAN  " + w);
for (const e of errors) console.log("KESALAHAN   " + e);
if (errors.length) { console.log(`\nGAGAL: ${errors.length} kesalahan. Jangan di-push.`); process.exit(1); }
console.log(`\nLULUS: ${targets.length} file konten valid` + (FAKTA_SUMBER ? `, semua ID fakta ada di materi sumber.` : "."));
