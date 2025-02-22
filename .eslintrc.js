module.exports = {
  root: true,
  extends: ['@react-native', 'eslint:recommended', 'plugin:jest/recommended'],
  plugins: ['jest'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
  },
  globals: {
    'jest/globals': true,
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
