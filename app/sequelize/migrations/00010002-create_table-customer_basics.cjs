'use strict'

const MigrationAttributeFactory = require('@openreachtech/renchan-sequelize/lib/tools/MigrationAttributeFactory.cjs')

const TABLE_NAME = 'customer_basics'
const COLUMN_NAME = {
  CUSTOMER_ID: 'customer_id',
  USERNAME: 'username',
  SAVED_AT: 'saved_at',
}

module.exports = {
  async up (
    queryInterface,
    Sequelize
  ) {
    const factory = MigrationAttributeFactory.create(Sequelize)

    await queryInterface.createTable(TABLE_NAME, {
      ...factory.ID_BIGINT,

      // Foreign key must be start with upper case
      CustomerId: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.CUSTOMER_ID,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(191),
        field: COLUMN_NAME.USERNAME,
        allowNull: false,
      },
      savedAt: {
        type: Sequelize.DATE(3),
        field: COLUMN_NAME.SAVED_AT,
        allowNull: false,
      },

      ...factory.TIMESTAMPS,
    })

    await Promise.all([
      queryInterface.addIndex(TABLE_NAME, [
        COLUMN_NAME.CUSTOMER_ID,
      ], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.CUSTOMER_ID,
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
