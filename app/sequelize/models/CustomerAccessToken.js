import {
  RenchanModel,
  ModelAttributeFactory,
} from '@openreachtech/renchan-sequelize'

import {
  RandomTextGenerator,
} from '@openreachtech/renchan-tools'

const MILLISECONDS_PER_DAY = 60 * 60 * 24 * 1000 // milliseconds in a day

/**
 * CustomerAccessToken model.
 */
export default class CustomerAccessToken extends RenchanModel {
  /** @override */
  static createAttributes (DataTypes) {
    const factory = ModelAttributeFactory.create(DataTypes)

    return {
      ...factory.ID_BIGINT,

      // ForeignKey must start with upper case.
      CustomerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
      generatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expiredAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }
  }

  /** @override */
  static createOptions (sequelizeClient) {
    return {
      ...super.createOptions(sequelizeClient),
    }
  }

  /** @override */
  static associate () {
    super.associate?.()

    this.belongsTo(this._.Customer)
  }

  /** @override */
  static defineScopes (Op) {
    super.defineScopes?.(Op)

    // noop
  }

  /** @override */
  static setupHooks () {
    super.setupHooks?.()

    // noop
  }

  /** @override */
  static defineSubqueries () {
    super.defineSubqueries?.()

    // noop
  }

  /**
   * Build with generated attributes.
   *
   * @param {{
   *   customerId: number
   *   generatedAt: Date
   *   expiredAt?: Date
   *   accessToken?: string
   * }} params - Parameters.
   * @returns {CustomerAccessToken}
   */
  static buildWithGeneratedAttributes ({
    customerId,
    generatedAt,
    expiredAt = this.createExpiredAt({
      generatedAt,
    }),
    accessToken = this.generateAccessToken(),
  }) {
    return this.build({
      CustomerId: customerId,
      generatedAt,
      expiredAt,
      accessToken,
    })
  }

  /**
   * Create expired at.
   *
   * @param {{
   *   generatedAt: Date
   * }} params - Parameters.
   * @returns {Date} - Expired at.
   */
  static createExpiredAt ({
    generatedAt,
  }) {
    const expiredAt = new Date(
      generatedAt.getTime() + MILLISECONDS_PER_DAY
    )

    return expiredAt
  }

  /**
   * Generate access token.
   *
   * @param {{
   *   length?: number
   * }} [params] - Parameters.
   * @returns {string} - Access token.
   */
  static generateAccessToken ({
    length = 10,
  } = {}) {
    const generator = RandomTextGenerator.create()

    return generator.generate(length)
  }

  /**
   * Check if access token is expired.
   *
   * @param {{
   *   pointsAt: Date
   * }} params - Parameters.
   * @returns {boolean} - True if expired.
   */
  isExpired ({
    pointsAt,
  }) {
    const expiredAt = /** @type {Date} */ (
      this.get('expiredAt')
    )

    return expiredAt.getTime() <= pointsAt.getTime()
  }

  /**
   * Has enough time until expired.
   *
   * @param {{
   *   pointsAt: Date
   * }} params - Parameters.
   * @returns {boolean} - True if has enough time until expired.
   */
  hasEnoughTimeUntilExpired ({
    pointsAt,
  }) {
    const expiredAt = /** @type {Date} */ (
      this.get('expiredAt')
    )

    const MILLISECONDS_PER_HALF_DAY = MILLISECONDS_PER_DAY / 2

    return expiredAt.getTime() - pointsAt.getTime() > MILLISECONDS_PER_HALF_DAY
  }
}

/**
 * @typedef {CustomerAccessToken & {
 *   CustomerId: number
 *   accessToken: string
 *   generatedAt: Date
 *   expiredAt: Date
 * }} CustomerAccessTokenEntity
 */

/**
 * @typedef {CustomerAccessTokenEntity & {
 *   Customer: import('./Customer').CustomerEntity
 * }} CustomerAccessTokenAssociatedEntity
 */
