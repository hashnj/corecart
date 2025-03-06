import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import WishPageComponent from "../components/WishPageComponent";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable, useRecoilRefresher_UNSTABLE } from "recoil";
import { useNavigate } from "react-router-dom";
import { getWishlist, removeAll, wishlistState } from "../store/wishList";
import { ImCross } from "react-icons/im";

const WishPage = () => {
  const navigate = useNavigate();
  const [wishList, setWishList] = useRecoilState(wishlistState);
  const wishlistData = useRecoilValueLoadable(getWishlist);
  const refreshWishlist = useRecoilRefresher_UNSTABLE(getWishlist); // 🔥 Force refetch on change
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (wishlistData.state === "hasValue") {
      console.log(wishlistData.contents);
      setWishList(wishlistData.contents);
    }
  }, [wishlistData, setWishList]);

  useEffect(() => {
    setTimeout(() => setLoad(false), 20);
  }, []);

  if (wishlistData.state === "loading" || load) {
    return (
      <div className="bg-background text-text text-6xl w-screen h-screen flex justify-center items-center">
        <AiOutlineLoading3Quarters className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-background rounded-md w-full min-h-screen  h-full">
      <div 
        onClick={() => navigate(-1)} 
        className="border-text/50 w-12 ml-12 mt-8 flex justify-center top-12 left-12 border hover:bg-primary/70 active:bg-primary hover:text-background cursor-pointer bg-primary p-1 px-2 rounded-md text-lg font-semibold"
      >
        <FaArrowLeft />
      </div>
      <div className="flex w-full justify-center text-4xl font-extrabold font-serif text-primary">
        WishList
      </div>

      <div 
        className={`flex w-1/3 mx-auto rounded-xl mt-12 text-lg font-semibold py-2 px-3 border border-text/30 justify-around text-text/70 ${wishList.length === 0 ? "hidden" : "flex"}`}>
        {wishList.length} items
        <button title="Remove All " onClick={()=>removeAll(setWishList)} className="text-red-500"><ImCross/></button>
      </div>
      <div className="px-12 py-14 pt-0 min-h-1/2 overflow-y-scroll no-scrollbar">
        {wishList.length > 0 ? (
          wishList.map((item: { _id: string; title: string; description: string; price: number; images: string[]; discountPercentage: number }) => (
            <WishPageComponent 
              key={item._id} 
              title={item.title} 
              description={item.description} 
              price={item.price}
              images={item.images}
              discountPercentage={item.discountPercentage}
              _id={item._id}
              refreshWishlist={refreshWishlist}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-full min-h-96">
            <p className="text-center text-lg text-text/70">Your wishlist is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishPage;
