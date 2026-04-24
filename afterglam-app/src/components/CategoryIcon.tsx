"use client";

interface CategoryIconProps {
  type: string;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Custom SVG icons for each Afterglam service category.
 * Designed to match the beauty salon aesthetic.
 */
export default function CategoryIcon({ type, size = 24, color = "currentColor", className }: CategoryIconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (type) {
    // ─── EYELASH ICON: curved lash lines radiating from an eye ───
    case "lash":
      return (
        <svg {...props}>
          {/* Eye oval */}
          <path d="M2 12c0 0 3.5-5 10-5s10 5 10 5-3.5 5-10 5S2 12 2 12z" strokeWidth={1.4} />
          {/* Pupil */}
          <circle cx="12" cy="12" r="2.5" strokeWidth={1.4} />
          {/* Lash lines above */}
          <path d="M8 7.5L7 4.5" strokeWidth={1.6} strokeLinecap="round" />
          <path d="M10.5 6.5L10 3.5" strokeWidth={1.6} strokeLinecap="round" />
          <path d="M13 6.5L13 3.5" strokeWidth={1.6} strokeLinecap="round" />
          <path d="M15.5 7.5L16.5 4.5" strokeWidth={1.6} strokeLinecap="round" />
          <path d="M17.5 9L19.5 7" strokeWidth={1.6} strokeLinecap="round" />
        </svg>
      );

    // ─── EYEBROW ICON: arched brow over an eye ───
    case "brow":
      return (
        <svg {...props}>
          {/* Eyebrow arch */}
          <path d="M4 10 C6 6, 10 5, 14 5.5 C17 6, 19.5 8, 20 10" strokeWidth={2} strokeLinecap="round" />
          {/* Eye */}
          <path d="M4 15 C6 12, 18 12, 20 15 C18 18, 6 18, 4 15z" strokeWidth={1.4} />
          {/* Pupil */}
          <circle cx="12" cy="15" r="2" strokeWidth={1.4} />
        </svg>
      );

    // ─── NAILS ICON: hand with painted nails ───
    case "nails":
      return (
        <svg {...props}>
          {/* Palm base */}
          <path d="M6 12V19a1 1 0 002 0v-3" strokeWidth={1.4} />
          <path d="M10 11V20a1 1 0 002 0v-3" strokeWidth={1.4} />
          <path d="M14 12V20a1 1 0 002 0v-3" strokeWidth={1.4} />
          <path d="M18 14V19a1 1 0 002 0v-4" strokeWidth={1.4} />
          {/* Nail polish on each finger */}
          <rect x="5" y="9" width="3" height="3.5" rx="1.5" fill={color} stroke="none" />
          <rect x="9" y="8" width="3" height="3.5" rx="1.5" fill={color} stroke="none" />
          <rect x="13" y="9" width="3" height="3.5" rx="1.5" fill={color} stroke="none" />
          <rect x="17" y="11" width="3" height="3" rx="1.5" fill={color} stroke="none" />
          {/* Thumb */}
          <path d="M6 16 C4 15, 3 13, 4 11 C5 9, 6 10, 6 12" strokeWidth={1.4} />
        </svg>
      );

    // ─── WAXING ICON: smooth skin / hair removal strip ───
    case "waxing":
      return (
        <svg {...props}>
          {/* Wax strip */}
          <rect x="3" y="9" width="18" height="7" rx="3.5" strokeWidth={1.4} />
          {/* Pull tab */}
          <path d="M17 9 L20 5" strokeWidth={1.6} strokeLinecap="round" />
          {/* Hair lines being removed */}
          <path d="M7 7 L7 9" strokeWidth={1.4} strokeLinecap="round" strokeDasharray="0 0" />
          <path d="M10 6 L10 9" strokeWidth={1.4} strokeLinecap="round" />
          <path d="M13 7 L13 9" strokeWidth={1.4} strokeLinecap="round" />
          {/* Sparkle / smooth result */}
          <path d="M5 18 L5 20" strokeWidth={1.2} strokeLinecap="round" />
          <path d="M9 18.5 L9 21" strokeWidth={1.2} strokeLinecap="round" />
          <path d="M13 18 L13 20" strokeWidth={1.2} strokeLinecap="round" />
        </svg>
      );

    // ─── SPARKLE (default / fallback) ───
    default:
      return (
        <svg {...props}>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
  }
}
