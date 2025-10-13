import { atom } from "jotai";
import { Team } from "@mdm/types";

export const teamAtom = atom<Team|null>(null);