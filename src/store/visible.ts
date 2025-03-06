import { atom } from "recoil";


export const addP = atom<boolean>({
    key: 'addP',
    default: false,
});

export const edit = atom<boolean>({
    key: 'edit',
    default: false,
});

export const addC = atom<boolean>({
    key: 'addC',
    default: false,
});

export const Show = atom<boolean>({
    key: 'show',
    default: false,
});
export const filterSidebar = atom<boolean>({
    key: 'filter' ,
    default: true,
})
