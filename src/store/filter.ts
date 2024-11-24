
import axiosInstance from "@/lib/axiosInstance";
import { atom, selector } from "recoil";

export const filterState = atom({
  key: "filterState",
  default: {
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    vendor: "",
  },
});

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const paginationState = atom({
  key: "paginationState",
  default: {
    page: 1,
    limit: 10,
  },
});

export const filteredProducts = selector({
  key: "filteredProducts",
  get: async ({ get }) => {
    const filter = get(filterState);
    const search = get(searchState);
    const pagination = get(paginationState);

    try {
      const queryParams = new URLSearchParams({
        ...(filter.category && { category: filter.category }),
        ...(filter.minPrice && { minPrice: filter.minPrice.toString() }),
        ...(filter.maxPrice && { maxPrice: filter.maxPrice.toString() }),
        ...(filter.vendor && { vendor: filter.vendor }),
        ...(search && { search }),
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      }).toString();

      const response = await axiosInstance.get(`/products?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return { data: [], totalProducts: 0, currentPage: 1, totalPages: 1 };
    }
  },
});