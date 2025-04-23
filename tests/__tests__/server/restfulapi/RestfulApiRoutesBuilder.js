import rootPath from '../../../../lib/globals/root-path.js'

import RestfulApiRoutesBuilder from '../../../../lib/server/restfulapi/RestfulApiRoutesBuilder.js'

import AlphaRestfulApiServerEngine from '../../../mocks/engines/AlphaRestfulApiServerEngine.js'
import BetaRestfulApiServerEngine from '../../../mocks/engines/BetaRestfulApiServerEngine.js'

import AlphaGetRenderer from '../../../haystacks/renderers/v1/get/AlphaGetRenderer.js'
import BetaGetRenderer from '../../../haystacks/renderers/v1/get/BetaGetRenderer.js'
import CatPostRenderer from '../../../haystacks/renderers/v1/post/CatPostRenderer.js'
import DogPostRenderer from '../../../haystacks/renderers/v1/post/DogPostRenderer.js'
import DeepBulkClassLoader from '../../../../lib/tools/DeepBulkClassLoader.js'
import HttpMethodExpressRoute from '../../../../lib/server/express/routes/HttpMethodExpressRoute.js'
import BaseRestfulApiContext from '../../../../lib/server/restfulapi/contexts/BaseRestfulApiContext.js'

import AlphaRestfulApiContext from '../../../mocks/contexts/AlphaRestfulApiContext.js'
import BetaRestfulApiContext from '../../../mocks/contexts/BetaRestfulApiContext.js'
import RestfulApiRequest from '../../../../lib/server/restfulapi/interfaces/RestfulApiRequest.js'
import RestfulApiResponse from '../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'

describe('RestfulApiRoutesBuilder', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      /** @type {RestfulApiType.ServerEngine} */
      const engineMock = /** @type {*} */ ({})

      const renderersMock = []

      describe('#engine', () => {
        const cases = [
          {
            params: {
              Engine: AlphaRestfulApiServerEngine,
            },
          },
          {
            params: {
              Engine: BetaRestfulApiServerEngine,
            },
          },
        ]

        test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
          const engine = await params.Engine.createAsync()

          const args = {
            engine,
            renderers: renderersMock,
          }

          const builder = RestfulApiRoutesBuilder.create(args)

          expect(builder)
            .toHaveProperty('engine', engine)
        })
      })

      describe('#renderers', () => {
        const cases = [
          {
            params: {
              renderers: [
                new AlphaGetRenderer({
                  errorResponseHash: {},
                }),
                new BetaGetRenderer({
                  errorResponseHash: {},
                }),
              ],
            },
          },
          {
            params: {
              renderers: [
                new CatPostRenderer({
                  errorResponseHash: {},
                }),
                new DogPostRenderer({
                  errorResponseHash: {},
                }),
              ],
            },
          },
        ]

        test.each(cases)('renderers: $params.renderers', ({ params }) => {
          const args = {
            engine: engineMock,
            renderers: params.renderers,
          }

          const builder = RestfulApiRoutesBuilder.create(args)

          expect(builder)
            .toHaveProperty('renderers', params.renderers)
        })
      })
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('.create()', () => {
    const cases = [
      {
        params: {
          Engine: AlphaRestfulApiServerEngine,
          renderers: [
            new AlphaGetRenderer({
              errorResponseHash: {},
            }),
            new BetaGetRenderer({
              errorResponseHash: {},
            }),
          ],
        },
      },
      {
        params: {
          Engine: BetaRestfulApiServerEngine,
          renderers: [
            new CatPostRenderer({
              errorResponseHash: {},
            }),
            new DogPostRenderer({
              errorResponseHash: {},
            }),
          ],
        },
      },
    ]

    describe('to be instance of own class', () => {
      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const args = {
          engine,
          renderers: params.renderers,
        }

        const actual = RestfulApiRoutesBuilder.create(args)

        expect(actual)
          .toBeInstanceOf(RestfulApiRoutesBuilder)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const args = {
          engine,
          renderers: params.renderers,
        }

        const SpyClass = globalThis.constructorSpy.spyOn(RestfulApiRoutesBuilder)

        SpyClass.create(args)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('.createAsync()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            Engine: class extends AlphaRestfulApiServerEngine {
              /** @override */
              static get config () {
                return {
                  renderersPath: rootPath.to('tests/haystacks/renderers/v1/'),
                  staticPath: rootPath.to('public/'),
                  pathPrefix: '/v1', // nul: none
                }
              }
            },
          },
        },
        {
          params: {
            Engine: class extends BetaRestfulApiServerEngine {
              /** @override */
              static get config () {
                return {
                  renderersPath: rootPath.to('tests/haystacks/renderers/v1/post/'),
                  staticPath: rootPath.to('public/'),
                  pathPrefix: '/v1', // nul: none
                }
              }
            },
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const actual = await RestfulApiRoutesBuilder.createAsync({
          engine,
        })

        expect(actual)
          .toBeInstanceOf(RestfulApiRoutesBuilder)
      })
    })

    describe('to call .create()', () => {
      const cases = [
        {
          params: {
            Engine: AlphaRestfulApiServerEngine,
          },
          expected: {
            engine: expect.any(AlphaRestfulApiServerEngine),
            renderers: expect.any(Array),
          },
        },
        {
          params: {
            Engine: BetaRestfulApiServerEngine,
          },
          expected: {
            engine: expect.any(BetaRestfulApiServerEngine),
            renderers: expect.any(Array),
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params, expected }) => {
        const engine = await params.Engine.createAsync()

        const args = {
          engine,
        }

        const createSpy = jest.spyOn(RestfulApiRoutesBuilder, 'create')

        await RestfulApiRoutesBuilder.createAsync(args)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('.createRenderers()', () => {
    const cases = [
      {
        params: {
          Engine: AlphaRestfulApiServerEngine,
        },
        expected: [
          expect.any(AlphaGetRenderer),
          expect.any(BetaGetRenderer),
          expect.any(CatPostRenderer),
          expect.any(DogPostRenderer),
        ],
      },
      {
        params: {
          Engine: BetaRestfulApiServerEngine,
        },
        expected: [
          expect.any(CatPostRenderer),
          expect.any(DogPostRenderer),
        ],
      },
    ]

    test.each(cases)('Engine: $params.Engine.name', async ({ params, expected }) => {
      const engine = await params.Engine.createAsync()

      const actual = await RestfulApiRoutesBuilder.createRenderers({
        engine,
      })

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('.loadRenderers()', () => {
    const cases = [
      {
        params: {
          poolPath: rootPath.to('tests/haystacks/renderers/v1/get/'),
        },
        expected: [
          AlphaGetRenderer,
          BetaGetRenderer,
        ],
      },
      {
        params: {
          poolPath: rootPath.to('tests/haystacks/renderers/v1/post/'),
        },
        expected: [
          CatPostRenderer,
          DogPostRenderer,
        ],
      },
    ]

    test.each(cases)('poolPath: $params.poolPath', async ({ params, expected }) => {
      const actual = await RestfulApiRoutesBuilder.loadRenderers(params)

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('.createClassLoader()', () => {
    const cases = [
      {
        params: {
          poolPath: rootPath.to('tests/haystacks/renderers/v1/get/'),
        },
      },
      {
        params: {
          poolPath: rootPath.to('tests/haystacks/renderers/v1/post/'),
        },
      },
    ]

    test.each(cases)('poolPath: $params.poolPath', ({ params }) => {
      const actual = RestfulApiRoutesBuilder.createClassLoader(params)

      expect(actual)
        .toBeInstanceOf(DeepBulkClassLoader)
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('#get:config', () => {
    const cases = [
      {
        params: {
          Engine: AlphaRestfulApiServerEngine,
        },
        expected: {
          pathPrefix: '/v1',
          renderersPath: rootPath.to('tests/haystacks/renderers/v1/'),
          staticPath: rootPath.to('public/'),
        },
      },
      {
        params: {
          Engine: BetaRestfulApiServerEngine,
        },
        expected: {
          pathPrefix: '/v2',
          renderersPath: rootPath.to('tests/haystacks/renderers/v1/post/'),
          staticPath: rootPath.to('public/'),
        },
      },
    ]

    test.each(cases)('Engine: $params.Engine.name', async ({ params, expected }) => {
      const engine = await params.Engine.createAsync()

      const builder = await RestfulApiRoutesBuilder.createAsync({
        engine,
      })

      const actual = builder.config

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('#buildRoutes()', () => {
    const cases = [
      {
        params: {
          Engine: AlphaRestfulApiServerEngine,
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
          Engine: BetaRestfulApiServerEngine,
        },
        expected: [
          expect.any(HttpMethodExpressRoute),
          expect.any(HttpMethodExpressRoute),
        ],
      },
    ]

    test.each(cases)('Engine: $params.Engine.name', async ({ params, expected }) => {
      const engine = await params.Engine.createAsync()

      const builder = await RestfulApiRoutesBuilder.createAsync({
        engine,
      })

      const actual = builder.buildRoutes()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('#generateFilterHandler()', () => {
    const cases = [
      {
        params: {
          Engine: AlphaRestfulApiServerEngine,
        },
      },
      {
        params: {
          Engine: BetaRestfulApiServerEngine,
        },
      },
    ]

    test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
      const engine = await params.Engine.createAsync()

      const builder = await RestfulApiRoutesBuilder.createAsync({
        engine,
      })

      const actual = builder.generateFilterHandler()

      expect(actual)
        .toEqual(expect.any(Function))
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('#generateRendererHandler()', () => {
    const engineCases = [
      {
        params: {
          Engine: AlphaRestfulApiServerEngine,
        },
      },
      {
        params: {
          Engine: BetaRestfulApiServerEngine,
        },
      },
    ]
    const passesFilterTruthyCases = [
      {
        renderer: new AlphaGetRenderer({
          errorResponseHash: {},
        }),
        filterHandler: async () => null,
      },
      {
        renderer: new DogPostRenderer({
          errorResponseHash: {},
        }),
        filterHandler: async () => RestfulApiResponse.createAsError({
          statusCode: 500,
          errorMessage: 'Unknown error in Dog Renderer',
        }),
      },
    ]
    const passesFilterFalsyCases = [
      {
        renderer: new BetaGetRenderer({
          errorResponseHash: {},
        }),
        filterHandler: async () => null,
      },
      {
        renderer: new CatPostRenderer({
          errorResponseHash: {},
        }),
        filterHandler: async () => RestfulApiResponse.createAsError({
          statusCode: 500,
          errorMessage: 'Unknown error in Cat Renderer',
        }),
      },
    ]
    const cases = [
      ...passesFilterTruthyCases,
      ...passesFilterFalsyCases,
    ]

    describe('to be instance of Function', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params }) => {
        test.each(cases)('renderer: $renderer.constructor.name', async ({ renderer, filterHandler }) => {
          const engine = await params.Engine.createAsync()

          const builder = await RestfulApiRoutesBuilder.createAsync({
            engine,
          })

          const actual = builder.generateRendererHandler({
            renderer,
            filterHandler,
          })

          expect(actual)
            .toEqual(expect.any(Function))
        })
      })
    })

    describe('to call #generateExceptionProxyRender()', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params }) => {
        describe('with Render#passesFilter: true', () => {
          test.each(passesFilterTruthyCases)('renderer: $renderer.constructor.name', async ({ renderer, filterHandler }) => {
            const engine = await params.Engine.createAsync()

            const builder = await RestfulApiRoutesBuilder.createAsync({
              engine,
            })

            const generateExceptionProxyRenderSpy = jest.spyOn(builder, 'generateExceptionProxyRender')

            builder.generateRendererHandler({
              renderer,
              filterHandler,
            })

            expect(generateExceptionProxyRenderSpy)
              .not // <--- ✅️
              .toHaveBeenCalledWith({
                render: expect.any(Function),
                filter: filterHandler,
              })

            expect(generateExceptionProxyRenderSpy)
              .toHaveBeenCalledWith({
                render: expect.any(Function),
                filter: expect.any(Function),
              })
          })
        })

        describe('with Render#passesFilter: false', () => {
          test.each(passesFilterFalsyCases)('renderer: $renderer.constructor.name', async ({ renderer, filterHandler }) => {
            const engine = await params.Engine.createAsync()

            const builder = await RestfulApiRoutesBuilder.createAsync({
              engine,
            })

            const generateExceptionProxyRenderSpy = jest.spyOn(builder, 'generateExceptionProxyRender')

            builder.generateRendererHandler({
              renderer,
              filterHandler,
            })

            expect(generateExceptionProxyRenderSpy)
              .toHaveBeenCalledWith({
                filter: filterHandler,
                render: expect.any(Function),
              })
          })
        })
      })
    })

    describe('generated handler', () => {
      /** @type {ExpressType.Request} */
      const expressRequestMock = /** @type {*} */ ({
        body: {
          tally: Symbol('get tally'),
        },
        query: {
          tally: Symbol('post tally'),
        },
      })

      /** @type {ExpressType.Response} */
      const expressResponseMock = /** @type {*} */ ({
        status () {
          return this
        },
        json () {
          return this
        },
      })

      /** @type {ExpressType.NextFunction} */
      const expressNextMock = /** @type {*} */ (
        () => {}
      )

      describe('to call exceptionProxyRender()', () => {
        describe.each(engineCases)('Engine: $params.Engine.name', ({ params }) => {
          test.each(cases)('renderer: $renderer.constructor.name', async ({ renderer, filterHandler }) => {
            const engine = await params.Engine.createAsync()

            const builder = await RestfulApiRoutesBuilder.createAsync({
              engine,
            })

            const exceptionProxyRenderSpy = jest.fn()

            const exceptionProxyRenderTally = async (...args) => {
              exceptionProxyRenderSpy(...args)

              return RestfulApiResponse.create({
                statusCode: 200,
                content: {
                  id: 10001,
                },
              })
            }

            jest.spyOn(builder, 'generateExceptionProxyRender')
              .mockReturnValue(exceptionProxyRenderTally)

            const handler = builder.generateRendererHandler({
              renderer,
              filterHandler,
            })

            await handler(
              expressRequestMock,
              expressResponseMock,
              expressNextMock
            )

            const expected = {
              expressRequest: expressRequestMock,
            }

            expect(exceptionProxyRenderSpy)
              .toHaveBeenCalledWith(expected)
          })
        })
      })

      describe('to call #flushResponse()', () => {
        describe.each(engineCases)('Engine: $params.Engine.name', ({ params }) => {
          test.each(cases)('renderer: $renderer.constructor.name', async ({ renderer, filterHandler }) => {
            const engine = await params.Engine.createAsync()

            const builder = await RestfulApiRoutesBuilder.createAsync({
              engine,
            })

            const responseTally = RestfulApiResponse.create({
              statusCode: 200,
              content: {
                id: 10001,
              },
            })
            const exceptionProxyRenderTally = async () => responseTally

            jest.spyOn(builder, 'generateExceptionProxyRender')
              .mockReturnValue(exceptionProxyRenderTally)
            const flushResponseSpy = jest.spyOn(builder, 'flushResponse')

            const handler = builder.generateRendererHandler({
              renderer,
              filterHandler,
            })

            await handler(
              expressRequestMock,
              expressResponseMock,
              expressNextMock
            )

            const expected = {
              expressResponse: expressResponseMock,
              response: responseTally,
            }

            expect(flushResponseSpy)
              .toHaveBeenCalledWith(expected)
          })
        })
      })
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('#resolveRoutePath()', () => {
    const engineCases = [
      {
        params: {
          Engine: AlphaRestfulApiServerEngine,
        },
        cases: [
          {
            path: '/path/to/first',
            expected: '/v1/path/to/first',
          },
          {
            path: '/path/to/second',
            expected: '/v1/path/to/second',
          },
        ],
      },
      {
        params: {
          Engine: BetaRestfulApiServerEngine,
        },
        cases: [
          {
            path: '/path/to/alpha',
            expected: '/v2/path/to/alpha',
          },
          {
            path: '/path/to/beta',
            expected: '/v2/path/to/beta',
          },
        ],
      },
    ]

    describe.each(engineCases)('Engine: $params.Engine.name', ({ params, cases }) => {
      test.each(cases)('path: $path', async ({ path, expected }) => {
        const engine = await params.Engine.createAsync()

        const builder = await RestfulApiRoutesBuilder.createAsync({
          engine,
        })

        const actual = builder.resolveRoutePath({
          path,
        })

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('#generateContextFactory()', () => {
    const engineCases = [
      {
        params: {
          Engine: AlphaRestfulApiServerEngine,
        },
      },
      {
        params: {
          Engine: BetaRestfulApiServerEngine,
        },
      },
    ]

    test.each(engineCases)('Engine: $params.Engine.name', async ({ params }) => {
      const engine = await params.Engine.createAsync()

      const builder = await RestfulApiRoutesBuilder.createAsync({
        engine,
      })

      const factory = builder.generateContextFactory()

      const actual = await factory({
        expressRequest: /** @type {*} */ ({}),
        engine,
      })

      expect(actual)
        .toEqual(expect.any(BaseRestfulApiContext))
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('#generateExceptionProxyRender()', () => {
    const engineCases = [
      {
        params: {
          Engine: AlphaRestfulApiServerEngine,
        },
      },
      {
        params: {
          Engine: BetaRestfulApiServerEngine,
        },
      },
    ]

    const cases = [
      {
        filter: async () => null,
        render: async () => RestfulApiResponse.create({
          statusCode: 200,
          content: {
            id: 10001,
          },
        }),
      },
      {
        filter: async () => RestfulApiResponse.create({
          statusCode: 500,
          error: {
            course: 'Internal error occurred',
          },
        }),
        render: async () => RestfulApiResponse.create({
          statusCode: 200,
          content: {
            id: 10002,
          },
        }),
      },
    ]

    describe('to be instance of Function', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params }) => {
        test.each(cases)('filter: $filter, render: $render', async ({ filter, render }) => {
          const engine = await params.Engine.createAsync()

          const builder = await RestfulApiRoutesBuilder.createAsync({
            engine,
          })

          const args = {
            filter,
            render,
          }

          const actual = builder.generateExceptionProxyRender(args)

          expect(actual)
            .toBeInstanceOf(Function)
        })
      })
    })

    describe('to call #generateContextFactory()', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params }) => {
        test.each(cases)('filter: $filter, render: $render', async ({ filter, render }) => {
          const engine = await params.Engine.createAsync()

          const builder = await RestfulApiRoutesBuilder.createAsync({
            engine,
          })

          const generateContextFactorySpy = jest.spyOn(builder, 'generateContextFactory')

          const args = {
            filter,
            render,
          }

          builder.generateExceptionProxyRender(args)

          expect(generateContextFactorySpy)
            .toHaveBeenCalledWith()
        })
      })
    })

    describe('generated handler', () => {
      /** @type {ExpressType.Request} */
      const expressRequestTally = /** @type {*} */ ({
        tally: Symbol('express request tally'),
      })

      /** @type {import('../../../../lib/server/restfulapi/contexts/BaseRestfulApiContext.js').default} */
      const contextMock = /** @type {*} */ ({
        tally: Symbol('context tally'),
      })

      describe('to call #generateRenderInput()', () => {
        describe.each(engineCases)('Engine: $params.Engine.name', ({ params }) => {
          test.each(cases)('filter: $filter, render: $render', async ({ filter, render }) => {
            const engine = await params.Engine.createAsync()

            const builder = await RestfulApiRoutesBuilder.createAsync({
              engine,
            })

            const contextFactoryTally = async () => contextMock
            jest.spyOn(builder, 'generateContextFactory')
              .mockReturnValue(contextFactoryTally)

            const generateRenderInputSpy = jest.spyOn(builder, 'generateRenderInput')

            const args = {
              filter,
              render,
            }

            const handler = builder.generateExceptionProxyRender(args)

            const expected = {
              expressRequest: expressRequestTally,
              contextFactory: contextFactoryTally,
            }

            await handler({
              expressRequest: expressRequestTally,
            })

            expect(generateRenderInputSpy)
              .toHaveBeenCalledWith(expected)
          })
        })
      })

      describe('to return error response by filter()', () => {
        describe.each(engineCases)('Engine: $params.Engine.name', ({ params }) => {
          const errorResponseCases = [
            {
              filterError: RestfulApiResponse.create({
                statusCode: 400,
                error: {
                  course: '400 error occurred',
                },
              }),
            },
            {
              filterError: RestfulApiResponse.create({
                statusCode: 500,
                error: {
                  course: '500 error occurred',
                },
              }),
            },
          ]

          test.each(errorResponseCases)('filterError: $filterError', async ({ filterError }) => {
            const engine = await params.Engine.createAsync()

            const builder = await RestfulApiRoutesBuilder.createAsync({
              engine,
            })

            const args = {
              filter: async () => filterError,
              render: async () => RestfulApiResponse.create({
                statusCode: 200,
                content: {
                  id: 10001,
                },
              }),
            }

            const handler = builder.generateExceptionProxyRender(args)

            const actual = await handler({
              expressRequest: /** @type {*} */ ({
                body: Symbol('get tally'),
                query: Symbol('post tally'),
              }),
            })

            expect(actual)
              .toBe(filterError) // same reference
          })
        })
      })

      describe('to return response by render()', () => {
        describe.each(engineCases)('Engine: $params.Engine.name', ({ params }) => {
          const errorResponseCases = [
            {
              response: RestfulApiResponse.create({
                statusCode: 200,
                content: {
                  id: 10001,
                },
              }),
            },
            {
              response: RestfulApiResponse.create({
                statusCode: 500,
                error: {
                  course: '500 error occurred',
                },
              }),
            },
          ]

          test.each(errorResponseCases)('response: $response', async ({ response }) => {
            const engine = await params.Engine.createAsync()

            const builder = await RestfulApiRoutesBuilder.createAsync({
              engine,
            })

            const args = {
              filter: async () => null,
              render: async () => response,
            }

            const handler = builder.generateExceptionProxyRender(args)

            const actual = await handler({
              expressRequest: /** @type {*} */ ({
                body: Symbol('get tally'),
                query: Symbol('post tally'),
              }),
            })

            expect(actual)
              .toBe(response) // same reference
          })
        })
      })

      describe('to throw by filter()', () => {
        describe.each(engineCases)('Engine: $params.Engine.name', ({ params }) => {
          const errorCases = [
            {
              error: new Error('Alpha error occurred'),
              expected: RestfulApiResponse.createAsError({
                statusCode: 500,
                errorMessage: 'Alpha error occurred',
              }),
            },
            {
              error: new Error('Beta error occurred'),
              expected: RestfulApiResponse.createAsError({
                statusCode: 500,
                errorMessage: 'Beta error occurred',
              }),
            },
          ]

          test.each(errorCases)('error: $error.message', async ({ error, expected }) => {
            const engine = await params.Engine.createAsync()

            const builder = await RestfulApiRoutesBuilder.createAsync({
              engine,
            })

            const createUnknownErrorResponseSpy = jest.spyOn(builder, 'createUnknownErrorResponse')

            const args = {
              filter: async () => {
                throw error
              },
              render: async () => RestfulApiResponse.create({
                statusCode: 200,
                content: {
                  id: 10001,
                },
              }),
            }

            const handler = builder.generateExceptionProxyRender(args)

            const actual = await handler({
              expressRequest: expressRequestTally,
            })

            expect(actual)
              .toEqual(expected)
            expect(createUnknownErrorResponseSpy)
              .toHaveBeenCalledWith({
                error,
              })
          })
        })
      })

      describe('to throw by render()', () => {
        describe.each(engineCases)('Engine: $params.Engine.name', ({ params }) => {
          const errorCases = [
            {
              error: new Error('Alpha error occurred'),
              expected: RestfulApiResponse.createAsError({
                statusCode: 500,
                errorMessage: 'Alpha error occurred',
              }),
            },
            {
              error: new Error('Beta error occurred'),
              expected: RestfulApiResponse.createAsError({
                statusCode: 500,
                errorMessage: 'Beta error occurred',
              }),
            },
          ]

          test.each(errorCases)('error: $error.message', async ({ error, expected }) => {
            const engine = await params.Engine.createAsync()

            const builder = await RestfulApiRoutesBuilder.createAsync({
              engine,
            })

            const createUnknownErrorResponseSpy = jest.spyOn(builder, 'createUnknownErrorResponse')

            const args = {
              filter: async () => null,
              render: async () => {
                throw error
              },
            }

            const handler = builder.generateExceptionProxyRender(args)

            const actual = await handler({
              expressRequest: expressRequestTally,
            })

            expect(actual)
              .toEqual(expected)
            expect(createUnknownErrorResponseSpy)
              .toHaveBeenCalledWith({
                error,
              })
          })
        })
      })
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('#createUnknownErrorResponse()', () => {
    const engineCases = [
      {
        params: {
          Engine: AlphaRestfulApiServerEngine,
        },
        cases: [
          {
            error: new Error('Alpha error'),
            expected: 'Alpha error',
          },
          {
            error: new Error('Beta error'),
            expected: 'Beta error',
          },
        ],
      },
      {
        params: {
          Engine: BetaRestfulApiServerEngine,
        },
        cases: [
          {
            error: new Error('Gamma error'),
            expected: 'Gamma error',
          },
          {
            error: new Error('Delta error'),
            expected: 'Delta error',
          },
        ],
      },
    ]

    describe.each(engineCases)('Engine: $params.Engine.name', ({ params, cases }) => {
      describe('to be instance of RestfulApiResponse', () => {
        test.each(cases)('error: $error.message', async ({ error }) => {
          const engine = await params.Engine.createAsync()

          const builder = await RestfulApiRoutesBuilder.createAsync({
            engine,
          })

          const actual = builder.createUnknownErrorResponse({
            error,
          })

          expect(actual)
            .toBeInstanceOf(RestfulApiResponse)
        })
      })

      describe('to create with resolved error message on pass though error', () => {
        test.each(cases)('error: $error.message', async ({ error }) => {
          const createAsErrorSpy = jest.spyOn(RestfulApiResponse, 'createAsError')

          const engine = await params.Engine.createAsync()

          jest.spyOn(engine, 'passesThoughError')
            .mockReturnValue(true) // <--- ✅️

          const builder = await RestfulApiRoutesBuilder.createAsync({
            engine,
          })

          const expected = {
            statusCode: 500,
            errorMessage: error.message,
          }

          builder.createUnknownErrorResponse({
            error,
          })

          expect(createAsErrorSpy)
            .toHaveBeenCalledWith(expected)
        })
      })

      describe('to create with resolved error message with fixed error message', () => {
        test.each(cases)('error: $error.message', async ({ error }) => {
          const createAsErrorSpy = jest.spyOn(RestfulApiResponse, 'createAsError')

          const engine = await params.Engine.createAsync()

          jest.spyOn(engine, 'passesThoughError')
            .mockReturnValue(false) // <--- ✅️

          const builder = await RestfulApiRoutesBuilder.createAsync({
            engine,
          })

          const expected = {
            statusCode: 500,
            errorMessage: 'Unknown Error',
          }

          builder.createUnknownErrorResponse({
            error,
          })

          expect(createAsErrorSpy)
            .toHaveBeenCalledWith(expected)
        })
      })
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('#generateRenderInput()', () => {
    const engineCases = [
      {
        params: {
          Engine: AlphaRestfulApiServerEngine,
          Context: AlphaRestfulApiContext,
        },
      },
      {
        params: {
          Engine: BetaRestfulApiServerEngine,
          Context: BetaRestfulApiContext,
        },
      },
    ]

    test.each(engineCases)('Engine: $params.Engine.name', async ({ params }) => {
      const engine = await params.Engine.createAsync()

      /** @type {ExpressType.Request} */
      const expressMock = /** @type {*} */ ({
        body: {
          tally: Symbol('get tally'),
        },
        query: {
          tally: Symbol('post tally'),
        },
      })

      const builder = await RestfulApiRoutesBuilder.createAsync({
        engine,
      })

      const contextFactoryMock = async () => params.Context.createAsync({
        expressRequest: expressMock,
        engine,
      })

      const expected = {
        body: expressMock.body,
        query: expressMock.query,
        context: expect.any(params.Context),
        request: expect.any(RestfulApiRequest),
      }

      const actual = await builder.generateRenderInput({
        expressRequest: expressMock,
        contextFactory: contextFactoryMock,
      })

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('#createRestfulApiRequest()', () => {
    describe('to be instance of RestfulApiRequest', () => {
      const cases = [
        {
          params: {
            Engine: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            Engine: BetaRestfulApiServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const builder = await RestfulApiRoutesBuilder.createAsync({
          engine,
        })

        const actual = builder.createRestfulApiRequest({
          expressRequest: /** @type {*} */ ({}),
        })

        expect(actual)
          .toBeInstanceOf(RestfulApiRequest)
      })
    })
  })
})

describe('RestfulApiRoutesBuilder', () => {
  describe('#flushResponse()', () => {
    describe('to flush response via Express response', () => {
      const engineCases = [
        {
          params: {
            Engine: AlphaRestfulApiServerEngine,
          },
          cases: [
            {
              response: RestfulApiResponse.create({
                statusCode: 200,
                content: {
                  id: 10001,
                },
              }),
              expected: {
                content: {
                  id: 10001,
                },
                error: null,
              },
            },
            {
              response: RestfulApiResponse.create({
                statusCode: 201,
                content: {
                  id: 10002,
                },
              }),
              expected: {
                content: {
                  id: 10002,
                },
                error: null,
              },
            },
          ],
        },
        {
          params: {
            Engine: BetaRestfulApiServerEngine,
          },
          cases: [
            {
              response: RestfulApiResponse.create({
                statusCode: 401,
                error: {
                  course: 'Unauthorized error occurred',
                },
              }),
              expected: {
                content: null,
                error: {
                  course: 'Unauthorized error occurred',
                },
              },
            },
            {
              response: RestfulApiResponse.create({
                statusCode: 404,
                error: {
                  course: 'Not found error occurred',
                },
              }),
              expected: {
                content: null,
                error: {
                  course: 'Not found error occurred',
                },
              },
            },
          ],
        },
      ]

      describe.each(engineCases)('Engine: $params.Engine.name', ({ params, cases }) => {
        test.each(cases)('response: $response', async ({ response, expected }) => {
          const engine = await params.Engine.createAsync()

          const builder = await RestfulApiRoutesBuilder.createAsync({
            engine,
          })

          /** @type {ExpressType.Response} */
          const expressResponseMock = /** @type {*} */ ({
            status (statusCode) {
              return this
            },
            json (value) {
              return this
            },
          })

          const statusSpy = jest.spyOn(expressResponseMock, 'status')
          const jsonSpy = jest.spyOn(expressResponseMock, 'json')

          await builder.flushResponse({
            response,
            expressResponse: expressResponseMock,
          })

          expect(statusSpy)
            .toHaveBeenCalledWith(response.status)
          expect(jsonSpy)
            .toHaveBeenCalledWith(expected)
        })
      })
    })
  })
})
