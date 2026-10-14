import type {
  Application as ExpressApplication,
  Handler,
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from 'express'

import BaseExpressRoute from '../lib/server/express/routes/BaseExpressRoute'
import BaseExpressMiddleware from '../lib/server/express/middleware/BaseExpressMiddleware'

/**
 * global types
 */
declare global {
  namespace ExpressType {
    type Application = ExpressApplication
    type Request = ExpressRequest
    type Response = ExpressResponse
    type NextFunction = ExpressNextFunction
    type Middleware = Handler
    type Settings = Record<string, any>

    type Route = BaseExpressRoute

    type MiddlewareFamilyMember = BaseExpressMiddleware
    type MiddlewareFamilyMemberCtor = typeof BaseExpressMiddleware

    type HttpMethod = 'all'
      | 'connect'
      | 'delete'
      | 'get'
      | 'head'
      | 'options'
      | 'patch'
      | 'post'
      | 'put'
      | 'trace'
  }
}
