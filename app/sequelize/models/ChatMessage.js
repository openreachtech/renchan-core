import {
  ModelAttributeFactory,
  RenchanModel,
} from '@openreachtech/renchan-sequelize'

export default class ChatMessage extends RenchanModel {
  /** @override */
  static createAttributes (DataTypes) {
    const factory = ModelAttributeFactory.create(DataTypes)

    return {
      ...factory.ID_BIGINT,

      // ForeignKey must start with upper case.
      ChatRoomId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      // ForeignKey must start with upper case.
      CustomerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
      postedAt: {
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
}

/**
 * @typedef {{
 *   id: number
 *   ChatRoomId: number
 *   CustomerId: number
 *   content: string
 *   postedAt: Date
 * }} ChatMessageEntity
 */

/**
 * @typedef {{
 *   id: number
 *   ChatRoomId: number
 *   CustomerId: number
 *   content: string
 *   postedAt: Date
 *   Customer: {
 *     id: number
 *     registeredAt: Date
 *     CustomerBasic: {
 *       id: number
 *       CustomerId: number
 *       username: string
 *       savedAt: Date
 *     }
 *   }
 * }} ChatMessageAssociatedEntity
 */
