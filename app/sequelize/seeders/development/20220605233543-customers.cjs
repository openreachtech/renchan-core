'use strict'

const TimestampSeedsSupplier = require('@openreachtech/renchan-sequelize/lib/tools/TimestampSeedsSupplier.cjs')

const TABLE_NAME = 'customers'

const customers = [
  { id: 100001, username: 'testUser001', invite_code: 'abcdef01', registered_at: new Date('2022-06-01T10:20:31.001Z') },
  { id: 100002, username: 'testUser002', invite_code: 'abcdef02', registered_at: new Date('2022-06-02T10:20:32.002Z') },
  { id: 100003, username: 'testUser003', invite_code: 'abcdef03', registered_at: new Date('2022-06-03T10:20:33.003Z') },
  { id: 100004, username: 'testUser004', invite_code: 'abcdef04', registered_at: new Date('2022-07-04T11:22:34.001Z') },
  { id: 100005, username: 'testUser005', invite_code: 'abcdef05', registered_at: new Date('2022-07-05T11:22:35.002Z') },
  { id: 100006, username: 'testUser006', invite_code: 'abcdef06', registered_at: new Date('2022-07-05T23:59:59.999Z') },
  { id: 100007, username: 'testUser007', invite_code: 'abcdef07', registered_at: new Date('2022-08-06T20:30:07.001Z') },
  { id: 100008, username: 'testUser008', invite_code: 'abcdef08', registered_at: new Date('2022-08-07T20:30:08.002Z') },
  { id: 100009, username: 'testUser009', invite_code: 'abcdef09', registered_at: new Date('2022-08-08T20:30:09.003Z') },
  { id: 100010, username: 'testUser010', invite_code: 'abcdef10', registered_at: new Date('2022-09-09T15:00:10.000Z') },
  { id: 100011, username: 'testUser011', invite_code: 'abcdef11', registered_at: new Date('2022-09-09T15:00:11.000Z') },
  { id: 100012, username: 'testUser012', invite_code: 'abcdef12', registered_at: new Date('2022-09-09T15:00:12.000Z') },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      TimestampSeedsSupplier.supplyAll(customers),
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME, {
      id: customers.map(it => it.id),
    })
  },
}
