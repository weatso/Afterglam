"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useReservationStore } from "@/store/useReservationStore";
import { branches } from "@/lib/data";
import { MapPin, Clock, X, MessageCircle, ChevronDown } from "lucide-react";

/* ─────────────────────────────────────────────
   BRANCH SELECTION MODAL
───────────────────────────────────────────── */
function BranchModal() {
  const { activeBranch, isBranchModalOpen, closeBranchModal, setBranch } = useReservationStore();

  return (
    <AnimatePresence>
      {isBranchModalOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={activeBranch ? closeBranchModal : undefined}
          />

          {/* Modal */}
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <p className="section-label" style={{ marginBottom: 8 }}>Selamat Datang</p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,4vw,28px)", fontWeight: 500, color: "var(--deep-brown)", lineHeight: 1.2 }}>
                  Pilih <em>Studio Terdekat</em>
                </h2>
              </div>
              {activeBranch && (
                <button
                  onClick={closeBranchModal}
                  style={{ background: "var(--earth-100)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
                  aria-label="Tutup"
                >
                  <X size={16} color="var(--deep-brown)" />
                </button>
              )}
            </div>

            {/* Branch list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {branches.map((b) => (
                <motion.button
                  key={b.id}
                  className={`branch-card ${activeBranch === b.id ? "selected" : ""}`}
                  onClick={() => setBranch(b.id)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700, color: "var(--rose-500)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>
                        {b.tagline}
                      </p>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "var(--deep-brown)", marginBottom: 10 }}>
                        {b.name}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <MapPin size={12} color="var(--muted)" />
                        <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--muted)" }}>{b.address}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Clock size={12} color="var(--muted)" />
                        <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--muted)" }}>{b.hours}</span>
                      </div>
                    </div>

                    {/* Selected check */}
                    {activeBranch === b.id && (
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--rose-500)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                          <path d="M1 4.5L4 7.5L10 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 20 }}>
              Harga disesuaikan otomatis per cabang ✦
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   MORPHING NAV HEADER (Dynamic Island V2)
───────────────────────────────────────────── */
export default function DynamicIsland() {
  const { activeBranch, openBranchModal } = useReservationStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) setIsScrolled(true);
    if (latest <= 50 && isScrolled) setIsScrolled(false);
  });

  const branch = branches.find((b) => b.id === activeBranch);

  return (
    <>
      {/* Container posisinya fixed di atas */}
      <div 
        style={{
          position: "fixed",
          top: isScrolled ? 16 : 24,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 999,
          paddingInline: 16,
          pointerEvents: "none",
        }}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          style={{
            pointerEvents: "all",
            background: isScrolled ? "rgba(26, 15, 10, 0.85)" : "transparent",
            backdropFilter: isScrolled ? "blur(24px) saturate(1.6)" : "none",
            WebkitBackdropFilter: isScrolled ? "blur(24px) saturate(1.6)" : "none",
            border: isScrolled ? "1px solid rgba(255,255,255,0.12)" : "none",
            borderRadius: isScrolled ? 24 : 0,
            boxShadow: isScrolled ? "0 8px 32px rgba(0,0,0,0.2)" : "none",
            padding: isScrolled ? "10px 20px" : "0px",
            // Jika scroll, melebar maksimal 1200px (full lebar container), jika belum scroll hanya selebar logo
            width: isScrolled ? "100%" : "auto",
            maxWidth: isScrolled ? 1200 : "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: isScrolled ? "space-between" : "center",
            overflow: "hidden",
          }}
        >
          {/* KIRI / TENGAH: Logo */}
          <motion.div layout style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
            <Image
              src="/logo.png"
              alt="Afterglam"
              width={isScrolled ? 110 : 150} // Logo mengecil sedikit saat scroll
              height={isScrolled ? 34 : 54}
              style={{
                objectFit: "contain",
                filter: "brightness(0) invert(1) opacity(0.95)",
                transition: "all 0.3s ease",
              }}
              priority
            />
          </motion.div>

          {/* KANAN: Konten yang menyamping saat discroll */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginLeft: "auto",
                }}
              >
                {/* Info Cabang (Disembunyikan di layar HP kecil agar tidak menumpuk) */}
                <div className="nav-branch-info" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {activeBranch && (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <MapPin size={13} color="var(--rose-400)" />
                        <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "rgba(255,255,255,0.85)" }}>
                          {branch?.address}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Clock size={13} color="var(--rose-400)" />
                        <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "rgba(255,255,255,0.85)" }}>
                          {branch?.hours}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.15)", marginInline: 4 }} className="nav-divider" />

                {/* Tombol Interaksi */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {/* Selector Cabang */}
                  <button
                    onClick={openBranchModal}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "var(--radius-pill)",
                      padding: "8px 14px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      color: "white",
                    }}
                    onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                    onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: activeBranch ? "#4ade80" : "var(--rose-400)" }} />
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600 }}>
                      {activeBranch ? branch?.shortName : "Pilih Studio"}
                    </span>
                    <ChevronDown size={14} color="rgba(255,255,255,0.6)" />
                  </button>

                  {/* WhatsApp CTA (Hanya muncul jika cabang sudah terpilih) */}
                  {activeBranch && (
                    <a
                      href={`https://wa.me/${branch?.whatsapp}?text=${encodeURIComponent("Halo Afterglam, saya ingin info layanan dan reservasi.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          background: "#25d366",
                          border: "none",
                          borderRadius: "var(--radius-pill)",
                          padding: "8px 16px",
                          cursor: "pointer",
                          color: "white",
                          fontFamily: "var(--font-ui)",
                          fontSize: 12,
                          fontWeight: 700,
                          transition: "transform 0.2s ease",
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
                        onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                      >
                        <MessageCircle size={14} />
                        <span className="wa-text">WhatsApp</span>
                      </button>
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── CSS Khusus untuk responsivitas Header ini ── */}
      <style>{`
        @media (max-width: 860px) {
          .nav-branch-info { display: none !important; }
          .nav-divider { display: none !important; }
        }
        @media (max-width: 480px) {
          .wa-text { display: none; }
        }
      `}</style>

      {/* Branch Modal */}
      <BranchModal />
    </>
  );
}
