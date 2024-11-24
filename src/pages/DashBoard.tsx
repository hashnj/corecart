import { useState } from "react";
import {  useRecoilState, useRecoilValueLoadable } from "recoil";
import { detailsSelector } from "../store/details";
import { AiFillDelete } from "react-icons/ai";
import { X } from "lucide-react";
import { ShowCategories } from "@/components/ShowCategory";
import { addC, addP, Show } from "@/store/visible";
import  AddCategory from "@/components/forms/AddCategory";
import  AddProduct from "@/components/forms/AddProduct";
import  Listing  from "../components/Listing";
import { Category, Product, Review, SubCategory } from "@/types";
import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/types";




interface DashboardData {
  products: Product[];
  categories: Category[];
  subCategories: SubCategory[];
  users: User[];
  orders: any[]; 
  reviews: Review[];
}

interface DeleteModalProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}


const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => (
  <div className="z-10 absolute w-screen h-screen flex justify-center items-center">
    <div className="w-[400px] z-30 bg-backgrounds relative h-72 md:mr-20 mb-10 rounded-xl">
      <button 
        className="absolute right-3 rounded-md text-3xl text-text/70 p-2 bg-background/50 hover:bg-background/70 hover:text-text hover:scale-95 top-2" 
        onClick={onCancel}
      >
        <X />
      </button>
      <div className="w-full h-full flex justify-center items-center flex-col text-text/70 font-bold text-3xl">
        <div>Are You Sure?</div>
        <div className="font-semibold text-text text-lg mt-4">
          <button 
            className="p-2 px-3 bg-red-600/90 m-2 rounded-md hover:bg-red-600 hover:scale-95" 
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button 
            className="p-2 px-3 bg-green-600/90 m-2 rounded-md hover:bg-green-600 hover:scale-95" 
            onClick={onCancel}
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);

const StatCard: React.FC<{
  title: string;
  value: number;
  children?: React.ReactNode;
}> = ({ title, value, children }) => (
  <div className="bg-background shadow-[0_0_4px] shadow-text/5 rounded-lg min-w-[200px] p-2 pt-4 pl-4">
    <div className="text-xl flex flex-col min-h-[205px] md:min-h-[210px] h-full w-full relative font-bold text-text/70">
      <div className="h-2/3">
        <div className="text-text">{title}</div>
        <div className="flex justify-center items-center text-5xl text-primary/80 mt-4">
          {value}
        </div>
      </div>
      {children}
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const detailsLoadable = useRecoilValueLoadable(detailsSelector);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [show, setShow] = useRecoilState(Show);
  const [addProduct, setAddProduct] = useRecoilState(addP);
  const [addCategory, setAddCategory] = useRecoilState(addC);
  const [showPnL, setShowPnL] = useState(false);

  

  const handleDelete = async () => {
    try {
      await axiosInstance.delete('/auth/')
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (!detailsLoadable) {
    return <div>Loading data...</div>; 
  }

  if (detailsLoadable.state === 'loading') return <div>Loading...</div>;
  if (detailsLoadable.state === 'hasError') return <div>Error loading data.</div>;

  const data = detailsLoadable.contents as DashboardData;
  const goodReviews = data.reviews.filter(review => review.rating >= 4).length;
  const badReviews = data.reviews.filter(review => review.rating < 4).length;

  return (
    <div className={`flex flex-col justify-center relative items-center bg-backgrounds text-text w-full min-h-screen ${
      show || addProduct || addCategory || showPnL || showDeleteModal ? 'overflow-hidden h-screen' : 'h-full'
    }`}>
      {show && <ShowCategories />}
      {addProduct && <AddProduct />}
      {addCategory && <AddCategory />}
      {showPnL && (
        <div className="w-screen min-h-screen h-full backdrop-blur-sm z-20 absolute top-0 flex justify-center items-center">
          <div className="border-2 border-text/10 bg-background rounded-xl w-11/12">
            <div className="text-xl p-6 border-b-2 border-text/10 font-bold flex justify-between">
              <div className="text-2xl">Products</div>
              <button 
                className="p-2 rounded-lg text-text/40 hover:text-text hover:bg-text/10"
                onClick={() => setShowPnL(false)}
              >
                <X />
              </button>
            </div>
            <div className="p-6 pt-0 overflow-scroll no-scrool">
              <Listing />
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <DeleteModal 
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      
      <main className={` transition-all duration-300 w-full h-full pt-20 px-5 sm:px-10 lg:mx-10 md:pl-24 md:pr-16
      }`}>
        <h1 className="text-3xl font-bold font-serif pt-2 pb-4 pl-2">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <StatCard title="Products" value={data.products.length}>
            <div className="flex absolute bottom-1">
              <button 
                className="md:px-4 p-3 font-thin text-text text-sm md:text-base float-end hover:text-text transition-all duration-300 rounded-md m-1 bg-text/10 hover:bg-primary"
                onClick={() => setShowPnL(true)}
              >
                View Products
              </button>
              <button 
                className="md:px-4 p-3 font-thin text-text text-sm md:text-base hover:text-primary transition-all duration-300 rounded-md m-1 bg-text/10 hover:bg-primary/10"
                onClick={() => setAddProduct(true)}
              >
                Add Products
              </button>
            </div>
          </StatCard>

          <StatCard 
            title="Categories" 
            value={data.categories.length + data.subCategories.length}
          >
            <div className="flex absolute bottom-1">
              <button 
                className="md:px-4 p-3 text-text font-thin text-sm md:text-base float-end hover:text-text transition-all duration-300 rounded-md m-1 bg-text/10 hover:bg-primary"
                onClick={() => setShow(true)}
              >
                View Categories
              </button>
              <button 
                className="md:px-4 p-3 font-thin text-text text-sm md:text-base hover:text-primary transition-all duration-300 rounded-md m-1 bg-text/10 hover:bg-primary/10"
                onClick={() => setAddCategory(true)}
              >
                Add Categories
              </button>
            </div>
          </StatCard>

          {/* Users List */}
          <div className="bg-background rounded-lg row-span-2 sm:row-span-3 sm:col-span-2 md:col-span-2 h-[490px] overflow-scroll no-scrool p-2 pt-4 pl-4 shadow-[0_0_4px] shadow-text/5">
            <h2 className="text-xl font-bold text-text">Total Users: {data.users.length}</h2>
            <div className="overflow-scroll no-scrool mt-5 md:px-4">
              <div className="flex justify-around font-serif underline-offset-4 text-text pb-4 underline">
                <span>User Name</span>
                <span>Role</span>
                <span>Actions</span>
              </div>
              {data.users.map((user) => (
                <div key={user._id} className="flex font-thin justify-between text-text/80 text-lg">
                  <div className="w-1/3 md:flex justify-center">{user.userName}</div>
                  <div className="w-1/3 md:flex justify-center pl-8">{user.role}</div>
                  <button 
                    className="flex justify-center w-1/3 text-red-600 cursor-pointer"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics Cards */}
          <StatCard title="Total Orders" value={data.orders.length} />
          
          <div className="bg-background rounded-lg shadow-[0_0_4px] shadow-text/5 p-4">
            <h2 className="text-xl font-bold text-text mb-4">Reviews</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-4xl text-primary/80 mb-2">{goodReviews}</div>
                <div className="text-sm">Good</div>
              </div>
              <div className="text-center">
                <div className="text-4xl text-primary/80 mb-2">{badReviews}</div>
                <div className="text-sm">Bad</div>
              </div>
              <div className="text-center">
                <div className="text-4xl text-primary/80 mb-2">{data.reviews.length}</div>
                <div className="text-sm">Total</div>
              </div>
            </div>
          </div>

          {/* Product Details Summary */}
          <div className="bg-background rounded-lg col-span-2 lg:col-span-4 p-4 shadow-[0_0_4px] shadow-text/5">
            <h2 className="text-xl font-bold text-text mb-4">Product Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl text-primary/90 mb-2">
                  {data.products.length}
                </div>
                <div className="text-sm">Total Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl text-primary/90 mb-2">
                  {data.products.reduce((total, product) => total + product.stock, 0)}
                </div>
                <div className="text-sm">Inventory</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl text-primary/90 mb-2">
                  {data.categories.length}
                </div>
                <div className="text-sm">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl text-primary/90 mb-2">
                  {data.subCategories.length}
                </div>
                <div className="text-sm">Sub-Categories</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};