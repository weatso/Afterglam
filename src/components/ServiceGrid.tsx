"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useReservationStore } from "@/store/useReservationStore";
import { Service, serviceCategories, formatPrice, getPrice } from "@/lib/data";
import { Clock, RefreshCw } from "lucide-react";

function PriceTag({ service }: { service: Service }) {
  const { activeBranch, selectedTier } = useReservationStore();
  if (!activeBranch) {
    return (
      <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--muted)" }}>
        Pilih cabang
      </span>
    );
  }
  const price = getPrice(service, activeBranch, selectedTier);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={`${activeBranch}-${selectedTier}-${price}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 15,
          fontWeight: 600,
          color: "var(--rose-600)",
          fontVariantNumeric: "tabular-nums",
          display: "inline-block",
        }}
      >
        {formatPrice(price)}
      </motion.span>
    </AnimatePresence>
  );
}

function ServiceCard({ service, onClick, isSelected }: {
  service: Service;
  onClick: () => void;
  isSelected: boolean;
}) {
  const { activeBranch, selectedTier } = useReservationStore();

  const badgeClass =
    service.badge === "Bestseller" ? "badge-rose" :
    service.badge === "Premium"    ? "badge-earth" :
    service.badge === "Trending"   ? "badge-purple" :
    service.badge === "All-in-One" ? "badge-green" :
    "badge-sage";

  return (
    <motion.div
      className={`service-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Top accent bar */}
      <div
        className="service-card-accent"
        style={{
          background: isSelected
            ? "linear-gradient(90deg, var(--rose-400), var(--rose-500))"
            : "var(--earth-100)",
        }}
      />

      <div style={{ padding: "18px 18px 20px" }}>
        {/* Badge */}
        {service.badge && (
          <span className={`badge ${badgeClass}`} style={{ marginBottom: 10, display: "inline-block" }}>
            {service.badge}
          </span>
        )}

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 500,
            color: "var(--deep-brown)",
            lineHeight: 1.3,
            marginBottom: 6,
          }}
        >
          {service.name}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 12,
            color: "var(--muted)",
            lineHeight: 1.55,
            marginBottom: 16,
          }}
        >
          {service.description}
        </p>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Clock size={11} color="var(--muted)" />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)" }}>
              {service.duration}
            </span>
            {service.isRetouch && activeBranch && (
              <>
                <RefreshCw size={9} color="var(--muted)" style={{ marginLeft: 6 }} />
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)" }}>
                  Retouch available
                </span>
              </>
            )}
          </div>

          <div style={{ textAlign: "right" }}>
            {activeBranch && (
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, color: "var(--muted)", marginBottom: 2 }}>
                {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)}
              </p>
            )}
            <PriceTag service={service} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServiceGrid() {
  const { activeCategory, selectedService, openServicePanel, activeBranch, openBranchModal } = useReservationStore();
  const category = serviceCategories.find((c) => c.id === activeCategory);

  const handleClick = (service: Service) => {
    if (!activeBranch) { openBranchModal(); return; }
    openServicePanel(service);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="service-grid"
        style={{ marginTop: 20 }}
      >
        {category?.services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onClick={() => handleClick(service)}
            isSelected={selectedService?.id === service.id}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
