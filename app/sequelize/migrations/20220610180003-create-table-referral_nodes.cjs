'use strict'

const MigrationAttributeFactory = require('@openreachtech/renchan-sequelize/lib/tools/MigrationAttributeFactory.cjs')

const TABLE_NAME = 'referral_nodes'
const COLUMN_NAME = {
  CUSTOMER_ID: 'customer_id',
  FF_QUEUE: 'ff_queue',
  FF_DEPTH: 'ff_depth',
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const factory = MigrationAttributeFactory.create(Sequelize)

    await queryInterface.createTable(TABLE_NAME, {
      ...factory.ID_BIGINT,

      CustomerId: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.CUSTOMER_ID,
        allowNull: false,
      },
      ffQueue: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.FF_QUEUE,
        allowNull: false,
      },
      ffDepth: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.FF_DEPTH,
        allowNull: false,
      },

      ...factory.TIMESTAMPS,
    })

    await Promise.all([
      // indexes for FF Model
      queryInterface.addIndex(
        TABLE_NAME,
        [COLUMN_NAME.FF_QUEUE],
        {
          name: [
            TABLE_NAME,
            COLUMN_NAME.FF_QUEUE,
            'index',
          ].join('_'),
        }
      ),
      queryInterface.addIndex(
        TABLE_NAME,
        [
          COLUMN_NAME.FF_DEPTH,
          COLUMN_NAME.FF_QUEUE,
        ],
        {
          name: [
            TABLE_NAME,
            COLUMN_NAME.FF_DEPTH,
            COLUMN_NAME.FF_QUEUE,
            'index',
          ].join('_'),
        }
      ),

      // index for renchan.
      queryInterface.addIndex(
        TABLE_NAME,
        [COLUMN_NAME.CUSTOMER_ID],
        {
          name: [
            TABLE_NAME,
            COLUMN_NAME.CUSTOMER_ID,
            'index',
          ].join('_'),
        }
      ),
    ])

    return Promise.resolve()
  },

  down: async (queryInterface, Sequelize) => queryInterface.dropTable(TABLE_NAME),
}
