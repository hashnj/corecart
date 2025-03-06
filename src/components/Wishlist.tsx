import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRecoilState, useRecoilRefresher_UNSTABLE } from "recoil";
import { wishlistState, addToWishlist, removeFromWishlist, getWishlist } from "@/store/wishList";

interface WishListProps {
  id: string;
}

export const WishList: React.FC<WishListProps> = ({ id }) => {
  const [wishlist, setWishlist] = useRecoilState(wishlistState);
  const refreshWishlist = useRecoilRefresher_UNSTABLE(getWishlist); // 🔥 Force fetch fresh wishlist
  const wishlistIds = wishlist.map((product) => product._id);
  const isActive = wishlistIds.includes(id);

  const handleClick = async () => {
    if (isActive) {
      await removeFromWishlist(id, setWishlist);
    } else {
      await addToWishlist(id, setWishlist);
    }
    refreshWishlist(); 
  };

  return (
    <div className="flex w-14 flex-col justify-center items-center" onClick={handleClick}>
      <div className="peer text-red-600 p-2 text-4xl flex items-center justify-center rounded-full">
        {isActive ? <FaHeart className="active:scale-75 hover:scale-95" /> : <FaRegHeart className="active:scale-75 hover:scale-95" />}
      </div>
    </div>
  );
};
