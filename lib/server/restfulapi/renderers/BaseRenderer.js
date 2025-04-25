import ConcreteMemberNotFoundRestfulApiError from '../errors/concretes/ConcreteMemberNotFoundRestfulApiError.js'
import JsonRestfulApiResponseFlusher from '../flushers/concretes/JsonRestfulApiResponseFlusher.js'
import RestfulApiResponse from '../interfaces/RestfulApiResponse.js'

/**
 * Base RESTful API Renderer.
 *
 * @template {RestfulApiType.RenderRequestBody} B - POST Body.
 * @template {RestfulApiType.RenderRequestQuery} Q - GET Query.
 * @abstract
 */
export default class BaseRenderer {
  /**
   * Constructor.
   *
   * @param {BaseRendererParams} params - Parameters.
   */
  constructor ({
    errorResponseHash,
  }) {
    /*
     * NOTE:
     * Responses should be returned as instances of RestfulApiResponse.
     * Instead of directly throwing error instances, always return responses generated with `#errorResponseHash.Xxx.create()`.
     * This is because Errors always require a status code.
     *
     * In GraphQL resolvers, the #errorHash only contains error codes as values.
     * In contrast, RESTful API renderers include both error codes and status codes in #errorHash.
     *
     * {
     *   InvalidArgument: {
     *     statusCode: 401,
     *     errorMessage: 'Invalid username or password', // → { error: { message } }
     *   },
     *   InvalidArgument: {
     *     statusCode: 403,
     *     errorMessage: 'Has no permission', // → { error: { message } }
     *   },
     * }
     */
    this.errorResponseHash = errorResponseHash
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseRenderer ? X : never} T, X
   * @param {BaseRendererFactoryParams} [params] - Parameters.
   * @returns {InstanceType<T>} - Instance of this class.
   * @this {T}
   */
  static create ({
    errorStructureHash = this.errorStructureHash,
  } = {}) {
    const errorResponseHash = this.buildErrorResponseHash({
      errorStructureHash,
    })

    return /** @type {*} */ (
      new this({
        errorResponseHash,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof BaseRenderer ? X : never} T, X
   * @returns {Promise<InstanceType<T>>} - Instance of this class.
   * @this {T}
   */
  static async createAsync () {
    return this.create()
  }

  /**
   * get: Error code hash.
   *
   * @returns {Record<string, RestfulApiType.ErrorResponseEnvelope>} - Error code hash.
   * @example
   * ```js
   * static get errorStructureHash () {
   *   return {
   *     badRequest: {
   *        statusCode: 400,
   *        message: 'Bad Request',
   *     },
   *     unauthorized: {
   *        statusCode: 401,
   *        message: 'Unauthorized',
   *     },
   *     paymentRequired: {
   *        statusCode: 402,
   *        message: 'Payment Required',
   *     },
   *     ...
   *   }
   * }
   * ```
   */
  static get errorStructureHash () {
    return {}
  }

  /**
   * Build error hash.
   *
   * @param {{
   *   errorStructureHash: Record<string, RestfulApiType.ErrorResponseEnvelope>
   * }} params - Parameters.
   * @returns {Record<string, typeof RestfulApiResponse>} - Error hash.
   */
  static buildErrorResponseHash ({
    errorStructureHash,
  }) {
    return Object.fromEntries(
      Object.entries(errorStructureHash)
        .map(([errorName, errorEnvelope]) => [
          errorName,
          RestfulApiResponse.declareErrorRestfulApiResponse({
            errorEnvelope,
          }),
        ])
    )
  }

  /**
   * get: HTTP method.
   *
   * @abstract
   * @returns {ExpressType.HttpMethod} - HTTP method.
   * @throws {Error} - concrete member not found.
   */
  static get method () {
    throw ConcreteMemberNotFoundRestfulApiError.create({
      value: {
        memberName: 'BaseRenderer.get:method',
      },
    })
  }

  /**
   * Getter: Name of the route path.
   *
   * @abstract
   * @returns {string} - Route path.
   * @throws {Error} - concrete member not found.
   */
  static get routePath () {
    throw ConcreteMemberNotFoundRestfulApiError.create({
      value: {
        memberName: 'BaseRenderer.get:routePath',
      },
    })
  }

  /**
   * get: Flusher constructor.
   *
   * @returns {RestfulApiType.ResponseFlusherCtor} - Flusher constructor.
   */
  static get FlusherCtor () {
    return JsonRestfulApiResponseFlusher
  }

  /**
   * Render for the route path.
   *
   * @param {{
   *   expressResponse: ExpressType.Response
   *   renderResponse: RestfulApiType.RenderResponse
   * }} params - Parameters.
   * @returns {RestfulApiType.ResponseFlusher} - Response of Renderer.
   */
  static createResponseFlusher ({
    expressResponse,
    renderResponse,
  }) {
    return this.FlusherCtor.create({
      expressResponse,
      renderResponse,
    })
  }

  /**
   * get: Constructor.
   *
   * @template {X extends typeof BaseRenderer ? X : never} T, X
   * @returns {T} - Constructor.
   */
  get Ctor () {
    return /** @type {T} */ (this.constructor)
  }

  /**
   * get: HTTP method.
   *
   * @returns {ExpressType.HttpMethod} - HTTP method.
   */
  get method () {
    return this.Ctor.method
  }

  /**
   * get: A route path of Express route.
   *
   * @returns {string} - Route path.
   * @throws {Error} - this function must be inherited
   */
  get routePath () {
    return this.Ctor.routePath
  }

  /**
   * get: Error hash.
   *
   * @returns {Record<string, RestfulApiType.ErrorResponseCtor>} - Error hash.
   */
  get Error () {
    return this.errorResponseHash
  }

  /**
   * get: Passes filter.
   *
   * @returns {boolean} - true: Passes filter.
   */
  get passesFilter () {
    return false
  }

  /**
   * Render for the route path.
   *
   * @abstract
   * @param {RestfulApiType.RenderInput<B, Q>} params - Parameters.
   * @returns {Promise<RestfulApiType.RenderResponse>} - Response of Renderer.
   * @throws {RenchanRestfulApiError} - RESTful API error.
   */
  async render ({
    body,
    query,
    context, // has now, share.env
    request, // has req, res, next
  }) {
    throw ConcreteMemberNotFoundRestfulApiError.create({
      value: {
        memberName: 'BaseRenderer#render()',
      },
    })
  }

  /**
   * Render for the route path.
   *
   * @param {{
   *   expressResponse: ExpressType.Response
   *   renderResponse: RestfulApiType.RenderResponse
   * }} params - Parameters.
   */
  async flushResponse ({
    expressResponse,
    renderResponse,
  }) {
    const flusher = this.Ctor.createResponseFlusher({
      expressResponse,
      renderResponse,
    })

    flusher.flushResponse()
  }
}

/**
 * @typedef {{
 *   errorResponseHash: Record<string, RestfulApiType.ErrorResponseCtor>
 * }} BaseRendererParams
 */

/**
 * @typedef {{
 *   errorStructureHash?: Record<string, RestfulApiType.ErrorResponseEnvelope>
 * }} BaseRendererFactoryParams
 */
