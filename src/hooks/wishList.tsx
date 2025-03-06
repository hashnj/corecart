import { getWishlist } from "@/store/wishList";
import { useRecoilValueLoadable } from "recoil";

const LoadWishList = () => {
  const wishlistData = useRecoilValueLoadable(getWishlist);
  return wishlistData;
 
}

export default LoadWishList