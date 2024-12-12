import ConcreteMemberNotFoundGraphqlError from '../errors/concretes/ConcreteMemberNotFoundGraphqlError.js'
import RenchanGraphqlError from '../errors/RenchanGraphqlError.js'

/**
 * Base Graphql Resolver.
 *
 * @template {GraphqlType.ResolverInputVariables} V
 * @template {GraphqlType.ResolverOutput} R
 * @abstract
 */
export default class BaseResolver {
  /**
   * Constructor.
   *
   * @param {BaseResolverParams} params - Parameters.
   */
  constructor ({
    errorHash,
  }) {
    this.errorHash = errorHash
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseResolver ? X : never} T, X
   * @param {BaseResolverFactoryParams} [params] - Parameters.
   * @returns {InstanceType<T>} - Instance of this class.
   * @this {T}
   */
  static create ({
    errorCodeHash = this.errorCodeHash,
  } = {}) {
    const errorHash = this.buildErrorHash({
      errorCodeHash,
    })

    return /** @type {*} */ (
      new this({
        errorHash,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof BaseResolver ? X : never} T, X
   * @returns {Promise<InstanceType<T>>} - Instance of this class.
   * @this {T}
   */
  static async createAsync () {
    return this.create()
  }

  /**
   * get: Name of the operation.
   *
   * @abstract
   * @returns {string} - Operation name.
   * @throws {Error} - concrete member not found.
   */
  static get operation () {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseResolver.get:operation',
      },
    })
  }

  /**
   * Getter: Name of the schema to be resolved by the resolver
   *
   * @returns {string} - Resolver name.
   * @throws {Error} - concrete member not found.
   */
  static get schema () {
    const extractedSchema = this.extractSchemaFromClassName()

    if (extractedSchema === 'base') {
      throw ConcreteMemberNotFoundGraphqlError.create({
        value: {
          memberName: 'BaseResolver.get:schema',
        },
      })
    }

    return extractedSchema
  }

  /**
   * Extract schema from class name.
   *
   * @returns {string} - Schema name.
   */
  static extractSchemaFromClassName () {
    return this.name
      .replace(/(?:Query|Mutation|Subscription)?(?:Graphql)?Resolver$/ug, '')
      .replace(/^./u,
        this.name
          .charAt(0)
          .toLowerCase()
      )
  }

  /**
   * get: Error code hash.
   *
   * @returns {Record<string, string>} - Error code hash.
   */
  static get errorCodeHash () {
    return {}
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
    errorCodeHash = this.errorCodeHash,
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
   * get: Constructor.
   *
   * @template {X extends typeof BaseResolver ? X : never} T, X
   * @returns {T} - Constructor.
   */
  get Ctor () {
    return /** @type {T} */ (this.constructor)
  }

  /**
   * Getter: Name of the schema to be resolved by the resolver
   *
   * @returns {string} - Resolver name.
   * @throws {Error} - this function must be inherited
   */
  get operation () {
    return this.Ctor.operation
  }

  /**
   * get: Name of the schema to be resolved by the resolver
   *
   * @returns {string} - Resolver name.
   * @throws {Error} - this function must be inherited
   */
  get schema () {
    return this.Ctor.schema
  }

  /**
   * get: Now.
   *
   * @returns {Date} - Current Date instance.
   */
  get now () {
    return new Date()
  }

  /**
   * get: Error hash.
   *
   * @returns {Record<string, typeof RenchanGraphqlError>} - Error hash.
   */
  get Error () {
    return this.errorHash
  }

  /**
   * Resolve the schema.
   *
   * @abstract
   * @param {GraphqlType.ResolverInput<V>} params - Parameters.
   * @returns {Promise<R>} - GraphQL Resolver output.
   * @throws {Error} - concrete member not found.
   * @throws {GraphqlType.Error} - Resolver error.
   */
  async resolve ({
    variables,
    context,
    information,
    parent,
  }) {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseResolver#resolve()',
      },
    })
  }
}

/**
 * @typedef {{
 *   errorHash: Record<string, typeof RenchanGraphqlError>
 * }} BaseResolverParams
 */

/**
 * @typedef {{
 *   errorCodeHash?: Record<string, string>
 * }} BaseResolverFactoryParams
 */
