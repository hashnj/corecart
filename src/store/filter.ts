import axiosInstance from "@/lib/axiosInstance";
import { atom, selector } from "recoil";

export const filterState = atom({
  key: "filterState",
  default: {
    search: "", 
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    vendor: "",
    sortBy: "price",
    order: "asc",
  },
});

export const paginationState = atom({
  key: "paginationState",
  default: {
    page: 1,
    limit: 20,
  },
});

export const filteredProducts = selector({
  key: "filteredProducts",
  get: async ({ get }) => {
    const filter = get(filterState);
    const pagination = get(paginationState);

    try {
      const queryParams = new URLSearchParams({
        ...(filter.search && { search: filter.search }), // 🔹 Now using `filter.search`
        ...(filter.category && { category: filter.category }),
        ...(filter.vendor && { vendor: filter.vendor }),

        minPrice: filter.minPrice.toString(),
        maxPrice: filter.maxPrice.toString(),

        sortBy: filter.sortBy,
        order: filter.order,

        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      }).toString();

      const response = await axiosInstance.get(`/products/filter?${queryParams}`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching products:", error);
      return { data: [], totalProducts: 0, currentPage: 1, totalPages: 1 };
    }
  },
});
