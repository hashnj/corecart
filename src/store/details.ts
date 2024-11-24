import { selector } from "recoil";
import { B_Url } from "../config";
import { Category, Product, SubCategory } from "@/types";
import { User } from "@/types";



interface Review {
  _id: string;
  rating: number;
  comment: string;
  userId: string;
}

interface DashboardData {
  products: Product[];
  categories: Category[];
  subCategories: SubCategory[];
  users: User[];
  orders: any[]; 
  reviews: Review[];
}

export const detailsSelector = selector<DashboardData | null>({
  key: 'detailsSelector',
  get: async () => {
    try {
      const res = await fetch(`${B_Url}/data`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': localStorage.getItem('token') || ''
        }
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: DashboardData = await res.json();

      if (data) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
});
