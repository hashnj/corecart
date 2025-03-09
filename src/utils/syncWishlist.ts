import axiosInstance from "@/lib/axiosInstance";
import { WishlistResponse } from "@/types";

const syncWishlist = async (localWishlist: WishlistResponse[]) => {
  try {
    const res = await axiosInstance.post(`/wishlist/sync`, { wishlist: localWishlist }, { withCredentials: true });
    return res.data.wishlist;
  } catch (error) {
    console.error("Failed to sync wishlist:", error);
    return localWishlist;
  }
};

export default syncWishlist;