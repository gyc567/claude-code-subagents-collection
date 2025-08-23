'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'

interface I18nContextType {
  language: string
  setLanguage: (lang: string) => void
}

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {}
})

export function useLanguage() {
  return useContext(I18nContext)
}

export default function I18nProvider({
  children,
  initialLanguage = 'en'
}: {
  children: React.ReactNode
  initialLanguage?: string
}) {
  const [language, setLanguage] = useState(initialLanguage)
  const [i18nInstance, setI18nInstance] = useState<typeof i18next | null>(null)

  useEffect(() => {
    const initI18n = async () => {
      const instance = i18next.createInstance()
      
      await instance
        .use(initReactI18next)
        .use(resourcesToBackend((language: string, namespace: string) => {
          return import(`../public/locales/${language}/${namespace}.json`)
        }))
        .init({
          lng: language,
          fallbackLng: 'en',
          supportedLngs: ['en', 'zh'],
          defaultNS: 'common',
          fallbackNS: 'common',
          ns: ['common', 'homepage', 'categories'],
          interpolation: {
            escapeValue: false,
          },
          react: {
            useSuspense: false,
          },
        })

      setI18nInstance(instance)
    }

    initI18n()
  }, [language])

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    if (i18nInstance) {
      i18nInstance.changeLanguage(lang)
    }
    // Store language preference
    localStorage.setItem('preferred-language', lang)
  }

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language')
    if (savedLang && savedLang !== language) {
      setLanguage(savedLang)
    }
  }, [])

  if (!i18nInstance) {
    return <div>{children}</div>
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
      <I18nextProvider i18n={i18nInstance}>
        {children}
      </I18nextProvider>
    </I18nContext.Provider>
  )
}