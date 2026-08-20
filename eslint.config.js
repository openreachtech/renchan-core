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
  {
    files: [
      'lib/client/redis/LocalRedis.js',
      'lib/server/graphql/subscription/pubsub/tools/EventHub.js',
      'lib/server/graphql/subscription/TopicReceiver.js',
    ],
    rules: {
      'no-restricted-syntax': [
        'error',
        ...coreRuleOptionHash['no-restricted-syntax'].spreadOptions
          .filter(it => it.selector !== 'MethodDefinition[kind=constructor] BlockStatement CallExpression:not([callee.type=Super])'),
      ],
    },
  },
  {
    files: [
      'lib/server/graphql/GraphqlHttpHandlerBuilder.js',
    ],
    rules: {
      'no-restricted-syntax': [
        'error',
        ...coreRuleOptionHash['no-restricted-syntax'].spreadOptions
          .filter(it => it.selector !== 'IfStatement[test] AwaitExpression'),
      ],
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
