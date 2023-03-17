
import en from './en.json'
import cs from './cs.json'

export type Locale = keyof typeof locales

export const locales = { en, cs }
