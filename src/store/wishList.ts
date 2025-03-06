/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, selector } from "recoil";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";

export const wishlistState = atom<any[]>({
  key: "wishlistState",
  default: [],
});

export const getWishlist = selector({
  key: "getWishlist",
  get: async () => {
    try {
      const response = await axiosInstance.get(`/wishlist`);
      return response.data.wishlist[0].product_id || [];
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      return [];
    }
  },
});

export const addToWishlist = async (
  productId: string,
  setWishlist: (updater: (prev: any[]) => any[]) => void
) => {
  try {
    await axiosInstance.post(`/wishlist/add`, { productId: productId });
    toast.success("Added to wishlist");
    setWishlist((prev) => [...prev, productId]);
  } catch (error) {
    console.error("Failed to add to wishlist:", error);
  }
};

export const removeFromWishlist = async (
  productId: string,
  setWishlist: (updater: (prev: any[]) => any[]) => void
) => {
  try {
    await axiosInstance.delete(`/wishlist/remove/${productId}`);
    setWishlist((prev) => prev.filter((product) => product._id !== productId));
    toast.success("Removed from wishlist");
  } catch (error) {
    console.error("Failed to remove from wishlist:", error);
  }
};


export const removeAll = async (
  setWishlist: (updater: (prev: any[]) => any[]) => void
) => {
  try {
    await axiosInstance.delete(`/wishlist/remove`);
    toast.success("Wishlist cleared");

    setWishlist(() => []); 
  } catch (error) {
    console.error("Failed to remove all wishlist items:", error);
  }
};

