import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

import CustomerAccessToken from '../../../../../../sequelize/models/CustomerAccessToken.js'

export default class RenewAccessTokenMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'renewAccessToken'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,
    }
  }

  /**
   * Resolves the renewAccessToken mutation.
   *
   * @param {{
   *   variables: {}
   *   context: import('../../../../contexts/CustomerGraphqlContext').default
   * }} params - Parameters.
   * @returns {Promise<{
   *   accessToken: string | null
   * }>} - Access token.
   */
  async resolve ({
    context,
  }) {
    const currentAccessToken = context.accessToken

    const accessTokenEntity = await this.findAccessToken({
      accessToken: currentAccessToken,
    })

    const isAvailableAccessToken = this.isAvailableAccessToken({
      accessTokenEntity,
      pointsAt: context.now,
    })

    if (!isAvailableAccessToken) {
      return {
        accessToken: null,
      }
    }

    const hasEnoughTime = accessTokenEntity.hasEnoughTimeUntilExpired({
      pointsAt: context.now,
    })

    if (hasEnoughTime) {
      return {
        accessToken: currentAccessToken,
      }
    }

    // save renew access token
    const callback = this.generateTransactionCallback({
      customerId: accessTokenEntity.CustomerId,
      now: context.now,
    })
    const renewedAccessTokenEntity = await CustomerAccessToken.beginTransaction(callback)

    return this.formatResponse({
      accessTokenEntity: renewedAccessTokenEntity,
    })
  }

  /**
   * Find access token entity.
   *
   * @param {{
   *   accessToken: string
   * }} params - Parameters.
   * @returns {Promise<import('../../../../../../sequelize/models/CustomerAccessToken').CustomerAccessTokenEntity | null>} - Access token entity.
   */
  async findAccessToken ({
    accessToken,
  }) {
    if (!accessToken) {
      return null
    }

    /** @type {import('../../../../../../sequelize/models/CustomerAccessToken').CustomerAccessTokenEntity} */
    const accessTokenEntity = /** @type {*} */ (
      await CustomerAccessToken.findOne({
        where: {
          accessToken,
        },
      })
    )

    return accessTokenEntity
      ?? null
  }

  /**
   * Is available access token.
   *
   * @param {{
   *   accessTokenEntity: import('../../../../../../sequelize/models/CustomerAccessToken').CustomerAccessTokenEntity | null
   *   pointsAt: Date
   * }} params - Parameters.
   * @returns {boolean} - Is expired access token.
   */
  isAvailableAccessToken ({
    accessTokenEntity,
    pointsAt,
  }) {
    if (!accessTokenEntity) {
      return false
    }

    return !accessTokenEntity.isExpired({
      pointsAt,
    })
  }

  /**
   * Generate transaction callback.
   *
   * @param {{
   *   customerId: number
   *   now,
   * }} params
   * @returns {function(): Promise<import('../../../../../../sequelize/models/CustomerAccessToken.js').CustomerAccessTokenEntity>}
   */
  generateTransactionCallback ({
    customerId,
    now,
  }) {
    const accessTokenEntity = CustomerAccessToken.buildWithGeneratedAttributes({
      generatedAt: now,
      customerId,
    })

    return async transaction => /** @type {*} */ (
      accessTokenEntity.save({
        transaction,
      })
    )
  }

  /**
   * Format response.
   *
   * @param {{
   *   accessTokenEntity: import('../../../../../../sequelize/models/CustomerAccessToken.js').CustomerAccessTokenEntity
   * }} params - Parameters.
   * @returns {{
   *   accessToken: string
   * }}
   */
  formatResponse ({
    accessTokenEntity,
  }) {
    if (!accessTokenEntity) {
      return {
        accessToken: null,
      }
    }

    return {
      accessToken: accessTokenEntity.accessToken,
    }
  }
}
