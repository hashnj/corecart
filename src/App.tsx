import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import Main from "./pages/Main";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import Unauthorized from "./pages/Unauthorized";
import Layout from "./pages/Layout";
import RequireAuth from "./components/RequireAuth";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import WishPage from "./pages/WishPage";
import CartPage from "./pages/CartPage";
import Test from "./pages/Test";
import ProductInfo from "./pages/ProductInfo";
import WishlistLoader from "./components/WishlistLoader";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ✅ Move ToastContainer here */}
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        closeButton={false}
        draggable
        theme="dark"
      />

      <Suspense
        fallback={
          <div className="bg-background text-primary text-6xl w-screen h-screen flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        }
      >
        <WishlistLoader />
        <BrowserRouter>
          <Routes>
            <Route path="/auth/register" element={<SignUp />} />
            <Route path="/auth/login" element={<SignIn />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/*" element={<Layout isLoading={isLoading} />}>
              <Route index element={<Main />} />
              <Route path="product/:id" element={<ProductInfo />} />
              <Route element={<RequireAuth allowedRoles={['Customer', 'Admin', 'Vendor']} />}>
                <Route path="settings" element={<Settings />} />
                <Route path="wishlist" element={<WishPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="explore" element={<Products />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={['Customer', 'Admin', 'Vendor','']} />}>
                <Route path="test" element={<Test />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
