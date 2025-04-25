import ConcreteMemberNotFoundRestfulApiError from '../errors/concretes/ConcreteMemberNotFoundRestfulApiError.js'

/**
 * Base class for flushing RESTful API responses.
 */
export default class BaseRestfulApiResponseFlusher {
  /**
   * Constructor.
   *
   * @param {BaseRestfulApiResponseFlusherParams} params - Parameters of this constructor.
   */
  constructor ({
    expressResponse,
    renderResponse,
  }) {
    this.expressResponse = expressResponse
    this.renderResponse = renderResponse
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseRestfulApiResponseFlusher ? X : never} T, X
   * @param {BaseRestfulApiResponseFlusherParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    expressResponse,
    renderResponse,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        expressResponse,
        renderResponse,
      })
    )
  }

  /**
   * get: Headers of the response.
   *
   * @returns {Record<string, string>} - Headers of the response.
   * @throws {Error} - If the headers are not defined.
   */
  static get headers () {
    return {
      'Content-Type': this.contentType,
    }
  }

  /**
   * get: Content type of the response.
   *
   * @abstract
   * @returns {string} - Content type of the response.
   * @throws {Error} - If the content type is not defined.
   */
  static get contentType () {
    throw ConcreteMemberNotFoundRestfulApiError.create({
      value: {
        memberName: 'BaseRestfulApiResponseFlusher.get:contentType',
      },
    })
  }

  /**
   * get: Flusher constructor.
   *
   * @returns {RestfulApiType.ResponseFlusherCtor} - Flusher constructor.
   */
  get Ctor () {
    return /** @type {typeof BaseRestfulApiResponseFlusher} */ (this.constructor)
  }

  /**
   * Flush the response.
   *
   * @abstract
   * @throws {Error} - If the response cannot be flushed.
   */
  flushResponse () {
    this.flushStatus()

    this.flushHeaders()

    this.flushResponseBody()
  }

  /**
   * Flush the response status.
   */
  flushStatus () {
    this.expressResponse.status(
      this.renderResponse.status
    )
  }

  /**
   * Flush the response headers.
   *
   * @return {void}
   */
  flushHeaders () {
    const headers = this.collectHeaders()

    this.expressResponse.set(headers)
  }

  /**
   * Collect headers.
   *
   * @returns {Record<string, string>} - Headers of the response.
   */
  collectHeaders () {
    return {
      ...this.Ctor.headers,
      ...this.renderResponse.headers,
    }
  }

  /**
   * Flush the response body.
   *
   * @abstract
   * @throws {Error} - If the response body cannot be flushed.
   */
  flushResponseBody () {
    throw ConcreteMemberNotFoundRestfulApiError.create({
      value: {
        memberName: 'BaseRestfulApiResponseFlusher#flushResponseBody()',
      },
    })
  }
}

/**
 * @typedef {{
 *   expressResponse: ExpressType.Response
 *   renderResponse: RestfulApiType.RenderResponse
 * }} BaseRestfulApiResponseFlusherParams
 */
