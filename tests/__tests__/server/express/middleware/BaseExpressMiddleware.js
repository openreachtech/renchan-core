import BaseExpressMiddleware from '../../../../../lib/server/express/middleware/BaseExpressMiddleware.js'

import BaseGraphqlServerEngine from '../../../../../lib/server/graphql/BaseGraphqlServerEngine.js'
import BaseGraphqlShare from '../../../../../lib/server/graphql/contexts/BaseGraphqlShare.js'
import BaseRestfulApiServerEngine from '../../../../../lib/server/restfulapi/BaseRestfulApiServerEngine.js'
import BaseRestfulApiShare from '../../../../../lib/server/restfulapi/contexts/BaseRestfulApiShare.js'

describe('BaseExpressMiddleware', () => {
  describe('constructor', () => {
    describe('should keep property', () => {
      describe('#engine', () => {
        /**
         * @type {Array<{
         *   input: {
         *     engine: GraphqlType.ServerEngine | RestfulApiType.ServerEngine
         *   }
         * }>}
         */
        const cases = [
          {
            input: {
              engine: BaseGraphqlServerEngine.create({
                config: {
                  graphqlEndpoint: '/graphql-customer',
                  staticPath: '/path/to/static/customer/',
                  schemaPath: '/path/to/schema-customer',
                  actualResolversPath: '/path/to/resolvers/customer/actual/',
                  stubResolversPath: '/path/to/resolvers/customer/stub/',
                  postWorkersPath: '/path/to/post-workers/customer/',
                },
                share: BaseGraphqlShare.create({
                  broker: null,
                }),
                errorHash: {},
              }),
            },
          },
          {
            input: {
              engine: BaseRestfulApiServerEngine.create({
                config: {
                  pathPrefix: '/v1',
                  renderersPath: '/path/to/renderers/customer/',
                  staticPath: '/path/to/static/customer/',
                },
                share: BaseRestfulApiShare.create(),
                errorResponseHash: {},
              }),
            },
          },
        ]

        test.each(cases)('engine: $input.engine.constructor.name', ({ input }) => {
          const received = new BaseExpressMiddleware(input)

          expect(received)
            .toHaveProperty('engine', input.engine)
        })
      })
    })
  })
})

describe('BaseExpressMiddleware', () => {
  describe('.create()', () => {
    class AlphaExpressMiddleware extends BaseExpressMiddleware {}

    class BetaExpressMiddleware extends BaseExpressMiddleware {}

    const graphqlEngine = BaseGraphqlServerEngine.create({
      config: {
        graphqlEndpoint: '/graphql-customer',
        staticPath: '/path/to/static/customer/',
        schemaPath: '/path/to/schema-customer',
        actualResolversPath: '/path/to/resolvers/customer/actual/',
        stubResolversPath: '/path/to/resolvers/customer/stub/',
        postWorkersPath: '/path/to/post-workers/customer/',
      },
      share: BaseGraphqlShare.create({
        broker: null,
      }),
      errorHash: {},
    })
    const restfulEngine = BaseRestfulApiServerEngine.create({
      config: {
        pathPrefix: '/v1',
        renderersPath: '/path/to/renderers/customer/',
        staticPath: '/path/to/static/customer/',
      },
      share: BaseRestfulApiShare.create(),
      errorResponseHash: {},
    })

    describe('should be an instance of own class', () => {
      const cases = [
        {
          input: {
            Ctor: BaseExpressMiddleware,
            engine: graphqlEngine,
          },
        },
        {
          input: {
            Ctor: AlphaExpressMiddleware,
            engine: restfulEngine,
          },
        },
        {
          input: {
            Ctor: BetaExpressMiddleware,
            engine: graphqlEngine,
          },
        },
      ]

      test.each(cases)('Ctor: $input.Ctor.name', ({ input }) => {
        const args = {
          engine: input.engine,
        }

        const received = input.Ctor.create(args)

        expect(received)
          .toBeInstanceOf(input.Ctor)
      })
    })

    describe('should call constructor', () => {
      const cases = [
        {
          input: {
            Ctor: BaseExpressMiddleware,
          },
          tally: {
            engine: graphqlEngine,
          },
        },
        {
          input: {
            Ctor: AlphaExpressMiddleware,
          },
          tally: {
            engine: restfulEngine,
          },
        },
        {
          input: {
            Ctor: BetaExpressMiddleware,
          },
          tally: {
            engine: graphqlEngine,
          },
        },
      ]

      test.each(cases)('Ctor: $input.Ctor.name', ({ input, tally }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(input.Ctor)

        SpyClass.create(tally)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(tally)
      })
    })
  })
})

describe('BaseExpressMiddleware', () => {
  describe('#get:Ctor', () => {
    class AlphaExpressMiddleware extends BaseExpressMiddleware {}

    class BetaExpressMiddleware extends BaseExpressMiddleware {}

    describe('should be constructor of instance', () => {
      const cases = [
        {
          input: { Ctor: BaseExpressMiddleware },
          expected: BaseExpressMiddleware,
        },
        {
          input: { Ctor: AlphaExpressMiddleware },
          expected: AlphaExpressMiddleware,
        },
        {
          input: { Ctor: BetaExpressMiddleware },
          expected: BetaExpressMiddleware,
        },
      ]

      test.each(cases)('Ctor: $input.Ctor.name', ({ input, expected }) => {
        const middleware = new input.Ctor({
          engine: null,
        })

        const received = middleware.Ctor

        expect(received)
          .toBe(expected)
      })
    })
  })
})

describe('BaseExpressMiddleware', () => {
  describe('#get:share', () => {
    describe('should be share of engine', () => {
      const alphaShare = BaseGraphqlShare.create({
        broker: null,
      })
      const betaShare = BaseRestfulApiShare.create()

      /**
       * @type {Array<{
       *   input: {
       *     engine: GraphqlType.ServerEngine | RestfulApiType.ServerEngine
       *   }
       *   expected: GraphqlType.Share | RestfulApiType.Share
       * }>}
       */
      const cases = [
        {
          input: {
            engine: BaseGraphqlServerEngine.create({
              config: {
                graphqlEndpoint: '/graphql-customer',
                staticPath: '/path/to/static/customer/',
                schemaPath: '/path/to/schema-customer',
                actualResolversPath: '/path/to/resolvers/customer/actual/',
                stubResolversPath: '/path/to/resolvers/customer/stub/',
                postWorkersPath: '/path/to/post-workers/customer/',
              },
              share: alphaShare,
              errorHash: {},
            }),
          },
          expected: alphaShare,
        },
        {
          input: {
            engine: BaseRestfulApiServerEngine.create({
              config: {
                pathPrefix: '/v1',
                renderersPath: '/path/to/renderers/customer/',
                staticPath: '/path/to/static/customer/',
              },
              share: betaShare,
              errorResponseHash: {},
            }),
          },
          expected: betaShare,
        },
      ]

      test.each(cases)('engine: $input.engine.constructor.name', ({ input, expected }) => {
        const middleware = new BaseExpressMiddleware(input)

        const received = middleware.share

        expect(received)
          .toBe(expected)
      })
    })
  })
})

describe('BaseExpressMiddleware', () => {
  describe('#composeMiddleware()', () => {
    describe('when not inherited', () => {
      class AlphaExpressMiddleware extends BaseExpressMiddleware {}

      class BetaExpressMiddleware extends BaseExpressMiddleware {}

      const cases = [
        {
          input: { Ctor: BaseExpressMiddleware },
          expected: '101.X000.001 {"memberName":"BaseExpressMiddleware#composeMiddleware()"}',
        },
        {
          input: { Ctor: AlphaExpressMiddleware },
          expected: '101.X000.001 {"memberName":"AlphaExpressMiddleware#composeMiddleware()"}',
        },
        {
          input: { Ctor: BetaExpressMiddleware },
          expected: '101.X000.001 {"memberName":"BetaExpressMiddleware#composeMiddleware()"}',
        },
      ]

      test.each(cases)('Ctor: $input.Ctor.name', ({ input, expected }) => {
        const middleware = new input.Ctor({
          engine: null,
        })

        expect(() => middleware.composeMiddleware())
          .toThrow(expected)
      })
    })
  })
})
