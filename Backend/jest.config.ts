/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // setupFiles: ["dotenv/config"],
  testMatch: ["**/*.test.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
