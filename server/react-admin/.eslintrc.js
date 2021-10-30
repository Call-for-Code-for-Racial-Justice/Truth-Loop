module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    '../.eslintrc.js',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'warn',
  },
}
