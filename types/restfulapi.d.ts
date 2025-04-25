import express from 'express'

/**
 * RESTful API types
 */
import BaseRestfulApiServerEngine from '../lib/server/restfulapi/BaseRestfulApiServerEngine.js'
import BaseRestfulApiContext from '../lib/server/restfulapi/contexts/BaseRestfulApiContext.js'
import BaseRestfulApiShare from '../lib/server/restfulapi/contexts/BaseRestfulApiShare.js'
import RestfulApiVisa from '../lib/server/restfulapi/contexts/RestfulApiVisa.js'

import BaseRenderer from '../lib/server/restfulapi/renderers/BaseRenderer.js'
import RestfulApiRequest from '../lib/server/restfulapi/interfaces/RestfulApiRequest.js'
import RestfulApiResponse from '../lib/server/restfulapi/interfaces/RestfulApiResponse.js'
import RenchanRestfulApiError from '../lib/server/restfulapi/errors/RenchanRestfulApiError.js'

import BaseRestfulApiResponseFlusher from '../lib/server/restfulapi/responseFlusher/BaseRestfulApiResponseFlusher.js'

/**
 * Declare types
 */
declare global {
  namespace RestfulApiType {
    type Config = {
      pathPrefix: string | null
      renderersPath: string
      staticPath: string
    }

    type ServerEngine = BaseRestfulApiServerEngine
    type ServerEngineCtor = typeof BaseRestfulApiServerEngine

    type Context = BaseRestfulApiContext
    type ContextCtor = typeof BaseRestfulApiContext

    type Share = BaseRestfulApiShare
    type ShareCtor = typeof BaseRestfulApiShare

    type Visa = RestfulApiVisa
    type VisaCtor = typeof RestfulApiVisa

    namespace Engine {
      interface visaIssuers {
        hasAuthenticated?: (args: VisaIssuerParams) => Promise<boolean>
        hasAuthorized?: (args: VisaIssuerParams) => Promise<boolean>
        hasPathPermission?: (args: VisaIssuerParams) => Promise<boolean>
      }

      type VisaIssuerParams = {
        expressRequest: ExpressType.Request
        userEntity: renchan.UserEntity
        engine: ServerEngine
        requestedAt: Date
      }
    }

    type Renderer = BaseRenderer<*, *>
    type RendererCtor = typeof BaseRenderer<*, *>

    type RenderRequestBody = Record<string, any>
    type RenderRequestQuery = express.Request['query']

    type Request = RestfulApiRequest

    type RenderResponse = RestfulApiResponse<
      Record<string, *>,
      RenchanRestfulApiError
    >

    type ErrorResponse = RestfulApiResponse
    type ErrorResponseCtor = typeof RestfulApiResponse

    type RenderInput<
      B extends RenderRequestBody,
      Q extends RenderRequestQuery,
    > = {
      body: B | null
      query: Q | null
      context: Context
      request?: Request
    }

    type ErrorResponseEnvelope = {
      statusCode: number
      errorMessage: string
    }

    type Error = RenchanRestfulApiError
    type ErrorCtor = typeof RenchanRestfulApiError

    type ResponseFlusher = BaseRestfulApiResponseFlusher
    type ResponseFlusherCtor = typeof BaseRestfulApiResponseFlusher
  }
}
