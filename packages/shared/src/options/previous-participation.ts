import { toLabelMap } from "./option.utils";

export const previousParticipationOptions = [
  { label: "Oui", value: "yes" },
  { label: "Non", value: "no" },
  {
    label: "J'ai postulé, mais je n'ai pas été sélectionné.",
    value: "not-selected",
  },
] as const;

export const previousParticipationLabelMap = toLabelMap(
  previousParticipationOptions,
);
