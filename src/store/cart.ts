import { atom, selector } from "recoil";
import axiosInstance from '@/lib/axiosInstance'; 

export const cartState = atom<any[]>({
    key: 'cart',
    default: []
});

export const getCart = selector({
    key: 'getCart',
    get: async ({  }) => {
        try {
            const req = await axiosInstance.get(`/products/cart`, {});
            return req.data; 
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            return []; 
        }
    }
});

export const cartUpdate = selector({
    key: 'cartUpdate',
    get: async ({ get }) => {
        const list = get(cartState);
        try {
            await axiosInstance.post(`/products/cart`, {list});
        } catch (error) {
            console.error("Failed to update cart:", error);
        }
    }
});
