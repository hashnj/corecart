// import { AddAddress } from "@/components/forms/AddAddress"
// import AddCategory from "@/components/forms/AddCategory"
// import AddProduct from "@/components/forms/AddProduct"
// import EditItem from "@/components/forms/Edit"
// import { ProductCard } from "@/components/ProductCards"
// import { WishList } from "@/components/Wishlist"
// import { Dashboard } from "./DashBoard"
import { Explore } from "./Explore"
import { Home } from "./Home"
import Products from "./Products"

const Test = () => {
  return (
    <div>
      {/* <ProductCard  /> */}
      <Products />
      <Explore />
      <Home />
      {/* <WishList id="a" />
      <EditItem />
      <AddProduct />
      <AddCategory />
      <AddAddress /> */}
    </div>
  )
}

export default Test