import { toLabelMap } from "./option.utils";

export const yesNoOptions = [
  { label: "Oui", value: "yes" },
  { label: "Non", value: "no" },
] as const;

export const yesNoLabelMap = toLabelMap(yesNoOptions);
