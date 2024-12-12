import {
  Sequelize,
} from 'sequelize'

import {
  ModelAttributeFactory,
  RenchanModel,
} from '@openreachtech/renchan-sequelize'

import FertileForest from '@steweucen/fertile-forest-sequelize'

/**
 * @type {typeof Sequelize}
 */
const SequelizeWithFFModel = /** @type {any} */ ({
  __proto__: Sequelize,

  Model: RenchanModel,
})

FertileForest.init(SequelizeWithFFModel)

/**
 * @type {typeof RenchanModel}
 */
const FFModel = FertileForest.Model

export default class ReferralNode extends FFModel {
  /** @override */
  static createAttributes (DataTypes) {
    const factory = ModelAttributeFactory.create(DataTypes)

    return {
      ...factory.ID_BIGINT,

      CustomerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      ffQueue: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      ffDepth: {
        type: DataTypes.INTEGER,
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

    // noop
  }

  /** @override */
  static defineScopes (Op) {
    super.defineScopes?.(Op)

    // noop
  }

  /** @override */
  static defineSubqueries () {
    super.defineSubqueries?.()

    // noop
  }

  /** @override */
  static setupHooks () {
    super.setupHooks?.()

    // noop
  }
}
