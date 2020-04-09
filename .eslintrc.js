module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'no-async-promise-executor': 0,
    'space-before-function-paren': ['error', 'never'],
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': ['error', { 'args': 'none' }],
    'no-console': 'off',
    'curly': 'error',
    'eqeqeq': 'error',
    'no-throw-literal': 'error',
    'strict': 'error',
    'no-var': 'error',
    'dot-notation': 'error',
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',
    'no-use-before-define': 'error',
    'no-useless-call': 'error',
    'no-with': 'error',
    'operator-linebreak': 'error',
    'yoda': 'error',
    'quote-props': ['error', 'as-needed'],
    'prefer-promise-reject-errors': ["error", { "allowEmptyReject": false }]
  }
}
