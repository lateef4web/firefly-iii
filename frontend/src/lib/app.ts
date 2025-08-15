/**
 * React equivalent of the legacy app.js file. The old implementation
 * loaded jQuery and Bootstrap; in the Next.js frontend we rely on the
 * modern React stack and TailwindCSS, so this module simply re-exports
 * shared utilities.
 */

export { apiFetch } from './bootstrap';
