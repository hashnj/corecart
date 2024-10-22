import { FaCartPlus } from "react-icons/fa";

import { SidebarTrigger } from "./ui/sidebar";



const NavBar = () => {


  return (
    <nav className="fixed z-50 w-full h-20 flex text-text bg-backgrounds shadow-md">
      <div className="w-full flex p-4 font-bold text-3xl justify-start text-primary items-center">
        <SidebarTrigger className="flex mt-1" />
        CORECART <FaCartPlus className="ml-2" />
      </div>

      <div className="flex justify-end w-full">
        <div className="mr-6 my-auto">
         
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
