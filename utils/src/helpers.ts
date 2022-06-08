export const uniqString = (arr: string[]): string[] => {
  const keys: Record<string, true> = {};
  arr.forEach(key => {
    keys[key] = true;
  })
  return Object.keys(keys);
}