# Format Konten Web (skema 1)

Setiap topik adalah satu file `konten/<id>.json`. Mesin situs (`index.html`, `assets/`) membaca file ini. Agen **hanya** membuat file konten. Mesin situs tidak pernah diubah oleh agen.

Contoh lengkap: `konten/gempa.json`.

## Aturan umum

- Semua teks yang tampil ke pengguna ditulis sebagai objek dua bahasa: `{ "id": "...", "en": "..." }`. Keduanya wajib diisi.
- Teks biasa saja. **Dilarang**: tanda `<` atau `>`, tautan (`http`, `www`), kode, atau placeholder seperti `{{ }}`.
- Angka di versi `id` dan `en` harus sama.
- Setiap ide pelajaran dan setiap soal punya daftar `fakta` berisi ID fakta dari materi sumber (misalnya `"G-04"`).
- `sumber` berisi semua ID fakta yang dipakai di file.

## Struktur

```json
{
  "skema": 1,
  "id": "gunung-api-pantai",
  "id_run": "20261022-1930-gunungapi",
  "versi_draf": 2,
  "kelas": "4-6",
  "judul":   { "id": "...", "en": "..." },
  "ringkas": { "id": "...", "en": "..." },
  "pelajaran": {
    "judul": { "id": "...", "en": "..." },
    "ide": [
      { "judul": { "id": "...", "en": "..." }, "isi": { "id": "...", "en": "..." }, "fakta": ["V-01"] }
    ],
    "simulasi": {
      "jenis": "tsunami",
      "judul":     { "id": "...", "en": "..." },
      "pengantar": { "id": "...", "en": "..." }
    },
    "keselamatan": [ { "id": "...", "en": "..." } ],
    "coba":        [ { "id": "...", "en": "..." } ]
  },
  "kuis": [
    {
      "tanya":   { "id": "...", "en": "..." },
      "pilihan": [ { "id": "...", "en": "..." }, { "id": "...", "en": "..." }, { "id": "...", "en": "..." }, { "id": "...", "en": "..." } ],
      "benar": 2,
      "bahas":   { "id": "...", "en": "..." },
      "fakta": ["V-11"]
    }
  ],
  "sumber": ["V-01", "V-11"]
}
```

| Kolom | Isi | Batas |
|---|---|---|
| `id` | Sama dengan `id_web` di file topik sumber (misalnya `gempa`, `gunung-api-pantai`). Nama file di website menjadi `<id>.json`. | |
| `id_run`, `versi_draf` | ID-RUN dan nomor versi draf yang disetujui | |
| `judul` | Judul topik | 60 karakter |
| `ringkas` | Satu kalimat deskripsi | 120 karakter |
| `pelajaran.ide` | Ide kunci | 3–6 ide; isi 300 karakter |
| `pelajaran.simulasi.jenis` | Simulasi yang tersedia: `shake` (meja getar, untuk gempa dan bangunan), `tsunami` (tsunami dari laut ke pantai) | |
| `pelajaran.keselamatan` | Poin keselamatan aktivitas, disalin lengkap dari sumber | 0–8 poin |
| `pelajaran.coba` | Tugas "coba ini" untuk simulasi | 2–5 tugas |
| `kuis` | Soal pilihan ganda, sama dengan kuis di draf (urutan sama) | 5–20 soal |
| `pilihan` | Tepat 4 pilihan, tidak boleh ada yang kembar | 120 karakter |
| `benar` | Indeks jawaban benar: 0 = A, 1 = B, 2 = C, 3 = D. Sebarkan, jangan selalu 0. | |
| `bahas` | Pembahasan 1–2 kalimat | 300 karakter |

## Simulasi dan topik

Simulasi harus cocok dengan topik dan isi `coba` harus bisa dilakukan di simulasi itu:

- `shake` punya pengatur: dasar (sempit/lebar), penguat (tanpa/segitiga), bagian berat (atas/bawah), kekuatan guncangan 1–10.
- `tsunami` punya pengatur: hutan mangrove (mati/nyala), sirene peringatan (mati/nyala). Kedalaman laut dalam 5.000 m, kecepatan sekitar 800 km/jam.

Jika topik baru butuh simulasi lain, agen tidak membuatnya. Simulasi baru ditambahkan oleh manusia ke `assets/sims.js` dan `tools/validasi.mjs`.

## Validasi

```
node tools/validasi.mjs --sumber ../01-sumber
```

Hasil harus **LULUS** sebelum commit dan push.
