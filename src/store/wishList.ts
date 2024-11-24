import { atom, selector } from "recoil";
import axiosInstance from '@/lib/axiosInstance';

export const wishListState = atom<any[]>({
    key: 'wishList',
    default: []
});

export const getWList = selector({
    key: 'getList',
    get: async ({  }) => {
        try {
            const req = await axiosInstance.get(`/products/wish`, {});
            return req.data; 
        } catch (error) {
            console.error("Failed to fetch wishlist:", error);
            return []; 
        }
    }
});

export const wList = selector({
    key: 'active',
    get: async ({ get }) => {
        const list = get(wishListState);
        try {
            const req = await axiosInstance.post(`/products/wish`, {list}, );
            return req.data; 
        } catch (error) {
            console.error("Failed to update wishlist:", error);
            return null; 
        }
    }
});
