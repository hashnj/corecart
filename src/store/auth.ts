import { atom, selector } from "recoil";
import axiosInstance from "@/lib/axiosInstance";
import { AuthResponse } from "@/types";

export const auth = atom<AuthResponse | null>({
  key: "auth",
  default: null,
});

export const authCheck = selector<AuthResponse | null>({
  key: "check",
  //@ts-ignore
  get: async ({  }) => {
    try {
      const response = await axiosInstance.post<{ user: AuthResponse }>("/auth/");
      const data = response.data;
      console.log("Auth Data:", data);

      if (data) {
        return data;
      }
    } catch (error: any) {
      console.error("Error fetching auth status:", error);
    }
    return null;
  },
});
