import rootPath from '../../../../../lib/globals/root-path.js'

import GraphqlPostWorkerHashBuilder from '../../../../../lib/server/graphql/post-workers/GraphqlPostWorkerHashBuilder.js'

import CustomersQueryPostWorker from '../../../../haystacks/post-workers/admin/queries/CustomersQueryPostWorker.js'
import StatisticsQueryPostWorker from '../../../../haystacks/post-workers/admin/queries/StatisticsQueryPostWorker.js'
import BroadcastNotificationMutationPostWorker from '../../../../haystacks/post-workers/admin/mutations/BroadcastNotificationMutationPostWorker.js'
import { default as AdminSignInMutationPostWorker } from '../../../../haystacks/post-workers/admin/mutations/SignInMutationPostWorker.js'

import CompanySponsorsQueryPostWorker from '../../../../haystacks/post-workers/customer/queries/CompanySponsorsQueryPostWorker.js'
import CurriculumsQueryPostWorker from '../../../../haystacks/post-workers/customer/queries/CurriculumsQueryPostWorker copy.js'
import SendChatMessageMutationPostWorker from '../../../../haystacks/post-workers/customer/mutations/SendChatMessageMutationPostWorker.js'
import { default as CustomerSignInMutationPostWorker } from '../../../../haystacks/post-workers/customer/mutations/SignInMutationPostWorker.js'

import BaseGraphqlServerEngine from '../../../../../lib/server/graphql/BaseGraphqlServerEngine.js'
import BaseGraphqlShare from '../../../../../lib/server/graphql/contexts/BaseGraphqlShare.js'

describe('GraphqlPostWorkerHashBuilder', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      const serverEngineMock = new BaseGraphqlServerEngine({
        config: /** @type {*} */ ({}),
        share: /** @type {*} */ ({}),
        errorHash: {},
      })

      describe('#postWorkers', () => {
        const cases = [
          {
            params: {
              postWorkers: [
                new CustomersQueryPostWorker({
                  engine: serverEngineMock,
                }),
                new StatisticsQueryPostWorker({
                  engine: serverEngineMock,
                }),
                new BroadcastNotificationMutationPostWorker({
                  engine: serverEngineMock,
                }),
                new AdminSignInMutationPostWorker({
                  engine: serverEngineMock,
                }),
              ],
            },
          },
          {
            params: {
              postWorkers: [
                new CompanySponsorsQueryPostWorker({
                  engine: serverEngineMock,
                }),
                new CurriculumsQueryPostWorker({
                  engine: serverEngineMock,
                }),
                new SendChatMessageMutationPostWorker({
                  engine: serverEngineMock,
                }),
                new CustomerSignInMutationPostWorker({
                  engine: serverEngineMock,
                }),
              ],
            },
          },
        ]

        test.each(cases)('postWorkers: $params.postWorkers', ({ params }) => {
          const builder = new GraphqlPostWorkerHashBuilder(params)

          expect(builder)
            .toHaveProperty('postWorkers', params.postWorkers)
        })
      })
    })
  })
})

describe('GraphqlPostWorkerHashBuilder', () => {
  describe('.create()', () => {
    const serverEngineMock = new BaseGraphqlServerEngine({
      config: /** @type {*} */ ({}),
      share: /** @type {*} */ ({}),
      errorHash: {},
    })

    const cases = [
      {
        params: {
          postWorkers: [
            new CustomersQueryPostWorker({
              engine: serverEngineMock,
            }),
            new StatisticsQueryPostWorker({
              engine: serverEngineMock,
            }),
            new BroadcastNotificationMutationPostWorker({
              engine: serverEngineMock,
            }),
            new AdminSignInMutationPostWorker({
              engine: serverEngineMock,
            }),
          ],
        },
      },
      {
        params: {
          postWorkers: [
            new CompanySponsorsQueryPostWorker({
              engine: serverEngineMock,
            }),
            new CurriculumsQueryPostWorker({
              engine: serverEngineMock,
            }),
            new SendChatMessageMutationPostWorker({
              engine: serverEngineMock,
            }),
            new CustomerSignInMutationPostWorker({
              engine: serverEngineMock,
            }),
          ],
        },
      },
    ]

    describe('to be instance of own class', () => {
      test.each(cases)('postWorkers: $params.postWorkers', ({ params }) => {
        const builder = GraphqlPostWorkerHashBuilder.create(params)

        expect(builder)
          .toBeInstanceOf(GraphqlPostWorkerHashBuilder)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('postWorkers: $params.postWorkers', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(GraphqlPostWorkerHashBuilder)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('GraphqlPostWorkerHashBuilder', () => {
  describe('.createAsync()', () => {
    const AlphaServerEngine = class extends BaseGraphqlServerEngine {
      /** @override */
      static get config () {
        return {
          graphqlEndpoint: '/graphql-customer',
          staticPath: null,
          schemaPath: null,
          actualResolversPath: null,
          stubResolversPath: null,
          postWorkersPath: rootPath.to('tests/haystacks/post-workers/customer/'),
          redisOptions: null,
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

      /** @override */
      static get Share () {
        return class extends BaseGraphqlShare {}
      }
    }

    const BetaServerEngine = class extends BaseGraphqlServerEngine {
      /** @override */
      static get config () {
        return {
          graphqlEndpoint: '/graphql-customer',
          staticPath: null,
          schemaPath: null,
          actualResolversPath: null,
          stubResolversPath: null,
          postWorkersPath: rootPath.to('tests/haystacks/post-workers/admin/'),
          redisOptions: null,
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

      /** @override */
      static get Share () {
        return class extends BaseGraphqlShare {}
      }
    }

    const cases = [
      {
        params: {
          EngineCtor: AlphaServerEngine,
          postWorkersPath: rootPath.to('tests/haystacks/post-workers/customer/'),
        },
        expected: {
          postWorkers: [
            new CustomersQueryPostWorker({
              engine: expect.any(AlphaServerEngine),
            }),
            new StatisticsQueryPostWorker({
              engine: expect.any(AlphaServerEngine),
            }),
            new BroadcastNotificationMutationPostWorker({
              engine: expect.any(AlphaServerEngine),
            }),
            new AdminSignInMutationPostWorker({
              engine: expect.any(AlphaServerEngine),
            }),
          ],
        },
      },
      {
        params: {
          EngineCtor: BetaServerEngine,
          postWorkersPath: rootPath.to('tests/haystacks/post-workers/admin/'),
        },
        expected: {
          postWorkers: [
            new CompanySponsorsQueryPostWorker({
              engine: expect.any(BetaServerEngine),
            }),
            new CurriculumsQueryPostWorker({
              engine: expect.any(BetaServerEngine),
            }),
            new SendChatMessageMutationPostWorker({
              engine: expect.any(BetaServerEngine),
            }),
            new CustomerSignInMutationPostWorker({
              engine: expect.any(BetaServerEngine),
            }),
          ],
        },
      },
    ]

    describe('to be instance of own class', () => {
      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const engineArgs = {
          config: {
            graphqlEndpoint: '/graphql-endpoint',
            staticPath: null,
            schemaPath: null,
            actualResolversPath: null,
            stubResolversPath: null,
            postWorkersPath: params.postWorkersPath,
            redisOptions: null,
          },
          share: /** @type {*} */ ({}),
          errorHash: {},
        }
        const engine = new params.EngineCtor(engineArgs)

        const args = {
          engine,
        }

        const builder = await GraphqlPostWorkerHashBuilder.createAsync(args)

        expect(builder)
          .toBeInstanceOf(GraphqlPostWorkerHashBuilder)
      })
    })

    describe('to call .crate()', () => {
      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
        const engineArgs = {
          config: {
            graphqlEndpoint: '/graphql-endpoint',
            staticPath: null,
            schemaPath: null,
            actualResolversPath: null,
            stubResolversPath: null,
            postWorkersPath: params.postWorkersPath,
            redisOptions: null,
          },
          share: /** @type {*} */ ({}),
          errorHash: {},
        }
        const engine = new params.EngineCtor(engineArgs)

        const args = {
          engine,
        }

        const createSpy = jest.spyOn(GraphqlPostWorkerHashBuilder, 'create')

        await GraphqlPostWorkerHashBuilder.createAsync(args)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('GraphqlPostWorkerHashBuilder', () => {
  describe('.loadPostWorkers()', () => {
    describe('with existing path', () => {
      const AlphaServerEngine = class extends BaseGraphqlServerEngine {}
      const BetaServerEngine = class extends BaseGraphqlServerEngine {}

      const cases = [
        {
          params: {
            EngineCtor: AlphaServerEngine,
            postWorkersPath: rootPath.to('tests/haystacks/post-workers/customer/'),
          },
          expected: {
            postWorkers: [
              new CustomersQueryPostWorker({
                engine: expect.any(AlphaServerEngine),
              }),
              new StatisticsQueryPostWorker({
                engine: expect.any(AlphaServerEngine),
              }),
              new BroadcastNotificationMutationPostWorker({
                engine: expect.any(AlphaServerEngine),
              }),
              new AdminSignInMutationPostWorker({
                engine: expect.any(AlphaServerEngine),
              }),
            ],
          },
        },
        {
          params: {
            EngineCtor: BetaServerEngine,
            postWorkersPath: rootPath.to('tests/haystacks/post-workers/admin/'),
          },
          expected: {
            postWorkers: [
              new CompanySponsorsQueryPostWorker({
                engine: expect.any(BetaServerEngine),
              }),
              new CurriculumsQueryPostWorker({
                engine: expect.any(BetaServerEngine),
              }),
              new SendChatMessageMutationPostWorker({
                engine: expect.any(BetaServerEngine),
              }),
              new CustomerSignInMutationPostWorker({
                engine: expect.any(BetaServerEngine),
              }),
            ],
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
        const engineArgs = {
          config: {
            graphqlEndpoint: '/graphql-endpoint',
            staticPath: null,
            schemaPath: null,
            actualResolversPath: null,
            stubResolversPath: null,
            postWorkersPath: params.postWorkersPath,
            redisOptions: null,
          },
          share: /** @type {*} */ ({}),
          errorHash: {},
        }
        const engine = new params.EngineCtor(engineArgs)

        const args = {
          engine,
          poolPath: params.postWorkersPath,
        }

        const postWorkers = await GraphqlPostWorkerHashBuilder.loadPostWorkers(args)

        expect(postWorkers)
          .toEqual(expected.postWorkers)
      })
    })

    describe('without path', () => {
      const AlphaServerEngine = class extends BaseGraphqlServerEngine {}

      const BetaServerEngine = class extends BaseGraphqlServerEngine {}

      const cases = [
        {
          params: {
            EngineCtor: AlphaServerEngine,
          },
        },
        {
          params: {
            EngineCtor: BetaServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
        const engineArgs = {
          config: {
            graphqlEndpoint: '/graphql-endpoint',
            staticPath: null,
            schemaPath: null,
            actualResolversPath: null,
            stubResolversPath: null,
            postWorkersPath: null,
            redisOptions: null,
          },
          share: /** @type {*} */ ({}),
          errorHash: {},
        }
        const engine = new params.EngineCtor(engineArgs)

        const args = {
          engine,
          poolPath: params.postWorkersPath,
        }

        const postWorkers = await GraphqlPostWorkerHashBuilder.loadPostWorkers(args)

        expect(postWorkers)
          .toEqual([])
      })
    })
  })
})

describe('GraphqlPostWorkerHashBuilder', () => {
  describe('#buildOnResolvedSchemaHash()', () => {
    const AlphaServerEngine = class extends BaseGraphqlServerEngine {}
    const BetaServerEngine = class extends BaseGraphqlServerEngine {}

    const cases = [
      {
        params: {
          EngineCtor: AlphaServerEngine,
          postWorkersPath: rootPath.to('tests/haystacks/post-workers/customer/'),
        },
        expected: {
          companySponsors: expect.any(Function),
          curriculums: expect.any(Function),
          sendChatMessage: expect.any(Function),
          signIn: expect.any(Function),
        },
      },
      {
        params: {
          EngineCtor: BetaServerEngine,
          postWorkersPath: rootPath.to('tests/haystacks/post-workers/admin/'),
        },
        expected: {
          customers: expect.any(Function),
          statistics: expect.any(Function),
          broadcastNotification: expect.any(Function),
          signIn: expect.any(Function),
        },
      },
    ]

    test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
      const engineArgs = {
        config: {
          graphqlEndpoint: '/graphql-endpoint',
          staticPath: null,
          schemaPath: null,
          actualResolversPath: null,
          stubResolversPath: null,
          postWorkersPath: params.postWorkersPath,
          redisOptions: null,
        },
        share: /** @type {*} */ ({
          env: {
            NODE_ENV: 'development',
          },
        }),
        errorHash: {},
      }
      const engine = new params.EngineCtor(engineArgs)

      const builder = await GraphqlPostWorkerHashBuilder.createAsync({
        engine,
      })

      const actual = builder.buildOnResolvedSchemaHash()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('GraphqlPostWorkerHashBuilder', () => {
  describe('#buildPostWorkerHash()', () => {
    const AlphaServerEngine = class extends BaseGraphqlServerEngine {}
    const BetaServerEngine = class extends BaseGraphqlServerEngine {}

    const cases = [
      {
        params: {
          EngineCtor: AlphaServerEngine,
          postWorkersPath: rootPath.to('tests/haystacks/post-workers/customer/'),
        },
        expected: {
          companySponsors: new CompanySponsorsQueryPostWorker({
            engine: expect.any(AlphaServerEngine),
          }),
          curriculums: new CurriculumsQueryPostWorker({
            engine: expect.any(AlphaServerEngine),
          }),
          sendChatMessage: new SendChatMessageMutationPostWorker({
            engine: expect.any(AlphaServerEngine),
          }),
          signIn: new CustomerSignInMutationPostWorker({
            engine: expect.any(AlphaServerEngine),
          }),
        },
      },
      {
        params: {
          EngineCtor: BetaServerEngine,
          postWorkersPath: rootPath.to('tests/haystacks/post-workers/admin/'),
        },
        expected: {
          customers: new CustomersQueryPostWorker({
            engine: expect.any(BetaServerEngine),
          }),
          statistics: new StatisticsQueryPostWorker({
            engine: expect.any(BetaServerEngine),
          }),
          broadcastNotification: new BroadcastNotificationMutationPostWorker({
            engine: expect.any(BetaServerEngine),
          }),
          signIn: new AdminSignInMutationPostWorker({
            engine: expect.any(BetaServerEngine),
          }),
        },
      },
    ]

    test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
      const engineArgs = {
        config: {
          graphqlEndpoint: '/graphql-endpoint',
          staticPath: null,
          schemaPath: null,
          actualResolversPath: null,
          stubResolversPath: null,
          postWorkersPath: params.postWorkersPath,
          redisOptions: null,
        },
        share: /** @type {*} */ ({
          env: {
            NODE_ENV: 'development',
          },
        }),
        errorHash: {},
      }
      const engine = new params.EngineCtor(engineArgs)

      const builder = await GraphqlPostWorkerHashBuilder.createAsync({
        engine,
      })

      const actual = builder.buildPostWorkerHash()

      expect(actual)
        .toEqual(expected)
    })
  })
})
