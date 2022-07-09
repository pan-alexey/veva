export const isPackage = (name?: string): boolean => {
  if (!name) return false;
  try {
    const resolvePackage = require.resolve(name);
    return !!resolvePackage;
  } catch (error) {
    return false;
  }
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const getPackageJson = (name?: string): Object => {
  if (!name) return {};
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const resolvePackage = require(`${name}/package.json`);
    return resolvePackage || {};
  } catch (error) {
    return {};
  }
};
