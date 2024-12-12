/**
 * GraphQL resolver error.
 *
 * @extends {Error}
 * @example
 * ```js
 * function buildGraphqlError (code) {
 *   return ({
 *     value,
 *     options,
 *   } = {}) =>
 *     RenchanGraphqlError.create({
 *       code,
 *       options,
 *       value,
 *     })
 * }
 * ```
 */
export default class RenchanGraphqlError extends Error {
  /**
   * Factory method.
   *
   * @template {X extends typeof RenchanGraphqlError ? X : never} T, X
   * @param {RenchanGraphqlErrorFactoryParams} [params] - Parameters.
   * @returns {InstanceType<T>} - Instance of this class.
   * @this {T}
   */
  static create ({
    code = this.errorCode,
    options,
    value,
  } = {}) {
    const message = this.generateErrorMessage({
      code,
      value,
    })

    return /** @type {InstanceType<T>} */ (
      new this(
        message,
        options
      )
    )
  }

  /**
   * get: Error code.
   *
   * @abstract
   * @returns {string} - Error message.
   * @throws {Error} - concrete-member-not-found {"memberName":"RenchanGraphqlError.get:errorCode"}get:errorCode]
   */
  static get errorCode () {
    /**
     * @note
     * By intentionally throwing it as a plain Error rather than a GraphqlError to prevent it from being displayed to the client.
     */
    throw new Error('concrete-member-not-found {"memberName":"RenchanGraphqlError.get:errorCode"}')
  }

  /**
   * Generate error message.
   *
   * @param {{
   *   code: string
   *   value: *
   * }} params - Parameters
   * @returns {string} - Error message.
   */
  static generateErrorMessage ({
    code,
    value,
  }) {
    if (!value) {
      return code
    }

    const json = JSON.stringify(value)

    return `${code} ${json}`
  }

  /**
   * Declare GraphQL error.
   *
   * @param {{
   *   code: string
   * }} params - Parameters.
   * @returns {typeof RenchanGraphqlError} - GraphQL error.
   */
  static declareGraphqlError ({
    code,
  }) {
    return class extends this {
      /** @override */
      static get errorCode () {
        return code
      }
    }
  }
}

/**
 * @typedef {{
 *   code?: string,
 *   options?: ErrorOptions
 *   value?: *
 * }} RenchanGraphqlErrorFactoryParams
 */
