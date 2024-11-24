import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import WishPageComponent from "@/components/WishPageComponent";
import { useEffect, useState } from "react";
import { getWList } from "../store/wishList";
import { useRecoilValueLoadable } from "recoil";
import { useNavigate } from "react-router-dom";
import { products } from "../store/products";
import { Product } from "@/types";

const WishPage: React.FC = () => {
    const navigate = useNavigate();
    const list = useRecoilValueLoadable(getWList);
    const prod = useRecoilValueLoadable(products);

    const [load, setLoad] = useState(true);

    useEffect(() => {
        const loadInterval = setInterval(() => {
            setLoad(false);
        }, 200);

        return () => clearInterval(loadInterval);
    }, []);

    if (list.state === 'loading' || prod.state === 'loading' || load) {
        return (
            <div className="bg-background text-text text-6xl w-screen h-screen flex justify-center items-center">
                <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
        );
    }

    if (prod.state === 'hasError' || list.state === 'hasError') {
        return <div className="bg-background text-text text-6xl w-screen h-screen flex justify-center items-center">Error loading products</div>;
    }

    if (prod.state === 'hasValue' && list.state === 'hasValue' && !load) {
        const wishlistedProducts = list.contents.products; 

        return (
            <div className="bg-background rounded-md w-full min-h-screen h-full">
                <div 
                    onClick={() => navigate(-1)} 
                    className="border-text/50 w-12 flex justify-center relative top-12 left-12 border hover:bg-primary/70 active:bg-primary hover:text-background cursor-pointer bg-primary p-1 px-2 rounded-md text-lg font-semibold"
                >
                    <FaArrowLeft />
                </div>
                <div className="flex w-full justify-center text-4xl font-extrabold font-serif text-primary">
                    WishList
                </div>
                <div className="px-12 py-14 min-h-1/2 overflow-y-scroll no-scroll">
                    {wishlistedProducts.length > 0 ? (
                        wishlistedProducts.map((item: Product) => (
                            <WishPageComponent 
                                key={item._id} 
                                title={item.name} 
                                description={item.description} 
                                price={item.price}
                                image={item.images}
                                id={item._id}
                            />
                        ))
                    ) : (
                        <div>No products in your wishlist.</div>
                    )}
                </div>
            </div>
        );
    }

    return null;
};

export default WishPage;
