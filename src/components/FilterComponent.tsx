import React, { ChangeEvent } from "react";
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { filterState, searchState } from "../store/filter";
import { categories } from "@/store/products";
import { Category } from "@/types";
import { ListFilter } from "lucide-react";
import { filterSidebar } from "@/store/visible";

export const FilterComponent: React.FC = () => {
  const [filters, setFilters] = useRecoilState(filterState);
  const [search, setSearch] = useRecoilState(searchState);
  const categoriesLoadable = useRecoilValueLoadable(categories);
  const setSidebar = useSetRecoilState(filterSidebar);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: Number(value), 
    }));
  };

  const ensureValidPrices = () => {
    if (filters.minPrice+100 > filters.maxPrice) {
      setFilters((prev) => ({ ...prev, maxPrice: prev.minPrice+100 }));
    }
  };

  const renderCategories = () => {
    if (categoriesLoadable.state === "loading") {
      return <option>Loading categories...</option>;
    }

    if (categoriesLoadable.state === "hasError") {
      return <option>Error loading categories</option>;
    }

    const { categories: fetchedCategories }: { categories: Category[] } =
      categoriesLoadable.contents;

    return fetchedCategories.map((category) => (
      <option key={category._id} value={category.name}>
        {category.name}
      </option>
    ));
  };

  return (
    <div className="flex flex-col p-4 bg-background text-text rounded-md shadow-md space-y-4">
      <div className="flex justify-between">
        <div
          className="cursor-pointer"
          onClick={() => {
            setSidebar((prev) => !prev);
          }}
        >
          <ListFilter />
        </div>
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Price Range</label>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted">Min: ₹{filters.minPrice}</span>
          <input
            type="range"
            name="minPrice"
            min="0"
            max="10000"
            step="50"
            value={filters.minPrice}
            onChange={handleFilterChange}
            onBlur={ensureValidPrices}
            className="p-2 border accent-primary bg-backgrounds rounded w-full border-text/20"
            aria-label="Minimum price"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted">Max: ₹{filters.maxPrice}</span>
          <input
            type="range"
            name="maxPrice"
            min="0"
            max="10000"
            step="50"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            onBlur={ensureValidPrices} 
            className="p-2 border accent-primary bg-backgrounds rounded w-full border-text/20"
            aria-label="Maximum price"
          />
        </div>
      </div>

      <input
        type="text"
        name="vendor"
        placeholder="Vendor name"
        value={filters.vendor}
        onChange={handleFilterChange}
        className="p-2 bg-backgrounds border border-text/20 rounded"
      />
      <button
        onClick={() => setFilters({ category: '', minPrice: 0, maxPrice: 1000, vendor: '' })}
        className="mt-2 p-2 bg-primary text-white rounded"
      >
        Reset Filters
      </button>
    </div>
  );
};
