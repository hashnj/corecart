import {atom, selector} from 'recoil'
import { authCheck } from './auth'

export const themeState = atom({
    key:'theme',
    default:localStorage?.getItem('theme')||(window.matchMedia("(prefers-color-scheme: dark)")?'dark':'light')
})

export const role = selector({
    key:'role',
    get: ({ get }) => {
        const authData = get(authCheck);
        return authData.role || [];
    },
})

