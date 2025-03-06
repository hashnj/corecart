// import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WishList } from "./Wishlist";
import { Cartt } from "./Cart";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  image: string[];
  title: string;
  description: string;
  tags: string;
  discount: number;
  vendor: string;
  stock: number;
  price: number;
  id: string;
  userId?: string; 
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image = [],
  title,
  tags,
  description,
  discount,
  vendor,
  stock,
  price,
  id,
}) => {
  const nav = useNavigate();

  const tagColors: Record<string, string> = {
    seafood: "bg-blue-500",
    fragrances: "bg-purple-500",
    beauty: "bg-pink-500",
    furniture: "bg-yellow-600",
    vegetable: "bg-green-500",
    dairy: "bg-cyan-500",
    default: "bg-gray-500",
  };

  // Calculate Discounted Price
  const discountedPrice = Number((price - (price * discount) / 100).toFixed(2));

  return (
    <div className="max-w-xs rounded-lg border border-text/10 mx-auto w-full bg-backgrounds/30 group cursor-pointer overflow-hidden hover:shadow-text/10 hover:shadow-md transition m-4">
      <div className="relative h-3/4">
        {/* Tag Label */}
        <div
          className={`px-2 absolute top-0 left-0 z-10 rounded-br-2xl ${
            tagColors[tags.toLowerCase()] || tagColors.default
          } text-white/80 py-1`}
        >
          {tags}
        </div>

        {Math.floor(discount) > 0 && (
          <div className="px-2 absolute top-0 right-0 z-10 rounded-br-2xl text-red-800/70 hover:text-red-700 py-1">
            {Math.floor(discount)}% off
          </div>
        )}

        <img
          onClick={() => nav(`/product/${id}`)}
          className="peer group-hover:scale-105 transition-all duration-500 rounded-3xl w-full h-72 m-auto p-2 object-cover"
          src={image.length > 0 ? image[0] : "/default-placeholder.png"} // Handle missing image
          alt={title}
        />

        <div className="absolute top-5 right-2 hidden group-hover:flex flex-col space-y-2">
          <WishList id={id}  />
          <Cartt quty={stock} id={id} />
        </div>
      </div>

      <div className="py-2 text-center w-full border-t border-text/5 rounded-b-lg flex flex-col">
        <div className="font-bold text-text text-xl mx-2 flex justify-between">
          <div className="flex flex-col items-start">
            <p className="capitalize">
              {title.length > 15 ? `${title.slice(0, 14)}...` : title}
            </p>
            <p className="text-text/60 text-sm truncate w-44">{description}</p>
          </div>
        </div>

        {/* Price & Vendor */}
        <div className="flex ml-2 mb-1 items-center justify-between mx-4">
          {discount > 0 ? (
            <div className="flex">
              <p className="text-red-500 font-bold line-through m-auto text-xs">${price}</p>
              <p className="text-primary text-xl font-bold ml-2">${discountedPrice}</p>
            </div>
          ) : (
            <p className="text-primary text-xl font-bold">${discountedPrice}</p>
          )}
          <p className="text-text/40 text-sm underline-offset-2 underline">by {vendor}</p>
        </div>
      </div>
    </div>
  );
};
