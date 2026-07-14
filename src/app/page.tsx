import Link from "next/link";

const features = [
  "JWT authentication dengan verifikasi token di server",
  "Semua endpoint CRUD dilindungi Authorization Bearer Token",
  "Middleware untuk melindungi route dashboard",
  "Penanganan loading, error, validasi, dan empty state",
  "Struktur folder modular agar mudah dikembangkan",
];

const workflow = [
  "Pengguna membuka halaman login dan mengirim kredensial.",
  "Server memvalidasi input lalu menerbitkan JWT.",
  "Token disimpan untuk request API, sementara cookie dipakai middleware route.",
  "Dashboard memanggil endpoint CRUD menggunakan header Authorization.",
  "Token invalid atau sesi habis akan diarahkan kembali ke login.",
];

const stack = ["Next.js App Router", "TypeScript", "REST API Route Handlers", "JWT (jose)", "bcryptjs"];

export default function LandingPage() {
  return (
    <main className="container page-wrap">
      <section className="hero panel">
        <h1>Next.js MVP untuk JWT Login dan CRUD</h1>
        <p>
          Aplikasi ini menampilkan implementasi autentikasi JWT dan operasi CRUD dengan pendekatan
          arsitektur modular agar siap ditingkatkan ke lingkungan produksi.
        </p>
        <div className="row">
          <Link className="button-link" href="/register">
            Buat Akun
          </Link>
          <Link className="button-link" href="/login">
            Login
          </Link>
          <Link className="button-link secondary-link" href="/dashboard">
            Buka Dashboard
          </Link>
        </div>
      </section>

      <section className="grid two-columns">
        <article className="panel">
          <h2>Fitur Utama</h2>
          <ul className="list">
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h2>Alur Kerja</h2>
          <ol className="list ordered">
            {workflow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="grid three-columns">
        <article className="panel">
          <h3>Arsitektur</h3>
          <p>
            Lapisan dibagi menjadi halaman, komponen, hooks, services, constants, utilities, middleware,
            dan API handler agar setiap berkas memiliki tanggung jawab tunggal.
          </p>
        </article>

        <article className="panel">
          <h3>Authentication Flow</h3>
          <p>
            Login menghasilkan JWT. Token dipakai sebagai Bearer Token untuk CRUD, sedangkan cookie aman
            menjaga akses ke route dashboard.
          </p>
        </article>

        <article className="panel">
          <h3>CRUD Flow</h3>
          <p>
            Modul dashboard mendukung create, read, update, dan delete. Setiap aksi menampilkan status
            loading, feedback sukses, validasi input, serta konfirmasi sebelum hapus data.
          </p>
        </article>
      </section>

      <section className="panel">
        <h2>Technology Stack</h2>
        <div className="chip-list">
          {stack.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="panel cta-panel">
        <h2>Siap untuk Pengujian</h2>
        <p>
          Mulai dengan membuat akun, lalu lakukan login untuk menguji route terproteksi dan operasi
          CRUD berbasis Authorization Bearer Token.
        </p>
        <Link className="button-link" href="/login">
          Uji MVP Sekarang
        </Link>
      </section>

      <footer className="footer-note">
        <p>
          Dibangun sebagai MVP assignment: bersih, terstruktur, dan siap dikembangkan ke database
          produksi serta role-based authorization.
        </p>
      </footer>
    </main>
  );
}
