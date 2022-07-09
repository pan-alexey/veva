import * as processConfig from '../processConfig';

describe('processConfig', () => {
  it('getActionType', async () => {
    expect(processConfig.getActionType('')).toBe(null);
    expect(processConfig.getActionType('build')).toBe('build');
  });

  it('getEnvType', async () => {
    expect(processConfig.getEnvType()).toBe(null);
    expect(processConfig.getEnvType('build')).toBe('production');
  });

  it('getArgvValue', async () => {
    expect(processConfig.getArgvValue(undefined, 1)).toBe(1);
    expect(processConfig.getArgvValue('123', 1)).toBe('123');
    expect(processConfig.getArgvValue(123, 1)).toBe('123');
    expect(processConfig.getArgvValue([1, 2, 3], null)).toBe('1');

    expect(processConfig.getArgvValue([undefined, 2, 3], null)).toBe(null);
  });
});
