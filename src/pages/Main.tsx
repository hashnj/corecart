/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { Home } from "./Home";
import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { search } from "@/store/search";

const Main = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useRecoilState(search);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSearchActive]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <div className="p-2 min-h-screen h-full">

      <div className="w-full min-h-screen bg-gradient-to-tr from-primary/20 to-primary/70 text-text flex flex-col items-center justify-center">
        <div className="text-center px-6">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Discover the Best Deals on Your Favorite Products
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Shop from a wide range of categories with amazing discounts and fast delivery.
          </p>
        </div>

        <div
          ref={searchRef}
          className={`mt-8 flex items-center md:w-full w-4/5 rounded-full shadow-lg overflow-hidden px-4 bg-white transition-all duration-300 ${
            searchActive ? "max-w-2xl" : "max-w-lg"
          }`}
        >
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-grow p-3 text-gray-800/80 outline-none"
            value={searchTerm}
            onClick={() => setSearchActive(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="p-3 text-primary" onClick={handleSearch}>
            <FaSearch size={20} />
          </button>
        </div>

        {/* Categories */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
          {["Electronics", "Fashion", "Home", "Beauty", "Sports", "Toys"].map((category) => (
            <div
              key={category}
              className="bg-white text-gray-900 py-4 px-6 rounded-lg shadow-md cursor-pointer hover:bg-primary hover:text-white transition-all"
              onClick={() => navigate(`/category/${category.toLowerCase()}`)}
            >
              {category}
            </div>
          ))}
        </div>

        {/* Explore Button */}
        <button
          className="mt-10 px-6 py-3 bg-yellow-400 text-gray-900 text-lg font-bold rounded-full shadow-lg hover:bg-yellow-300 transition"
          onClick={() => navigate("/explore")}
        >
          Start Shopping
        </button>
      </div>
      <Home />
    </div>
  );
};

export default Main;
