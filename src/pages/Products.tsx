import React from "react";
import { ProductCard } from "@/components/ProductCards";
import { FilterComponent } from "@/components/FilterComponent";
import { WishList } from "@/components/Wishlist";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {  useRecoilValueLoadable, useRecoilState } from "recoil";
import { products } from "../store/products";
import { filterState } from "../store/filter";
import { FilterSidebar } from "@/components/FilterSidebar";


export const Product: React.FC = () => {
  const [filter] = useRecoilState(filterState);
  const data = useRecoilValueLoadable(products);

  if (data.state === "loading") {
    return (
      <div className="flex justify-center text-7xl items-center bg-background text-primary h-screen">
        <AiOutlineLoading3Quarters className="animate-spin" />
      </div>
    );
  }

  if (data.state === "hasError") {
    return (
      <div className="flex justify-center bg-background text-text/30 font-bold items-center text-3xl h-screen">
        <div>Error: {String(data.contents)}</div>
      </div>
    );
  }

  const productData = data.contents; 
  console.log(productData);

  return (
    <div className="flex flex-col min-h-screen h-full justify-center items-center bg-backgrounds text-text w-full">
      <div className="flex min-h-screen w-full bg-background text-text">
        <div className="bg-background h-screen   border-gray-200">
            <FilterSidebar />
          </div>

          <div
            className={`grid bg-background gap-2 `} >
            {productData.map((product) => (
              <ProductCard
                key={product._id}
                image={product.images}
                title={product.name}
                description={product.description}
                vendor={product.vendor_id?.business_name || "Admin"}
                price={product.price}
                mrp={product.mrp}
                stock={product.stock}
                id={product._id}
              />
            ))}
          </div>

          {/* Wishlist section */}
          <div className="flex min-h-screen max-h-full text-background">
            <div className="absolute h-full text-text">
              <div className="sticky top-96 mt-72">
                <div className="h-16 group relative">
                  <WishList id="" />
                  <div className="absolute z-10 right-16 top-1 bg-background border border-text/20 p-2 rounded-lg hidden group-hover:block">
                    WishList
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
