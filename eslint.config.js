import globals from 'globals'

import {
  default as openreachtechConfig,
  coreRuleOptionHash,
} from '@openreachtech/eslint-config'

export default [
  ...openreachtechConfig,

  {
    rules: {
      'no-shadow': [
        'error',
        {
          allow: [
            ...coreRuleOptionHash['no-shadow'].allow,
            ...Object.keys(globals.browser),

            'Op', // Sequelize.Op
          ],
        },
      ],
    },
  },

  // Turn off some rules temporarily
  {
    files: [
      'lib/server/graphql/GraphqlServerBuilder.js',
      'lib/server/restfulapi/RestfulApiServerBuilder.js',
    ],
    rules: {
      'no-console': 'off',
    },
  },

  // Turn off some rules temporarily
  {
    files: [
      'tests/**/*.js',
    ],
    rules: {
      'jsdoc/require-jsdoc': 'off',
    },
  },

  // Turn off some rules for specific files
  {
    // 🚨 Never add other files to this files.
    files: [
      'app/server/graphql/AdminGraphqlServerEngine.js',
      'app/server/graphql/CustomerGraphqlServerEngine.js',
      'lib/server/graphql/middleware/graphqlUploadExpressWithResolvingContentType.js',
      'app/server/restfulapi/AppRestfulApiServerEngine.js',
    ],
    rules: {
      'eslint-comments/no-use': 'off',
      'eslint-comments/require-description': 'off',
    },
  },
]
