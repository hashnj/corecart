export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface WishlistResponse {
  message: string;
  data: WishlistItem[];
}

export interface DividingCriteria {
  key: string;
  values: string[];
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  mrp: number;
  price: number;
  stock: number;
  image: string;
  category: string;
  orderSizes: string[];
  dividingCriteria: DividingCriteria[];
  [key: string]: any; 
}

export interface SubCategory {
  id: string;
  name: string;
  [key: string]: any; 
}

export interface Category {
  id: string;
  name: string;
  subCategories?: SubCategory[];
  [key: string]: any; 
}

export interface CategoryResponse {
  categories: Category[];
  subCategories: SubCategory[];
}

export interface User {
  _id:string;
  email: string;
  password: string;
  userId: string;
  userName: string;
  role: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
};

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  userId: string;
}
export interface ProductEditState {
  category: string;
  name: string;
  description: string;
  mrp: number ;
  price: number;
  stock: number;
  image: string;
  cat_img: string;
}

export interface CategoryEditState {
  itemType?: 'category' | 'product';
  name: string;
  description: string;
  isSubCategory: boolean;
  parent: string;
  cat_img: string;
}