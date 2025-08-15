export async function loadTranslations(locale: string) {
  if (typeof window === 'undefined') {
    const messages = await import(`../locales/${locale}.json`);
    return messages.default;
  }

  const response = await fetch(`/i18n/${locale}.json`);
  if (!response.ok) {
    throw new Error(`Unable to load translations for ${locale}`);
  }
  return response.json();
}
