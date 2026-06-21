import { toLabelMap } from "./option.utils";

export const educationFieldOptions = [
  { label: "TC sciences", value: "tc-sciences" },
  { label: "TC technologique", value: "tc-technologique" },
  {
    label: "1BAC Sciences Economiques et Gestion",
    value: "1bac-sciences-economiques-et-gestion",
  },
  { label: "1BAC Arts Appliqués", value: "1bac-arts-appliques" },
  {
    label: "1BAC Sciences Expérimentales",
    value: "1bac-sciences-experimentales",
  },
  {
    label: "1BAC Sciences Mathématiques",
    value: "1bac-sciences-mathematiques",
  },
  {
    label: "1BAC Sciences et Technologies Electriques",
    value: "1bac-sciences-et-technologies-electriques",
  },
  {
    label: "1BAC Sciences et Technologies Mécaniques",
    value: "1bac-sciences-et-technologies-mecaniques",
  },
  { label: "2BAC Sciences Economiques", value: "2bac-sciences-economiques" },
  {
    label: "2BAC Sciences de Gestion et Comptabilité",
    value: "2bac-sciences-de-gestion-et-comptabilite",
  },
  { label: "2BAC Arts Appliqués", value: "2bac-arts-appliques " },
  {
    label: "2BAC Sciences de la Vie et de la Terre",
    value: "2bac-sciences-de-la-vie-et-de-la-terre",
  },
  {
    label: "2BAC Sciences Physique Chimie",
    value: "2bac-sciences-physique-chimie",
  },
  { label: "2BAC Sciences Agronomiques", value: "2bac-sciences-agronomiques" },
  {
    label: "2BAC Sciences Mathématiques A",
    value: "2bac-sciences-mathematiques-a",
  },
  {
    label: "2BAC Sciences Mathématiques B",
    value: "2bac-sciences-mathematiques-b",
  },
  {
    label: "2BAC Sciences et Technologies Electrique",
    value: "2bac-sciences-et-technologies-electrique",
  },
  {
    label: "2BAC Sciences et Technologies Mécanique",
    value: "2bac-sciences-et-technologies-mecanique",
  },
  { label: "Autre", value: "autre" },
] as const;

export const educationFieldLabelMap = toLabelMap(educationFieldOptions);
