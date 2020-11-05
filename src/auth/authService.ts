import { UserManager, User, UserManagerSettings, Log } from 'oidc-client';
import axios from 'axios';
import * as Sentry from '@sentry/browser';

import configService from '../config/configService';
import authorizationService from './authorizationService';

const origin = window.location.origin;
export const API_TOKENS = 'apiTokens';

export class AuthService {
  private userManager: UserManager;

  constructor() {
    /* eslint-disable @typescript-eslint/camelcase */
    const settings: UserManagerSettings = {
      loadUserInfo: true,
      authority: configService.getConfig('REACT_APP_OIDC_AUTHORITY'),
      client_id: configService.getConfig('REACT_APP_OIDC_CLIENT_ID'),
      redirect_uri: `${origin}/callback`,
      // For debugging, set it to 1 minute by removing comment:
      // accessTokenExpiringNotificationTime: 59.65 * 60,
      automaticSilentRenew: false,
      silent_redirect_uri: `${origin}/silent_renew.html`,
      response_type: 'id_token token',
      scope: configService.getConfig('REACT_APP_OIDC_SCOPE'),
      post_logout_redirect_uri: origin,
    };
    /* eslint-enable @typescript-eslint/camelcase */

    // Show oidc debugging info in the console only while developing
    if (process.env.NODE_ENV === 'development') {
      Log.logger = console;
      Log.level = Log.INFO;
    }

    // User Manager instance
    this.userManager = new UserManager(settings);

    // Public methods
    this.getUser = this.getUser.bind(this);
    this.getTokens = this.getTokens.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.endLogin = this.endLogin.bind(this);
    this.renewToken = this.renewToken.bind(this);
    this.logout = this.logout.bind(this);

    // Events
    this.userManager.events.addAccessTokenExpired(async () => {
      try {
        const newUser = await this.userManager.signinSilent();
        await this.userManager.storeUser(newUser);
        // Remove API token to force logout if renewal fails (see authProvider.ts)
        localStorage.removeItem(API_TOKENS);
        const apiToken = await this.fetchApiTokens(newUser);
        localStorage.setItem(API_TOKENS, JSON.stringify(apiToken));
      } catch (error) {
        // This happens if you're offline for example, and it is responsible to log out.
        localStorage.removeItem(API_TOKENS);
        // TODO: Decide if we want these errors to go to Sentry
        Sentry.captureException(error);
        // eslint-disable-next-line no-console
        console.error('b', error);
      }
    });

    this.userManager.events.addSilentRenewError((error) => {
      // eslint-disable-next-line no-console
      console.error('userManager addSilentRenewError', error);
    });

    this.userManager.events.addAccessTokenExpired(async () => {
      // This is probably torta på torta because the apiToken will be removed in
      // addAccessTokenExpiring
      try {
        localStorage.removeItem(API_TOKENS);
      } catch (error) {
        // TODO: Decide if we want these errors to go to Sentry
        Sentry.captureException(error);
        // eslint-disable-next-line no-console
        console.error(error);
      }
    });

    this.userManager.events.addUserSignedOut(() => {
      this.userManager.clearStaleState();
      authorizationService.clear();
      localStorage.removeItem(API_TOKENS);
    });

    this.userManager.events.addUserLoaded(async (user) => {
      await this.fetchApiTokens(user);
      await authorizationService.fetchRole(this.getTokens());
    });
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public getTokens(): string | null {
    return localStorage.getItem(API_TOKENS);
  }

  public isAuthenticated() {
    const userKey = `oidc.user:${configService.getConfig(
      'REACT_APP_OIDC_AUTHORITY'
    )}:${configService.getConfig('REACT_APP_OIDC_CLIENT_ID')}`;
    const oidcStorage = sessionStorage.getItem(userKey);
    const apiTokens = this.getTokens();

    return (
      !!oidcStorage && !!JSON.parse(oidcStorage).access_token && !!apiTokens
    );
  }

  public async login(path = '/'): Promise<void> {
    try {
      return this.userManager.signinRedirect({ data: { path } });
    } catch (error) {
      if (error.message !== 'Network Error') {
        Sentry.captureException(error);
      }
    }
  }

  public async endLogin(): Promise<User> {
    const user = await this.userManager.signinRedirectCallback();

    await this.fetchApiTokens(user);
    await authorizationService.fetchRole(this.getTokens());

    return user;
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public async logout(): Promise<void> {
    localStorage.removeItem(API_TOKENS);
    this.userManager.clearStaleState();
    authorizationService.clear();
    await this.userManager.signoutRedirect();
  }

  private async fetchApiTokens(user: User): Promise<void> {
    const url = `${configService.getConfig(
      'REACT_APP_OIDC_AUTHORITY'
    )}api-tokens/`;
    const { data: apiTokens } = await axios.get(url, {
      baseURL: configService.getConfig('REACT_APP_OIDC_AUTHORITY'),
      headers: {
        Authorization: `bearer ${user.access_token}`,
      },
    });

    localStorage.setItem(API_TOKENS, JSON.stringify(apiTokens));
  }
}

export default new AuthService();
