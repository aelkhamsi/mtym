import { toLabelMap } from "./option.utils";

export const foodAllergyOptions = [
  { label: "Aucune", value: "none" },
  { label: "Gluten", value: "gluten" },
  { label: "Lactose", value: "lactose" },
  { label: "Arachides", value: "arachides" },
] as const;

export const foodAllergyLabelMap = toLabelMap(foodAllergyOptions);
