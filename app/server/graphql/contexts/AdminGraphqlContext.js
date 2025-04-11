import BaseGraphqlContext from '../../../../lib/server/graphql/contexts/BaseGraphqlContext.js'

/**
 * Admin GraphQL context.
 *
 * @extends {BaseGraphqlContext}
 */
export default class AdminGraphqlContext extends BaseGraphqlContext {
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
   *   const entity = AdminAccessToken.findOne({
   *     where: {
   *       accessToken,
   *     },
   *     include: [
   *        Admin,
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
    // TODO: Must fulfill this method.
    return super.findUser({
      expressRequest,
      accessToken,
    })
  }

  /**
   * get: Admin entity.
   * Note: This is an alias of #userEntity
   *
   * @returns {renchan.UserEntity | null} - Admin entity.
   * @example
   * ```js
   * async resolve ({ variables, context }) {
   *   const adminEntity = context.admin
   * }
   * ```
   */
  get admin () {
    return this.userEntity
  }

  /**
   * get: Admin id.
   *
   * @returns {number | null} - Admin id.
   * @example
   * ```js
   * async resolve ({ variables, context }) {
   *   const id = context.adminId
   * }
   * ```
   */
  get adminId () {
    return this.userId
  }
}
