import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccess;
