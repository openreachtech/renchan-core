/**
 * RESTful API Request.
 */
export default class RestfulApiRequest {
  /**
   * Constructor.
   *
   * @param {RestfulApiRequestParams} params - Parameters of this constructor.
   */
  constructor ({
    expressRequest,
  }) {
    this.expressRequest = expressRequest
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof RestfulApiRequest ? X : never} T, X
   * @param {RestfulApiRequestFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    expressRequest,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        expressRequest,
      })
    )
  }

  /**
   * get: Constructor of this class.
   *
   * @returns {Headers} - Headers.
   */
  get headers () {
    return /** @type {*} */ (
      this.expressRequest.headers
    )
  }
}

/**
 * @typedef {{
 *   expressRequest: ExpressType.Request
 * }} RestfulApiRequestParams
 */

/**
 * @typedef {{
 *   expressRequest: ExpressType.Request
 * }} RestfulApiRequestFactoryParams
 */
