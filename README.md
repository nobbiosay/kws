# Krakatau Water Solution

React (Vite) single-page app untuk input & monitoring WTP Kerenceng dan WTP Cidanau.
Data demo disimpan di `localStorage` (tanpa backend) agar bisa langsung dicoba.

## Menjalankan Lokal

```bash
npm install
npm run dev
```

## Build Produksi
```bash
npm run build
npm run preview
```

## Deploy ke Vercel
1. Push repository ini ke GitHub.
2. Import repo ke Vercel → framework Vite autodetect.
3. Build Command: `npm run build`, Output: `dist`.
4. File `vercel.json` sudah menambahkan SPA fallback.


## v2
- UI tema baru (gradient + glassmorphism)
- Animasi mikro pada card/tabel/tombol
- Halaman WTP menampilkan hasil input lengkap via modal 'Detail'
