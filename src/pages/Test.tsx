import { AddAddress } from "@/components/forms/AddAddress"
import AddCategory from "@/components/forms/AddCategory"
import AddProduct from "@/components/forms/AddProduct"
import EditItem from "@/components/forms/Edit"
// import { ProductCard } from "@/components/ProductCards"
import { WishList } from "@/components/Wishlist"
// import { Dashboard } from "./DashBoard"
import { Product } from "./Products"

const Test = () => {
  return (
    <div>
      {/* <ProductCard  /> */}
      <Product />
      <WishList id="a" />
      <EditItem />
      <AddProduct />
      <AddCategory />
      <AddAddress />
    </div>
  )
}

export default Test