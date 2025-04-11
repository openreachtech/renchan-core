import rootPath from '../../../../../lib/globals/root-path.js'

import CustomerGraphqlServerEngine from '../../../../../app/server/graphql/CustomerGraphqlServerEngine.js'
import BaseGraphqlServerEngine from '../../../../../lib/server/graphql/BaseGraphqlServerEngine.js'

import CustomerGraphqlShare from '../../../../../app/server/graphql/contexts/CustomerGraphqlShare.js'
import CustomerGraphqlContext from '../../../../../app/server/graphql/contexts/CustomerGraphqlContext.js'

import BigNumberScalar from '../../../../../lib/server/graphql/scalars/concretes/BigNumberScalar.js'
import DateTimeScalar from '../../../../../lib/server/graphql/scalars/concretes/DateTimeScalar.js'

describe('CustomerGraphqlServerEngine', () => {
  describe('super class', () => {
    test('to be instance of base class', () => {
      const actual = CustomerGraphqlServerEngine.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlServerEngine)
    })
  })
})

describe('CustomerGraphqlServerEngine', () => {
  describe('.get:config', () => {
    test('to be fixed value', () => {
      const expected = {
        graphqlEndpoint: '/graphql-customer',
        staticPath: rootPath.to('public/'),
        schemaPath: rootPath.to('app/server/graphql/schemas/customer.graphql'),
        actualResolversPath: rootPath.to('app/server/graphql/resolvers/customer/actual/'),
        stubResolversPath: rootPath.to('app/server/graphql/resolvers/customer/stub/'),
        redisOptions: null,
      }

      const actual = CustomerGraphqlServerEngine.config

      expect(actual)
        .toStrictEqual(expected)
    })
  })
})

describe('CustomerGraphqlServerEngine', () => {
  describe('.get:standardErrorCodeHash', () => {
    test('to be fixed value', () => {
      const expected = {
        Unknown: '100.X000.001',
        ConcreteMemberNotFound: '101.X000.001',
        Unauthenticated: '102.X000.001',
        Unauthorized: '102.X000.002',
        DeniedSchemaPermission: '102.X000.003',
        Database: '104.X000.001',
      }
      const actual = CustomerGraphqlServerEngine.standardErrorCodeHash

      expect(actual)
        .toStrictEqual(expected)
    })
  })
})

describe('CustomerGraphqlServerEngine', () => {
  describe('#collectMiddleware()', () => {
    test('to be fixed value', () => {
      const engine = new CustomerGraphqlServerEngine({
        config: /** @type {*} */ ({
          staticPath: '/path/to/static',
        }),
        share: /** @type {*} */ ({}),
        errorHash: {},
      })

      const expected = [
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
      ]

      const actual = engine.collectMiddleware()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('CustomerGraphqlServerEngine', () => {
  describe('#generateFilterHandler()', () => {
    describe('to be instance of Function', () => {
      test('with no parameter', async () => {
        const engine = await CustomerGraphqlServerEngine.createAsync()

        const actual = engine.generateFilterHandler()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('to call members of context via generated function', () => {
      const expressRequestMock = /** @type {*} */ ({})
      const engineMock = /** @type {*} */ ({})
      const visaMock = /** @type {*} */ ({})

      const cases = [
        {
          params: {
            context: CustomerGraphqlContext.create({
              expressRequest: expressRequestMock,
              engine: engineMock,
              userEntity: {
                id: 10001,
              },
              visa: visaMock,
            }),
            information: {
              fieldName: 'alphaSchema',
            },
          },
          expected: {
            schema: 'alphaSchema',
          },
        },
        {
          params: {
            context: CustomerGraphqlContext.create({
              expressRequest: expressRequestMock,
              engine: engineMock,
              userEntity: {
                id: 10002,
              },
              visa: visaMock,
            }),
            information: {
              fieldName: 'betaSchema',
            },
          },
          expected: {
            schema: 'betaSchema',
          },
        },
      ]

      describe('context.canResolve() returns true', () => {
        test.each(cases)('fieldName: $params.information.fieldName', async ({ params, expected }) => {
          const engine = await CustomerGraphqlServerEngine.createAsync()

          const canResolveSpy = jest.spyOn(params.context, 'canResolve')
            .mockReturnValueOnce(true)
          const hasAuthenticatedSpy = jest.spyOn(params.context, 'hasAuthenticated')

          const handler = engine.generateFilterHandler()

          const args = {
            variables: {},
            context: params.context,
            information: params.information,
            parent: {},
          }

          await handler(args)

          expect(canResolveSpy)
            .toHaveBeenCalledWith(expected)
          expect(hasAuthenticatedSpy)
            .not
            .toHaveBeenCalled()
        })
      })

      describe('context.hasAuthenticated() returns false', () => {
        test.each(cases)('fieldName: $params.information.fieldName', async ({ params, expected }) => {
          const engine = await CustomerGraphqlServerEngine.createAsync()

          const canResolveSpy = jest.spyOn(params.context, 'canResolve')
            .mockReturnValueOnce(false)
          const hasAuthenticatedSpy = jest.spyOn(params.context, 'hasAuthenticated')
            .mockReturnValueOnce(false)
          const hasAuthorizedSpy = jest.spyOn(params.context, 'hasAuthorized')

          const handler = engine.generateFilterHandler()

          const args = {
            variables: {},
            context: params.context,
            information: params.information,
            parent: {},
          }

          await expect(handler(args))
            .rejects
            .toThrow('102.X000.001') // unauthenticated

          expect(canResolveSpy)
            .toHaveBeenCalledWith(expected)
          expect(hasAuthenticatedSpy)
            .toHaveBeenCalledWith()
          expect(hasAuthorizedSpy)
            .not
            .toHaveBeenCalled()
        })
      })

      describe('context.hasAuthorized() returns false', () => {
        test.each(cases)('fieldName: $params.information.fieldName', async ({ params, expected }) => {
          const engine = await CustomerGraphqlServerEngine.createAsync()

          const canResolveSpy = jest.spyOn(params.context, 'canResolve')
            .mockReturnValueOnce(false)
          const hasAuthenticatedSpy = jest.spyOn(params.context, 'hasAuthenticated')
            .mockReturnValueOnce(true)
          const hasAuthorizedSpy = jest.spyOn(params.context, 'hasAuthorized')
            .mockReturnValueOnce(false)
          const hasSchemaPermissionSpy = jest.spyOn(params.context, 'hasSchemaPermission')

          const handler = engine.generateFilterHandler()

          const args = {
            variables: {},
            context: params.context,
            information: params.information,
            parent: {},
          }

          await expect(handler(args))
            .rejects
            .toThrow('102.X000.002') // unauthorized

          expect(canResolveSpy)
            .toHaveBeenCalledWith(expected)
          expect(hasAuthenticatedSpy)
            .toHaveBeenCalledWith()
          expect(hasAuthorizedSpy)
            .toHaveBeenCalledWith()
          expect(hasSchemaPermissionSpy)
            .not
            .toHaveBeenCalled()
        })

        describe('context.hasSchemaPermission() returns false', () => {
          test.each(cases)('fieldName: $params.information.fieldName', async ({ params, expected }) => {
            const engine = await CustomerGraphqlServerEngine.createAsync()

            const canResolveSpy = jest.spyOn(params.context, 'canResolve')
              .mockReturnValueOnce(false)
            const hasAuthenticatedSpy = jest.spyOn(params.context, 'hasAuthenticated')
              .mockReturnValueOnce(true)
            const hasAuthorizedSpy = jest.spyOn(params.context, 'hasAuthorized')
              .mockReturnValueOnce(true)
            const hasSchemaPermissionSpy = jest.spyOn(params.context, 'hasSchemaPermission')
              .mockReturnValueOnce(false)

            const handler = engine.generateFilterHandler()

            const args = {
              variables: {},
              context: params.context,
              information: params.information,
              parent: {},
            }
            const hasSchemaPermissionArgsExpected = {
              schema: expected.schema,
            }
            const errorMessageExpected = `102.X000.003 {"schema":"${expected.schema}"}`

            await expect(handler(args))
              .rejects
              .toThrow(errorMessageExpected)

            expect(canResolveSpy)
              .toHaveBeenCalledWith(expected)
            expect(hasAuthenticatedSpy)
              .toHaveBeenCalledWith()
            expect(hasAuthorizedSpy)
              .toHaveBeenCalledWith()
            expect(hasSchemaPermissionSpy)
              .toHaveBeenCalledWith(hasSchemaPermissionArgsExpected)
          })
        })
      })
    })
  })
})

describe('CustomerGraphqlServerEngine', () => {
  describe('.get:Share', () => {
    test('to be bridge class', () => {
      const actual = CustomerGraphqlServerEngine.Share

      expect(actual)
        .toBe(CustomerGraphqlShare) // same reference
    })
  })
})

describe('CustomerGraphqlServerEngine', () => {
  describe('.get:Context', () => {
    test('to be bridge class', () => {
      const actual = CustomerGraphqlServerEngine.Context

      expect(actual)
        .toBe(CustomerGraphqlContext) // same reference
    })
  })
})

describe('CustomerGraphqlServerEngine', () => {
  describe('#collectScalars()', () => {
    test('to be fixed value', async () => {
      const engine = await CustomerGraphqlServerEngine.createAsync()

      const expected = [
        BigNumberScalar,
        DateTimeScalar,
      ]

      const actual = await engine.collectScalars()

      expect(actual)
        .toEqual(expected)
    })
  })
})
