import {
  RenchanModel,
  ModelAttributeFactory,
} from '@openreachtech/renchan-sequelize'

/**
 * AdminRole model.
 */
export default class AdminRole extends RenchanModel {
  /** @override */
  static createAttributes (DataTypes) {
    const factory = ModelAttributeFactory.create(DataTypes)

    return {
      ...factory.ID_INTEGER,

      name: {
        type: DataTypes.STRING(191),
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

    this.belongsToMany(this._.Admin, {
      through: this._.AdminRoleAssignment,
    })
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
}

/**
 * @typedef {AdminRole & {
 *   id: number
 *   name: string
 * }} AdminRoleEntity
 */
