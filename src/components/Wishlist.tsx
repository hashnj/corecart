import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getWList, wishListState, wList } from "@/store/wishList";
import { useEffect } from "react";

interface WishListProps {
  id: string; 
}

export const WishList: React.FC<WishListProps> = ({ id }) => {
  const [list, setList] = useRecoilState<string[]>(wishListState);
  const isActive = list.includes(id);
  const wlist = useRecoilValueLoadable(getWList);
  const w = useRecoilValueLoadable(wList);

  useEffect(() => {
    if (wlist.state === 'hasValue' && wlist.contents.qry && wlist.contents.qry[0]?.product_id) {
      setList(wlist.contents.qry[0]?.product_id);
    }
  }, [wlist, setList]);

  useEffect(() => {
    if (w.state === 'hasValue') {
      console.log(w.contents);
    }
  }, [list, w, wlist]);

  const handleClick = () => {
    setList(prev => (isActive ? prev.filter(itemId => itemId !== id) : [...prev, id]));
  };


  return (
    <div className="flex w-14 flex-col justify-center items-center" onClick={ handleClick }>
      <div className={`peer text-red-600 p-2 text-4xl flex items-center justify-center rounded-full `}>
        { isActive ? (
          <FaHeart className="active:scale-75 hover:scale-95" />
        ):(<FaRegHeart className="active:scale-75 hover:scale-95"/>)}
      </div>
      
    </div>
  );
};
