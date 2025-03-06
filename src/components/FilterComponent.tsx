import React, { ChangeEvent } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { filterState } from "../store/filter";
import { categories } from "@/store/products";
import { Category } from "@/types";
// import { ListFilter } from "lucide-react";
// import { filterSidebar } from "@/store/visible";

export const FilterComponent: React.FC = () => {
  const [filters, setFilters] = useRecoilState(filterState);
  const categoriesLoadable = useRecoilValueLoadable(categories);
  // const setSidebar = useSetRecoilState(filterSidebar);

  // Handle input changes
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: ["minPrice", "maxPrice"].includes(name) ? Number(value) : value,
    }));
  };

  // Ensure price range is valid
  const ensureValidPrices = () => {
    if (filters.minPrice >= filters.maxPrice - 100) {
      setFilters((prev) => ({ ...prev, maxPrice: prev.minPrice + 100 }));
    }
  };

  // Render category options
  const renderCategories = () => {
    if (categoriesLoadable.state === "loading") return <option>Loading categories...</option>;
    if (categoriesLoadable.state === "hasError") return <option>Error loading categories</option>;

    return categoriesLoadable.contents.categories.map((category: Category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ));
  };

  return (
    <div className="flex flex-col p-4 bg-background text-text rounded-md shadow-md space-y-4">
      <div className="flex justify-between items-center">
        {/* <button onClick={() => setSidebar(false)} className="text-lg font-semibold flex items-center gap-2">
          <ListFilter className="h-5 w-5" /> Filters
        </button> */}
      </div>

      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={filters.search}
        onChange={handleFilterChange}
        className="p-2 bg-backgrounds border rounded border-text/20"
      />

      <select
        name="category"
        value={filters.category}
        onChange={handleFilterChange}
        className="p-2 border bg-backgrounds rounded border-text/20"
      >
        <option value="">All Categories</option>
        {renderCategories()}
      </select>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Price Range (₹)</label>

        <div className="flex items-center space-x-2">
          <span className="text-sm">Min: {filters.minPrice}</span>
          <input
            type="range"
            name="minPrice"
            min="0"
            max="10000"
            step="50"
            value={filters.minPrice}
            onChange={handleFilterChange}
            onBlur={ensureValidPrices}
            className="w-full accent-primary"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm">Max: {filters.maxPrice}</span>
          <input
            type="range"
            name="maxPrice"
            min="0"
            max="10000"
            step="50"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            onBlur={ensureValidPrices}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Vendor Input */}
      <input
        type="text"
        name="vendor"
        placeholder="Vendor name"
        value={filters.vendor}
        onChange={handleFilterChange}
        className="p-2 bg-backgrounds border border-text/20 rounded"
      />

      {/* Sorting */}
      <div className="flex justify-between space-x-2">
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          className="p-2 border bg-backgrounds rounded border-text/20 w-1/2"
        >
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="salesCount">Best Selling</option>
        </select>

        <select
          name="order"
          value={filters.order}
          onChange={handleFilterChange}
          className="p-2 border bg-backgrounds rounded border-text/20 w-1/2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={() =>
          setFilters({
            search: "",
            category: "",
            minPrice: 0,
            maxPrice: 1000,
            vendor: "",
            sortBy: "price",
            order: "asc",
          })
        }
        className="mt-2 p-2 bg-primary text-white rounded"
      >
        Reset Filters
      </button>
    </div>
  );
};
