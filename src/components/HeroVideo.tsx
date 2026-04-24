"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { branches } from "@/lib/data";

export default function HeroVideo() {
  const hq = branches[0];
  const msg = encodeURIComponent("Halo Afterglam, saya ingin info layanan dan reservasi. 🌸");

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--dark-900)",
      }}
    >
      {/* ── VIDEO (right side, full bleed) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.7,
          }}
          poster="/Video/Thumbnail_Nail_reels.jpg"
        >
          <source src="/Video/Nail_reels.mp4" type="video/mp4" />
        </video>

        {/* Desktop: left-side gradient to protect text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(26,15,10,0.97) 0%, rgba(26,15,10,0.85) 40%, rgba(26,15,10,0.30) 65%, transparent 100%)",
          }}
        />
        {/* Mobile: full overlay for text safety */}
        <div
          className="mobile-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(26,15,10,0.65)",
          }}
        />
      </div>

      {/* ── TEXT CONTENT ── */}
      <div
        className="page-container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "clamp(100px, 15vw, 160px)",
          paddingBottom: "clamp(80px, 12vw, 140px)",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--rose-300)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: 20,
            }}
          >
            The Afterglam Experience
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(42px, 6.5vw, 80px)",
              fontWeight: 500,
              color: "white",
              lineHeight: 1.05,
              marginBottom: 24,
            }}
          >
            Glam That
            <br />
            <em style={{ color: "var(--rose-300)" }}>Stays</em>
            <br />
            With You.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.8vw, 17px)",
              color: "rgba(255,255,255,0.60)",
              lineHeight: 1.75,
              marginBottom: 40,
              maxWidth: 420,
            }}
          >
            Studio kecantikan premium — eyelash, brow, nails & waxing.
            Booking langsung via WhatsApp dalam 30 detik.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.5 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <Link href="/reservation" style={{ textDecoration: "none" }}>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{ background: "white", color: "var(--deep-brown)" }}
              >
                <Sparkles size={16} />
                <span>Lihat Layanan & Harga</span>
                <ArrowRight size={14} style={{ opacity: 0.6 }} />
              </motion.button>
            </Link>
            <a
              href={`https://wa.me/${hq.whatsapp}?text=${msg}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <motion.button
                className="btn-whatsapp"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={16} />
                <span>Tanya via WhatsApp</span>
              </motion.button>
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{
              display: "flex",
              gap: 32,
              marginTop: 56,
              paddingTop: 28,
              borderTop: "1px solid rgba(255,255,255,0.10)",
              flexWrap: "wrap",
            }}
          >
            {[
              { v: "2", l: "Studio" },
              { v: "25+", l: "Layanan" },
              { v: "3", l: "Tier Teknisi" },
            ].map((s) => (
              <div key={s.l}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,3vw,32px)", fontWeight: 600, color: "white" }}>
                  {s.v}
                </p>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {s.l}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)" }}>
          Scroll
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
