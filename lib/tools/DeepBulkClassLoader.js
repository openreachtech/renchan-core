import fs from 'fs'
import path from 'path'

/**
 * Deep bulk class loader.
 */
export default class DeepBulkClassLoader {
  /**
   * Constructor.
   *
   * @param {DeepBulkClassLoaderParams} params - Parameters of this constructor.
   */
  constructor ({
    poolPath,
  }) {
    this.poolPath = poolPath
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof DeepBulkClassLoader ? X : never} T, X
   * @param {DeepBulkClassLoaderFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    poolPath,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        poolPath,
      })
    )
  }

  /**
   * Load classes.
   *
   * @param {{
   *   poolPath?: string
   *   filterFunc?: (it: *) => boolean
   *   mapFunc?: (it: *) => *
   * }} [params] - Parameters of this method.
   * @returns {Promise<Array<Function>>} - Array of classes.
   * @public
   */
  async loadClasses ({
    poolPath = this.poolPath,
    filterFunc = it => true,
    mapFunc = it => it,
  } = {}) {
    const filenames = this.loadFileNames({
      poolPath,
    })

    const loaded = await filenames
      .reduce(
        async (chain, it) =>
          chain.then(async pool => {
            const exported = await import(it)

            return pool.concat(
              exported
            )
          })
        ,
        Promise.resolve([])
      )

    return loaded
      .map(it => it.default)
      .filter(it => it instanceof Function)
      .filter(it => filterFunc(it))
      .map(it => mapFunc(it))
  }

  /**
   * Load file names.
   *
   * @param {{
   *   poolPath?: string
   * }} [params] - Parameters of this method.
   * @returns {Array<string>} - Array of file names.
   */
  loadFileNames ({
    poolPath = this.poolPath,
  } = {}) {
    const filterHandler = this.generateFilterHandler()

    return fs
      .readdirSync(poolPath)
      .filter(it => !it.startsWith('.'))
      .map(it => path.join(
        poolPath,
        it
      ))
      .flatMap(it =>
        (fs.statSync(it)
          .isDirectory()
          ? this.loadFileNames({
            poolPath: it,
          })
          : it
        )
      )
      .filter(it => filterHandler(it))
  }

  /**
   * Generate filter handler.
   *
   * @returns {(filename: string) => boolean} - Filter handler.
   */
  generateFilterHandler () {
    return filename =>
      /\.[cm]?js$/u
        .test(filename)
  }
}

/**
 * @typedef {{
 *   poolPath: string
 * }} DeepBulkClassLoaderParams
 */

/**
 * @typedef {{
 *   poolPath: string
 * }} DeepBulkClassLoaderFactoryParams
 */
