import js from '@eslint/js';

export default [
  {
    ignores: ['dist/**', '.eslintrc.js', 'jest.config.js', 'webpack.config.js']
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        node: true,
        jest: true,
        document: true,
        window: true,
        localStorage: true,
        prompt: true,
        FileReader: true,
        btoa: true,
        global: true,
        describe: true,
        test: true,
        expect: true,
        File: true,
        module: true,
        require: true,
        __dirname: true
      }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-console': 'warn'
    }
  }
];
