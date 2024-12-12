import type {
  Application as ExpressApplication,
  Handler,
  Request as ExpressRequest,
  Response as ExpressResponse,
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
    type Middleware = Handler

    type Route = BaseExpressRoute

    type HttpMethod = 'get'
      | 'post'
      | 'put'
      | 'delete'
      | 'patch'
      | 'options'
      | 'head'
      | 'all'
  }
}
