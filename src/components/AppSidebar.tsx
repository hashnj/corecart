import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { FaCartPlus, FaHeart, FaHome, FaSearch } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useIsMobile } from "@/hooks/use-mobile";
import { FormField, FormItem } from "./ui/form";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  auth, authCheck } from "@/store/auth"; 
import { useRecoilState, useRecoilValueLoadable } from "recoil"; 
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axiosInstance from "@/lib/axiosInstance";
import { AuthResponse } from "@/types";

const items = [
  { title: "Home", url: "/", icon: FaHome },
  { title: "Wishlist", url: "/wishlist", icon: FaHeart },
  { title: "Cart", url: "/cart", icon: FaCartPlus },
  { title: "Explore", url: "/explore", icon: FaSearch },
  { title: "Settings", url: "/settings", icon: IoSettings },
  { title: "test", url: "/test", icon: IoSettings },
];

const FormSchema = z.object({
  theme: z.boolean(),
});

export function AppSidebar() {
  const user = useRecoilValueLoadable(authCheck);
  const [data,setData]= useState<AuthResponse | null>(null); 
  const [authh,setAuth] = useRecoilState(auth);
  const nav = useNavigate();
  const mobile = useIsMobile();
  const [mode, setMode] = useState<boolean | null>(null);
  const location = useLocation();
  const isActive = (url: string) => location.pathname === url;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";
    setMode(isDark);

    document.body.classList.toggle("dark", isDark);
    document.body.classList.toggle("light", !isDark);
  }, []);

useEffect(()=>{
  if(user.state=='hasValue'){
    console.log(user.contents);
    setData(user.contents);
  }
},[user,authh])


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { theme: mode ?? false },
  });

  const onThemeToggle = (value: boolean) => {
    setMode(value);
    const theme = value ? "dark" : "light";
    localStorage.setItem("theme", theme);

    document.body.classList.toggle("dark", value);
    document.body.classList.toggle("light", !value);
  };

  const handleLogOut = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout", {});
      
      if (response.status === 200) {
        setAuth(null);
        setData(null);
        
        toast.success("Logged out successfully!"); 
        user
      } else {
        toast.error("Logout failed."); 
      }
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error("Logged out already!!!");
    }
  };


  if (mode === null) return null; 

  return (
    <Sidebar className="border-r-2 border-text/20" collapsible="offcanvas">
      <SidebarHeader className="mt-4 flex flex-row justify-between items-center w-full">
        <SidebarTrigger className={mobile ? 'flex' : 'hidden'} />
        <div className="mx-7 text-lg font-bold">MENU</div>
      </SidebarHeader>

      <SidebarContent className="pl-2">
        <SidebarGroup className=" mt-6">
        <SidebarGroupLabel className="border-b rounded-none border-text/10">Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                <div
                  key={item.title}
                  className={`flex items-center p-2 cursor-pointer ${
                    isActive(item.url) ? "text-primary hover:text-primary" : ""
                  }`}
                  onClick={() => nav(item.url)}
                >
                  <item.icon className="mr-2" />
                  <span>{item.title}</span>
                </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-backgrounds rounded-t-xl border-t border-text/20 py-4">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg">
              <div className="pl-2 text-text">Dark Mode</div>
              <Switch
                className="mr-2 border"
                checked={mode}
                onCheckedChange={(value) => {
                  field.onChange(value);
                  onThemeToggle(value);
                }}
              />
            </FormItem>
          )}
        />
      </SidebarFooter>

      <SidebarFooter className="bg-backgrounds rounded-b-xl border-t border-text/20 py-6">
      {user.state === 'loading' ? (
        <div className="w-full flex justify-center">
          <AiOutlineLoading3Quarters className="text-primary animate-spin text-xl" />
        </div>
      ) : user.state === 'hasValue' && data ? (
        <div
          className="flex flex-row cursor-pointer items-center justify-between gap-2"
          onClick={() => nav('/settings')}
        >
          <div className="flex items-center justify-center rounded-full bg-gray-200 w-10 h-10">
            <p className="text-xl font-bold text-gray-700">
              {data.username[0].toUpperCase()}
            </p>
          </div>
          <div className="flex-1 flex-col justify-center">
            <h1 className="text-lg truncate capitalize font-semibold text-text">
              {data.username}
            </h1>
            <p className="text-sm truncate text-text/50">
              {data.email}
            </p>
          </div>
          <div
            className="bg-background p-3 rounded-lg hover:text-xl transition-all"
            onClick={(e) => {
              e.stopPropagation();
              handleLogOut();
            }}
          >
            <CiLogout />
          </div>
        </div>
      ) : (
        <div className="w-full text-center">
          <p>Log-in to get a personalized experience...</p>
          <button
            className="mt-2 text-lg rounded-lg bg-primary/90 hover:bg-primary font-semibold text-white py-2 px-4 shadow-md"
            onClick={() => nav('/auth/login')}
          >
            Log-in
          </button>
        </div>
      )}
    </SidebarFooter>
    </Sidebar>
  );
}
