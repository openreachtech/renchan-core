import BaseResolver from '../../../../../lib/server/graphql/resolvers/BaseResolver.js'
import BaseGraphqlContext from '../../../../../lib/server/graphql/contexts/BaseGraphqlContext.js'
import GraphqlVisa from '../../../../../lib/server/graphql/contexts/GraphqlVisa.js'
import RenchanGraphqlError from '../../../../../lib/server/graphql/errors/RenchanGraphqlError.js'

describe('BaseResolver', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#errorHash', () => {
        const cases = [
          {
            params: {
              errorHash: {
                AlphaError: RenchanGraphqlError.declareGraphqlError({
                  code: '100.X000.001',
                }),
              },
            },
          },
          {
            params: {
              errorHash: {
                BetaError: RenchanGraphqlError.declareGraphqlError({
                  code: '10.00.02',
                }),
              },
            },
          },
        ]

        test.each(cases)('errorHash: $params.errorHash', ({ params }) => {
          const resolver = new BaseResolver(params)

          expect(resolver)
            .toHaveProperty('errorHash', params.errorHash)
        })
      })
    })
  })
})

describe('BaseResolver', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            errorCodeHash: {
              AlphaError: '100.X000.001',
            },
          },
        },
        {
          params: {
            errorCodeHash: {
              BetaError: '10.00.02',
            },
          },
        },
      ]

      test.each(cases)('errorCodeHash: $params.errorCodeHash', ({ params }) => {
        const resolver = BaseResolver.create(params)

        expect(resolver)
          .toBeInstanceOf(BaseResolver)
      })

      test('with no args', () => {
        const resolver = BaseResolver.create()

        expect(resolver)
          .toBeInstanceOf(BaseResolver)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            errorCodeHash: {
              AlphaError: '100.X000.001',
              BetaError: '10.00.02',
            },
          },
          expected: {
            errorHash: {
              AlphaError: expect.any(RenchanGraphqlError.constructor),
              BetaError: expect.any(RenchanGraphqlError.constructor),
            },
          },
        },
        {
          params: {
            errorCodeHash: {
              GammaError: '10.00.03',
              DeltaError: '10.00.04',
            },
          },
          expected: {
            errorHash: {
              GammaError: expect.any(RenchanGraphqlError.constructor),
              DeltaError: expect.any(RenchanGraphqlError.constructor),
            },
          },
        },
      ]

      test.each(cases)('errorCodeHash: $params.errorCodeHash', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(BaseResolver)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })

      test('with no args', () => {
        const expected = {
          errorHash: {},
        }

        const SpyClass = globalThis.constructorSpy.spyOn(BaseResolver)

        SpyClass.create()

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('BaseResolver', () => {
  describe('.createAsync()', () => {
    describe('to be instance of own class', () => {
      test('with no args', async () => {
        const resolver = await BaseResolver.createAsync()

        expect(resolver)
          .toBeInstanceOf(BaseResolver)
      })
    })

    describe('to call constructor', () => {
      test('with no args', async () => {
        const createSpy = jest.spyOn(BaseResolver, 'create')

        await BaseResolver.createAsync()

        expect(createSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('BaseResolver', () => {
  describe('#extractSchemaFromClassName()', () => {
    describe('query resolver', () => {
      const cases = [
        {
          ResolverClass: BaseResolver,
          expectedSchema: 'base',
        },
        {
          ResolverClass: class CustomerQueryResolver extends BaseResolver {},
          expectedSchema: 'customer',
        },
        {
          ResolverClass: class PaymentsQueryResolver extends BaseResolver {},
          expectedSchema: 'payments',
        },
      ]

      test.each(cases)('class name: $ResolverClass.name', ({ ResolverClass, expectedSchema }) => {
        const actual = ResolverClass.extractSchemaFromClassName()

        expect(actual)
          .toBe(expectedSchema)
      })
    })

    describe('mutation resolver', () => {
      const cases = [
        {
          ResolverClass: class SignUpMutationResolver extends BaseResolver {},
          expectedSchema: 'signUp',
        },
        {
          ResolverClass: class SignInMutationResolver extends BaseResolver {},
          expectedSchema: 'signIn',
        },
      ]

      test.each(cases)('class name: $ResolverClass.name', ({ ResolverClass, expectedSchema }) => {
        const actual = ResolverClass.extractSchemaFromClassName()

        expect(actual)
          .toBe(expectedSchema)
      })
    })

    describe('subscription resolver', () => {
      const cases = [
        {
          ResolverClass: class ChatRoomSubscriptionResolver extends BaseResolver {},
          expectedSchema: 'chatRoom',
        },
        {
          ResolverClass: class AccessTokenExpiredSubscriptionResolver extends BaseResolver {},
          expectedSchema: 'accessTokenExpired',
        },
      ]

      test.each(cases)('class name: $ResolverClass.name', ({ ResolverClass, expectedSchema }) => {
        const actual = ResolverClass.extractSchemaFromClassName()

        expect(actual)
          .toBe(expectedSchema)
      })
    })

    describe('invalid suffix', () => {
      const cases = [
        {
          ResolverClass: class CustomerInvalidResolver extends BaseResolver {},
          expectedSchema: 'customerInvalid',
        },
        {
          ResolverClass: class PaymentsUnknownResolver extends BaseResolver {},
          expectedSchema: 'paymentsUnknown',
        },
      ].concat([
        {
          ResolverClass: class PaymentsUnknownSuffix extends BaseResolver {},
          expectedSchema: 'paymentsUnknownSuffix',
        },
      ])

      test.each(cases)('class name: $ResolverClass.name', ({ ResolverClass, expectedSchema }) => {
        const actual = ResolverClass.extractSchemaFromClassName()

        expect(actual)
          .toBe(expectedSchema)
      })
    })
  })
})

describe('BaseResolver', () => {
  describe('.get:operation', () => {
    describe('to throw', () => {
      test('with no args', () => {
        const expected = 'concrete-member-not-found {"memberName":"BaseResolver.get:operation"}'

        expect(() => BaseResolver.operation)
          .toThrow(expected)
      })
    })
  })
})

describe('BaseResolver', () => {
  describe('.get:schema', () => {
    describe('query resolver', () => {
      const cases = [
        {
          ResolverClass: class CustomerQueryResolver extends BaseResolver {},
          expectedSchema: 'customer',
        },
        {
          ResolverClass: class PaymentsQueryResolver extends BaseResolver {},
          expectedSchema: 'payments',
        },
      ]

      test.each(cases)('class name: $ResolverClass.name', ({ ResolverClass, expectedSchema }) => {
        const actual = ResolverClass.schema

        expect(actual)
          .toBe(expectedSchema)
      })
    })

    describe('mutation resolver', () => {
      const cases = [
        {
          ResolverClass: class SignUpMutationResolver extends BaseResolver {},
          expectedSchema: 'signUp',
        },
        {
          ResolverClass: class SignInMutationResolver extends BaseResolver {},
          expectedSchema: 'signIn',
        },
      ]

      test.each(cases)('class name: $ResolverClass.name', ({ ResolverClass, expectedSchema }) => {
        const actual = ResolverClass.schema

        expect(actual)
          .toBe(expectedSchema)
      })
    })

    describe('subscription resolver', () => {
      const cases = [
        {
          ResolverClass: class BtcPaymentSubscriptionResolver extends BaseResolver {},
          expectedSchema: 'btcPayment',
        },
        {
          ResolverClass: class AccessTokenExpiredSubscriptionResolver extends BaseResolver {},
          expectedSchema: 'accessTokenExpired',
        },
      ]

      test.each(cases)('class name: $ResolverClass.name', ({ ResolverClass, expectedSchema }) => {
        const actual = ResolverClass.schema

        expect(actual)
          .toBe(expectedSchema)
      })
    })

    describe('invalid suffix', () => {
      const cases = [
        {
          ResolverClass: class CustomerInvalidResolver extends BaseResolver {},
          expectedSchema: 'customerInvalid',
        },
        {
          ResolverClass: class PaymentsUnknownResolver extends BaseResolver {},
          expectedSchema: 'paymentsUnknown',
        },
      ].concat([
        {
          ResolverClass: class PaymentsUnknownSuffix extends BaseResolver {},
          expectedSchema: 'paymentsUnknownSuffix',
        },
      ])

      test.each(cases)('class name: $ResolverClass.name', ({ ResolverClass, expectedSchema }) => {
        const actual = ResolverClass.schema

        expect(actual)
          .toBe(expectedSchema)
      })
    })

    describe('to throw', () => {
      test('with no args', () => {
        const expected = 'concrete-member-not-found {"memberName":"BaseResolver.get:schema"}'

        expect(() => BaseResolver.schema)
          .toThrow(expected)
      })
    })
  })
})

describe('BaseResolver', () => {
  describe('.get:errorCodeHash', () => {
    describe('to be fixed value', () => {
      test('with no args', () => {
        const expected = {}

        const actual = BaseResolver.errorCodeHash

        expect(actual)
          .toStrictEqual(expected)
      })
    })
  })
})

describe('BaseResolver', () => {
  describe('.buildErrorHash()', () => {
    describe('to be error hash', () => {
      const cases = [
        {
          params: {
            title: 'case 01',
            errorCodeHash: {
              Unknown: '100.X000.001',
              ConcreteMemberNotFound: '101.X000.001',
              Unauthenticated: '102.X000.001',
              Unauthorized: '102.X000.002',
              DeniedSchemaPermission: '102.X000.003',
              Database: '104.X000.001',
            },
          },
          expected: {
            Unknown: expect.any(Function),
            ConcreteMemberNotFound: expect.any(Function),
            Unauthenticated: expect.any(Function),
            Unauthorized: expect.any(Function),
            DeniedSchemaPermission: expect.any(Function),
            Database: expect.any(Function),
          },
        },
        {
          params: {
            title: 'case 02',
            errorCodeHash: {
              Alpha: 'AL0001',
              Beta: 'BE0001',
              Gamma: 'GA0001',
              Delta: 'DE0001',
            },
          },
          expected: {
            Alpha: expect.any(Function),
            Beta: expect.any(Function),
            Gamma: expect.any(Function),
            Delta: expect.any(Function),
          },
        },
      ]

      test.each(cases)('$params.title', ({ params, expected }) => {
        const args = {
          errorCodeHash: params.errorCodeHash,
        }

        const actual = BaseResolver.buildErrorHash(args)

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to call RenchanGraphqlError.buildErrorHash()', () => {
      const cases = [
        {
          params: {
            title: 'case 01',
            errorCodeHash: {
              Unknown: '100.X000.001',
              ConcreteMemberNotFound: '101.X000.001',
              Unauthenticated: '102.X000.001',
              Unauthorized: '102.X000.002',
              DeniedSchemaPermission: '102.X000.003',
              Database: '104.X000.001',
            },
          },
          expected: 6,
        },
        {
          params: {
            title: 'case 02',
            errorCodeHash: {
              Alpha: 'AL0001',
              Beta: 'BE0001',
              Gamma: 'GA0001',
              Delta: 'DE0001',
            },
          },
          expected: 4,
        },
      ]

      test.each(cases)('$params.title', ({ params, expected }) => {
        const declareGraphqlErrorSpy = jest.spyOn(RenchanGraphqlError, 'declareGraphqlError')

        const args = {
          errorCodeHash: params.errorCodeHash,
        }

        BaseResolver.buildErrorHash(args)

        expect(declareGraphqlErrorSpy)
          .toHaveBeenCalledTimes(expected)
      })
    })
  })
})

describe('BaseResolver', () => {
  describe('#get:Ctor', () => {
    test('to be constructor of own class', () => {
      const resolver = BaseResolver.create()

      const actual = resolver.Ctor

      expect(actual)
        .toBe(BaseResolver)
    })
  })
})

describe('BaseResolver', () => {
  describe('#get:schema', () => {
    const cases = [
      {
        params: {
          schema: 'customer',
        },
      },
      {
        params: {
          schema: 'products',
        },
      },
      {
        params: {
          schema: 'chatRoom',
        },
      },
    ]

    test.each(cases)('schema: $params.schema', ({ params }) => {
      const schemaSpy = jest.spyOn(BaseResolver, 'schema', 'get')
        .mockReturnValue(params.schema)

      const resolver = BaseResolver.create()

      const actual = resolver.schema

      expect(actual)
        .toBe(params.schema)

      schemaSpy.mockRestore()
    })
  })
})

describe('BaseResolver', () => {
  describe('#get:operation', () => {
    describe('to throw', () => {
      test('with no args', () => {
        const expected = 'concrete-member-not-found {"memberName":"BaseResolver.get:operation"}'

        const resolver = BaseResolver.create()

        expect(() => resolver.operation)
          .toThrow(expected)
      })
    })
  })
})

describe('BaseResolver', () => {
  describe('#get:now', () => {
    test('to be instance of Date', () => {
      const resolver = BaseResolver.create()

      const actual = resolver.now

      expect(actual)
        .toBeInstanceOf(Date)
    })
  })
})

describe('BaseResolver', () => {
  describe('#get:Error', () => {
    describe('to be value of #errorHash', () => {
      const cases = [
        {
          params: {
            errorHash: {
              AlphaError: RenchanGraphqlError.declareGraphqlError({
                code: '100.X000.001',
              }),
            },
          },
        },
        {
          params: {
            errorHash: {
              BetaError: RenchanGraphqlError.declareGraphqlError({
                code: '10.00.02',
              }),
            },
          },
        },
      ]

      test.each(cases)('errorHash: $params.errorHash', ({ params }) => {
        const resolver = new BaseResolver(params)

        const actual = resolver.Error

        expect(actual)
          .toBe(params.errorHash) // same reference
      })
    })
  })
})

describe('BaseResolver', () => {
  describe('#resolve()', () => {
    /** @type {GraphqlType.ServerEngine} */
    const mockEngine = /** @type {*} */ ({})

    describe('to throw', () => {
      /** @type {GraphqlType.ResolverInputParent} */
      const mockParent = {
        id: 10001,
        username: 'Unknown',
      }

      /** @type {GraphqlType.ResolverInputContext} */
      const mockContext = BaseGraphqlContext.create({
        expressRequest: /** @type {*} */ ({}),
        userEntity: null,
        visa: GraphqlVisa.create(),
        engine: mockEngine,
      })

      /** @type {GraphqlType.ResolverInputInformation} */
      const mockInformation = /** @type {*} */ ({})

      const cases = [
        {
          params: {
            variables: {
              input: {
                id: 10001,
              },
            },
          },
        },
        {
          params: {
            variables: {
              input: {
                id: 99999,
              },
            },
          },
        },
      ]

      test.each(cases)('id: $params.variables.input.id', async ({ params }) => {
        const expected = 'concrete-member-not-found {"memberName":"BaseResolver#resolve()"}'

        const resolver = BaseResolver.create()

        const args = {
          parent: mockParent,
          variables: params.variables,
          context: mockContext,
          information: mockInformation,
        }

        await expect(async () => resolver.resolve(args))
          .rejects
          .toThrow(expected)
      })
    })
  })
})
