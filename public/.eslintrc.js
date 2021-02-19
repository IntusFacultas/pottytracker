module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'react-app',
    'react-app/jest',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'guard-for-in': 'off',
    'max-len': ['warn', 120, 2],
    'react/forbid-prop-types': 'warn',
    'import/no-named-as-default': 'off',
    'no-console': 'warn',
  },
};
