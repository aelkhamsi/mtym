import { toLabelMap } from "./option.utils";

export const educationLevelOptions = [
  { label: "Tronc commun", value: "tronc-commun" },
  { label: "1ère année Bac", value: "1bac" },
  { label: "2ème année Bac", value: "2bac" },
] as const;

export const educationLevelLabelMap = toLabelMap(educationLevelOptions);
