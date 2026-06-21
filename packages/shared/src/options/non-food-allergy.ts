import { toLabelMap } from "./option.utils";

export const nonFoodAllergyOptions = [
  { label: "Aucune", value: "none" },
  { label: "Pollen", value: "pollen" },
  { label: "Piqûres d'insectes", value: "insects" },
] as const;

export const nonFoodAllergyLabelMap = toLabelMap(nonFoodAllergyOptions);
