import BaseGraphqlServerEngine from '../../../../lib/server/graphql/BaseGraphqlServerEngine.js'

import RenchanGraphqlError from '../../../../lib/server/graphql/errors/RenchanGraphqlError.js'

import BaseGraphqlShare from '../../../../lib/server/graphql/contexts/BaseGraphqlShare.js'
import SubscriptionBroker from '../../../../lib/server/graphql/subscription/SubscriptionBroker.js'

describe('BaseGraphqlServerEngine', () => {
  describe('constructor', () => {
    /** @type {GraphqlType.Config} */
    const mockConfig = /** @type {*} */ ({
      RedisOptions: null,
    })
    const mockBroker = SubscriptionBroker.create({
      config: mockConfig,
    })

    /** @type {renchan.RenchanEnv} */
    const mockEnv = /** @type {*} */ ({
      UUID: new Date()
        .toISOString(),
    })

    const AlphaGraphqlShare = class extends BaseGraphqlShare {}
    const BateGraphqlShare = class extends BaseGraphqlShare {}

    describe('to keep property', () => {
      describe('#config', () => {
        /**
         * @type {Array<{
         *   params: {
         *     config: GraphqlType.Config
         *     share: BaseGraphqlShare
         *     errorHash: Record<string, typeof RenchanGraphqlError>
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              config: {
                graphqlEndpoint: '/graphql-customer',
                schemaPath: '/path/to/schema-customer',
                actualResolversPath: '/path/to/resolvers/customer/actual/',
                stubResolversPath: '/path/to/resolvers/customer/stub/',
              },
              share: AlphaGraphqlShare.create({
                broker: mockBroker,
              }),
              errorHash: {},
            },
          },
          {
            params: {
              config: {
                graphqlEndpoint: '/graphql-admin',
                schemaPath: '/path/to/schema-admin',
                actualResolversPath: '/path/to/resolvers/admin/actual/',
                stubResolversPath: '/path/to/resolvers/admin/stub/',
              },
              share: BateGraphqlShare.create({
                broker: mockBroker,
              }),
              errorHash: {},
            },
          },
        ])

        test.each(cases)('config: $params.config', ({ params }) => {
          const engine = new BaseGraphqlServerEngine(params)

          expect(engine)
            .toHaveProperty('config', params.config)
        })
      })

      describe('#share', () => {
        /**
         * @type {Array<{
         *   params: {
         *     config: GraphqlType.Config
         *     share: BaseGraphqlShare
         *     errorHash: Record<string, typeof RenchanGraphqlError>
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              config: {
                graphqlEndpoint: '/graphql-customer',
                schemaPath: '/path/to/schema-customer',
                actualResolversPath: '/path/to/resolvers/customer/actual/',
                stubResolversPath: '/path/to/resolvers/customer/stub/',
              },
              share: new AlphaGraphqlShare({
                broker: mockBroker,
                env: mockEnv,
              }),
              errorHash: {},
            },
          },
          {
            params: {
              config: {
                graphqlEndpoint: '/graphql-admin',
                schemaPath: '/path/to/schema-admin',
                actualResolversPath: '/path/to/resolvers/admin/actual/',
                stubResolversPath: '/path/to/resolvers/admin/stub/',
              },
              share: new BateGraphqlShare({
                broker: mockBroker,
                env: mockEnv,
              }),
              errorHash: {},
            },
          },
        ])

        test.each(cases)('share: $params.share', ({ params }) => {
          const engine = new BaseGraphqlServerEngine(params)

          expect(engine)
            .toHaveProperty('share', params.share)
        })
      })

      describe('#errorHash', () => {
        /**
         * @type {Array<{
         *   params: {
         *     config: GraphqlType.Config
         *     share: BaseGraphqlShare
         *     errorHash: Record<string, typeof RenchanGraphqlError>
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              config: {
                graphqlEndpoint: '/graphql-customer',
                schemaPath: '/path/to/schema-customer',
                actualResolversPath: '/path/to/resolvers/customer/actual/',
                stubResolversPath: '/path/to/resolvers/customer/stub/',
              },
              share: new AlphaGraphqlShare({
                broker: mockBroker,
                env: mockEnv,
              }),
              errorHash: {
                Unknown: RenchanGraphqlError.declareGraphqlError({ code: '100.X000.001' }),
                ConcreteMemberNotFound: RenchanGraphqlError.declareGraphqlError({ code: '101.X000.001' }),
                Unauthenticated: RenchanGraphqlError.declareGraphqlError({ code: '102.X000.001' }),
                Unauthorized: RenchanGraphqlError.declareGraphqlError({ code: '102.X000.002' }),
                DeniedSchemaPermission: RenchanGraphqlError.declareGraphqlError({ code: '102.X000.003' }),
                Database: RenchanGraphqlError.declareGraphqlError({ code: '104.X000.001' }),
              },
            },
          },
          {
            params: {
              config: {
                graphqlEndpoint: '/graphql-admin',
                schemaPath: '/path/to/schema-admin',
                actualResolversPath: '/path/to/resolvers/admin/actual/',
                stubResolversPath: '/path/to/resolvers/admin/stub/',
              },
              share: new BateGraphqlShare({
                broker: mockBroker,
                env: mockEnv,
              }),
              errorHash: {
                Alpha: RenchanGraphqlError.declareGraphqlError({ code: 'AL0001' }),
                Beta: RenchanGraphqlError.declareGraphqlError({ code: 'BE0001' }),
                Gamma: RenchanGraphqlError.declareGraphqlError({ code: 'GA0001' }),
                Delta: RenchanGraphqlError.declareGraphqlError({ code: 'DE0001' }),
              },
            },
          },
        ])

        test.each(cases)('errorHash: $params.errorHash', ({ params }) => {
          const engine = new BaseGraphqlServerEngine(params)

          expect(engine)
            .toHaveProperty('errorHash', params.errorHash)
        })
      })
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('.create()', () => {
    /** @type {GraphqlType.Config} */
    const mockConfig = /** @type {*} */ ({
      RedisOptions: null,
    })
    const mockBroker = SubscriptionBroker.create({
      config: mockConfig,
    })

    const AlphaGraphqlShare = class extends BaseGraphqlShare {}
    const BateGraphqlShare = class extends BaseGraphqlShare {}

    const errorHashMock = {
      Unknown: RenchanGraphqlError.create({ code: '100.X000.001' }),
      ConcreteMemberNotFound: RenchanGraphqlError.create({ code: '101.X000.001' }),
      Unauthenticated: RenchanGraphqlError.create({ code: '102.X000.001' }),
      Unauthorized: RenchanGraphqlError.create({ code: '102.X000.002' }),
      DeniedSchemaPermission: RenchanGraphqlError.create({ code: '102.X000.003' }),
      Database: RenchanGraphqlError.create({ code: '104.X000.001' }),
    }

    describe('to be instance of own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *     share: BaseGraphqlShare
       *     errorHash: Record<string, typeof RenchanGraphqlError>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-customer',
              schemaPath: '/path/to/schema-customer',
              actualResolversPath: '/path/to/resolvers/customer/actual/',
              stubResolversPath: '/path/to/resolvers/customer/stub/',
            },
            share: AlphaGraphqlShare.create({
              broker: mockBroker,
            }),
            errorHash: errorHashMock,
          },
        },
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-admin',
              schemaPath: '/path/to/schema-admin',
              actualResolversPath: '/path/to/resolvers/admin/actual/',
              stubResolversPath: '/path/to/resolvers/admin/stub/',
            },
            share: BateGraphqlShare.create({
              broker: mockBroker,
            }),
            errorHash: errorHashMock,
          },
        },
      ])

      test.each(cases)('config: $params.config', ({ params }) => {
        const engine = BaseGraphqlServerEngine.create(params)

        expect(engine)
          .toBeInstanceOf(BaseGraphqlServerEngine)
      })
    })

    describe('to call constructor', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *     share: BaseGraphqlShare
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-customer',
              schemaPath: '/path/to/schema-customer',
              actualResolversPath: '/path/to/resolvers/customer/actual/',
              stubResolversPath: '/path/to/resolvers/customer/stub/',
            },
            share: AlphaGraphqlShare.create({
              broker: mockBroker,
            }),
            errorHash: errorHashMock,
          },
        },
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-admin',
              schemaPath: '/path/to/schema-admin',
              actualResolversPath: '/path/to/resolvers/admin/actual/',
              stubResolversPath: '/path/to/resolvers/admin/stub/',
            },
            share: BateGraphqlShare.create({
              broker: mockBroker,
            }),
            errorHash: errorHashMock,
          },
        },
      ])

      test.each(cases)('config: $params.config', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(BaseGraphqlServerEngine)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })

    describe('to throw error', () => {
      test('without parameter of config', () => {
        const args = {
          share: BateGraphqlShare.create({
            broker: mockBroker,
          }),
        }

        const expected = 'concrete-member-not-found {"memberName":"BaseGraphqlServerEngine.get:config"}'

        expect(() => BaseGraphqlServerEngine.create(args))
          .toThrow(expected)
      })
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('.createAsync()', () => {
    const AlphaGraphqlShare = class extends BaseGraphqlShare {}
    const BateGraphqlShare = class extends BaseGraphqlShare {}

    describe('to be instance of own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *     EngineCtor: typeof BaseGraphqlServerEngine
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-customer',
              schemaPath: '/path/to/schema-customer',
              actualResolversPath: '/path/to/resolvers/customer/actual/',
              stubResolversPath: '/path/to/resolvers/customer/stub/',
            },
            EngineCtor: class AlphaEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return AlphaGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-admin',
              schemaPath: '/path/to/schema-admin',
              actualResolversPath: '/path/to/resolvers/admin/actual/',
              stubResolversPath: '/path/to/resolvers/admin/stub/',
            },
            EngineCtor: class BateEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return BateGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
      ])

      test.each(cases)('Share: $params.EngineCtor.name', async ({ params }) => {
        const engine = await params.EngineCtor.createAsync(params)

        expect(engine)
          .toBeInstanceOf(BaseGraphqlServerEngine)
      })
    })

    describe('to call .create()', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *     EngineCtor: typeof BaseGraphqlServerEngine
       *   }
       *   expected: {
       *      config: GraphqlType.Config
       *      share: BaseGraphqlShare
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-customer',
              schemaPath: '/path/to/schema-customer',
              actualResolversPath: '/path/to/resolvers/customer/actual/',
              stubResolversPath: '/path/to/resolvers/customer/stub/',
            },
            EngineCtor: class AlphaEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return AlphaGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
          expected: {
            config: {
              graphqlEndpoint: '/graphql-customer',
              schemaPath: '/path/to/schema-customer',
              actualResolversPath: '/path/to/resolvers/customer/actual/',
              stubResolversPath: '/path/to/resolvers/customer/stub/',
            },
            share: expect.any(AlphaGraphqlShare),
          },
        },
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-admin',
              schemaPath: '/path/to/schema-admin',
              actualResolversPath: '/path/to/resolvers/admin/actual/',
              stubResolversPath: '/path/to/resolvers/admin/stub/',
            },
            EngineCtor: class BateEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return BateGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
          expected: {
            config: {
              graphqlEndpoint: '/graphql-admin',
              schemaPath: '/path/to/schema-admin',
              actualResolversPath: '/path/to/resolvers/admin/actual/',
              stubResolversPath: '/path/to/resolvers/admin/stub/',
            },
            share: expect.any(BateGraphqlShare),
          },
        },
      ])

      test.each(cases)('Share: $params.EngineCtor.name', async ({ params, expected }) => {
        const createSpy = jest.spyOn(BaseGraphqlServerEngine, 'create')

        const args = {
          config: params.config,
        }

        await params.EngineCtor.createAsync(args)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)

        createSpy.mockRestore()
      })
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('.get:config', () => {
    test('throw error', () => {
      const expected = 'concrete-member-not-found {"memberName":"BaseGraphqlServerEngine.get:config"}'

      expect(() => BaseGraphqlServerEngine.config)
        .toThrow(expected)
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('.get:standardErrorCodeHash', () => {
    test('throw error', () => {
      const expected = 'concrete-member-not-found {"memberName":"BaseGraphqlServerEngine.get:standardErrorCodeHash"}'

      expect(() => BaseGraphqlServerEngine.standardErrorCodeHash)
        .toThrow(expected)
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
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

        const actual = BaseGraphqlServerEngine.buildErrorHash(args)

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

        BaseGraphqlServerEngine.buildErrorHash(args)

        expect(declareGraphqlErrorSpy)
          .toHaveBeenCalledTimes(expected)
      })
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('.get:Share', () => {
    test('throw error', () => {
      const expected = 'concrete-member-not-found {"memberName":"BaseGraphqlServerEngine.get:Share"}'

      expect(() => BaseGraphqlServerEngine.Share)
        .toThrow(expected)
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('.get:Context', () => {
    test('throw error', () => {
      const expected = 'concrete-member-not-found {"memberName":"BaseGraphqlServerEngine.get:Context"}'

      expect(() => BaseGraphqlServerEngine.Context)
        .toThrow(expected)
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('#get:Ctor', () => {
    const AlphaGraphqlShare = class extends BaseGraphqlShare {}
    const BateGraphqlShare = class extends BaseGraphqlShare {}

    describe('to be own Class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *     EngineCtor: typeof BaseGraphqlServerEngine
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-customer',
              schemaPath: '/path/to/schema-customer',
              actualResolversPath: '/path/to/resolvers/customer/actual/',
              stubResolversPath: '/path/to/resolvers/customer/stub/',
            },
            EngineCtor: class AlphaEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return AlphaGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-admin',
              schemaPath: '/path/to/schema-admin',
              actualResolversPath: '/path/to/resolvers/admin/actual/',
              stubResolversPath: '/path/to/resolvers/admin/stub/',
            },
            EngineCtor: class BateEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return BateGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
      ])

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const engine = await params.EngineCtor.createAsync(params)

        const actual = engine.Ctor

        expect(actual)
          .toBe(params.EngineCtor) // same reference
      })
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('#get:env', () => {
    const AlphaGraphqlShare = class extends BaseGraphqlShare {}
    const BateGraphqlShare = class extends BaseGraphqlShare {}

    describe('to be env like object', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *     EngineCtor: typeof BaseGraphqlServerEngine
       *   }
       * }>}
       */
      const engineCases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-customer',
              schemaPath: '/path/to/schema-customer',
              actualResolversPath: '/path/to/resolvers/customer/actual/',
              stubResolversPath: '/path/to/resolvers/customer/stub/',
            },
            EngineCtor: class AlphaEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return AlphaGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-admin',
              schemaPath: '/path/to/schema-admin',
              actualResolversPath: '/path/to/resolvers/admin/actual/',
              stubResolversPath: '/path/to/resolvers/admin/stub/',
            },
            EngineCtor: class BateEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return BateGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
      ])

      describe.each(engineCases)('EngineCtor: $params.EngineCtor.name', ({ params }) => {
        const cases = [
          {
            method: 'isProduction',
            expected: false,
          },
          {
            method: 'isStaging',
            expected: false,
          },
          {
            method: 'isLive',
            expected: expect.any(Boolean),
          },
          {
            method: 'isDevelopment',
            expected: expect.any(Boolean),
          },
        ]

        test.each(cases)('method: $method()', async ({ method, expected }) => {
          const engine = await params.EngineCtor.createAsync(params)

          const envObject = engine.env

          /** @type {Function} */
          const booleanMethod = /** @type {*} */ (envObject[method])

          const actual = booleanMethod()

          expect(actual)
            .toEqual(expected)
        })
      })
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('#get:NODE_ENV', () => {
    const AlphaGraphqlShare = class extends BaseGraphqlShare {
      /** @override */
      static generateEnv () {
        return /** @type {*} */ ({
          NODE_ENV: 'alpha',
        })
      }
    }
    const BateGraphqlShare = class extends BaseGraphqlShare {
      /** @override */
      static generateEnv () {
        return /** @type {*} */ ({
          NODE_ENV: 'bate',
        })
      }
    }

    describe('to be env like object', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *     EngineCtor: typeof BaseGraphqlServerEngine
       *   }
       *   expected: string
       * }>}
       */
      const engineCases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-customer',
              schemaPath: '/path/to/schema-customer',
              actualResolversPath: '/path/to/resolvers/customer/actual/',
              stubResolversPath: '/path/to/resolvers/customer/stub/',
            },
            EngineCtor: class AlphaEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return AlphaGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
          expected: 'alpha',
        },
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-admin',
              schemaPath: '/path/to/schema-admin',
              actualResolversPath: '/path/to/resolvers/admin/actual/',
              stubResolversPath: '/path/to/resolvers/admin/stub/',
            },
            EngineCtor: class BateEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return BateGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
          expected: 'bate',
        },
      ])

      test.each(engineCases)('EngineCtor: $params.EngineCtor.name', async ({ params, expected }) => {
        const engine = await params.EngineCtor.createAsync(params)

        const actual = engine.NODE_ENV

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('#collectMiddleware()', () => {
    const AlphaGraphqlShare = class extends BaseGraphqlShare {}
    const BateGraphqlShare = class extends BaseGraphqlShare {}

    describe('to Throw', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *     EngineCtor: typeof BaseGraphqlServerEngine
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-customer',
              schemaPath: '/path/to/schema-customer',
              actualResolversPath: '/path/to/resolvers/customer/actual/',
              stubResolversPath: '/path/to/resolvers/customer/stub/',
            },
            EngineCtor: class AlphaEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return AlphaGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-admin',
              schemaPath: '/path/to/schema-admin',
              actualResolversPath: '/path/to/resolvers/admin/actual/',
              stubResolversPath: '/path/to/resolvers/admin/stub/',
            },
            EngineCtor: class BateEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return BateGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
      ])

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const expected = 'concrete-member-not-found {"memberName":"BaseGraphqlServerEngine#collectMiddleware()"}'

        const engine = await params.EngineCtor.createAsync(params)

        expect(() => engine.collectMiddleware())
          .toThrow(expected)
      })
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('#get:schemasToSkipFiltering', () => {
    describe('to be fixed value', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *     share: BaseGraphqlShare
       *     errorHash: Record<string, typeof RenchanGraphqlError>
       *   }
       * }>}
       */
      const cases = /** @type {*} */ ([
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-customer',
              schemaPath: '/path/to/schema-customer',
              actualResolversPath: '/path/to/resolvers/customer/actual/',
              stubResolversPath: '/path/to/resolvers/customer/stub/',
              staticPath: '/path/to/static/customer/',
            },
            share: {
              env: /** @type {*} */ ({}),
              broker: null,
            },
            errorHash: {
              Unknown: RenchanGraphqlError.create({ code: '100.X000.001' }),
              ConcreteMemberNotFound: RenchanGraphqlError.create({ code: '101.X000.001' }),
              Unauthenticated: RenchanGraphqlError.create({ code: '102.X000.001' }),
              Unauthorized: RenchanGraphqlError.create({ code: '102.X000.002' }),
              DeniedSchemaPermission: RenchanGraphqlError.create({ code: '102.X000.003' }),
              Database: RenchanGraphqlError.create({ code: '104.X000.001' }),
            },
          },
        },
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-admin',
              schemaPath: '/path/to/schema-admin',
              actualResolversPath: '/path/to/resolvers/admin/actual/',
              stubResolversPath: '/path/to/resolvers/admin/stub/',
              staticPath: '/path/to/static/admin/',
            },
            share: {
              env: /** @type {*} */ ({}),
              broker: null,
            },
            errorHash: {
              Unknown: RenchanGraphqlError.create({ code: '100.X000.001' }),
              ConcreteMemberNotFound: RenchanGraphqlError.create({ code: '101.X000.001' }),
              Unauthenticated: RenchanGraphqlError.create({ code: '102.X000.001' }),
              Unauthorized: RenchanGraphqlError.create({ code: '102.X000.002' }),
              DeniedSchemaPermission: RenchanGraphqlError.create({ code: '102.X000.003' }),
              Database: RenchanGraphqlError.create({ code: '104.X000.001' }),
            },
          },
        },
      ])

      test.each(cases)('graphqlEndpoint: $params.config.graphqlEndpoint', async ({ params }) => {
        const expected = []

        const args = {
          config: params.config,
          share: params.share,
          errorHash: params.errorHash,
        }
        const engine = new BaseGraphqlServerEngine(args)

        const actual = engine.schemasToSkipFiltering

        expect(actual)
          .toStrictEqual(expected)
      })
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('#generateFilterHandler()', () => {
    const AlphaGraphqlShare = class extends BaseGraphqlShare {}
    const BateGraphqlShare = class extends BaseGraphqlShare {}

    describe('to Throw', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *     EngineCtor: typeof BaseGraphqlServerEngine
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-customer',
              schemaPath: '/path/to/schema-customer',
              actualResolversPath: '/path/to/resolvers/customer/actual/',
              stubResolversPath: '/path/to/resolvers/customer/stub/',
            },
            EngineCtor: class AlphaEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return AlphaGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-admin',
              schemaPath: '/path/to/schema-admin',
              actualResolversPath: '/path/to/resolvers/admin/actual/',
              stubResolversPath: '/path/to/resolvers/admin/stub/',
            },
            EngineCtor: class BateEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return BateGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
      ])

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const expected = 'concrete-member-not-found {"memberName":"BaseGraphqlServerEngine#generateFilterHandler()"}'

        const engine = await params.EngineCtor.createAsync(params)

        expect(() => engine.generateFilterHandler())
          .toThrow(expected)
      })
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('#get:visaIssuers', () => {
    const AlphaGraphqlShare = class extends BaseGraphqlShare {}
    const BateGraphqlShare = class extends BaseGraphqlShare {}

    describe('to be fixed value', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *     EngineCtor: typeof BaseGraphqlServerEngine
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-customer',
              schemaPath: '/path/to/schema-customer',
              actualResolversPath: '/path/to/resolvers/customer/actual/',
              stubResolversPath: '/path/to/resolvers/customer/stub/',
            },
            EngineCtor: class AlphaEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return AlphaGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-admin',
              schemaPath: '/path/to/schema-admin',
              actualResolversPath: '/path/to/resolvers/admin/actual/',
              stubResolversPath: '/path/to/resolvers/admin/stub/',
            },
            EngineCtor: class BateEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return BateGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
      ])

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const expected = {}

        const engine = await params.EngineCtor.createAsync(params)

        const actual = engine.visaIssuers

        expect(actual)
          .toStrictEqual(expected)
      })
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('#collectExceptionCatchingMapEntries()', () => {
    /** @type {GraphqlType.Config} */
    const mockConfig = /** @type {*} */ ({
      graphqlEndpoint: '/graphql-customer',
      schemaPath: '/path/to/schema-customer',
      actualResolversPath: '/path/to/resolvers/customer/actual/',
      stubResolversPath: '/path/to/resolvers/customer/stub/',
    })

    describe('to be empty value on pre-production environment', () => {
      const cases = [
        {
          params: {
            EngineCtor: class AlphaEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return class extends BaseGraphqlShare {
                  /** @override */
                  static generateEnv () {
                    return /** @type {*} */ ({
                      isPreProduction () {
                        return true // <--- 👀
                      },
                    })
                  }
                }
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
      ]

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const expected = []

        const args = {
          config: mockConfig,
        }

        const engine = await params.EngineCtor.createAsync(args)

        const actual = engine.collectExceptionCatchingMapEntries()

        expect(actual)
          .toStrictEqual(expected)
      })
    })

    describe('to be fixed value on production', () => {
      const cases = [
        {
          params: {
            EngineCtor: class AlphaEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return class extends BaseGraphqlShare {
                  /** @override */
                  static generateEnv () {
                    return /** @type {*} */ ({
                      isPreProduction () {
                        return false // <--- 👀
                      },
                    })
                  }
                }
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
      ]

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const expected = [
          [
            expect.any(Function),
            expect.any(Function),
          ],
          [
            expect.any(Function),
            expect.any(Function),
          ],
          [
            expect.any(Function),
            expect.any(Function),
          ],
          [
            expect.any(Function),
            expect.any(Function),
          ],
        ]

        const args = {
          config: mockConfig,
        }

        const engine = await params.EngineCtor.createAsync(args)

        const actual = engine.collectExceptionCatchingMapEntries()

        expect(actual)
          .toStrictEqual(expected)
      })
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('#collectScalars()', () => {
    const AlphaGraphqlShare = class extends BaseGraphqlShare {}
    const BateGraphqlShare = class extends BaseGraphqlShare {}

    describe('to be fixed value', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *     EngineCtor: typeof BaseGraphqlServerEngine
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-customer',
              schemaPath: '/path/to/schema-customer',
              actualResolversPath: '/path/to/resolvers/customer/actual/',
              stubResolversPath: '/path/to/resolvers/customer/stub/',
            },
            EngineCtor: class AlphaEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return AlphaGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
        {
          params: {
            config: {
              graphqlEndpoint: '/graphql-admin',
              schemaPath: '/path/to/schema-admin',
              actualResolversPath: '/path/to/resolvers/admin/actual/',
              stubResolversPath: '/path/to/resolvers/admin/stub/',
            },
            EngineCtor: class BateEngine extends BaseGraphqlServerEngine {
              static get Share () {
                return BateGraphqlShare
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
      ])

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const expected = []

        const engine = await params.EngineCtor.createAsync(params)

        const actual = await engine.collectScalars()

        expect(actual)
          .toStrictEqual(expected)
      })
    })
  })
})

describe('BaseGraphqlServerEngine', () => {
  describe('#passesThoughError()', () => {
    /** @type {GraphqlType.Config} */
    const mockConfig = /** @type {*} */ ({
      graphqlEndpoint: '/graphql-customer',
      schemaPath: '/path/to/schema-customer',
      actualResolversPath: '/path/to/resolvers/customer/actual/',
      stubResolversPath: '/path/to/resolvers/customer/stub/',
    })

    describe('to be truthy', () => {
      const engineCases = [
        {
          params: {
            EngineCtor: class DeltaEngine extends BaseGraphqlServerEngine {
              /** @override */
              static get Share () {
                return class extends BaseGraphqlShare {
                  /** @override */
                  static generateEnv () {
                    return /** @type {*} */ ({
                      isPreProduction () {
                        return true // <--- 👀
                      },
                    })
                  }
                }
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
      ]

      test.each(engineCases)('EngineCtor: $params.EngineCtor.name', async ({ params, expected }) => {
        const args = {
          config: mockConfig,
        }
        const engine = await params.EngineCtor.createAsync(args)

        const actual = engine.passesThoughError()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const engineCases = [
        {
          params: {
            EngineCtor: class DeltaEngine extends BaseGraphqlServerEngine {
              /** @override */
              static get Share () {
                return class extends BaseGraphqlShare {
                  /** @override */
                  static generateEnv () {
                    return /** @type {*} */ ({
                      isPreProduction () {
                        return false // <--- 👀
                      },
                    })
                  }
                }
              }

              /** @override */
              static get standardErrorCodeHash () {
                return {
                  Unknown: '100.X000.001',
                  ConcreteMemberNotFound: '101.X000.001',
                  Unauthenticated: '102.X000.001',
                  Unauthorized: '102.X000.002',
                  DeniedSchemaPermission: '102.X000.003',
                  Database: '104.X000.001',
                }
              }
            },
          },
        },
      ]

      test.each(engineCases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const args = {
          config: mockConfig,
        }
        const engine = await params.EngineCtor.createAsync(args)

        const actual = engine.passesThoughError()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})
