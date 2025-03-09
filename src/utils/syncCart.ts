/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axiosInstance";

const syncCart = async (localCart: any[]) => {
  try {
    const res = await axiosInstance.post(`/cart/sync`, { cart: localCart }, { withCredentials: true });
    return res.data.cart; 
  } catch (error) {
    console.error("Failed to sync cart:", error);
    return localCart; 
  }
};

export default syncCart;
