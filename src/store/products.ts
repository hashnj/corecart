import axiosInstance from "@/lib/axiosInstance";
import { CategoryResponse, Product } from "@/types";
import { atom, selector } from "recoil";


export const productIdAtom = atom<string | null>({
  key: "productIdAtom",
  default: null,
});

export const getProductById = selector<Product | null>({
  key: "getProductById",
  get: async ({ get }) => {
    const productId = get(productIdAtom);
    if (!productId) return null;

    try {
      const response = await axiosInstance.get(`/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  },
});


export const homeProducts = selector({
  key: "homeProducts",
  get: async () => {
    try {
      const res = await axiosInstance.get("/product/home");
      return res.data.sections; 
    } catch (error) {
      console.error("Error fetching home page products:", error);
      return { trending: [], topRated: [], newArrivals: [] };
    }
  },
});

export const paginatedProducts = selector({
  key: "paginatedProducts",
  get: async () => {
    try {
      const res = await axiosInstance.get(`/product/explore?page=1&limit=20`);
      return res.data;
    } catch (error) {
      console.error("Error fetching explore page products:", error);
      return { data: [], totalProducts: 0, totalPages: 0 };
    }
  },
});

export const categories = selector<CategoryResponse>({
  key: "categories",
  get: async () => {
    try {
      const res = await axiosInstance.get("/categories/");
      return res.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { categories: [], subCategories: [] };
    }
  },
});
