import { atom } from "jotai";
import { User } from "@mdm/types";

export const userAtom = atom<User|undefined>(undefined);