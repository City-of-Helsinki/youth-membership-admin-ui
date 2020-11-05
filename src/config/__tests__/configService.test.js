import configService, { ConfigService } from '../configService';

describe('configService', () => {
  describe('checkConfigs', () => {
    it('should throw on missing configs', () => {
      const customConfigService = new ConfigService(['var1', 'var2']);

      expect(() =>
        customConfigService.checkConfigs()
      ).toThrowErrorMatchingInlineSnapshot(
        `"The variables var1, var2 were not given values during build"`
      );
    });
  });

  describe('getConfig', () => {
    it('should throw when variable can not be found from env', () => {
      expect(() =>
        configService.getConfig('adoj9')
      ).toThrowErrorMatchingInlineSnapshot(
        `"Variable \\"adoj9\\" was not given a value during build"`
      );
    });

    it('should find variable from environment', () => {
      const variable = 'test var';
      const key = 'TEST_VARIABLE';

      process.env[key] = variable;

      expect(configService.getConfig(key)).toEqual(variable);

      delete process.env[key];
    });
  });
});
