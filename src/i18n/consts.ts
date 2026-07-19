export const SUPPORTED_LANGUAGES = ['en', 'hy', 'ru'] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en'

export const DEFAULT_NAMESPACE = 'common'
