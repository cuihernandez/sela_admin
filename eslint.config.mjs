import jsdoc from 'eslint-plugin-jsdoc';

export default [
  {
    files: ['**/*.js'],
    plugins: {
      jsdoc: jsdoc,
    },
    rules: {
      'jsdoc/require-description': 'error',
      'jsdoc/check-values': 'error',
      'no-unused-vars': 'error', // You can set it to "error" or "off" as needed
    },
  },
];
