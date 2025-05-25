import {
  RandomTextGenerator,
} from '@openreachtech/renchan-tools'

import RenewAccessTokenMutationResolver from '../../../../../../../../../app/server/graphql/resolvers/customer/actual/mutations/RenewAccessTokenMutationResolver.js'

import CustomerAccessToken from '../../../../../../../../../app/sequelize/models/CustomerAccessToken'

describe('RenewAccessTokenMutationResolver', () => {
  describe('#generateTransactionCallback', () => {
    const resolver = RenewAccessTokenMutationResolver.create()

    describe('to be instance of Function', () => {
      const cases = [
        {
          params: {
            customerId: 1000001,
            now: new Date('2024-08-01T01:00:01.001Z'),
          },
        },
        {
          params: {
            customerId: 1000002,
            now: new Date('2024-08-02T02:00:02.002Z'),
          },
        },
      ]

      test.each(cases)('customerId: $params.customerId', ({ params }) => {
        const actual = resolver.generateTransactionCallback(params)

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('generated handler', () => {
      const cases = [
        {
          params: {
            customerId: 1000001,
            now: new Date('2024-08-01T01:00:01.001Z'),
          },
        },
        {
          params: {
            customerId: 1000002,
            now: new Date('2024-08-02T02:00:02.002Z'),
          },
        },
      ]

      test.each(cases)('customerId: $params.customerId', async ({ params }) => {
        const handler = resolver.generateTransactionCallback(params)

        const actual = await CustomerAccessToken.beginTransaction(handler)

        expect(actual)
          .toHaveProperty('CustomerId', params.customerId)
        expect(actual)
          .toHaveProperty('generatedAt', params.now)
      })
    })
  })
})

describe('RenewAccessTokenMutationResolver', () => {
  describe('#resolve', () => {
    const resolver = RenewAccessTokenMutationResolver.create()

    describe('to be access token null', () => {
      /** @type {import('../../../../../../../../../app/server/graphql/contexts/CustomerGraphqlContext.js').default} */
      const context = /** @type {*} */ ({
        accessToken: null,
      })

      test('accessToken: null', async () => {
        const expected = {
          accessToken: null,
        }

        const actual = await resolver.resolve({
          variables: {},
          context,
        })

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to be access token as is', () => {
      /**
       * @type {Array<{
       *   params: {
       *     context: import('../../../../../../../../../app/server/graphql/contexts/CustomerGraphqlContext.js').default
       *   }
       *   expected: {
       *     accessToken: string
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            context: {
              accessToken: 'access-token-02-01',
              now: new Date('2024-03-02T10:00:02.002Z'),
            },
          },
          expected: {
            accessToken: 'access-token-02-01',
          },
        },
        {
          params: {
            context: {
              accessToken: 'access-token-03-01',
              now: new Date('2024-03-03T10:00:03.003Z'),
            },
          },
          expected: {
            accessToken: 'access-token-03-01',
          },
        },
      ])

      test.each(cases)('accessToken: $params.context.accessToken', async ({ params, expected }) => {
        const args = {
          variables: {},
          context: params.context,
        }

        const actual = await resolver.resolve(args)

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to be access token renew', () => {
      /**
       * @type {Array<{
       *   params: {
       *     context: import('../../../../../../../../../app/server/graphql/contexts/CustomerGraphqlContext.js').default
       *   }
       *   tally: string
       *   expected: {
       *     accessToken: string
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            context: {
              accessToken: 'access-token-02-01', // expiredAt: 2024-03-03T02:02:02.002Z
              now: new Date('2024-03-02T14:02:02.002Z'),
            },
          },
          tally: 'renewed-access-token-02-01',
          expected: {
            accessToken: 'renewed-access-token-02-01',
          },
        },
        {
          params: {
            context: {
              accessToken: 'access-token-03-01', // expiredAt: 2024-03-04T03:03:03.003Z
              now: new Date('2024-03-03T15:03:03.003Z'),
            },
          },
          tally: 'renewed-access-token-03-01',
          expected: {
            accessToken: 'renewed-access-token-03-01',
          },
        },
        {
          params: {
            context: {
              accessToken: 'access-token-03-02', // expiredAt: 2024-05-04T03:03:03.003Z
              now: new Date('2024-05-03T15:03:03.003Z'),
            },
          },
          tally: 'renewed-access-token-03-02',
          expected: {
            accessToken: 'renewed-access-token-03-02',
          },
        },
      ])

      test.each(cases)('accessToken: $params.context.accessToken', async ({ params, tally, expected }) => {
        jest.spyOn(RandomTextGenerator.prototype, 'generate')
          .mockReturnValue(tally)

        const notExpected = {
          accessToken: params.context.accessToken,
        }

        const args = {
          variables: {},
          context: params.context,
        }

        const actual = await resolver.resolve(args)

        expect(actual)
          .toEqual(expected)

        expect(actual)
          .not
          .toEqual(notExpected)
      })
    })
  })
})
