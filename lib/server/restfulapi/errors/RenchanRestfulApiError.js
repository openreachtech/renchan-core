/**
 * RestfulApi resolver error.
 * This class is necessary to identify exceptions intentionally thrown from the RESTful API module.
 *
 * @extends {Error}
 */
export default class RenchanRestfulApiError extends Error {
  /**
   * Factory method.
   *
   * @template {X extends typeof RenchanRestfulApiError ? X : never} T, X
   * @param {RenchanRestfulApiErrorFactoryParams} [params] - Parameters.
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
   * @throws {Error} - concrete-member-not-found {"memberName":"RenchanRestfulApiError.get:errorCode"}get:errorCode]
   */
  static get errorCode () {
    /**
     * @note
     * By intentionally throwing it as a plain Error rather than a RestfulApiError to prevent it from being displayed to the client.
     */
    throw new Error('concrete-member-not-found {"memberName":"RenchanRestfulApiError.get:errorCode"}')
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
   * Declare RestfulApi error.
   *
   * @param {{
   *   code: string
   * }} params - Parameters.
   * @returns {typeof RenchanRestfulApiError} - RestfulApi error.
   */
  static declareRestfulApiError ({
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
 * }} RenchanRestfulApiErrorFactoryParams
 */
