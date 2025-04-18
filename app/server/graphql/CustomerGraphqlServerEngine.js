import express from 'express'
import cors from 'cors'

import rootPath from '../../../lib/globals/root-path.js'

import BaseGraphqlServerEngine from '../../../lib/server/graphql/BaseGraphqlServerEngine.js'

import BigNumberScalar from '../../../lib/server/graphql/scalars/concretes/BigNumberScalar.js'
import DateTimeScalar from '../../../lib/server/graphql/scalars/concretes/DateTimeScalar.js'

import graphqlUploadExpressWithResolvingContentType from '../../../lib/server/graphql/middleware/graphqlUploadExpressWithResolvingContentType.js'

import CustomerGraphqlShare from './contexts/CustomerGraphqlShare.js'
import CustomerGraphqlContext from './contexts/CustomerGraphqlContext.js'

/**
 * Renchan server engine for customer.
 */
export default class CustomerGraphqlServerEngine extends BaseGraphqlServerEngine {
  /** @override */
  static get config () {
    return {
      graphqlEndpoint: '/graphql-customer',
      staticPath: rootPath.to('public/'),
      schemaPath: rootPath.to('app/server/graphql/schemas/customer.graphql'),
      actualResolversPath: rootPath.to('app/server/graphql/resolvers/customer/actual/'),
      stubResolversPath: rootPath.to('app/server/graphql/resolvers/customer/stub/'),
      postWorkersPath: rootPath.to('app/server/graphql/post-workers/customer/'),

      /*
       * NOTE: Uncomment the following line to enable Redis PubSub
       *   When disabled, LocalPubSub is used.
       */
      redisOptions: null,
      // redisOptions: {
      //   host: 'localhost',
      //   port: 6379,
      // },
    }
  }

  /** @override */
  static get standardErrorCodeHash () {
    return {
      Unknown: '100.X000.001',
      ConcreteMemberNotFound: '101.X000.001',
      Unauthenticated: '102.X000.001',
      Unauthorized: '102.X000.002',
      DeniedSchemaPermission: '102.X000.003',
      Database: '104.X000.001',

      CanNotSubscribe: '102.S000.001',
    }
  }

  /** @override */
  collectMiddleware () {
    return [
      cors({
        origin: '*',
      }),

      express.json({
        limit: '10mb',
      }),

      express.static(
        this.config.staticPath
      ),

      graphqlUploadExpressWithResolvingContentType({
        maxFileSize: 10000000, // 10 MB
        maxFiles: 10,
      }),

      express.urlencoded({
        extended: true,
        verify: (req, res, body) => {
          // eslint-disable-next-line no-param-reassign
          req['rawBody'] = body.toString()
        },
      }),
    ]
  }

  /** @override */
  get schemasToSkipFiltering () {
    return [
      'companySponsors',
      'curriculums',
      'signUp',
      'signIn',

      'createChatRoom',
      'postNotification',
      'sendChatMessage',
      'chatMessages',
      'chatRooms',

      'onObserveChatStates',
      'onReceiveMessage',
      'onUpdateChatRooms',
      'onBroadcastNotifications',
    ]
  }

  /** @override */
  generateFilterHandler () {
    return async ({
      variables,
      context,
      information,
      parent,
    }) => {
      const schema = information.fieldName

      const canResolve = context.canResolve({
        schema,
      })

      if (canResolve) {
        return
      }

      if (!context.hasAuthenticated()) {
        throw this.errorHash.Unauthenticated.create()
      }

      if (!context.hasAuthorized()) {
        throw this.errorHash.Unauthorized.create()
      }

      if (!context.hasSchemaPermission({
        schema,
      })) {
        throw this.errorHash.DeniedSchemaPermission.create({
          value: {
            schema,
          },
        })
      }
    }
  }

  /** @override */
  get visaIssuers () {
    return {
      hasAuthenticated: async ({
        expressRequest,
        userEntity,
        engine,
      }) => userEntity !== null,
      hasAuthorized: async ({
        expressRequest,
        userEntity,
        engine,
      }) => true,
      generateSchemaPermissionHash: async ({
        expressRequest,
        userEntity,
        engine,
      }) =>

        /**
         * @type {Record<string, boolean> | null} - Schema permission hash. (null means that all schemas have permission)
         * @example
         * ```js
         * return {
         *   customer: true,
         *   statistics: false,
         *   ...
         * }
         * ```
         */
        null
      ,
    }
  }

  /** @override */
  static get Share () {
    return CustomerGraphqlShare
  }

  /** @override */
  static get Context () {
    return CustomerGraphqlContext
  }

  /** @override */
  async collectScalars () {
    return [
      BigNumberScalar,
      DateTimeScalar,
    ]
  }
}
