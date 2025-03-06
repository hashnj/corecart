import { atom } from "recoil";

export const search = atom<boolean>({
  key: "search",
  default: false
});