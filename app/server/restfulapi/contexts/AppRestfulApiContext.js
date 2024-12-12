import BaseRestfulApiContext from '../../../../lib/server/restfulapi/contexts/BaseRestfulApiContext.js'

/**
 * App RESTful API context.
 *
 * @extends {BaseRestfulApiContext}
 */
export default class AppRestfulApiContext extends BaseRestfulApiContext {
  /**
   * Find user.
   *
   * @param {{
   *   expressRequest: ExpressType.Request
   *   accessToken: string | null
   * }} params
   * @returns {Promise<renchan.UserEntity | null>} - User entity.
   * @example
   * ```js
   * static async findUser ({ expressRequest, accessToken }) {
   *   const entity = CustomerAccessToken.findOne({
   *     where: {
   *       accessToken,
   *     },
   *     include: [
   *        Customer,
   *     ],
   *   })
   *
   *   if (!entity) {
   *     return null
   *   }
   *
   *   return entity
   * }
   * ```
   */
  static async findUser ({
    expressRequest,
    accessToken,
  }) {
    return super.findUser({
      expressRequest,
      accessToken,
    })
  }

  /**
   * get: Provider entity.
   * Note: This is an alias of #userEntity
   *
   * @returns {renchan.UserEntity | null} - Provider entity.
   * @example
   * ```js
   * async resolve ({ variables, context }) {
   *   const providerEntity = context.provider
   * }
   * ```
   */
  get provider () {
    return this.userEntity
  }

  /**
   * get: Provider id.
   *
   * @returns {number | null} - Provider id.
   * @example
   * ```js
   * async resolve ({ variables, context }) {
   *   const id = context.providerId
   * }
   * ```
   */
  get providerId () {
    return this.userId
  }
}
