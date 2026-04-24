# Afterglam Reservation Engine

> **Status:** Production-ready (Phase 1)  
> **Stack:** Next.js 16 · Tailwind CSS v4 · Zustand · Framer Motion  
> **Author:** Antigravity AI — April 2026

---

## 🗂 Project Structure

```
afterglam-app/
├── src/
│   ├── app/
│   │   ├── globals.css              # ← Design system (edit untuk ubah warna/spacing)
│   │   ├── layout.tsx               # Root layout + Google Fonts + SEO metadata
│   │   ├── page.tsx                 # Landing page utama
│   │   └── reservation/
│   │       └── page.tsx             # Halaman katalog & booking
│   ├── components/
│   │   ├── CategoryIcon.tsx         # Custom SVG icons per kategori layanan
│   │   ├── CategoryTabs.tsx         # Tab navigasi kategori
│   │   ├── DynamicIsland.tsx        # Floating pill navigasi + branch modal
│   │   ├── ReservationPanel.tsx     # Desktop sidebar + Mobile bottom sheet + Sticky bar
│   │   └── ServiceGrid.tsx          # Grid kartu layanan dengan harga live
│   ├── lib/
│   │   └── data.ts                  # ← SINGLE SOURCE OF TRUTH (harga, cabang, layanan)
│   └── store/
│       └── useReservationStore.ts   # Zustand global state
└── public/
    └── logo.png                     # Logo Afterglam
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build
npm start
```

---

## ⚙️ Konfigurasi Penting

### 1. Update Nomor WhatsApp (WAJIB sebelum launch)

Edit file `src/lib/data.ts`, bagian `branches`:

```ts
export const branches: Branch[] = [
  {
    id: "hq",
    name: "Afterglam Central",
    whatsapp: "6281234567890",   // ← Ganti dengan nomor WA asli
    address: "Jl. ...",         // ← Ganti dengan alamat asli
    mapsUrl: "https://maps.google.com/...", // ← Ganti link Google Maps
  },
  {
    id: "kk",
    name: "Afterglam KK",
    whatsapp: "6281234567891",   // ← Ganti dengan nomor WA asli KK
    address: "...",
  },
];
```

### 2. Update Harga

Setiap service di `src/lib/data.ts` memiliki struktur:

```ts
pricing: {
  hq: { regular: 250000, premium: 300000, manager: 350000 },
  kk: { regular: 275000, premium: 330000, manager: 385000 },
}
```

Cukup ubah angka yang relevan. Semua halaman akan otomatis update.

### 3. Tambah Layanan Baru

```ts
// Di dalam array services pada kategori yang sesuai:
{
  id: "nama_unik",
  name: "Nama Layanan",
  description: "Deskripsi singkat",
  duration: "60 min",
  badge: "Bestseller",     // opsional: Bestseller | Premium | Trending | Popular | Custom | dll
  popular: true,           // opsional: tampil di pricelist landing page
  pricing: {
    hq: { regular: 200000, premium: 250000, manager: 300000 },
    kk: { regular: 220000, premium: 275000, manager: 330000 },
  },
  isRetouch: true,         // opsional: tampilkan harga retouch
  retouchPricing: {
    hq: { regular: 150000, premium: 200000, manager: 250000 },
    kk: { regular: 150000, premium: 200000, manager: 250000 },
  },
},
```

### 4. Tambah Cabang Baru

```ts
// Di branches array (data.ts):
{ id: "branch_id", name: "Afterglam XYZ", ... }

// Update type:
export type BranchId = "hq" | "kk" | "branch_id";

// Tambahkan pricing di setiap service:
pricing: {
  hq: { ... },
  kk: { ... },
  branch_id: { regular: 0, premium: 0, manager: 0 },
}
```

---

## 🎨 Design System

File: `src/app/globals.css`

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--rose-500` | `#c96a56` | Primary accent, CTA hover |
| `--rose-600` | `#b35240` | Prices, selected states |
| `--deep-brown` | `#2c1810` | Text, dark buttons |
| `--cream` | `#faf7f2` | Page background |
| `--earth-100` | `#ede5d8` | Card accents |
| `--muted` | `#8a7b72` | Subtext, icons |

### Typography

| Variable | Font | Usage |
|---|---|---|
| `--font-display` | Playfair Display | Headings, prices, brand |
| `--font-body` | DM Sans | Body copy |
| `--font-ui` | Inter | Labels, buttons, UI |

---

## 🧠 State Management (Zustand)

File: `src/store/useReservationStore.ts`

| State | Type | Default |
|---|---|---|
| `activeBranch` | `BranchId \| null` | `null` |
| `activeCategory` | `CategoryId` | `"lash"` |
| `selectedService` | `Service \| null` | `null` |
| `selectedTier` | `TierId` | `"regular"` |
| `isIslandExpanded` | `boolean` | `false` |
| `isBranchModalOpen` | `boolean` | `false` |
| `isServicePanelOpen` | `boolean` | `false` |

---

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `< 1024px` | Mobile/tablet: single column, bottom sheet, sticky bar |
| `≥ 1024px` | Desktop: editorial split (catalog left, panel right) |

---

## 🔗 Routes

| Route | Description |
|---|---|
| `/` | Landing page (hero, services overview, pricelist, CTA) |
| `/reservation` | Full catalog dengan reservation engine |
| `/reservation?category=lash` | Auto-select kategori via URL param |

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.x | Framework |
| `react` | 19.x | UI |
| `tailwindcss` | 4.x | Utility CSS |
| `framer-motion` | 12.x | Animations |
| `zustand` | 5.x | State management |
| `lucide-react` | 1.x | Icons |

---

## 🚀 Deployment (Vercel)

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "initial"
git remote add origin https://github.com/your/afterglam.git
git push

# 2. Import ke Vercel → vercel.com/new
# 3. Framework: Next.js (auto-detected)
# 4. Deploy → done ✅
```

---

## ✅ Phase 1 Checklist

- [x] Landing page premium
- [x] Dynamic Island navigation
- [x] Branch-aware pricing (HQ vs KK)
- [x] Tier system (Regular / Premium / Manager)
- [x] Real-time animated price counter
- [x] WhatsApp booking routing
- [x] Desktop editorial layout
- [x] Mobile bottom sheet
- [x] Proper category icons (eyelash, brow, nails, waxing)
- [x] Fully responsive (mobile → desktop)

## 🔜 Phase 2 Suggestions

- [ ] Update nomor WA dan alamat asli cabang
- [ ] Tambah foto layanan / portfolio
- [ ] Google Maps embed per cabang
- [ ] Testimonial / ulasan pelanggan
- [ ] Instagram feed integration
- [ ] Admin panel untuk update harga
- [ ] Analytics (Vercel Analytics / GA4)
- [ ] Domain custom (afterglam.id)
