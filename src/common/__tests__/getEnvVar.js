import getEnvVar from '../getEnvVar';

describe('getEnvVars', () => {
  it('should throw when variable can not be found from env', () => {
    expect(() => getEnvVar('adoj9')).toThrowErrorMatchingInlineSnapshot(
      `"Environment variable adoj9 not found"`
    );
  });

  it('should find variable from environment', () => {
    const variable = 'test var';
    const key = 'TEST_VARIABLE';

    process.env[key] = variable;

    expect(getEnvVar(key)).toEqual(variable);

    delete process.env[key];
  });
});
