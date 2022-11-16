import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
.use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: process.env.NODE_ENV === "production"
      ? "impresario/locales/{{lng}}/{{ns}}.json"
      : "locales/{{lng}}/{{ns}}.json"
    },
    debug: false,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },

  })

  export default i18n;