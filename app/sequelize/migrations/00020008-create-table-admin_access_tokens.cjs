'use strict'

const MigrationAttributeFactory = require('@openreachtech/renchan-sequelize/lib/tools/MigrationAttributeFactory.cjs')

const TABLE_NAME = 'admin_access_tokens'
const COLUMN_NAME = {
  ADMIN_ID: 'admin_id',
  ACCESS_TOKEN: 'access_token',
  GENERATED_AT: 'generated_at',
  EXPIRED_AT: 'expired_at',
}

module.exports = {
  async up (
    queryInterface,
    Sequelize
  ) {
    const factory = MigrationAttributeFactory.create(Sequelize)

    await queryInterface.createTable(TABLE_NAME, {
      ...factory.ID_BIGINT,

      AdminId: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.ADMIN_ID,
        allowNull: false,
      },
      accessToken: {
        type: Sequelize.STRING(191),
        field: COLUMN_NAME.ACCESS_TOKEN,
        allowNull: false,
      },
      generatedAt: {
        type: Sequelize.DATE(3),
        field: COLUMN_NAME.GENERATED_AT,
        allowNull: false,
      },
      expiredAt: {
        type: Sequelize.DATE(3),
        field: COLUMN_NAME.EXPIRED_AT,
        allowNull: false,
      },
      ...factory.TIMESTAMPS_WITH_DELETED_AT,
    })

    await Promise.all([
      queryInterface.addIndex(TABLE_NAME, [
        COLUMN_NAME.ADMIN_ID,
      ], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.ADMIN_ID,
          'index',
        ].join('_'),
      }),
      queryInterface.addIndex(TABLE_NAME, [
        COLUMN_NAME.ACCESS_TOKEN,
      ], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.ACCESS_TOKEN,
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
