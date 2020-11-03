import { getRole } from './api/api';

export const PERMISSIONS = 'permissions';

export class AuthorizationService {
  constructor() {
    this.fetchRole = this.fetchRole.bind(this);
    this.isAuthorized = this.isAuthorized.bind(this);
    this.getRole = this.getRole.bind(this);
    this.clear = this.clear.bind(this);
  }

  async fetchRole(tokens: string | null): Promise<void> {
    if (!tokens) {
      throw Error('No token found. Please authenticate before authorization.');
    }

    const {
      data: { role },
    } = await getRole(tokens);

    sessionStorage.setItem(PERMISSIONS, role);
  }

  isAuthorized(): boolean {
    return sessionStorage.getItem(PERMISSIONS) !== null;
  }

  getRole(): string | null {
    return sessionStorage.getItem(PERMISSIONS);
  }

  clear() {
    sessionStorage.removeItem(PERMISSIONS);
  }
}

export default new AuthorizationService();
