import CustomerGraphqlContext from '../../../../../../app/server/graphql/contexts/CustomerGraphqlContext.js'
import BaseGraphqlContext from '../../../../../../lib/server/graphql/contexts/BaseGraphqlContext.js'

describe('CustomerGraphqlContext', () => {
  describe('super class', () => {
    test('to be BaseGraphqlContext', () => {
      const actual = CustomerGraphqlContext.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlContext)
    })
  })
})

describe('CustomerGraphqlContext', () => {
  describe('.findUser()', () => {
    describe('to be fixed value', () => {
      const cases = [
        {
          params: {
            expressRequest: /** @type {*} */ ({}),
            accessToken: 'access-token$alpha',
          },
        },
        {
          params: {
            expressRequest: /** @type {*} */ ({}),
            accessToken: 'access-token$beta',
          },
        },
      ]

      test.each(cases)('accessToken: $params.accessToken', async ({ params }) => {
        const actual = await CustomerGraphqlContext.findUser(params)

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('CustomerGraphqlContext', () => {
  describe('#get:customer', () => {
    describe('to return #userEntity', () => {
      const cases = [
        {
          params: {
            expressRequest: /** @type {*} */ ({}),
            engine: /** @type {*} */ ({}),
            userEntity: /** @type {*} */ ({
              label: 'alphaUser',
              alpha: Symbol('alpha'),
            }),
            visa: /** @type {*} */ ({}),
            requestedAt: new Date('2024-11-13T11:00:00.001Z'),
            uuid: '98765432-abcd-0000-1234-000000000001',
          },
        },
        {
          params: {
            expressRequest: /** @type {*} */ ({}),
            engine: /** @type {*} */ ({}),
            userEntity: /** @type {*} */ ({
              label: 'betaUser',
              beta: Symbol('beta'),
            }),
            visa: /** @type {*} */ ({}),
            requestedAt: new Date('2024-11-13T11:00:00.002Z'),
            uuid: '98765432-abcd-0000-1234-000000000002',
          },
        },
      ]

      test.each(cases)('$params.userEntity.label', async ({ params }) => {
        const context = new CustomerGraphqlContext(params)

        const actual = context.customer

        expect(actual)
          .toBe(params.userEntity) // same reference
      })
    })
  })
})

describe('CustomerGraphqlContext', () => {
  describe('#get:customerId', () => {
    describe('to return #userId', () => {
      const cases = [
        {
          params: {
            expressRequest: /** @type {*} */ ({}),
            engine: /** @type {*} */ ({}),
            userEntity: /** @type {*} */ ({
              id: 10001,
            }),
            visa: /** @type {*} */ ({}),
            requestedAt: new Date('2024-11-13T11:00:00.001Z'),
            uuid: '98765432-abcd-0000-1234-000000000001',
          },
          expected: 10001,
        },
        {
          params: {
            expressRequest: /** @type {*} */ ({}),
            engine: /** @type {*} */ ({}),
            userEntity: /** @type {*} */ ({
              id: 10002,
            }),
            visa: /** @type {*} */ ({}),
            requestedAt: new Date('2024-11-13T11:00:00.002Z'),
            uuid: '98765432-abcd-0000-1234-000000000002',
          },
          expected: 10002,
        },
      ]

      test.each(cases)('$params.userEntity.label', async ({ params, expected }) => {
        const context = new CustomerGraphqlContext(params)

        const actual = context.customerId

        expect(actual)
          .toBe(expected)
      })
    })
  })
})
