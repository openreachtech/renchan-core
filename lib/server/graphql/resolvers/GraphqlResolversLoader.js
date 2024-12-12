import BaseResolver from './BaseResolver.js'
import DeepBulkClassLoader from '../../../tools/DeepBulkClassLoader.js'

/**
 * Resolver loader.
 */
export default class GraphqlResolversLoader {
  /**
   * Constructor.
   *
   * @param {GraphqlResolversLoaderParams} params - Parameters of this constructor.
   */
  constructor ({
    poolPath,
  }) {
    this.poolPath = poolPath
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof GraphqlResolversLoader ? X : never} T, X
   * @param {GraphqlResolversLoaderParams} options - Options of this constructor.
   * @returns {InstanceType<T>} - Instance of this class.
   * @this {T}
   */
  static create (options) {
    return /** @type {InstanceType<T>} */ (
      new this(options)
    )
  }

  /**
   * Load resolvers.
   *
   * @param {{
   *   poolPath?: string
   * }} [params] - Parameters.
   * @returns {Promise<Array<typeof BaseResolver>>} - Array of BaseResolver derived class.
   * @throws {Error} - no such file or directory, scandir <full path of directoryName>
   */
  async loadResolvers ({
    poolPath = this.poolPath,
  } = {}) {
    return /** @type {Promise<Array<typeof BaseResolver>>} */ (
      DeepBulkClassLoader.create({
        poolPath,
      })
        .loadClasses({
          filterFunc: it => it.prototype instanceof BaseResolver,
        })
    )
  }
}

/**
 * @typedef {{
 *   poolPath: string
 * }} GraphqlResolversLoaderParams
 */
