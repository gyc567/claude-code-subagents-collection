'use client'

import { useTranslation as useNextTranslation } from 'react-i18next'

export function useTranslation(namespace = 'common') {
  // For client-side rendering, return a proper translation function
  if (typeof window !== 'undefined') {
    try {
      return useNextTranslation(namespace)
    } catch {
      // Fallback if i18next is not properly initialized
      return {
        t: (key: string) => key,
        i18n: {
          language: 'en',
          changeLanguage: () => Promise.resolve(),
        }
      }
    }
  }

  // For server-side rendering, return a dummy function
  return {
    t: (key: string, options?: any) => {
      // Simple fallback implementation for server-side rendering
      if (options && typeof options === 'object' && options.defaultValue) {
        return options.defaultValue
      }
      return key
    },
    i18n: {
      language: 'en',
      changeLanguage: (lng: string) => Promise.resolve(),
    },
  }
}