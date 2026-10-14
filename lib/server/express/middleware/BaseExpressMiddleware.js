/**
 * Express middleware as Base class.
 *
 * @abstract
 */
export default class BaseExpressMiddleware {
  /**
   * Constructor.
   *
   * @param {BaseExpressMiddlewareParams} params - Parameters of this constructor.
   */
  constructor ({
    engine,
  }) {
    this.engine = engine
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseExpressMiddleware ? X : never} T, X
   * @param {BaseExpressMiddlewareFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    engine,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        engine,
      })
    )
  }

  /**
   * get: Constructor.
   *
   * @returns {typeof BaseExpressMiddleware} - Constructor.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * get: Share.
   *
   * @returns {GraphqlType.Share | RestfulApiType.Share} - Share of the engine.
   */
  get share () {
    return this.engine.share
  }

  /**
   * Compose Express middleware.
   *
   * @abstract
   * @returns {ExpressType.Middleware} - Express middleware.
   * @throws {Error} - If this method is not implemented.
   */
  composeMiddleware () {
    throw new Error(`101.X000.001 {"memberName":"${this.constructor.name}#composeMiddleware()"}`)
  }
}

/**
 * @typedef {{
 *   engine: GraphqlType.ServerEngine | RestfulApiType.ServerEngine
 * }} BaseExpressMiddlewareParams
 */

/**
 * @typedef {BaseExpressMiddlewareParams} BaseExpressMiddlewareFactoryParams
 */
