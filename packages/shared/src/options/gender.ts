import { toLabelMap } from "./option.utils";

export const genderOptions = [
  { label: "Féminin", value: "female" },
  { label: "Masculin", value: "male" },
] as const;

export const genderLabelMap = toLabelMap(genderOptions);
