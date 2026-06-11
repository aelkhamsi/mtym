import type { Option } from "./option.types";

export function toLabelMap<T extends readonly Option[]>(
  options: T,
): Record<string, string> {
  const entries = options.map((option) => [option.value, option.label]);
  return Object.fromEntries(entries);
}
