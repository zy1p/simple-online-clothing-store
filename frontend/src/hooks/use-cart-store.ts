import { create } from "zustand";
import { persist } from "zustand/middleware";
import type products from "@/../public/products.json";

export type Product = Pick<(typeof products)[number], "_id" | "name" | "price">;

type CartStore = {
  items: Map<string, number>;
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getItemsCount: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: new Map<string, number>(),
      addItem: (item) => {
        const items = get().items;
        items.set(item._id, (items.get(item._id) ?? 0) + 1);
        set({ items });
      },
      removeItem: (id) => {
        const items = get().items;
        items.delete(id);
        set({ items });
      },
      clearCart: () => set({ items: new Map<string, number>() }),
      getItemsCount: () => {
        const items = get().items;
        return Array.from(items.values()).reduce(
          (acc, count) => acc + count,
          0,
        );
      },
    }),

    {
      name: "cart-storage",
    },
  ),
);
