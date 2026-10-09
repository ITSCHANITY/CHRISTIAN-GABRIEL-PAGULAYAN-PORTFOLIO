/* eslint-env node */
require('@typescript-eslint/parser')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
  },
  ignorePatterns: ['dist', 'node_modules', '*.config.ts', '*.config.js'],
}
