import {
  RenchanModel,
  ModelAttributeFactory,
} from '@openreachtech/renchan-sequelize'

/**
 * AdminRoleAssignment model.
 */
export default class AdminRoleAssignment extends RenchanModel {
  /** @override */
  static createAttributes (DataTypes) {
    const factory = ModelAttributeFactory.create(DataTypes)

    return {
      ...factory.ID_BIGINT,

      AdminId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      AdminRoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }
  }

  /** @override */
  static createOptions (sequelizeClient) {
    return {
      ...super.createOptions(sequelizeClient),

      paranoid: true, // for deleted_at column
    }
  }

  /** @override */
  static associate () {
    super.associate?.()

    this.belongsTo(this._.Admin)
    this.belongsTo(this._.AdminRole)
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
 * @typedef {AdminRoleAssignment & {
 *   id: number
 *   AdminId: number
 *   AdminRoleId: number
 * }} AdminRoleAssignmentEntity
 */
