import Customer from '../../../../app/sequelize/models/Customer.js'

describe('Customer', () => {
  test('.findOne()', async () => {
    const actualCustomer = await Customer.findOne({
      order: [
        ['id', 'ASC'],
      ],
    })

    const expectedCustomer = {
      id: 100001,
      username: 'testUser001',
      inviteCode: 'abcdef01',
      registeredAt: new Date('2022-06-01T10:20:31.001Z'),
    }

    expect(actualCustomer.dataValues)
      .toMatchObject(expectedCustomer)
  })

  test('.findAll()', async () => {
    const actualCustomers = await Customer.findAll({
      order: [
        ['id', 'ASC'],
      ],
    })

    const expected = [
      { id: 100001 },
      { id: 100002 },
      { id: 100003 },
      { id: 100004 },
      { id: 100005 },
      { id: 100006 },
      { id: 100007 },
      { id: 100008 },
      { id: 100009 },
      { id: 100010 },
      { id: 100011 },
      { id: 100012 },
    ]

    expect(actualCustomers)
      .toMatchObject(expected)
  })
})
