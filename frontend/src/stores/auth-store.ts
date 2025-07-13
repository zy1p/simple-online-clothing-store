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
  signup: (data: z.infer<typeof signupFormSchema>) => Promise<boolean>;
  login: (data: z.infer<typeof loginFormSchema>) => Promise<void>;
  updateProfile: (
    data: z.infer<typeof updateProfileFormSchema>,
  ) => Promise<void>;
  getAccessToken: () => string;
  clear: () => void;
  getUser: () => Promise<User>;
  deleteUser: () => Promise<void>;
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

        signup: async (dto) => {
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

        updateProfile: async (dto) => {
          await api.put<User>(`/users/${get().sub}`, dto);
        },

        deleteUser: async () => {
          await api.delete(`/users/${get().sub}`);
          get().clear();
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
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(20, { error: "Password must be at most 20 characters long" })
    .refine((password) => /[A-Z]/.test(password), {
      error: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      error: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      error: "Password must contain at least one number",
    })
    .refine(
      (password) => /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password),
      {
        error: "Password must contain at least one special character",
      },
    ),
});

export const signupFormSchema = loginFormSchema.extend({
  email: z.email(),
});

export const updateProfileFormSchema = signupFormSchema.partial().extend({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
  phoneNumber: z
    .e164({ error: "Invalid phone number" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(20, { error: "Password must be at most 20 characters long" })
    .refine((password) => /[A-Z]/.test(password), {
      error: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      error: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      error: "Password must contain at least one number",
    })
    .refine(
      (password) => /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password),
      {
        error: "Password must contain at least one special character",
      },
    )
    .or(z.literal(""))
    .optional(),
});
