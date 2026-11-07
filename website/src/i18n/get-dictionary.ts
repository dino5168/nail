import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/zh-tw";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  "zh-tw": () => import("./dictionaries/zh-tw").then((m) => m.default),
  vi: () => import("./dictionaries/vi").then((m) => m.default),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> => dictionaries[locale]();

export type { Dictionary };
