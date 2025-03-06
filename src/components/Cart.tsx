import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa";
import { cartState, getCart, updateCartQuantity, removeFromCart, addToCart } from "@/store/cart";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { useEffect } from "react";

interface CarttProps {
  quty: number;
  id: string;
}

export const Cartt: React.FC<CarttProps> = ({ quty, id }) => {
  const [cart, setCart] = useRecoilState(cartState);
  const cartData = useRecoilValueLoadable(getCart);

  useEffect(() => {
    if (cartData.state === "hasValue" && cart.length === 0) {
      setCart(cartData.contents);
    }
  }, [cartData, cart, setCart]);

  const isActive = cart.some((item) => item.product_id._id === id);
  const product = cart.find((item) => item.product_id._id === id);
  const quantity = product ? product.quantity : 0;

  const handleIncrement = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isActive) {
      await addToCart(id, setCart);
    } else {
      await updateCartQuantity(id, quantity + 1, setCart);
    }
  };

  const handleDecrement = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isActive && quantity > 1) {
      await updateCartQuantity(id, quantity - 1, setCart);
    } else {
      await removeFromCart(id, setCart);
    }
  };

  return (
    <div className="flex w-14 flex-col justify-center items-center" onClick={handleIncrement}>
      <div className="peer text-gray-800 p-2 hover:text-gray-500/80 text-4xl flex items-center justify-center rounded-full">
        {!isActive ? (
          <FaCartPlus className="active:scale-75 hover:scale-95" title="Add to Cart" />
        ) : (
          <div className="pr-2">
            <div className="flex h-8 justify-end z-20 pr-8 w-full">
              <div className="bg-backgrounds text-text/40 text-xs font-semibold rounded-l-lg h-8 flex justify-center items-center">
                <button
                  className="p-2 rounded-full hover:bg-text/20"
                  onClick={handleDecrement}
                  disabled={quantity <= 0}
                >
                  <FaMinus className="text-sm" />
                </button>
              </div>
              <input
                type="number"
                readOnly
                value={quty < 1 ? 0 : quantity}
                min={0}
                className="cursor-default focus:ring-0 focus:border-0 h-full text-text/40 bg-backgrounds border-none px-[2px] max-w-10 text-base text-center touch-none select-none"
              />
              <div className="bg-backgrounds text-text/40 text-xs rounded-r-lg font-semibold h-8 flex justify-center items-center">
                <button
                  className="p-2 rounded-full hover:bg-text/20"
                  onClick={handleIncrement}
                  disabled={quantity >= quty}
                >
                  <FaPlus className="text-sm" />
                </button>
              </div>
            </div>
            <div className="text-sm text-text px-2 mt-0">Added to Cart</div>
            {quty < 1 && <div className="text-xs text-center -m-2 pt-2 text-red-600">Out Of Stock</div>}
          </div>
        )}
      </div>
    </div>
  );
};
