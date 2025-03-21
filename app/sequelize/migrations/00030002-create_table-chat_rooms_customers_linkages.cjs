'use strict'

const MigrationAttributeFactory = require('@openreachtech/renchan-sequelize/lib/tools/MigrationAttributeFactory.cjs')

const TABLE_NAME = 'chat_rooms_customers_linkages'
const COLUMN_NAME = {
  CHAT_ROOM_ID: 'chat_room_id',
  CUSTOMER_ID: 'customer_id',
}

const SHORT_COLUMN_NAME = {
  CHAT_ROOM_ID: 'cri',
  CUSTOMER_ID: 'ci',
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

      ...factory.TIMESTAMPS_WITH_DELETED_AT,
    })

    await Promise.all([
      queryInterface.addIndex(TABLE_NAME, [
        COLUMN_NAME.CHAT_ROOM_ID,
      ], {
        name: [
          TABLE_NAME,
          SHORT_COLUMN_NAME.CHAT_ROOM_ID,
          'index',
        ].join('_'),
      }),
      queryInterface.addIndex(TABLE_NAME, [
        COLUMN_NAME.CUSTOMER_ID,
      ], {
        name: [
          TABLE_NAME,
          SHORT_COLUMN_NAME.CUSTOMER_ID,
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
