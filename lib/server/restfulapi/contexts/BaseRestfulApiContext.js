import RestfulApiVisa from './RestfulApiVisa.js'

/**
 * Base class for Restful API context.
 *
 * @abstract
 */
export default class BaseRestfulApiContext {
  /**
   * Constructor.
   *
   * @param {BaseRestfulApiContextParams} params - Parameters.
   */
  constructor ({
    expressRequest,
    engine,
    userEntity,
    visa,
    requestedAt,
    uuid,
  }) {
    this.expressRequest = expressRequest
    this.engine = engine
    this.userEntity = userEntity
    this.visa = visa

    this.requestedAt = requestedAt
    this.uuid = uuid
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseRestfulApiContext ? X : never} T, X
   * @param {BaseRestfulApiContextFactoryParams} params - Parameters.
   * @returns {InstanceType<T>} - Instance of this class.
   * @this {T}
   */
  static create ({
    expressRequest,
    engine,
    userEntity,
    visa,
    requestedAt = new Date(),
    uuid = this.generateUuid(),
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        expressRequest,
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
   * @template {X extends typeof BaseRestfulApiContext ? X : never} T, X
   * @param {BaseRestfulApiContextAsyncFactoryParams} params - Parameters.
   * @returns {Promise<InstanceType<T>>} - Instance of this class.
   * @this {T}
   */
  static async createAsync ({
    expressRequest,
    engine,
  }) {
    const userEntity = await this.findUser({
      expressRequest,
      accessToken: this.extractAccessToken({
        expressRequest,
      }),
    })
    const visa = await this.createVisa({
      expressRequest,
      engine,
      userEntity,
    })

    return this.create({
      expressRequest,
      engine,
      userEntity,
      visa,
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
   * }} params - Parameters.
   * @returns {string | null} - Access token.
   */
  static extractAccessToken ({
    expressRequest,
  }) {
    const headerKey = this.ACCESS_TOKEN_HEADER_KEY

    return /** @type {*} */ (expressRequest.headers?.[headerKey])
      ?? null
  }

  /**
   * get: RESTful API Visa class.
   *
   * @returns {RestfulApiType.VisaCtor} - GraphQL Visa class.
   */
  static get Visa () {
    return RestfulApiVisa
  }

  /**
   * Find user.
   *
   * @param {{
   *   expressRequest: ExpressType.Request
   *   accessToken: string | null
   * }} params
   * @returns {Promise<renchan.UserEntity | null>} - User entity.
   */
  static async findUser ({
    expressRequest,
    accessToken,
  }) {
    return null
  }

  /**
   * Create visa.
   *
   * @param {{
   *   expressRequest: ExpressType.Request
   *   userEntity: renchan.UserEntity | null
   *   engine: RestfulApiType.ServerEngine
   * }} params - Parameters.
   * @returns {Promise<RestfulApiType.Visa>} - Visa.
   */
  static async createVisa ({
    expressRequest,
    engine,
    userEntity,
  }) {
    return this.Visa
      .createAsync({
        expressRequest,
        engine,
        userEntity,
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
   * Can render.
   *
   * @returns {boolean} - true: can.
   */
  canRender () {
    return this.visa.canRender()
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
   * Has path permission in Visa.
   *
   * @returns {boolean} - true: has.
   */
  hasPathPermission () {
    return this.visa.hasPathPermission
  }

  /**
   * get: Share instance.
   *
   * @returns {RestfulApiType.Share} - Share instance.
   */
  get share () {
    return this.engine.share
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
 *   userEntity: renchan.UserEntity | null
 *   engine: RestfulApiType.ServerEngine
 *   visa: RestfulApiType.Visa
 *   requestedAt: Date
 *   uuid: string
 * }} BaseRestfulApiContextParams
 */

/**
 * @typedef {{
 *   expressRequest: ExpressType.Request
 *   userEntity: renchan.UserEntity | null
 *   engine: RestfulApiType.ServerEngine
 *   visa: RestfulApiType.Visa
 *   requestedAt?: Date
 *   uuid?: string
 * }} BaseRestfulApiContextFactoryParams
 */

/**
 * @typedef {{
 *   expressRequest: ExpressType.Request
 *   engine: RestfulApiType.ServerEngine
 * }} BaseRestfulApiContextAsyncFactoryParams
 */
