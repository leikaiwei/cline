import { DEFAULT_LANGUAGE_DISPLAY } from "@shared/Languages"

export const SIMPLIFIED_CHINESE_DISPLAY = DEFAULT_LANGUAGE_DISPLAY

export const isSimplifiedChinesePreferredLanguage = (preferredLanguage?: string) =>
	(preferredLanguage || DEFAULT_LANGUAGE_DISPLAY) === SIMPLIFIED_CHINESE_DISPLAY

export const localize = (preferredLanguage: string | undefined, englishText: string, chineseText: string) =>
	isSimplifiedChinesePreferredLanguage(preferredLanguage) ? chineseText : englishText
