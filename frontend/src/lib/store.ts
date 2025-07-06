import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "./axios";

type AuthStore = {
  access_token: string;
  sub: string;
  exp: number;
  login: (formData: FormData) => Promise<void>;
  getAccessToken: () => string;
  clear: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      access_token: "",
      sub: "",
      exp: 0,
      clear: () => set({ access_token: "", sub: "", exp: 0 }),
      login: async (formData) => {
        const dto = {
          username: formData.get("username"),
          password: formData.get("password"),
        };

        const {
          data: { access_token },
        } = await api.post<{ access_token: string }>("/users/login", dto);

        const decoded = jwtDecode<{ sub: string; iat: number; exp: number }>(
          access_token,
        );

        set({
          access_token,
          sub: decoded.sub,
          exp: decoded.exp,
        });
      },
      getAccessToken: () => {
        if (get().exp < Date.now() / 1000) {
          // Token is expired
          return "";
        }

        return get().access_token;
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
