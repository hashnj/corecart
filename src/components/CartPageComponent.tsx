import { ImCross } from "react-icons/im";
import { useSetRecoilState } from "recoil";
import { cartState, removeFromCart } from "../store/cart";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";

interface CartPageComponentProps {
  title: string;
  description: string;
  price: number;
  images: string[];
  mrp: number;
  id: string;
  quty: number;
  stock: number;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const CartPageComponent: React.FC<CartPageComponentProps> = ({
  title,
  description,
  price,
  images,
  stock,
  mrp,
  id,
  quantity,
  onIncrement,
  onDecrement,
}) => {
  const setCart = useSetRecoilState(cartState);
  const nav = useNavigate();

  const removeItem = async (id: string) => {
    try {
      await removeFromCart(id, setCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="w-full">
      <div
        key={id}
        className="w-full cursor-pointer text-text border-double grid grid-cols-3 sm:grid-cols-4 gap-2 my-3 justify-between p-2 items-center bg-background border-2 border-text/50 hover:border-text/30 hover:scale-100 scale-[.99] transition-all duration-300 rounded-md"
        onClick={() => nav(`/product/${id}`)}
      >
        <div className="flex justify-center items-center col-span-3 sm:col-span-1" onClick={() => nav(`/product/${id}`)}>
          <div className="size-36 rounded-md flex justify-center items-center overflow-hidden">
            {images.length > 0 ? <img src={images[0]} alt={title} /> : <span>No Image</span>}
          </div>
        </div>

        <div className="col-span-2 h-full">
          <div className="pl-4 h-full flex flex-col justify-around items-start">
            <div className="text-3xl font-extrabold">{title}</div>
            <div className="text-lg pb-3 md:pb-5 font-thin">{description}</div>
            <div className="pr-2 text-primary font-bold flex items-center text-xl">
              {mrp > price && <div className="text-red-600 pr-1 scale-90 line-through">${mrp}</div>}
              <div className="scale-105">${price}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full justify-around items-end">
          <div className="flex h-10 justify-end z-20 w-full">
            <button
              className="p-2 h-full text-xl bg-backgrounds hover:bg-text/10 font-bold rounded-l-md"
              onClick={(e) => {
                e.stopPropagation();
                onDecrement(id)
              }}
              disabled={quantity <= 0}
            >
              <FaMinus className="text-sm" />
            </button>

            <input
              type="number"
              readOnly
              value={quantity}
              onClick={(e) => e.stopPropagation()}
              min={0}
              className="cursor-default active:ring-0 focus:ring-0 focus:border-0 h-full disabled bg-backgrounds border-none px-[2px] w-10 py-1 text-center select-none"
            />

            <button
              className="p-2 text-xl bg-backgrounds h-full hover:bg-text/10 rounded-r-md font-bold"
              onClick={(e) =>{
                e.stopPropagation();
                onIncrement(id);
                }}
              disabled={quantity >= stock}
            >
              <FaPlus className="text-sm" />
            </button>
          </div>

          {stock < 1 && <div className="text-red-600 bg-red-500/20 text-center p-1 rounded sm:w-2/3" onClick={(e)=>e.stopPropagation()}>Out of Stock</div>}

          <div title="Remove" className="text-xl p-2 z-20  flex items-end justify-end hover:text-red-800 text-red-600">
            <ImCross className="cursor-pointer" onClick={(e) =>{e.stopPropagation(); removeItem(id)}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageComponent;
