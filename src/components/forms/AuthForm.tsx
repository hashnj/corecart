import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthFormProps, AuthResponse, signInProps, signupProps } from "@/types";
import axiosInstance from "@/lib/axiosInstance";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilRefresher_UNSTABLE } from "recoil";
import { auth, authCheck } from "@/store/auth"; // Import authCheck to refresh state
import syncCart from "@/utils/syncCart";

const AuthForm = ({ type }: AuthFormProps) => {
  const [user, setUser] = useRecoilState<AuthResponse | null>(auth);
  const refreshAuth = useRecoilRefresher_UNSTABLE(authCheck); // ✅ Refresh auth state
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const formSchema = authFormSchema(type);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleAuth = async (data: signupProps | signInProps) => {
    setIsLoading(true);
    try {
      const endpoint = type === "sign-up" ? "/auth/signup" : "/auth/signin";
      const response = await axiosInstance.post<AuthResponse>(endpoint, data);
      setUser(response.data);

      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      await syncCart(localCart);
      localStorage.removeItem("cart");

      toast.success(type === "sign-up" ? "Successfully registered!" : "Signed in successfully!");

      refreshAuth(); 
      nav("/");
    } catch (error) {
      console.error("Auth error:", error);
      toast.error(`Failed to ${type === "sign-up" ? "register" : "sign in"}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background w-full flex justify-center">
      <section className="flex min-h-screen w-full max-w-[420px] text-text flex-col justify-center gap-3 py-4">
        <header className="flex flex-col gap-2">
          <div className="flex cursor-pointer text-4xl text-primary items-center justify-center gap-1" onClick={() => nav("/")}>
            <FaCartPlus className="mr-2" />
            <h1 className="font-bold text-text">CORECART</h1>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-24 font-semibold text-primary">
              {user ? "Link Account" : type === "sign-in" ? "Sign-in" : "Sign-up"}
            </h1>
            <p className="text-16 font-normal text-gray-600">
              {user ? "Link your account to get started" : "Please enter your details"}
            </p>
          </div>
        </header>

        {user ? (
          <div className="flex flex-col gap-4">
            <button className="bg-primary p-2 w-1/4 rounded-lg" onClick={() => nav("/")}>
              Skip
            </button>
          </div>
        ) : (
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAuth)} className="space-y-6 flex flex-col items-center">
                <div className="w-full space-y-6">
                  {type === "sign-up" && (
                    <>
                      <CustomInput control={form.control} name="userName" label="User Name" placeholder="Enter Your Name" />
                      <CustomInput control={form.control} name="address1" label="Address" placeholder="Land-Mark" />
                      <CustomInput control={form.control} name="city" label="City" placeholder="Enter Your City" />
                      <div className="flex gap-4">
                        <CustomInput control={form.control} name="state" label="State" placeholder="State" />
                        <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="Postal Code" />
                      </div>
                    </>
                  )}
                  <CustomInput control={form.control} name="email" label="Email" placeholder="Enter Your Email" />
                  <CustomInput control={form.control} name="password" label="Password" placeholder="Enter Your Password" />
                </div>
                <Button type="submit" className="text-16 rounded-lg bg-primary hover:bg-primary/90 font-semibold text-white shadow-md " disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </Form>

            <footer className="flex justify-center gap-1">
              <p className="text-14 text-gray-600">{type === "sign-in" ? "Don't have an account?" : "Already have an account?"}</p>
              <span className="text-14 cursor-pointer font-medium text-blue-500" onClick={() => nav(type === "sign-in" ? "/auth/register" : "/auth/login")}>
                {type === "sign-in" ? "Sign-up" : "Sign-in"}
              </span>
            </footer>
          </>
        )}
      </section>
    </div>
  );
};

export default AuthForm;
