import SignInMutationResolver from '../../../../../../../../../app/server/graphql/resolvers/customer/actual/mutations/SignInMutationResolver.js'

import CustomerAccessToken from '../../../../../../../../../app/sequelize/models/CustomerAccessToken.js'

describe('SignInMutationResolver', () => {
  describe('.get:schema', () => {
    test('to be fixed value', () => {
      const actual = SignInMutationResolver.schema

      expect(actual)
        .toBe('signIn')
    })
  })
})

describe('SignInMutationResolver', () => {
  describe('#findPasswordHashByEmail()', () => {
    describe('with existing email', () => {
      const passwordHashExpected = expect.stringMatching(/^\$2b\$10\$.{53}$/u)

      const cases = [
        {
          params: {
            email: 'customer.100001@example.com',
          },
          expected: {
            CustomerId: 100001,
            passwordHash: passwordHashExpected,
            savedAt: new Date('2024-01-01T00:00:01.001Z'),
          },
        },
        {
          params: {
            email: 'customer.100002@example.com',
          },
          expected: {
            CustomerId: 100002,
            passwordHash: passwordHashExpected,
            savedAt: new Date('2024-01-02T00:00:02.002Z'),
          },
        },
      ]

      test.each(cases)('email: $params.email', async ({ params, expected }) => {
        const resolver = SignInMutationResolver.create()

        const actual = await resolver.findPasswordHashByEmail(params)

        expect(actual)
          .toHaveProperty(
            'dataValues',
            expect.objectContaining(expected)
          )

        // NOTE: Below matcher will throw error:
        // RangeError: Maximum call stack size exceeded
        // expect(actual)
        //   .toMatchObject(expected)
      })
    })

    describe('with non-existing email', () => {
      const cases = [
        {
          params: {
            email: 'unknown.100001@example.com',
          },
        },
        {
          params: {
            email: 'unknown.100002@example.com',
          },
        },
      ]

      test.each(cases)('email: $params.email', async ({ params }) => {
        const resolver = SignInMutationResolver.create()

        const actual = await resolver.findPasswordHashByEmail(params)

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('SignInMutationResolver', () => {
  describe('#formatResponse()', () => {
    const resolver = SignInMutationResolver.create()

    describe('from access token entity', () => {
      /**
       * @type {Array<{
       *   params: {
       *     accessTokenEntity: import('../../../../../../../../../app/sequelize/models/CustomerAccessToken.js').CustomerAccessTokenEntity
       *   }
       *   expected: {
       *     accessToken: string
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            accessTokenEntity: CustomerAccessToken.build({
              CustomerId: 100001,
              accessToken: 'accessToken.100001',
              generatedAt: new Date('2024-11-01T00:00:01.001Z'),
              expiredAt: new Date('2024-11-02T00:00:01.001Z'),
            }),
          },
          expected: {
            accessToken: 'accessToken.100001',
          },
        },
        {
          params: {
            accessTokenEntity: CustomerAccessToken.build({
              CustomerId: 100002,
              accessToken: 'accessToken.100002',
              generatedAt: new Date('2024-11-02T00:00:02.002Z'),
              expiredAt: new Date('2024-11-03T00:00:02.002Z'),
            }),
          },
          expected: {
            accessToken: 'accessToken.100002',
          },
        },
      ])

      test.each(cases)('CustomerId: $params.accessTokenEntity.CustomerId', async ({ params, expected }) => {
        const actual = resolver.formatResponse(params)

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})
