"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { serviceCategories, branches, getPopularServices, formatPrice } from "@/lib/data";
import CategoryIcon from "@/components/CategoryIcon";
import { MessageCircle, ArrowRight, MapPin, Clock, Star, Sparkles, Shield, Zap } from "lucide-react";
import DynamicIsland from "@/components/DynamicIsland";

/* ─── Fade-up wrapper ─── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── WhatsApp CTA (default branch = hq) ─── */
function WAButton({ text = "Hubungi Kami via WhatsApp", branch = "hq" }: { text?: string; branch?: "hq" | "kk" }) {
  const b = branches.find((x) => x.id === branch)!;
  const msg = encodeURIComponent("Halo Afterglam, saya ingin info lebih lanjut mengenai layanan dan reservasi. 🌸");
  return (
    <a href={`https://wa.me/${b.whatsapp}?text=${msg}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-block" }}>
      <motion.button className="btn-whatsapp" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <MessageCircle size={18} />
        <span>{text}</span>
      </motion.button>
    </a>
  );
}

/* ========================================================
   HERO
   ======================================================== */
function Hero() {
  return (
    <section
      className="hero-bg"
      style={{ paddingTop: "calc(var(--nav-height) + 60px)", paddingBottom: "clamp(60px, 10vw, 120px)", overflow: "hidden" }}
    >
      <div className="page-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center" }}>
          {/* Left — Text */}
          <div style={{ maxWidth: 580 }}>
            <FadeUp>
              <p className="section-label">The Afterglam Experience</p>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(36px, 6vw, 68px)",
                  fontWeight: 500,
                  color: "var(--deep-brown)",
                  lineHeight: 1.1,
                  marginBottom: 20,
                }}
              >
                Glam That
                <br />
                <em style={{ color: "var(--rose-500)" }}>Stays With You</em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p className="section-subtitle" style={{ marginBottom: 36 }}>
                Premium eyelash extension, eyebrow styling, nail care, dan waxing — tersedia di 2 studio Semarang.
                Pilih layanan, tentukan teknisi, dan booking dalam 30 detik.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <Link href="/reservation" style={{ textDecoration: "none" }}>
                  <motion.button className="btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Sparkles size={16} />
                    <span>Lihat Layanan & Harga</span>
                    <ArrowRight size={15} style={{ opacity: 0.7 }} />
                  </motion.button>
                </Link>
                <WAButton text="Tanya via WhatsApp" />
              </div>
            </FadeUp>

            {/* Stats */}
            <FadeUp delay={0.28}>
              <div style={{ display: "flex", gap: 32, marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
                {[
                  { value: "2", label: "Studio Aktif" },
                  { value: "25+", label: "Jenis Layanan" },
                  { value: "3", label: "Tier Teknisi" },
                  { value: "4.9★", label: "Rating Klien" },
                ].map((s) => (
                  <div key={s.label}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 600, color: "var(--deep-brown)" }}>{s.value}</p>
                    <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right — Logo / visual */}
          <FadeUp delay={0.1} className="">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                background: "white",
                borderRadius: 32,
                padding: "40px 48px",
                boxShadow: "var(--shadow-float)",
                border: "1px solid var(--border)",
                textAlign: "center",
              }}>
                <Image
                  src="/logo.png"
                  alt="The Afterglam — Lashes & More"
                  width={260}
                  height={100}
                  style={{ objectFit: "contain", width: "100%", height: "auto", maxWidth: 260 }}
                  priority
                />
                <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 4 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} color="#d98874" fill="#d98874" />
                  ))}
                </div>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
                  Dipercaya ribuan klien di Semarang
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ========================================================
   CATEGORIES SECTION
   ======================================================== */
function CategoriesSection() {
  return (
    <section className="section section-bg-white">
      <div className="page-container">
        <FadeUp>
          <p className="section-label">Layanan Kami</p>
          <h2 className="section-title">4 Kategori <em>Kecantikan Premium</em></h2>
          <p className="section-subtitle" style={{ marginBottom: 48 }}>
            Setiap layanan ditangani teknisi tersertifikasi dengan produk berkualitas tinggi.
          </p>
        </FadeUp>

        <div className="category-grid">
          {serviceCategories.map((cat, i) => (
            <FadeUp key={cat.id} delay={i * 0.08}>
              <Link href={`/reservation?category=${cat.id}`} style={{ textDecoration: "none" }}>
                <motion.div
                  className="category-card"
                  style={{ background: cat.bgColor, borderColor: "transparent" }}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 20,
                    boxShadow: "var(--shadow-xs)",
                  }}>
                    <CategoryIcon type={cat.iconType} size={24} color={cat.color} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, color: "var(--deep-brown)", marginBottom: 8 }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 16 }}>
                    {cat.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: cat.color }}>
                      {cat.services.length} layanan
                    </span>
                    <ArrowRight size={14} color={cat.color} />
                  </div>
                </motion.div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================
   POPULAR SERVICES PRICELIST
   ======================================================== */
function PricelistSection() {
  const popular = getPopularServices(6);

  return (
    <section className="section hero-bg">
      <div className="page-container">
        <FadeUp>
          <p className="section-label">Pricelist Unggulan</p>
          <h2 className="section-title">Layanan <em>Paling Diminati</em></h2>
          <p className="section-subtitle" style={{ marginBottom: 12 }}>
            Harga mulai dari teknisi Regular. Kunjungi halaman Reservasi untuk cek harga lengkap per cabang.
          </p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--rose-500)", fontWeight: 600, marginBottom: 40 }}>
            * Harga berbeda per cabang (Central vs KK)
          </p>
        </FadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0, background: "white", borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}>
          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 0, background: "var(--earth-50)", padding: "14px 20px", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Layanan</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "right", minWidth: 90 }}>Regular</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "right", minWidth: 90 }}>Premium</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "right", minWidth: 90 }}>Manager</span>
          </div>

          {popular.map(({ service, category }, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto auto",
                gap: 0,
                padding: "16px 20px",
                borderBottom: i < popular.length - 1 ? "1px solid var(--border)" : "none",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <CategoryIcon type={category.iconType} size={14} color={category.color} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "var(--deep-brown)" }}>{service.name}</span>
                  {service.badge && (
                    <span className={`badge ${service.badge === "Bestseller" ? "badge-rose" : "badge-earth"}`}>{service.badge}</span>
                  )}
                </div>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)" }}>{service.duration}</span>
              </div>
              {(["regular", "premium", "manager"] as const).map((tier) => (
                <span key={tier} style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 500, color: "var(--rose-600)", textAlign: "right", minWidth: 90, fontVariantNumeric: "tabular-nums" }}>
                  {formatPrice(service.pricing.hq[tier])}
                </span>
              ))}
            </motion.div>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/reservation" style={{ textDecoration: "none" }}>
              <motion.button className="btn-outline" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <span>Lihat Semua Layanan & Harga</span>
                <ArrowRight size={15} />
              </motion.button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ========================================================
   WHY AFTERGLAM
   ======================================================== */
function WhySection() {
  const reasons = [
    { icon: <Shield size={22} color="var(--rose-500)" />, title: "Teknisi Bersertifikat", desc: "Setiap teknisi telah melalui pelatihan dan sertifikasi intensif untuk memastikan standar kualitas tertinggi." },
    { icon: <Star size={22} color="var(--rose-500)" />, title: "Produk Premium", desc: "Kami hanya menggunakan bahan dan produk berstandar internasional yang aman untuk kulit sensitif sekalipun." },
    { icon: <Zap size={22} color="var(--rose-500)" />, title: "Booking Instan", desc: "Tanpa antri lama — pilih layanan, tentukan teknisi, dan konfirmasi jadwal langsung via WhatsApp dalam hitungan detik." },
  ];

  return (
    <section className="section section-bg-dark">
      <div className="page-container">
        <FadeUp>
          <p className="section-label" style={{ color: "var(--rose-300)" }}>Kenapa Afterglam?</p>
          <h2 className="section-title" style={{ color: "white" }}>
            Premium bukan sekadar<br /><em style={{ color: "var(--rose-300)" }}>kata-kata</em>
          </h2>
        </FadeUp>

        <div className="features-grid" style={{ marginTop: 48 }}>
          {reasons.map((r, i) => (
            <FadeUp key={r.title} delay={i * 0.1}>
              <div style={{ padding: "28px", borderRadius: "var(--radius-card)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <div style={{ marginBottom: 16 }}>{r.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "white", marginBottom: 10 }}>{r.title}</h3>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{r.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================
   BRANCHES
   ======================================================== */
function BranchesSection() {
  return (
    <section className="section section-bg-white">
      <div className="page-container">
        <FadeUp>
          <p className="section-label">Lokasi Studio</p>
          <h2 className="section-title">Dua Studio, <em>Satu Standar</em></h2>
          <p className="section-subtitle" style={{ marginBottom: 48 }}>Temukan studio terdekat dan nikmati layanan premium Afterglam.</p>
        </FadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {branches.map((b, i) => {
            const msg = encodeURIComponent(`Halo Afterglam ${b.shortName}, saya ingin reservasi. Mohon info ketersediaan jadwal. 🌸`);
            return (
              <FadeUp key={b.id} delay={i * 0.1}>
                <div className="card" style={{ padding: "28px" }}>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700, color: "var(--rose-500)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>
                    {b.tagline}
                  </p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "var(--deep-brown)", marginBottom: 16 }}>
                    {b.name}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <MapPin size={14} color="var(--muted)" />
                      <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--muted)" }}>{b.address}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Clock size={14} color="var(--muted)" />
                      <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--muted)" }}>{b.hours}</span>
                    </div>
                  </div>
                  <a href={`https://wa.me/${b.whatsapp}?text=${msg}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <button className="btn-whatsapp" style={{ width: "100%", padding: "13px 20px", fontSize: 14 }}>
                      <MessageCircle size={16} />
                      <span>WhatsApp {b.shortName}</span>
                    </button>
                  </a>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ========================================================
   BOOKING CTA BANNER
   ======================================================== */
function CTABanner() {
  return (
    <section className="section-sm" style={{ background: "linear-gradient(135deg, var(--rose-600), var(--rose-500))" }}>
      <div className="page-container" style={{ textAlign: "center" }}>
        <FadeUp>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 500, color: "white", marginBottom: 12, lineHeight: 1.2 }}>
            Siap Tampil Glam Hari Ini?
          </h2>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 15, color: "rgba(255,255,255,0.80)", marginBottom: 32 }}>
            Booking sekarang — tanpa ribet, tanpa antri.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/reservation" style={{ textDecoration: "none" }}>
              <motion.button
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 28px", borderRadius: "var(--radius-pill)", border: "2px solid white", background: "white", color: "var(--rose-600)", fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 700, cursor: "pointer" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Sparkles size={16} />
                <span>Lihat Semua Layanan</span>
              </motion.button>
            </Link>
            <WAButton text="Booking via WhatsApp" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ========================================================
   FOOTER
   ======================================================== */
function Footer() {
  return (
    <footer style={{ background: "var(--dark-900)", padding: "48px 0 32px" }}>
      <div className="page-container">
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between" }}>
            {/* Brand */}
            <div style={{ maxWidth: 260 }}>
              <Image src="/logo.png" alt="Afterglam" width={160} height={60} style={{ objectFit: "contain", width: 160, height: "auto", filter: "brightness(0) invert(1) opacity(0.85)", marginBottom: 12 }} />
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                Studio kecantikan premium untuk eyelash, eyebrow, nails & waxing.
              </p>
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Layanan</p>
                {serviceCategories.map((c) => (
                  <p key={c.id} style={{ marginBottom: 8 }}>
                    <Link href={`/reservation?category=${c.id}`} style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
                      {c.name}
                    </Link>
                  </p>
                ))}
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Studio</p>
                {branches.map((b) => (
                  <div key={b.id} style={{ marginBottom: 10 }}>
                    <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "rgba(255,255,255,0.70)", fontWeight: 500 }}>{b.name}</p>
                    <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{b.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr style={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
            © {new Date().getFullYear()} The Afterglam — Lashes & More. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ========================================================
   MAIN PAGE EXPORT
   ======================================================== */
export default function LandingPage() {
  return (
    <>
      <DynamicIsland />
      <main>
        <Hero />
        <CategoriesSection />
        <PricelistSection />
        <WhySection />
        <BranchesSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
