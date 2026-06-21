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

export const workshopLabelMap = Object.fromEntries(
  workshopOptions.map((workshop) => [
    workshop.value,
    `${workshop.title} - ${workshop.animators}`,
  ]),
) as Record<string, string>;
