import { selector } from "recoil";
import { auth } from "./auth"; 
import axiosInstance from "@/lib/axiosInstance";

export const logoutSelector = selector<void>({
  key: "logoutSelector",
  get: () => {}, 

  set: async ({ set }) => {
    try {
      const response = await axiosInstance.post("/auth/logout", {});

      if (response.status === 200) {
        set(auth, null); 
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error: any) {
      console.error("Logout error:", error);
    }
  },
});
