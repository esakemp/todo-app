/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

const envFile = '.env.test'
require('dotenv').config(fs.existsSync(envFile) ? { path: envFile } : {})

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  setupFiles: ['dotenv/config'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  watchPathIgnorePatterns: ['globalConfig'],
}
