import { create } from "zustand";
import { persist } from "zustand/middleware";
import products from "@/../public/products.json";
import { api } from "@/lib/axios";

export type Product = Pick<(typeof products)[number], "_id" | "name" | "price">;

type CartStore = {
  items: Record<string, number>;
  addItem: (item: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getItemsCount: () => number;
  checkOut: () => Promise<void>;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: {},
      addItem: (item, quantity = 1) =>
        set((state) => ({
          items: {
            ...state.items,
            [item._id]: (state.items[item._id] ?? 0) + quantity,
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
      checkOut: async () => {
        const items = Object.entries(get().items).map(([id, quantity]) => {
          const product = products.find((p) => p._id === id);

          return {
            productId: id,
            name: product?.name,
            price: product?.price,
            quantity,
          };
        });

        await api.post("/sales", {
          products: items,
        });
      },
    }),

    {
      name: "cart-storage",
    },
  ),
);
