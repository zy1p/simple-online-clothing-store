import { env } from "@/env";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 1000,
  // withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  function (config) {
    const { isAuthenticated, access_token } = useAuthStore.getState();

    if (isAuthenticated()) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    error instanceof AxiosError &&
      toast.error(error.message, { id: "request" });

    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) useAuthStore.getState().clear();
      toast.error(error.message, { id: "response" });
    }
    return Promise.reject(error);
  },
);
