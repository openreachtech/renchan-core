import GraphqlVisa from './GraphqlVisa.js'

/**
 * Base Graphql Context.
 *
 * @abstract
 */
export default class BaseGraphqlContext {
  /**
   * Constructor.
   *
   * @param {BaseGraphqlContextParams} params - Parameters.
   */
  constructor ({
    expressRequest,
    requestParams,
    engine,
    userEntity,
    visa,
    requestedAt,
    uuid,
  }) {
    this.expressRequest = expressRequest
    this.requestParams = requestParams
    this.engine = engine
    this.userEntity = userEntity
    this.visa = visa

    this.requestedAt = requestedAt
    this.uuid = uuid
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseGraphqlContext ? X : never} T, X
   * @param {BaseGraphqlContextFactoryParams} params - Parameters.
   * @returns {InstanceType<T>} - Instance of this class.
   * @this {T}
   */
  static create ({
    expressRequest,
    requestParams,
    engine,
    userEntity,
    visa,
    requestedAt = new Date(),
    uuid = this.generateUuid(),
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        expressRequest,
        requestParams,
        engine,
        userEntity,
        visa,
        requestedAt,
        uuid,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof BaseGraphqlContext ? X : never} T, X
   * @param {BaseGraphqlContextAsyncFactoryParams} params - Parameters.
   * @returns {Promise<InstanceType<T>>} - Instance of this class.
   * @this {T}
   */
  static async createAsync ({
    expressRequest,
    requestParams,
    engine,
    requestedAt = new Date(),
  }) {
    const accessToken = this.extractAccessToken({
      expressRequest,
      requestParams,
    })
    const userEntity = await this.findUser({
      expressRequest,
      accessToken,
      requestedAt,
    })
    const visa = await this.createVisa({
      expressRequest,
      engine,
      userEntity,
      requestedAt,
    })

    return this.create({
      expressRequest,
      engine,
      userEntity,
      visa,
      requestedAt,
    })
  }

  /**
   * get: Access token header key.
   *
   * @returns {string} - Access token header key.
   */
  static get ACCESS_TOKEN_HEADER_KEY () {
    return 'x-renchan-access-token'
  }

  /**
   * Extract access token from Express request.
   *
   * @param {{
   *   expressRequest: ExpressType.Request
   *   requestParams: ResolvedRequestParams
   * }} params - Parameters.
   * @returns {string | null} - Access token.
   */
  static extractAccessToken ({
    expressRequest,
    requestParams,
  }) {
    const resolvedHeaders = expressRequest.headers
      ?? this.extractHeadersFromRequestParams({
        requestParams,
      })

    const headerKey = this.ACCESS_TOKEN_HEADER_KEY

    return /** @type {*} */ (resolvedHeaders?.[headerKey])
      ?? null
  }

  /**
   * Extract headers from request params.
   *
   * @param {{
   *   requestParams: {
   *     payload?: {
   *       context?: {
   *         headers?: Record<string, string>
   *       }
   *     }
   *   }
   * }} params - Parameters.
   * @returns {Record<string, string>} - Headers.
   */
  static extractHeadersFromRequestParams ({
    requestParams: {
      payload: {
        context: {
          headers,
        } = {},
      } = {},
    } = {},
  }) {
    return headers ?? {}
  }

  /**
   * get: GraphQL Visa class.
   *
   * @returns {GraphqlType.VisaCtor} - GraphQL Visa class.
   */
  static get Visa () {
    return GraphqlVisa
  }

  /**
   * Find user.
   *
   * @param {{
   *   expressRequest: ExpressType.Request
   *   accessToken: string | null
   *   requestedAt?: Date
   * }} params
   * @returns {Promise<renchan.UserEntity | null>} - User entity.
   */
  static async findUser ({
    expressRequest,
    accessToken,
    requestedAt = new Date(),
  }) {
    return null
  }

  /**
   * Create visa.
   *
   * @param {{
   *   expressRequest: ExpressType.Request
   *   userEntity: renchan.UserEntity | null
   *   engine: GraphqlType.ServerEngine
   *   requestedAt?: Date
   * }} params - Parameters.
   * @returns {Promise<GraphqlType.Visa>} - Visa.
   */
  static async createVisa ({
    expressRequest,
    engine,
    userEntity,
    requestedAt = new Date(),
  }) {
    return this.Visa
      .createAsync({
        expressRequest,
        engine,
        userEntity,
        requestedAt,
      })
  }

  /**
   * Generate UUID.
   *
   * @returns {string} - UUID.
   */
  static generateUuid () {
    return crypto.randomUUID()
  }

  /**
   * get: access token.
   *
   * @template {X extends typeof BaseGraphqlContext ? X : never} T, X
   * @returns {T} - Access token.
   * @this {InstanceType<T>}
   */
  get Ctor () {
    return /** @type {T} */ (this.constructor)
  }

  /**
   * get: access token.
   *
   * @returns {string | null} - Access token.
   */
  get accessToken () {
    return this.Ctor
      .extractAccessToken({
        expressRequest: this.expressRequest,
      })
  }

  /**
   * get: User id.
   *
   * @returns {number | null} - Customer id.
   */
  get userId () {
    return this.userEntity
      ?.id
      ?? null
  }

  /**
   * Can resolve.
   *
   * @param {{
   *   schema: string
   * }} params - Parameters.
   * @returns {boolean} - true: can.
   */
  canResolve ({
    schema,
  }) {
    return this.visa.canResolve({
      schema,
    })
  }

  /**
   * Has authenticated in Visa.
   *
   * @returns {boolean} - true: authenticated.
   */
  hasAuthenticated () {
    return this.visa.hasAuthenticated
  }

  /**
   * Has authorized in Visa.
   *
   * @returns {boolean} - true: authorized.
   */
  hasAuthorized () {
    return this.visa.hasAuthorized
  }

  /**
   * Has schema permission in Visa.
   *
   * @param {{
   *   schema: string
   * }} params - Parameters.
   * @returns {boolean} - true: has.
   */
  hasSchemaPermission ({
    schema,
  }) {
    return this.visa.hasSchemaPermission({
      schema,
    })
  }

  /**
   * get: Share instance.
   *
   * @returns {GraphqlType.Share} - Share instance.
   */
  get share () {
    return this.engine.share
  }

  /**
   * get: Broker instance.
   *
   * @returns {GraphqlType.SubscriptionBroker | null} - Broker.
   */
  get broker () {
    return this.share.broker
  }

  /**
   * get: Config.
   *
   * @returns {renchan.RenchanEnv} - Config.
   */
  get env () {
    return this.engine.env
  }

  /**
   * get: NODE_ENV.
   *
   * @returns {string} - Value of NODE_ENV.
   */
  get NODE_ENV () {
    return this.env.NODE_ENV
  }

  /**
   * get: now as alias of #requestedAt.
   *
   * @returns {Date} - Now.
   */
  get now () {
    return this.requestedAt
  }
}

/**
 * @typedef {{
 *   expressRequest: ExpressType.Request
 *   requestParams: ResolvedRequestParams
 *   userEntity: renchan.UserEntity | null
 *   engine: GraphqlType.ServerEngine
 *   visa: GraphqlType.Visa
 *   requestedAt: Date
 *   uuid: string
 * }} BaseGraphqlContextParams
 */

/**
 * @typedef {{
 *   expressRequest: ExpressType.Request
 *   requestParams: ResolvedRequestParams
 *   userEntity: renchan.UserEntity | null
 *   engine: GraphqlType.ServerEngine
 *   visa: GraphqlType.Visa
 *   requestedAt?: Date
 *   uuid?: string
 * }} BaseGraphqlContextFactoryParams
 */

/**
 * @typedef {{
 *   expressRequest: ExpressType.Request
 *   requestParams: ResolvedRequestParams
 *   engine: GraphqlType.ServerEngine
 *   requestedAt?: Date
 * }} BaseGraphqlContextAsyncFactoryParams
 */

/**
 * @typedef {GraphqlType.HttpRequestParams | GraphqlType.WebSocketRequestParams} ResolvedRequestParams
 */
