import { CategoryEditState, ProductEditState } from '@/types';
import { atom } from 'recoil';



export const EditV = atom<ProductEditState>({
  key: 'value',
  default: {
    category: '',
    name: '',
    description: '',
    mrp: 0,
    price: 0,
    stock: 0,
    image: '',
    cat_img: '',
  },
});

export const EditC = atom<CategoryEditState>({
  key: 'CatV',
  default: {
    itemType: 'category',
    name: '',
    description: '',
    isSubCategory: false,
    parent: '',
    cat_img: '',
  },
});
