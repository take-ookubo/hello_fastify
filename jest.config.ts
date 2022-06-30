import type { InitialOptionsTsJest } from "ts-jest/dist/types"

const config: InitialOptionsTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [".*.cases..*"],
}

export default config
