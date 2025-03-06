/* eslint-disable no-empty-pattern */
import { atom, selector } from "recoil";
import axiosInstance from "@/lib/axiosInstance";
import { AuthResponse } from "@/types";
import { syncCart } from "@/utils/syncCart";

export const auth = atom<AuthResponse | null>({
  key: "auth",
  default: null,
});

export const authCheck = selector<AuthResponse | null>({
  key: "check",
  get: async ({}) => {
    try {
      const response = await axiosInstance.post<AuthResponse>("/auth/");
      const data = response.data;
      // console.log(data);

      if (data) {
        const localCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        await syncCart(localCart);
        localStorage.removeItem("guestCart");
        return data;
      }
    } catch (error) {
      console.error("Error fetching auth status:", error);
    }
    return null;
  },
});
