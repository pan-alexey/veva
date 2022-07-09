export const uniqString = (arr: string[]): string[] => {
  const keys: Record<string, true> = {};
  arr.forEach((key) => {
    keys[key] = true;
  });
  return Object.keys(keys);
};

export const hashCode = (str: string): number => {
  return str.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};
