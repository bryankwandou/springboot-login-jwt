"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Database,
  FileText,
  Globe2,
  LayoutDashboard,
  LockKeyhole,
  Newspaper,
  PhoneCall,
  PlugZap,
  Scale,
  ShieldCheck,
  Sparkles,
  TreePine,
  Workflow,
} from "lucide-react";
import { Link000 } from "@/components/ui/skiper-ui/skiper40";

const TIMING = {
  hero: 0,
  visual: 0.12,
  cardBase: 0.18,
  cardStep: 0.08,
  sectionBase: 0.08,
};

const checks = [
  "Narasi halaman depan diarahkan ke citra perusahaan energi dan infrastruktur digital.",
  "Akses internal tetap tersedia lewat menu Masuk dan Dashboard untuk kebutuhan presentasi.",
  "Seluruh teks ditulis ulang agar tidak meniru satu per satu referensi korporat yang kamu kirim.",
  "Struktur halaman sudah siap dipakai sebagai dummy presentasi sambil menunggu integrasi backend final.",
];

const flow = [
  {
    label: "Layanan Publik",
    detail: "Beranda memuat gambaran bisnis, layanan utama, dan arah transformasi perusahaan.",
    icon: Globe2,
  },
  {
    label: "Login Internal",
    detail: "Area staf dibatasi dengan sesi login agar dashboard tidak tampil sebagai halaman publik.",
    icon: LockKeyhole,
  },
  {
    label: "Panel Operasional",
    detail: "Tim demo dapat menunjukkan alur input, pemantauan, dan pembaruan data kerja.",
    icon: LayoutDashboard,
  },
  {
    label: "Siap Dikembangkan",
    detail: "Fondasi yang ada tetap bisa dilanjutkan ke Neon dan layanan backend produksi.",
    icon: Database,
  },
];

const proof = [
  { value: "49,2 GW", label: "kapasitas daya simulasi" },
  { value: "74,9 ribu km", label: "jaringan transmisi simulasi" },
  { value: "96 juta+", label: "cakupan pelanggan dummy" },
];

const stack = ["Corporate Landing", "Internal Login", "Dashboard Demo", "JWT Session", "Neon Ready", "Vercel Deploy"];

const reports = [
  {
    title: "Laporan Kinerja 2026",
    description: "Ringkasan capaian perusahaan, langkah strategis, dan arah penguatan layanan untuk periode berjalan.",
  },
  {
    title: "Statistik Operasional 2026",
    description: "Ikhtisar awal mengenai distribusi layanan, penyaluran energi, dan penugasan operasional sebelum finalisasi audit.",
  },
];

const serviceCards = [
  {
    icon: PlugZap,
    title: "Pengembangan energi baru",
    description: "Program penguatan portofolio pembangkit rendah emisi dan modernisasi sistem kelistrikan.",
  },
  {
    icon: TreePine,
    title: "Agenda keberlanjutan",
    description: "Arah kerja yang menyeimbangkan keandalan pasokan, target emisi, dan dampak sosial.",
  },
  {
    icon: ShieldCheck,
    title: "Keandalan layanan",
    description: "Pemantauan sistem, perlindungan akses internal, dan standardisasi proses yang lebih tertib.",
  },
];

const customerInfo = [
  {
    icon: FileText,
    title: "Informasi tarif",
    description: "Rangkuman kebijakan tarif, kelompok layanan, dan pembaruan acuan perhitungan.",
  },
  {
    icon: Scale,
    title: "Jaminan pelanggan",
    description: "Penjelasan singkat mengenai deposit layanan, syarat, dan ketentuan yang berlaku.",
  },
  {
    icon: Workflow,
    title: "Kepatuhan pemakaian",
    description: "Panduan penggunaan tenaga listrik secara tertib, aman, dan sesuai ketentuan teknis.",
  },
  {
    icon: CircleHelp,
    title: "Pertanyaan umum",
    description: "Jawaban cepat untuk pertanyaan yang paling sering muncul dari pelanggan maupun mitra.",
  },
];

const newsItems = [
  "Pembaruan sistem regional dan langkah mitigasi layanan untuk semester kedua.",
  "Rapat umum tahunan menetapkan fokus baru bagi tata kelola dan efisiensi operasi.",
  "Program sosial dan pemberdayaan masyarakat diperluas ke wilayah prioritas tahun berjalan.",
];

export function LandingClient() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="site-main">
      <section className="hero-section">
        <div className="container hero-layout">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="show"
            variants={reveal}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: TIMING.hero }}
          >
            <p className="section-kicker">NusaKarya Systems</p>
            <h1>Mempercepat layanan energi yang andal, tertata, dan siap ditampilkan di hadapan pemangku kepentingan.</h1>
            <p className="hero-lead">
              Ini adalah simulasi website korporat untuk perusahaan energi dan infrastruktur. Halaman
              depan memuat profil singkat, laporan, area layanan, dan akses menuju dashboard internal
              yang bisa dipakai saat presentasi.
            </p>

            <div className="hero-actions" aria-label="Aksi utama">
              <Link className="button button-primary" href="/dashboard">
                Masuk ke Dashboard
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link className="button button-secondary" href="/login">
                Login Internal
              </Link>
            </div>

            <div className="hero-link-row">
              <Link000 href="/register" className="fine-link">
                Buat akun demo untuk uji alur internal
              </Link000>
            </div>
          </motion.div>

          <motion.div
            className="product-visual"
            initial={{ opacity: reduceMotion ? 1 : 0, rotateX: reduceMotion ? 0 : 8, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 110, damping: 18, delay: TIMING.visual }}
            aria-label="Ringkasan perusahaan"
          >
            <div className="visual-toolbar">
              <span />
              <span />
              <span />
            </div>
            <div className="token-strip">
              <Sparkles aria-hidden="true" size={18} />
              <span>Corporate Energy Portal / Internal Access / Executive Control Desk</span>
            </div>
            <div className="flow-stack">
              {flow.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    className="flow-card"
                    key={item.label}
                    initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                      delay: TIMING.cardBase + index * TIMING.cardStep,
                    }}
                  >
                    <Icon aria-hidden="true" size={20} />
                    <div>
                      <strong>{item.label}</strong>
                      <p>{item.detail}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
            <div className="data-cube" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container proof-grid" aria-label="Ringkasan kemampuan">
        {proof.map((item, index) => (
          <motion.article
            className="proof-card"
            key={item.label}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={reveal}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ type: "spring", stiffness: 130, damping: 18, delay: index * TIMING.sectionBase }}
          >
            <span>{item.value}</span>
            <p>{item.label}</p>
          </motion.article>
        ))}
      </section>

      <section className="container section-grid">
        <article className="content-panel">
          <p className="section-kicker">Tentang Perusahaan</p>
          <h2>Website dummy ini dibangun untuk menampilkan citra korporat yang lebih dewasa dan siap presentasi.</h2>
          <p>
            Fokusnya bukan lagi demo aplikasi teknis yang kaku, melainkan tampilan perusahaan yang
            meyakinkan. Pengunjung melihat layanan inti, pembaruan perusahaan, serta jalur masuk yang
            jelas menuju area internal bagi pengguna yang berwenang.
          </p>
        </article>

        <article className="content-panel checklist-panel">
          <p className="section-kicker">Yang Bisa Ditunjukkan</p>
          <ul className="clean-list">
            {checks.map((item) => (
              <li key={item}>
                <CheckCircle2 aria-hidden="true" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="container system-section">
        <div className="section-heading">
          <p className="section-kicker">Sorotan Laporan</p>
          <h2>Dua panel ini dapat dipakai sebagai pengganti area laporan tahunan dan statistik operasional.</h2>
        </div>

        <div className="feature-grid">
          {reports.map((report, index) => (
            <motion.article
              key={report.title}
              className="feature-card"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={reveal}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 130, damping: 18, delay: index * TIMING.sectionBase }}
            >
              <FileText aria-hidden="true" size={22} />
              <h3>{report.title}</h3>
              <p>{report.description}</p>
            </motion.article>
          ))}
          <motion.article
            className="feature-card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ type: "spring", stiffness: 130, damping: 18, delay: 0.16 }}
          >
            <LayoutDashboard aria-hidden="true" size={22} />
            <h3>Panel pengendali internal</h3>
            <p>Dashboard tetap tersedia sebagai pintu masuk untuk menampilkan monitoring data pada sesi demo.</p>
          </motion.article>
        </div>
      </section>

      <section className="container system-section" id="solusi">
        <div className="section-heading">
          <p className="section-kicker">Arah Bisnis</p>
          <h2>Struktur konten diarahkan ke perusahaan energi yang menggarap layanan publik, operasi, dan transformasi berkelanjutan.</h2>
        </div>

        <div className="feature-grid">
          {serviceCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                className="feature-card"
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={reveal}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 130, damping: 18, delay: index * TIMING.sectionBase }}
              >
                <Icon aria-hidden="true" size={22} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="container section-grid" id="tentang">
        <article className="content-panel">
          <p className="section-kicker">Sustainability</p>
          <h2>Perjalanan keberlanjutan dijelaskan sebagai komitmen jangka panjang, bukan slogan singkat.</h2>
          <p>
            Narasi yang dipakai menekankan keandalan layanan, pengembangan energi yang lebih bersih,
            dan keterlibatan sosial yang memberi manfaat nyata bagi masyarakat serta kawasan yang
            dilayani perusahaan.
          </p>
        </article>

        <article className="content-panel checklist-panel">
          <p className="section-kicker">Fokus Dampak</p>
          <ul className="clean-list">
            {[
              "Keandalan layanan dipadukan dengan arah pengurangan emisi.",
              "Program sosial diposisikan sebagai bagian dari strategi perusahaan.",
              "Aset digital dan dashboard dipakai untuk menunjukkan kesiapan operasional.",
              "Bahasa korporat dibuat lebih manusiawi dan tidak terdengar seperti template.",
            ].map((item) => (
              <li key={item}>
                <CheckCircle2 aria-hidden="true" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="container system-section">
        <div className="section-heading">
          <p className="section-kicker">Informasi Pelanggan</p>
          <h2>Blok ini meniru kebutuhan halaman korporat yang menyediakan akses cepat ke informasi layanan.</h2>
        </div>

        <div className="feature-grid">
          {customerInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                className="feature-card"
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={reveal}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 130, damping: 18, delay: index * TIMING.sectionBase }}
              >
                <Icon aria-hidden="true" size={22} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="container section-grid">
        <article className="content-panel">
          <p className="section-kicker">Ruang Berita</p>
          <h2>Bagian media ini memberi kesan bahwa website dikelola aktif dan memiliki ritme komunikasi korporat.</h2>
          <p>
            Saat demo, kamu bisa menyebut area ini sebagai wadah siaran pers, pembaruan manajemen,
            dan kabar lapangan yang berkaitan dengan layanan maupun program sosial perusahaan.
          </p>
        </article>

        <article className="content-panel checklist-panel">
          <p className="section-kicker">Update Terkini</p>
          <ul className="clean-list">
            {newsItems.map((item) => (
              <li key={item}>
                <Newspaper aria-hidden="true" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="container section-grid">
        <article className="content-panel">
          <p className="section-kicker">Aplikasi Layanan</p>
          <h2>Tambahkan jalur yang terasa akrab bagi pengguna: pengaduan, sambungan baru, dan pembayaran.</h2>
          <p>
            Walau ini masih dummy, strukturnya sudah pas untuk diarahkan ke portal pelanggan, formulir
            digital, atau layanan aplikasi seluler perusahaan pada tahap berikutnya.
          </p>
        </article>

        <article className="content-panel checklist-panel">
          <p className="section-kicker">Akses Cepat</p>
          <ul className="clean-list">
            {[
              "Pengaduan dan tindak lanjut layanan.",
              "Permohonan sambungan dan perubahan daya.",
              "Pembayaran, token, serta informasi akun pelanggan.",
              "Kontak pusat bantuan dan kanal komunikasi resmi.",
            ].map((item) => (
              <li key={item}>
                <PhoneCall aria-hidden="true" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="container stack-band" aria-label="Teknologi">
        {stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>
    </main>
  );
}
