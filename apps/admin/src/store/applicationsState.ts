import { atom } from "recoil";

export const applicationsState = atom<any>({
  key: 'applicationsState',
  default: undefined,
});