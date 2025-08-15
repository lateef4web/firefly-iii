/**
 * Modern replacement for the legacy bootstrap.js script.
 * Provides a small wrapper around the Fetch API and automatically
 * includes the CSRF token and the X-Requested-With header.
 */

export async function apiFetch(url: string, options: RequestInit = {}) {
    const tokenElement = document.head.querySelector<HTMLMetaElement>('meta[name="csrf-token"]');
    const headers: Record<string, string> = {
        'X-Requested-With': 'XMLHttpRequest',
        ...(options.headers as Record<string, string> || {})
    };

    if (tokenElement) {
        headers['X-CSRF-TOKEN'] = tokenElement.content;
    } else {
        console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
    }

    return fetch(url, { ...options, headers });
}
