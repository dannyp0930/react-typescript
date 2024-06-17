import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ['**/*.jsx'], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  pluginReactConfig,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'react/react-in-jsx-scope': 0,
      '@typescript-eslint/no-unused-vars': 1,
    },
  },
];