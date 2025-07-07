import { create } from "zustand";
import { persist } from "zustand/middleware";
import type products from "@/../public/products.json";

export type Product = Pick<(typeof products)[number], "_id" | "name" | "price">;

type CartStore = {
  items: Record<string, number>;
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getItemsCount: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: {},
      addItem: (item) =>
        set((state) => ({
          items: {
            ...state.items,
            [item._id]: (state.items[item._id] ?? 0) + 1,
          },
        })),
      removeItem: (id) =>
        set((state) => {
          const newItems = { ...state.items };
          delete newItems[id];
          return { items: newItems };
        }),
      clearCart: () => set({ items: {} }),
      getItemsCount: () =>
        Object.values(get().items).reduce((total, count) => total + count, 0),
    }),

    {
      name: "cart-storage",
    },
  ),
);
