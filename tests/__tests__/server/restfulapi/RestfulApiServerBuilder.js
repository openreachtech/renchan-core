import http from 'http'
import express from 'express'

import rootPath from '../../../../lib/globals/root-path.js'

import RestfulApiServerBuilder from '../../../../lib/server/restfulapi/RestfulApiServerBuilder.js'

import AlphaRestfulApiServerEngine from '../../../mocks/engines/AlphaRestfulApiServerEngine.js'
import BetaRestfulApiServerEngine from '../../../mocks/engines/BetaRestfulApiServerEngine.js'

import RestfulApiRoutesBuilder from '../../../../lib/server/restfulapi/RestfulApiRoutesBuilder.js'
import BaseRestfulApiServerEngine from '../../../../lib/server/restfulapi/BaseRestfulApiServerEngine.js'
import AlphaGetRenderer from '../../../haystacks/renderers/v1/get/AlphaGetRenderer.js'
import BetaGetRenderer from '../../../haystacks/renderers/v1/get/BetaGetRenderer.js'
import CatPostRenderer from '../../../haystacks/renderers/v1/post/CatPostRenderer.js'
import DogPostRenderer from '../../../haystacks/renderers/v1/post/DogPostRenderer.js'

import HttpMethodExpressRoute from '../../../../lib/server/express/routes/HttpMethodExpressRoute.js'
import MiddlewareExpressRoute from '../../../../lib/server/express/routes/MiddlewareExpressRoute.js'
import GetMethodExpressRoute from '../../../../lib/server/express/routes/GetMethodExpressRoute.js'
import PostMethodExpressRoute from '../../../../lib/server/express/routes/PostMethodExpressRoute.js'
import BaseExpressRoute from '../../../../lib/server/express/routes/BaseExpressRoute.js'

describe('RestfulApiServerBuilder', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      const engineMock = new BaseRestfulApiServerEngine({
        config: /** @type {*} */ ({}),
        share: /** @type {*} */ ({}),
        errorResponseHash: {},
      })

      const appMock = express()

      /** @type {RestfulApiRoutesBuilder} */
      const routesBuilderMock = /** @type {*} */ ({})

      describe('#engine', () => {
        const cases = [
          {
            params: {
              EngineCtor: AlphaRestfulApiServerEngine,
            },
          },
          {
            params: {
              EngineCtor: BetaRestfulApiServerEngine,
            },
          },
        ]

        test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
          const engine = await params.EngineCtor.createAsync()

          const builder = RestfulApiServerBuilder.create({
            engine,
            routesBuilder: routesBuilderMock,
            app: appMock,
          })

          expect(builder)
            .toHaveProperty('engine', engine)
        })
      })

      describe('#routesBuilder', () => {
        const cases = [
          {
            params: {
              EngineCtor: AlphaRestfulApiServerEngine,
              routesBuilder: RestfulApiRoutesBuilder.create({
                engine: engineMock,
                renderers: [
                  AlphaGetRenderer.create(),
                  BetaGetRenderer.create(),
                ],
              }),
            },
          },
          {
            params: {
              EngineCtor: BetaRestfulApiServerEngine,
              routesBuilder: RestfulApiRoutesBuilder.create({
                engine: engineMock,
                renderers: [
                  CatPostRenderer.create(),
                  DogPostRenderer.create(),
                ],
              }),
            },
          },
        ]

        test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
          const engine = await params.EngineCtor.createAsync()

          const builder = RestfulApiServerBuilder.create({
            engine,
            routesBuilder: params.routesBuilder,
            app: appMock,
          })

          expect(builder)
            .toHaveProperty('routesBuilder', params.routesBuilder)
        })
      })

      describe('#app', () => {
        const cases = [
          {
            params: {
              EngineCtor: AlphaRestfulApiServerEngine,
              app: express(),
            },
          },
          {
            params: {
              EngineCtor: BetaRestfulApiServerEngine,
              app: express(),
            },
          },
        ]

        test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
          const engine = await params.EngineCtor.createAsync()

          const builder = RestfulApiServerBuilder.create({
            engine,
            routesBuilder: routesBuilderMock,
            app: params.app,
          })

          expect(builder)
            .toHaveProperty('app', params.app)
        })
      })
    })
  })
})

describe('RestfulApiServerBuilder', () => {
  describe('.create()', () => {
    const appMock = express()

    /** @type {RestfulApiRoutesBuilder} */
    const routesBuilderMock = /** @type {*} */ ({})

    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
          },
        },
      ]

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const engine = await params.EngineCtor.createAsync()

        const builder = RestfulApiServerBuilder.create({
          engine,
          routesBuilder: routesBuilderMock,
          app: appMock,
        })

        expect(builder)
          .toBeInstanceOf(RestfulApiServerBuilder)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
          },
        },
      ]

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const engine = await params.EngineCtor.createAsync()

        const args = {
          engine,
          routesBuilder: routesBuilderMock,
          app: appMock,
        }

        const SpyClass = globalThis.constructorSpy.spyOn(RestfulApiServerBuilder)

        SpyClass.create(args)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('RestfulApiServerBuilder', () => {
  describe('.createAsync()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
          },
        },
      ]

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const builder = await RestfulApiServerBuilder.createAsync({
          Engine: params.EngineCtor,
        })

        expect(builder)
          .toBeInstanceOf(RestfulApiServerBuilder)
      })
    })

    describe('to call .create()', () => {
      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
          },
        },
      ]

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const expected = {
          engine: expect.any(params.EngineCtor),
          routesBuilder: expect.any(RestfulApiRoutesBuilder),
        }

        const createSpy = jest.spyOn(RestfulApiServerBuilder, 'create')

        await RestfulApiServerBuilder.createAsync({
          Engine: params.EngineCtor,
        })

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('RestfulApiServerBuilder', () => {
  describe('.createExpressApplication()', () => {
    describe('to be fixed value', () => {
      test('to be express application', () => {
        const actual = RestfulApiServerBuilder.createExpressApplication()

        expect(actual)
          .toBeInstanceOf(Function)
        expect(actual)
          .toHaveProperty('name', 'app')
      })
    })
  })
})

describe('RestfulApiServerBuilder', () => {
  describe('#get:Ctor', () => {
    describe('to be own Class', () => {
      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await RestfulApiServerBuilder.createAsync(args)

        const actual = builder.Ctor

        expect(actual)
          .toBe(RestfulApiServerBuilder) // same reference
      })
    })
  })
})

describe('RestfulApiServerBuilder', () => {
  describe('#collectMiddleware()', () => {
    describe('to call member of #engine', () => {
      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const middlewareTally = []

        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await RestfulApiServerBuilder.createAsync(args)

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

describe('RestfulApiServerBuilder', () => {
  describe('#get:config', () => {
    describe('to be fixed value', () => {
      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
          },
          expected: {
            renderersPath: rootPath.to('tests/haystacks/renderers/v1/'),
            staticPath: rootPath.to('public/'),
            pathPrefix: '/v1', // nul: none
          },
        },
        {
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
          },
          expected: {
            renderersPath: rootPath.to('tests/haystacks/renderers/v1/post/'),
            staticPath: rootPath.to('public/'),
            pathPrefix: '/v2', // nul: none
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await RestfulApiServerBuilder.createAsync(args)

        const actual = builder.config

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('RestfulApiServerBuilder', () => {
  describe('.get:RestfulApiRoutesBuilder', () => {
    test('to be bridge class', () => {
      const actual = RestfulApiServerBuilder.RestfulApiRoutesBuilder

      expect(actual)
        .toBe(RestfulApiRoutesBuilder)
    })
  })
})

describe('RestfulApiServerBuilder', () => {
  describe('#buildHttpServer()', () => {
    describe('to be Express Server', () => {
      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await RestfulApiServerBuilder.createAsync(args)

        const actual = builder.buildHttpServer()

        expect(actual)
          .toBeInstanceOf(http.Server)
      })
    })

    describe('to call members', () => {
      const firstRouteTally = MiddlewareExpressRoute.create({
        path: '/first',
        handlers: [],
      })
      const secondRouteTally = MiddlewareExpressRoute.create({
        path: '/second',
        handlers: [],
      })
      const thirdRouteTally = MiddlewareExpressRoute.create({
        path: '/third',
        handlers: [],
      })

      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const middlewareRoutesTally = [
          firstRouteTally,
          secondRouteTally,
        ]
        const rendererRoutesTally = [
          thirdRouteTally,
        ]
        const mountAppTally = express()
        const serverAppTally = express()

        /** @type {http.Server} */
        const serverTally = /** @type {*} */ ({})

        const actualTally = http.createServer(serverAppTally)

        const mountRouteToAppArgsExpected = {
          routes: [
            firstRouteTally,
            secondRouteTally,
            thirdRouteTally,
          ],
        }
        const buildServerRootAppArgsExpected = {
          app: mountAppTally,
        }
        const buildListenProxyServerArgsExpected = {
          server: serverTally,
        }

        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await RestfulApiServerBuilder.createAsync(args)

        const collectExpressRoutesSpy = jest.spyOn(builder, 'collectExpressRoutes')
          .mockReturnValue(middlewareRoutesTally)
        const collectRendererRoutesSpy = jest.spyOn(builder, 'collectRendererRoutes')
          .mockReturnValue(rendererRoutesTally)
        const mountRouteToAppSpy = jest.spyOn(builder, 'mountRouteToApp')
          .mockReturnValue(mountAppTally)
        const buildServerRootAppSpy = jest.spyOn(builder, 'buildServerRootApp')
          .mockReturnValue(serverAppTally)
        const createServerSpy = jest.spyOn(http, 'createServer')
          .mockReturnValue(serverTally)
        const buildListenProxyServerSpy = jest.spyOn(builder, 'buildListenProxyServer')
          .mockReturnValue(actualTally)

        const actual = builder.buildHttpServer()

        expect(actual)
          .toBe(actualTally) // same reference

        expect(collectExpressRoutesSpy)
          .toHaveBeenCalledWith()
        expect(collectRendererRoutesSpy)
          .toHaveBeenCalledWith()
        expect(mountRouteToAppSpy)
          .toHaveBeenCalledWith(mountRouteToAppArgsExpected)
        expect(buildServerRootAppSpy)
          .toHaveBeenCalledWith(buildServerRootAppArgsExpected)
        expect(createServerSpy)
          .toHaveBeenCalledWith(serverAppTally)
        expect(buildListenProxyServerSpy)
          .toHaveBeenCalledWith(buildListenProxyServerArgsExpected)
      })
    })
  })
})

describe('RestfulApiServerBuilder', () => {
  describe('#collectExpressRoutes()', () => {
    const cases = [
      {
        params: {
          EngineCtor: AlphaRestfulApiServerEngine,
        },
        expected: [
          MiddlewareExpressRoute.create({
            handlers: [
              expect.any(Function),
              expect.any(Function),
            ],
          }),
        ],
      },
      {
        params: {
          EngineCtor: BetaRestfulApiServerEngine,
        },
        expected: [
          MiddlewareExpressRoute.create({
            handlers: [
              expect.any(Function),
              expect.any(Function),
              expect.any(Function),
            ],
          }),
        ],
      },
    ]

    test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
      const args = {
        Engine: params.EngineCtor,
      }
      const builder = await RestfulApiServerBuilder.createAsync(args)

      const actual = builder.collectExpressRoutes()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('RestfulApiServerBuilder', () => {
  describe('#collectRendererRoutes()', () => {
    const cases = [
      {
        params: {
          EngineCtor: AlphaRestfulApiServerEngine,
        },
        expected: [
          expect.any(HttpMethodExpressRoute),
          expect.any(HttpMethodExpressRoute),
          expect.any(HttpMethodExpressRoute),
          expect.any(HttpMethodExpressRoute),
        ],
      },
      {
        params: {
          EngineCtor: BetaRestfulApiServerEngine,
        },
        expected: [
          expect.any(HttpMethodExpressRoute),
          expect.any(HttpMethodExpressRoute),
        ],
      },
    ]

    test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
      const args = {
        Engine: params.EngineCtor,
      }
      const builder = await RestfulApiServerBuilder.createAsync(args)

      const actual = builder.collectRendererRoutes()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('RestfulApiServerBuilder', () => {
  describe('#mountRouteToApp()', () => {
    describe('to mount to #app', () => {
      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
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
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
            routes: [
              GetMethodExpressRoute.create({
                path: '/alpha',
                handlers: [
                  () => {},
                ],
              }),
              PostMethodExpressRoute.create({
                path: '/beta',
                handlers: [
                  () => {},
                ],
              }),
            ],
          },
          expected: 2,
        },
        {
          params: {
            EngineCtor: class GammaRestfulApiServerEngine extends AlphaRestfulApiServerEngine {},
            routes: [],
          },
          expected: 0,
        },
      ]

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params, expected }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await RestfulApiServerBuilder.createAsync(args)

        const mountToSpy = jest.spyOn(BaseExpressRoute.prototype, 'mountTo')

        const mountArgs = {
          routes: params.routes,
        }
        const mountedApp = builder.mountRouteToApp(mountArgs)

        expect(mountedApp)
          .toBe(builder.app) // Same instance
        expect(mountToSpy)
          .toHaveBeenCalledTimes(expected)
      })
    })
  })
})

describe('RestfulApiServerBuilder', () => {
  describe('#buildServerRootApp()', () => {
    describe('to mount to #app', () => {
      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
          },
        },
      ]

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params, expected }) => {
        const args = {
          Engine: params.EngineCtor,
        }
        const builder = await RestfulApiServerBuilder.createAsync(args)

        const appTally = express()

        const actual = builder.buildServerRootApp({
          app: appTally,
        })

        expect(actual)
          .toBe(appTally) // Same instance
      })
    })
  })
})

describe('RestfulApiServerBuilder', () => {
  describe('#buildListenProxyServer()', () => {
    describe('to call dependencies', () => {
      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
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
        const builder = await RestfulApiServerBuilder.createAsync(args)

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
