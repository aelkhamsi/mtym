import { toLabelMap } from "./option.utils";

export const illnessOrDisabilityOptions = [
  { label: "Aucune", value: "none" },
  { label: "Asthme", value: "asthme" },
  { label: "Diabète", value: "diabete" },
  { label: "Épilepsie", value: "epilepsie" },
  { label: "Trouble du spectre autistique (TSA)", value: "autiste" },
  { label: "TDAH", value: "tdah" },
] as const;

export const illnessOrDisabilityLabelMap = toLabelMap(
  illnessOrDisabilityOptions,
);
