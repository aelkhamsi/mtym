import { atom } from "recoil";

export const adminState = atom<any>({
  key: 'adminState',
  default: undefined,
});