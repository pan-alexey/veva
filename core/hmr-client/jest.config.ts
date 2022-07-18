import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  roots: ["<rootDir>/src"],
  preset: "jest-preset-preact",
  testTimeout: 10 * 60_000,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/mock/**",
  ],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  modulePathIgnorePatterns: ["mocks"],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
}
export default config;
