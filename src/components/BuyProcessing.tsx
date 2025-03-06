/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState } from "recoil";
import { buyM } from "../store/buy";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AddAddress } from "@/components/forms/AddAddress";
import { B_Url } from "../config";
import { cartState } from "../store/cart";
import axiosInstance from "@/lib/axiosInstance";

interface Address {
  rel: string;
  postal_code: string;
  city: string;
  state: string;
  country: string;
}

const BuyProcessing = () => {
  const navigate = useNavigate();
  const [_buy, setBuy] = useRecoilState(buyM);
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState<number>(1);
  const [cart, setCart] = useRecoilState(cartState);
  const [selectedAddress, setSelectedAddress] = useState<Address | "">("");
  const [addAddressMode, setAddAddressMode] = useState<boolean>(false);

  const product = cart.find((item: { _id: string | undefined; }) => item._id === id);

  async function buyNow() {
    try {
      if (!selectedAddress || !product) {
        console.log("Select address or product not found!");
        return;
      }

      const res = await axiosInstance.post(`/order/buy`, {
        quantity,
        product: product._id,
        price: product.price,
        address: {
          address: selectedAddress.rel,
          postal_code: selectedAddress.postal_code,
          city: selectedAddress.city,
          state: selectedAddress.state,
          country: selectedAddress.country,
        },
      });

      const data = res.data;
      if (data) {
        setBuy(false);
        navigate(`/order/${data.order._id}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function buyCart() {
    try {
      if (!selectedAddress) {
        console.log("Select an address");
        return;
      }

      const res = await axiosInstance.post(`${B_Url}/order/cart`, {
        address: {
          address: selectedAddress.rel,
          postal_code: selectedAddress.postal_code,
          city: selectedAddress.city,
          state: selectedAddress.state,
          country: selectedAddress.country,
        },
      });

      const data = await res.data;
      if (data) {
        setBuy(false);
        navigate(`/order/${data.order._id}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function addToCart() {
    const exists = cart.some((item: { _id: any; }) => item._id === product?._id);
    setCart((prev: any[]) =>
      exists
        ? prev.map((item) =>
            item._id === product?._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }]
    );
    navigate("/cart");
  }

  return (
    <div className="bg-background w-full h-full">
      <div className="flex justify-between p-3 border-b-2 items-center border-text/10 font-serif font-bold mb-4">
        <div>
          <div className="text-3xl">Processing...</div>
          <div className="text-sm pl-px font-thin font-sans">Please verify the information.</div>
        </div>
        <ImCross
          className="cursor-pointer text-3xl hover:text-primary/70 active:text-primary"
          onClick={() => setBuy(false)}
        />
      </div>

      <div className="overflow-y-auto no-scroll px-2 pt-0 h-[75%]">
        <div className="pl-2 underline-offset-2 text-xl underline">Product:</div>

        {id ? (
          <div className="flex justify-between px-1 py-3 text-2xl text-primary">
            <div className="text-3xl">{product?.name}</div>
            <div>${product?.price}</div>
          </div>
        ) : (
          cart.map((item: { _id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; quantity: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
            <div key={item._id} className="flex text-xl w-full px-2 font-normal text-text/85 justify-between">
              <div className="w-1/3 text-primary text-2xl text-start">{item.name}</div>
              <div className="w-1/3 text-center">
                $ <span className="font-medium">{item.price}</span>
              </div>
              <div className="text-end text-text/70 text-thin w-1/3">X {item.quantity}</div>
            </div>
          ))
        )}

        {id && (
          <div className="px-1 py-3 flex justify-between text-xl">
            <div>Quantity</div>
            <div className="flex h-10 justify-end z-20 w-full">
              <button
                className="p-1 pl-2 h-full text-xl bg-backgrounds font-bold rounded-l-md"
                onClick={() => setQuantity((p) => (p > 1 ? p - 1 : p))}
              >
                -
              </button>
              <input
                type="number"
                readOnly
                value={quantity}
                min={1}
                className="cursor-default focus:ring-0 focus:border-0 h-full bg-backgrounds border-none px-[2px] w-8 py-1 text-center"
              />
              <button
                className="p-1 text-xl bg-backgrounds h-full rounded-r-md font-bold"
                onClick={() => setQuantity((p) => (p < product!.stock ? p + 1 : p))}
              >
                +
              </button>
            </div>
          </div>
        )}

        <div className="text-lg pt-4 flex flex-col">
          <div>
            <div className="h-full mt-3 pl-1 text-xl underline-offset-2 underline pb-1">
              Add Address:
            </div>
            {addAddressMode ? <AddAddress /> : (
              <div
                className="p-2 border rounded-md cursor-pointer hover:bg-primary/20 flex items-center"
                onClick={() => setAddAddressMode(true)}
              >
                <FaPlus className="text-primary" /> <span className="ml-2">Add Address</span>
              </div>
            )}
          </div>

          <div className="flex">
            <div className="h-px mx-1 mt-3 w-full border"></div>
            <div className="text-sm text-center">OR</div>
            <div className="h-px mx-1 mt-3 w-full border"></div>
          </div>

          <div className="underline-offset-2 text-xl underline pl-1">Choose Address:</div>
          <select
            className="w-full bg-backgrounds p-2 mt-2 border rounded"
            onChange={(e) => setSelectedAddress(JSON.parse(e.target.value))}
          >
            <option value="">Select Address</option>
            {/* Mocked address selection */}
            <option value='{"rel": "Home", "postal_code": "12345", "city": "NYC", "state": "NY", "country": "USA"}'>
              Home, NYC, USA
            </option>
          </select>
        </div>

        <div className="flex flex-col p-2 mt-6">
          <button className="bg-primary p-2 my-1 rounded-md" onClick={id ? buyNow : buyCart}>
            Proceed to Pay
          </button>
          {id && (
            <button className="bg-primary p-2 my-1 rounded-md" onClick={addToCart}>
              Proceed with Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyProcessing;
