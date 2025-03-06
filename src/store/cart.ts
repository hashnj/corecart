import { atom, selector } from "recoil";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";

export interface CartItem {
  product_id: {
    _id: string;
    title: string;
    description: string;
    price: number;
    mrp: number;
    stock: number;
    images: string[];
  };
  quantity: number;
}

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});

export const getCart = selector({
  key: "getCart",
  get: async () => {
    try {
      const response = await axiosInstance.get(`/cart`);
      console.log("Recoil-Cart:", response.data.cart);
      return response.data.cart || [];
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      return [];
    }
  },
});

export const addToCart = async (
  productId: string,
  setCart: (updater: (prev: CartItem[]) => CartItem[]) => void
) => {
  try {
    await axiosInstance.post(`/cart/add`, { productId, quantity: 1 });
    const response = await axiosInstance.get(`/cart`);
    toast.success("Added to cart");
    setCart(response.data.cart);
  } catch (error) {
    console.error("Failed to add to cart:", error);
  }
};

export const updateCartQuantity = async (
  productId: string,
  quantity: number,
  setCart: (updater: (prev: CartItem[]) => CartItem[]) => void
) => {
  try {
    await axiosInstance.post(`/cart/update`, { productId, quantity });
    const response = await axiosInstance.get(`/cart`);
    
    setCart(response.data.cart);
  } catch (error) {
    console.error("Failed to update cart quantity:", error);
  }
};

export const removeFromCart = async (
  productId: string,
  setCart: (updater: (prev: CartItem[]) => CartItem[]) => void
) => {
  try {
    await axiosInstance.delete(`/cart/remove/${productId}`);
    const response = await axiosInstance.get(`/cart`);
    toast.success("Removed from cart");
    setCart(response.data.cart);
  } catch (error) {
    console.error("Failed to remove from cart:", error);
  }
};
