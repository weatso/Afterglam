import { create } from "zustand";
import { BranchId, CategoryId, TierId, Service, branches, serviceCategories, getBranch, formatPrice, getPrice } from "@/lib/data";

interface ReservationState {
  // Core state
  activeBranch: BranchId | null;
  activeCategory: CategoryId;
  selectedService: Service | null;
  selectedTier: TierId;
  isIslandExpanded: boolean;
  isBranchModalOpen: boolean;
  isServicePanelOpen: boolean;

  // Actions
  setBranch: (branch: BranchId) => void;
  setCategory: (category: CategoryId) => void;
  selectService: (service: Service) => void;
  setTier: (tier: TierId) => void;
  expandIsland: () => void;
  collapseIsland: () => void;
  openBranchModal: () => void;
  closeBranchModal: () => void;
  openServicePanel: (service: Service) => void;
  closeServicePanel: () => void;
  clearService: () => void;

  // Computed
  currentPrice: () => number | null;
  whatsappUrl: () => string | null;
}

export const useReservationStore = create<ReservationState>((set, get) => ({
  activeBranch: null,
  activeCategory: "lash",
  selectedService: null,
  selectedTier: "regular",
  isIslandExpanded: false,
  isBranchModalOpen: false,
  isServicePanelOpen: false,

  setBranch: (branch) => {
    set({ activeBranch: branch, isBranchModalOpen: false, isIslandExpanded: false });
  },

  setCategory: (category) => {
    set({ activeCategory: category, selectedService: null, isServicePanelOpen: false });
  },

  selectService: (service) => {
    set({ selectedService: service });
  },

  setTier: (tier) => {
    set({ selectedTier: tier });
  },

  expandIsland: () => set({ isIslandExpanded: true }),
  collapseIsland: () => set({ isIslandExpanded: false }),
  openBranchModal: () => set({ isBranchModalOpen: true }),
  closeBranchModal: () => set({ isBranchModalOpen: false }),

  openServicePanel: (service) => {
    set({ selectedService: service, isServicePanelOpen: true });
  },

  closeServicePanel: () => {
    set({ isServicePanelOpen: false, selectedService: null });
  },

  clearService: () => {
    set({ selectedService: null, isServicePanelOpen: false });
  },

  currentPrice: () => {
    const { activeBranch, selectedService, selectedTier } = get();
    if (!activeBranch || !selectedService) return null;
    return getPrice(selectedService, activeBranch, selectedTier);
  },

  whatsappUrl: () => {
    const { activeBranch, selectedService, selectedTier } = get();
    if (!activeBranch || !selectedService) return null;

    const branch = getBranch(activeBranch);
    const price = getPrice(selectedService, activeBranch, selectedTier);
    const tierLabel = selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1);
    const priceFormatted = formatPrice(price);

    const message = encodeURIComponent(
      `Halo Afterglam ${branch.name.replace("Afterglam ", "")}, saya ingin reservasi *${selectedService.name}* dengan teknisi *${tierLabel}*. Total: *${priceFormatted}*. Mohon info ketersediaan jadwal. 🌸`
    );

    return `https://wa.me/${branch.whatsapp}?text=${message}`;
  },
}));
