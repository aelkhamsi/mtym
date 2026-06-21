import { toLabelMap } from "./option.utils";

export const regionOptions = [
  { label: "Tanger-Tétouan-Al Hoceïma", value: "tanger-tetouan-al-houceima" },
  { label: "Oriental", value: "oriental" },
  { label: "Fès-Meknès", value: "fes-meknes" },
  { label: "Rabat-Salé-Kénitra", value: "rabat-sale-kenitra" },
  { label: "Béni Mellal-Khénifra", value: "beni-mellal-khenifra" },
  { label: "Casablanca-Settat", value: "casablanca-settat" },
  { label: "Marrakech-Safi", value: "marrakech-safi" },
  { label: "Drâa-Tafilalet", value: "draa-tafilalet" },
  { label: "Souss-Massa", value: "souss-massa" },
  { label: "Guelmim-Oued Noun", value: "guelmim-oued-noun" },
  { label: "Laâyoune-Sakia El Hamra", value: "laayoune-sakia-el-hamra" },
  { label: "Dakhla-Oued Eddahab", value: "dakhla-oued-eddahab" },
  { label: "Étranger", value: "abroad" },
] as const;

export const regionLabelMap = toLabelMap(regionOptions);
