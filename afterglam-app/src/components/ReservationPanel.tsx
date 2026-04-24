"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useReservationStore } from "@/store/useReservationStore";
import { tiers, formatPrice, getPrice } from "@/lib/data";
import { X, MessageCircle, ChevronRight, RefreshCw, Clock } from "lucide-react";

/* ── Animated price counter ── */
function PriceCounter({ value }: { value: number }) {
  const fmt = formatPrice(value);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={fmt}
        initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
        transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ display: "inline-block", fontVariantNumeric: "tabular-nums" }}
      >
        {fmt}
      </motion.span>
    </AnimatePresence>
  );
}

/* ========================================================
   DESKTOP — Right panel
   ======================================================== */
export function DesktopReservationPanel() {
  const {
    selectedService, selectedTier, activeBranch,
    setTier, whatsappUrl, openBranchModal, clearService,
  } = useReservationStore();

  const price = selectedService && activeBranch
    ? getPrice(selectedService, activeBranch, selectedTier) : null;
  const waUrl = whatsappUrl();

  return (
    <div className="reservation-panel">
      {/* Branding */}
      <div style={{ marginBottom: 40 }}>
        <p className="section-label">Reservation Engine</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 500, color: "var(--deep-brown)", lineHeight: 1.2 }}>
          Afterglam<br /><em style={{ fontWeight: 400 }}>Beauty Studio</em>
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {!selectedService ? (
          /* Empty state */
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", paddingTop: 32 }}
          >
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--rose-50)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 22 }}>
              ✦
            </div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500, color: "var(--deep-brown)", marginBottom: 8 }}>
              Pilih Layanan
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--muted)", maxWidth: 200 }}>
              Klik kartu layanan untuk memulai reservasi
            </p>
          </motion.div>
        ) : (
          /* Service detail */
          <motion.div
            key={selectedService.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
              <p className="section-label">Layanan Dipilih</p>
              <button onClick={clearService} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: 2 }}>
                <X size={16} />
              </button>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, color: "var(--deep-brown)", marginBottom: 6 }}>
              {selectedService.name}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <Clock size={12} color="var(--muted)" />
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--muted)" }}>{selectedService.duration}</span>
            </div>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 28 }}>
              {selectedService.description}
            </p>

            {/* Tier selector */}
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, color: "var(--deep-brown)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              Pilih Teknisi
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              {tiers.map((t) => (
                <button
                  key={t.id}
                  className={`tier-btn ${selectedTier === t.id ? "tier-active" : ""}`}
                  onClick={() => setTier(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--muted)", marginBottom: 28 }}>
              {tiers.find((t) => t.id === selectedTier)?.description}
            </p>

            {/* Price box */}
            <div style={{ background: "var(--rose-50)", borderRadius: "var(--radius-lg)", padding: "18px 20px", marginBottom: 20, border: "1px solid var(--rose-100)" }}>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>Total Estimasi</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, color: "var(--rose-600)" }}>
                {price !== null ? <PriceCounter value={price} /> : "—"}
              </p>
              {selectedService.isRetouch && selectedService.retouchPricing && activeBranch && (
                <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)", marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
                  <RefreshCw size={10} />
                  Retouch: {formatPrice(selectedService.retouchPricing[activeBranch][selectedTier])}
                </p>
              )}
            </div>

            {/* CTA */}
            {waUrl ? (
              <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <motion.button className="btn-whatsapp" style={{ width: "100%" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <MessageCircle size={18} />
                  <span>Reservasi via WhatsApp</span>
                  <ChevronRight size={16} style={{ marginLeft: "auto", opacity: 0.7 }} />
                </motion.button>
              </a>
            ) : (
              <button className="btn-primary" style={{ width: "100%" }} onClick={openBranchModal}>
                <span>Pilih Cabang Terlebih Dahulu</span>
              </button>
            )}

            {activeBranch && (
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 12 }}>
                Harga cabang{" "}
                <button onClick={openBranchModal} style={{ color: "var(--rose-500)", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit" }}>
                  {activeBranch === "hq" ? "Central" : "KK"}
                </button>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ========================================================
   MOBILE — Bottom sheet
   ======================================================== */
export function MobileServiceSheet() {
  const {
    selectedService, selectedTier, activeBranch,
    isServicePanelOpen, closeServicePanel, setTier, whatsappUrl, openBranchModal,
  } = useReservationStore();

  const price = selectedService && activeBranch
    ? getPrice(selectedService, activeBranch, selectedTier) : null;
  const waUrl = whatsappUrl();

  return (
    <AnimatePresence>
      {isServicePanelOpen && selectedService && (
        <>
          <motion.div className="sheet-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeServicePanel} />
          <motion.div
            className="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          >
            <div className="sheet-handle" />
            <div style={{ padding: "20px 24px 8px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
                <p className="section-label">Layanan Dipilih</p>
                <button onClick={closeServicePanel} style={{ background: "var(--earth-100)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <X size={15} color="var(--deep-brown)" />
                </button>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "var(--deep-brown)", marginBottom: 6 }}>
                {selectedService.name}
              </h3>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 24 }}>
                {selectedService.description}
              </p>

              {/* Tier */}
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, color: "var(--deep-brown)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
                Pilih Teknisi
              </p>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                {tiers.map((t) => (
                  <button key={t.id} className={`tier-btn ${selectedTier === t.id ? "tier-active" : ""}`} onClick={() => setTier(t.id)} style={{ fontSize: 12 }}>
                    {t.label}
                  </button>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--muted)", marginBottom: 24 }}>
                {tiers.find((t) => t.id === selectedTier)?.description}
              </p>

              {/* Price */}
              <div style={{ background: "var(--rose-50)", borderRadius: "var(--radius-lg)", padding: "16px 18px", marginBottom: 20, border: "1px solid var(--rose-100)" }}>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>Total Estimasi</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, color: "var(--rose-600)" }}>
                  {price !== null ? <PriceCounter value={price} /> : "—"}
                </p>
                {selectedService.isRetouch && selectedService.retouchPricing && activeBranch && (
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                    <RefreshCw size={10} />
                    Retouch: {formatPrice(selectedService.retouchPricing[activeBranch][selectedTier])}
                  </p>
                )}
              </div>

              {waUrl ? (
                <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <motion.button className="btn-whatsapp" style={{ width: "100%" }} whileTap={{ scale: 0.97 }}>
                    <MessageCircle size={18} />
                    <span>Reservasi via WhatsApp</span>
                  </motion.button>
                </a>
              ) : (
                <button className="btn-primary" style={{ width: "100%" }} onClick={openBranchModal}>
                  <span>Pilih Cabang Terlebih Dahulu</span>
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ========================================================
   MOBILE — Sticky bar at bottom
   ======================================================== */
export function MobileStickyBar() {
  const { selectedService, activeBranch, selectedTier, isServicePanelOpen, openServicePanel, openBranchModal } = useReservationStore();

  if (isServicePanelOpen) return null;

  const price = selectedService && activeBranch
    ? getPrice(selectedService, activeBranch, selectedTier) : null;

  return (
    <div className="sticky-bar">
      <AnimatePresence mode="wait">
        {selectedService && activeBranch ? (
          <motion.div key="ready" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {selectedService.name}
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--rose-600)", fontVariantNumeric: "tabular-nums" }}>
                {price !== null ? <PriceCounter value={price} /> : "—"}
              </p>
            </div>
            <motion.button className="btn-whatsapp" style={{ flexShrink: 0, padding: "13px 20px", fontSize: 14 }} onClick={() => openServicePanel(selectedService)} whileTap={{ scale: 0.97 }}>
              <MessageCircle size={16} />
              <span>Reservasi</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="idle" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <button className="btn-primary" style={{ width: "100%" }} onClick={!activeBranch ? openBranchModal : undefined}>
              <span>{!activeBranch ? "Pilih Lokasi Studio" : "Pilih Layanan di Atas"}</span>
              <ChevronRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
