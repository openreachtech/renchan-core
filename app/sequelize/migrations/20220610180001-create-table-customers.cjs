'use strict'

const MigrationAttributeFactory = require('@openreachtech/renchan-sequelize/lib/tools/MigrationAttributeFactory.cjs')

const TABLE_NAME = 'customers'
const COLUMN_NAME = {
  USERNAME: 'username',
  INVITE_CODE: 'invite_code',
  REGISTERED_AT: 'registered_at',
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const factory = MigrationAttributeFactory.create(Sequelize)

    await queryInterface.createTable(TABLE_NAME, {
      ...factory.ID_BIGINT,
      username: {
        type: Sequelize.STRING(191),
        field: COLUMN_NAME.USERNAME,
        allowNull: false,
      },
      inviteCode: {
        type: Sequelize.STRING(191),
        field: COLUMN_NAME.INVITE_CODE,
        allowNull: false,
      },
      registeredAt: {
        type: Sequelize.DATE(3),
        field: COLUMN_NAME.REGISTERED_AT,
        allowNull: false,
      },
      ...factory.TIMESTAMPS,
    })

    await Promise.all([
      queryInterface.addIndex(TABLE_NAME, [COLUMN_NAME.USERNAME], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.USERNAME,
          'UNIQUE',
        ].join('_'),
        indicesType: 'UNIQUE',
        type: 'UNIQUE',
      }),
      queryInterface.addIndex(TABLE_NAME, [COLUMN_NAME.INVITE_CODE], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.INVITE_CODE,
          'UNIQUE',
        ].join('_'),
        indicesType: 'UNIQUE',
        type: 'UNIQUE',
      }),
      queryInterface.addIndex(TABLE_NAME, [COLUMN_NAME.REGISTERED_AT], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.REGISTERED_AT,
          'index',
        ].join('_'),
      }),
    ])

    return Promise.resolve()
  },

  down: async (queryInterface, Sequelize) => queryInterface.dropTable(TABLE_NAME),
}
