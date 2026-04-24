"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useReservationStore } from "@/store/useReservationStore";
import { CategoryId } from "@/lib/data";
import DynamicIsland from "@/components/DynamicIsland";
import CategoryTabs from "@/components/CategoryTabs";
import ServiceGrid from "@/components/ServiceGrid";
import {
  DesktopReservationPanel,
  MobileServiceSheet,
  MobileStickyBar,
} from "@/components/ReservationPanel";
import { ArrowLeft } from "lucide-react";

/* ── Collapse island on scroll ── */
function ScrollBehavior() {
  const { isIslandExpanded, collapseIsland } = useReservationStore();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    if (v > 50 && isIslandExpanded) collapseIsland();
  });
  return null;
}

/* ── Read category from URL ── */
function CategoryFromURL() {
  const params = useSearchParams();
  const { setCategory, activeBranch, openBranchModal } = useReservationStore();

  useEffect(() => {
    const cat = params.get("category") as CategoryId | null;
    if (cat) setCategory(cat);
  }, [params]);

  useEffect(() => {
    if (!activeBranch) {
      const t = setTimeout(() => openBranchModal(), 500);
      return () => clearTimeout(t);
    }
  }, []);

  return null;
}

/* ── Catalog column (left side) ── */
function CatalogColumn() {
  return (
    <div className="reservation-catalog page-container">
      {/* Back link */}
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--font-ui)",
          fontSize: 13,
          fontWeight: 500,
          color: "var(--muted)",
          textDecoration: "none",
          marginBottom: 28,
        }}
      >
        <ArrowLeft size={15} />
        Kembali
      </Link>

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: 32 }}
      >
        <p className="section-label">Menu Layanan</p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 4vw, 38px)",
            fontWeight: 500,
            color: "var(--deep-brown)",
            lineHeight: 1.2,
            marginBottom: 10,
          }}
        >
          Pilih <em>Layanan & Teknisi</em>
        </h1>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--muted)" }}>
          Harga otomatis menyesuaikan cabang dan tier teknisi yang dipilih.
        </p>
      </motion.div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <CategoryTabs />
      </motion.div>

      {/* Service grid */}
      <ServiceGrid />

      {/* Bottom padding for mobile sticky bar */}
      <div style={{ height: 20 }} />
    </div>
  );
}

/* ── Main page ── */
export default function ReservationPage() {
  return (
    <>
      <ScrollBehavior />
      <DynamicIsland />

      <Suspense>
        <CategoryFromURL />
      </Suspense>

      {/* Background */}
      <div className="hero-bg" style={{ minHeight: "100dvh" }}>
        <div className="reservation-layout">
          {/* Left: Catalog */}
          <CatalogColumn />

          {/* Right: Reservation panel (desktop) */}
          <DesktopReservationPanel />
        </div>
      </div>

      {/* Mobile components */}
      <MobileServiceSheet />
      <MobileStickyBar />
    </>
  );
}
