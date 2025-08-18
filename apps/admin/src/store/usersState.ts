import { atom } from "recoil";

export const usersState = atom<any>({
  key: 'usersState',
  default: undefined,
});