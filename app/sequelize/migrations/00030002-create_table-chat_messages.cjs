'use strict'

const MigrationAttributeFactory = require('@openreachtech/renchan-sequelize/lib/tools/MigrationAttributeFactory.cjs')

const TABLE_NAME = 'chat_messages'
const COLUMN_NAME = {
  ROOM_ID: 'room_id',
  CONTENT: 'content',
  SENDER: 'sender',
}

module.exports = {
  async up (
    queryInterface,
    Sequelize
  ) {
    const factory = MigrationAttributeFactory.create(Sequelize)

    await queryInterface.createTable(TABLE_NAME, {
      ...factory.ID_BIGINT,

      // ForeignKey must start with upper case.
      RoomId: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.ROOM_ID,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(191),
        field: COLUMN_NAME.CONTENT,
        allowNull: false,
      },
      sender: {
        type: Sequelize.STRING(191),
        field: COLUMN_NAME.SENDER,
        allowNull: false,
      },

      ...factory.TIMESTAMPS_WITH_DELETED_AT,
    })

    await Promise.all([
      queryInterface.addIndex(TABLE_NAME, [
        COLUMN_NAME.ROOM_ID,
      ], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.ROOM_ID,
          'index',
        ].join('_'),
      }),
    ])

    return Promise.resolve()
  },

  async down (
    queryInterface,
    Sequelize
  ) {
    return queryInterface.dropTable(TABLE_NAME)
  },
}
