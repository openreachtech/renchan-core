'use strict'

const MigrationAttributeFactory = require('@openreachtech/renchan-sequelize/lib/tools/MigrationAttributeFactory.cjs')

const TABLE_NAME = 'chat_messages'
const COLUMN_NAME = {
  CHAT_ROOM_ID: 'chat_room_id',
  CUSTOMER_ID: 'customer_id',
  CONTENT: 'content',
  POSTED_AT: 'posted_at',
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
      ChatRoomId: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.CHAT_ROOM_ID,
        allowNull: false,
      },
      // ForeignKey must start with upper case.
      CustomerId: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.CUSTOMER_ID,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(191),
        field: COLUMN_NAME.CONTENT,
        allowNull: false,
      },
      postedAt: {
        type: Sequelize.DATE,
        field: COLUMN_NAME.POSTED_AT,
        allowNull: false,
      },

      ...factory.TIMESTAMPS_WITH_DELETED_AT,
    })

    await Promise.all([
      queryInterface.addIndex(TABLE_NAME, [
        COLUMN_NAME.CHAT_ROOM_ID,
        COLUMN_NAME.POSTED_AT,
      ], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.CHAT_ROOM_ID,
          COLUMN_NAME.POSTED_AT,
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
