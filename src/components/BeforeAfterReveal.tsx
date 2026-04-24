"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeAfterRevealProps {
  imageBefore: string;
  imageAfter: string;
  title: string;
  subtitle?: string;
  altBefore?: string;
  altAfter?: string;
}

/**
 * Artistic hover-to-reveal Before/After component.
 * The "After" is always visible as the hero image.
 * On hover (desktop) or long-press (mobile), the "Before" cross-fades in.
 */
export default function BeforeAfterReveal({
  imageBefore,
  imageAfter,
  title,
  subtitle,
  altBefore = "Before",
  altAfter = "After",
}: BeforeAfterRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Desktop: hover events
  const handleMouseEnter = () => setIsRevealed(true);
  const handleMouseLeave = () => setIsRevealed(false);

  // Mobile: long-press events
  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => setIsRevealed(true), 300);
  };
  const handleTouchEnd = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    setIsRevealed(false);
  };

  return (
    <div
      className="before-after-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{
        position: "relative",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        cursor: "none",
        background: "var(--earth-100)",
        userSelect: "none",
        WebkitUserSelect: "none",
        display: "flex", // ensures no bottom margin from inline image
      }}
    >
      {/* ── AFTER image (always visible, dictates container size) ── */}
      <Image
        src={imageAfter}
        alt={altAfter}
        width={1200}
        height={1200}
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* ── BEFORE image (fades in on hover / long-press) ── */}
      <motion.div
        initial={false}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <Image
          src={imageBefore}
          alt={altBefore}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>

      {/* ── Gradient overlay at bottom ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "45%",
          background:
            "linear-gradient(to top, rgba(26,15,10,0.72) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── State label ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isRevealed ? "before" : "after"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontFamily: "var(--font-ui)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
            padding: "4px 10px",
            borderRadius: "var(--radius-pill)",
            pointerEvents: "none",
          }}
        >
          {isRevealed ? "Before" : "After"}
        </motion.div>
      </AnimatePresence>

      {/* ── "Hold to reveal" hint (only on After, only on first load) ── */}
      {!isRevealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            position: "absolute",
            bottom: 16,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          {title && (
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(14px, 2vw, 18px)",
                fontWeight: 500,
                color: "white",
                marginBottom: 4,
                textAlign: "center",
                padding: "0 16px",
              }}
            >
              {title}
            </p>
          )}
          {subtitle && (
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                color: "rgba(255,255,255,0.60)",
                letterSpacing: "0.08em",
              }}
            >
              {subtitle}
            </p>
          )}
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              marginTop: 8,
            }}
          >
            Hover · Hold to reveal Before
          </p>
        </motion.div>
      )}

      {/* ── Custom cursor ── */}
      <ViewCursor isRevealed={isRevealed} />
    </div>
  );
}

/* ── Custom "View" cursor that follows mouse inside the frame ── */
function ViewCursor({ isRevealed }: { isRevealed: boolean }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setVisible(true);
      }}
      onMouseLeave={() => setVisible(false)}
      style={{ position: "absolute", inset: 0, pointerEvents: "all" }}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 10,
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.30)",
              borderRadius: "var(--radius-pill)",
              padding: "6px 14px",
              fontFamily: "var(--font-ui)",
              fontSize: 11,
              fontWeight: 700,
              color: "white",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {isRevealed ? "Before" : "View"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
