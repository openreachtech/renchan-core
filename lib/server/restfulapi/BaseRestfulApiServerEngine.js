import ConcreteMemberNotFoundRestfulApiError from './errors/concretes/ConcreteMemberNotFoundRestfulApiError.js'
import RestfulApiResponse from './interfaces/RestfulApiResponse.js'

/**
 * Base class for Restful API server engine.
 *
 * @abstract
 */
export default class BaseRestfulApiServerEngine {
  /**
   * Constructor.
   *
   * @param {BaseRestfulApiServerEngineParams} params - Parameters of this constructor.
   */
  constructor ({
    config,
    share,
    errorResponseHash,
  }) {
    this.config = config
    this.share = share
    this.errorResponseHash = errorResponseHash
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseRestfulApiServerEngine ? X : never} T, X
   * @param {BaseRestfulApiServerEngineFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    config = this.config,
    share,
    errorResponseHash = this.buildErrorResponseHash(),
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        config,
        share,
        errorResponseHash,
      })
    )
  }

  /**
   * Create method as async.
   *
   * @template {X extends typeof BaseRestfulApiServerEngine ? X : never} T, X
   * @param {BaseRestfulApiServerEngineAsyncFactoryParams} [params] - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    config = this.config,
  } = {}) {
    const share = await this.Share.createAsync({
      config,
    })

    return this.create({
      config,
      share,
    })
  }

  /**
   * get: Config.
   *
   * @abstract
   * @returns {RestfulApiType.Config} - Config.
   * @throws {Error} - An instance of ConcreteMemberNotFoundRestfulApiError.
   */
  static get config () {
    throw ConcreteMemberNotFoundRestfulApiError.create({
      value: {
        memberName: 'BaseRestfulApiServerEngine.get:config',
      },
    })
  }

  /**
   * get: Standard error code hash.
   *
   * @abstract
   * @returns {{
   *   Unknown: RestfulApiType.ErrorResponseEnvelope
   *   ConcreteMemberNotFound: RestfulApiType.ErrorResponseEnvelope
   *   Unauthenticated: RestfulApiType.ErrorResponseEnvelope
   *   Unauthorized: RestfulApiType.ErrorResponseEnvelope
   *   Database: RestfulApiType.ErrorResponseEnvelope
   *   [errorName: string]: RestfulApiType.ErrorResponseEnvelope
   * }} - Standard error code hash.
   * @throws {Error} - An instance of ConcreteMemberNotFoundRestfulApiError.
   * @example
   * ```javascript
   * return {
   *   Unknown: { statusCode: 500, errorMessage: 'Unknown error' },
   *   ConcreteMemberNotFound: { statusCode: 500, errorMessage: 'Unknown error' },
   *   Unauthenticated: { statusCode: 401, errorMessage: 'Unauthorized },
   *   Unauthorized: { statusCode: 401, errorMessage: 'Unauthorized' },
   *   Database: { statusCode: 500, errorMessage: 'Database error' },
   * }
   */
  static get standardErrorEnvelopHash () {
    throw ConcreteMemberNotFoundRestfulApiError.create({
      value: {
        memberName: 'BaseRestfulApiServerEngine.get:standardErrorEnvelopHash',
      },
    })
  }

  /**
   * get: Share.
   *
   * @abstract
   * @returns {RestfulApiType.ShareCtor} - Share.
   * @throws {Error} - An instance of ConcreteMemberNotFoundRestfulApiError.
   */
  static get Share () {
    throw ConcreteMemberNotFoundRestfulApiError.create({
      value: {
        memberName: 'BaseRestfulApiServerEngine.get:Share',
      },
    })
  }

  /**
   * get: Context.
   *
   * @abstract
   * @returns {RestfulApiType.ContextCtor} - Context.
   * @throws {Error} - An instance of ConcreteMemberNotFoundRestfulApiError.
   */
  static get Context () {
    throw ConcreteMemberNotFoundRestfulApiError.create({
      value: {
        memberName: 'BaseRestfulApiServerEngine.get:Context',
      },
    })
  }

  /**
   * Build error response hash.
   *
   * @param {{
   *   errorStructureHash?: Record<string, RestfulApiType.ErrorResponseEnvelope>
   * }} [params] - Parameters.
   * @returns {Record<string, typeof RestfulApiResponse>} - Error hash.
   */
  static buildErrorResponseHash ({
    errorStructureHash = this.standardErrorEnvelopHash,
  } = {}) {
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
   * get: Constructor.
   *
   * @template {X extends typeof BaseRestfulApiServerEngine ? X : never} T, X
   * @returns {T} - Constructor.
   * @this {InstanceType<T>}
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * get: Env.
   *
   * @returns {renchan.RenchanEnv} - Environment handling object.
   */
  get env () {
    return this.share.env
  }

  /**
   * get: NODE_ENV.
   *
   * @returns {string} - Value of NODE_ENV.
   */
  get NODE_ENV () {
    return this.env.NODE_ENV
  }

  /**
   * Collect middleware.
   * NOTE: Since use this.config, this function is instance method.
   *
   * @abstract
   * @returns {Array<ExpressType.Middleware>} Array of Express middleware.
   * @throws {Error} - An instance of ConcreteMemberNotFoundRestfulApiError.
   */
  collectMiddleware () {
    throw ConcreteMemberNotFoundRestfulApiError.create({
      value: {
        memberName: 'BaseRestfulApiServerEngine#collectMiddleware()',
      },
    })
  }

  /**
   * Generate filter handler.
   *
   * @abstract
   * @returns {(args: RestfulApiType.RenderInput<*, *>) => Promise<RestfulApiType.RenderResponse | null>} - Filter handler.
   * @throws {Error} - An instance of ConcreteMemberNotFoundRestfulApiError.
   */
  generateFilterHandler () {
    throw ConcreteMemberNotFoundRestfulApiError.create({
      value: {
        memberName: 'BaseRestfulApiServerEngine#generateFilterHandler()',
      },
    })
  }

  /**
   * get: Visa issuer callbacks.
   *
   * @returns {RestfulApiType.Engine.visaIssuers} - Visa issuer.
   */
  get visaIssuers () {
    return {}
  }

  /**
   * Pass through error on not-production.
   *
   * @returns {boolean} - true if pass through error.
   */
  passesThoughError () {
    return this.env.isPreProduction()
  }
}

/**
 * @typedef {{
 *   config: RestfulApiType.Config
 *   share: RestfulApiType.Share
 *   errorResponseHash: Record<string, RestfulApiType.ErrorResponseCtor>
 * }} BaseRestfulApiServerEngineParams
 */

/**
 * @typedef {{
 *   config?: RestfulApiType.Config
 *   share: RestfulApiType.Share
 *   errorResponseHash?: Record<string, RestfulApiType.ErrorResponseCtor>
 * }} BaseRestfulApiServerEngineFactoryParams
 */

/**
 * @typedef {{
 *   config?: RestfulApiType.Config
 * }} BaseRestfulApiServerEngineAsyncFactoryParams
 */
