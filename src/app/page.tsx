import Link from "next/link";

const highlights = [
  {
    label: "Auth layer",
    value: "JWT + Bearer header",
  },
  {
    label: "Access control",
    value: "Protected route + token check",
  },
  {
    label: "Data flow",
    value: "CRUD request per user session",
  },
];

const principles = [
  "Autentikasi dilakukan di server sebelum data dikirim.",
  "Tidak ada seeded account atau data contoh yang tampil ke publik.",
  "Setiap aksi CRUD memerlukan token aktif milik pengguna.",
  "Status loading, error, empty, dan success ditampilkan konsisten.",
];

const stack = ["Next.js App Router", "TypeScript", "Route Handlers", "JWT (jose)", "bcryptjs"];

export default function LandingPage() {
  return (
    <main className="landing-shell">
      <div className="container page-wrap landing-grid">
        <section className="hero card hero-split">
          <div className="hero-copy">
            <p className="eyebrow">JWT access system</p>
            <h1>Landing page yang lebih tenang, lebih tegas, dan tidak terasa seperti template tutorial.</h1>
            <p className="hero-description">
              Sistem ini menampilkan autentikasi JWT, route terproteksi, dan CRUD berbasis token dalam
              susunan yang ringkas untuk evaluasi teknis dan presentasi audit.
            </p>

            <div className="row hero-actions">
              <Link className="button-link" href="/register">
                Registrasi
              </Link>
              <Link className="button-link secondary-link" href="/login">
                Masuk
              </Link>
              <Link className="button-link ghost-link" href="/dashboard">
                Dashboard
              </Link>
            </div>
          </div>

          <aside className="hero-aside" aria-label="Ikhtisar sistem">
            <div className="signal-card signal-primary">
              <span>Access posture</span>
              <strong>Protected by bearer token</strong>
            </div>

            <div className="signal-card signal-secondary">
              <span>Data policy</span>
              <strong>No seeded user, no public dummy content</strong>
            </div>

            <div className="signal-stack">
              {highlights.map((item) => (
                <div key={item.label} className="signal-row">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="panel principle-panel">
          <div className="section-head">
            <p className="eyebrow">Clarification points</p>
            <h2>Hal yang diperjelas untuk audit</h2>
          </div>

          <div className="principle-grid">
            {principles.map((item) => (
              <article key={item} className="principle-item">
                <span className="principle-dot" aria-hidden="true" />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid two-columns compact-grid">
          <article className="panel surface-panel">
            <div className="section-head">
              <p className="eyebrow">Architecture</p>
              <h2>Struktur yang dipisah per tanggung jawab</h2>
            </div>
            <p>
              Frontend, route handler, auth utility, service client, dan store dipisah agar alur login
              dan CRUD mudah ditelusuri tanpa menampilkan perilaku seperti project latihan.
            </p>
          </article>

          <article className="panel surface-panel">
            <div className="section-head">
              <p className="eyebrow">Flow</p>
              <h2>Urutan interaksi pengguna</h2>
            </div>
            <ol className="list ordered subtle-list">
              <li>Registrasi akun baru.</li>
              <li>Login untuk menerima token aktif.</li>
              <li>Akses dashboard dan kelola data sendiri.</li>
              <li>Logout untuk menghapus token lokal.</li>
            </ol>
          </article>
        </section>

        <section className="panel tech-panel">
          <div className="section-head">
            <p className="eyebrow">Stack</p>
            <h2>Teknologi yang dipakai</h2>
          </div>
          <div className="chip-list">
            {stack.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="panel cta-panel final-cta">
          <div>
            <p className="eyebrow">Action</p>
            <h2>Masuk untuk melihat alur lengkapnya.</h2>
            <p>
              Tidak ada data contoh yang disamarkan sebagai konten publik. Semua entri berasal dari aksi
              pengguna saat runtime.
            </p>
          </div>
          <Link className="button-link" href="/login">
            Buka Formulir Masuk
          </Link>
        </section>

        <footer className="footer-note landing-footer">
          <p>
            Dokumen klarifikasi audit tersedia, dan implementasi tetap terbuka untuk pengembangan
            penyimpanan produksi serta kontrol akses berbasis peran.
          </p>
        </footer>
      </div>
    </main>
  );
}
