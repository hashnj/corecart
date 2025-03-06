/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState } from "recoil";
import { wishlistState, removeFromWishlist } from "../store/wishList";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";

interface WishPageComponentProps {
  _id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  discountPercentage: number;
  refreshWishlist: () => void; 
}

const WishPageComponent: React.FC<WishPageComponentProps> = ({ _id, title, description, images, price, discountPercentage, refreshWishlist }) => {
  const [_list, setList] = useRecoilState(wishlistState);
  const discountedPrice = Number((price - (price * discountPercentage) / 100).toFixed(2));
  const navigate = useNavigate();

  const removeItem = async () => {
    await removeFromWishlist(_id, setList);
    refreshWishlist(); 
  };

  return (
    <div 
      className="w-full grid my-3 cursor-pointer grid-cols-4 p-6 items-center px-10 border border-text/30 rounded-xl hover:scale-100 scale-[.99] transition-all"
      onClick={() => navigate("/product/" + _id)}
    >
      <div className="flex flex-col xl:flex-row col-span-4 lg:col-span-3 justify-start items-center">
        <div className="flex justify-center items-center rounded-md overflow-hidden">
          <img src={images[0]} className="max-w-28" alt={title} />
        </div>
        <div className="flex pl-6 text-text/70 flex-col">
          <span className="text-3xl font-extrabold">{title}</span>
          <span className="text-lg font-thin">{description}</span>
        </div>
      </div>
      <div className="flex lg:col-span-1 col-span-4 justify-between lg:px-0 px-6 lg:justify-end">
        <div className="flex">
          <div className="pr-2 text-red-600 line-through font-semibold text-base my-auto">
            ${price}
          </div>
          <div className="pr-2 text-primary w-24 font-bold text-xl">
            ${discountedPrice}
          </div>
        </div>
        <div 
          title="Remove"
          className="text-xl my-auto pt-2 text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            removeItem();
          }}
        >
          <ImCross className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default WishPageComponent;
