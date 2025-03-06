import React, { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCards";
import axiosInstance from "@/lib/axiosInstance";
import { Loader2 } from "lucide-react";


interface Product {
  discountPercentage: number;
  brand: string ;
  _id: string;
  title: string;
  description: string;
  price: number;
  tags:string[];
  stock: number;
  images: string[];
  vendor_id?: { business_name: string };
}

export const Home: React.FC = () => {
  const [sections, setSections] = useState<{ trending: Product[]; topRated: Product[]; newArrivals: Product[] }>({
    trending: [],
    topRated: [],
    newArrivals: [],
  });
  const [loading, setLoading] = useState(false);


  

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/product/home");
        setSections(res.data.sections);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
      setLoading(false);
    };

    fetchHomeData();
  }, []);

  return (
    <div className="">
       
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center text-primary">
          <Loader2 className="animate-spin size-20"/>
        </div>
      ) : (
        <>
          <ProductSection title="🔥 Trending Products" products={sections.trending} />
          <ProductSection title="⭐ Top Rated" products={sections.topRated} />
          <ProductSection title="🆕 New Arrivals" products={sections.newArrivals} />
        </>
      )}
    </div>
  );
};

const ProductSection = ({ title, products }: { title: string; products: Product[]; }) => (
  <div className="mb-6">
    <h2 className="text-4xl font-semibold py-6  text-text">{title}</h2>
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 `}>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            tags={product.tags[0]}
            key={product._id}
            image={product.images || ["/default-placeholder.png"]}
            title={product.title || "Untitled Product"}
            discount={product.discountPercentage}
            description={product.description || "No description available."}
            price={product.price || 0}
            stock={product.stock || 0}
            vendor={product.vendor_id?.business_name ||product.brand || "Unknown Vendor"}
            id={product._id}
          />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  </div>
);
