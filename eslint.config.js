import openreachtechConfig from '@openreachtech/eslint-config'

export default [
  ...openreachtechConfig,

  {
    ignores: [
      'playground/**',
    ],
  },

  {
    languageOptions: {
      sourceType: 'module',
      globals: {
        __dirname: 'readonly',
        process: 'readonly',
        crypto: 'readonly',

        module: 'readonly',

        sequelize: 'readonly', // namespace

        setTimeout: 'readonly',
      },
    },
  },

  {
    files: [
      '**/*.cjs',
    ],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },

  // Turn off some rules temporary
  {
    rules: {
      camelcase: 'off',
      'sort-imports': 'off',

      'jest/max-expects': 'off',

      'jsdoc/check-indentation': 'off',
      'jsdoc/check-tag-names': 'off',
      'jsdoc/no-undefined-types': 'off',
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/valid-types': 'off',
    },
  },
]
