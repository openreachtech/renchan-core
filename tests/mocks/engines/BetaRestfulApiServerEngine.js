import express from 'express'
import cors from 'cors'

import rootPath from '../../../lib/globals/root-path.js'

import BaseRestfulApiServerEngine from '../../../lib/server/restfulapi/BaseRestfulApiServerEngine.js'

import BetaRestfulApiContext from '../contexts/BetaRestfulApiContext.js'
import BetaRestfulApiShare from '../contexts/BetaRestfulApiShare.js'

/**
 * BetaRestfulApiServerEngine.
 */
export default class BetaRestfulApiServerEngine extends BaseRestfulApiServerEngine {
  /** @override */
  static get config () {
    return {
      renderersPath: rootPath.to('tests/haystacks/renderers/v1/post/'),
      staticPath: rootPath.to('public/'),
      pathPrefix: '/v2', // nul: none
    }
  }

  /** @override */
  static get Context () {
    return BetaRestfulApiContext
  }

  /** @override */
  static get Share () {
    return class extends BetaRestfulApiShare {}
  }

  /** @override */
  static get standardErrorEnvelopHash () {
    return {
      Unknown: {
        statusCode: 500,
        errorMessage: 'Unknown error occurred',
      },
      Unauthenticated: {
        statusCode: 401,
        errorMessage: 'Unauthenticated error occurred',
      },
      Unauthorized: {
        statusCode: 403,
        errorMessage: 'Unauthorized error occurred',
      },
      Database: {
        statusCode: 500,
        errorMessage: 'Database error occurred',
      },
      ConcreteMemberNotFound: {
        statusCode: 500,
        errorMessage: 'Internal error occurred',
      },
    }
  }

  /** @override */
  generateFilterHandler () {
    /**
     * @param {RestfulApiType.RenderInput<*, *>} args - Input data.
     * @returns {Promise<RestfulApiType.RenderResponse | null>} - Filter response.
     */
    return async ({
      body,
      query,
      context,
      request,
    }) => {
      if (!context.hasAuthenticated()) {
        return this.errorResponseHash.Unauthenticated.createAsError()
      }

      if (!context.hasAuthorized()) {
        return this.errorResponseHash.Unauthorized.createAsError()
      }

      if (!context.hasPathPermission()) {
        return this.errorResponseHash.DeniedPathPermission.createAsError()
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
  collectMiddleware () {
    return [
      cors({
        origin: '*',
      }),

      express.static(this.config.staticPath),

      express.json({
        limit: '10mb',
      }),
    ]
  }
}
