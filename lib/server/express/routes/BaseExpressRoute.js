/**
 * Express route as Base class.
 */
export default class BaseExpressRoute {
  /**
   * Constructor.
   *
   * @param {BaseExpressRouteParams} params - Parameters of this constructor.
   */
  constructor ({
    method,
    path,
    handlers,
  }) {
    this.method = method
    this.path = path
    this.handlers = handlers
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseExpressRoute ? X : never} T, X
   * @param {BaseExpressRouteFactoryParams} options - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    method = 'use',
    path = '/',
    handlers,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        method,
        path,
        handlers,
      })
    )
  }

  /**
   * Mount middleware to Express app.
   *
   * @param {{
   *   app: ExpressType.Application
   * }} params - Parameters of this method.
   * @returns {ExpressType.Application} - Mounted Express app.
   */
  mountTo ({
    app,
  }) {
    return app[this.method](
      this.path,
      ...this.handlers
    )
  }
}

/**
 * @typedef {{
 *   method?: string
 *   path?: (string | RegExp)
 *   handlers: Array<ExpressType.Middleware>
 * }} BaseExpressRouteParams
 */

/**
 * @typedef {BaseExpressRouteParams} BaseExpressRouteFactoryParams
 */

/**
 * @typedef {BaseExpressRouteFactoryParams} BaseExpressRouteFactoryAsyncParams
 */
