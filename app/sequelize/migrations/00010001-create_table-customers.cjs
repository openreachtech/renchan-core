'use strict'

const MigrationAttributeFactory = require('@openreachtech/renchan-sequelize/lib/tools/MigrationAttributeFactory.cjs')

const TABLE_NAME = 'customers'
const COLUMN_NAME = {
  REGISTERED_AT: 'registered_at',
}

module.exports = {
  async up (
    queryInterface,
    Sequelize
  ) {
    const factory = MigrationAttributeFactory.create(Sequelize)

    await queryInterface.createTable(TABLE_NAME, {
      ...factory.ID_BIGINT,

      registeredAt: {
        type: Sequelize.DATE(3),
        allowNull: false,
        field: COLUMN_NAME.REGISTERED_AT,
      },

      ...factory.TIMESTAMPS,
    })

    await Promise.all([
      queryInterface.addIndex(TABLE_NAME, [
        COLUMN_NAME.REGISTERED_AT,
      ], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.REGISTERED_AT,
          'index',
        ].join('_'),
      }),
    ])

    return Promise.resolve()
  },

  async down (queryInterface) {
    return queryInterface.dropTable(TABLE_NAME)
  },
}
