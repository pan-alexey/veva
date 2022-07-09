module.exports = {
  preset: 'ts-jest/presets/default-esm',
  roots: ['<rootDir>/src/'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest'],
  },
  testTimeout: 15000,
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules'],
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  modulePathIgnorePatterns: ['__mocks__'],
};
