import BaseRestfulApiServerEngine from '../../../../lib/server/restfulapi/BaseRestfulApiServerEngine.js'

import BaseRestfulApiShare from '../../../../lib/server/restfulapi/contexts/BaseRestfulApiShare.js'
import RestfulApiResponse from '../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'

import AlphaRestfulApiServerEngine from '../../../mocks/engines/AlphaRestfulApiServerEngine.js'
import BetaRestfulApiServerEngine from '../../../mocks/engines/BetaRestfulApiServerEngine.js'

describe('BaseRestfulApiServerEngine', () => {
  describe('constructor', () => {
    /** @type {RestfulApiType.Config} */
    const configMock = {
      pathPrefix: '/v0',
      renderersPath: 'path/to/renderers/customer/',
      staticPath: 'path/to/static/customer/',
    }

    /** @type {renchan.RenchanEnv} */
    const envMock = /** @type {*} */ ({
      UUID: new Date()
        .toISOString(),
    })

    const AlphaRestfulApiShare = class extends BaseRestfulApiShare {}
    const BateRestfulApiShare = class extends BaseRestfulApiShare {}

    describe('to keep property', () => {
      describe('#config', () => {
        const cases = [
          {
            params: {
              config: {
                pathPrefix: '/v1',
                renderersPath: '/path/to/renderers/customer/actual/',
                staticPath: '/path/to/static/customer/',
              },
              share: AlphaRestfulApiShare.create({
                env: envMock,
              }),
              errorResponseHash: {},
            },
          },
          {
            params: {
              config: {
                pathPrefix: '/v2',
                renderersPath: '/path/to/renderers/admin/actual/',
                staticPath: '/path/to/static/admin/',
              },
              share: BateRestfulApiShare.create({
                env: envMock,
              }),
              errorResponseHash: {},
            },
          },
        ]

        test.each(cases)('config.staticPath: $params.config.staticPath', ({ params }) => {
          const engine = new BaseRestfulApiServerEngine(params)

          expect(engine)
            .toHaveProperty('config', params.config)
        })
      })

      describe('#share', () => {
        const cases = [
          {
            params: {
              config: configMock,
              share: new AlphaRestfulApiShare({
                env: envMock,
              }),
              errorResponseHash: {},
            },
          },
          {
            params: {
              config: configMock,
              share: new BateRestfulApiShare({
                env: envMock,
              }),
              errorResponseHash: {},
            },
          },
        ]

        test.each(cases)('share: $params.share', ({ params }) => {
          const engine = new BaseRestfulApiServerEngine(params)

          expect(engine)
            .toHaveProperty('share', params.share)
        })
      })

      describe('#errorResponseHash', () => {
        const cases = [
          {
            params: {
              config: configMock,
              share: new AlphaRestfulApiShare({
                env: envMock,
              }),
              errorResponseHash: {
                Unknown: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 500,
                    errorMessage: 'Unknown error occurred',
                  },
                }),
                ConcreteMemberNotFound: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 500,
                    errorMessage: 'Unknown error occurred',
                  },
                }),
                Unauthenticated: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 401,
                    errorMessage: 'Unauthenticated error occurred',
                  },
                }),
                Unauthorized: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 403,
                    errorMessage: 'Unauthorized error occurred',
                  },
                }),
                Database: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 500,
                    errorMessage: 'Database error occurred',
                  },
                }),
              },
            },
          },
          {
            params: {
              config: configMock,
              share: new BateRestfulApiShare({
                env: envMock,
              }),
              errorResponseHash: {
                Alpha: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 500,
                    errorMessage: 'Alpha error occurred',
                  },
                }),
                Beta: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 500,
                    errorMessage: 'Beta error occurred',
                  },
                }),
                Gamma: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 500,
                    errorMessage: 'Gamma error occurred',
                  },
                }),
                Delta: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 500,
                    errorMessage: 'Delta error occurred',
                  },
                }),
              },
            },
          },
        ]

        test.each(cases)('errorResponseHash: $params.errorResponseHash', ({ params }) => {
          const engine = new BaseRestfulApiServerEngine(params)

          expect(engine)
            .toHaveProperty('errorResponseHash', params.errorResponseHash)
        })
      })
    })
  })
})

describe('BaseRestfulApiServerEngine', () => {
  describe('.create()', () => {
    /** @type {renchan.RenchanEnv} */
    const mockEnv = /** @type {*} */ ({
      UUID: new Date()
        .toISOString(),
    })

    const AlphaRestfulApiShare = class extends BaseRestfulApiShare {}
    const BateRestfulApiShare = class extends BaseRestfulApiShare {}

    const errorResponseHashMock = {
      Unknown: RestfulApiResponse.declareErrorRestfulApiResponse({
        errorEnvelope: {
          statusCode: 500,
          errorMessage: 'Unknown error occurred',
        },
      }),
      ConcreteMemberNotFound: RestfulApiResponse.declareErrorRestfulApiResponse({
        errorEnvelope: {
          statusCode: 500,
          errorMessage: 'Unknown error occurred',
        },
      }),
      Unauthenticated: RestfulApiResponse.declareErrorRestfulApiResponse({
        errorEnvelope: {
          statusCode: 401,
          errorMessage: 'Unauthenticated error occurred',
        },
      }),
      Unauthorized: RestfulApiResponse.declareErrorRestfulApiResponse({
        errorEnvelope: {
          statusCode: 403,
          errorMessage: 'Unauthorized error occurred',
        },
      }),
      DeniedPathPermission: RestfulApiResponse.declareErrorRestfulApiResponse({
        errorEnvelope: {
          statusCode: 403,
          errorMessage: 'Denied path permission error occurred',
        },
      }),
      Database: RestfulApiResponse.declareErrorRestfulApiResponse({
        errorEnvelope: {
          statusCode: 500,
          errorMessage: 'Database error occurred',
        },
      }),
    }

    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            config: {
              pathPrefix: '/v1',
              renderersPath: '/path/to/renderers/customer/actual/',
              staticPath: '/path/to/static/customer/',
            },
            share: AlphaRestfulApiShare.create({
              env: mockEnv,
            }),
            errorResponseHash: errorResponseHashMock,
          },
        },
        {
          params: {
            config: {
              pathPrefix: '/v2',
              renderersPath: '/path/to/renderers/admin/actual/',
              staticPath: '/path/to/static/admin/',
            },
            share: BateRestfulApiShare.create({
              env: mockEnv,
            }),
            errorResponseHash: errorResponseHashMock,
          },
        },
      ]

      test.each(cases)('config.pathPrefix: $params.config.pathPrefix', ({ params }) => {
        const engine = BaseRestfulApiServerEngine.create(params)

        expect(engine)
          .toBeInstanceOf(BaseRestfulApiServerEngine)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            config: {
              pathPrefix: '/v1',
              renderersPath: '/path/to/renderers/customer/actual/',
              staticPath: '/path/to/static/customer/',
            },
            share: AlphaRestfulApiShare.create({
              env: mockEnv,
            }),
            errorResponseHash: errorResponseHashMock,
          },
        },
        {
          params: {
            config: {
              pathPrefix: '/v2',
              renderersPath: '/path/to/renderers/admin/actual/',
              staticPath: '/path/to/static/admin/',
            },
            share: BateRestfulApiShare.create({
              env: mockEnv,
            }),
            errorResponseHash: errorResponseHashMock,
          },
        },
      ]

      test.each(cases)('config.staticPath: $params.config.staticPath', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(BaseRestfulApiServerEngine)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })

    describe('to throw error', () => {
      test('without parameter of config', () => {
        const args = {
          share: BateRestfulApiShare.create({
            env: mockEnv,
          }),
        }

        const expected = 'concrete-member-not-found {"memberName":"BaseRestfulApiServerEngine.get:config"}'

        expect(() => BaseRestfulApiServerEngine.create(args))
          .toThrow(expected)
      })
    })
  })
})

describe('BaseRestfulApiServerEngine', () => {
  describe('.createAsync()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            config: {
              pathPrefix: '/v1',
              renderersPath: '/path/to/renderers/customer/actual/',
              staticPath: '/path/to/static/customer/',
            },
            EngineCtor: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            config: {
              pathPrefix: '/v2',
              renderersPath: '/path/to/renderers/admin/actual/',
              staticPath: '/path/to/static/admin/',
            },
            EngineCtor: BetaRestfulApiServerEngine,
          },
        },
      ]

      test.each(cases)('Share: $params.EngineCtor.name', async ({ params }) => {
        const engine = await params.EngineCtor.createAsync(params)

        expect(engine)
          .toBeInstanceOf(BaseRestfulApiServerEngine)
      })
    })

    describe('to call .create()', () => {
      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
            config: {
              pathPrefix: '/v1',
              renderersPath: '/path/to/renderers/customer/actual/',
              staticPath: '/path/to/static/customer/',
            },
          },
          expected: {
            config: {
              pathPrefix: '/v1',
              renderersPath: '/path/to/renderers/customer/actual/',
              staticPath: '/path/to/static/customer/',
            },
            share: expect.any(BaseRestfulApiShare),
          },
        },
        {
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
            config: {
              pathPrefix: '/v2',
              renderersPath: '/path/to/renderers/admin/actual/',
              staticPath: '/path/to/static/admin/',
            },
          },
          expected: {
            config: {
              pathPrefix: '/v2',
              renderersPath: '/path/to/renderers/admin/actual/',
              staticPath: '/path/to/static/admin/',
            },
            share: expect.any(BaseRestfulApiShare),
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
        const createSpy = jest.spyOn(BaseRestfulApiServerEngine, 'create')

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

describe('BaseRestfulApiServerEngine', () => {
  describe('.get:config', () => {
    test('throw error', () => {
      const expected = 'concrete-member-not-found {"memberName":"BaseRestfulApiServerEngine.get:config"}'

      expect(() => BaseRestfulApiServerEngine.config)
        .toThrow(expected)
    })
  })
})

describe('BaseRestfulApiServerEngine', () => {
  describe('.get:standardErrorEnvelopHash', () => {
    test('throw error', () => {
      const expected = 'concrete-member-not-found {"memberName":"BaseRestfulApiServerEngine.get:standardErrorEnvelopHash"}'

      expect(() => BaseRestfulApiServerEngine.standardErrorEnvelopHash)
        .toThrow(expected)
    })
  })
})

describe('BaseRestfulApiServerEngine', () => {
  describe('.buildErrorResponseHash()', () => {
    describe('to be error hash', () => {
      const cases = [
        {
          params: {
            title: 'case 01',
            errorStructureHash: {
              Unknown: {
                statusCode: 500,
                errorMessage: 'Unknown error occurred',
              },
              ConcreteMemberNotFound: {
                statusCode: 500,
                errorMessage: 'Unknown error occurred',
              },
              Unauthenticated: {
                statusCode: 401,
                errorMessage: 'Unauthenticated error occurred',
              },
              Unauthorized: {
                statusCode: 403,
                errorMessage: 'Unauthorized error occurred',
              },
              DeniedPathPermission: {
                statusCode: 403,
                errorMessage: 'Denied path permission error occurred',
              },
              Database: {
                statusCode: 500,
                errorMessage: 'Database error occurred',
              },
            },
          },
          expected: {
            Unknown: expect.any(Function),
            ConcreteMemberNotFound: expect.any(Function),
            Unauthenticated: expect.any(Function),
            Unauthorized: expect.any(Function),
            DeniedPathPermission: expect.any(Function),
            Database: expect.any(Function),
          },
        },
        {
          params: {
            title: 'case 02',
            errorStructureHash: {
              Alpha: {
                statusCode: 500,
                errorMessage: 'Alpha error occurred',
              },
              Beta: {
                statusCode: 500,
                errorMessage: 'Beta error occurred',
              },
              Gamma: {
                statusCode: 500,
                errorMessage: 'Gamma error occurred',
              },
              Delta: {
                statusCode: 500,
                errorMessage: 'Delta error occurred',
              },
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
          errorStructureHash: params.errorStructureHash,
        }

        const actual = BaseRestfulApiServerEngine.buildErrorResponseHash(args)

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to call RenchanRestfulApiError.buildErrorHash()', () => {
      const cases = [
        {
          params: {
            title: 'case 01',
            errorStructureHash: {
              Unknown: {
                statusCode: 500,
                errorMessage: 'Unknown error occurred',
              },
              ConcreteMemberNotFound: {
                statusCode: 500,
                errorMessage: 'Unknown error occurred',
              },
              Unauthenticated: {
                statusCode: 401,
                errorMessage: 'Unauthenticated error occurred',
              },
              Unauthorized: {
                statusCode: 403,
                errorMessage: 'Unauthorized error occurred',
              },
              DeniedPathPermission: {
                statusCode: 403,
                errorMessage: 'Denied path permission error occurred',
              },
              Database: {
                statusCode: 500,
                errorMessage: 'Database error occurred',
              },
            },
          },
          expected: 6,
        },
        {
          params: {
            title: 'case 02',
            errorStructureHash: {
              Alpha: {
                statusCode: 500,
                errorMessage: 'Alpha error occurred',
              },
              Beta: {
                statusCode: 500,
                errorMessage: 'Beta error occurred',
              },
              Gamma: {
                statusCode: 500,
                errorMessage: 'Gamma error occurred',
              },
              Delta: {
                statusCode: 500,
                errorMessage: 'Delta error occurred',
              },
            },
          },
          expected: 4,
        },
      ]

      test.each(cases)('$params.title', ({ params, expected }) => {
        const declareErrorRestfulApiResponseSpy = jest.spyOn(RestfulApiResponse, 'declareErrorRestfulApiResponse')

        const args = {
          errorStructureHash: params.errorStructureHash,
        }

        BaseRestfulApiServerEngine.buildErrorResponseHash(args)

        expect(declareErrorRestfulApiResponseSpy)
          .toHaveBeenCalledTimes(expected)
      })
    })
  })
})

describe('BaseRestfulApiServerEngine', () => {
  describe('.get:Share', () => {
    test('throw error', () => {
      const expected = 'concrete-member-not-found {"memberName":"BaseRestfulApiServerEngine.get:Share"}'

      expect(() => BaseRestfulApiServerEngine.Share)
        .toThrow(expected)
    })
  })
})

describe('BaseRestfulApiServerEngine', () => {
  describe('.get:Context', () => {
    test('throw error', () => {
      const expected = 'concrete-member-not-found {"memberName":"BaseRestfulApiServerEngine.get:Context"}'

      expect(() => BaseRestfulApiServerEngine.Context)
        .toThrow(expected)
    })
  })
})

describe('BaseRestfulApiServerEngine', () => {
  describe('#get:Ctor', () => {
    describe('to be own Class', () => {
      const cases = [
        {
          params: {
            config: {
              pathPrefix: '/v1',
              renderersPath: '/path/to/renderers/customer/actual/',
              staticPath: '/path/to/static/customer/',
            },
            EngineCtor: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            config: {
              pathPrefix: '/v2',
              renderersPath: '/path/to/renderers/admin/actual/',
              staticPath: '/path/to/static/admin/',
            },
            EngineCtor: BetaRestfulApiServerEngine,
          },
        },
      ]

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const engine = await params.EngineCtor.createAsync(params)

        const actual = engine.Ctor

        expect(actual)
          .toBe(params.EngineCtor) // same reference
      })
    })
  })
})

describe('BaseRestfulApiServerEngine', () => {
  describe('#get:env', () => {
    describe('to be env like object', () => {
      const engineCases = [
        {
          params: {
            config: {
              pathPrefix: '/v1',
              renderersPath: '/path/to/renderers/customer/actual/',
              staticPath: '/path/to/static/customer/',
            },
            EngineCtor: AlphaRestfulApiServerEngine,
          },
        },
        {
          params: {
            config: {
              pathPrefix: '/v2',
              renderersPath: '/path/to/renderers/admin/actual/',
              staticPath: '/path/to/static/admin/',
            },
            EngineCtor: BetaRestfulApiServerEngine,
          },
        },
      ]

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

describe('BaseRestfulApiServerEngine', () => {
  describe('#get:NODE_ENV', () => {
    const AlphaRestfulApiShare = class extends BaseRestfulApiShare {
      /** @override */
      static generateEnv () {
        return /** @type {*} */ ({
          NODE_ENV: 'alpha',
        })
      }
    }
    const BateRestfulApiShare = class extends BaseRestfulApiShare {
      /** @override */
      static generateEnv () {
        return /** @type {*} */ ({
          NODE_ENV: 'bate',
        })
      }
    }

    describe('to be env like object', () => {
      const engineCases = [
        {
          params: {
            config: {
              pathPrefix: '/v1',
              renderersPath: '/path/to/renderers/customer/actual/',
              staticPath: '/path/to/static/customer/',
            },
            EngineCtor: class BateEngine extends AlphaRestfulApiServerEngine {
              static get Share () {
                return AlphaRestfulApiShare
              }
            },
          },
          expected: 'alpha',
        },
        {
          params: {
            config: {
              pathPrefix: '/v2',
              renderersPath: '/path/to/renderers/admin/actual/',
              staticPath: '/path/to/static/admin/',
            },
            EngineCtor: class BateEngine extends BetaRestfulApiServerEngine {
              static get Share () {
                return BateRestfulApiShare
              }
            },
          },
          expected: 'bate',
        },
      ]

      test.each(engineCases)('EngineCtor: $params.EngineCtor.name', async ({ params, expected }) => {
        const engine = await params.EngineCtor.createAsync(params)

        const actual = engine.NODE_ENV

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('BaseRestfulApiServerEngine', () => {
  describe('#collectMiddleware()', () => {
    describe('to Throw', () => {
      const cases = [
        {
          params: {
            EngineCtor: AlphaRestfulApiServerEngine,
            config: {
              pathPrefix: '/v1',
              renderersPath: '/path/to/renderers/customer/actual/',
              staticPath: '/path/to/static/customer/',
            },
          },
          expected: [
            expect.any(Function),
            expect.any(Function),
          ],
        },
        {
          params: {
            EngineCtor: BetaRestfulApiServerEngine,
            config: {
              pathPrefix: '/v2',
              renderersPath: '/path/to/renderers/admin/actual/',
              staticPath: '/path/to/static/admin/',
            },
          },
          expected: [
            expect.any(Function),
            expect.any(Function),
            expect.any(Function),
          ],
        },
      ]

      test.each(cases)('EngineCtor: $params.EngineCtor.name', async ({ params, expected }) => {
        const engine = await params.EngineCtor.createAsync(params)

        const actual = engine.collectMiddleware()

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('BaseRestfulApiServerEngine', () => {
  describe('#get:visaIssuers', () => {
    describe('to be fixed value', () => {
      const cases = [
        {
          params: {
            config: {
              pathPrefix: '/v1',
              renderersPath: '/path/to/renderers/customer/actual/',
              staticPath: '/path/to/static/customer/',
            },
          },
        },
        {
          params: {
            config: {
              pathPrefix: '/v2',
              renderersPath: '/path/to/renderers/admin/actual/',
              staticPath: '/path/to/static/admin/',
            },
          },
        },
      ]

      test.each(cases)('pathPrefix: $params.config.pathPrefix', async ({ params }) => {
        const expected = {}

        const args = {
          config: params.config,
          share: /** @type {*} */ ({}),
          errorResponseHash: {},
        }

        const engine = new BaseRestfulApiServerEngine(args)

        const actual = engine.visaIssuers

        expect(actual)
          .toStrictEqual(expected)
      })
    })
  })
})

describe('BaseRestfulApiServerEngine', () => {
  describe('#passesThoughError()', () => {
    /** @type {RestfulApiType.Config} */
    const configMock = /** @type {*} */ ({
      actualRenderersPath: '/path/to/renderers/customer/actual/',
      stubRenderersPath: '/path/to/renderers/customer/stub/',
      staticPath: '/path/to/static/customer/',
    })

    describe('to be truthy', () => {
      const engineCases = [
        {
          params: {
            EngineCtor: class extends AlphaRestfulApiServerEngine {
              /** @override */
              static get Share () {
                return class extends BaseRestfulApiShare {
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
            },
          },
        },
      ]

      test.each(engineCases)('EngineCtor: $params.EngineCtor.name', async ({ params, expected }) => {
        const args = {
          config: configMock,
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
            EngineCtor: class BetaEngine extends BetaRestfulApiServerEngine {
              /** @override */
              static get Share () {
                return class extends BaseRestfulApiShare {
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
            },
          },
        },
      ]

      test.each(engineCases)('EngineCtor: $params.EngineCtor.name', async ({ params }) => {
        const args = {
          config: configMock,
        }
        const engine = await params.EngineCtor.createAsync(args)

        const actual = engine.passesThoughError()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('BaseRestfulApiServerEngine', () => {
  describe('#generateFilterHandler()', () => {
    const cases = [
      {
        params: {
          config: {
            pathPrefix: '/v1',
            renderersPath: '/path/to/renderers/',
            staticPath: '/path/to/static/',
          },
          share: /** @type {*} */ ({}),
          errorResponseHash: {},
        },
      },
      {
        params: {
          config: {
            pathPrefix: '/v2',
            renderersPath: '/path/to/renderers/',
            staticPath: '/path/to/static/',
          },
          share: /** @type {*} */ ({}),
          errorResponseHash: {},
        },
      },
    ]

    test.each(cases)('pathPrefix: $params.config.pathPrefix', ({ params }) => {
      const expected = 'concrete-member-not-found {"memberName":"BaseRestfulApiServerEngine#generateFilterHandler()"}'

      const engine = new BaseRestfulApiServerEngine(params)

      expect(() => engine.generateFilterHandler())
        .toThrow(expected)
    })
  })
})
