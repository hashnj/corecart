import { FaCartPlus } from "react-icons/fa";

import { SidebarTrigger } from "./ui/sidebar";
import { useNavigate } from "react-router-dom";



const NavBar = () => {

  const nav = useNavigate();
  return (
    <nav className="fixed z-50 w-full h-20 flex text-text bg-backgrounds/50 backdrop-blur border-b border-backgrounds shadow-md">
      <div className="w-full flex p-4 font-bold text-3xl justify-start text-primary items-center">
        <SidebarTrigger className="flex mt-1" />
        <button 
          className="flex items-center"
          onClick={() => nav("/")}
        >
        CORECART <FaCartPlus className="ml-2" />
        </button>
      </div>

      <div className="flex justify-end w-full">
        <div className="mr-6 my-auto">
         
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
