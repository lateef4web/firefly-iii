/**
 * Small i18n helper inspired by the original Vue based implementation.
 * This uses a simple dictionary lookup and does not depend on VueI18n.
 */

export const messages = {
    en: {
        greeting: 'Hello',
    },
    nl: {
        greeting: 'Hallo',
    },
};

export type Locale = keyof typeof messages;

export function t(key: string, locale: Locale = 'en'): string {
    return messages[locale][key] ?? key;
}
