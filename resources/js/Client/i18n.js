import i18n from "i18next";
import Backend from "i18next-http-backend";
import { useCookies } from "react-cookie";
import { initReactI18next } from "react-i18next";

import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(Backend)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        detection:{
            order: ['localStorage','htmlTag','querystring', 'cookie', 'sessionStorage', 'navigator', 'path', 'subdomain'],
            lookupLocalStorage: 'lang',
        },

        // lng: localStorage.getItem('lang') || 'en',
        backend: {
            /* translation file path */
            loadPath: "/i18n/{{ns}}/{{lng}}.json",
        },
        // fallbackLng: "en",
        debug: false,
        /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
        ns: ["translations"],
        defaultNS: "translations",
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ",",
        },
        react: {
            wait: true,
        },
    });

export default i18n;
