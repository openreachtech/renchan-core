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
    pathParameterHashProxy,
  }) {
    this.expressRequest = expressRequest
    this.pathParameterHashProxy = pathParameterHashProxy
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
    const pathParameterHashProxy = this.createPashParameterHashProxy({
      expressRequest,
    })

    return /** @type {InstanceType<T>} */ (
      new this({
        expressRequest,
        pathParameterHashProxy,
      })
    )
  }

  /**
   * get: Query parameters of this request.
   *
   * @param {{
   *   expressRequest: ExpressType.Request
   * }} params - Parameters of this method.
   * @returns {ExpressType.Request['params']} Path parameter hash.
   */
  static createPashParameterHashProxy ({
    expressRequest,
  }) {
    return new Proxy(expressRequest.params, {
      /**
       * @param {ExpressType.Request['params']} target - Core object.
       * @param {string} key - Property key.
       * @param {ExpressType.Request['params']} receiver - Core object.
       * @returns {* | null} - Value of the property or null if not found.
       */
      get (
        target,
        key,
        receiver
      ) {
        return Reflect.has(target, key)
          ? Reflect.get(target, key, receiver)
          : null
      },

      /**
       * @param {ExpressType.Request['params']} target - Core object.
       * @param {string} key - Property key.
       * @param {*} value - Value to set.
       * @param {ExpressType.Request['params']} receiver - Core object.
       * @throws {Error} - Throws an error if trying to set a property.
       */
      set (
        target,
        key,
        value,
        receiver
      ) {
        throw new Error('Cannot set RestfulApiRequest#get:pathParameterHash')
      },
    })
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

  /**
   * get: Query parameters of this request.
   *
   * @returns {ExpressType.Request['params']} Path parameter hash.
   */
  get pathParameterHash () {
    return this.pathParameterHashProxy
  }
}

/**
 * @typedef {{
 *   expressRequest: ExpressType.Request
 *   pathParameterHashProxy: ExpressType.Request['params']
 * }} RestfulApiRequestParams
 */

/**
 * @typedef {{
 *   expressRequest: ExpressType.Request
 * }} RestfulApiRequestFactoryParams
 */
