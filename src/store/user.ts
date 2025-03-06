/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axiosInstance";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "@/store/auth";

export const useLogout = () => {
  const navigate = useNavigate();
  const [_authh, setAuth] = useRecoilState(auth);

  const handleLogOut = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");

      if (response.status === 200) {
        setAuth(null);
        toast.success("Logged out successfully!");
        navigate("/login"); 
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Logout error:", error.response?.data || error.message);
      toast.error("Already logged out or network issue.");
    }
  };

  return handleLogOut;
};
