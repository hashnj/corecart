import { useState } from "react"; 
import { useRecoilValue } from "recoil";
import { cartState } from "@/store/cart";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLIC_KEY } from "@/config";
import axiosInstance from "@/lib/axiosInstance";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const cart = useRecoilValue(cartState);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>
    </div>
  );
};

export default Checkout;
