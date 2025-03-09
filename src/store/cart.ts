/* eslint-disable @typescript-eslint/no-explicit-any */
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
      const fetchedCart = response.data.cart || [];

      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

      // 🔹 Only update localStorage if the fetched cart is different
      if (JSON.stringify(localCart) !== JSON.stringify(fetchedCart)) {
        localStorage.setItem("cart", JSON.stringify(fetchedCart));
      }

      return fetchedCart;
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      return JSON.parse(localStorage.getItem("cart") || "[]");
    }
  },
});

export const setCartAndStorage = (
  newCart: CartItem[],
  setCart: (updater: (prev: CartItem[]) => CartItem[]) => void
) => {
  setCart(()=>newCart);
  localStorage.setItem("cart", JSON.stringify(newCart));
};

export const addToCart = async (productId: string, setCart: any) => {
  try {
    await axiosInstance.post(`/cart/add`, { productId, quantity: 1 });
    const response = await axiosInstance.get(`/cart`);

    setCartAndStorage(response.data.cart, setCart);
    toast.success("Added to cart");
  } catch (error) {
    console.error("Failed to add to cart:", error);
  }
};

export const updateCartQuantity = async (productId: string, quantity: number, setCart: any) => {
  try {
    await axiosInstance.post(`/cart/update`, { productId, quantity });
    const response = await axiosInstance.get(`/cart`);

    setCartAndStorage(response.data.cart, setCart);
  } catch (error) {
    console.error("Failed to update cart quantity:", error);
  }
};

export const removeFromCart = async (productId: string, setCart: any) => {
  try {
    await axiosInstance.delete(`/cart/remove/${productId}`);
    const response = await axiosInstance.get(`/cart`);

    setCartAndStorage(response.data.cart, setCart);
    toast.success("Removed from cart");
  } catch (error) {
    console.error("Failed to remove from cart:", error);
  }
};
