import ConcreteMemberNotFoundGraphqlError from '../errors/concretes/ConcreteMemberNotFoundGraphqlError'

/**
 * Base class for GraphQL post workers.
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
   * @template {X extends typeof BaseGraphqlPostWorker ? X : never} T, X
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
   * @template {X extends typeof BaseGraphqlPostWorker ? X : never} T, X
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
   * @abstract
   * @returns {typeof BaseGraphqlPostWorker} - Constructor of this class.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
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
