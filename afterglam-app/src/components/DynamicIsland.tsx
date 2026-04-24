"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useReservationStore } from "@/store/useReservationStore";
import { branches } from "@/lib/data";
import { MapPin, Clock, ChevronDown, ChevronUp, X } from "lucide-react";

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
   DYNAMIC ISLAND PILL
───────────────────────────────────────────── */
export default function DynamicIsland() {
  const {
    activeBranch,
    isIslandExpanded,
    expandIsland,
    collapseIsland,
    openBranchModal,
  } = useReservationStore();

  const branch = branches.find((b) => b.id === activeBranch);

  const handleClick = () => {
    if (!activeBranch) {
      openBranchModal();
      return;
    }
    if (isIslandExpanded) collapseIsland();
    else expandIsland();
  };

  return (
    <>
      {/* Island */}
      <div className="island-wrapper">
        <motion.div
          className="island-pill"
          onClick={handleClick}
          layout
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        >
          <AnimatePresence mode="wait">
            {!activeBranch ? (
              /* ── No Branch Selected ── */
              <motion.div
                key="no-branch"
                className="island-inner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="island-dot island-dot-pulse" />
                <span className="island-label">Pilih Lokasi Studio</span>
              </motion.div>

            ) : !isIslandExpanded ? (
              /* ── Compact ── */
              <motion.div
                key="compact"
                className="island-inner"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
              >
                <span className="island-dot island-dot-active" />
                <div>
                  <p className="island-tagline">{branch?.tagline}</p>
                  <p className="island-label">{branch?.name}</p>
                </div>
                <ChevronDown size={14} color="rgba(255,255,255,0.5)" style={{ marginLeft: 2 }} />
              </motion.div>

            ) : (
              /* ── Expanded ── */
              <motion.div
                key="expanded"
                className="island-expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", flexDirection: "column", gap: 10, width: "min(320px, 80vw)" }}
              >
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="island-dot island-dot-active" />
                    <p className="island-label">{branch?.name}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); openBranchModal(); }}
                      style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, color: "var(--rose-300)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                    >
                      Ganti
                    </button>
                    <ChevronUp size={14} color="rgba(255,255,255,0.4)" />
                  </div>
                </div>

                {/* Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <MapPin size={11} color="rgba(255,255,255,0.4)" />
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{branch?.address}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Clock size={11} color="rgba(255,255,255,0.4)" />
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{branch?.hours}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Branch Modal */}
      <BranchModal />
    </>
  );
}
