'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Translation resources
import enCommon from '../public/locales/en/common.json';
import enHomepage from '../public/locales/en/homepage.json';
import enCategories from '../public/locales/en/categories.json';
import zhCommon from '../public/locales/zh/common.json';
import zhHomepage from '../public/locales/zh/homepage.json';
import zhCategories from '../public/locales/zh/categories.json';

type Language = 'en' | 'zh';

type TranslationResources = {
  [key in Language]: {
    common: typeof enCommon;
    homepage: typeof enHomepage;
    categories: typeof enCategories;
  };
};

const resources: TranslationResources = {
  en: {
    common: enCommon,
    homepage: enHomepage,
    categories: enCategories,
  },
  zh: {
    common: zhCommon,
    homepage: zhHomepage,
    categories: zhCategories,
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (namespace: keyof TranslationResources[Language], key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['en', 'zh'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (namespace: keyof TranslationResources[Language], key: string, params?: Record<string, any>) => {
    try {
      const keys = key.split('.');
      let value: any = resources[language][namespace];
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      if (typeof value !== 'string') {
        console.warn(`Translation key "${key}" not found in ${namespace}/${language}`);
        return key;
      }
      
      // Simple interpolation for {{variable}} syntax
      if (params) {
        return value.replace(/\{\{(\w+)\}\}/g, (match: string, param: string) => {
          return params[param] !== undefined ? String(params[param]) : match;
        });
      }
      
      return value;
    } catch (error) {
      console.warn(`Error translating "${key}":`, error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}