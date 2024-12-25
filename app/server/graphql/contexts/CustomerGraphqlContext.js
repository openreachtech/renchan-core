import BaseGraphqlContext from '../../../../lib/server/graphql/contexts/BaseGraphqlContext.js'

import Customer from '../../../sequelize/models/Customer.js'
import CustomerBasic from '../../../sequelize/models/CustomerBasic.js'
import CustomerAccessToken from '../../../sequelize/models/CustomerAccessToken.js'

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
   *   requestedAt: Date
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
   * Find customer access token.
   *
   * @param {{
   *   accessToken: string
   * }} params - Parameters.
   * @returns {Promise<import('../../../sequelize/models/CustomerAccessToken').CustomerAccessTokenAssociatedEntity | null>} - Customer access token.
   */
  static async findCustomerAccessToken ({
    accessToken,
  }) {
    /** @type {import('../../../sequelize/models/CustomerAccessToken').CustomerAccessTokenAssociatedEntity | null} */
    const customerAccessTokenEntity = /** @type {*} */ (
      await CustomerAccessToken.findOne({
        where: {
          accessToken,
        },
        include: [
          {
            model: Customer,
            include: [
              CustomerBasic,
            ],
          },
        ],
      })
    )

    return customerAccessTokenEntity
      ?? null
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
