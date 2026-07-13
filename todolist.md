# 📋 TODOLIST & EVALUASI STATUS MVP — APLIKASI REKAM

**RSJKO Engku Haji Daud — Provinsi Kepulauan Riau**
_Terakhir diperbarui: 13 Juli 2026 — Target deployment: Vercel (Frontend) + Railway (Backend) + Neon (Database)_

---

## 🔍 RINGKASAN EKSEKUTIF

Aplikasi REKAM saat ini berada pada **Fase MVP 60–65% selesai**.

Fondasi teknis sudah terbentuk dengan baik — arsitektur full-stack (React + Express + PostgreSQL/Prisma + Docker) telah ada, schema database telah dibuat, autentikasi JWT berfungsi di backend, dan **seluruh halaman UI frontend telah dibangun dengan tampilan yang realistis dan profesional**. Namun, **koneksi antara UI dan backend masih sangat terbatas** — hampir semua halaman masih menggunakan data mock statis, bukan data dari database sungguhan.

> **🚀 Keputusan Arsitektur Production**: Deployment dialihkan dari Docker self-hosted ke stack berbasis cloud modern — **Vercel** (Frontend), **Railway** (Backend Express), dan **Neon Postgres** (Database). Stack ini memberikan zero-config CI/CD, auto-scaling, dan free tier yang cukup untuk MVP.

### Status Per-Layer

| Layer                          | Status  | Keterangan                                               |
| ------------------------------ | ------- | -------------------------------------------------------- |
| 🎨 Frontend UI                 | ✅ ~85% | Semua halaman sudah ada, tampilan lengkap & realistis    |
| 🔌 API Backend                 | ⚠️ ~30% | Hanya auth endpoint; proposal & sertifikat masih mock    |
| 🗄️ Database                    | ✅ ~80% | Schema Prisma + migrasi + seed admin sudah ada           |
| 🔗 Integrasi UI↔API            | ❌ ~15% | Hanya Login yang terhubung ke backend sungguhan          |
| 🐳 Infrastruktur (Dev)         | ✅ ~90% | Docker Compose dev sudah siap dipakai secara lokal       |
| ☁️ Infrastruktur (Prod/Vercel) | ❌ ~0%  | Belum ada konfigurasi Vercel, Railway, atau Neon         |
| 🧪 Testing                     | ⚠️ ~20% | Hanya 1 file test backend sederhana; frontend test belum |

---

## 📊 ANALISIS FITUR PER MODUL

### 1. MODUL AUTENTIKASI & MANAJEMEN AKSES

| Fitur                                | Status       | Catatan                                                      |
| ------------------------------------ | ------------ | ------------------------------------------------------------ |
| Login UI (LoginModal)                | ✅ Selesai   | Sudah terhubung ke POST /api/auth/login                      |
| JWT Token & penyimpanan localStorage | ✅ Selesai   | Token disimpan, role di-set via Context                      |
| Backend: POST /api/auth/register     | ✅ Selesai   | Validasi, bcrypt hash, Prisma create                         |
| Backend: POST /api/auth/login        | ✅ Selesai   | Cek kredensial + generate JWT                                |
| Backend: GET /api/auth/me            | ✅ Selesai   | Dilindungi verifyToken middleware                            |
| Middleware verifyToken               | ✅ Selesai   | JWT decode + set req.user                                    |
| Middleware requireRole               | ✅ Selesai   | Role-based guard sudah ada di backend                        |
| Halaman Register (UI)                | ❌ Belum Ada | Tombol "Daftar" hanya teks, tidak ada form                   |
| Halaman Lupa Password                | ❌ Belum Ada | Hanya tombol kosong                                          |
| Logout functionality                 | ❌ Belum Ada | Tidak ada tombol/fungsi logout di navbar                     |
| SSO Login                            | ❌ Belum Ada | Tombol "Masuk dengan SSO/NIP" tidak berfungsi                |
| Persistensi sesi (refresh page)      | ❌ Belum Ada | Role Context hilang saat refresh — tidak ada rehydrasi token |

---

### 2. MODUL PROPOSAL DIKLAT

| Fitur                                    | Status       | Catatan                                            |
| ---------------------------------------- | ------------ | -------------------------------------------------- |
| Form pengajuan proposal (UI)             | ✅ Selesai   | Validasi client-side lengkap, file upload ada      |
| Daftar proposal dengan filter/search     | ✅ Selesai   | Search + filter status berfungsi di UI             |
| Halaman detail proposal                  | ✅ Selesai   | ProposalDetailPage tersedia                        |
| Workflow status card                     | ✅ Selesai   | WorkflowStatus, ApprovalDialog, AuditTrail dibuat  |
| Submit proposal ke backend               | ❌ Belum Ada | Hardcoded responseOk = true, tidak fetch API       |
| Backend: POST /api/proposals             | ❌ Stub Saja | Hanya mock di index.ts, tidak tersimpan ke DB      |
| Backend: GET /api/proposals              | ❌ Stub Saja | Return array hardcoded, bukan dari Prisma          |
| Backend: PATCH /api/proposals/:id/status | ❌ Belum Ada | Approval/reject belum ada endpointnya              |
| Backend: GET /api/proposals/:id          | ❌ Belum Ada | Detail proposal belum ada API-nya                  |
| Proposal controller (Prisma)             | ❌ Belum Ada | Folder controllers hanya berisi auth.controller.ts |
| Proposal routes (modular)                | ❌ Belum Ada | Folder routes hanya berisi auth.routes.ts          |

---

### 3. MODUL SERTIFIKAT & PASCA-DIKLAT

| Fitur                                   | Status       | Catatan                                              |
| --------------------------------------- | ------------ | ---------------------------------------------------- |
| Form input sertifikat (UI)              | ✅ Selesai   | Multi-row, validasi, generate PDF via window.print() |
| Upload file sertifikat (UI)             | ✅ Selesai   | FileUpload component tersedia                        |
| PostTrainingUploadPage                  | ✅ Selesai   | Halaman unggah dokumen pasca-diklat tersedia         |
| Kalkulasi total JP & SKP                | ✅ Selesai   | Dihitung otomatis di SertifikatPage                  |
| Simpan sertifikat ke backend            | ❌ Belum Ada | handleSave hanya push toast, tidak fetch API         |
| Backend: POST /api/certificates         | ❌ Belum Ada | Endpoint belum dibuat                                |
| Backend: GET /api/certificates          | ❌ Belum Ada | Endpoint belum dibuat                                |
| Penyimpanan file fisik (upload storage) | ❌ Belum Ada | File upload ke server belum diimplementasi           |
| Certificate controller + routes         | ❌ Belum Ada | Belum ada                                            |

---

### 4. MODUL EVALUASI PASCA-DIKLAT (H+6)

| Fitur                            | Status       | Catatan                                                 |
| -------------------------------- | ------------ | ------------------------------------------------------- |
| Jadwal presentasi (UI)           | ✅ Selesai   | Master-detail dengan status TERJADWAL/TERLAMBAT/SELESAI |
| Form evaluasi & rekomendasi (UI) | ✅ Selesai   | Textarea evaluasi + upload berita acara                 |
| Simpan evaluasi (state lokal)    | ✅ Selesai   | Update state React berhasil                             |
| Simpan evaluasi ke backend       | ❌ Belum Ada | Tidak ada fetch ke API                                  |
| Backend: Evaluation endpoints    | ❌ Belum Ada | Tidak ada                                               |

---

### 5. MODUL DASHBOARD & LAPORAN

| Fitur                                  | Status       | Catatan                                             |
| -------------------------------------- | ------------ | --------------------------------------------------- |
| Dashboard KPI (untuk manajemen)        | ✅ Selesai   | Statistik proposal, JP, SKP ditampilkan             |
| Laporan strategis pimpinan (4 card)    | ✅ Selesai   | Pemenuhan JP, SKP, Realisasi bulanan, Kepatuhan SLA |
| Role-based view (peserta vs manajemen) | ✅ Selesai   | isManagement dan isPimpinan dikontrol               |
| Export Excel laporan                   | ❌ Belum Ada | Hanya toast notifikasi, tidak ada export nyata      |
| Data dashboard dari DB sungguhan       | ❌ Belum Ada | Semua mockLaporanStrategis dan mockProposals        |
| Grafik/chart visual                    | ❌ Belum Ada | Hanya progress bar; tidak ada library chart         |

---

### 6. MODUL MANAJEMEN PENGGUNA (ADMIN)

| Fitur                                 | Status       | Catatan                                       |
| ------------------------------------- | ------------ | --------------------------------------------- |
| Tabel daftar pengguna (UI)            | ✅ Selesai   | List users dengan status kepegawaian & role   |
| Tambah/edit pengguna (modal dialog)   | ✅ Selesai   | UserFormDialog berfungsi di state lokal       |
| Hapus pengguna                        | ✅ Selesai   | Dilindungi dari hapus admin default           |
| CRUD User ke backend                  | ❌ Belum Ada | Semua operasi hanya di state React lokal      |
| Backend: GET /api/users (admin only)  | ❌ Belum Ada | Endpoint belum ada                            |
| Backend: PUT /api/users/:id           | ❌ Belum Ada | Endpoint belum ada                            |
| Backend: DELETE /api/users/:id        | ❌ Belum Ada | Endpoint belum ada                            |
| Filter/search pengguna yang berfungsi | ⚠️ Sebagian  | Input search ada tapi tidak ada event handler |

---

### 7. INFRASTRUKTUR & DEVOPS

#### Development (Lokal — Docker)

| Fitur                      | Status     | Catatan                                          |
| -------------------------- | ---------- | ------------------------------------------------ |
| Docker Compose (dev)       | ✅ Selesai | 3 service: db, backend, frontend                 |
| Prisma schema + migrations | ✅ Selesai | 4 model: User, Proposal, Certificate, AuditTrail |
| Seed admin user            | ✅ Selesai | npm run seed membuat admin default               |
| .env backend (lokal)       | ✅ Selesai | DATABASE_URL, JWT_SECRET, PORT terkonfigurasi    |

#### Production (Cloud — Vercel Stack)

| Fitur                                     | Status           | Catatan                                                  |
| ----------------------------------------- | ---------------- | -------------------------------------------------------- |
| Vercel project setup (Frontend)           | ❌ Belum Ada     | Perlu connect repo GitHub ke Vercel                      |
| Railway project setup (Backend)           | ❌ Belum Ada     | Express tidak kompatibel optimal di Vercel serverless    |
| Neon Postgres (Database Production)       | ❌ Belum Ada     | Ganti Docker Postgres lokal dengan Neon di production    |
| Vercel Blob / Cloudinary (File Storage)   | ❌ Belum Ada     | Ganti penyimpanan lokal (multer) dengan cloud storage    |
| Environment Variables di Vercel & Railway | ❌ Belum Ada     | Konfigurasi secrets via dashboard masing-masing platform |
| vercel.json (konfigurasi routing SPA)     | ❌ Belum Ada     | Diperlukan agar React Router tidak 404 di refresh        |
| railway.json atau Procfile (backend)      | ❌ Belum Ada     | Konfigurasi start command untuk Railway                  |
| CI/CD otomatis via GitHub push            | ❌ Belum Ada     | Vercel & Railway auto-deploy dari branch main            |
| Custom domain                             | ❌ Belum Ada     | Tambahkan domain institusi di Vercel dashboard           |
| Docker Compose (prod)                     | 🗑️ Tidak Dipakai | Digantikan sepenuhnya oleh Vercel + Railway              |

---

## 🚨 GAP KRITIS YANG HARUS DISELESAIKAN

**Masalah utama**: Aplikasi terlihat lengkap di UI, tetapi **data tidak persisten** — semua data hilang saat halaman di-refresh karena disimpan hanya di state React. Tidak ada koneksi nyata antara UI dan database.

### Gap #1 — Tidak Ada Persistensi Sesi Login

Setelah login berhasil dan token disimpan di localStorage, jika user refresh halaman maka RoleContext kembali ke default (tidak ada role). Perlu inisialisasi ulang role dari token yang tersimpan.

### Gap #2 — Tidak Ada API Proposal

/api/proposals di index.ts adalah stub hardcoded. Tidak ada controller Prisma, tidak ada route modular, tidak ada endpoint untuk operasi CRUD proposal.

### Gap #3 — Tidak Ada API Sertifikat

Halaman SertifikatPage dan PostTrainingPage tidak mengirim data ke mana pun. Tidak ada backend endpoint sama sekali untuk sertifikat.

### Gap #4 — File Upload Belum Diimplementasi + Tidak Kompatibel Vercel

FileUpload component ada di UI tetapi tidak ada storage handler di backend. **Penting**: di Vercel/Railway, penyimpanan file lokal (multer ke disk) **tidak persistent** — file akan hilang saat container restart. Wajib gunakan cloud storage: **Vercel Blob** (untuk frontend di Vercel) atau **Cloudinary** (untuk backend di Railway).

### Gap #5 — Tidak Ada Logout

Tidak ada tombol logout. Token tetap di localStorage, tetapi tidak ada cara bagi user untuk keluar dari sistem.

---

## ✅ ROADMAP TODO — FASE BERIKUTNYA

---

### 🔴 PRIORITAS 1 — BACKEND CORE API (Minggu 1)

#### Backend: Proposal Module

- [ ] Buat backend/src/controllers/proposal.controller.ts
  - [ ] createProposal — validasi + prisma.proposal.create()
  - [ ] getAllProposals — query dengan filter userId atau semua (admin)
  - [ ] getProposalById — detail satu proposal
  - [ ] updateProposalStatus — ubah status + buat AuditTrail entry
- [ ] Buat backend/src/routes/proposal.routes.ts
  - [ ] POST /api/proposals — dilindungi verifyToken
  - [ ] GET /api/proposals — dilindungi verifyToken
  - [ ] GET /api/proposals/:id — dilindungi verifyToken
  - [ ] PATCH /api/proposals/:id/status — dilindungi verifyToken + requireRole
- [ ] Daftarkan proposal routes di backend/src/index.ts

#### Backend: Certificate Module

- [ ] Buat backend/src/controllers/certificate.controller.ts
  - [ ] createCertificate — simpan data sertifikat ke DB
  - [ ] getCertificatesByUser — ambil sertifikat milik user tertentu
  - [ ] getAllCertificates — untuk admin/diklat melihat semua sertifikat
- [ ] Buat backend/src/routes/certificate.routes.ts
  - [ ] POST /api/certificates
  - [ ] GET /api/certificates (dengan query param ?userId=...)
- [ ] Daftarkan certificate routes di backend/src/index.ts

#### Backend: User Management (Admin)

- [ ] Buat backend/src/controllers/user.controller.ts
  - [ ] getAllUsers — hanya untuk role admin
  - [ ] updateUser — update data user (role, unit, status)
  - [ ] deleteUser — soft delete atau hard delete
- [ ] Buat backend/src/routes/user.routes.ts
  - [ ] GET /api/users — requireRole(['admin'])
  - [ ] PUT /api/users/:id — requireRole(['admin'])
  - [ ] DELETE /api/users/:id — requireRole(['admin'])
- [ ] Daftarkan user routes di backend/src/index.ts

#### Backend: File Upload (Cloud Storage — Vercel Compatible)

- [ ] Daftarkan akun Cloudinary (free tier cukup untuk MVP) di cloudinary.com
- [ ] Install dependency: `npm install cloudinary multer multer-storage-cloudinary @types/multer`
- [ ] Tambahkan env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
- [ ] Buat backend/src/config/cloudinary.ts — konfigurasi Cloudinary SDK
- [ ] Buat backend/src/middlewares/upload.middleware.ts — multer dengan Cloudinary storage
- [ ] Buat endpoint POST /api/upload yang menerima file dan return secure_url Cloudinary
- [ ] Simpan secure_url (bukan path lokal) ke kolom fileUrl di tabel Certificate
- [ ] JANGAN gunakan multer disk storage — tidak compatible dengan Railway/Vercel

---

### 🟠 PRIORITAS 2 — INTEGRASI FRONTEND (Minggu 1–2)

#### Auth: Persistensi Sesi & Logout

- [ ] Di RoleContext.tsx, tambahkan inisialisasi: baca token dari localStorage saat app load, decode JWT, set role
- [ ] Tambahkan fungsi logout ke RoleContext yang menghapus token dan reset role
- [ ] Buat komponen UserDropdown di navbar untuk tampilkan nama user + tombol logout
- [ ] Implementasi halaman/modal Registrasi Pengguna (connect ke POST /api/auth/register)
- [ ] Perluas RoleContext untuk menyimpan data user lengkap (nama, NIP, unit)

#### Proposal: Koneksi Frontend ke API

- [ ] Di ProposalPage.tsx, ubah handleSubmit agar fetch ke POST /api/proposals dengan token JWT
- [ ] Di ProposalPage.tsx, ubah useEffect agar fetch dari GET /api/proposals (hapus mock data)
- [ ] Di ProposalDetailPage.tsx, fetch detail dari GET /api/proposals/:id
- [ ] Implementasi ApprovalDialog agar terhubung ke PATCH /api/proposals/:id/status
- [ ] Tampilkan AuditTrail dari data nyata (bukan dummy)

#### Sertifikat: Koneksi Frontend ke API

- [ ] Di SertifikatPage.tsx, ubah handleSave agar fetch ke POST /api/certificates dengan JWT
- [ ] Implementasi upload file sertifikat ke endpoint /api/upload, simpan URL yang dikembalikan
- [ ] Saat halaman dibuka, fetch data sertifikat user dari GET /api/certificates?userId=...
- [ ] Di PostTrainingUploadPage.tsx, implementasi upload dokumen pasca-diklat ke backend

#### Dashboard: Data dari Backend

- [ ] Buat endpoint GET /api/dashboard/stats yang mengembalikan statistik real dari DB
- [ ] Di DashboardPage.tsx, fetch data KPI dari API (ganti mockLaporanStrategis)
- [ ] Di DashboardPage.tsx, fetch daftar proposal dari API (ganti mockProposals)

#### User Management: Koneksi Frontend ke API

- [ ] Di UserManagementPage.tsx, fetch daftar user dari GET /api/users
- [ ] Implementasi save/edit user ke PUT /api/users/:id
- [ ] Implementasi delete user ke DELETE /api/users/:id
- [ ] Aktifkan fungsi search/filter di UserManagementPage (tambahkan event handler)

---

### 🟡 PRIORITAS 3 — PENYEMPURNAAN UI (Minggu 2)

- [ ] Tambahkan loading state (skeleton atau spinner) saat fetch data di semua halaman
- [ ] Tambahkan empty state yang informatif ketika data dari API kosong
- [ ] Tambahkan error state ketika API gagal (network error, 401, 500)
- [ ] Implementasikan custom fetch wrapper terpusat dengan automatic JWT header injection
- [ ] Buat service layer: frontend/src/lib/api.ts untuk semua pemanggilan API
- [ ] Tambahkan proper error boundary di React
- [ ] Aktifkan fungsional tombol "Masuk dengan NIP"
- [ ] Tambahkan validasi role pada sidebar agar menu sesuai role user yang login
- [ ] Perbaiki filter di UserManagementPage agar berfungsi dari data API
- [ ] Tambahkan pagination di halaman proposal dan sertifikat jika data besar

---

### 🟢 PRIORITAS 4 — TESTING & KEAMANAN (Minggu 2–3)

#### Testing Backend

- [ ] Perluas backend/**tests**/index.test.ts untuk mencakup:
  - [ ] Test POST /api/auth/register — skenario sukses & duplikat
  - [ ] Test POST /api/auth/login — sukses & kredensial salah
  - [ ] Test GET /api/proposals — tanpa token (401), dengan token (200)
  - [ ] Test PATCH /api/proposals/:id/status — role tidak memadai (403)
- [ ] Tambahkan database test fixture atau mock Prisma

#### Testing Frontend

- [ ] Buat minimal 1 test komponen untuk LoginModal
- [ ] Buat test untuk ProtectedRoute — pastikan redirect ke /unauthorized bekerja

#### Keamanan

- [ ] Pastikan JWT_SECRET tidak di-commit (cek .gitignore)
- [ ] Tambahkan rate limiting di backend (install express-rate-limit)
- [ ] Validasi input backend menggunakan zod atau class-validator
- [ ] Tambahkan CORS configuration yang lebih ketat (whitelist origin spesifik)
- [ ] Tambahkan helmet.js untuk HTTP security headers
- [ ] Batasi ukuran dan tipe MIME file upload di backend

---

### 🔵 PRIORITAS 5 — FITUR TAMBAHAN MVP+ (Minggu 3–4)

- [ ] Implementasi Export Excel laporan (gunakan library xlsx atau exceljs)
- [ ] Implementasi notifikasi sistem in-app ketika status proposal berubah
- [ ] Tambahkan halaman Profil Pengguna (edit nama, password)
- [ ] Tambahkan fitur pencarian global (proposal + sertifikat + pengguna)
- [ ] Implementasi Laporan H+6 ke backend (extend model atau AuditTrail)
- [ ] Tambahkan halaman Riwayat/Arsip Diklat per pegawai
- [ ] Tambahkan grafik/chart interaktif di dashboard (recharts atau chart.js)
- [ ] Implementasi dark mode toggle

---

### ⚫ PRIORITAS 6 — DEPLOYMENT KE VERCEL (Minggu 4+)

> Stack production yang dipilih: **Vercel** (Frontend) + **Railway** (Backend Express) + **Neon** (PostgreSQL) + **Cloudinary** (File Storage)

#### Langkah A — Setup Database Production (Neon Postgres)

- [ ] Daftar akun di neon.tech (free tier tersedia)
- [ ] Buat project baru dan database `diklatdb`
- [ ] Salin CONNECTION STRING dari Neon dashboard
- [ ] Jalankan migrasi Prisma ke Neon: `DATABASE_URL=<neon_url> npx prisma migrate deploy`
- [ ] Jalankan seed admin: `DATABASE_URL=<neon_url> npm run seed`
- [ ] Simpan CONNECTION STRING untuk dipakai di Railway environment variables

#### Langkah B — Deploy Backend ke Railway

- [ ] Daftar akun di railway.app
- [ ] Connect repository GitHub ke Railway (pilih folder `backend`)
- [ ] Tambahkan environment variables di Railway dashboard:
  - [ ] DATABASE_URL = connection string dari Neon
  - [ ] JWT_SECRET = string acak panjang (minimal 32 karakter)
  - [ ] NODE_ENV = production
  - [ ] PORT = 5000 (Railway mendeteksi otomatis)
  - [ ] CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
- [ ] Buat file `backend/Procfile` berisi: `web: node dist/index.js`
- [ ] Pastikan build script di package.json backend menghasilkan `dist/` yang benar
- [ ] Verifikasi Railway deploy berhasil: akses `https://<railway-url>/api/health`
- [ ] Catat Railway URL untuk dipakai di konfigurasi frontend

#### Langkah C — Konfigurasi Frontend untuk Vercel

- [ ] Buat file `frontend/vercel.json` dengan isi berikut (wajib untuk React Router SPA):
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- [ ] Buat file `frontend/.env.production` berisi:
  ```
  VITE_API_URL=https://<railway-url>
  ```
- [ ] Update semua `fetch('http://localhost:5000/...')` di frontend menjadi:
  ```typescript
  fetch(`${import.meta.env.VITE_API_URL}/...`);
  ```
- [ ] Pastikan `frontend/src/lib/api.ts` (service layer) menggunakan VITE_API_URL, bukan hardcode
- [ ] Update CORS di backend agar mengizinkan Vercel domain:
  ```typescript
  cors({
    origin: ["https://<vercel-app>.vercel.app", "http://localhost:5173"],
  });
  ```

#### Langkah D — Deploy Frontend ke Vercel

- [ ] Daftar/login di vercel.com
- [ ] Klik "Add New Project" → Import dari GitHub repository
- [ ] Pilih **Root Directory**: `frontend` (bukan root repo)
- [ ] Vercel auto-detect Vite — pastikan Build Command: `npm run build`, Output: `dist`
- [ ] Tambahkan environment variable di Vercel dashboard:
  - [ ] VITE_API_URL = https://<railway-url>
- [ ] Klik Deploy — Vercel akan auto-build dan publish
- [ ] Akses URL Vercel yang diberikan, uji login dan semua fitur utama
- [ ] Tambahkan custom domain institusi (opsional) di Vercel → Settings → Domains

#### Langkah E — Verifikasi & UAT

- [ ] Test end-to-end: Login → Submit Proposal → Approval → Upload Sertifikat
- [ ] Test upload file: pastikan file tersimpan di Cloudinary dan URL dapat diakses
- [ ] Test refresh halaman di semua route (pastikan tidak 404 berkat vercel.json)
- [ ] Test di perangkat mobile (responsiveness)
- [ ] Lakukan User Acceptance Testing (UAT) dengan minimal 2 staff RSJKO Engku Haji Daud
- [ ] Dokumentasikan kredensial akun admin default dan cara reset password

#### Langkah F — Monitoring & Maintenance

- [ ] Aktifkan Vercel Analytics untuk memantau traffic frontend
- [ ] Aktifkan Railway monitoring untuk melihat uptime dan log backend
- [ ] Setup Neon database backup (aktifkan Point-in-Time Recovery di Neon dashboard)
- [ ] Buat dokumentasi API menggunakan Postman Collection atau Swagger
- [ ] Setup alert notifikasi jika Railway backend down (via Railway webhook atau UptimeRobot)

---

## 📈 TARGET PENYELESAIAN MVP FUNGSIONAL

```
Minggu 1: Selesaikan Prioritas 1 (Backend API Core + Cloudinary Setup)
          → API proposal, sertifikat, user CRUD berjalan di lokal
          → File upload ke Cloudinary sudah berfungsi

Minggu 2: Selesaikan Prioritas 2 + 3 (Integrasi + UI Polish)
          → Semua halaman terhubung ke data nyata dari API
          → VITE_API_URL sudah pakai variabel env, bukan hardcode
          → Loading/error state ada di semua halaman

Minggu 3: Selesaikan Prioritas 4 (Testing + Keamanan)
          → Semua endpoint diuji dengan Jest/Supertest
          → CORS dikonfigurasi whitelist domain Vercel
          → Rate limiting, helmet, zod validation aktif

Minggu 4: Prioritas 5 + 6 (Fitur Tambahan + Deploy ke Vercel)
          → Neon Postgres sudah berisi data migration & seed
          → Backend live di Railway, frontend live di Vercel
          → UAT dengan staff RSJKO — aplikasi siap digunakan!
```

### 🗺️ Arsitektur Production (Target)

```
[Browser Pengguna]
       │
       ▼
[Vercel CDN — Frontend React/Vite]
  URL: rekam-rsjko.vercel.app
       │  HTTPS API calls
       ▼
[Railway — Backend Express + Prisma]
  URL: rekam-api.railway.app
       │  Connection via DATABASE_URL
       ▼
[Neon — PostgreSQL Database]
  Host: ep-xxxx.neon.tech

[Cloudinary — File Storage]
  ← Upload sertifikat & dokumen dari backend Railway
```

---

## 🗂️ REFERENSI FILE PENTING

### File Yang Sudah Ada

| File                                        | Status             | Keterangan                              |
| ------------------------------------------- | ------------------ | --------------------------------------- |
| backend/prisma/schema.prisma                | ✅ Lengkap         | User, Proposal, Certificate, AuditTrail |
| backend/src/controllers/auth.controller.ts  | ✅ Lengkap         | Register, Login, GetMe                  |
| backend/src/middlewares/auth.middleware.ts  | ✅ Lengkap         | verifyToken, requireRole                |
| backend/src/index.ts                        | ⚠️ Perlu Refactor  | Proposal route masih stub mock          |
| frontend/src/App.tsx                        | ✅ Lengkap         | Semua route + ProtectedRoute sudah ada  |
| frontend/src/contexts/RoleContext.tsx       | ⚠️ Perlu Perbaikan | Tidak ada persistensi dari token        |
| frontend/src/components/auth/LoginModal.tsx | ✅ Lengkap         | Terhubung ke backend nyata              |
| frontend/src/pages/ProposalPage.tsx         | ⚠️ Perlu Koneksi   | Submit masih hardcoded, data masih mock |
| frontend/src/pages/SertifikatPage.tsx       | ⚠️ Perlu Koneksi   | Save hanya toast, tidak fetch API       |
| frontend/src/pages/DashboardPage.tsx        | ⚠️ Perlu Koneksi   | Data statistik masih mock               |
| frontend/src/pages/UserManagementPage.tsx   | ⚠️ Perlu Koneksi   | CRUD hanya di state lokal               |
| frontend/src/pages/PostTrainingPage.tsx     | ❌ Minimal         | Hanya informasi statis + link ke upload |
| docker-compose.yml                          | ✅ Dipertahankan   | Tetap dipakai untuk development lokal   |
| docker-compose.prod.yml                     | 🗑️ Tidak Dipakai   | Digantikan oleh Vercel + Railway        |

### File Baru Yang Perlu Dibuat (Untuk Vercel)

| File                                              | Tujuan                                                 |
| ------------------------------------------------- | ------------------------------------------------------ |
| frontend/vercel.json                              | Rewrite rules agar React Router tidak 404 saat refresh |
| frontend/.env.production                          | VITE_API_URL ke Railway URL                            |
| frontend/.env.development                         | VITE_API_URL ke http://localhost:5000                  |
| frontend/src/lib/api.ts                           | Service layer terpusat dengan base URL dari env        |
| backend/src/config/cloudinary.ts                  | Konfigurasi Cloudinary SDK                             |
| backend/src/config/prisma.ts                      | Singleton Prisma client (sudah ada, verifikasi)        |
| backend/src/controllers/proposal.controller.ts    | CRUD Proposal via Prisma                               |
| backend/src/controllers/certificate.controller.ts | CRUD Certificate via Prisma                            |
| backend/src/controllers/user.controller.ts        | CRUD User via Prisma                                   |
| backend/src/routes/proposal.routes.ts             | Router modular proposal                                |
| backend/src/routes/certificate.routes.ts          | Router modular sertifikat                              |
| backend/src/routes/user.routes.ts                 | Router modular user management                         |
| backend/Procfile                                  | Start command untuk Railway: `web: node dist/index.js` |

### Environment Variables Production

| Variabel              | Platform | Keterangan                      |
| --------------------- | -------- | ------------------------------- |
| VITE_API_URL          | Vercel   | URL backend Railway             |
| DATABASE_URL          | Railway  | Connection string Neon Postgres |
| JWT_SECRET            | Railway  | String acak minimal 32 karakter |
| NODE_ENV              | Railway  | production                      |
| CLOUDINARY_CLOUD_NAME | Railway  | Dari Cloudinary dashboard       |
| CLOUDINARY_API_KEY    | Railway  | Dari Cloudinary dashboard       |
| CLOUDINARY_API_SECRET | Railway  | Dari Cloudinary dashboard       |
