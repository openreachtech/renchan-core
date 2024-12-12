/**
 * GraphQL Context Visa.
 */
export default class GraphqlVisa {
  /**
   * Constructor.
   *
   * @param {GraphqlVisaParams} params - Parameters.
   */
  constructor ({
    hasAuthenticated,
    hasAuthorized,
    schemaPermissionHash,
  }) {
    this.hasAuthenticated = hasAuthenticated
    this.hasAuthorized = hasAuthorized
    this.schemaPermissionHash = schemaPermissionHash
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof GraphqlVisa ? X : never} T, X
   * @param {GraphqlVisaFactoryParams} params - Parameters.
   * @returns {InstanceType<T>} - Instance of this class.
   * @this {T}
   */
  static create ({
    hasAuthenticated = false,
    hasAuthorized = true,
    schemaPermissionHash = null,
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        hasAuthenticated,
        hasAuthorized,
        schemaPermissionHash,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof GraphqlVisa ? X : never} T, X
   * @param {{
   *   expressRequest: ExpressType.Request
   *   engine: GraphqlType.ServerEngine
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
      generateSchemaPermissionHash: generateSchemaPermissionHashHook = async () => null,
    } = engine.visaIssuers

    const args = {
      expressRequest,
      userEntity,
      engine,
    }

    const hasAuthenticated = await hasAuthenticatedHook(args)
    const hasAuthorized = await hasAuthorizedHook(args)
    const schemaPermissionHash = await generateSchemaPermissionHashHook(args)

    return this.create({
      hasAuthenticated,
      hasAuthorized,
      schemaPermissionHash,
    })
  }

  /**
   * get: can resolve.
   *
   * @param {{
   *   schema: string
   * }} params - Parameters.
   * @returns {boolean} - true: has.
   */
  canResolve ({
    schema,
  }) {
    return this.hasAuthenticated
      && this.hasAuthorized
      && this.hasSchemaPermission({
        schema,
      })
  }

  /**
   * Has permission.
   *
   * @param {{
   *   schema: string
   * }} params - Parameters.
   * @returns {boolean} - true: has.
   */
  hasSchemaPermission ({
    schema,
  }) {
    if (!this.schemaPermissionHash) {
      return true
    }

    return this.schemaPermissionHash
      ?.[schema]
      ?? false
  }
}

/**
 * @typedef {{
 *   hasAuthenticated: boolean
 *   hasAuthorized: boolean
 *   schemaPermissionHash: GraphqlType.SchemaPermissionHash | null
 * }} GraphqlVisaParams
 */

/**
 * @typedef {{
 *   hasAuthenticated?: boolean
 *   hasAuthorized?: boolean
 *   schemaPermissionHash?: GraphqlType.SchemaPermissionHash | null
 * }} GraphqlVisaFactoryParams
 */
