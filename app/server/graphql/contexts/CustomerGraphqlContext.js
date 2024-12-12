import BaseGraphqlContext from '../../../../lib/server/graphql/contexts/BaseGraphqlContext.js'

/**
 * Customer GraphQL context.
 *
 * @extends {BaseGraphqlContext}
 */
export default class CustomerGraphqlContext extends BaseGraphqlContext {
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
   * get: Customer entity.
   * Note: This is an alias of #userEntity
   *
   * @returns {renchan.UserEntity | null} - Customer entity.
   * @example
   * ```js
   * async resolve ({ variables, context }) {
   *   const customerEntity = context.customer
   * }
   * ```
   */
  get customer () {
    return this.userEntity
  }

  /**
   * get: Customer id.
   *
   * @returns {number | null} - Customer id.
   * @example
   * ```js
   * async resolve ({ variables, context }) {
   *   const id = context.customerId
   * }
   * ```
   */
  get customerId () {
    return this.userId
  }
}
