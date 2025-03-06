import React, { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCards";
// import { WishList } from "@/components/Wishlist";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { filterState } from "../store/filter";
import { FilterSidebar } from "@/components/FilterSidebar";
import axiosInstance from "@/lib/axiosInstance";

interface Product {
  discountPercentage: number;
  tags: string[];
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  vendor_id?: { business_name: string };
}

const Products: React.FC = () => {
  const [filter] = useRecoilState(filterState);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams({
          search: filter.search || "",
          category: filter.category || "",
          minPrice: filter.minPrice ? filter.minPrice.toString() : "",
          maxPrice: filter.maxPrice ? filter.maxPrice.toString() : "",
          sortBy: filter.sortBy || "price",
          order: filter.order || "asc",
          page: "1",
          limit: "20",
        }).toString();

        const res = await axiosInstance.get(`/product/filter?${queryParams}`);
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter]);

  return (
    <div className="flex flex-col min-h-screen h-full justify-center items-center bg-background text-text w-full">
      <div className="flex min-h-screen w-full bg-background text-text">
        <div className="bg-background h-screen border-gray-200">
          <FilterSidebar />
        </div>

        <div className="grid bg-background gap-2 w-full p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <div className="flex justify-center items-center w-full">
              <AiOutlineLoading3Quarters className="text-7xl animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-xl text-text/50 col-span-full">{error}</div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id}
                discount={product.discountPercentage}
                image={product.images}
                title={product.name}
                description={product.description}
                vendor={product.vendor_id?.business_name || "Admin"}
                price={product.price}
                stock={product.stock}
                id={product._id} tags={product.tags[0]} 
              />
            ))
          ) : (
            <div className="text-center text-xl text-text/50 col-span-full">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Products;