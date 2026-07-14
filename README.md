# Next.js JWT CRUD MVP

MVP ini dibuat untuk assignment internship Web2 dengan fokus pada praktik engineering dasar:
- JWT authentication
- Authorization Bearer Token
- Protected route
- REST API CRUD
- Clean structure dan dokumentasi

## Assumptions
- Penyimpanan data masih in-memory (belum PostgreSQL) untuk mempermudah demo lokal.
- Fokus tahap ini adalah fondasi arsitektur dan alur fungsional.
- Tidak ada seeded user bawaan. Akun dibuat melalui endpoint registrasi.

## Feature Checklist
- Landing page
- Login
- Logout
- Dashboard
- Protected route (`/dashboard`)
- JWT authentication
- CRUD (create, read, update, delete)
- Validation, loading, error, success, empty state
- Responsive UI

## Folder Structure
```text
src/
  app/
    api/
      auth/
      items/
    dashboard/
    login/
    page.tsx
  components/
    auth/
    dashboard/
    layout/
  constants/
  hooks/
  lib/
  services/
middleware.ts
docs/ARCHITECTURE.md
```

## Authentication Flow
1. User registrasi di `/register` lalu login di `/login`.
2. API memvalidasi email dan kata sandi.
3. Server menerbitkan JWT.
4. Token disimpan di local storage untuk header API.
5. Semua CRUD call wajib kirim `Authorization: Bearer <token>`.
6. Endpoint `GET /api/auth/me` memverifikasi token aktif.
7. Logout menghapus token lokal.

## CRUD Flow
- Create: tambah data baru dari dashboard.
- Read: dashboard memuat daftar data user.
- Update: ubah item via prompt update.
- Delete: hapus item dengan konfirmasi.

Setiap aksi menampilkan status loading, validasi, dan feedback.

## Run Project
```bash
npm install
npm run dev
```

Buka:
- `http://localhost:3000`

Langkah uji akun:
1. Akses halaman register.
2. Buat akun baru.
3. Login dengan akun tersebut.

## Testing Checklist
- Login success dan failure
- Unauthorized access ke `/dashboard` tanpa token
- CRUD create/read/update/delete
- Validation form login dan create item
- Empty state saat data belum ada
- Logout flow
- Responsive tampilan mobile dan desktop

## Known Limitations
- Data belum persisten karena masih in-memory.
- Belum ada refresh token.
- Belum ada automated test.

## Future Improvements
- Integrasi PostgreSQL + ORM (Prisma).
- Refresh token strategy.
- Role-based authorization.
- Unit dan integration tests.
- Observability logging.

## 1-Minute Presentation Script
Good morning.

Today I present a Next.js MVP that demonstrates JWT authentication and a complete CRUD workflow.

Users log in to receive a JWT token, then access protected features through Authorization Bearer Token requests. The dashboard route is protected by middleware, and every CRUD request validates the token before processing.

The project is structured in modular layers with separated components, hooks, services, API handlers, and shared utilities. The interface is responsive and includes clear loading, validation, empty, success, and error states.

This MVP provides a solid engineering foundation and can be extended with PostgreSQL persistence, role-based authorization, refresh tokens, automated testing, and production-grade observability.

Thank you.
