/* eslint-disable @typescript-eslint/no-explicit-any */
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
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  images?: string[];
  thumbnail?: string;
 
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
  reviewerName:string;
  reviewerEmail:string;
  rating: number;
  comment: string;
  date: Date;
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

export type AuthResponse = {
  username: string;
  email: string;
  addresses: string[]; 
  role: string;
}

export declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}


export declare interface signInProps {
  email: string;
  password: string;
}
export declare interface signupProps {
  email: string;
  password: string;
  userName:string,
  address:string ,
  state:string ,
  postalCode:string,
}