/* eslint-disable no-empty-pattern */
import { atom, selector } from "recoil";
import axiosInstance from "@/lib/axiosInstance";
import { AuthResponse } from "@/types";

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
      console.log(data);

      if (data) {
        return data;
      }
    } catch (error) {
      console.error("Error fetching auth status:", error);
    }
    return null;
  },
});
