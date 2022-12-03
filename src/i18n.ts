import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: () => {
        const host = window.location.host;
        if (host !== "localhost:3000") {
          return "locales/{{lng}}/{{ns}}.json";
        }
        return "impresario/locales/{{lng}}/{{ns}}.json";
      },
    },
    debug: false,
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
