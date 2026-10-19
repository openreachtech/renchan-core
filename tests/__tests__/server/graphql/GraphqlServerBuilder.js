import http from 'http'
import express from 'express'

import {
  execute,
  specifiedRules,
  subscribe,
  validate,
} from 'graphql'

import {
  WebSocketServer,
} from 'ws'
import {
  useServer,
} from 'graphql-ws/lib/use/ws'

import GraphqlServerBuilder from '../../../../lib/server/graphql/GraphqlServerBuilder.js'
import BaseGraphqlServerEngine from '../../../../lib/server/graphql/BaseGraphqlServerEngine.js'
import BaseGraphqlShare from '../../../../lib/server/graphql/contexts/BaseGraphqlShare.js'
import GraphqlHttpHandlerBuilder from '../../../../lib/server/graphql/GraphqlHttpHandlerBuilder.js'

import CustomerGraphqlServerEngine from '../../../../app/server/graphql/CustomerGraphqlServerEngine.js'
import AdminGraphqlServerEngine from '../../../../app/server/graphql/AdminGraphqlServerEngine.js'
import MiddlewareExpressRoute from '../../../../lib/server/express/routes/MiddlewareExpressRoute.js'
import GetMethodExpressRoute from '../../../../lib/server/express/routes/GetMethodExpressRoute.js'
import BaseExpressRoute from '../../../../lib/server/express/routes/BaseExpressRoute.js'
import GraphqlResolvedParcelPorter from '../../../../lib/server/graphql/post-workers/GraphqlResolvedParcelPorter.js'

describe('GraphqlServerBuilder', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      /** @type {import('../../../../lib/server/graphql/BaseGraphqlServerEngine.js').default} */
      const mockEngine = /** @type {*} */ ({})

      /** @type {GraphqlHttpHandlerBuilder} */
      const mockGraphqlHandlerBuilder = /** @type {*} */ ({})

      /** @type {ExpressType.Application} */
      const mockApp = /** @type {*} */ ({})

      describe('#engine', () => {
        const cases = [
          {
            params: {
              EngineCtor: CustomerGraphqlServerEngine,
            },
          },
          {
            params: {
              EngineCtor: AdminGraphqlServerEngine,
            },
          },
        ]

        test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
          const engine = await params.EngineCtor.createAsync()

          const builder = new GraphqlServerBuilder({
            engine,
            graphqlHandlerBuilder: mockGraphqlHandlerBuilder,
            app: mockApp,
          })

          expect(builder)
            .toHaveProperty('engine', engine)
        })
      })

      describe('#graphqlHandlerBuilder', () => {
        const cases = [
          {
            params: {
              builder: new GraphqlHttpHandlerBuilder({
                schema: /** @type {*} */ ({}),
                context: {
                  id: 10001,
                },
                rootValue: {},
                formatError: /** @type {*} */ ({}),
                validationRules: [],

                onResolved: async parcel => {},
                postWorkerHash: {},
                parcelPorter: new GraphqlResolvedParcelPorter({
                  parcelMap: new WeakMap(),
                }),
              }),
            },
          },
          {
            params: {
              builder: new GraphqlHttpHandlerBuilder({
                schema: /** @type {*} */ ({}),
                context: {
                  id: 10002,
                },
                rootValue: {},
                formatError: /** @type {*} */ ({}),
                validationRules: [],

                onResolved: async parcel => {},
                postWorkerHash: {},
                parcelPorter: new GraphqlResolvedParcelPorter({
                  parcelMap: new WeakMap(),
                }),
              }),
            },
          },
        ]

        test.each(cases)('builder: $params.builder.context.id', async ({ params }) => {
          const builder = new GraphqlServerBuilder({
            engine: mockEngine,
            graphqlHandlerBuilder: params.builder,
            app: mockApp,
          })

          expect(builder)
            .toHaveProperty('graphqlHandlerBuilder', params.builder)
        })
      })

      describe('#app', () => {
        const cases = [
          {
            params: {
              path: '/',
              app: express()
                .use('/', () => {}),
            },
          },
          {
            params: {
              path: '/graphql',
              app: express()
                .use('/graphql', () => {}),
            },
          },
        ]

        test.each(cases)('path: $params.path', async ({ params }) => {
          const builder = new GraphqlServerBuilder({
            engine: mockEngine,
            graphqlHandlerBuilder: mockGraphqlHandlerBuilder,
            app: params.app,
          })

          expect(builder)
            .toHaveProperty('app', params.app)
        })
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('.create()', () => {
    /** @type {GraphqlHttpHandlerBuilder} */
    const mockGraphqlHandlerBuilder = /** @type {*} */ ({})

    /** @type {ExpressType.Application} */
    const mockApp = /** @type {*} */ ({})

    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const engine = await params.EngineCtor.createAsync()

        const args = {
          engine,
          graphqlHandlerBuilder: mockGraphqlHandlerBuilder,
          app: mockApp,
        }

        const actual = GraphqlServerBuilder.create(args)

        expect(actual)
          .toBeInstanceOf(GraphqlServerBuilder)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(GraphqlServerBuilder)

        const engine = await params.EngineCtor.createAsync()

        const args = {
          engine,
          graphqlHandlerBuilder: mockGraphqlHandlerBuilder,
          app: mockApp,
        }

        SpyClass.create(args)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('.createAsync()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const args = {
          Engine: params.EngineCtor,
        }

        const actual = await GraphqlServerBuilder.createAsync(args)

        expect(actual)
          .toBeInstanceOf(GraphqlServerBuilder)
      })
    })

    describe('to call .create()', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
            app: express()
              .use('/', () => {}),
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
            app: express()
              .use('/graphql', () => {}),
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const expected = {
          engine: expect.any(params.EngineCtor),
          graphqlHandlerBuilder: expect.any(GraphqlHttpHandlerBuilder),
          app: params.app,
        }

        const createExpressApplicationSpy = jest.spyOn(GraphqlServerBuilder, 'createExpressApplication')
          .mockReturnValue(params.app)

        const SpyClass = globalThis.constructorSpy.spyOn(GraphqlServerBuilder)

        const args = {
          Engine: params.EngineCtor,
        }

        await SpyClass.createAsync(args)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)

        createExpressApplicationSpy.mockRestore()
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('.createExpressApplication()', () => {
    describe('to be fixed value', () => {
      test('to be express application', () => {
        const actual = GraphqlServerBuilder.createExpressApplication()

        expect(actual)
          .toBeInstanceOf(Function)
        expect(actual)
          .toHaveProperty('name', 'app')
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('.get:WebSocketServer', () => {
    test('to be bridge class', () => {
      const actual = GraphqlServerBuilder.WebSocketServer

      expect(actual)
        .toBe(WebSocketServer) // same reference
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('.get:useServerHandler', () => {
    test('to be bridge function', () => {
      const actual = GraphqlServerBuilder.useServerHandler

      expect(actual)
        .toBe(useServer) // same reference
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('.get:validate', () => {
    test('to be bridge function', () => {
      const received = GraphqlServerBuilder.validate

      expect(received)
        .toBe(validate) // same reference
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('.get:specifiedRules', () => {
    test('to be bridge value', () => {
      const received = GraphqlServerBuilder.specifiedRules

      expect(received)
        .toBe(specifiedRules) // same reference
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#mountRouteToApp()', () => {
    describe('to mount to #app', () => {
      const cases = [
        {
          label: 'with one route',
          params: {
            routes: [
              MiddlewareExpressRoute.create({
                path: '/',
                handlers: [
                  () => {},
                ],
              }),
            ],
          },
          expected: 1,
        },
        {
          label: 'with two routes',
          params: {
            routes: [
              MiddlewareExpressRoute.create({
                path: '/graphql',
                handlers: [
                  () => {},
                ],
              }),
              GetMethodExpressRoute.create({
                path: '/customer',
                handlers: [
                  () => {},
                ],
              }),
            ],
          },
          expected: 2,
        },
        {
          label: 'with no routes',
          params: {
            routes: [],
          },
          expected: 0,
        },
      ]

      test.each(cases)('$params.label', async ({ params, expected }) => {
        const engine = await CustomerGraphqlServerEngine.createAsync()

        const graphqlHandlerBuilder = await GraphqlHttpHandlerBuilder.createAsync({
          engine,
        })
        const baseApp = express()

        const builderArgs = {
          engine,
          graphqlHandlerBuilder,
          app: baseApp,
        }
        const builder = new GraphqlServerBuilder(builderArgs)

        const mountToSpy = jest.spyOn(BaseExpressRoute.prototype, 'mountTo')

        const mountArgs = {
          routes: params.routes,
        }
        const mountedApp = builder.mountRouteToApp(mountArgs)

        expect(mountedApp)
          .toBe(baseApp) // Same instance
        expect(mountToSpy)
          .toHaveBeenCalledTimes(expected)
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#applyExpressSettings()', () => {
    describe('to set settings to Express application', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
            settingsTally: {
              'case sensitive routing': true,
              'strict routing': true,
            },
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
            settingsTally: {
              'case sensitive routing': false,
            },
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        jest.spyOn(builder, 'collectExpressSettings')
          .mockReturnValue(params.settingsTally)

        const actual = builder.applyExpressSettings()

        const actualSettings = Object.fromEntries(
          Object.keys(params.settingsTally)
            .map(key => [
              key,
              actual.get(key),
            ])
        )

        expect(actual)
          .toBe(builder.app) // same reference
        expect(actualSettings)
          .toEqual(params.settingsTally)
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#collectExpressRoutes()', () => {
    describe('when call on development/live environment as is', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
          },
        },
        {
          params: {
            EngineCtor: class StagingCustomerGraphqlServerEngine extends CustomerGraphqlServerEngine {
              get env () {
                return /** @type {*} */ ({
                  NODE_ENV: 'staging',
                  isPreProduction: () => true,
                  isProduction: () => false,
                })
              }
            },
          },
        },
        {
          params: {
            EngineCtor: class LiveAdminGraphqlServerEngine extends AdminGraphqlServerEngine {
              get env () {
                return /** @type {*} */ ({
                  NODE_ENV: 'live',
                  isPreProduction: () => true,
                  isProduction: () => false,
                })
              }
            },
          },
        },
      ]

      describe('to be fixed value', () => {
        test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
          const expected = [
            expect.any(MiddlewareExpressRoute),
            expect.any(GetMethodExpressRoute),
          ]

          const args = {
            Engine: params.EngineCtor,
          }
          const builder = await GraphqlServerBuilder.createAsync(args)

          const actual = builder.collectExpressRoutes()

          expect(actual)
            .toEqual(expected)
        })
      })

      describe('to call members', () => {
        test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
          const args = {
            Engine: params.EngineCtor,
          }
          const builder = await GraphqlServerBuilder.createAsync(args)

          const collectMiddlewareSpy = jest.spyOn(GraphqlServerBuilder.prototype, 'collectMiddleware')
          const createGraphiqlRouteSpy = jest.spyOn(GraphqlServerBuilder.prototype, 'createGraphiqlRoute')

          builder.collectExpressRoutes()

          expect(collectMiddlewareSpy)
            .toHaveBeenCalledWith()
          expect(createGraphiqlRouteSpy)
            .toHaveBeenCalledWith()

          collectMiddlewareSpy.mockRestore()
          createGraphiqlRouteSpy.mockRestore()
        })
      })
    })

    describe('when call on production', () => {
      /**
       * @type {Array<{
       *   params: {
       *     EngineCtor: GraphqlType.ServerEngineCtor
       *   }
       * }>}
       */
      const cases = [
        {
          params: {
            EngineCtor: class extends CustomerGraphqlServerEngine {
              get env () {
                return /** @type {*} */ ({
                  NODE_ENV: 'production',
                  isPreProduction: () => false,
                  isProduction: () => true,
                })
              }
            },
          },
        },
        {
          params: {
            EngineCtor: class extends AdminGraphqlServerEngine {
              get env () {
                return /** @type {*} */ ({
                  NODE_ENV: 'production',
                  isPreProduction: () => false,
                  isProduction: () => true,
                })
              }
            },
          },
        },
      ]

      describe('to be fixed value', () => {
        test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
          const expected = [
            expect.any(MiddlewareExpressRoute),
          ]

          const args = {
            Engine: params.EngineCtor,
          }
          const builder = await GraphqlServerBuilder.createAsync(args)

          const actual = builder.collectExpressRoutes()

          expect(actual)
            .toEqual(expected)
        })
      })

      describe('to call members', () => {
        test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
          const args = {
            Engine: params.EngineCtor,
          }
          const builder = await GraphqlServerBuilder.createAsync(args)

          const collectMiddlewareSpy = jest.spyOn(GraphqlServerBuilder.prototype, 'collectMiddleware')
          const createGraphiqlRouteSpy = jest.spyOn(GraphqlServerBuilder.prototype, 'createGraphiqlRoute')

          builder.collectExpressRoutes()

          expect(collectMiddlewareSpy)
            .toHaveBeenCalledWith()
          expect(createGraphiqlRouteSpy)
            .not
            .toHaveBeenCalled()

          collectMiddlewareSpy.mockRestore()
          createGraphiqlRouteSpy.mockRestore()
        })
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#createGraphqlHttpRoute()', () => {
    describe('to be fixed value', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
            path: '/graphql-customer',
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
            path: '/graphql-admin',
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const expected = MiddlewareExpressRoute.create({
          path: params.path,
          handlers: [
            expect.any(Function),
          ],
        })

        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const actual = builder.createGraphqlHttpRoute()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to call members', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
            path: '/graphql-customer',
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
            path: '/graphql-admin',
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const buildHandlerSpy = jest.spyOn(builder.graphqlHandlerBuilder, 'buildHandler')
        const createSpy = jest.spyOn(MiddlewareExpressRoute, 'create')

        builder.createGraphqlHttpRoute()

        expect(buildHandlerSpy)
          .toHaveBeenCalledWith()
        expect(createSpy)
          .toHaveBeenCalledWith({
            path: params.path,
            handlers: [
              expect.any(Function),
            ],
          })

        buildHandlerSpy.mockRestore()
        createSpy.mockRestore()
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#collectMiddleware()', () => {
    describe('to throw error', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
          expected: [
            expect.any(Function), // corsMiddleware
            expect.any(Function), // jsonParser
            expect.any(Function), // serveStatic
            expect.any(Function), // graphqlUploadExpressMiddleware
            expect.any(Function), // urlencodedParser
          ],
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
          },
          expected: [
            expect.any(Function), // corsMiddleware
            expect.any(Function), // jsonParser
            expect.any(Function), // serveStatic
            expect.any(Function), // graphqlUploadExpressMiddleware
            expect.any(Function), // urlencodedParser
          ],
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const actual = builder.collectMiddleware()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to call member of #engine', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const middlewareTally = []

        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const collectMiddlewareSpy = jest.spyOn(builder.engine, 'collectMiddleware')
          .mockReturnValue(middlewareTally)

        const actual = builder.collectMiddleware()

        expect(actual)
          .toBe(middlewareTally) // Same instance
        expect(collectMiddlewareSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#collectExpressSettings()', () => {
    describe('to call engine', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
            settingsTally: {},
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
            settingsTally: {
              'case sensitive routing': true,
            },
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const collectExpressSettingsSpy = jest.spyOn(builder.engine, 'collectExpressSettings')
          .mockReturnValue(params.settingsTally)

        const actual = builder.collectExpressSettings()

        expect(actual)
          .toBe(params.settingsTally) // same reference
        expect(collectExpressSettingsSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#extendWebSocketServerOptions()', () => {
    describe('to call engine', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            options: {
              connectionInitWaitTimeout: 3000,
            },
          },
          expected: {
            connectionInitWaitTimeout: 5000,
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            options: {},
          },
          expected: {
            connectionInitWaitTimeout: 7000,
          },
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name', async ({ input, expected }) => {
        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const extendWebSocketServerOptionsSpy = jest.spyOn(builder.engine, 'extendWebSocketServerOptions')
          .mockReturnValue(expected)

        const actual = builder.extendWebSocketServerOptions({
          options: input.options,
        })

        expect(actual)
          .toBe(expected) // same reference
        expect(extendWebSocketServerOptionsSpy)
          .toHaveBeenCalledWith({
            options: input.options,
          })
      })
    })

    describe('to be the given options as default', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            options: {},
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            options: {
              connectionInitWaitTimeout: 3000,
            },
          },
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name', async ({ input }) => {
        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const actual = builder.extendWebSocketServerOptions({
          options: input.options,
        })

        expect(actual)
          .toBe(input.options) // same reference
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#shouldSkipWebSocketServer()', () => {
    describe('to call engine', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
          expected: true,
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
          },
          expected: false,
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name, expected: $expected', async ({ input, expected }) => {
        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const shouldSkipWebSocketServerSpy = jest.spyOn(builder.engine, 'shouldSkipWebSocketServer')
          .mockReturnValue(expected)

        const actual = builder.shouldSkipWebSocketServer()

        expect(actual)
          .toBe(expected)
        expect(shouldSkipWebSocketServerSpy)
          .toHaveBeenCalledWith()
      })
    })

    describe('to be falsy as default', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name', async ({ input }) => {
        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const actual = builder.shouldSkipWebSocketServer()

        expect(actual)
          .toBe(false)
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('.get:GraphqlHttpHandlerBuilder', () => {
    test('to be bridge class', () => {
      const actual = GraphqlServerBuilder.GraphqlHttpHandlerBuilder

      expect(actual)
        .toBe(GraphqlHttpHandlerBuilder)
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#createGraphiqlRoute()', () => {
    describe('to be instance of GetMethodExpressRoute', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const actual = builder.createGraphiqlRoute()

        expect(actual)
          .toBeInstanceOf(GetMethodExpressRoute)
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#get:Ctor', () => {
    describe('to be own Class', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const actual = builder.Ctor

        expect(actual)
          .toBe(GraphqlServerBuilder) // same reference
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#get:env', () => {
    describe('to be same as Engine#get:env', () => {
      const cases = [
        {
          params: {
            EngineCtor: class AlphaEngine extends CustomerGraphqlServerEngine {
              get env () {
                return /** @type {*} */ ({
                  NODE_ENV: 'development',
                  isPreProduction: () => true,
                  isProduction: () => false,
                })
              }
            },
          },
          expected: {
            NODE_ENV: 'development',
            isPreProduction: expect.any(Function),
            isProduction: expect.any(Function),
          },
        },
        {
          params: {
            EngineCtor: class BetaEngine extends AdminGraphqlServerEngine {
              get env () {
                return /** @type {*} */ ({
                  NODE_ENV: 'production',
                  isPreProduction: () => false,
                  isProduction: () => true,
                })
              }
            },
          },
          expected: {
            NODE_ENV: 'production',
            isPreProduction: expect.any(Function),
            isProduction: expect.any(Function),
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const actual = builder.env

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#get:config', () => {
    describe('to be fixed value', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
          expected: {
            graphqlEndpoint: '/graphql-customer',
            staticPath: expect.stringMatching(/public$/u),
            schemaPath: expect.stringMatching(/app\/server\/graphql\/schemas\/customer.graphql$/u),
            actualResolversPath: expect.stringMatching(/app\/server\/graphql\/resolvers\/customer\/actual$/u),
            stubResolversPath: expect.stringMatching(/app\/server\/graphql\/resolvers\/customer\/stub$/u),
            postWorkersPath: expect.stringMatching(/app\/server\/graphql\/post-workers\/customer$/u),
            maxDocumentDepth: 10,
            redisOptions: null,
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
          },
          expected: {
            graphqlEndpoint: '/graphql-admin',
            staticPath: expect.stringMatching(/public$/u),
            schemaPath: expect.stringMatching(/app\/server\/graphql\/schemas\/admin.graphql$/u),
            actualResolversPath: expect.stringMatching(/app\/server\/graphql\/resolvers\/admin\/actual$/u),
            stubResolversPath: expect.stringMatching(/app\/server\/graphql\/resolvers\/admin\/stub$/u),
            postWorkersPath: expect.stringMatching(/app\/server\/graphql\/post-workers\/admin$/u),
            maxDocumentDepth: 10,
            redisOptions: null,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const actual = builder.config

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#buildHttpServer()', () => {
    describe('to be Express Server', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const actual = builder.buildHttpServer()

        expect(actual)
          .toBeInstanceOf(http.Server)
      })
    })

    describe('to call members', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const alphaRouteTally = MiddlewareExpressRoute.create({
          path: '/alpha',
          handlers: [
            () => {},
          ],
        })
        const betaRouteTally = MiddlewareExpressRoute.create({
          path: '/beta',
          handlers: [
            () => {},
            () => {},
          ],
        })
        const collectExpressRoutesTally = [
          alphaRouteTally,
          betaRouteTally,
        ]
        const buildServerRootAppTally = builder.app
        const createGraphqlHttpRouteTally = MiddlewareExpressRoute.create({
          path: '/graphql',
          handlers: [
            () => {},
            () => {},
            () => {},
          ],
        })
        const serverTally = new http.Server()

        const mountRouteToAppExpected = {
          routes: [
            alphaRouteTally,
            betaRouteTally,
            createGraphqlHttpRouteTally,
          ],
        }
        const buildServerRootAppExpected = {
          app: builder.app,
        }
        const setupServerExpected = {
          server: serverTally,
        }
        const buildListenProxyServerExpected = {
          server: serverTally,
        }

        /** @type {renchan.HttpServer} */
        const buildHttpServerTally = /** @type {*} */ ({
          __proto__: serverTally,
          listen: () => {},
        })

        const applyExpressSettingsSpy = jest.spyOn(builder, 'applyExpressSettings')
        const collectExpressRoutesSpy = jest.spyOn(builder, 'collectExpressRoutes')
          .mockReturnValue(collectExpressRoutesTally)
        const createGraphqlHttpRouteSpy = jest.spyOn(builder, 'createGraphqlHttpRoute')
          .mockReturnValue(createGraphqlHttpRouteTally)
        const mountRouteToAppSpy = jest.spyOn(builder, 'mountRouteToApp')
        const buildServerRootAppSpy = jest.spyOn(builder, 'buildServerRootApp')
          .mockReturnValue(buildServerRootAppTally)
        const createServerSpy = jest.spyOn(http, 'createServer')
          .mockReturnValue(serverTally)
        const setupServerSpy = jest.spyOn(builder, 'setupServer')
        const buildListenProxyServerSpy = jest.spyOn(builder, 'buildListenProxyServer')
          .mockReturnValue(buildHttpServerTally)

        const actual = builder.buildHttpServer()

        expect(actual)
          .toBe(buildHttpServerTally) // same reference

        expect(applyExpressSettingsSpy)
          .toHaveBeenCalledWith()
        expect(collectExpressRoutesSpy)
          .toHaveBeenCalledWith()
        expect(createGraphqlHttpRouteSpy)
          .toHaveBeenCalledWith()
        expect(mountRouteToAppSpy)
          .toHaveBeenCalledWith(mountRouteToAppExpected)
        expect(buildServerRootAppSpy)
          .toHaveBeenCalledWith(buildServerRootAppExpected)
        expect(createServerSpy)
          .toHaveBeenCalledWith(buildServerRootAppTally)
        expect(setupServerSpy)
          .toHaveBeenCalledWith(setupServerExpected)
        expect(buildListenProxyServerSpy)
          .toHaveBeenCalledWith(buildListenProxyServerExpected)
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#buildServerRootApp()', () => {
    const cases = [
      {
        params: {
          EngineCtor: CustomerGraphqlServerEngine,
        },
      },
      {
        params: {
          EngineCtor: AdminGraphqlServerEngine,
        },
      },
    ]

    test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
      const args = {
        Engine: params.EngineCtor,
      }
      const builder = await GraphqlServerBuilder.createAsync(args)

      const appTally = express()

      const actual = builder.buildServerRootApp({
        app: appTally,
      })

      expect(actual)
        .toBe(appTally) // same reference
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#setupServer()', () => {
    describe('to call dependencies', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
          tally: {
            path: '/graphql-customer',
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
          },
          tally: {
            path: '/graphql-admin',
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, tally }) => {
        const SpyWebSocketServer = globalThis.constructorSpy.spyOn(WebSocketServer)
        const useServerSpy = jest.fn()

        const GraphqlServerBuilderProxy = class extends GraphqlServerBuilder {
          static get WebSocketServer () {
            return SpyWebSocketServer
          }

          static get useServerHandler () {
            return /** @type {*} */ (useServerSpy)
          }
        }

        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilderProxy.createAsync(args)

        const serverTally = new http.Server()

        const WebSocketServerExpected = {
          server: serverTally,
          path: tally.path,
        }
        const validateHandlerTally = /** @type {*} */ (() => [])

        jest.spyOn(builder, 'defineValidateHandler')
          .mockReturnValue(validateHandlerTally)

        const useServerHandlerExpected = [
          {
            execute,
            subscribe,
            context: builder.graphqlHandlerBuilder.context,
            schema: builder.graphqlHandlerBuilder.schema,
            validate: validateHandlerTally,
          },
          expect.any(WebSocketServer),
        ]

        builder.setupServer({
          server: serverTally,
        })

        expect(SpyWebSocketServer.__spy__)
          .toHaveBeenLastCalledWith(WebSocketServerExpected)
        expect(useServerSpy)
          .toHaveBeenLastCalledWith(...useServerHandlerExpected)
      })
    })

    describe('to call useServerHandler with the composed options', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
          expected: {
            connectionInitWaitTimeout: 3000,
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
          },
          expected: {
            connectionInitWaitTimeout: 5000,
          },
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name', async ({ input, expected }) => {
        const SpyWebSocketServer = globalThis.constructorSpy.spyOn(WebSocketServer)
        const useServerSpy = jest.fn()

        const GraphqlServerBuilderProxy = class extends GraphqlServerBuilder {
          static get WebSocketServer () {
            return SpyWebSocketServer
          }

          static get useServerHandler () {
            return /** @type {*} */ (useServerSpy)
          }
        }

        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilderProxy.createAsync(args)

        jest.spyOn(builder, 'composeServerOptionHash')
          .mockReturnValue(expected)

        builder.setupServer({
          server: new http.Server(),
        })

        expect(useServerSpy)
          .toHaveBeenLastCalledWith(expected, expect.any(WebSocketServer))
      })
    })

    describe('to call useServerHandler with extended options', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
          expected: {
            connectionInitWaitTimeout: 3000,
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
          },
          expected: {
            connectionInitWaitTimeout: 5000,
          },
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name', async ({ input, expected }) => {
        const SpyWebSocketServer = globalThis.constructorSpy.spyOn(WebSocketServer)
        const useServerSpy = jest.fn()

        const GraphqlServerBuilderProxy = class extends GraphqlServerBuilder {
          static get WebSocketServer () {
            return SpyWebSocketServer
          }

          static get useServerHandler () {
            return /** @type {*} */ (useServerSpy)
          }
        }

        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilderProxy.createAsync(args)

        const validateHandlerTally = /** @type {*} */ (() => [])

        jest.spyOn(builder, 'defineValidateHandler')
          .mockReturnValue(validateHandlerTally)

        const extendWebSocketServerOptionsSpy = jest.spyOn(builder, 'extendWebSocketServerOptions')
          .mockReturnValue(expected)

        const extendWebSocketServerOptionsExpected = {
          options: {
            execute,
            subscribe,
            context: builder.graphqlHandlerBuilder.context,
            schema: builder.graphqlHandlerBuilder.schema,
            validate: validateHandlerTally,
          },
        }

        builder.setupServer({
          server: new http.Server(),
        })

        expect(extendWebSocketServerOptionsSpy)
          .toHaveBeenCalledWith(extendWebSocketServerOptionsExpected)
        expect(useServerSpy)
          .toHaveBeenLastCalledWith(expected, expect.any(WebSocketServer))
      })
    })

    describe('to skip mounting WebSocket server by config', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: {
              skipsWebSocket: true,
            },
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            graphqlServer: {
              skipsWebSocket: true,
            },
          },
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name', async ({ input }) => {
        const SpyWebSocketServer = globalThis.constructorSpy.spyOn(WebSocketServer)
        const useServerSpy = jest.fn()

        const GraphqlServerBuilderProxy = class extends GraphqlServerBuilder {
          static get WebSocketServer () {
            return SpyWebSocketServer
          }

          static get useServerHandler () {
            return /** @type {*} */ (useServerSpy)
          }
        }

        const { config } = input.EngineCtor
        jest.spyOn(input.EngineCtor, 'config', 'get')
          .mockReturnValue({
            ...config,
            graphqlServer: input.graphqlServer,
          })

        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilderProxy.createAsync(args)

        builder.setupServer({
          server: new http.Server(),
        })

        expect(SpyWebSocketServer.__spy__)
          .not
          .toHaveBeenCalled()
        expect(useServerSpy)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('to mount WebSocket server by config', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: {
              skipsWebSocket: false,
            },
          },
          expected: {
            path: '/graphql-customer',
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            graphqlServer: {
              // skipsWebSocket: omitted
              connectionInitWaitTimeout: null,
            },
          },
          expected: {
            path: '/graphql-admin',
          },
        },
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: undefined, // graphqlServer: omitted
          },
          expected: {
            path: '/graphql-customer',
          },
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name, graphqlServer: $input.graphqlServer', async ({ input, expected }) => {
        const SpyWebSocketServer = globalThis.constructorSpy.spyOn(WebSocketServer)
        const useServerSpy = jest.fn()

        const GraphqlServerBuilderProxy = class extends GraphqlServerBuilder {
          static get WebSocketServer () {
            return SpyWebSocketServer
          }

          static get useServerHandler () {
            return /** @type {*} */ (useServerSpy)
          }
        }

        const { config } = input.EngineCtor
        jest.spyOn(input.EngineCtor, 'config', 'get')
          .mockReturnValue({
            ...config,
            graphqlServer: input.graphqlServer,
          })

        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilderProxy.createAsync(args)

        builder.setupServer({
          server: new http.Server(),
        })

        expect(SpyWebSocketServer.__spy__)
          .toHaveBeenCalledWith(expect.objectContaining(expected))
        expect(useServerSpy)
          .toHaveBeenCalledWith(expect.objectContaining({ execute }), expect.any(WebSocketServer))
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#skipsToSetupWebSocketServer()', () => {
    describe('should be truthy', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: {
              skipsWebSocket: true,
            },
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            graphqlServer: {
              skipsWebSocket: true,
            },
          },
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name', async ({ input }) => {
        const { config } = input.EngineCtor
        jest.spyOn(input.EngineCtor, 'config', 'get')
          .mockReturnValue({
            ...config,
            graphqlServer: input.graphqlServer,
          })

        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const received = builder.skipsToSetupWebSocketServer()

        expect(received)
          .toBeTruthy()
      })
    })

    describe('should be falsy', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: {
              skipsWebSocket: false,
            },
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            graphqlServer: {
              // skipsWebSocket: omitted
              connectionInitWaitTimeout: null,
            },
          },
        },
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: undefined, // graphqlServer: omitted
          },
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name, graphqlServer: $input.graphqlServer', async ({ input }) => {
        const { config } = input.EngineCtor
        jest.spyOn(input.EngineCtor, 'config', 'get')
          .mockReturnValue({
            ...config,
            graphqlServer: input.graphqlServer,
          })

        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const received = builder.skipsToSetupWebSocketServer()

        expect(received)
          .toBeFalsy()
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#composeServerOptionHash()', () => {
    describe('should compose the options the builder wires', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name', async ({ input }) => {
        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        jest.spyOn(builder, 'defineValidateHandler')
          .mockReturnValue(validate)

        const expected = {
          execute,
          subscribe,
          context: builder.graphqlHandlerBuilder.context,
          schema: builder.graphqlHandlerBuilder.schema,
          validate,
        }

        const received = builder.composeServerOptionHash()

        expect(received)
          .toStrictEqual(expected)
      })
    })

    describe('should prepend the hooks the engine composes', () => {
      const cases = [
        {
          tally: {
            onConnect: () => true,
            onDisconnect: () => undefined,
            onClose: () => undefined,
            onSubscribe: () => undefined,
            onOperation: () => undefined,
            onError: () => undefined,
            onNext: () => undefined,
            onComplete: () => undefined,
          },
        },
        {
          tally: {
            onSubscribe: () => undefined,
          },
        },
      ]

      test.each(cases)('hooks: $#', async ({ tally }) => {
        const args = {
          Engine: CustomerGraphqlServerEngine,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        jest.spyOn(builder.engine, 'composeServerHookHash')
          .mockReturnValue(tally)

        const received = builder.composeServerOptionHash()

        expect(received)
          .toMatchObject(tally)
      })
    })

    describe('should refuse the options the engine must not decide', () => {
      /**
       * @type {Array<{
       *   input: {
       *     hookHash: GraphqlType.WebSocketServerHookHash
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          input: {
            hookHash: {
              execute: 'engine-execute',
            },
          },
        },
        {
          input: {
            hookHash: {
              subscribe: 'engine-subscribe',
            },
          },
        },
        {
          input: {
            hookHash: {
              context: 'engine-context',
            },
          },
        },
        {
          input: {
            hookHash: {
              schema: 'engine-schema',
            },
          },
        },
        {
          input: {
            hookHash: {
              validate: 'engine-validate',
            },
          },
        },
        {
          input: {
            hookHash: {
              roots: 'engine-roots',
            },
          },
        },
        {
          input: {
            hookHash: {
              connectionInitWaitTimeout: 'engine-connection-init-wait-timeout',
            },
          },
        },
        {
          input: {
            hookHash: {
              jsonMessageReviver: 'engine-json-message-reviver',
            },
          },
        },
        {
          input: {
            hookHash: {
              jsonMessageReplacer: 'engine-json-message-replacer',
            },
          },
        },
      ])

      test.each(cases)('hookHash: $input.hookHash', async ({ input }) => {
        const args = {
          Engine: CustomerGraphqlServerEngine,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        jest.spyOn(builder, 'defineValidateHandler')
          .mockReturnValue(validate)

        const expected = builder.composeServerOptionHash() // the options without any hook of the engine

        jest.spyOn(builder.engine, 'composeServerHookHash')
          .mockReturnValue(input.hookHash)

        const received = builder.composeServerOptionHash()

        expect(received)
          .toStrictEqual(expected)
      })
    })

    describe('should keep the hooks among the options the engine must not decide', () => {
      const onConnect = () => true
      const onSubscribe = () => undefined

      /**
       * @type {Array<{
       *   input: {
       *     hookHash: GraphqlType.WebSocketServerHookHash
       *   }
       *   expected: GraphqlType.WebSocketServerHookHash
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          input: {
            hookHash: {
              onConnect,
              roots: 'engine-roots',
              connectionInitWaitTimeout: 'engine-connection-init-wait-timeout',
            },
          },
          expected: {
            onConnect,
          },
        },
        {
          input: {
            hookHash: {
              onSubscribe,
              execute: 'engine-execute',
              jsonMessageReplacer: 'engine-json-message-replacer',
            },
          },
          expected: {
            onSubscribe,
          },
        },
      ])

      test.each(cases)('hookHash: $#', async ({ input, expected }) => {
        const args = {
          Engine: CustomerGraphqlServerEngine,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        jest.spyOn(builder.engine, 'composeServerHookHash')
          .mockReturnValue(input.hookHash)

        const received = builder.composeServerOptionHash()

        expect(received)
          .toMatchObject(expected)
      })
    })

    describe('should add connectionInitWaitTimeout of the config', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: 5000,
            },
          },
          expected: 5000,
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: 7000,
            },
          },
          expected: 7000,
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name, connectionInitWaitTimeout: $expected', async ({ input, expected }) => {
        const { config } = input.EngineCtor
        jest.spyOn(input.EngineCtor, 'config', 'get')
          .mockReturnValue({
            ...config,
            graphqlServer: input.graphqlServer,
          })

        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const received = builder.composeServerOptionHash()

        expect(received)
          .toHaveProperty('connectionInitWaitTimeout', expected)
      })
    })

    describe('should leave out connectionInitWaitTimeout when the config holds no value', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: null,
            },
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            graphqlServer: {
              // connectionInitWaitTimeout: omitted
              skipsWebSocket: false,
            },
          },
        },
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: undefined, // graphqlServer: omitted
          },
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name, graphqlServer: $input.graphqlServer', async ({ input }) => {
        const { config } = input.EngineCtor
        jest.spyOn(input.EngineCtor, 'config', 'get')
          .mockReturnValue({
            ...config,
            graphqlServer: input.graphqlServer,
          })

        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const received = builder.composeServerOptionHash()

        expect(received)
          .not
          .toHaveProperty('connectionInitWaitTimeout')
      })
    })

    describe('should leave out connectionInitWaitTimeout when the config holds a value that skips waiting', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: 0,
            },
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: Infinity,
            },
          },
        },
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: NaN,
            },
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: -1000,
            },
          },
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name, graphqlServer: $input.graphqlServer', async ({ input }) => {
        const { config } = input.EngineCtor
        jest.spyOn(input.EngineCtor, 'config', 'get')
          .mockReturnValue({
            ...config,
            graphqlServer: input.graphqlServer,
          })

        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const received = builder.composeServerOptionHash()

        expect(received)
          .not
          .toHaveProperty('connectionInitWaitTimeout')
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#filterServerHookHash()', () => {
    describe('should keep the hooks the engine composes', () => {
      const cases = [
        {
          tally: {
            onConnect: () => true,
            onDisconnect: () => undefined,
            onClose: () => undefined,
            onSubscribe: () => undefined,
            onOperation: () => undefined,
            onError: () => undefined,
            onNext: () => undefined,
            onComplete: () => undefined,
          },
        },
        {
          tally: {
            onSubscribe: () => undefined,
          },
        },
      ]

      test.each(cases)('hooks: $#', async ({ tally }) => {
        const args = {
          Engine: CustomerGraphqlServerEngine,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        jest.spyOn(builder.engine, 'composeServerHookHash')
          .mockReturnValue(tally)

        const received = builder.filterServerHookHash()

        expect(received)
          .toStrictEqual(tally)
      })
    })

    describe('should leave out the options the engine must not decide', () => {
      /**
       * @type {Array<{
       *   input: {
       *     hookHash: GraphqlType.WebSocketServerHookHash
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          input: {
            hookHash: {
              execute: 'engine-execute',
            },
          },
        },
        {
          input: {
            hookHash: {
              subscribe: 'engine-subscribe',
            },
          },
        },
        {
          input: {
            hookHash: {
              context: 'engine-context',
            },
          },
        },
        {
          input: {
            hookHash: {
              schema: 'engine-schema',
            },
          },
        },
        {
          input: {
            hookHash: {
              validate: 'engine-validate',
            },
          },
        },
        {
          input: {
            hookHash: {
              roots: 'engine-roots',
            },
          },
        },
        {
          input: {
            hookHash: {
              connectionInitWaitTimeout: 'engine-connection-init-wait-timeout',
            },
          },
        },
        {
          input: {
            hookHash: {
              jsonMessageReviver: 'engine-json-message-reviver',
            },
          },
        },
        {
          input: {
            hookHash: {
              jsonMessageReplacer: 'engine-json-message-replacer',
            },
          },
        },
      ])

      test.each(cases)('hookHash: $input.hookHash', async ({ input }) => {
        const args = {
          Engine: CustomerGraphqlServerEngine,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        jest.spyOn(builder.engine, 'composeServerHookHash')
          .mockReturnValue(input.hookHash)

        const received = builder.filterServerHookHash()

        expect(received)
          .toStrictEqual({})
      })
    })

    describe('should keep the hooks among the options the engine must not decide', () => {
      const onConnect = () => true
      const onSubscribe = () => undefined

      /**
       * @type {Array<{
       *   input: {
       *     hookHash: GraphqlType.WebSocketServerHookHash
       *   }
       *   expected: GraphqlType.WebSocketServerHookHash
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          input: {
            hookHash: {
              onConnect,
              roots: 'engine-roots',
              connectionInitWaitTimeout: 'engine-connection-init-wait-timeout',
            },
          },
          expected: {
            onConnect,
          },
        },
        {
          input: {
            hookHash: {
              onSubscribe,
              execute: 'engine-execute',
              jsonMessageReplacer: 'engine-json-message-replacer',
            },
          },
          expected: {
            onSubscribe,
          },
        },
      ])

      test.each(cases)('hookHash: $#', async ({ input, expected }) => {
        const args = {
          Engine: CustomerGraphqlServerEngine,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        jest.spyOn(builder.engine, 'composeServerHookHash')
          .mockReturnValue(input.hookHash)

        const received = builder.filterServerHookHash()

        expect(received)
          .toStrictEqual(expected)
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#defineValidateHandler()', () => {
    const alphaRule = () => ({})
    const betaRule = () => ({})

    /** @type {GraphqlType.Config} */
    const mockConfig = {
      graphqlEndpoint: '/graphql-alpha',
      staticPath: '/path/to/static/',
      schemaPath: '/path/to/schema',
      actualResolversPath: '/path/to/actual/',
      stubResolversPath: null,
      postWorkersPath: null,
    }

    const mockShare = BaseGraphqlShare.create({})

    const engine = new BaseGraphqlServerEngine({
      config: mockConfig,
      share: mockShare,
      errorHash: {},
    })

    describe('to be function', () => {
      const cases = [
        {
          input: {
            validationRules: [
              alphaRule,
            ],
          },
        },
        {
          input: {
            validationRules: [],
          },
        },
      ]

      test.each(cases)('rule count: $input.validationRules.length', ({ input }) => {
        /** @type {GraphqlType.HttpHandlerBuilder} */
        const mockGraphqlHandlerBuilder = /** @type {*} */ ({
          validationRules: input.validationRules,
        })

        const builder = GraphqlServerBuilder.create({
          engine,
          graphqlHandlerBuilder: mockGraphqlHandlerBuilder,
        })

        const received = builder.defineValidateHandler()

        expect(received)
          .toBeInstanceOf(Function)
      })
    })

    describe('to call .validate() with the specified rules and the rules of the endpoint', () => {
      /** @type {GraphqlType.Schema} */
      const mockSchema = /** @type {*} */ ({})
      /** @type {import('graphql').DocumentNode} */
      const mockDocument = /** @type {*} */ ({})

      const cases = [
        {
          input: {
            graphqlHandlerBuilder: {
              validationRules: [
                alphaRule,
                betaRule,
              ],
            },
          },
          expected: [
            ...specifiedRules,
            alphaRule,
            betaRule,
          ],
        },
        {
          input: {
            graphqlHandlerBuilder: {
              validationRules: [],
            },
          },
          expected: [
            ...specifiedRules,
          ],
        },
        {
          input: {
            graphqlHandlerBuilder: {},
          },
          expected: [
            ...specifiedRules,
          ],
        },
      ]

      test.each(cases)('rules: $expected.length', ({ input, expected }) => {
        const mockGraphql = {
          /**
           * @returns {Array<*>} - Errors of the validation.
           */
          validate: () => [],
        }

        const validateSpy = jest.spyOn(mockGraphql, 'validate')

        const GraphqlServerBuilderProxy = class extends GraphqlServerBuilder {
          /** @override */
          static get validate () {
            return /** @type {*} */ (mockGraphql.validate)
          }
        }

        /** @type {GraphqlType.HttpHandlerBuilder} */
        const mockGraphqlHandlerBuilder = /** @type {*} */ (input.graphqlHandlerBuilder)

        const builder = GraphqlServerBuilderProxy.create({
          engine,
          graphqlHandlerBuilder: mockGraphqlHandlerBuilder,
        })

        const validateHandler = builder.defineValidateHandler()

        validateHandler(
          mockSchema,
          mockDocument
        )

        expect(validateSpy)
          .toHaveBeenCalledWith(
            mockSchema,
            mockDocument,
            expected
          )
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#resolveConnectionInitWaitTimeout()', () => {
    describe('should be the value of the config', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: 5000,
            },
          },
          expected: 5000,
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: 7000,
            },
          },
          expected: 7000,
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name, connectionInitWaitTimeout: $expected', async ({ input, expected }) => {
        const { config } = input.EngineCtor
        jest.spyOn(input.EngineCtor, 'config', 'get')
          .mockReturnValue({
            ...config,
            graphqlServer: input.graphqlServer,
          })

        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const received = builder.resolveConnectionInitWaitTimeout()

        expect(received)
          .toBe(expected)
      })
    })

    describe('should be null when the config holds no usable value', () => {
      const cases = [
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: null,
            },
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            graphqlServer: {
              // connectionInitWaitTimeout: omitted
              skipsWebSocket: false,
            },
          },
        },
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: undefined, // graphqlServer: omitted
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: 0,
            },
          },
        },
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: Infinity,
            },
          },
        },
        {
          input: {
            EngineCtor: AdminGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: NaN,
            },
          },
        },
        {
          input: {
            EngineCtor: CustomerGraphqlServerEngine,
            graphqlServer: {
              connectionInitWaitTimeout: -1000,
            },
          },
        },
      ]

      test.each(cases)('Engine: $input.EngineCtor.name, graphqlServer: $input.graphqlServer', async ({ input }) => {
        const { config } = input.EngineCtor
        jest.spyOn(input.EngineCtor, 'config', 'get')
          .mockReturnValue({
            ...config,
            graphqlServer: input.graphqlServer,
          })

        const args = {
          Engine: input.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const received = builder.resolveConnectionInitWaitTimeout()

        expect(received)
          .toBeNull()
      })
    })
  })
})

describe('GraphqlServerBuilder', () => {
  describe('#buildListenProxyServer()', () => {
    describe('to call dependencies', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, tally }) => {
        const portTally = 2999
        const listenExpected = [
          portTally,
          expect.any(Function),
        ]

        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const serverTally = new http.Server()

        const listenSpy = jest.spyOn(serverTally, 'listen')
          .mockImplementation(
            () => serverTally
          )

        const expected = {
          __proto__: serverTally,
          listen: expect.any(Function),
        }

        const actual = builder.buildListenProxyServer({
          server: serverTally,
        })

        actual.listen(portTally)

        expect(actual)
          .toEqual(expected)
        expect(listenSpy)
          .toHaveBeenCalledWith(...listenExpected)
      })
    })

    describe('to forward every argument to listen', () => {
      const cases = [
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
            listenArgs: [
              2999,
            ],
          },
          expected: [
            2999,
            expect.any(Function),
          ],
        },
        {
          params: {
            EngineCtor: CustomerGraphqlServerEngine,
            listenArgs: [
              2999,
              '127.0.0.1',
            ],
          },
          expected: [
            2999,
            '127.0.0.1',
            expect.any(Function),
          ],
        },
        {
          params: {
            EngineCtor: AdminGraphqlServerEngine,
            listenArgs: [
              3999,
              '::1',
              511,
            ],
          },
          expected: [
            3999,
            '::1',
            511,
            expect.any(Function),
          ],
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name, listenArgs: $params.listenArgs', async ({ params, expected }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await GraphqlServerBuilder.createAsync(args)

        const serverTally = new http.Server()

        const listenSpy = jest.spyOn(serverTally, 'listen')
          .mockImplementation(
            () => serverTally
          )

        const actual = builder.buildListenProxyServer({
          server: serverTally,
        })

        actual.listen(...params.listenArgs)

        expect(listenSpy)
          .toHaveBeenCalledWith(...expected)
      })
    })
  })
})
