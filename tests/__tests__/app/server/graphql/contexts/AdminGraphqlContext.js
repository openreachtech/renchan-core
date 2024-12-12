import AdminGraphqlContext from '../../../../../../app/server/graphql/contexts/AdminGraphqlContext.js'
import BaseGraphqlContext from '../../../../../../lib/server/graphql/contexts/BaseGraphqlContext.js'

describe('AdminGraphqlContext', () => {
  describe('super class', () => {
    test('to be BaseGraphqlContext', () => {
      const actual = AdminGraphqlContext.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlContext)
    })
  })
})

describe('AdminGraphqlContext', () => {
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
        const actual = await AdminGraphqlContext.findUser(params)

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('AdminGraphqlContext', () => {
  describe('#get:admin', () => {
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
        const context = new AdminGraphqlContext(params)

        const actual = context.admin

        expect(actual)
          .toBe(params.userEntity) // same reference
      })
    })
  })
})

describe('AdminGraphqlContext', () => {
  describe('#get:adminId', () => {
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
        const context = new AdminGraphqlContext(params)

        const actual = context.adminId

        expect(actual)
          .toBe(expected)
      })
    })
  })
})
