import ConcreteMemberNotFoundGraphqlError from '../errors/concretes/ConcreteMemberNotFoundGraphqlError'

/**
 * Base class for GraphQL post workers.
 *
 * @template {GraphqlType.ResolverInputVariables} V - Variables
 * @template {GraphqlType.ResolverInputContext} C - Context
 * @template {GraphqlType.ResolverOutput} O - Response on success
 */
export default class BaseGraphqlPostWorker {
  /**
   * Constructor.
   *
   * @param {BaseGraphqlPostWorkerParams} params - Parameters of this constructor.
   */
  constructor ({
    engine,
  }) {
    this.engine = engine
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseGraphqlPostWorker<*, *, *> ? X : never} T, X
   * @param {BaseGraphqlPostWorkerFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    engine,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        engine,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof BaseGraphqlPostWorker<*, *, *> ? X : never} T, X
   * @param {BaseGraphqlPostWorkerAsyncFactoryParams} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    engine,
  }) {
    return this.create({
      engine,
    })
  }

  /**
   * get: Name of the operation.
   *
   * @abstract
   * @returns {string} - Operation name.
   * @throws {ConcreteMemberNotFoundGraphqlError} - If this method is not implemented.
   */
  static get schema () {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseGraphqlPostWorker.get:schema',
      },
    })
  }

  /**
   * get: Constructor.
   *
   * @returns {typeof BaseGraphqlPostWorker} - Constructor of this class.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * On resolved hook.
   *
   * @abstract
   * @param {{
   *   variables: V
   *   context: C
   *   information: GraphqlType.ResolverInputInformation
   *   response: {
   *     output: O | null
   *     error: Error | null
   *   }
   * }} params - Parameters.
   * @returns {Promise<void>}
   * @throws {ConcreteMemberNotFoundGraphqlError} - If this method is not implemented.
   */
  async onResolved ({
    variables,
    context,
    information,
    response: {
      output,
      error,
    },
  }) {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseGraphqlPostWorker#onResolved()',
      },
    })
  }
}

/**
 * @typedef {{
 *   engine: GraphqlType.ServerEngine
 * }} BaseGraphqlPostWorkerParams
 */

/**
 * @typedef {BaseGraphqlPostWorkerParams} BaseGraphqlPostWorkerFactoryParams
 */

/**
 * @typedef {BaseGraphqlPostWorkerFactoryParams} BaseGraphqlPostWorkerAsyncFactoryParams
 */
