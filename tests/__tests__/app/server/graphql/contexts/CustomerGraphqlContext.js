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
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ ({})

    describe('to be user entity', () => {
      describe('with available access token', () => {
        const cases = [
          {
            params: {
              expressRequest: expressRequestMock,
              accessToken: 'access-token-01-01',
              requestedAt: new Date('2024-08-01T01:00:01.001Z'),
            },
            expected: {
              id: 100001,
            },
          },
          {
            params: {
              expressRequest: expressRequestMock,
              accessToken: 'access-token-02-02',
              requestedAt: new Date('2024-08-02T02:00:02.002Z'),
            },
            expected: {
              id: 100002,
            },
          },
          {
            params: {
              expressRequest: expressRequestMock,
              accessToken: 'access-token-04-01',
              requestedAt: new Date('2024-08-04T04:00:04.004Z'),
            },
            expected: {
              id: 100004,
            },
          },
        ]

        test.each(cases)('accessToken: $params.accessToken', async ({ params, expected }) => {
          const actual = await CustomerGraphqlContext.findUser(params)

          expect(actual)
            .toHaveProperty('id', expected.id)
        })
      })
    })

    describe('to be null', () => {
      describe('with expired access token', () => {
        const cases = [
          {
            params: {
              expressRequest: expressRequestMock,
              accessToken: 'access-token-02-01',
              requestedAt: new Date('2024-08-02T02:00:02.002Z'),
            },
          },
          {
            params: {
              expressRequest: expressRequestMock,
              accessToken: 'access-token-03-01',
              requestedAt: new Date('2024-08-03T03:00:03.003Z'),
            },
          },
          {
            params: {
              expressRequest: expressRequestMock,
              accessToken: 'access-token-03-02',
              requestedAt: new Date('2024-08-03T13:00:03.003Z'),
            },
          },
        ]

        test.each(cases)('accessToken: $params.accessToken', async ({ params }) => {
          const actual = await CustomerGraphqlContext.findUser(params)

          expect(actual)
            .toBeNull()
        })
      })

      describe('with not existing access token', () => {
        const cases = [
          {
            params: {
              expressRequest: expressRequestMock,
              accessToken: 'unknown-access-token-01',
              requestedAt: new Date('2024-08-01T01:00:01.001Z'),
            },
          },
          {
            params: {
              expressRequest: expressRequestMock,
              accessToken: 'unknown-access-token-02',
              requestedAt: new Date('2024-08-02T02:00:02.002Z'),
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
})

describe('CustomerGraphqlContext', () => {
  describe('#get:accessToken', () => {
    describe('to return #accessToken', () => {
      const cases = [
        {
          params: {
            expressRequest: /** @type {*} */ ({
              headers: {
                'x-renchan-access-token': 'access-token$alpha',
              },
            }),
            engine: /** @type {*} */ ({}),
            userEntity: /** @type {*} */ ({}),
            visa: /** @type {*} */ ({}),
            requestedAt: new Date(),
            uuid: '98765432-abcd-0000-1234-000000000001',
          },
          expected: 'access-token$alpha',
        },
        {
          params: {
            expressRequest: /** @type {*} */ ({
              headers: {
                'x-renchan-access-token': 'access-token$beta',
              },
            }),
            engine: /** @type {*} */ ({}),
            userEntity: /** @type {*} */ ({}),
            visa: /** @type {*} */ ({}),
            requestedAt: new Date(),
            uuid: '98765432-abcd-0000-1234-000000000002',
          },
          expected: 'access-token$beta',
        },
      ]

      test.each(cases)('headers: $params.expressRequest.headers', async ({ params, expected }) => {
        const context = new CustomerGraphqlContext(params)

        const actual = context.accessToken

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('CustomerGraphqlContext', () => {
  describe('.findCustomerAccessToken()', () => {
    describe('to be existing entity', () => {
      const cases = [
        {
          params: {
            accessToken: 'access-token-01-01',
          },
          expected: {
            id: 140101,
          },
        },
        {
          params: {
            accessToken: 'access-token-02-01',
          },
          expected: {
            id: 140201,
          },
        },
        {
          params: {
            accessToken: 'access-token-02-02',
          },
          expected: {
            id: 140202,
          },
        },
        {
          params: {
            accessToken: 'access-token-03-01',
          },
          expected: {
            id: 140301,
          },
        },
        {
          params: {
            accessToken: 'access-token-03-02',
          },
          expected: {
            id: 140302,
          },
        },
        {
          params: {
            accessToken: 'access-token-04-01',
          },
          expected: {
            id: 140401,
          },
        },
        {
          params: {
            accessToken: 'access-token-05-01',
          },
          expected: {
            id: 140501,
          },
        },
        {
          params: {
            accessToken: 'access-token-06-01',
          },
          expected: {
            id: 140601,
          },
        },
        {
          params: {
            accessToken: 'access-token-07-01',
          },
          expected: {
            id: 140701,
          },
        },
        {
          params: {
            accessToken: 'access-token-08-01',
          },
          expected: {
            id: 140801,
          },
        },
        {
          params: {
            accessToken: 'access-token-09-01',
          },
          expected: {
            id: 140901,
          },
        },
        {
          params: {
            accessToken: 'access-token-10-01',
          },
          expected: {
            id: 141001,
          },
        },
        {
          params: {
            accessToken: 'access-token-11-01',
          },
          expected: {
            id: 141101,
          },
        },
        {
          params: {
            accessToken: 'access-token-12-01',
          },
          expected: {
            id: 141201,
          },
        },
        {
          params: {
            accessToken: 'access-token-13-01',
          },
          expected: {
            id: 141301,
          },
        },
        {
          params: {
            accessToken: 'access-token-14-01',
          },
          expected: {
            id: 141401,
          },
        },
        {
          params: {
            accessToken: 'access-token-15-01',
          },
          expected: {
            id: 141501,
          },
        },
        {
          params: {
            accessToken: 'access-token-16-01',
          },
          expected: {
            id: 141601,
          },
        },
        {
          params: {
            accessToken: 'access-token-17-01',
          },
          expected: {
            id: 141701,
          },
        },
        {
          params: {
            accessToken: 'access-token-18-01',
          },
          expected: {
            id: 141801,
          },
        },
        {
          params: {
            accessToken: 'access-token-19-01',
          },
          expected: {
            id: 141901,
          },
        },
        {
          params: {
            accessToken: 'access-token-20-01',
          },
          expected: {
            id: 142001,
          },
        },
        {
          params: {
            accessToken: 'access-token-21-01',
          },
          expected: {
            id: 142101,
          },
        },
        {
          params: {
            accessToken: 'access-token-22-01',
          },
          expected: {
            id: 142201,
          },
        },
        {
          params: {
            accessToken: 'access-token-23-01',
          },
          expected: {
            id: 142301,
          },
        },
        {
          params: {
            accessToken: 'access-token-24-01',
          },
          expected: {
            id: 142401,
          },
        },
        {
          params: {
            accessToken: 'access-token-25-01',
          },
          expected: {
            id: 142501,
          },
        },
        {
          params: {
            accessToken: 'access-token-26-01',
          },
          expected: {
            id: 142601,
          },
        },
        {
          params: {
            accessToken: 'access-token-27-01',
          },
          expected: {
            id: 142701,
          },
        },
        {
          params: {
            accessToken: 'access-token-28-01',
          },
          expected: {
            id: 142801,
          },
        },
        {
          params: {
            accessToken: 'access-token-29-01',
          },
          expected: {
            id: 142901,
          },
        },
        {
          params: {
            accessToken: 'access-token-30-01',
          },
          expected: {
            id: 143001,
          },
        },
      ]

      test.each(cases)('accessToken: $params.accessToken', async ({ params, expected }) => {
        const actual = await CustomerGraphqlContext.findCustomerAccessToken(params)

        expect(actual.dataValues)
          .toMatchObject(expected)
      })
    })

    describe('to be null', () => {
      const cases = [
        {
          params: {
            accessToken: 'not-existing-access-token-01',
          },
        },
        {
          params: {
            accessToken: 'not-existing-access-token-02',
          },
        },
      ]

      test.each(cases)('accessToken: $params.accessToken', async ({ params }) => {
        const actual = await CustomerGraphqlContext.findCustomerAccessToken(params)

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
            requestedAt: new Date(),
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
            requestedAt: new Date(),
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
            requestedAt: new Date(),
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
            requestedAt: new Date(),
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
