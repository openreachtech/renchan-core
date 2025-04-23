import type {
  Application as ExpressApplication,
  Handler,
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from 'express'

import BaseExpressRoute from '../lib/server/express/routes/BaseExpressRoute'

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

    type Route = BaseExpressRoute

    type HttpMethod = 'all'
      | 'get'
      | 'post'
      | 'put'
      | 'delete'
      | 'patch'
      | 'options'
      | 'head'
  }
}
