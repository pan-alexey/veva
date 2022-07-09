import * as nodePackage from '../nodePackage';

describe('nodePackage', () => {
  it('nodePackage', async () => {
    expect(nodePackage.isPackage('jest')).toBe(true);
    expect(nodePackage.isPackage('__jest__')).toBe(false);
    expect(nodePackage.isPackage()).toBe(false);
  });

  it('getPackageJson:null', async () => {
    expect(nodePackage.getPackageJson('__jest__')).toEqual({});
    expect(nodePackage.getPackageJson()).toEqual({});
  });

  it('getPackageJson:null', async () => {
    const json = nodePackage.getPackageJson('jest');
    expect((json as { name: string }).name).toEqual('jest');
  });
});
