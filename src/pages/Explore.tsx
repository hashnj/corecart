import React, { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCards";
import axiosInstance from "@/lib/axiosInstance";
import { Search } from "lucide-react";

interface Product {
  discountPercentage: number;
  _id: string;
  title: string;
  description: string;
  price: number;
  tags:string[];
  stock: number;
  images: string[];
  vendor_id?: { business_name: string };
}

export const Explore: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/product/explore?page=${page}&limit=20`);
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [page]);

  return (
    <div className="p-4 w-full h-full">
      <div className=" w-full h-56 flex justify-center flex-col bg-gradient-to-br from-background to background via-text/10 p-4 rounded-xl m-2 ">
      <h1 className="text-2xl font-semibold mb-4">Explore a Variety of Products</h1>
      <button className="w-8 p-1"><Search/></button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              tags={product.tags[0]}
              discount={product.discountPercentage}
              image={product.images || ["/default-placeholder.png"]}
              title={product.title || "Untitled Product"}
              description={product.description || "No description available."}
              price={product.price || 0}
              stock={product.stock || 0}
              vendor={product.vendor_id?.business_name || "Unknown Vendor"}
              id={product._id}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-backgrounds hover:bg-text/20 rounded-lg mx-2">
          Prev
        </button>
        <span className="p-2">Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 bg-backgrounds hover:bg-text/20 rounded-lg mx-2">
          Next
        </button>
      </div>
    </div>
  );
};
