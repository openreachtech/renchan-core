import http from 'http'
import express from 'express'

import {
  execute,
  subscribe,
} from 'graphql'

import {
  WebSocketServer,
} from 'ws'
import {
  useServer,
} from 'graphql-ws/lib/use/ws'

import GraphqlServerBuilder from '../../../../lib/server/graphql/GraphqlServerBuilder.js'
import GraphqlHttpHandlerBuilder from '../../../../lib/server/graphql/GraphqlHttpHandlerBuilder.js'

import CustomerGraphqlServerEngine from '../../../../app/server/graphql/CustomerGraphqlServerEngine.js'
import AdminGraphqlServerEngine from '../../../../app/server/graphql/AdminGraphqlServerEngine.js'
import MiddlewareExpressRoute from '../../../../lib/server/express/routes/MiddlewareExpressRoute.js'
import GetMethodExpressRoute from '../../../../lib/server/express/routes/GetMethodExpressRoute.js'
import BaseExpressRoute from '../../../../lib/server/express/routes/BaseExpressRoute.js'

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
                })
              }
            },
          },
          expected: {
            NODE_ENV: 'development',
            isPreProduction: expect.any(Function),
          },
        },
        {
          params: {
            EngineCtor: class BetaEngine extends AdminGraphqlServerEngine {
              get env () {
                return /** @type {*} */ ({
                  NODE_ENV: 'production',
                  isPreProduction: () => false,
                })
              }
            },
          },
          expected: {
            NODE_ENV: 'production',
            isPreProduction: expect.any(Function),
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
        const useServerHandlerExpected = [
          {
            execute,
            subscribe,
            context: builder.graphqlHandlerBuilder.context,
            schema: builder.graphqlHandlerBuilder.schema,
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
  })
})
