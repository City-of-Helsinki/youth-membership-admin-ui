const defaultRequiredEnvironmentVariables = [
  'REACT_APP_OIDC_AUTHORITY',
  'REACT_APP_PROFILE_AUDIENCE',
  'REACT_APP_JASSARI_AUDIENCE',
  'REACT_APP_OIDC_CLIENT_ID',
  'REACT_APP_OIDC_SCOPE',
  'REACT_APP_JASSARI_FEDERATION_GRAPHQL',
  'REACT_APP_SENTRY_DSN',
  'REACT_APP_BASE_URL',
];

export class ConfigService {
  requiredEnvironmentVariables: string[];

  constructor(
    requiredEnvironmentVariables: string[] = defaultRequiredEnvironmentVariables
  ) {
    this.requiredEnvironmentVariables = requiredEnvironmentVariables;
  }

  checkConfigs() {
    const missingVariables: string[] = [];
    this.requiredEnvironmentVariables.forEach((name) => {
      try {
        this.getConfig(name);
      } catch (e) {
        missingVariables.push(name);
      }
    });

    if (missingVariables.length === 1) {
      throw new Error(
        `The variable ${missingVariables[0]} was not given a value during build`
      );
    }

    if (missingVariables.length > 1) {
      throw new Error(
        `The variables ${missingVariables.join(
          ', '
        )} were not given values during build`
      );
    }
  }

  getConfig(key: string): string {
    const variable = process.env[key];

    if (!variable) {
      throw new Error(`Variable "${key}" was not given a value during build`);
    }

    return variable;
  }
}

export default new ConfigService();
