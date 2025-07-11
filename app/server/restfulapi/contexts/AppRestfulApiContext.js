import BaseRestfulApiContext from '../../../../lib/server/restfulapi/contexts/BaseRestfulApiContext.js'

import Customer from '../../../sequelize/models/Customer.js'
import CustomerBasic from '../../../sequelize/models/CustomerBasic.js'
import CustomerAccessToken from '../../../sequelize/models/CustomerAccessToken.js'

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
    requestedAt,
  }) {
    const customerAccessTokenEntity = await this.findCustomerAccessToken({
      accessToken,
    })

    if (!customerAccessTokenEntity) {
      return null
    }

    if (customerAccessTokenEntity.isExpired({
      pointsAt: requestedAt,
    })) {
      return null
    }

    return customerAccessTokenEntity.Customer
      ?? null
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
