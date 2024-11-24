import { atom } from "recoil";

type BooleanState = boolean;

export const addP = atom<BooleanState>({
    key: 'addP',
    default: false,
});

export const edit = atom<BooleanState>({
    key: 'edit',
    default: false,
});

export const addC = atom<BooleanState>({
    key: 'addC',
    default: false,
});

export const Show = atom<BooleanState>({
    key: 'show',
    default: false,
});
export const filterSidebar = atom<BooleanState>({
    key: 'filter' ,
    default: true,
})
