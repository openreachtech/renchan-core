import BaseExpressRoute from './BaseExpressRoute.js'

/**
 * Express route middleware.
 */
export default class MiddlewareExpressRoute extends BaseExpressRoute {
  /**
   * Factory method.
   *
   * @template {X extends typeof MiddlewareExpressRoute ? X : never} T, X
   * @param {MiddlewareExpressRouteFactoryParams} options - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    path = '/',
    handlers,
  }) {
    return /** @type {InstanceType<T>} */ (
      super.create({
        path,
        handlers,
      })
    )
  }
}

/**
 * @typedef {{
 *   path?: (string | RegExp)
 *   handlers: Array<ExpressType.Middleware>
 * }} MiddlewareExpressRouteFactoryParams
 */
