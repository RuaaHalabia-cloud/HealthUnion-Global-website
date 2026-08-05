import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

const stored = typeof window !== "undefined" ? localStorage.getItem("hu_lang") : null;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: stored || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export default i18n;
