import * as Sentry from '@sentry/browser';

import userManager from './userManager';

export default function (): void {
  userManager.signinRedirect().catch((error: Error) => {
    if (error.message !== 'Network Error') {
      Sentry.captureException(error);
    }
  });
}
