"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * FloatingLogo — Always-on-top branding element anchored to top-left.
 * Fades slightly on scroll but never disappears.
 */
export default function FloatingLogo() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0.75]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 20,
        left: 24,
        zIndex: 998,
        opacity,
        pointerEvents: "all",
      }}
    >
      <Link href="/" aria-label="Afterglam Home">
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: 14,
            padding: "8px 14px",
            boxShadow: "0 4px 20px rgba(44,24,16,0.10), 0 1px 4px rgba(44,24,16,0.06)",
            border: "1px solid rgba(200,175,155,0.25)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", width: "clamp(120px, 25vw, 180px)", height: "auto", display: "flex" }}>
            <Image
              src="/logo.png"
              alt="The Afterglam"
              width={400}
              height={150}
              style={{ objectFit: "contain", width: "100%", height: "auto" }}
              priority
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
