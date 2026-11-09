/**
 * Saffron Components Loader
 * This file ensures that all Saffron web components are properly registered.
 *
 * Saffron component definitions are functions that need to be explicitly invoked
 * to register the custom elements with the browser's CustomElementRegistry.
 * This is the recommended approach for Angular 21+ applications.
 */

import * as saffronComponents from '@saffron/core-components';

/**
 * Registers all Saffron web components by invoking their definition functions.
 * Each exported component from @saffron/core-components is a function that,
 * when called, registers the custom element using the Web Components API.
 */
export const loadSaffronComponents = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  Object.values(saffronComponents).forEach((component: any) => {
    // Only invoke functions that look like component definitions
    // Component definitions are functions that return void or a component class
    if (typeof component === 'function' && component.length === 0) {
      try {
        component();
      } catch {
        // Silently ignore errors for components already registered or incompatible exports
        // This can happen if components are loaded multiple times
      }
    }
  });

  console.debug('Saffron components registered');
};

// Auto-execute on import to ensure components are available immediately
loadSaffronComponents();
