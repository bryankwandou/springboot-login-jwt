# Audit #1 Clarification

Dokumen ini disusun sebagai klarifikasi tindak lanjut atas catatan bahwa aplikasi terlihat seperti tutorial dengan data dummy.

## Perbaikan yang dilakukan
- Seeded account bawaan (`admin@example.com`) dihapus.
- Form login tidak lagi terisi data contoh secara otomatis.
- Alur penggunaan diperbaiki: pengguna harus registrasi akun terlebih dahulu.
- Landing page dan dokumentasi direvisi agar tidak menampilkan narasi data dummy.
- Endpoint `GET /api/auth/me` ditambahkan untuk verifikasi token bearer yang sah.

## Posisi Produk Saat Ini
- Aplikasi adalah MVP teknis untuk demonstrasi autentikasi JWT dan CRUD.
- Data yang muncul berasal dari aksi pengguna saat runtime, bukan data contoh yang dipaketkan sebagai konten publik.
- Penyimpanan masih in-memory (belum PostgreSQL), sehingga data tidak persisten antar restart server. Ini batasan teknis MVP dan telah dinyatakan terbuka di dokumentasi.

## Komitmen Revisi Lanjutan
- Migrasi penyimpanan ke PostgreSQL + Prisma.
- Penambahan validasi dan audit logging tingkat produksi.
- Penguatan kebijakan data untuk konteks sistem pemerintahan.
