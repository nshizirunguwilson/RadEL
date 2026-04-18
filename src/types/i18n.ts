export type Locale = "en" | "fr";
export const LOCALES: Locale[] = ["en", "fr"];
export const DEFAULT_LOCALE: Locale = "en";

export interface LocaleInfo {
  code: Locale;
  label: string;
  nativeLabel: string;
}

export const LOCALE_INFO: Record<Locale, LocaleInfo> = {
  en: { code: "en", label: "English", nativeLabel: "English" },
  fr: { code: "fr", label: "French", nativeLabel: "Français" },
};
