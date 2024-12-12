import RenchanEnv from '@openreachtech/renchan-env'

const {
  EnvironmentFacade,
} = RenchanEnv

/**
 * Base Class of RestfulApi shared object.
 *
 * @abstract
 */
export default class BaseRestfulApiShare {
  /**
   * Constructor.
   *
   * @param {BaseRestfulApiShareParams} params - Parameters of this constructor.
   */
  constructor ({
    env,
  }) {
    this.env = env
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseRestfulApiShare ? X : never} T, X
   * @param {BaseRestfulApiShareFactoryParams} [params] - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    env = this.generateEnv(),
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        env,
      })
    )
  }

  /**
   * Create method as async.
   *
   * @template {X extends typeof BaseRestfulApiShare ? X : never} T, X
   * @param {BaseRestfulApiShareAsyncFactoryParams} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    config,
  }) {
    return this.create()
  }

  /**
   * Generate environment.
   *
   * @returns {renchan.RenchanEnv} - Environment.
   */
  static generateEnv () {
    return EnvironmentFacade.create()
      .generateFacade()
  }
}

/**
 * @typedef {{
 *   env: renchan.RenchanEnv
 * }} BaseRestfulApiShareParams
 */

/**
 * @typedef {{
 *   env?: renchan.RenchanEnv
 * }} BaseRestfulApiShareFactoryParams
 */

/**
 * @typedef {{
 *   config: RestfulApiType.Config
 * }} BaseRestfulApiShareAsyncFactoryParams
 */
