"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  serviceCategories, branches, getPopularServices, formatPrice,
} from "@/lib/data";
import { useReservationStore } from "@/store/useReservationStore";
import CategoryIcon from "@/components/CategoryIcon";
import DynamicIsland from "@/components/DynamicIsland";
import HeroVideo from "@/components/HeroVideo";
import ArtGallerySection from "@/components/ArtGallerySection";
import { MessageCircle, ArrowRight, MapPin, Clock, Shield, Zap, Sparkles } from "lucide-react";

/* ── Fade-up helper ── */
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ── WA Button ── */
function WAButton({ text, branch = "hq" }: { text: string; branch?: "hq" | "kk" }) {
  const b = branches.find((x) => x.id === branch)!;
  const msg = encodeURIComponent("Halo Afterglam, saya ingin info layanan dan reservasi. 🌸");
  return (
    <a href={`https://wa.me/${b.whatsapp}?text=${msg}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      <motion.button className="btn-whatsapp" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <MessageCircle size={16} />
        <span>{text}</span>
      </motion.button>
    </a>
  );
}

/* ======================================================
   SERVICES OVERVIEW — 4 category cards, editorial spacing
   ====================================================== */
function ServicesSection() {
  return (
    <section style={{ background: "white", paddingBlock: "clamp(80px, 10vw, 140px)" }}>
      <div className="page-container">
        <FadeUp>
          <p className="section-label">Layanan Kami</p>
          <h2 className="section-title">
            Empat Kategori<br /><em>Kecantikan Premium</em>
          </h2>
          <p className="section-subtitle" style={{ marginBottom: "clamp(40px, 6vw, 72px)" }}>
            Ditangani teknisi tersertifikasi dengan produk berstandar internasional.
          </p>
        </FadeUp>

        <div className="category-grid">
          {serviceCategories.map((cat, i) => (
            <FadeUp key={cat.id} delay={i * 0.07}>
              <Link href={`/reservation?category=${cat.id}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <motion.div
                  className="category-card"
                  style={{ background: cat.bgColor, borderColor: "transparent", height: "100%" }}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: "white", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "var(--shadow-xs)" }}>
                    <CategoryIcon type={cat.iconType} size={24} color={cat.color} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, color: "var(--deep-brown)", marginBottom: 8 }}>{cat.name}</h3>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 20 }}>{cat.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "auto" }}>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: cat.color }}>{cat.services.length} layanan</span>
                    <ArrowRight size={13} color={cat.color} />
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

/* ======================================================
   PRICELIST — Branch-synced via Zustand
   ====================================================== */
function PricelistSection() {
  const { activeBranch, setDefaultBranch, openBranchModal } = useReservationStore();

  // Auto-default to HQ — must be in effect, never during render
  useEffect(() => { setDefaultBranch(); }, []);

  const branch = activeBranch ?? "hq";
  const popular = getPopularServices(6);

  return (
    <section style={{ paddingBlock: "clamp(80px, 10vw, 140px)", background: "var(--earth-50)" }}>
      <div className="page-container">
        <FadeUp>
          <p className="section-label">Pricelist</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 8 }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Layanan <em>Paling Diminati</em>
            </h2>
            {/* Branch switcher pill */}
            <div style={{ display: "flex", gap: 6, background: "white", padding: "4px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", flexShrink: 0 }}>
              {branches.map((b) => (
                <button
                  key={b.id}
                  onClick={() => useReservationStore.getState().setBranch(b.id)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "var(--radius-pill)",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-ui)",
                    fontSize: 12,
                    fontWeight: 700,
                    transition: "all 0.22s ease",
                    background: branch === b.id ? "var(--deep-brown)" : "transparent",
                    color: branch === b.id ? "white" : "var(--muted)",
                  }}
                >
                  {b.shortName}
                </button>
              ))}
            </div>
          </div>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--rose-500)", fontWeight: 600, marginBottom: "clamp(28px, 4vw, 48px)" }}>
            Menampilkan harga cabang {branch === "hq" ? "Central" : "KK"} · Klik cabang untuk switch
          </p>
        </FadeUp>

        {/* Table */}
        <div style={{ background: "white", borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 100px", background: "var(--earth-100)", padding: "14px 20px", borderBottom: "1px solid var(--border)", gap: 0 }}>
            {["Layanan", "Regular", "Premium", "Manager"].map((h, i) => (
              <span key={h} style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: i > 0 ? "right" : "left" }}>{h}</span>
            ))}
          </div>

          {popular.map(({ service, category }, i) => (
            <AnimatePresence key={service.id} mode="wait">
              <motion.div
                key={`${service.id}-${branch}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 100px", padding: "16px 20px", borderBottom: i < popular.length - 1 ? "1px solid var(--border)" : "none", alignItems: "center", gap: 0 }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <CategoryIcon type={category.iconType} size={13} color={category.color} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "var(--deep-brown)" }}>{service.name}</span>
                    {service.badge && <span className={`badge ${service.badge === "Bestseller" ? "badge-rose" : "badge-earth"}`}>{service.badge}</span>}
                  </div>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)" }}>{service.duration}</span>
                </div>
                {(["regular", "premium", "manager"] as const).map((tier) => (
                  <span key={tier} style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 500, color: "var(--rose-600)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {formatPrice(service.pricing[branch][tier])}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          ))}
        </div>

        <FadeUp delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/reservation" style={{ textDecoration: "none" }}>
              <motion.button className="btn-outline" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <span>Lihat Semua Layanan & Harga</span>
                <ArrowRight size={14} />
              </motion.button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ======================================================
   WHY SECTION — dark, editorial
   ====================================================== */
function WhySection() {
  return (
    <section style={{ background: "var(--deep-brown)", paddingBlock: "clamp(80px, 10vw, 140px)" }}>
      <div className="page-container">
        <FadeUp>
          <p className="section-label" style={{ color: "var(--rose-300)" }}>Mengapa Afterglam</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 500, color: "white", lineHeight: 1.15, marginBottom: "clamp(40px, 6vw, 72px)", maxWidth: 480 }}>
            Bukan sekadar salon.<br /><em style={{ color: "var(--rose-300)" }}>Sebuah pengalaman.</em>
          </h2>
        </FadeUp>

        <div className="features-grid">
          {[
            { icon: <Shield size={20} color="var(--rose-400)" />, title: "Teknisi Bersertifikat", desc: "Setiap teknisi dilatih intensif dan tersertifikasi sebelum menangani klien." },
            { icon: <Sparkles size={20} color="var(--rose-400)" />, title: "Produk Berstandar Int'l", desc: "Kami menggunakan produk premium yang aman untuk kulit sensitif sekalipun." },
            { icon: <Zap size={20} color="var(--rose-400)" />, title: "Booking 30 Detik", desc: "Pilih layanan, tentukan teknisi, konfirmasi via WhatsApp — selesai." },
          ].map((r, i) => (
            <FadeUp key={r.title} delay={i * 0.1}>
              <div style={{ padding: "clamp(20px, 3vw, 32px)", borderRadius: "var(--radius-card)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ marginBottom: 16 }}>{r.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "white", marginBottom: 10 }}>{r.title}</h3>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "rgba(255,255,255,0.50)", lineHeight: 1.7 }}>{r.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   BRANCHES
   ====================================================== */
function BranchesSection() {
  return (
    <section style={{ background: "white", paddingBlock: "clamp(80px, 10vw, 140px)" }}>
      <div className="page-container">
        <FadeUp>
          <p className="section-label">Lokasi</p>
          <h2 className="section-title">Dua Studio, <em>Satu Standar</em></h2>
          <p className="section-subtitle" style={{ marginBottom: "clamp(36px, 5vw, 64px)" }}>Temukan studio Afterglam terdekat di Semarang.</p>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {branches.map((b, i) => {
            const msg = encodeURIComponent(`Halo Afterglam ${b.shortName}, saya ingin reservasi. Mohon info ketersediaan. 🌸`);
            return (
              <FadeUp key={b.id} delay={i * 0.1}>
                <div className="card" style={{ padding: "clamp(20px, 3vw, 32px)" }}>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700, color: "var(--rose-500)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>{b.tagline}</p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "var(--deep-brown)", marginBottom: 16 }}>{b.name}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <MapPin size={13} color="var(--muted)" />
                      <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--muted)" }}>{b.address}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Clock size={13} color="var(--muted)" />
                      <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--muted)" }}>{b.hours}</span>
                    </div>
                  </div>
                  <a href={`https://wa.me/${b.whatsapp}?text=${msg}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <button className="btn-whatsapp" style={{ width: "100%", padding: "13px 20px", fontSize: 14 }}>
                      <MessageCircle size={15} />
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

/* ======================================================
   CTA BANNER
   ====================================================== */
function CTABanner() {
  return (
    <section style={{ background: "linear-gradient(135deg, var(--rose-700), var(--rose-500))", paddingBlock: "clamp(60px, 8vw, 100px)" }}>
      <div className="page-container" style={{ textAlign: "center" }}>
        <FadeUp>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 500, color: "white", lineHeight: 1.15, marginBottom: 12 }}>
            Siap Tampil Glam<br /><em>Hari Ini?</em>
          </h2>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 15, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>
            Booking sekarang — tanpa ribet, tanpa antri.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/reservation" style={{ textDecoration: "none" }}>
              <motion.button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: "var(--radius-pill)", border: "2px solid white", background: "white", color: "var(--rose-600)", fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 700, cursor: "pointer" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Sparkles size={15} />
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

/* ======================================================
   FOOTER
   ====================================================== */
function Footer() {
  return (
    <footer style={{ background: "var(--dark-900)", padding: "clamp(40px, 6vw, 72px) 0 32px" }}>
      <div className="page-container">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between", marginBottom: 40 }}>
          <div style={{ maxWidth: 240 }}>
            <Image src="/logo.png" alt="Afterglam" width={140} height={54} style={{ objectFit: "contain", width: 140, height: "auto", filter: "brightness(0) invert(1) opacity(0.80)", marginBottom: 14 }} />
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "rgba(255,255,255,0.40)", lineHeight: 1.7 }}>
              Studio kecantikan premium — eyelash, brow, nails & waxing.
            </p>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>Layanan</p>
              {serviceCategories.map((c) => (
                <p key={c.id} style={{ marginBottom: 8 }}>
                  <Link href={`/reservation?category=${c.id}`} style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "rgba(255,255,255,0.50)", textDecoration: "none" }}>{c.name}</Link>
                </p>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>Studio</p>
              {branches.map((b) => (
                <div key={b.id} style={{ marginBottom: 12 }}>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{b.name}</p>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "rgba(255,255,255,0.30)" }}>{b.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "rgba(255,255,255,0.20)", textAlign: "center" }}>
            © {new Date().getFullYear()} The Afterglam — Lashes & More. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ======================================================
   PAGE ROOT
   ====================================================== */
export default function LandingPage() {
  return (
    <>
      <DynamicIsland />
      <main>
        <HeroVideo />
        <ServicesSection />
        <ArtGallerySection />
        <PricelistSection />
        <WhySection />
        <BranchesSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
