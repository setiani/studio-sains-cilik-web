# Studio Sains Cilik Web

Situs pelajaran sains siaga bencana untuk kelas 4–6 SD: pelajaran dengan simulasi interaktif dan kuis dua bahasa (Indonesia dan Inggris). Berbasis Rescue Squad Quiz.

Situs ini **statis**: hanya HTML, CSS, JavaScript, dan JSON. Tidak butuh PHP, database, atau proses build.

## Siapa mengubah apa

| Bagian | Diubah oleh |
|---|---|
| `konten/*.json` | Tim agen Studio Sains Cilik, **hanya setelah pengguna mengetik SETUJU** |
| `index.html`, `assets/`, `tools/`, `sw.js`, ikon | Manusia saja |

Setiap commit konten ditulis oleh agen Lead dengan pesan `Konten <id> dari <ID-RUN> v<N> (disetujui pengguna)`. Riwayat commit menjadi jejak audit.

## Isi folder

```
index.html            halaman utama
assets/app.js         mesin situs: bahasa, pelajaran, kuis
assets/sims.js        perpustakaan simulasi (shake, tsunami)
assets/style.css      tampilan
konten/index.json     daftar topik yang tampil
konten/<id>.json      isi per topik
tools/validasi.mjs    pemeriksa konten (Node.js, tanpa dependensi)
docs/FORMAT-KONTEN.md format file konten
docs/deploy-ftp.yml   contoh GitHub Actions untuk shared hosting
sw.js, manifest.webmanifest, icons/   bisa dipasang seperti aplikasi dan dibuka offline
```

## Mencoba di komputer

Halaman perlu dibuka lewat server web, bukan dengan klik dua kali file `index.html`:

```
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Memeriksa konten

```
node tools/validasi.mjs --sumber ../01-sumber
```

Jangan pernah menaruh data pribadi siswa, buku aturan, atau log di repo ini.
