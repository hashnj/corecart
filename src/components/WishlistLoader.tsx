import { useEffect } from "react";
import { useSetRecoilState, useRecoilValueLoadable } from "recoil";
import { getWishlist, wishlistState } from "@/store/wishList";

const WishlistLoader: React.FC = () => {
  const setWishlist = useSetRecoilState(wishlistState);
  const wishlistData = useRecoilValueLoadable(getWishlist);

  useEffect(() => {
    if (wishlistData.state === "hasValue") {
      setWishlist(wishlistData.contents);
    }
  }, [wishlistData, setWishlist]);

  return null; 
};

export default WishlistLoader;