type Option = {
  label: string;
  value: string;
};

function toLabelMap<T extends readonly Option[]>(
  options: T,
): Record<string, string> {
  const entries = options.map((option) => [option.value, option.label]);

  return Object.fromEntries(entries);
}

export const educationLevels = [
  { label: "Tronc commun", value: "tronc-commun" },
  { label: "1ère année Bac", value: "1bac" },
  { label: "2ème année Bac", value: "2bac" },
] as const;

export const educationLevelLabels = toLabelMap(educationLevels);

export type EducationLevel = (typeof educationLevels)[number]["value"];

export const educationFields = [
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

export const educationFieldLabels = toLabelMap(educationFields);

export type EducationField = (typeof educationFields)[number]["value"];

export const regions = [
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
  { label: "Abroad", value: "abroad" },
] as const;

export const regionLabels = toLabelMap(regions);

export type Region = (typeof regions)[number]["value"];

export const cities = [
  { label: "Agadir", value: "agadir" },
  { label: "Aït Melloul", value: "ait-melloul" },
  { label: "Al Hoceima", value: "al-hoceima" },
  { label: "Ben Guerir", value: "ben-guerir" },
  { label: "Beni Mellal", value: "beni-mellal" },
  { label: "Berrechid", value: "berrechid" },
  { label: "Berkane", value: "berkane" },
  { label: "Bouskoura", value: "bouskoura" },
  { label: "Casablanca", value: "casablanca" },
  { label: "El Jadida", value: "el-jadida" },
  { label: "Errachidia", value: "errachidia" },
  { label: "Essaouira", value: "essaouira" },
  { label: "Fez", value: "fez" },
  { label: "Guelmim", value: "guelmim" },
  { label: "Guercif", value: "guercif" },
  { label: "Ifrane", value: "ifrane" },
  { label: "Kenitra", value: "kenitra" },
  { label: "Khouribga", value: "khouribga" },
  { label: "Khemisset", value: "khemisset" },
  { label: "Khenifra", value: "khenifra" },
  { label: "Larache", value: "larache" },
  { label: "Marrakesh", value: "marrakesh" },
  { label: "Meknes", value: "meknes" },
  { label: "Mohammedia", value: "mohammedia" },
  { label: "Nador", value: "nador" },
  { label: "Ouarzazate", value: "ouarzazate" },
  { label: "Oujda", value: "oujda" },
  { label: "Rabat", value: "rabat" },
  { label: "Safi", value: "safi" },
  { label: "Salé", value: "sale" },
  { label: "Sefrou", value: "sefrou" },
  { label: "Settat", value: "settat" },
  { label: "Tan-Tan", value: "tan-tan" },
  { label: "Tangier", value: "tangier" },
  { label: "Taroudant", value: "taroudant" },
  { label: "Taza", value: "taza" },
  { label: "Temara", value: "temara" },
  { label: "Tetouan", value: "tetouan" },
  { label: "Tifelt", value: "tifelt" },
  { label: "Tiznit", value: "tiznit" },
  { label: "(Autre)", value: "other" },
] as const;

export const cityLabels = toLabelMap(cities);

export type City = (typeof cities)[number]["value"];

export const yesNoOptions = [
  { label: "Oui", value: "yes" },
  { label: "Non", value: "no" },
] as const;

export const yesNoLabels = toLabelMap(yesNoOptions);

export type YesNo = (typeof yesNoOptions)[number]["value"];

export const previousParticipationOptions = [
  { label: "Oui", value: "yes" },
  { label: "Non", value: "no" },
  {
    label: "J'ai postulé, mais je n'ai pas été sélectionné.",
    value: "not-selected",
  },
] as const;

export const previousParticipationLabels = toLabelMap(
  previousParticipationOptions,
);

export type PreviousParticipation =
  (typeof previousParticipationOptions)[number]["value"];

export const genderOptions = [
  { label: "Féminin", value: "female" },
  { label: "Masculin", value: "male" },
] as const;

export const genderLabels = toLabelMap(genderOptions);

export type Gender = (typeof genderOptions)[number]["value"];

export const foodAllergies = [
  { label: "Aucune", value: "none" },
  { label: "Gluten", value: "gluten" },
  { label: "Lactose", value: "lactose" },
  { label: "Arachides", value: "arachides" },
] as const;

export const foodAllergyLabels = toLabelMap(foodAllergies);

export type FoodAllergy = (typeof foodAllergies)[number]["value"];

export const nonFoodAllergies = [
  { label: "Aucune", value: "none" },
  { label: "Pollen", value: "pollen" },
  { label: "Piqûres d'insectes", value: "insects" },
] as const;

export const nonFoodAllergyLabels = toLabelMap(nonFoodAllergies);

export type NonFoodAllergy = (typeof nonFoodAllergies)[number]["value"];

export const illnessOrDisability = [
  { label: "Aucune", value: "none" },
  { label: "Asthme", value: "asthme" },
  { label: "Diabète", value: "diabete" },
  { label: "Épilepsie", value: "epilepsie" },
  { label: "Trouble du spectre autistique (TSA)", value: "autiste" },
  { label: "TDAH", value: "tdah" },
] as const;

export const illnessOrDisabilityLabels = toLabelMap(illnessOrDisability);

export type IllnessOrDisability = (typeof illnessOrDisability)[number]["value"];

export const workshopOptions = [
  {
    title: "Can you beat maths ?",
    animators: "Ismail Bouhaj",
    value: "math-bouhaj",
  },
  {
    title: "How do AI think ? A gentle introduction to LLMs",
    animators: "Oumaima Hourrane",
    value: "ai-hourrane",
  },
  {
    title: "Math in Action: when computers bring ideas to life",
    animators: "Safaa Khadim, Achraf El Khamsi",
    value: "cs-khadim-khamsi",
  },
  {
    title: "What game theory tells us about life?",
    animators: "Mouad Zemzoumi",
    value: "math-zemzoumi",
  },
] as const;

export type Workshop = (typeof workshopOptions)[number]["value"];

export const workshopLabels = Object.fromEntries(
  workshopOptions.map((workshop) => [
    workshop.value,
    `${workshop.title} - ${workshop.animators}`,
  ]),
) as Record<string, string>;
