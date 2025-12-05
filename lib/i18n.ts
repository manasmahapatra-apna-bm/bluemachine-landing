import type { Translations, Locale } from '@/i18n/types';
import enTranslations from '@/i18n/en.json';

const translations: Record<Locale, Translations> = {
    en: enTranslations as Translations,
};

export function getTranslations(locale: Locale = 'en'): Translations {
    return translations[locale] || translations.en;
}

export function getTranslation(
    locale: Locale = 'en',
    key: keyof Translations
): Translations[keyof Translations] {
    const translations = getTranslations(locale);
    return translations[key];
}

export function getDefaultLocale(): Locale {
    return 'en';
}
