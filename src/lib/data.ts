// ==========================================================================
// AFTERGLAM BEAUTY STUDIO — MASTER DATA FILE
// ==========================================================================
// This file is the single source of truth for all branch info, services,
// and pricing. To update prices or add services, edit this file only.
// ==========================================================================

export type BranchId = "hq" | "kk";
export type TierId = "regular" | "premium" | "manager";
export type CategoryId = "lash" | "brow" | "nails" | "waxing";

export interface Branch {
  id: BranchId;
  name: string;
  shortName: string;
  address: string;
  whatsapp: string;          // Format: 628XXXXXXXXXX (no + or spaces)
  tagline: string;
  hours: string;
  mapsUrl?: string;
}

export interface Tier {
  id: TierId;
  label: string;
  description: string;
  color: string;
}

export interface ServicePricing {
  hq: { regular: number; premium: number; manager: number };
  kk: { regular: number; premium: number; manager: number };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  pricing: ServicePricing;
  isRetouch?: boolean;
  retouchPricing?: ServicePricing;
  badge?: string;
  popular?: boolean;
}

export interface ServiceCategory {
  id: CategoryId;
  name: string;
  label: string;         // Display label (bahasa)
  iconType: string;      // Used by icon component to render correct SVG
  color: string;         // Accent color class
  bgColor: string;       // Background color class
  description: string;
  services: Service[];
}

// ==========================================================================
// BRANCHES — Update whatsapp, address, and mapsUrl for production
// ==========================================================================
export const branches: Branch[] = [
  {
    id: "hq",
    name: "Afterglam Central",
    shortName: "Central",
    address: "Jl. Raya Pusat, Semarang",
    whatsapp: "6281234567890",   // ⚠️ GANTI dengan nomor WA asli cabang Central
    tagline: "Flagship Studio",
    hours: "09.00 – 21.00 WIB",
    mapsUrl: "https://maps.google.com",
  },
  {
    id: "kk",
    name: "Afterglam KK",
    shortName: "KK",
    address: "Kampung Kali, Semarang",
    whatsapp: "6281234567891",   // ⚠️ GANTI dengan nomor WA asli cabang KK
    tagline: "Kampung Kali Studio",
    hours: "09.00 – 21.00 WIB",
    mapsUrl: "https://maps.google.com",
  },
];

// ==========================================================================
// TECHNICIAN TIERS
// ==========================================================================
export const tiers: Tier[] = [
  {
    id: "regular",
    label: "Regular",
    description: "Teknisi bersertifikat, cocok untuk tampilan sehari-hari",
    color: "#8c6b45",
  },
  {
    id: "premium",
    label: "Premium",
    description: "Spesialis senior dengan keahlian teknik tingkat lanjut",
    color: "#c96a56",
  },
  {
    id: "manager",
    label: "Manager",
    description: "Kepala teknisi — puncak presisi dan keahlian",
    color: "#2c1810",
  },
];

// ==========================================================================
// SERVICE CATEGORIES & PRICING
// Source: BOOKLET AFTERGLAM_2025.pdf + BOOKLET KK_2025.pdf
// ==========================================================================
export const serviceCategories: ServiceCategory[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // EYELASH
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "lash",
    name: "Eyelash",
    label: "Eyelash Extensions",
    iconType: "lash",
    color: "#c96a56",
    bgColor: "#fdf6f4",
    description: "From natural single to dramatic Russian volume — lashes that last up to 4–6 weeks",
    services: [
      {
        id: "single_lash",
        name: "Single Lash",
        description: "Teknik 1D klasik untuk tampilan alami yang terangkat. Cocok untuk pemula.",
        duration: "90 min",
        badge: "Bestseller",
        popular: true,
        pricing: {
          hq: { regular: 250000, premium: 300000, manager: 350000 },
          kk: { regular: 275000, premium: 330000, manager: 385000 },
        },
        isRetouch: true,
        retouchPricing: {
          hq: { regular: 200000, premium: 250000, manager: 300000 },
          kk: { regular: 200000, premium: 250000, manager: 300000 },
        },
      },
      {
        id: "double_lash",
        name: "Double Lash",
        description: "Fan 2D untuk bulu mata yang lebih penuh dan tegas. Volume sedang.",
        duration: "100 min",
        pricing: {
          hq: { regular: 350000, premium: 400000, manager: 450000 },
          kk: { regular: 385000, premium: 440000, manager: 500000 },
        },
        isRetouch: true,
        retouchPricing: {
          hq: { regular: 250000, premium: 300000, manager: 350000 },
          kk: { regular: 250000, premium: 300000, manager: 350000 },
        },
      },
      {
        id: "russian_lash",
        name: "Russian Volume",
        description: "Fan mega-volume 3D–6D untuk drama bold. Efek paling dramatis.",
        duration: "120 min",
        badge: "Premium",
        popular: true,
        pricing: {
          hq: { regular: 450000, premium: 500000, manager: 500000 },
          kk: { regular: 500000, premium: 550000, manager: 650000 },
        },
        isRetouch: true,
        retouchPricing: {
          hq: { regular: 350000, premium: 400000, manager: 400000 },
          kk: { regular: 350000, premium: 400000, manager: 400000 },
        },
      },
      {
        id: "fairy_lash",
        name: "Fairy Lash",
        description: "Ujung wispy berbulu untuk kelembutan etherial. Tampak ringan dan airy.",
        duration: "100 min",
        pricing: {
          hq: { regular: 300000, premium: 350000, manager: 400000 },
          kk: { regular: 330000, premium: 385000, manager: 440000 },
        },
        isRetouch: true,
        retouchPricing: {
          hq: { regular: 220000, premium: 270000, manager: 320000 },
          kk: { regular: 220000, premium: 270000, manager: 320000 },
        },
      },
      {
        id: "kawaii_lash",
        name: "Kawaii Lash",
        description: "Aplikasi bulu mata bawah seperti boneka untuk pesona ekstra.",
        duration: "90 min",
        pricing: {
          hq: { regular: 280000, premium: 330000, manager: 380000 },
          kk: { regular: 310000, premium: 365000, manager: 415000 },
        },
        isRetouch: true,
        retouchPricing: {
          hq: { regular: 200000, premium: 250000, manager: 300000 },
          kk: { regular: 200000, premium: 250000, manager: 300000 },
        },
      },
      {
        id: "lash_filler",
        name: "Lash Filler",
        description: "Perawatan nourishing yang menebalkan & memanjangkan bulu mata alami.",
        duration: "60 min",
        badge: "No Extension",
        pricing: {
          hq: { regular: 300000, premium: 300000, manager: 300000 },
          kk: { regular: 330000, premium: 330000, manager: 330000 },
        },
      },
      {
        id: "lash_lift",
        name: "Lash Lift",
        description: "Keriting semi-permanen untuk bulu mata alami yang cantik.",
        duration: "60 min",
        pricing: {
          hq: { regular: 250000, premium: 250000, manager: 250000 },
          kk: { regular: 200000, premium: 200000, manager: 200000 },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // EYEBROW
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "brow",
    name: "Eyebrow",
    label: "Eyebrow Styling",
    iconType: "brow",
    color: "#8c6b45",
    bgColor: "#f8f4ef",
    description: "Alis terpahat dan terawat yang membingkai wajah dengan sempurna",
    services: [
      {
        id: "brow_lamination",
        name: "Brow Lamination",
        description: "Alis berbulu halus ke atas yang bertahan hingga 6 minggu.",
        duration: "60 min",
        badge: "Trending",
        popular: true,
        pricing: {
          hq: { regular: 300000, premium: 300000, manager: 300000 },
          kk: { regular: 330000, premium: 330000, manager: 330000 },
        },
      },
      {
        id: "brow_lamination_threading_tinting",
        name: "Brow Lam + Thread + Tint",
        description: "Transformasi alis lengkap dalam satu sesi — laminasi, threading, dan pewarnaan.",
        duration: "75 min",
        badge: "All-in-One",
        pricing: {
          hq: { regular: 350000, premium: 350000, manager: 350000 },
          kk: { regular: 385000, premium: 385000, manager: 385000 },
        },
      },
      {
        id: "brow_threading",
        name: "Brow Threading",
        description: "Pembentukan presisi menggunakan teknik benang tradisional.",
        duration: "20 min",
        pricing: {
          hq: { regular: 50000, premium: 50000, manager: 50000 },
          kk: { regular: 55000, premium: 55000, manager: 55000 },
        },
      },
      {
        id: "brow_tinting",
        name: "Brow Tinting",
        description: "Pewarnaan alis untuk tampilan lebih penuh dan tegas.",
        duration: "30 min",
        pricing: {
          hq: { regular: 80000, premium: 80000, manager: 80000 },
          kk: { regular: 90000, premium: 90000, manager: 90000 },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NAILS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "nails",
    name: "Nails",
    label: "Nail Care & Art",
    iconType: "nails",
    color: "#87a178",
    bgColor: "#f4f6f1",
    description: "Gel, press-on & nail art untuk setiap estetika — tangan dan kaki",
    services: [
      {
        id: "manicure_express",
        name: "Manicure Express",
        description: "Perawatan cepat: bentuk, poles, dan base coat.",
        duration: "30 min",
        pricing: {
          hq: { regular: 80000, premium: 80000, manager: 80000 },
          kk: { regular: 90000, premium: 90000, manager: 90000 },
        },
      },
      {
        id: "pedicure_express",
        name: "Pedicure Express",
        description: "Perawatan cepat kaki: rendam, rapikan, dan poles.",
        duration: "45 min",
        pricing: {
          hq: { regular: 90000, premium: 90000, manager: 90000 },
          kk: { regular: 100000, premium: 100000, manager: 100000 },
        },
      },
      {
        id: "gel_manicure",
        name: "Gel Manicure",
        description: "Warna gel tahan lama dengan hasil glossy yang sempurna.",
        duration: "60 min",
        badge: "Bestseller",
        popular: true,
        pricing: {
          hq: { regular: 150000, premium: 180000, manager: 200000 },
          kk: { regular: 165000, premium: 200000, manager: 220000 },
        },
      },
      {
        id: "gel_pedicure",
        name: "Gel Pedicure",
        description: "Perawatan warna gel untuk kaki yang indah.",
        duration: "75 min",
        pricing: {
          hq: { regular: 170000, premium: 200000, manager: 220000 },
          kk: { regular: 185000, premium: 220000, manager: 240000 },
        },
      },
      {
        id: "nail_art",
        name: "Nail Art",
        description: "Desain custom — dari minimalis hingga full bloom art.",
        duration: "90 min",
        badge: "Custom",
        pricing: {
          hq: { regular: 200000, premium: 250000, manager: 300000 },
          kk: { regular: 220000, premium: 275000, manager: 330000 },
        },
      },
      {
        id: "milky_moist_mani",
        name: "Milky Moist Manicure",
        description: "Perawatan hidrasi dengan milky soak dan paraffin.",
        duration: "75 min",
        badge: "Premium",
        pricing: {
          hq: { regular: 200000, premium: 230000, manager: 260000 },
          kk: { regular: 230000, premium: 265000, manager: 300000 },
        },
      },
      {
        id: "milky_moist_pedi",
        name: "Milky Moist Pedicure",
        description: "Pedicure nourishing dalam dengan luxury soak.",
        duration: "90 min",
        pricing: {
          hq: { regular: 220000, premium: 250000, manager: 280000 },
          kk: { regular: 250000, premium: 285000, manager: 320000 },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // WAXING
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "waxing",
    name: "Waxing",
    label: "Hair Removal",
    iconType: "waxing",
    color: "#b35240",
    bgColor: "#fdf0ed",
    description: "Waxing lembut dan tahan lama untuk kulit mulus sepanjang hari",
    services: [
      {
        id: "underarms_waxing",
        name: "Under Arms",
        description: "Waxing lembut untuk ketiak bersih dan mulus.",
        duration: "15 min",
        pricing: {
          hq: { regular: 100000, premium: 100000, manager: 100000 },
          kk: { regular: 110000, premium: 110000, manager: 110000 },
        },
      },
      {
        id: "arm_waxing",
        name: "Full Arms",
        description: "Waxing lengkap seluruh lengan dari pergelangan hingga bahu.",
        duration: "30 min",
        pricing: {
          hq: { regular: 150000, premium: 150000, manager: 150000 },
          kk: { regular: 165000, premium: 165000, manager: 165000 },
        },
      },
      {
        id: "leg_waxing",
        name: "Full Legs",
        description: "Waxing kaki lengkap yang mulus dan tahan lama.",
        duration: "45 min",
        pricing: {
          hq: { regular: 200000, premium: 200000, manager: 200000 },
          kk: { regular: 220000, premium: 220000, manager: 220000 },
        },
      },
      {
        id: "bikini_line",
        name: "Bikini Line",
        description: "Pembersihan presisi area bikini.",
        duration: "20 min",
        badge: "Popular",
        popular: true,
        pricing: {
          hq: { regular: 150000, premium: 150000, manager: 150000 },
          kk: { regular: 275000, premium: 275000, manager: 275000 },
        },
      },
      {
        id: "brazilian",
        name: "Brazilian",
        description: "Waxing area intim lengkap — mulus dan bersih total.",
        duration: "30 min",
        pricing: {
          hq: { regular: 325000, premium: 325000, manager: 325000 },
          kk: { regular: 350000, premium: 350000, manager: 350000 },
        },
      },
      {
        id: "upper_lip",
        name: "Upper Lip",
        description: "Waxing bulu atas bibir yang cepat dan presisi.",
        duration: "10 min",
        pricing: {
          hq: { regular: 50000, premium: 50000, manager: 50000 },
          kk: { regular: 55000, premium: 55000, manager: 55000 },
        },
      },
    ],
  },
];

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

export function getPrice(service: Service, branch: BranchId, tier: TierId): number {
  return service.pricing[branch][tier];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace("IDR", "Rp");
}

export function getBranch(id: BranchId): Branch {
  return branches.find((b) => b.id === id)!;
}

export function getCategoryById(id: CategoryId): ServiceCategory {
  return serviceCategories.find((c) => c.id === id)!;
}

export function getPopularServices(limit = 6): { service: Service; category: ServiceCategory }[] {
  const result: { service: Service; category: ServiceCategory }[] = [];
  for (const cat of serviceCategories) {
    for (const svc of cat.services) {
      if (svc.popular) result.push({ service: svc, category: cat });
    }
  }
  return result.slice(0, limit);
}
