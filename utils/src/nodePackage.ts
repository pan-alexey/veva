
export const isPackage = (name?: string): boolean => {
  if (!name) return false;
  try {
    const resolvePackage = require.resolve(name);
    return !!resolvePackage;
  } catch (error) {
    return false
  }
};

export const getPackageJson = (name?: string): Object => {
  if (!name) return {};
  try {
    const resolvePackage = require(`${name}/package.json`);
    return resolvePackage || {};
  } catch (error) {
    return {}
  }
};