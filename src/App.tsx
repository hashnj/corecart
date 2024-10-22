import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import Unauthorized from "./pages/Unauthorized";
import { Suspense, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Layout from "./pages/Layout";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import WishPage from "./pages/WishPage";
import CartPage from "./pages/CartPage";
import Products from "./pages/Products";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="bg-background text-primary text-6xl w-screen h-screen flex justify-center items-center">
          <AiOutlineLoading3Quarters className="animate-spin" />
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          
          <Route path="/*" element={<Layout isLoading={isLoading} />}>
            <Route index element={<Main />} /> 
            <Route element={<RequireAuth allowedRoles={['Customer', 'Admin', 'Vendor']} />}>
              <Route path="settings" element={<Settings />} />
              <Route path="wishlist" element={<WishPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="explore" element={<Products />} />

              
              <Route path="*" element={<NotFound />} />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" // or "dark"
    />
    </Suspense>
  );
}

export default App;


          
   
{/* 
            <Route path="/product/:id" element={<ProductInfo />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:id" element={<Success />} /> */}
          
          
          {/*  */}