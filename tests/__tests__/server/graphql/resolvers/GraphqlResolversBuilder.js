import env from '../../../../../lib/globals/env.js'
import rootPath from '../../../../../lib/globals/root-path.js'

import GraphqlResolversBuilder from '../../../../../lib/server/graphql/resolvers/GraphqlResolversBuilder.js'
import BaseResolver from '../../../../../lib/server/graphql/resolvers/BaseResolver.js'
import BaseQueryResolver from '../../../../../lib/server/graphql/resolvers/BaseQueryResolver.js'
import BaseMutationResolver from '../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'
import BaseSubscriptionResolver from '../../../../../lib/server/graphql/resolvers/BaseSubscriptionResolver.js'
import BaseGraphqlServerEngine from '../../../../../lib/server/graphql/BaseGraphqlServerEngine.js'
import ExceptionCatchingProxyBuilder from '../../../../../lib/server/graphql/resolvers/ExceptionCatchingProxyBuilder.js'
import FilterSchemaHashBuilder from '../../../../../lib/server/graphql/resolvers/FilterSchemaHashBuilder.js'

import CustomerGraphqlServerEngine from '../../../../../app/server/graphql/CustomerGraphqlServerEngine.js'
import AdminGraphqlServerEngine from '../../../../../app/server/graphql/AdminGraphqlServerEngine.js'

describe('GraphqlResolversBuilder', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      const mockExceptionCatchingProxyBuilder = new ExceptionCatchingProxyBuilder({
        alternativeExceptionMap: new Map(),
      })

      describe('#filterSchemaHash', () => {
        const cases = [
          {
            params: {
              filterSchemaHash: {
                customer: BaseResolver.create(),
                products: BaseResolver.create(),
              },
            },
          },
          {
            params: {
              filterSchemaHash: {},
            },
          },
        ]

        test.each(cases)('filterSchemaHash: $params.filterSchemaHash', ({ params }) => {
          const args = {
            filterSchemaHash: params.filterSchemaHash,
            actualResolverSchemaHash: {},
            stubResolverSchemaHash: {},
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          }
          const builder = new GraphqlResolversBuilder(args)

          expect(builder)
            .toHaveProperty('filterSchemaHash', params.filterSchemaHash)
        })
      })

      describe('#actualResolverSchemaHash', () => {
        const cases = [
          {
            params: {
              actualResolverSchemaHash: {
                customer: BaseResolver.create(),
                products: BaseResolver.create(),
              },
            },
          },
          {
            params: {
              actualResolverSchemaHash: {},
            },
          },
        ]

        test.each(cases)('actualResolverSchemaHash: $params.actualResolverSchemaHash', ({ params }) => {
          const args = {
            filterSchemaHash: {},
            actualResolverSchemaHash: params.actualResolverSchemaHash,
            stubResolverSchemaHash: {},
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          }
          const builder = new GraphqlResolversBuilder(args)

          expect(builder)
            .toHaveProperty('actualResolverSchemaHash', params.actualResolverSchemaHash)
        })
      })

      describe('#stubResolverSchemaHash', () => {
        const cases = [
          {
            params: {
              stubResolverSchemaHash: {
                customer: BaseResolver.create(),
                products: BaseResolver.create(),
              },
            },
          },
          {
            params: {
              stubResolverSchemaHash: {},
            },
          },
        ]

        test.each(cases)('stubResolverSchemaHash: $params.stubResolverSchemaHash', ({ params }) => {
          const args = {
            filterSchemaHash: {},
            actualResolverSchemaHash: {},
            stubResolverSchemaHash: params.stubResolverSchemaHash,
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          }
          const builder = new GraphqlResolversBuilder(args)

          expect(builder)
            .toHaveProperty('stubResolverSchemaHash', params.stubResolverSchemaHash)
        })
      })

      describe('#exceptionCatchingProxyBuilder', () => {
        const cases = [
          {
            params: {
              exceptionCatchingProxyBuilder: new ExceptionCatchingProxyBuilder({
                alternativeExceptionMap: new Map([
                  [
                    error => error,
                    error => error,
                  ],
                ]),
              }),
            },
          },
          {
            params: {
              exceptionCatchingProxyBuilder: new ExceptionCatchingProxyBuilder({
                alternativeExceptionMap: new Map(),
              }),
            },
          },
        ]

        test.each(cases)('exceptionCatchingProxyBuilder: $params.exceptionCatchingProxyBuilder', ({ params }) => {
          const args = {
            filterSchemaHash: {},
            actualResolverSchemaHash: {},
            stubResolverSchemaHash: {},
            exceptionCatchingProxyBuilder: params.exceptionCatchingProxyBuilder,
          }
          const builder = new GraphqlResolversBuilder(args)

          expect(builder)
            .toHaveProperty('exceptionCatchingProxyBuilder', params.exceptionCatchingProxyBuilder)
        })
      })
    })
  })
})

describe('GraphqlResolversBuilder', () => {
  describe('.create()', () => {
    const mockExceptionCatchingProxyBuilder = new ExceptionCatchingProxyBuilder({
      alternativeExceptionMap: new Map(),
    })

    describe('to be instance of own class', () => {
      const cases = [
        {
          title: 'with all params',
          params: {
            filterSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            actualResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            stubResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
        },
        {
          title: 'without filterSchemaHash',
          params: {
            // filterSchemaHash: {
            //   customer: BaseResolver.create(),
            //   products: BaseResolver.create(),
            // },
            actualResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            stubResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
        },
        {
          title: 'without actualResolverSchemaHash',
          params: {
            filterSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            // actualResolverSchemaHash: {
            //   customer: BaseResolver.create(),
            //   products: BaseResolver.create(),
            // },
            stubResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
        },
        {
          title: 'without stubResolverSchemaHash',
          params: {
            filterSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            actualResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            // stubResolverSchemaHash: {
            //   customer: BaseResolver.create(),
            //   products: BaseResolver.create(),
            // },
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
        },
        {
          title: 'with exceptionCatchingProxyBuilder only',
          params: {
            // filterSchemaHash: {
            //   customer: BaseResolver.create(),
            //   products: BaseResolver.create(),
            // },
            // actualResolverSchemaHash: {
            //   customer: BaseResolver.create(),
            //   products: BaseResolver.create(),
            // },
            // stubResolverSchemaHash: {
            //   customer: BaseResolver.create(),
            //   products: BaseResolver.create(),
            // },
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
        },
      ]

      test.each(cases)('$params.title', ({ params }) => {
        const builder = GraphqlResolversBuilder.create(params)

        expect(builder)
          .toBeInstanceOf(GraphqlResolversBuilder)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          title: 'with all params',
          params: {
            filterSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            actualResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            stubResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
          expected: {
            filterSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            actualResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            stubResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
        },
        {
          title: 'without filterSchemaHash',
          params: {
            // filterSchemaHash: {
            //   customer: BaseResolver.create(),
            //   products: BaseResolver.create(),
            // },
            actualResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            stubResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
          expected: {
            filterSchemaHash: {},
            actualResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            stubResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
        },
        {
          title: 'without actualResolverSchemaHash',
          params: {
            filterSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            // actualResolverSchemaHash: {
            //   customer: BaseResolver.create(),
            //   products: BaseResolver.create(),
            // },
            stubResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
          expected: {
            filterSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            actualResolverSchemaHash: {},
            stubResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
        },
        {
          title: 'without stubResolverSchemaHash',
          params: {
            filterSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            actualResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            // stubResolverSchemaHash: {
            //   customer: BaseResolver.create(),
            //   products: BaseResolver.create(),
            // },
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
          expected: {
            filterSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            actualResolverSchemaHash: {
              customer: BaseResolver.create(),
              products: BaseResolver.create(),
            },
            stubResolverSchemaHash: {},
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
        },
        {
          title: 'with exceptionCatchingProxyBuilder only',
          params: {
            // filterSchemaHash: {
            //   customer: BaseResolver.create(),
            //   products: BaseResolver.create(),
            // },
            // actualResolverSchemaHash: {
            //   customer: BaseResolver.create(),
            //   products: BaseResolver.create(),
            // },
            // stubResolverSchemaHash: {
            //   customer: BaseResolver.create(),
            //   products: BaseResolver.create(),
            // },
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
          expected: {
            filterSchemaHash: {},
            actualResolverSchemaHash: {},
            stubResolverSchemaHash: {},
            exceptionCatchingProxyBuilder: mockExceptionCatchingProxyBuilder,
          },
        },
      ]

      test.each(cases)('$params.title', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(GraphqlResolversBuilder)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('GraphqlResolversBuilder', () => {
  describe('.createAsync()', () => {
    const AlphaEngine = class extends BaseGraphqlServerEngine {
      // /** @override */
      generateFilterHandler () {
        return async () => {}
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
    }
    const BetaEngine = class extends BaseGraphqlServerEngine {
      // /** @override */
      generateFilterHandler () {
        return async () => {}
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
    }

    /** @type {GraphqlType.Config} */
    const mockConfig = /** @type {*} */ ({
      actualResolversPath: rootPath.to('app/server/graphql/resolvers/customer/actual/'),
      stubResolversPath: rootPath.to('app/server/graphql/resolvers/customer/stub/'),
    })

    /** @type {GraphqlType.Share} */
    const mockShare = /** @type {*} */ ({
      env,
    })

    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            engine: AlphaEngine.create({
              config: mockConfig,
              share: mockShare,
            }),
          },
        },
        {
          params: {
            engine: BetaEngine.create({
              config: mockConfig,
              share: mockShare,
            }),
          },
        },
      ]

      test.each(cases)('actualResolversPath: $params.actualResolversPath', async ({ params }) => {
        const builder = await GraphqlResolversBuilder.createAsync(params)

        expect(builder)
          .toBeInstanceOf(GraphqlResolversBuilder)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            engine: AlphaEngine.create({
              config: mockConfig,
              share: mockShare,
            }),
          },
        },
        {
          params: {
            engine: AlphaEngine.create({
              config: mockConfig,
              share: mockShare,
            }),
          },
        },
      ]

      test.each(cases)('actualResolversPath: $params.actualResolversPath', async ({ params }) => {
        const expected = {
          filterSchemaHash: {},
          actualResolverSchemaHash: {},
          stubResolverSchemaHash: {},
          exceptionCatchingProxyBuilder: expect.any(ExceptionCatchingProxyBuilder),
        }

        const buildResolverSchemaHashSpy = jest.spyOn(GraphqlResolversBuilder, 'buildResolverSchemaHash')
          .mockResolvedValue(null)

        const SpyClass = globalThis.constructorSpy.spyOn(GraphqlResolversBuilder)

        await SpyClass.createAsync(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)

        expect(buildResolverSchemaHashSpy)
          .toHaveBeenCalledTimes(2)

        buildResolverSchemaHashSpy.mockRestore()
      })
    })
  })
})

describe('GraphqlResolversBuilder', () => {
  describe('.buildFilterSchemaHash()', () => {
    describe('to be filter schema hash', () => {
      /** @type {GraphqlType.Config} */
      const configMock = /** @type {*} */ ({})

      /** @type {GraphqlType.Share} */
      const shareMock = /** @type {*} */ ({})

      const engineCases = [
        {
          params: {
            Engine: class AlphaEngine extends BaseGraphqlServerEngine {
              /** @override */
              get schemasToSkipFiltering () {
                return [
                  'statistics',
                ]
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
          cases: [
            {
              actualSchemas: [
                'customer',
                'products',
                'statistics',
              ],
              expected: {
                customer: expect.any(Function),
                products: expect.any(Function),
                statistics: null,
              },
            },
            {
              actualSchemas: [
                'customer',
                'products',
              ],
              expected: {
                customer: expect.any(Function),
                products: expect.any(Function),
                statistics: null,
              },
            },
            {
              actualSchemas: [
                'statistics',
              ],
              expected: {
                statistics: null,
              },
            },
          ],
        },
        {
          params: {
            Engine: class BetaEngine extends BaseGraphqlServerEngine {
              /** @override */
              get schemasToSkipFiltering () {
                return []
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
          cases: [
            {
              actualSchemas: [],
              expected: {},
            },
          ],
        },
        {
          params: {
            Engine: class GammaEngine extends BaseGraphqlServerEngine {
              /** @override */
              get schemasToSkipFiltering () {
                return [
                  'customers',
                  'products',
                ]
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
          cases: [
            {
              actualSchemas: [
                'customers',
                'products',
                'statistics',
              ],
              expected: {
                customers: null,
                products: null,
                statistics: expect.any(Function),
              },
            },
          ],
        },
        {
          params: {
            Engine: class DeltaEngine extends BaseGraphqlServerEngine {
              /** @override */
              get schemasToSkipFiltering () {
                return [
                  'customer',
                  'products',
                  'statistics',
                ]
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
          cases: [
            {
              actualSchemas: [
                'customer',
                'products',
                'statistics',
              ],
              expected: {
                customer: null,
                products: null,
                statistics: null,
              },
            },
          ],
        },
      ]

      describe.each(engineCases)('Engine: $params.Engine.name', ({ params, cases }) => {
        const engine = params.Engine.create({
          config: configMock,
          share: shareMock,
        })

        test.each(cases)('actualSchemas: $actualSchemas', async ({ actualSchemas, expected }) => {
          const filterHandlerTally = /** @type {never} */ (async () => {})

          jest.spyOn(engine, 'generateFilterHandler')
            .mockReturnValue(filterHandlerTally)

          const actual = await GraphqlResolversBuilder.buildFilterSchemaHash({
            engine,
            actualSchemas,
          })

          expect(actual)
            .toEqual(expected)
        })
      })
    })
  })
})

describe('GraphqlResolversBuilder', () => {
  describe('.createFilterSchemaHashBuilder()', () => {
    describe('to be instance of FilterSchemaHashBuilder', () => {
      const cases = [
        {
          params: {
            skipSchemaHash: {
              allowedSchemas: [],
              ignoredSchemas: [],
            },
          },
        },
        {
          params: {
            skipSchemaHash: {
              allowedSchemas: null,
              ignoredSchemas: [],
            },
          },
        },
        {
          params: {
            skipSchemaHash: {
              allowedSchemas: [],
              ignoredSchemas: null,
            },
          },
        },
      ]

      test.each(cases)('skipSchemaHash: $params.skipSchemaHash', ({ params }) => {
        const actual = GraphqlResolversBuilder.createFilterSchemaHashBuilder(params)

        expect(actual)
          .toBeInstanceOf(FilterSchemaHashBuilder)
      })
    })

    describe('to call FilterSchemaHashBuilder.create()', () => {
      const cases = [
        {
          params: {
            skipSchemaHash: {
              allowedSchemas: [],
              ignoredSchemas: [],
            },
          },
        },
        {
          params: {
            skipSchemaHash: {
              allowedSchemas: null,
              ignoredSchemas: [],
            },
          },
        },
        {
          params: {
            skipSchemaHash: {
              allowedSchemas: [],
              ignoredSchemas: null,
            },
          },
        },
      ]

      test.each(cases)('skipSchemaHash: $params.skipSchemaHash', ({ params }) => {
        const createSpy = jest.spyOn(FilterSchemaHashBuilder, 'create')

        GraphqlResolversBuilder.createFilterSchemaHashBuilder(params)

        expect(createSpy)
          .toHaveBeenCalledWith(params.skipSchemaHash)
      })
    })
  })
})

describe('GraphqlResolversBuilder', () => {
  describe('.buildResolverSchemaHash()', () => {
    describe('to be resolver schema hash', () => {
      const cases = [
        {
          params: {
            poolPath: rootPath.to('app/server/graphql/resolvers/customer/actual/'),
          },
          expected: {
            chatMessages: expect.any(BaseQueryResolver),
            chatRooms: expect.any(BaseQueryResolver),
            companySponsors: expect.any(BaseQueryResolver),
            customer: expect.any(BaseQueryResolver),
            messages: expect.any(BaseQueryResolver),

            createChatRoom: expect.any(BaseMutationResolver),
            postNotification: expect.any(BaseMutationResolver),
            sendChatMessage: expect.any(BaseMutationResolver),

            renewAccessToken: expect.any(BaseMutationResolver),
            signIn: expect.any(BaseMutationResolver),
            uploadArrayImages: expect.any(BaseMutationResolver),
            uploadDeepPropertyImages: expect.any(BaseMutationResolver),
            uploadImage: expect.any(BaseMutationResolver),

            onReceiveMessage: expect.any(BaseSubscriptionResolver),
          },
        },
        {
          params: {
            poolPath: rootPath.to('app/server/graphql/resolvers/customer/stub/'),
          },
          expected: {
            companySponsors: expect.any(BaseQueryResolver),
            curriculums: expect.any(BaseQueryResolver),
            customerAmounts: expect.any(BaseQueryResolver),
            paginationArticles: expect.any(BaseQueryResolver),

            postAppointment: expect.any(BaseMutationResolver),
            signIn: expect.any(BaseMutationResolver),
            signUp: expect.any(BaseMutationResolver),
            uploadCustomerForumPostImage: expect.any(BaseMutationResolver),
            uploadImage: expect.any(BaseMutationResolver),
          },
        },
        {
          params: {
            poolPath: rootPath.to('app/server/graphql/resolvers/admin/actual/'),
          },
          expected: {
            customers: expect.any(BaseQueryResolver),

            signUp: expect.any(BaseMutationResolver),
          },
        },
        {
          params: {
            poolPath: rootPath.to('app/server/graphql/resolvers/admin/stub/'),
          },
          expected: {
            assets: expect.any(BaseQueryResolver),
            customers: expect.any(BaseQueryResolver),

            signIn: expect.any(BaseMutationResolver),
            signUp: expect.any(BaseMutationResolver),
          },
        },
      ]

      test.each(cases)('poolPath: $params.poolPath', async ({ params, expected }) => {
        const actual = await GraphqlResolversBuilder.buildResolverSchemaHash(params)

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to be null', () => {
      test('poolPath: null', async () => {
        const args = {
          poolPath: null,
        }

        const actual = await GraphqlResolversBuilder.buildResolverSchemaHash(args)

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('GraphqlResolversBuilder', () => {
  describe('.extractSchemas()', () => {
    const cases = [
      {
        params: {
          schemaHash: {
            customer: BaseResolver.create(),
            products: BaseResolver.create(),
          },
        },
        expected: [
          'customer',
          'products',
        ],
      },
      {
        params: {
          schemaHash: {
            customers: BaseResolver.create(),
            statistics: BaseResolver.create(),
          },
        },
        expected: [
          'customers',
          'statistics',
        ],
      },
      {
        params: {
          schemaHash: {},
        },
        expected: [],
      },
      {
        params: {
          schemaHash: null,
        },
        expected: [],
      },
    ]

    test.each(cases)('schemaHash: $params.schemaHash', ({ params, expected }) => {
      const actual = GraphqlResolversBuilder.extractSchemas(params)

      expect(actual)
        .toStrictEqual(expected)
    })
  })
})

describe('GraphqlResolversBuilder', () => {
  describe('.createExceptionCatchingProxyBuilder()', () => {
    describe('to be instance of ExceptionCatchingProxyBuilder', () => {
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

        const actual = GraphqlResolversBuilder.createExceptionCatchingProxyBuilder({
          engine,
        })

        expect(actual)
          .toBeInstanceOf(ExceptionCatchingProxyBuilder)
      })
    })
  })
})

describe('GraphqlResolversBuilder', () => {
  describe('#get:Ctor', () => {
    describe('to be own class', () => {
      const cases = [
        {
          params: {
            exceptionCatchingProxyBuilder: new ExceptionCatchingProxyBuilder({
              alternativeExceptionMap: new Map([
                [
                  error => error,
                  error => error,
                ],
              ]),
            }),
          },
        },
        {
          params: {
            exceptionCatchingProxyBuilder: new ExceptionCatchingProxyBuilder({
              alternativeExceptionMap: new Map(),
            }),
          },
        },
      ]

      test.each(cases)('exceptionCatchingProxyBuilder: $params.exceptionCatchingProxyBuilder', ({ params }) => {
        const args = {
          filterSchemaHash: {},
          actualResolverSchemaHash: {},
          stubResolverSchemaHash: {},
          exceptionCatchingProxyBuilder: params.exceptionCatchingProxyBuilder,
        }
        const builder = new GraphqlResolversBuilder(args)

        const actual = builder.Ctor

        expect(actual)
          .toBe(GraphqlResolversBuilder)
      })
    })
  })
})

describe('GraphqlResolversBuilder', () => {
  describe('#generateResolverResolveCallback()', () => {
    const AlphaResolver = class extends BaseResolver {
      async resolve () {
        // noop
      }
    }
    const BetaResolver = class extends BaseResolver {
      async resolve () {
        // noop
      }
    }
    const GammaResolver = class extends BaseResolver {
      async resolve () {
        // noop
      }
    }
    const DeltaResolver = class extends BaseResolver {
      async resolve () {
        // noop
      }
    }

    const engineCases = [
      {
        params: {
          Engine: CustomerGraphqlServerEngine,
        },
        cases: [
          {
            input: {
              filter: async () => {},
              resolver: AlphaResolver.create(),
            },
          },
          {
            input: {
              filter: async () => {},
              resolver: BetaResolver.create(),
            },
          },
        ],
      },
      {
        params: {
          Engine: AdminGraphqlServerEngine,
        },
        cases: [
          {
            input: {
              filter: async () => {},
              resolver: GammaResolver.create(),
            },
          },
          {
            input: {
              filter: async () => {},
              resolver: DeltaResolver.create(),
            },
          },
        ],
      },
    ]

    describe('to be function', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params, cases }) => {
        test.each(cases)('resolver: $input', async ({ input }) => {
          const engine = await params.Engine.createAsync()

          const builder = await GraphqlResolversBuilder.createAsync({
            engine,
          })

          const actual = builder.generateResolverResolveCallback(input)

          expect(actual)
            .toBeInstanceOf(Function)
        })
      })
    })

    describe('to be generated function by ExceptionCatchingProxyBuilder', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params, cases }) => {
        test.each(cases)('resolver: $input', async ({ input }) => {
          const engine = await params.Engine.createAsync()

          const builder = await GraphqlResolversBuilder.createAsync({
            engine,
          })

          const argsExpected = {
            realFunction: expect.any(Function),
          }

          const functionTally = /** @type {never} */ (
            async () => {}
          )

          const buildProxyAsyncSpy = jest.spyOn(builder.exceptionCatchingProxyBuilder, 'buildProxyAsync')
            .mockReturnValue(functionTally)

          const actual = builder.generateResolverResolveCallback(input)

          expect(actual)
            .toBe(functionTally) // same reference

          expect(buildProxyAsyncSpy)
            .toHaveBeenCalledWith(argsExpected)
        })
      })
    })

    describe('to call argument function from generated function', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params, cases }) => {
        test.each(cases)('resolver: $input', async ({ input }) => {
          const engine = await params.Engine.createAsync()

          const builder = await GraphqlResolversBuilder.createAsync({
            engine,
          })

          const filterSpy = jest.spyOn(input, 'filter')
          const resolveSpy = jest.spyOn(input.resolver, 'resolve')

          /** @type {GraphqlType.ResolverInputParent} */
          const parentArgument = {}

          /** @type {GraphqlType.ResolverInputVariables} */
          const variablesArgument = {}

          /** @type {GraphqlType.ResolverInputContext} */
          const contextArgument = /** @type {*} */ ({
            tally: Symbol('tally'),
          })

          /** @type {GraphqlType.ResolverInputInformation} */
          const informationArgument = /** @type {*} */ ({})

          const envelopeTally = {
            parent: parentArgument,
            variables: variablesArgument,
            context: contextArgument,
            information: informationArgument,
          }

          const generatedFunction = builder.generateResolverResolveCallback(input)

          await generatedFunction(
            parentArgument,
            variablesArgument,
            contextArgument,
            informationArgument
          )

          expect(filterSpy)
            .toHaveBeenCalledWith(envelopeTally)
          expect(resolveSpy)
            .toHaveBeenCalledWith(envelopeTally)
        })
      })
    })
  })
})

describe('GraphqlResolversBuilder', () => {
  describe('#generateSubscribeCallback()', () => {
    const AlphaResolver = class extends BaseSubscriptionResolver {
      async subscribe () {
        return {
          [Symbol.asyncIterator]: expect.any(Function),
        }
      }

      async resolve () {
        // noop
      }
    }
    const BetaResolver = class extends BaseSubscriptionResolver {
      async subscribe () {
        return {
          [Symbol.asyncIterator]: expect.any(Function),
        }
      }

      async resolve () {
        // noop
      }
    }
    const GammaResolver = class extends BaseSubscriptionResolver {
      async subscribe () {
        return {
          [Symbol.asyncIterator]: expect.any(Function),
        }
      }

      async resolve () {
        // noop
      }
    }
    const DeltaResolver = class extends BaseSubscriptionResolver {
      async subscribe () {
        return {
          [Symbol.asyncIterator]: expect.any(Function),
        }
      }

      async resolve () {
        // noop
      }
    }

    const engineCases = [
      {
        params: {
          Engine: CustomerGraphqlServerEngine,
        },
        cases: [
          {
            input: {
              filter: async () => {},
              resolver: AlphaResolver.create(),
            },
          },
          {
            input: {
              filter: async () => {},
              resolver: BetaResolver.create(),
            },
          },
        ],
      },
      {
        params: {
          Engine: AdminGraphqlServerEngine,
        },
        cases: [
          {
            input: {
              filter: async () => {},
              resolver: GammaResolver.create(),
            },
          },
          {
            input: {
              filter: async () => {},
              resolver: DeltaResolver.create(),
            },
          },
        ],
      },
    ]

    describe('to be function', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params, cases }) => {
        test.each(cases)('resolver: $input', async ({ input }) => {
          const engine = await params.Engine.createAsync()

          const builder = await GraphqlResolversBuilder.createAsync({
            engine,
          })

          const actual = builder.generateSubscribeCallback(input)

          expect(actual)
            .toBeInstanceOf(Function)
        })
      })
    })

    describe('to be generated function by ExceptionCatchingProxyBuilder', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params, cases }) => {
        test.each(cases)('resolver: $input', async ({ input }) => {
          const engine = await params.Engine.createAsync()

          const builder = await GraphqlResolversBuilder.createAsync({
            engine,
          })

          const argsExpected = {
            realFunction: expect.any(Function),
          }

          const functionTally = /** @type {never} */ (
            async () => {}
          )

          const buildProxyAsyncSpy = jest.spyOn(builder.exceptionCatchingProxyBuilder, 'buildProxyAsync')
            .mockReturnValue(functionTally)

          const actual = builder.generateSubscribeCallback(input)

          expect(actual)
            .toBe(functionTally) // same reference

          expect(buildProxyAsyncSpy)
            .toHaveBeenCalledWith(argsExpected)
        })
      })
    })

    describe('to call argument function from generated function', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params, cases }) => {
        test.each(cases)('resolver: $input', async ({ input }) => {
          const engine = await params.Engine.createAsync()

          const builder = await GraphqlResolversBuilder.createAsync({
            engine,
          })

          const filterSpy = jest.spyOn(input, 'filter')
          const subscribeSpy = jest.spyOn(input.resolver, 'subscribe')

          /** @type {GraphqlType.ResolverInputParent} */
          const parentArgument = {}

          /** @type {GraphqlType.ResolverInputVariables} */
          const variablesArgument = {}

          /** @type {GraphqlType.ResolverInputContext} */
          const contextArgument = /** @type {*} */ ({
            tally: Symbol('tally'),
          })

          /** @type {GraphqlType.ResolverInputInformation} */
          const informationArgument = /** @type {*} */ ({})

          const envelopeTally = {
            parent: parentArgument,
            variables: variablesArgument,
            context: contextArgument,
            information: informationArgument,
          }

          const generatedFunction = builder.generateSubscribeCallback(input)

          await generatedFunction(
            parentArgument,
            variablesArgument,
            contextArgument,
            informationArgument
          )

          expect(filterSpy)
            .toHaveBeenCalledWith(envelopeTally)
          expect(subscribeSpy)
            .toHaveBeenCalledWith(envelopeTally)
        })
      })
    })
  })
})

describe('GraphqlResolversBuilder', () => {
  describe('#generateSubscriptionResolveCallback()', () => {
    const AlphaResolver = class extends BaseSubscriptionResolver {
      async subscribe () {
        return {
          [Symbol.asyncIterator]: expect.any(Function),
        }
      }

      resolve () {
        // noop
      }
    }
    const BetaResolver = class extends BaseSubscriptionResolver {
      async subscribe () {
        return {
          [Symbol.asyncIterator]: expect.any(Function),
        }
      }

      resolve () {
        // noop
      }
    }
    const GammaResolver = class extends BaseSubscriptionResolver {
      async subscribe () {
        return {
          [Symbol.asyncIterator]: expect.any(Function),
        }
      }

      resolve () {
        // noop
      }
    }
    const DeltaResolver = class extends BaseSubscriptionResolver {
      async subscribe () {
        return {
          [Symbol.asyncIterator]: expect.any(Function),
        }
      }

      resolve () {
        // noop
      }
    }

    const engineCases = [
      {
        params: {
          Engine: CustomerGraphqlServerEngine,
        },
        cases: [
          {
            input: {
              resolver: AlphaResolver.create(),
            },
          },
          {
            input: {
              resolver: BetaResolver.create(),
            },
          },
        ],
      },
      {
        params: {
          Engine: AdminGraphqlServerEngine,
        },
        cases: [
          {
            input: {
              resolver: GammaResolver.create(),
            },
          },
          {
            input: {
              resolver: DeltaResolver.create(),
            },
          },
        ],
      },
    ]

    describe('to be function', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params, cases }) => {
        test.each(cases)('resolver: $input', async ({ input }) => {
          const engine = await params.Engine.createAsync()

          const builder = await GraphqlResolversBuilder.createAsync({
            engine,
          })

          const actual = builder.generateSubscriptionResolveCallback(input)

          expect(actual)
            .toBeInstanceOf(Function)
        })
      })
    })

    describe('to be generated function by ExceptionCatchingProxyBuilder', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params, cases }) => {
        test.each(cases)('resolver: $input', async ({ input }) => {
          const engine = await params.Engine.createAsync()

          const builder = await GraphqlResolversBuilder.createAsync({
            engine,
          })

          const argsExpected = {
            realFunction: expect.any(Function),
          }

          const functionTally = /** @type {never} */ (
            async () => {}
          )

          const buildProxySpy = jest.spyOn(builder.exceptionCatchingProxyBuilder, 'buildProxy')
            .mockReturnValue(functionTally)

          const actual = builder.generateSubscriptionResolveCallback(input)

          expect(actual)
            .toBe(functionTally) // same reference

          expect(buildProxySpy)
            .toHaveBeenCalledWith(argsExpected)
        })
      })
    })

    describe('to call argument function from generated function', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params, cases }) => {
        test.each(cases)('resolver: $input', async ({ input }) => {
          const engine = await params.Engine.createAsync()

          const builder = await GraphqlResolversBuilder.createAsync({
            engine,
          })

          const resolveSpy = jest.spyOn(input.resolver, 'resolve')

          const payloadTally = {
            tally: Math.random(),
          }

          const generatedFunction = builder.generateSubscriptionResolveCallback(input)

          await generatedFunction(payloadTally)

          expect(resolveSpy)
            .toHaveBeenCalledWith(payloadTally)
        })
      })
    })
  })
})

describe('GraphqlResolversBuilder', () => {
  describe('#buildResolverHash()', () => {
    describe('to be resolver hash', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
          expected: {
            Query: {
              chatMessages: expect.any(Function),
              chatRooms: expect.any(Function),
              companySponsors: expect.any(Function),
              curriculums: expect.any(Function),
              customer: expect.any(Function),
              customerAmounts: expect.any(Function),
              messages: expect.any(Function),
              paginationArticles: expect.any(Function),
            },
            Mutation: {
              createChatRoom: expect.any(Function),
              postAppointment: expect.any(Function),
              postNotification: expect.any(Function),
              renewAccessToken: expect.any(Function),
              sendChatMessage: expect.any(Function),
              signIn: expect.any(Function),
              signUp: expect.any(Function),
              uploadArrayImages: expect.any(Function),
              uploadCustomerForumPostImage: expect.any(Function),
              uploadDeepPropertyImages: expect.any(Function),
              uploadImage: expect.any(Function),
            },
            Subscription: {
              onReceiveMessage: {
                subscribe: expect.any(Function),
                resolve: expect.any(Function),
              },
            },
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
          expected: {
            Query: {
              assets: expect.any(Function),
              customers: expect.any(Function),
            },
            Mutation: {
              signIn: expect.any(Function),
              signUp: expect.any(Function),
            },
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params, expected }) => {
        const engine = await params.Engine.createAsync()

        const builder = await GraphqlResolversBuilder.createAsync({
          engine,
        })

        const actual = await builder.buildResolverHash()

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})
