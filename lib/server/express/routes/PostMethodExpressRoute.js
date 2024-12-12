import BaseExpressRoute from './BaseExpressRoute.js'

/**
 * Express route as POST method.
 */
export default class PostMethodExpressRoute extends BaseExpressRoute {
  /**
   * Factory method.
   *
   * @template {X extends typeof PostMethodExpressRoute ? X : never} T, X
   * @param {PostMethodExpressRouteFactoryParams} options - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    path,
    handlers,
  }) {
    return /** @type {InstanceType<T>} */ (
      super.create({
        method: 'post',
        path,
        handlers,
      })
    )
  }
}

/**
 * @typedef {{
 *   path: (string | RegExp)
 *   handlers: Array<ExpressType.Middleware>
 * }} PostMethodExpressRouteFactoryParams
 */
