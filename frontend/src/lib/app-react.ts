/**
 * Base file for React powered screens. The original app_vue.js bootstrapped
 * Vue and several plugins. In the React/Next.js frontend we only expose
 * React to the global scope for legacy scripts that may still expect a
 * global framework instance.
 */

import React from 'react';

if (typeof window !== 'undefined') {
    // Expose React similar to how Vue was previously exposed.
    (window as any).React = React;
}

export default React;
