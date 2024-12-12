'use strict'

const {
  Encipher,
} = require('@openreachtech/renchan-tools')

const TimestampSeedsSupplier = require('@openreachtech/renchan-sequelize/lib/tools/TimestampSeedsSupplier.cjs')

const TABLE_NAME = 'admins'

const admins = [
  { id: 100001, username: 'admin001', email: 'admin-test01@openreach.tech' },
  { id: 100002, username: 'admin002', email: 'admin-test02@openreach.tech' },
  { id: 100003, username: 'admin003', email: 'admin-test03@openreach.tech' },
  { id: 100004, username: 'admin004', email: 'admin-test04@openreach.tech' },
  { id: 100005, username: 'admin005', email: 'admin-test05@openreach.tech' },
  { id: 100006, username: 'admin006', email: 'admin-test06@openreach.tech' },
  { id: 100007, username: 'admin007', email: 'admin-test07@openreach.tech', deleted_at: new Date('2022-01-01T00:00:00.000Z') },
  { id: 8, username: 'admin-7', email: 'admin-test7@openreach.tech' },
]

const encipher = Encipher.create()

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const encryptedHashByNumber = await encipher.hash('123456')
    const encryptedHashByAlphabet = await encipher.hash('abcdefg')

    const passwordHash = {
      1: encryptedHashByNumber,
      2: encryptedHashByAlphabet,
      3: encryptedHashByNumber,
      4: encryptedHashByAlphabet,
      5: encryptedHashByNumber,
      6: encryptedHashByAlphabet,
      7: encryptedHashByNumber,
      8: encryptedHashByNumber,
    }

    const filledAdmins = admins.map(it => ({
      ...it,
      password: passwordHash[it.id],
    }))

    await queryInterface.bulkInsert(
      TABLE_NAME,
      TimestampSeedsSupplier.supplyAll(filledAdmins),
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME, {
      id: admins.map(it => it.id),
    })
  },
}
