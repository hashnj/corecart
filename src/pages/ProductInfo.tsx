/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState, useRecoilRefresher_UNSTABLE } from "recoil";
import { useEffect, useState } from "react";
import { FaCartArrowDown, FaHeart, FaRegHeart } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getWishlist, wishlistState, addToWishlist, removeFromWishlist } from "../store/wishList";
import { cartState, getCart, addToCart, removeFromCart } from "@/store/cart";
import { getProductById, productIdAtom } from "@/store/products";
import BuyProcessing from "../components/BuyProcessing";
import { buyM } from "../store/buy";
import { Product } from "@/types";
import { STRIPE_PUBLIC_KEY } from "@/config";
import axiosInstance from "@/lib/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";


const ProductInfo = () => {
  const { id } = useParams<{ id: string }>();
  const setProductId = useSetRecoilState(productIdAtom);
  const productData = useRecoilValueLoadable(getProductById);

  const [wishlist, setWishlist] = useRecoilState(wishlistState);
  const [cart, setCart] = useRecoilState(cartState);
  const [buy, _setBuy] = useRecoilState(buyM);
  const [pic, setPic] = useState<string>("");

  const wishlistData = useRecoilValueLoadable(getWishlist);
  const cartData = useRecoilValueLoadable(getCart);

  const refreshWishlist = useRecoilRefresher_UNSTABLE(getWishlist);
  const refreshCart = useRecoilRefresher_UNSTABLE(getCart);

  
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);




  useEffect(() => {
    if (id) setProductId(id);
  }, [id, setProductId]);

  useEffect(() => {
    if (wishlistData.state === "hasValue") {
      setWishlist(wishlistData.contents);
    }
  }, [wishlistData, setWishlist]);

  useEffect(() => {
    if (cartData.state === "hasValue") {
      setCart(cartData.contents);
    }
  }, [cartData, setCart]);

  useEffect(() => {
    if (productData.state === "hasValue" && productData.contents) {
      if (productData.contents.thumbnail) {
        setPic(productData.contents.thumbnail);
      }
    }
  }, [productData]);

  const isWishlisted = id ? wishlist.find((item) => item._id === id) : false;
  const isInCart = id ? cart.some((item) => item.product_id._id === id) : false;

  const handleWishlistToggle = async () => {
    if (!id) return;
    if (isWishlisted) {
      await removeFromWishlist(id, setWishlist);
    } else {
      await addToWishlist(id, setWishlist);
    }
    refreshWishlist();
  };

  const handleCartToggle = async () => {
    if (!id || !productData.contents) return;

    if (isInCart) {
      await removeFromCart(id, setCart);
    } else {
      await addToCart(productData.contents._id, setCart);
    }
    refreshCart();
  };

  const handleBuyNow = async () => {
    if (!product) return;
  
    try {
      const stripe = await stripePromise;
      const { data } = await axiosInstance.post(`/order/create-checkout-session`, {
        cartItems: [{ product_id: product, quantity: 1 }], // ✅ Send a single product
      });
  
      await stripe?.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
    }
  };

  if (productData.state === "loading") {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-background text-primary">
        <AiOutlineLoading3Quarters className="text-6xl animate-spin" />
      </div>
    );
  }

  if (productData.state === "hasError" || !productData.contents) {
    return (
      <div className="flex justify-center items-center h-screen text-4xl text-gray-500 font-bold">
        Error Loading Product...
      </div>
    );
  }

  const product: Product = productData.contents;
  let mrp;
  if (product.discountPercentage) {
    mrp = Math.round(
      product.price + (product.price * product.discountPercentage) / 100
    ).toFixed(2);
  } else {
    mrp = product.price;
  }

  return (
    <div className="bg-background text-text w-full min-h-screen">
      {buy && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md z-10">
          <div className="max-w-xl w-4/5 md:w-3/5 h-5/6 bg-background border border-gray-300 rounded-lg shadow-lg p-4">
            <BuyProcessing />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col sm:flex-row md:flex-col items-center">
            <div className="flex flex-col w-full m-auto items-center">
              <div className="w-full max-w-md lg:max-w-lg">
                <img
                  src={pic}
                  alt={product.title}
                  className="rounded-lg m-auto shadow-md transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {product.images?.map((img) => (
                  <button key={img} onClick={() => setPic(img)}>
                    <img
                      className="w-16 h-16 border border-gray-300 rounded-md shadow-sm hover:border-primary"
                      src={img}
                      alt="Thumbnail"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className=" mt-4 text-text/80 pt-4 pl-12 w-full space-y-2">
              <p>
                <strong>Brand:</strong> {product.brand || "N/A"}
              </p>
              <p>
                <strong>Category:</strong> {product.category || "N/A"}</p>
              <p>
                <strong>Weight:</strong>{" "}
                {product.weight ? `${product.weight} kg` : "N/A"}
              </p>
              <p>
                <strong>Stock:</strong> {product.stock || "N/A"}
              </p>
              <p>
                <strong>Rating:</strong> {product.rating || "N/A"} ⭐
              </p>
              <p>
                <strong>Warranty:</strong>{" "}
                {product.warrantyInformation || "N/A"}
              </p>
              <p>
                <strong>Shipping Info:</strong>{" "}
                {product.shippingInformation || "N/A"}
              </p>
              <p>
                <strong>Return Policy:</strong> {product.returnPolicy || "N/A"}
              </p>
            </div>
          </div>

          <div className="space-y-6 my-auto">
            <h1 className="text-3xl font-bold text-primary">{product.title}</h1>
            <div className="flex flex-wrap gap-2">
              {product.tags?.map((t) => (
                <span
                  key={t}
                  className="bg-gray-800 text-white px-3 py-1 text-sm rounded-md"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-500">{product.description}</p>
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold text-primary/90">
                ₹{product.price}
              </span>
              <span className="text-lg text-text/50 line-through">₹{mrp}</span>
              {product.discountPercentage && (
                <span className="text-lg text-green-500">
                  {product.discountPercentage}% Off
                </span>
              )}
            </div>
            <div className="w-full lg:my-8 py-10">
              <button
                className="sm:w-11/12 w-full p-3 lg:p-4 text-white text-xl bg-red-600 hover:bg-red-500 m-2 rounded-xl flex justify-center items-center"
                onClick={handleWishlistToggle}
              >
                Wishlist{isWishlisted ? "ed" : ""} &nbsp;{" "}
                {isWishlisted ? <FaHeart /> : <FaRegHeart />}
              </button>
              <button
                className="sm:w-11/12 w-full p-3 lg:p-4 bg-primary hover:bg-primary/90 text-xl text-white rounded-xl m-2"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
              <button
                className="sm:w-11/12 w-full flex justify-center hover:bg-text/5 items-center p-3 text-primary text-xl lg:p-4 border border-primary m-2 rounded-xl"
                onClick={handleCartToggle}
              >
                Add{isInCart ? "ed" : ""} to Cart &nbsp; <FaCartArrowDown />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
