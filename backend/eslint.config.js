import js from '@eslint/js';
import globals from 'globals';

/** ESLint cho môi trường Node (ESM). Frontend có file cấu hình riêng. */
export default [
  { ignores: ['node_modules/**', 'migrations/**', 'coverage/**'] },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-console': ['warn', { allow: ['error'] }],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
    },
  },
];
