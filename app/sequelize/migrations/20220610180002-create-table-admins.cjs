'use strict'

const MigrationAttributeFactory = require('@openreachtech/renchan-sequelize/lib/tools/MigrationAttributeFactory.cjs')

const TABLE_NAME = 'admins'
const COLUMN_NAME = {
  USERNAME: 'username',
  EMAIL: 'email',
  PASSWORD: 'password',
  PHONE_NUMBER: 'phone_number',
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
      email: {
        type: Sequelize.STRING(191),
        field: COLUMN_NAME.EMAIL,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(191),
        field: COLUMN_NAME.PASSWORD,
      },
      phoneNumber: {
        type: Sequelize.STRING(31),
        field: COLUMN_NAME.PHONE_NUMBER,
      },
      ...factory.TIMESTAMPS_WITH_DELETED_AT,
    })

    await Promise.all([
      queryInterface.addIndex(TABLE_NAME, [COLUMN_NAME.USERNAME], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.USERNAME,
          'index',
        ].join('_'),
      }),
      queryInterface.addIndex(TABLE_NAME, [COLUMN_NAME.EMAIL], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.EMAIL,
          'index',
        ].join('_'),
      }),
    ])

    return Promise.resolve()
  },

  down: async (queryInterface, Sequelize) => queryInterface.dropTable(TABLE_NAME),
}
