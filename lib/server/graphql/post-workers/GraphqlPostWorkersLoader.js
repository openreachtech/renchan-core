import DeepBulkClassLoader from '../../../tools/DeepBulkClassLoader.js'

import BaseGraphqlPostWorker from './BaseGraphqlPostWorker.js'

/**
 * Resolver loader.
 */
export default class GraphqlPostWorkersLoader {
  /**
   * Constructor.
   *
   * @param {GraphqlPostWorkersLoaderParams} params - Parameters of this constructor.
   */
  constructor ({
    poolPath,
  }) {
    this.poolPath = poolPath
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof GraphqlPostWorkersLoader ? X : never} T, X
   * @param {GraphqlPostWorkersLoaderParams} options - Options of this constructor.
   * @returns {InstanceType<T>} - Instance of this class.
   * @this {T}
   */
  static create (options) {
    return /** @type {InstanceType<T>} */ (
      new this(options)
    )
  }

  /**
   * Load post workers.
   *
   * @param {{
   *   poolPath?: string
   * }} [params] - Parameters.
   * @returns {Promise<Array<typeof BaseGraphqlPostWorker>>} - Array of BaseGraphqlPostWorker derived class.
   * @throws {Error} - no such file or directory, scandir <full path of directoryName>
   */
  async loadPostWorkers ({
    poolPath = this.poolPath,
  } = {}) {
    return /** @type {Promise<Array<typeof BaseGraphqlPostWorker>>} */ (
      DeepBulkClassLoader.create({
        poolPath,
      })
        .loadClasses({
          filterFunc: it => it.prototype instanceof BaseGraphqlPostWorker,
        })
    )
  }
}

/**
 * @typedef {{
 *   poolPath: string
 * }} GraphqlPostWorkersLoaderParams
 */
