import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';
import languages from 'lang';

let defaultLang;

const init = (authStore) => {
  defaultLang = authStore.lang;

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    defaultNS: 'lang',
    resources: languages,
    lng: defaultLang,
    fallbackLng: defaultLang,
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

  moment.locale(languages[defaultLang].moment);
};

export default { init, defaultLang };
