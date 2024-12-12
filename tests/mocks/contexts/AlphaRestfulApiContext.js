import BaseRestfulApiContext from '../../../lib/server/restfulapi/contexts/BaseRestfulApiContext.js'

/**
 * App RESTful API context.
 *
 * @extends {BaseRestfulApiContext}
 */
export default class AlphaRestfulApiContext extends BaseRestfulApiContext {
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
   */
  get provider () {
    return this.userEntity
  }

  /**
   * get: Provider id.
   *
   * @returns {number | null} - Provider id.
   */
  get providerId () {
    return this.userId
  }
}
