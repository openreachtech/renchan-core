import {
  BackupMixinModel,
  RenchanModel,
  ModelAttributeFactory,
} from '@openreachtech/renchan-sequelize'

/**
 * AdminBasic model.
 */
export default class AdminBasic extends RenchanModel {
  /** @override */
  static createAttributes (DataTypes) {
    const factory = ModelAttributeFactory.create(DataTypes)

    return {
      ...factory.ID_BIGINT,

      AdminId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      username: {
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

    this.belongsTo(this._.Admin)
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
   * @returns {typeof import('./AdminBasicsBk')} - Backup model declaration
   */
  static get BackupModel () {
    return this._.AdminBasicsBk
  }
}

/**
 * @typedef {AdminBasic & {
 *   id: number
 *   AdminId: number
 *   username: string
 *   savedAt: Date
 * }} AdminBasicEntity
 */
