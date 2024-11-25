/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "^.+\\.(ts|tsx|js)$": "ts-jest",
  },
};
