/* eslint-disable react-hooks/exhaustive-deps */
import CartPageComponent from "@/components/CartPageComponent";
import { STRIPE_PUBLIC_KEY } from "@/config";
import axiosInstance from "@/lib/axiosInstance";
import { CartItem, cartState, getCart, removeFromCart, updateCartQuantity } from "@/store/cart";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useRecoilRefresher_UNSTABLE } from "recoil";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useRecoilValue(getCart);
  const [cart, setCart] = useRecoilState<CartItem[]>(cartState);
  const refreshCart = useRecoilRefresher_UNSTABLE(getCart);   
  const [loading, setLoading] = useState<boolean>(true);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [total, setTotal] = useState<string>("0");

  useEffect(() => {
    refreshCart();
  },[]);

  useEffect(() => {
    if (cartItems) {
      setCart(cartItems);
      setLoading(false);
    }
  }, [cartItems, setCart]);

  useEffect(() => {
    const totalAmount = cart.reduce((sum, item) => sum + item.product_id.price * item.quantity, 0);
    setSubTotal(totalAmount);
    setTotal((totalAmount + 0.0 * totalAmount).toFixed(2));
  }, [cart]);

  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(`/order/create-checkout-session`, {
        cartItems: cart,
      });

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = async (id: string) => {
    const product = cart.find((item) => item.product_id._id === id);
    if (product) {
      await updateCartQuantity(id, product.quantity + 1, setCart);
    }
  };

  const handleDecrement = async (id: string) => {
    const product = cart.find((item) => item.product_id._id === id);
    if (product && product.quantity > 1) {
      await updateCartQuantity(id, product.quantity - 1, setCart);
    } else {
      await removeFromCart(id, setCart);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="bg-background text-text text-6xl w-screen h-screen flex justify-center items-center">
  //       <AiOutlineLoading3Quarters className="animate-spin" />
  //     </div>
  //   );
  // }

  if (cart.length === 0) {
    return (
      <div className="text-center flex justify-center items-center h-screen text-xl font-extrabold text-text/50">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="bg-background rounded-md p-2 text-text w-full min-h-screen flex flex-col">
      <div onClick={() => navigate(-1)} className="border-text/50 w-12 flex justify-center mt-6 ml-6 border hover:bg-primary/70 active:bg-primary hover:text-background cursor-pointer bg-primary p-1 px-2 rounded-md text-lg font-semibold">
        <FaArrowLeft />
      </div>
      <div className="flex w-full justify-center text-4xl font-extrabold font-serif text-primary">
        Cart
      </div>

      <div className="grid grid-cols-3 flex-col w-full">
        <div className="w-full col-span-3 md:col-span-2 ">
          <div className="gap-4 px-4">
            {cart.map((item) => (
              <CartPageComponent
                key={item.product_id._id}
                title={item.product_id.title}
                description={item.product_id.description}
                price={item.product_id.price}
                images={item.product_id.images}
                stock={item.product_id.stock}
                mrp={item.product_id.mrp}
                id={item.product_id._id}
                quty={item.product_id.stock}
                quantity={item.quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            ))}
          </div>
        </div>

        <div className="w-full col-span-3 md:col-span-1  mt-6   ">
          <div className="sticky top-24 my-3 bg-background border-2 border-text/50 hover:border-text/30 rounded-md p-4 shadow-lg">
            <h2 className="text-center text-primary text-2xl font-serif">CART SUMMARY</h2>

            <div className="text-lg font-medium">
              <div>
                {cart.map((item) => (
                  <div key={item.product_id._id} className="flex justify-between font-thin py-2">
                    <span>{item.product_id.title}</span>
                    <span>${item.product_id.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between py-2">
                <span>Subtotal:</span>
                <span className="font-thin">${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Shipping:</span>
                <span className="font-base text-text/50">Free*</span>
              </div>
              <div className="flex justify-between py-2 border-t border-text/20">
                <span>Total:</span>
                <span className="font-semibold">${total}</span>
              </div>
              <div className="text-right text-sm text-text/60">**Inclusive of all TAX</div>
            </div>

            <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-primary text-white px-6 justify-center items-center py-3 rounded-lg hover:bg-primary/85 flex transition-all duration-200 disabled:bg-primary/70 w-full mt-4 text-lg font-bold"
      >
        {loading && <AiOutlineLoading3Quarters className="animate-spin text-white mr-2" />}
        {loading ? "Processing" : "Proceed to Payment"}
      </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
