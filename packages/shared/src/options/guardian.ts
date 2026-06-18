import { toLabelMap } from "./option.utils";

export const guardianOptions = [
  {label: "Père", value:"father"},
  {label: "Mère", value:"mother"},
  {label: "Tuteur", value:"guardian"},
]

export const guardianLabelMap = toLabelMap(guardianOptions);
