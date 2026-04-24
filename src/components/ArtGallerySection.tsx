"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BeforeAfterReveal from "@/components/BeforeAfterReveal";
import { artGalleryAssets } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function ArtGallerySection() {
  // Ambil semua aset untuk ditampilkan di Bento Grid
  const assets = artGalleryAssets;

  return (
    <section
      style={{
        background: "var(--cream)",
        paddingBlock: "clamp(80px, 10vw, 140px)",
      }}
    >
      <div className="page-container">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "clamp(40px, 6vw, 80px)" }}
        >
          <p className="section-label">The Exhibition</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 5vw, 56px)",
                fontWeight: 500,
                color: "var(--deep-brown)",
                lineHeight: 1.1,
                maxWidth: 480,
              }}
            >
              Keahlian yang
              <br />
              <em>Berbicara Sendiri</em>
            </h2>
            <Link href="/reservation" style={{ textDecoration: "none" }}>
              <motion.button
                className="btn-outline"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ flexShrink: 0 }}
              >
                <span>Lihat Semua Layanan</span>
                <ArrowRight size={14} />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* ── Flexible Bento Grid ── */}
        {/* Kolom CSS untuk masonry yang super mulus tanpa cropping aspect ratio */}
        <div style={{ columnCount: "var(--gallery-cols, 1)", columnGap: "clamp(12px, 2vw, 24px)" }}>
          {assets.map((asset, i) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                breakInside: "avoid",
                marginBottom: "clamp(12px, 2vw, 24px)",
                position: "relative",
              }}
            >
              {asset.imageBefore ? (
                <BeforeAfterReveal
                  imageAfter={asset.imageAfter}
                  imageBefore={asset.imageBefore}
                  title={asset.title}
                  subtitle={asset.subtitle}
                />
              ) : (
                <div
                  className="gallery-photo-hover"
                  style={{
                    position: "relative",
                    borderRadius: "var(--radius-card)",
                    overflow: "hidden",
                    display: "flex",
                  }}
                >
                  <Image
                    src={asset.imageAfter}
                    alt={asset.title}
                    width={1000}
                    height={1000}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                  {/* Label overlay (always visible on bottom) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "24px 20px 16px",
                      background: "linear-gradient(to top, rgba(26,15,10,0.85), transparent)",
                      pointerEvents: "none",
                    }}
                  >
                    <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.60)", marginBottom: 4 }}>
                      {asset.subtitle ?? "Studio Work"}
                    </p>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 500, color: "white" }}>
                      {asset.title}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {/* Text Block included as a Bento Item */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              breakInside: "avoid",
              marginBottom: "clamp(12px, 2vw, 24px)",
              padding: "clamp(24px, 4vw, 40px)",
              background: "var(--deep-brown)",
              borderRadius: "var(--radius-card)",
              color: "white",
            }}
          >
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rose-300)", marginBottom: 16 }}>
              The Process
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 500, lineHeight: 1.3, marginBottom: 16 }}>
              Setiap karya adalah transformasi nyata.
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "rgba(255,255,255,0.50)", lineHeight: 1.7 }}>
              Teknisi kami mengerjakan setiap detail dengan presisi tinggi. Kualitas bahan dan keahlian yang teruji menciptakan hasil yang tahan lama dan menawan.
            </p>
          </motion.div>
        </div>

        {/* ── Responsive CSS for Masonry ── */}
        <style>{`
          @media (min-width: 640px) {
            :root { --gallery-cols: 2; }
          }
          @media (min-width: 1024px) {
            :root { --gallery-cols: 2; }
          }
        `}</style>

        {/* ── Caption ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 11,
            color: "var(--muted)",
            textAlign: "center",
            marginTop: 32,
            letterSpacing: "0.06em",
          }}
        >
          Foto asli dari studio Afterglam — @afterglam.id
        </motion.p>
      </div>
    </section>
  );
}
