import express from 'express'
import cors from 'cors'

import rootPath from '../../../lib/globals/root-path.js'

import BaseRestfulApiServerEngine from '../../../lib/server/restfulapi/BaseRestfulApiServerEngine.js'
import AppRestfulApiShare from './contexts/AppRestfulApiShare.js'
import AppRestfulApiContext from './contexts/AppRestfulApiContext.js'

/**
 * App RESTful API server engine.
 */
export default class AppRestfulApiServerEngine extends BaseRestfulApiServerEngine {
  /** @override */
  static get config () {
    return {
      pathPrefix: '/v1', // nul: none
      renderersPath: rootPath.to('app/server/restfulapi/renderers/v1/'),
      staticPath: rootPath.to('public/'),
    }
  }

  /** @override */
  generateFilterHandler () {
    /**
     * @param {RestfulApiType.RenderInput<*, *>} params - Parameters.
     * @returns {Promise<RestfulApiType.ErrorResponse | null>}
     */
    return async ({
      body,
      query,
      context,
      request,
    }) => {
      if (!context.hasAuthenticated()) {
        return this.errorResponseHash
          .Unauthenticated
          .createAsError()
      }

      if (!context.hasAuthorized()) {
        return this.errorResponseHash
          .Unauthorized
          .createAsError()
      }

      if (!context.hasPathPermission()) {
        return this.errorResponseHash
          .Unauthorized
          .createAsError()
      }

      return null
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
      hasPathPermission: async ({
        expressRequest,
        userEntity,
        engine,
      }) => true,
    }
  }

  /** @override */
  static get Share () {
    return AppRestfulApiShare
  }

  /** @override */
  static get Context () {
    return AppRestfulApiContext
  }

  /** @override */
  static get standardErrorEnvelopHash () {
    return {
      Unknown: {
        statusCode: 500,
        errorMessage: 'Unknown error',
      },
      ConcreteMemberNotFound: {
        statusCode: 500,
        errorMessage: 'Unknown error',
      },
      Unauthenticated: {
        statusCode: 401,
        errorMessage: 'Unauthenticated',
      },
      Unauthorized: {
        statusCode: 403,
        errorMessage: 'Unauthorized',
      },
      Database: {
        statusCode: 500,
        errorMessage: 'Database error',
      },
    }
  }

  /** @override */
  collectMiddleware () {
    return [
      cors({
        origin: '*',
      }),

      express.raw({
        type: 'application/json',
      }),

      express.json({
        limit: '10mb',
      }),

      express.static(
        this.config.staticPath
      ),

      express.urlencoded({
        extended: true,
        verify: (req, res, body) => {
          // eslint-disable-next-line no-param-reassign
          req['rawBody'] = body.toString()
        },
      }),
    ]
  }
}
