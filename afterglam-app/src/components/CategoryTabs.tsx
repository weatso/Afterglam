"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useReservationStore } from "@/store/useReservationStore";
import { serviceCategories, CategoryId } from "@/lib/data";
import CategoryIcon from "@/components/CategoryIcon";

export default function CategoryTabs() {
  const { activeCategory, setCategory } = useReservationStore();

  return (
    <div>
      <div className="cat-tabs">
        {serviceCategories.map((cat) => (
          <button
            key={cat.id}
            className={`cat-tab ${activeCategory === cat.id ? "cat-tab-active" : ""}`}
            onClick={() => setCategory(cat.id as CategoryId)}
            aria-pressed={activeCategory === cat.id}
          >
            <CategoryIcon
              type={cat.iconType}
              size={16}
              color={activeCategory === cat.id ? "white" : cat.color}
            />
            {cat.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={activeCategory}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            color: "var(--muted)",
            marginTop: 12,
          }}
        >
          {serviceCategories.find((c) => c.id === activeCategory)?.description}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
