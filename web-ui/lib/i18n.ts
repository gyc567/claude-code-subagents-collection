import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => {
      return import(`../public/locales/${language}/${namespace}.json`);
    }))
    .init({
      lng,
      fallbackLng: 'en',
      supportedLngs: ['en', 'zh'],
      defaultNS: 'common',
      fallbackNS: 'common',
      ns,
      interpolation: {
        escapeValue: false,
      },
    });

  return i18nInstance;
};

export function useTranslationWithFallback() {
  // This will be used for client-side translations
  return {
    t: (key: string, options?: any) => {
      // Simple fallback implementation for server-side rendering
      return key;
    },
    i18n: {
      language: 'en',
      changeLanguage: (lng: string) => {
        // Client-side language change logic
      },
    },
  };
}

export default initI18next;