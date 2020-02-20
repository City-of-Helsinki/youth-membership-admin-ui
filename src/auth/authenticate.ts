import userManager from './userManager';

export default function(): void {
  // Todo add error handling
  userManager.signinRedirect();
}
