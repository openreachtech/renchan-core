import BaseGraphqlPostWorker from '../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

import CustomerGraphqlServerEngine from '../../../../../app/server/graphql/CustomerGraphqlServerEngine.js'
import AdminGraphqlServerEngine from '../../../../../app/server/graphql/AdminGraphqlServerEngine.js'

import ConcreteMemberNotFoundGraphqlError from '../../../../../lib/server/graphql/errors/concretes/ConcreteMemberNotFoundGraphqlError.js'

describe('BaseGraphqlPostWorker', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
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

        const postWorker = new BaseGraphqlPostWorker({
          engine,
        })

        expect(postWorker)
          .toHaveProperty('engine', engine)
      })
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
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

        const postWorker = BaseGraphqlPostWorker.create({
          engine,
        })

        expect(postWorker)
          .toBeInstanceOf(BaseGraphqlPostWorker)
      })
    })

    describe('to call constructor', () => {
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

        const tallyArgs = {
          engine,
        }

        const SpyClass = globalThis.constructorSpy.spyOn(BaseGraphqlPostWorker)

        SpyClass.create(tallyArgs)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(tallyArgs)
      })
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('.createAsync()', () => {
    describe('to be instance of own class', () => {
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

        const postWorker = await BaseGraphqlPostWorker.createAsync({
          engine,
        })

        expect(postWorker)
          .toBeInstanceOf(BaseGraphqlPostWorker)
      })
    })

    describe('to call constructor', () => {
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

        const tallyArgs = {
          engine,
        }

        const SpyClass = globalThis.constructorSpy.spyOn(BaseGraphqlPostWorker)

        await SpyClass.createAsync(tallyArgs)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(tallyArgs)
      })
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('.get:schema', () => {
    test('to throw ConcreteMemberNotFoundGraphqlError', () => {
      expect(() => BaseGraphqlPostWorker.schema)
        .toThrow(expect.any(ConcreteMemberNotFoundGraphqlError))
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('#get:Ctor', () => {
    describe('to be own class', () => {
      const AlphaGraphqlPostWorker = class extends BaseGraphqlPostWorker {}
      const BetaGraphqlPostWorker = class extends BaseGraphqlPostWorker {}

      const cases = [
        {
          params: {
            PostWorker: AlphaGraphqlPostWorker,
            Engine: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            PostWorker: BetaGraphqlPostWorker,
            Engine: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('PostWorker: $params.PostWorker.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const postWorker = new params.PostWorker({
          engine,
        })

        const actual = postWorker.Ctor

        expect(actual)
          .toBe(params.PostWorker)
      })
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('#onResolved()', () => {
    describe('to throw ConcreteMemberNotFoundGraphqlError', () => {
      const AlphaGraphqlPostWorker = class extends BaseGraphqlPostWorker {}
      const BetaGraphqlPostWorker = class extends BaseGraphqlPostWorker {}

      const postWorkerCases = [
        {
          params: {
            PostWorker: AlphaGraphqlPostWorker,
            Engine: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            PostWorker: BetaGraphqlPostWorker,
            Engine: AdminGraphqlServerEngine,
          },
        },
      ]

      describe.each(postWorkerCases)('PostWorker: $params.PostWorker.name', ({ params }) => {
        /**
         * @type {Array<{
         *   envelope: {
         *     variables: {
         *       input: {
         *         userId: number
         *       }
         *     }
         *     context: GraphqlType.ResolverInputContext
         *     information: GraphqlType.ResolverInputInformation
         *     response: {
         *       output: GraphqlType.ResolverOutput | null
         *       error: Error | null
         *     }
         *   }
         * }>}
         */
        const cases = /** @type {*} */ ([
          {
            envelope: {
              variables: {
                input: {
                  userId: 10001,
                },
              },
              context: {},
              information: {},
              response: {
                output: {
                  username: 'John Doe',
                },
                error: null,
              },
            },
          },
          {
            envelope: {
              variables: {
                input: {
                  userId: 10002,
                },
              },
              context: {},
              information: {},
              response: {
                output: {
                  username: 'Jane Smith',
                },
                error: null,
              },
            },
          },
          {
            envelope: {
              variables: {
                input: {
                  userId: 10003,
                },
              },
              context: {},
              information: {},
              response: {
                output: null,
                error: new Error('I am the first error'),
              },
            },
          },
        ])

        test.each(cases)('variables: $envelope.variables', async ({ envelope }) => {
          const engine = await params.Engine.createAsync()

          const postWorker = new params.PostWorker({
            engine,
          })

          await expect(async () => {
            await postWorker.onResolved(envelope)
          })
            .rejects
            .toThrow(expect.any(ConcreteMemberNotFoundGraphqlError))
        })
      })
    })
  })
})
