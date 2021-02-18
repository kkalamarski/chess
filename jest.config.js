module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json",
    },
  },
  moduleFileExtensions: ["js", "ts", "tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/*.test.(ts|js|tsx)"],
  testEnvironment: "node",
  preset: "ts-jest",
};
