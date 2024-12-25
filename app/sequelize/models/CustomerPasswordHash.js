import {
  BackupMixinModel,
  RenchanModel,
  ModelAttributeFactory,
} from '@openreachtech/renchan-sequelize'

import {
  Encipher,
} from '@openreachtech/renchan-tools'

/**
 * CustomerPasswordHash model.
 */
export default class CustomerPasswordHash extends RenchanModel {
  /** @override */
  static createAttributes (DataTypes) {
    const factory = ModelAttributeFactory.create(DataTypes)

    return {
      ...factory.ID_BIGINT,

      CustomerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      passwordHash: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
      savedAt: {
        type: DataTypes.DATE(3),
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

  /** @override */
  static get Mixins () {
    return [
      BackupMixinModel,
    ]
  }

  /**
   * get: Backup model for BackupMixinModel
   *
   * @returns {typeof import('./CustomerPasswordHashesBk')} - Backup model declaration
   */
  static get BackupModel () {
    return this._.CustomerPasswordHashesBk
  }

  /**
   * Verifies password.
   *
   * @param {{
   *   password: string
   * }} params - Parameters.
   * @returns {Promise<boolean>}
   */
  async verifiesPassword ({
    password,
  }) {
    /** @type {string} */
    const passwordHash = /** @type {*} */ (
      this.get('passwordHash')
    )

    if (!passwordHash) {
      return false
    }

    const encipher = Encipher.create()

    return encipher.compare(
      password,
      passwordHash
    )
  }
}

/**
 * @typedef {CustomerPasswordHash & {
 *   id: number
 *   CustomerId: number
 *   passwordHash: string
 *   savedAt: Date
 * }} CustomerPasswordHashEntity
 */
