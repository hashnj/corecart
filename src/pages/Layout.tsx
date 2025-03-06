import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai"; 

interface LayoutProps {
  isLoading: boolean;
}

export default function Layout({ isLoading }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex mt-20 flex-grow">
          <AppSidebar />
        <div className="flex flex-col">
          <main className="flex-1">
            {isLoading ? (
              <div className="bg-background text-primary text-6xl w-full h-screen flex justify-center items-center">
                <AiOutlineLoading3Quarters className="animate-spin" />
              </div>
            ) : (
              <Outlet />
            )}
          </main>
        <Footer />
        </div>
        </div>
        
      </div>
    </SidebarProvider>
  );
}
