import BaseExpressRoute from '../../express/routes/BaseExpressRoute.js'

/**
 * Express route as GET method.
 */
export default class GetMethodExpressRoute extends BaseExpressRoute {
  /**
   * Factory method.
   *
   * @template {X extends typeof GetMethodExpressRoute ? X : never} T, X
   * @param {GetMethodExpressRouteFactoryParams} options - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    path,
    handlers,
  }) {
    return /** @type {InstanceType<T>} */ (
      super.create({
        method: 'get',
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
 * }} GetMethodExpressRouteFactoryParams
 */
