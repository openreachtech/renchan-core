import {
  DatabaseError,
} from 'sequelize'

import RenchanGraphqlError from './errors/RenchanGraphqlError.js'
import ConcreteMemberNotFoundGraphqlError from './errors/concretes/ConcreteMemberNotFoundGraphqlError.js'

/**
 * Base class for Renchan server engine.
 *
 * @abstract
 */
export default class BaseGraphqlServerEngine {
  /**
   * Constructor.
   *
   * @param {BaseGraphqlServerEngineParams} params - Parameters of this constructor.
   */
  constructor ({
    config,
    share,
    errorHash,
  }) {
    this.config = config
    this.share = share
    this.errorHash = errorHash
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseGraphqlServerEngine ? X : never} T, X
   * @param {BaseGraphqlServerEngineFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    config = this.config,
    share,
    errorHash = this.buildErrorHash(),
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        config,
        share,
        errorHash,
      })
    )
  }

  /**
   * Create method as async.
   *
   * @template {X extends typeof BaseGraphqlServerEngine ? X : never} T, X
   * @param {BaseGraphqlServerEngineAsyncFactoryParams} [params] - Parameters of this factory method.
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
   * @returns {GraphqlType.Config} - Config.
   * @throws {Error} - An instance of ConcreteMemberNotFoundGraphqlError.
   */
  static get config () {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseGraphqlServerEngine.get:config',
      },
    })
  }

  /**
   * get: Standard error code hash.
   *
   * @abstract
   * @returns {{
   *   Unknown: string
   *   ConcreteMemberNotFound: string
   *   Unauthenticated: string
   *   Unauthorized: string
   *   DeniedSchemaPermission: string
   *   Database: string
   *   [errorName: string]: string
   * }} - Standard error code hash.
   * @throws {Error} - An instance of ConcreteMemberNotFoundGraphqlError.
   * @example
   * ```javascript
   * return {
   *   Unknown: '100.X000.001',
   *   ConcreteMemberNotFound: '101.X000.001',
   *   Unauthenticated: '102.X000.001',
   *   Unauthorized: '102.X000.002',
   *   DeniedSchemaPermission: '102.X000.003',
   *   Database: '104.X000.001',
   * }
   */
  static get standardErrorCodeHash () {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseGraphqlServerEngine.get:standardErrorCodeHash',
      },
    })
  }

  /**
   * Build error hash.
   *
   * @param {{
   *   errorCodeHash?: Record<string, string>
   * }} [params] - Parameters.
   * @returns {Record<string, typeof RenchanGraphqlError>} - Error hash.
   */
  static buildErrorHash ({
    errorCodeHash = this.standardErrorCodeHash,
  } = {}) {
    return Object.fromEntries(
      Object.entries(errorCodeHash)
        .map(([errorName, code]) => [
          errorName,
          RenchanGraphqlError.declareGraphqlError({
            code,
          }),
        ])
    )
  }

  /**
   * get: Share.
   *
   * @abstract
   * @returns {GraphqlType.ShareCtor} - Share.
   * @throws {Error} - An instance of ConcreteMemberNotFoundGraphqlError.
   */
  static get Share () {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseGraphqlServerEngine.get:Share',
      },
    })
  }

  /**
   * get: Context.
   *
   * @abstract
   * @returns {GraphqlType.ContextCtor} - Context.
   * @throws {Error} - An instance of ConcreteMemberNotFoundGraphqlError.
   */
  static get Context () {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseGraphqlServerEngine.get:Context',
      },
    })
  }

  /**
   * get: Constructor.
   *
   * @template {X extends typeof BaseGraphqlServerEngine ? X : never} T, X
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
   * @throws {Error} - An instance of ConcreteMemberNotFoundGraphqlError.
   */
  collectMiddleware () {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseGraphqlServerEngine#collectMiddleware()',
      },
    })
  }

  /**
   * get: Schemas to skip filtering.
   *
   * @returns {Array<string>} - Schemas to skip filtering.
   */
  get schemasToSkipFiltering () {
    return []
  }

  /**
   * Generate filter handler.
   *
   * @abstract
   * @returns {(args: {
   *   variables: GraphqlType.ResolverInputVariables
   *   context: GraphqlType.Context
   *   information: GraphqlType.ResolverInputInformation
   *   parent: GraphqlType.ResolverInputParent
   * }) => Promise<*>} - Filter handler.
   * @throws {Error} - An instance of ConcreteMemberNotFoundGraphqlError.
   */
  generateFilterHandler () {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseGraphqlServerEngine#generateFilterHandler()',
      },
    })
  }

  /**
   * Define on resolved hook.
   *
   * @returns {(parcel: GraphqlType.OnResolvedParcel<*, *, *>) => Promise<void>} - On resolved hook.
   */
  defineOnResolved () {
    return async parcel => {}
  }

  /**
   * get: Visa issuer callbacks.
   *
   * @returns {GraphqlType.Engine.visaIssuers} - Visa issuer.
   */
  get visaIssuers () {
    return {}
  }

  /**
   * Collect exception catching map entries.
   *
   * @returns {Array<GraphqlType.ExceptionCatchingMapEntry>} - Exception catching map entries.
   */
  collectExceptionCatchingMapEntries () {
    if (this.passesThoughError()) {
      return []
    }

    return [
      [
        error => error instanceof ConcreteMemberNotFoundGraphqlError,
        error => this.errorHash.ConcreteMemberNotFound.create({
          options: {
            cause: {
              originalError: error,
            },
          },
        }),
      ],
      [
        error => error instanceof RenchanGraphqlError,
        error => error,
      ],
      [
        error => error instanceof DatabaseError,
        error => this.errorHash.Database.create({
          options: {
            cause: {
              originalError: error,
            },
          },
        }),
      ],
      [
        error => true,
        error => this.errorHash.Unknown.create({
          options: {
            cause: {
              originalError: error,
            },
          },
        }),
      ],
    ]
  }

  /**
   * Pass through error on not-production.
   *
   * @returns {boolean} - true if pass through error.
   */
  passesThoughError () {
    return this.env.isPreProduction()
  }

  /**
   * Collect scalar classes.
   *
   * @returns {Promise<Array<GraphqlType.CustomScalarCtor>>} - Array of scalar classes.
   */
  async collectScalars () {
    return []
  }
}

/**
 * @typedef {{
 *   config: GraphqlType.Config
 *   share: GraphqlType.Share
 *   errorHash: Record<string, typeof RenchanGraphqlError>
 * }} BaseGraphqlServerEngineParams
 */

/**
 * @typedef {{
 *   config?: GraphqlType.Config
 *   share: GraphqlType.Share
 *   errorHash?: Record<string, typeof RenchanGraphqlError>
 * }} BaseGraphqlServerEngineFactoryParams
 */

/**
 * @typedef {{
 *   config?: GraphqlType.Config,
 * }} BaseGraphqlServerEngineAsyncFactoryParams
 */
