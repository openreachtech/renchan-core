'use strict'

const MigrationAttributeFactory = require('@openreachtech/renchan-sequelize/lib/tools/MigrationAttributeFactory.cjs')

const TABLE_NAME = 'admin_role_assignments'
const COLUMN_NAME = {
  ADMIN_ID: 'admin_id',
  ADMIN_ROLE_ID: 'admin_role_id',
  DELETED_AT: 'deleted_at',
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
      AdminRoleId: {
        type: Sequelize.INTEGER,
        field: COLUMN_NAME.ADMIN_ROLE_ID,
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
        COLUMN_NAME.ADMIN_ROLE_ID,
      ], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.ADMIN_ROLE_ID,
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
