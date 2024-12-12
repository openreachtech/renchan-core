/**
 * RestfulApi Context Visa.
 */
export default class RestfulApiVisa {
  /**
   * Constructor.
   *
   * @param {RestfulApiVisaParams} params - Parameters.
   */
  constructor ({
    hasAuthenticated,
    hasAuthorized,
    hasPathPermission,
  }) {
    this.hasAuthenticated = hasAuthenticated
    this.hasAuthorized = hasAuthorized
    this.hasPathPermission = hasPathPermission
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof RestfulApiVisa ? X : never} T, X
   * @param {RestfulApiVisaFactoryParams} [params] - Parameters.
   * @returns {InstanceType<T>} - Instance of this class.
   * @this {T}
   */
  static create ({
    hasAuthenticated = false,
    hasAuthorized = true,
    hasPathPermission = true,
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        hasAuthenticated,
        hasAuthorized,
        hasPathPermission,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof RestfulApiVisa ? X : never} T, X
   * @param {{
   *   expressRequest: ExpressType.Request
   *   engine: RestfulApiType.ServerEngine
   *   userEntity: renchan.UserEntity | null
   * }} params - Parameters.
   * @returns {Promise<InstanceType<T>>} - Instance of this class.
   * @this {T}
   */
  static async createAsync ({
    expressRequest,
    engine,
    userEntity,
  }) {
    const {
      hasAuthenticated: hasAuthenticatedHook = async ({ userEntity: user }) => user !== null,
      hasAuthorized: hasAuthorizedHook = async () => true,
      hasPathPermission: hasPathPermissionHook = async () => true,
    } = engine.visaIssuers

    const args = {
      expressRequest,
      userEntity,
      engine,
    }

    const hasAuthenticated = await hasAuthenticatedHook(args)
    const hasAuthorized = await hasAuthorizedHook(args)
    const hasPathPermission = await hasPathPermissionHook(args)

    return this.create({
      hasAuthenticated,
      hasAuthorized,
      hasPathPermission,
    })
  }

  /**
   * Can renderer.
   *
   * @returns {boolean} - true: has.
   */
  canRender () {
    return this.hasAuthenticated
      && this.hasAuthorized
      && this.hasPathPermission
  }
}

/**
 * @typedef {{
 *   hasAuthenticated: boolean
 *   hasAuthorized: boolean
 *   hasPathPermission: boolean
 * }} RestfulApiVisaParams
 */

/**
 * @typedef {{
 *   hasAuthenticated?: boolean
 *   hasAuthorized?: boolean
 *   hasPathPermission?: boolean
 * }} RestfulApiVisaFactoryParams
 */
