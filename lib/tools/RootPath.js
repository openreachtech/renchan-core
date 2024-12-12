import path from 'path'

/**
 * @class Path resolver.
 */
export default class RootPath {
  /**
   * Constructor of this class.
   *
   * @param {PathResolverParams} params
   */
  constructor ({
    base,
  }) {
    this.base = base
  }

  /**
   * Factory method to create an instance of this class.
   *
   * @template {X extends typeof RootPath ? X : never} T, X
   * @param {PathResolverFactoryParams} [params] - Parameters to create an instance of this class.
   * @returns {InstanceType<T>}
   * @throws {Error} - When the project root is not correct.
   * @this {T}
   */
  static create ({
    base = process.cwd(),
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        base,
      })
    )
  }

  /**
   * Resolve the path with the base path.
   *
   * @param {string} targetPath - The path to resolve.
   * @returns {string} - The resolved path.
   */
  to (targetPath) {
    return path.resolve(
      this.base,
      targetPath
    )
  }
}

/**
 * @typedef {{
 *   base: string
 * }} PathResolverParams
 */

/**
 * @typedef {{
 *   base?: string
 * }} PathResolverFactoryParams
 */
