import { selector } from "recoil";
import axiosInstance from "@/lib/axiosInstance";
import { CategoryResponse, Product } from "@/types";


export const products = selector<Product[]>({
  key: "products",
  get: async ({  }) => {
    try {
      const res = await axiosInstance.get("/products/");
      return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; 
    }
  },
});

export const categories = selector<CategoryResponse>({
  key: "categories",
  get: async ({  }) => {
    try {
      const res = await axiosInstance.get("/categories/");
      return res.data; 
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { categories: [], subCategories: [] }; 
    }
  },
});
