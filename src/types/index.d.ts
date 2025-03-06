

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

export type SignUpParams = {
  userName?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  email: string;
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
};
export type AuthResponse = {
  username: string;
  email: string;
  addresses: string[]; 
  role: string;
}

export type User = {
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

declare interface Address {
  user_id: string;
  order_id: string;
  address_type:string;
  isDefault:boolean;
  ref: string;
  city: string;
  state: string;
  postal_code: string;
}


declare interface PaginationProps {
  page: number;
  totalPages: number;
}


declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

declare interface signInProps {
  email: string;
  password: string;
}

declare interface getUserInfoProps {
  userId: string;
}

declare interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

declare interface WishlistResponse {
  message: string;
  data: WishlistItem[];
}

declare interface Product {
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


declare interface Review{
  rating: number;
  review: string;
  reviewer: string;
  date: string;
}