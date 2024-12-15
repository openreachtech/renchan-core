import GraphqlVisa from '../../../../../lib/server/graphql/contexts/GraphqlVisa.js'

import CustomerGraphqlServerEngine from '../../../../../app/server/graphql/CustomerGraphqlServerEngine.js'
import AdminGraphqlServerEngine from '../../../../../app/server/graphql/AdminGraphqlServerEngine.js'

import StubExpressRequest from '../../../../stubs/StubExpressRequest.js'

describe('GraphqlVisa', () => {
  describe('constructor', () => {
    /** @type {GraphqlType.SchemaPermissionHash} */
    const mockSchemaPermissionHash = ({})

    describe('to keep property', () => {
      describe('#hasAuthenticated', () => {
        /**
         * @type {Array<{
         *   params: {
         *     hasAuthenticated: boolean
         *     hasAuthorized: boolean
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: true,
            },
          },
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: false,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: true,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: false,
            },
          },
        ])

        test.each(cases)('hasAuthenticated: $params.hasAuthenticated, hasAuthorized: $params.hasAuthorized', ({ params }) => {
          const args = {
            hasAuthenticated: params.hasAuthenticated,
            hasAuthorized: params.hasAuthorized,
            schemaPermissionHash: mockSchemaPermissionHash,
          }

          const visa = new GraphqlVisa(args)

          expect(visa)
            .toHaveProperty('hasAuthenticated', params.hasAuthenticated)
        })
      })

      describe('#hasAuthorized', () => {
        /**
         * @type {Array<{
         *   params: {
         *     hasAuthenticated: boolean
         *     hasAuthorized: boolean
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: true,
            },
          },
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: false,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: true,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: false,
            },
          },
        ])

        test.each(cases)('hasAuthenticated: $params.hasAuthenticated, hasAuthorized: $params.hasAuthorized', ({ params }) => {
          const args = {
            hasAuthenticated: params.hasAuthenticated,
            hasAuthorized: params.hasAuthorized,
            schemaPermissionHash: mockSchemaPermissionHash,
          }

          const visa = new GraphqlVisa(args)

          expect(visa)
            .toHaveProperty('hasAuthorized', params.hasAuthorized)
        })
      })

      describe('#schemaPermissionHash', () => {
        /**
         * @type {Array<{
         *   params: {
         *     schemaPermissionHash: GraphqlType.SchemaPermissionHash
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              schemaPermissionHash: {
                customer: true,
                statistics: false,
              },
            },
          },
          {
            params: {
              schemaPermissionHash: {
                customers: true,
                admin: true,
              },
            },
          },
        ])

        test.each(cases)('schemaPermissionHash: $params.schemaPermissionHash', ({ params }) => {
          const args = {
            hasAuthenticated: true,
            hasAuthorized: false,
            schemaPermissionHash: params.schemaPermissionHash,
          }

          const visa = new GraphqlVisa(args)

          expect(visa)
            .toHaveProperty('schemaPermissionHash', params.schemaPermissionHash)
        })
      })
    })

    describe('to throw an error with invalid type', () => {
      /**
       * @type {Array<{
       *   params: import('../../../../../lib/server/graphql/contexts/GraphqlVisa.js').GraphqlVisaParams
       *   expected: string
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: null,
          expected: 'Cannot destructure property \'hasAuthenticated\' of \'object null\' as it is null.',
        },
        {
          params: undefined,
          expected: 'Cannot destructure property \'hasAuthenticated\' of \'undefined\' as it is undefined.',
        },
      ])

      test.each(cases)('params: $params', ({ params, expected }) => {
        expect(() => new GraphqlVisa(params))
          .toThrow(expected)
      })
    })
  })
})

describe('GraphqlVisa', () => {
  describe('.create()', () => {
    describe('to be an instance of own class', () => {
      const cases = [
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: true,
            schemaPermissionHash: {
              customer: true,
              statistics: true,
            },
          },
        },
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: false,
            schemaPermissionHash: {
              customer: true,
              statistics: false,
            },
          },
        },
      ]

      test.each(cases)('hasAuthenticated: $params.hasAuthenticated, hasAuthorized: $params.hasAuthorized', ({ params }) => {
        const visa = GraphqlVisa.create(params)

        expect(visa)
          .toBeInstanceOf(GraphqlVisa)
      })
    })

    describe('to call constructor with arguments', () => {
      const cases = [
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: true,
            schemaPermissionHash: {
              customer: true,
              statistics: true,
            },
          },
          expected: {
            hasAuthenticated: true,
            hasAuthorized: true,
            schemaPermissionHash: {
              customer: true,
              statistics: true,
            },
          },
        },
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: false,
            schemaPermissionHash: {
              customer: true,
              statistics: false,
            },
          },
          expected: {
            hasAuthenticated: true,
            hasAuthorized: false,
            schemaPermissionHash: {
              customer: true,
              statistics: false,
            },
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: true,
            schemaPermissionHash: {
              customer: true,
              statistics: false,
            },
          },
          expected: {
            hasAuthenticated: false,
            hasAuthorized: true,
            schemaPermissionHash: {
              customer: true,
              statistics: false,
            },
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: false,
            schemaPermissionHash: {
              customer: true,
              statistics: false,
              profile: true,
              secretPage: false,
            },
          },
          expected: {
            hasAuthenticated: false,
            hasAuthorized: false,
            schemaPermissionHash: {
              customer: true,
              statistics: false,
              profile: true,
              secretPage: false,
            },
          },
        },
        {
          params: {
            // hasAuthenticated: true,
            hasAuthorized: false,
            schemaPermissionHash: {
              customer: true,
              statistics: false,
            },
          },
          expected: {
            hasAuthenticated: false, // ✅ default value
            hasAuthorized: false,
            schemaPermissionHash: {
              customer: true,
              statistics: false,
            },
          },
        },
        {
          params: {
            hasAuthenticated: false,
            // hasAuthorized: false,
            schemaPermissionHash: {
              customer: true,
              statistics: false,
            },
          },
          expected: {
            hasAuthenticated: false,
            hasAuthorized: true, // ✅ default value
            schemaPermissionHash: {
              customer: true,
              statistics: false,
            },
          },
        },
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: false,
            // schemaPermissionHash: {
            //   customer: true,
            //   statistics: false,
            // },
          },
          expected: {
            hasAuthenticated: true,
            hasAuthorized: false,
            schemaPermissionHash: null, // ✅ default value
          },
        },
      ]

      test.each(cases)('hasAuthenticated: $params.hasAuthenticated, hasAuthorized: $params.hasAuthorized', ({ params, expected }) => {
        const GraphqlVisaSpy = globalThis.constructorSpy.spyOn(GraphqlVisa)

        GraphqlVisaSpy.create(params)

        expect(GraphqlVisaSpy.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('to work correctly with inherited classes', () => {
      const cases = [
        {
          params: {
            Class: class AlphaGraphqlVisa extends GraphqlVisa {},
          },
        },
        {
          params: {
            Class: class BetaGraphqlVisa extends GraphqlVisa {},
          },
        },
        {
          params: {
            Class: class GammaGraphqlVisa extends GraphqlVisa {},
          },
        },
      ]

      test.each(cases)('Class: $params.Class.name', ({ params }) => {
        const args = {}

        const visa = params.Class.create(args)

        expect(visa)
          .toBeInstanceOf(params.Class)
      })
    })
  })
})

describe('GraphqlVisa', () => {
  describe('.createAsync()', () => {
    /** @type {ExpressType.Request} */
    const stubExpressRequest = /** @type {*} */ (
      StubExpressRequest.create()
    )

    describe('to be an instance of own class', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const args = {
          expressRequest: stubExpressRequest,
          engine,
          userEntity: null,
        }

        const visa = await GraphqlVisa.createAsync(args)

        expect(visa)
          .toBeInstanceOf(GraphqlVisa)
      })
    })

    describe('to call .create()', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const expected = {
          hasAuthenticated: false,
          hasAuthorized: true,
          schemaPermissionHash: null,
        }

        const createSpy = jest.spyOn(GraphqlVisa, 'create')

        const engine = await params.Engine.createAsync()

        const args = {
          expressRequest: stubExpressRequest,
          engine,
          userEntity: null,
        }

        await GraphqlVisa.createAsync(args)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('to call visa hooks', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
            visaIssuers: {
              async hasAuthenticated () {
                return true // default value: false
              },
              async hasAuthorized () {
                return false // default value: true
              },
              async generateSchemaPermissionHash () {
                return {
                  amounts: true,
                }
              },
            },
          },
          expected: {
            hasAuthenticated: true,
            hasAuthorized: false,
            schemaPermissionHash: {
              amounts: true,
            },
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
            visaIssuers: {
              async hasAuthenticated () {
                return false
              },
              async hasAuthorized () {
                return true
              },
              async generateSchemaPermissionHash () {
                return {
                  customers: true,
                }
              },
            },
          },
          expected: {
            hasAuthenticated: false,
            hasAuthorized: true,
            schemaPermissionHash: {
              customers: true,
            },
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params, expected }) => {
        const engine = await params.Engine.createAsync()

        /** @type {GraphqlType.ServerEngine} */
        const derivedEngine = /** @type {*} */ ({
          __proto__: engine,

          visaIssuers: params.visaIssuers,
        })

        /** @type {renchan.UserEntity} */
        const userEntityTally = /** @type {*} */ ({})

        const args = {
          expressRequest: stubExpressRequest,
          engine: derivedEngine,
          userEntity: userEntityTally,
        }

        const expectedPassedArgs = {
          expressRequest: stubExpressRequest,
          engine: derivedEngine,
          userEntity: userEntityTally,
          requestedAt: expect.any(Date), // TODO: Replace with requestedAt of parameter.
        }

        const createSpy = jest.spyOn(GraphqlVisa, 'create')
        const hasAuthenticatedSpy = jest.spyOn(params.visaIssuers, 'hasAuthenticated')
        const hasAuthorizedSpy = jest.spyOn(params.visaIssuers, 'hasAuthorized')
        const generateSchemaPermissionHashSpy = jest.spyOn(params.visaIssuers, 'generateSchemaPermissionHash')

        await GraphqlVisa.createAsync(args)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
        expect(hasAuthenticatedSpy)
          .toHaveBeenCalledWith(expectedPassedArgs)
        expect(hasAuthorizedSpy)
          .toHaveBeenCalledWith(expectedPassedArgs)
        expect(generateSchemaPermissionHashSpy)
          .toHaveBeenCalledWith(expectedPassedArgs)
      })
    })
  })
})

describe('GraphqlVisa', () => {
  describe('#hasSchemaPermission()', () => {
    const cases = [
      {
        params: {
          schemaPermissionHash: {
            customer: true,
            statistics: false,
            profile: true,
            secretPage: false,
          },
        },
        truthyCases: [
          { schema: 'customer' },
          { schema: 'profile' },
        ],
        falsyCases: [
          { schema: 'statistics' },
          { schema: 'secretPage' },
          { schema: '_unknown' },
          { schema: null },
          { schema: undefined },
        ],
      },
      {
        params: {
          schemaPermissionHash: {
            admin: true,
            amounts: false,
            products: true,
            orders: false,
          },
        },
        truthyCases: [
          { schema: 'admin' },
          { schema: 'products' },
        ],
        falsyCases: [
          { schema: 'amounts' },
          { schema: 'orders' },
          { schema: '_unknown' },
          { schema: null },
          { schema: undefined },
        ],
      },
    ]

    describe.each(cases)('schemaPermissionHash: $params.schemaPermissionHash', ({ params, truthyCases, falsyCases }) => {
      describe('to be truthy', () => {
        test.each(truthyCases)('schema: $schema', ({ schema }) => {
          const args = {
            hasAuthenticated: true,
            hasAuthorized: false,
            schemaPermissionHash: params.schemaPermissionHash,
          }

          const visaInstance = GraphqlVisa.create(args)

          const actual = visaInstance.hasSchemaPermission({
            schema,
          })

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('schema: $schema', ({ schema }) => {
          const args = {
            hasAuthenticated: true,
            hasAuthorized: false,
            schemaPermissionHash: params.schemaPermissionHash,
          }

          const visaInstance = GraphqlVisa.create(args)

          const actual = visaInstance.hasSchemaPermission({
            schema,
          })

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('GraphqlVisa', () => {
  describe('#canResolve()', () => {
    const cases = [
      {
        params: {
          schemaPermissionHash: {
            customer: true,
            statistics: false,
          },
        },
        truthyCases: [
          {
            hasAuthenticated: true,
            hasAuthorized: true,
            schema: 'customer',
          },
        ],
        falsyCases: [
          {
            hasAuthenticated: true,
            hasAuthorized: false,
            schema: 'customer',
          },
          {
            hasAuthenticated: false,
            hasAuthorized: true,
            schema: 'customer',
          },
          {
            hasAuthenticated: false,
            hasAuthorized: false,
            schema: 'customer',
          },
          {
            hasAuthenticated: true,
            hasAuthorized: true,
            schema: 'statistics',
          },
          {
            hasAuthenticated: true,
            hasAuthorized: false,
            schema: 'statistics',
          },
          {
            hasAuthenticated: false,
            hasAuthorized: true,
            schema: 'statistics',
          },
          {
            hasAuthenticated: false,
            hasAuthorized: false,
            schema: 'statistics',
          },
        ],
      },
      {
        params: {
          schemaPermissionHash: {
            admin: true,
            amounts: false,
          },
        },
        truthyCases: [
          {
            hasAuthenticated: true,
            hasAuthorized: true,
            schema: 'admin',
          },
        ],
        falsyCases: [
          {
            hasAuthenticated: true,
            hasAuthorized: false,
            schema: 'admin',
          },
          {
            hasAuthenticated: false,
            hasAuthorized: true,
            schema: 'admin',
          },
          {
            hasAuthenticated: false,
            hasAuthorized: false,
            schema: 'admin',
          },
          {
            hasAuthenticated: true,
            hasAuthorized: true,
            schema: 'amounts',
          },
          {
            hasAuthenticated: true,
            hasAuthorized: false,
            schema: 'amounts',
          },
          {
            hasAuthenticated: false,
            hasAuthorized: true,
            schema: 'amounts',
          },
          {
            hasAuthenticated: false,
            hasAuthorized: false,
            schema: 'amounts',
          },
        ],
      },
    ]

    describe.each(cases)('schemaPermissionHash: $params.schemaPermissionHash', ({ params, truthyCases, falsyCases }) => {
      describe('to be truthy', () => {
        test.each(truthyCases)('hasAuthenticated: $hasAuthenticated, hasAuthorized: $hasAuthorized, schema: $schema', ({ hasAuthenticated, hasAuthorized, schema }) => {
          const args = {
            hasAuthenticated,
            hasAuthorized,
            schemaPermissionHash: params.schemaPermissionHash,
          }

          const visaInstance = GraphqlVisa.create(args)

          const actual = visaInstance.canResolve({
            schema,
          })

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('hasAuthenticated: $hasAuthenticated, hasAuthorized: $hasAuthorized, schema: $schema', ({ hasAuthenticated, hasAuthorized, schema }) => {
          const args = {
            hasAuthenticated,
            hasAuthorized,
            schemaPermissionHash: params.schemaPermissionHash,
          }

          const visaInstance = GraphqlVisa.create(args)

          const actual = visaInstance.canResolve({
            schema,
          })

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})
