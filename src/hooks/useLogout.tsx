/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axiosInstance";
import { useRecoilRefresher_UNSTABLE, useRecoilState, useResetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, authCheck } from "@/store/auth";
import { userState } from "@/store/user";
import { cartState } from "@/store/cart";
import { wishlistState } from "@/store/wishList";

export const useLogout = () => {
  const navigate = useNavigate();
  const [_authh, setAuth] = useRecoilState(auth);
  const refreshAuth = useRecoilRefresher_UNSTABLE(authCheck);
  const resetUser = useResetRecoilState(userState);
  const resetCart = useResetRecoilState(cartState);
  const resetWishlist = useResetRecoilState(wishlistState);

  const handleLogOut = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");

      if (response.status === 200) {
        setAuth(null);
        resetUser();  
        resetCart();
        resetWishlist();
        refreshAuth();

        toast.success("Logged out successfully!");
        navigate("/auth/login");
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
