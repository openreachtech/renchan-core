import ConcreteMemberNotFoundRestfulApiError from '../errors/concretes/ConcreteMemberNotFoundRestfulApiError.js'

/**
 * Base class for RESTful API response.
 *
 * @template {Record<string, unknown>} V
 * @template {Record<string, unknown>} E
 */
export default class RestfulApiResponse {
  /**
   * Constructor.
   *
   * @param {RestfulApiResponseParams<V, E>} params - Parameters of this constructor.
   */
  constructor ({
    statusCode,
    content,
    error,
  }) {
    this.statusCode = statusCode
    this.content = content
    this.error = error
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof RestfulApiResponse ? X : never} T, X
   * @param {RestfulApiResponseFactoryParams<*, *>} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    statusCode = this.statusCode,
    content = null,
    error = null,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        statusCode,
        content,
        error,
      })
    )
  }

  /**
   * Factory method as error.
   *
   * @template {X extends typeof RestfulApiResponse ? X : never} T, X
   * @param {{
   *   statusCode?: number
   *   errorMessage?: string
   *   course?: unknown
   * }} [params] - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static createAsError ({
    statusCode,
    errorMessage = this.errorMessage,
    course = null,
  } = {}) {
    const error = this.generateErrorEnvelope({
      errorMessage,
      course,
    })

    return this.create({
      statusCode,
      error,
    })
  }

  /**
   * get: Status code.
   *
   * @abstract
   * @returns {number} - Status code.
   * @throws {Error} - concrete class should implement this method.
   */
  static get statusCode () {
    throw ConcreteMemberNotFoundRestfulApiError.create({
      value: {
        memberName: 'RestfulApiResponse.get:statusCode',
      },
    })
  }

  /**
   * get: Error message.
   *
   * @abstract
   * @returns {string} - Error message.
   * @throws {Error} - concrete class should implement this method.
   */
  static get errorMessage () {
    throw ConcreteMemberNotFoundRestfulApiError.create({
      value: {
        memberName: 'RestfulApiResponse.get:errorMessage',
      },
    })
  }

  /**
   * Generate error envelope.
   *
   * @param {{
   *   errorMessage: string
   *   course?: unknown
   * }} params - Parameters.
   * @returns {{
   *   message: string
   *   course?: unknown
   * }} - Error envelope.
   */
  static generateErrorEnvelope ({
    errorMessage,
    course,
  }) {
    if (!course) {
      return {
        message: errorMessage,
      }
    }

    return {
      message: errorMessage,
      course,
    }
  }

  /**
   * Declare error RESTful API response.
   *
   * @param {{
   *   errorEnvelope: RestfulApiType.ErrorResponseEnvelope
   * }} params - Parameters.
   * @returns {typeof RestfulApiResponse} - RestfulApi error.
   */
  static declareErrorRestfulApiResponse ({
    errorEnvelope,
  }) {
    return class extends this {
      /** @override */
      static get statusCode () {
        return errorEnvelope.statusCode
      }

      /** @override */
      static get errorMessage () {
        return errorEnvelope.errorMessage
      }
    }
  }

  /**
   * get: Constructor of this class.
   *
   * @returns {typeof RestfulApiResponse} - Constructor.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * get: Status code.
   *
   * @returns {number} - Status code.
   */
  get status () {
    return this.statusCode
  }

  /**
   * Convert this object to JSON.
   *
   * @returns {{
   *   content: V | null
   *   error: E | null
   * }} - JSON object.
   */
  toJson () {
    return {
      content: this.content,
      error: this.error,
    }
  }
}

/**
 * @typedef {{
 *   statusCode: number
 *   content: V | null
 *   error: E | null
 * }} RestfulApiResponseParams
 * @template V, E
 */

/**
 * @typedef {{
 *   statusCode?: number
 *   content?: V | null
 *   error?: E | null
 * }} RestfulApiResponseFactoryParams
 * @template {Record<string, unknown>} V
 * @template {Record<string, unknown>} E
 */
