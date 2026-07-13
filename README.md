# Aplikasi REKAM MVP

Proyek rapid development untuk sistem Riwayat Evaluasi Kompetensi Aparatur Medis (REKAM) di Rumah Sakit Jiwa dan Ketergantungan Obat Engku Haji Daud Provinsi Kepulauan Riau. Aplikasi ini dirancang sebagai MVP digital untuk mendukung proses pengajuan, verifikasi, dan pemantauan diklat bagi pegawai PNS dan PPPK.

## Gambaran Umum

Aplikasi ini terdiri dari dua bagian utama:

- Frontend: antarmuka interaktif untuk pegawai, admin, dan direktur
- Backend: API mock dan endpoint untuk mengelola proposal diklat secara sederhana

## Tech Stack

### Frontend
- React 19 untuk membangun antarmuka pengguna berbasis komponen
- TypeScript untuk keamanan tipe dan pengalaman developer yang lebih baik
- Vite sebagai build tool dan dev server yang cepat
- React Router 7 untuk navigasi antar halaman
- Tailwind CSS untuk styling utility-first yang konsisten dan cepat
- Komponen UI kustom yang terinspirasi dari pendekatan SHADCN untuk tampilan yang lebih modern
- Context API untuk pengelolaan role-based access dan state aplikasi

### Backend
- Node.js sebagai runtime JavaScript
- Express.js untuk membangun API HTTP
- TypeScript untuk penulisan backend yang lebih terstruktur
- Jest + Supertest untuk pengujian endpoint API
- CORS untuk mendukung komunikasi frontend-backend secara aman

### Tooling & Support
- npm sebagai package manager
- PostCSS + Autoprefixer untuk pengolahan CSS
- tsx untuk menjalankan TypeScript langsung selama development
- Vitest untuk pengujian frontend

## Struktur Proyek

```text
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── __tests__/
│   │   └── index.ts
│   └── package.json
└── README.md
```

## Fitur Utama

- Landing page modern untuk akses awal sistem
- Dashboard berbasis peran (pegawai, admin, direktur)
- Form pengajuan proposal diklat
- Detail proposal dan alur persetujuan
- Halaman unggah dokumen pasca-diklat
- Notifikasi toast untuk feedback interaktif
- UI yang mendukung simulasi workflow realistik

## Menjalankan Aplikasi Secara Lokal

### 1. Install dependency

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 2. Jalankan backend

```bash
cd backend
npm run dev
```

Backend akan berjalan pada port development yang biasa dipakai oleh tsx/Express.

### 3. Jalankan frontend

```bash
cd frontend
npm run dev
```

Frontend akan tersedia di browser melalui Vite dev server dan terhubung ke backend melalui konfigurasi proxy.

## Testing

### Frontend

```bash
cd frontend
npm run test
```

### Backend

```bash
cd backend
npm test
```

## Build untuk Produksi

```bash
cd frontend
npm run build
```

## Catatan Pengembangan

- Frontend saat ini fokus pada experience-driven MVP dan UI yang realistis untuk kebutuhan internal rumah sakit.
- Backend masih menggunakan data mock untuk mempercepat prototyping dan validasi alur.
- Struktur aplikasi dibuat agar mudah dikembangkan ke versi full-stack yang lebih terintegrasi di kemudian hari.
