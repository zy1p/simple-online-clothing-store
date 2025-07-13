import type { User } from "@/../../backend/libs/db/src/model/user.model";
import { z } from "zod/v4";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { api } from "../lib/axios";

type AuthStore = {
  access_token: string;
  sub: string;
  exp: number;
  isExpired: () => boolean;
  isAuthenticated: () => boolean;
  signup: (formData: FormData) => Promise<boolean>;
  login: (data: z.infer<typeof loginFormSchema>) => Promise<void>;
  getAccessToken: () => string;
  clear: () => void;
  getUser: () => Promise<User | null>;
};

export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        access_token: "",
        sub: "",
        exp: 0,
        isExpired: () => get().exp < Date.now() / 1000,
        isAuthenticated: () => {
          return get().access_token !== "" && !get().isExpired();
        },

        clear: () => set({ access_token: "", sub: "", exp: 0 }),

        getAccessToken: () => {
          if (get().isExpired()) return "";

          return get().access_token;
        },

        signup: async (formData) => {
          const dto = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
          };

          const { data: success } = await api.post<boolean>(
            "/users/signup",
            dto,
          );

          return success;
        },

        login: async ({ username, password }) => {
          const dto = {
            usernameOrEmail: username,
            password,
          };

          const {
            data: { access_token, sub, exp },
          } = await api.post<{
            access_token: string;
            sub: string;
            iat: number;
            exp: number;
          }>("/users/login", dto);

          set({
            access_token,
            sub,
            exp,
          });
        },

        getUser: async () => {
          const { data: user } = await api.get<User>("/users/me");

          return user;
        },
      }),

      {
        name: "auth-storage",
      },
    ),
  ),
);

useAuthStore.subscribe(
  (state) => state.access_token,
  (access_token) =>
    (api.defaults.headers.common.Authorization = `Bearer ${access_token}`),
);

export const loginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number",
    })
    .refine(
      (password) => /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password),
      {
        message: "Password must contain at least one special character",
      },
    ),
});
