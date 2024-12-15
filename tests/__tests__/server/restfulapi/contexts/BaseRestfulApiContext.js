import BaseRestfulApiContext from '../../../../../lib/server/restfulapi/contexts/BaseRestfulApiContext.js'
import RestfulApiVisa from '../../../../../lib/server/restfulapi/contexts/RestfulApiVisa.js'

import StubExpressRequest from '../../../../stubs/StubExpressRequest.js'

import BaseRestfulApiServerEngine from '../../../../../lib/server/restfulapi/BaseRestfulApiServerEngine.js'
import AlphaRestfulApiServerEngine from '../../../../mocks/engines/AlphaRestfulApiServerEngine.js'
import BetaRestfulApiServerEngine from '../../../../mocks/engines/BetaRestfulApiServerEngine.js'

import AlphaRestfulApiShare from '../../../../mocks/contexts/AlphaRestfulApiShare.js'
import BetaRestfulApiShare from '../../../../mocks/contexts/BetaRestfulApiShare.js'

describe('BaseRestfulApiContext', () => {
  describe('constructor', () => {
    /** @type {ExpressType.Request} */
    const expressRequestStub = /** @type {*} */ (
      StubExpressRequest.create()
    )

    /** @type {renchan.UserEntity} */
    const userMock = {
      id: 99999,
    }

    /** @type {RestfulApiType.ServerEngine} */
    const engineMock = /** @type {*} */ ({})

    /** @type {RestfulApiType.Visa} */
    const visaMock = /** @type {*} */ ({})

    describe('to keep property', () => {
      describe('#expressRequest', () => {
        /**
         * @type {Array<{
         *   params: {
         *     expressRequest: ExpressType.Request
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              expressRequest: {
                path: '/alpha',
              },
            },
          },
          {
            params: {
              expressRequest: {
                path: '/beta',
              },
            },
          },
        ])

        test.each(cases)('req.path: $params.expressRequest.path', ({ params }) => {
          const args = {
            expressRequest: params.expressRequest,
            engine: engineMock,
            userEntity: userMock,
            visa: visaMock,
            requestedAt: new Date(),
            uuid: '98765432-abcd-0000-1234-000000000001',
          }

          const context = new BaseRestfulApiContext(args)

          expect(context)
            .toHaveProperty('expressRequest', params.expressRequest)
        })
      })

      describe('#userEntity', () => {
        const cases = [
          {
            params: {
              userEntity: {
                id: 1,
                name: 'John Doe',
              },
            },
          },
          {
            params: {
              userEntity: {
                id: 2,
                name: 'Jane Smith',
              },
            },
          },
        ]

        test.each(cases)('userId: $params.userEntity.id', ({ params }) => {
          const args = {
            expressRequest: expressRequestStub,
            engine: engineMock,
            userEntity: params.userEntity,
            visa: visaMock,
            requestedAt: new Date(),
            uuid: '98765432-abcd-0000-1234-000000000001',
          }

          const context = new BaseRestfulApiContext(args)

          expect(context)
            .toHaveProperty('userEntity', params.userEntity)
        })
      })

      describe('#visa', () => {
        const cases = [
          {
            params: {
              visa: new RestfulApiVisa({
                hasAuthenticated: true,
                hasAuthorized: true,
                hasPathPermission: true,
              }),
            },
          },
          {
            params: {
              visa: new RestfulApiVisa({
                hasAuthenticated: true,
                hasAuthorized: true,
                hasPathPermission: false,
              }),
            },
          },
          {
            params: {
              visa: new RestfulApiVisa({
                hasAuthenticated: true,
                hasAuthorized: false,
                hasPathPermission: true,
              }),
            },
          },
          {
            params: {
              visa: new RestfulApiVisa({
                hasAuthenticated: true,
                hasAuthorized: false,
                hasPathPermission: false,
              }),
            },
          },
          {
            params: {
              visa: new RestfulApiVisa({
                hasAuthenticated: false,
                hasAuthorized: true,
                hasPathPermission: true,
              }),
            },
          },
          {
            params: {
              visa: new RestfulApiVisa({
                hasAuthenticated: false,
                hasAuthorized: true,
                hasPathPermission: false,
              }),
            },
          },
          {
            params: {
              visa: new RestfulApiVisa({
                hasAuthenticated: false,
                hasAuthorized: false,
                hasPathPermission: true,
              }),
            },
          },
          {
            params: {
              visa: new RestfulApiVisa({
                hasAuthenticated: false,
                hasAuthorized: false,
                hasPathPermission: false,
              }),
            },
          },
        ]

        test.each(cases)('visa: $params.visa', ({ params }) => {
          const args = {
            expressRequest: expressRequestStub,
            engine: engineMock,
            userEntity: userMock,
            visa: params.visa,
            requestedAt: new Date(),
            uuid: '98765432-abcd-0000-1234-000000000001',
          }

          const context = new BaseRestfulApiContext(args)

          expect(context)
            .toHaveProperty('visa', params.visa)
        })
      })

      describe('#engine', () => {
        const engineArgs = {
          config: /** @type {*} */ ({}),
          share: /** @type {*} */ ({}),
        }

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

        test.each(cases)('Engine: $params.Engine.name', ({ params }) => {
          const engine = params.Engine.create(engineArgs)

          const args = {
            expressRequest: expressRequestStub,
            engine,
            userEntity: userMock,
            visa: visaMock,
            requestedAt: new Date(),
            uuid: '98765432-abcd-0000-1234-000000000001',
          }

          const context = new BaseRestfulApiContext(args)

          expect(context)
            .toHaveProperty('engine', engine)
        })
      })

      describe('#requestedAt', () => {
        const cases = [
          {
            params: {
              requestedAt: new Date('2024-11-21T11:22:33.999Z'),
            },
          },
          {
            params: {
              requestedAt: new Date('2024-11-22T11:22:33.999Z'),
            },
          },
        ]

        test.each(cases)('requestedAt: $params.requestedAt', ({ params }) => {
          const args = {
            expressRequest: expressRequestStub,
            engine: engineMock,
            userEntity: userMock,
            visa: visaMock,
            requestedAt: params.requestedAt,
            uuid: '98765432-abcd-0000-1234-000000000001',
          }

          const context = new BaseRestfulApiContext(args)

          expect(context)
            .toHaveProperty('requestedAt', params.requestedAt)
        })
      })

      describe('#uuid', () => {
        const cases = [
          {
            params: {
              uuid: 'alpha',
            },
          },
          {
            params: {
              uuid: 'beta',
            },
          },
        ]

        test.each(cases)('uuid: $params.uuid', ({ params }) => {
          const args = {
            expressRequest: expressRequestStub,
            engine: engineMock,
            userEntity: userMock,
            visa: visaMock,
            requestedAt: new Date(),
            uuid: params.uuid,
          }

          const context = new BaseRestfulApiContext(args)

          expect(context)
            .toHaveProperty('uuid', params.uuid)
        })
      })
    })

    describe('to throw an error with invalid type', () => {
      /**
       * @type {Array<{
       *   params: ConstructorParameters<typeof BaseRestfulApiContext>[0]
       *   expected: string
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: null,
          expected: 'Cannot destructure property \'expressRequest\' of \'object null\' as it is null.',
        },
        {
          params: undefined,
          expected: 'Cannot destructure property \'expressRequest\' of \'undefined\' as it is undefined.',
        },
      ])

      test.each(cases)('params: $params', ({ params, expected }) => {
        expect(() => new BaseRestfulApiContext(params))
          .toThrow(expected)
      })
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('.create()', () => {
    /** @type {renchan.UserEntity} */
    const mockUser = /** @type {*} */ ({})

    /** @type {RestfulApiType.Visa} */
    const mockVisa = /** @type {*} */ ({})

    describe('to return an instance of own class', () => {
      /**
       * @type {Array<{
       *   params: ConstructorParameters<typeof BaseRestfulApiContext>[0]
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            expressRequest: {
              path: '/alpha',
            },
            userEntity: mockUser,
            visa: mockVisa,
          },
        },
        {
          params: {
            expressRequest: {
              path: '/beta',
            },
            userEntity: mockUser,
            visa: mockVisa,
          },
        },
      ])

      test.each(cases)('path: $params.expressRequest.path', ({ params }) => {
        const context = BaseRestfulApiContext.create(params)

        expect(context)
          .toBeInstanceOf(BaseRestfulApiContext)
      })
    })

    describe('to call constructor', () => {
      /**
       * @type {Array<{
       *   params: ConstructorParameters<typeof BaseRestfulApiContext>[0]
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            expressRequest: {
              path: '/alpha',
            },
            engine: null,
            userEntity: mockUser,
            visa: mockVisa,
            requestedAt: new Date('2024-11-21T11:22:33.999Z'),
            uuid: '98765432-abcd-0000-1234-000000000001',
          },
        },
        {
          params: {
            expressRequest: {
              path: '/beta',
            },
            engine: null,
            userEntity: mockUser,
            visa: mockVisa,
            requestedAt: new Date('2024-11-22T11:22:33.999Z'),
            uuid: '98765432-50d7-70b2-9c03-000000000002',
          },
        },
      ])

      test.each(cases)('path: $params.expressRequest.path', ({ params }) => {
        const BaseRestfulApiContextSpy = globalThis.constructorSpy.spyOn(BaseRestfulApiContext)

        BaseRestfulApiContextSpy.create(params)

        expect(BaseRestfulApiContextSpy.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('.createAsync()', () => {
    describe('to return an instance of own class', () => {
      /**
       * @type {Array<{
       *   params: Parameters<BaseRestfulApiContext.createAsync>[0]
       *   mocks: {
       *     visa: RestfulApiType.Visa
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            expressRequest: {
              path: '/alpha',
            },
          },
          mocks: {
            visa: RestfulApiVisa.create({
              hasAuthenticated: true,
              hasAuthorized: true,
              hasPathPermission: true,
            }),
          },
        },
        {
          params: {
            expressRequest: {
              path: '/beta',
            },
          },
          mocks: {
            visa: RestfulApiVisa.create({
              hasAuthenticated: true,
              hasAuthorized: false,
              hasPathPermission: false,
            }),
          },
        },
      ])

      test.each(cases)('path: $params.expressRequest.path', async ({ params, mocks }) => {
        const createVisaSpy = jest.spyOn(BaseRestfulApiContext, 'createVisa')
          .mockResolvedValue(mocks.visa)

        const context = await BaseRestfulApiContext.createAsync(params)

        expect(context)
          .toBeInstanceOf(BaseRestfulApiContext)

        createVisaSpy.mockRestore()
      })
    })

    describe('to call .create()', () => {
      /** @type {RestfulApiType.ServerEngine} */
      const mockEngine = /** @type {*} */ ({})

      /**
       * @type {Array<{
       *   params: Parameters<BaseRestfulApiContext.createAsync>[0]
       *   mocks: {
       *     userEntity: renchan.UserEntity
       *     visa: RestfulApiType.Visa
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            expressRequest: {
              path: '/alpha',
            },
          },
          mocks: {
            userEntity: {
              id: 10001,
              username: 'JohnDoe',
            },
            visa: RestfulApiVisa.create({
              hasAuthenticated: true,
              hasAuthorized: true,
              hasPathPermission: true,
            }),
          },
        },
        {
          params: {
            expressRequest: {
              path: '/beta',
            },
          },
          mocks: {
            userEntity: {
              id: 10002,
              username: 'JaneSmith',
            },
            visa: RestfulApiVisa.create({
              hasAuthenticated: true,
              hasAuthorized: false,
              hasPathPermission: false,
            }),
          },
        },
      ])

      test.each(cases)('path: $params.expressRequest.path', async ({ params, mocks }) => {
        const expectedCreateArgs = {
          expressRequest: params.expressRequest,
          engine: mockEngine,
          userEntity: mocks.userEntity,
          visa: mocks.visa,
        }
        const expectedFindUserArgs = {
          expressRequest: params.expressRequest,
          accessToken: null,
        }
        const expectedCreateVisaArgs = {
          expressRequest: params.expressRequest,
          engine: mockEngine,
          userEntity: mocks.userEntity,
        }

        const createSpy = jest.spyOn(BaseRestfulApiContext, 'create')
        const findUserSpy = jest.spyOn(BaseRestfulApiContext, 'findUser')
          .mockResolvedValue(mocks.userEntity)
        const createVisaSpy = jest.spyOn(BaseRestfulApiContext, 'createVisa')
          .mockResolvedValue(mocks.visa)

        const args = {
          expressRequest: params.expressRequest,
          engine: mockEngine,
        }

        await BaseRestfulApiContext.createAsync(args)

        expect(createSpy)
          .toHaveBeenCalledWith(expectedCreateArgs)
        expect(findUserSpy)
          .toHaveBeenCalledWith(expectedFindUserArgs)
        expect(createVisaSpy)
          .toHaveBeenCalledWith(expectedCreateVisaArgs)

        createSpy.mockRestore()
        findUserSpy.mockRestore()
        createVisaSpy.mockRestore()
      })
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('.get:ACCESS_TOKEN_HEADER_KEY', () => {
    describe('to return fixed value', () => {
      test('to return "x-renchan-access-token"', () => {
        const expected = 'x-renchan-access-token'

        expect(BaseRestfulApiContext.ACCESS_TOKEN_HEADER_KEY)
          .toBe(expected)
      })
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('.extractAccessToken()', () => {
    describe('to return access token', () => {
      /**
       * @type {Array<{
       *   params: {
       *     expressRequest: ExpressType.Request
       *   }
       *   expected: string
       * }>}
       */
      const cases = /** @type {*} */ ([
        {
          params: {
            expressRequest: {
              headers: {
                'x-renchan-access-token': 'alpha',
              },
            },
          },
          expected: 'alpha',
        },
        {
          params: {
            expressRequest: {
              headers: {
                'x-renchan-access-token': 'beta',
              },
            },
          },
          expected: 'beta',
        },
      ])

      test.each(cases)('x-renchan-access-token: $params.expressRequest.headers["x-renchan-access-token"]', ({ params, expected }) => {
        const accessToken = BaseRestfulApiContext.extractAccessToken(params)

        expect(accessToken)
          .toBe(expected)
      })
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('.get:Visa', () => {
    test('to be bridge class', () => {
      const actual = BaseRestfulApiContext.Visa

      expect(actual)
        .toBe(RestfulApiVisa) // same reference
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('.findUser()', () => {
    describe('to return fixed value', () => {
      test('to return null', async () => {
        /** @type {ExpressType.Request} */
        const stubExpressRequest = /** @type {*} */ (
          StubExpressRequest.create()
        )

        const userEntity = await BaseRestfulApiContext.findUser({
          expressRequest: stubExpressRequest,
          accessToken: null,
        })

        expect(userEntity)
          .toBeNull()
      })
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('.createVisa()', () => {
    /** @type {RestfulApiType.ServerEngine} */
    const mockEngine = /** @type {*} */ ({
      visaIssuers: {},
    })

    describe('to return Visa instance', () => {
      /** @type {ExpressType.Request} */
      const stubExpressRequest = /** @type {*} */ (
        StubExpressRequest.create()
      )

      const cases = [
        {
          params: {
            Visa: class AlphaVisa extends RestfulApiVisa {},
          },
        },
        {
          params: {
            Visa: class BetaVisa extends RestfulApiVisa {},
          },
        },
      ]

      test.each(cases)('Visa: $params.Visa.name', async ({ params }) => {
        const BaseRestfulApiContextSpy = class extends BaseRestfulApiContext {
          static get Visa () {
            return params.Visa
          }
        }

        const args = {
          expressRequest: stubExpressRequest,
          userEntity: params.userEntity,
          engine: mockEngine,
          requestedAt: new Date(),
        }

        const visa = await BaseRestfulApiContextSpy.createVisa(args)

        expect(visa)
          .toBeInstanceOf(params.Visa)
      })
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('.generateUuid()', () => {
    describe('to be UUID like string', () => {
      const expected = expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/u)

      const cases = [
        { label: '[1] random generated UUID' },
        { label: '[2] random generated UUID' },
        { label: '[3] random generated UUID' },
        { label: '[4] random generated UUID' },
        { label: '[5] random generated UUID' },
      ]

      test.each(cases)('$label', ({ label }) => {
        const uuid = BaseRestfulApiContext.generateUuid()

        expect(uuid)
          .toEqual(expected)
      })
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('#get:userId', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ ({})

    /** @type {RestfulApiType.ServerEngine} */
    const engineMock = /** @type {*} */ ({})

    /** @type {RestfulApiType.Visa} */
    const visaMock = /** @type {*} */ ({})

    describe('to return id of #userEntity', () => {
      const cases = [
        {
          params: {
            userEntity: {
              id: 10001,
              username: 'JohnDoe',
            },
          },
          expected: 10001,
        },
        {
          params: {
            userEntity: {
              id: 10002,
              username: 'JaneSmith',
            },
          },
          expected: 10002,
        },
      ]

      test.each(cases)('userId: $params.userEntity.id', ({ params, expected }) => {
        const context = new BaseRestfulApiContext({
          expressRequest: expressRequestMock,
          engine: engineMock,
          userEntity: params.userEntity,
          visa: visaMock,
          requestedAt: new Date(),
          uuid: '98765432-abcd-0000-1234-000000000001',
        })

        const actual = context.userId

        expect(actual)
          .toBe(expected)
      })
    })

    describe('to be null', () => {
      const cases = [
        {
          params: {
            userEntity: null,
          },
        },
      ]

      test.each(cases)('userEntity: $params.userEntity', ({ params, expected }) => {
        const context = new BaseRestfulApiContext({
          expressRequest: expressRequestMock,
          engine: engineMock,
          userEntity: params.userEntity,
          visa: visaMock,
          requestedAt: new Date(),
          uuid: '98765432-abcd-0000-1234-000000000001',
        })

        const actual = context.userId

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('#canRender()', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    /** @type {RestfulApiType.ServerEngine} */
    const engineMock = /** @type {*} */ ({})

    describe('to be truthy', () => {
      const cases = [
        {
          params: {
            visa: RestfulApiVisa.create({
              hasAuthenticated: true,
              hasAuthorized: true,
              hasPathPermission: true,
            }),
          },
        },
      ]

      test.each(cases)('visa: $params.visa', ({ params }) => {
        const context = new BaseRestfulApiContext({
          expressRequest: expressRequestMock,
          engine: engineMock,
          userEntity: null,
          visa: params.visa,
          requestedAt: new Date(),
          uuid: '98765432-abcd-0000-1234-000000000001',
        })

        const actual = context.canRender()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          params: {
            visa: RestfulApiVisa.create({
              hasAuthenticated: true,
              hasAuthorized: true,
              hasPathPermission: false,
            }),
          },
        },
        {
          params: {
            visa: RestfulApiVisa.create({
              hasAuthenticated: true,
              hasAuthorized: false,
              hasPathPermission: true,
            }),
          },
        },
        {
          params: {
            visa: RestfulApiVisa.create({
              hasAuthenticated: true,
              hasAuthorized: false,
              hasPathPermission: false,
            }),
          },
        },
        {
          params: {
            visa: RestfulApiVisa.create({
              hasAuthenticated: false,
              hasAuthorized: true,
              hasPathPermission: true,
            }),
          },
        },
        {
          params: {
            visa: RestfulApiVisa.create({
              hasAuthenticated: false,
              hasAuthorized: true,
              hasPathPermission: false,
            }),
          },
        },
        {
          params: {
            visa: RestfulApiVisa.create({
              hasAuthenticated: false,
              hasAuthorized: false,
              hasPathPermission: true,
            }),
          },
        },
        {
          params: {
            visa: RestfulApiVisa.create({
              hasAuthenticated: false,
              hasAuthorized: false,
              hasPathPermission: false,
            }),
          },
        },
      ]

      test.each(cases)('visa: $params.visa', ({ params }) => {
        const context = new BaseRestfulApiContext({
          expressRequest: expressRequestMock,
          engine: engineMock,
          userEntity: null,
          visa: params.visa,
          requestedAt: new Date(),
          uuid: '98765432-abcd-0000-1234-000000000001',
        })

        const actual = context.canRender()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('#hasAuthenticated()', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    /** @type {RestfulApiType.ServerEngine} */
    const engineMock = /** @type {*} */ ({})

    const cases = [
      {
        params: {
          hasAuthenticated: true,
        },
        expected: true,
      },
      {
        params: {
          hasAuthenticated: false,
        },
        expected: false,
      },
    ]

    test.each(cases)('hasAuthenticated: $params.hasAuthenticated', ({ params, expected }) => {
      const args = {
        hasAuthenticated: params.hasAuthenticated,
        hasAuthorized: true,
        hasPathPermission: false,
      }
      const visa = RestfulApiVisa.create(args)

      const context = new BaseRestfulApiContext({
        expressRequest: expressRequestMock,
        engine: engineMock,
        userEntity: null,
        visa,
        requestedAt: new Date(),
        uuid: '98765432-abcd-0000-1234-000000000001',
      })

      const actual = context.hasAuthenticated()

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('#hasAuthorized()', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    /** @type {RestfulApiType.ServerEngine} */
    const engineMock = /** @type {*} */ ({})

    const cases = [
      {
        params: {
          hasAuthorized: true,
        },
        expected: true,
      },
      {
        params: {
          hasAuthorized: false,
        },
        expected: false,
      },
    ]

    test.each(cases)('hasAuthorized: $params.hasAuthorized', ({ params, expected }) => {
      const args = {
        hasAuthenticated: false,
        hasAuthorized: params.hasAuthorized,
        hasPathPermission: true,
      }
      const visa = RestfulApiVisa.create(args)

      const context = new BaseRestfulApiContext({
        expressRequest: expressRequestMock,
        engine: engineMock,
        userEntity: null,
        visa,
        requestedAt: new Date(),
        uuid: '98765432-abcd-0000-1234-000000000001',
      })

      const actual = context.hasAuthorized()

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('#hasPathPermission()', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    /** @type {RestfulApiType.ServerEngine} */
    const engineMock = /** @type {*} */ ({})

    const cases = [
      {
        params: {
          hasPathPermission: true,
        },
        expected: true,
      },
      {
        params: {
          hasPathPermission: false,
        },
        expected: false,
      },
    ]

    test.each(cases)('hasPathPermission: $params.hasPathPermission', ({ params, expected }) => {
      const args = {
        hasAuthenticated: false,
        hasAuthorized: true,
        hasPathPermission: params.hasPathPermission,
      }
      const visa = RestfulApiVisa.create(args)

      const context = new BaseRestfulApiContext({
        expressRequest: expressRequestMock,
        engine: engineMock,
        userEntity: null,
        visa,
        requestedAt: new Date(),
        uuid: '98765432-abcd-0000-1234-000000000001',
      })

      const actual = context.hasPathPermission()

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('#get:share', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    const visaMock = RestfulApiVisa.create()

    const cases = [
      {
        params: {
          Engine: AlphaRestfulApiServerEngine,
        },
        expected: {
          Share: AlphaRestfulApiShare,
        },
      },
      {
        params: {
          Engine: BetaRestfulApiServerEngine,
        },
        expected: {
          Share: BetaRestfulApiShare,
        },
      },
    ]

    test.each(cases)('Engine: $params.Engine.name', async ({ params, expected }) => {
      const engine = await params.Engine.createAsync()

      const args = {
        expressRequest: expressRequestMock,
        engine,
        userEntity: null,
        visa: visaMock,
        requestedAt: new Date(),
        uuid: '98765432-abcd-0000-1234-000000000001',
      }
      const context = new BaseRestfulApiContext(args)

      const actual = context.share

      expect(actual)
        .toBeInstanceOf(expected.Share)
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('#get:env', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    const visaMock = RestfulApiVisa.create()

    /**
     * @type {Array<{
     *   params: {
     *     Engine: RestfulApiType.ServerEngineCtor
     *   }
     *   expected: renchan.RenchanEnv
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          Engine: class extends AlphaRestfulApiServerEngine {
            get env () {
              return /** @type {*} */ ({
                NODE_ENV: 'customer-development',
              })
            }
          },
        },
        expected: {
          NODE_ENV: 'customer-development',
        },
      },
      {
        params: {
          Engine: class extends BetaRestfulApiServerEngine {
            get env () {
              return /** @type {*} */ ({
                NODE_ENV: 'admin-development',
              })
            }
          },
        },
        expected: {
          NODE_ENV: 'admin-development',
        },
      },
    ])

    test.each(cases)('Engine: $params.Engine.name', ({ params, expected }) => {
      const engine = new params.Engine({
        config: /** @type {*} */ ({}),
        share: /** @type {*} */ ({}),
        errorResponseHash: {},
      })

      const args = {
        expressRequest: expressRequestMock,
        engine,
        userEntity: null,
        visa: visaMock,
        requestedAt: new Date(),
        uuid: '98765432-abcd-0000-1234-000000000001',
      }
      const context = new BaseRestfulApiContext(args)

      const actual = context.env

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('#get:NODE_ENV', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    const visaMock = RestfulApiVisa.create()

    /**
     * @type {Array<{
     *   params: {
     *     Engine: RestfulApiType.ServerEngineCtor
     *   }
     *   expected: string
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          Engine: class extends AlphaRestfulApiServerEngine {
            get env () {
              return /** @type {*} */ ({
                NODE_ENV: 'customer-development',
              })
            }
          },
        },
        expected: 'customer-development',
      },
      {
        params: {
          Engine: class extends BetaRestfulApiServerEngine {
            get env () {
              return /** @type {*} */ ({
                NODE_ENV: 'admin-development',
              })
            }
          },
        },
        expected: 'admin-development',
      },
    ])

    test.each(cases)('Engine: $params.Engine.name', ({ params, expected }) => {
      const engine = new params.Engine({
        config: /** @type {*} */ ({}),
        share: /** @type {*} */ ({}),
        errorResponseHash: {},
      })

      const args = {
        expressRequest: expressRequestMock,
        engine,
        userEntity: null,
        visa: visaMock,
        requestedAt: new Date(),
        uuid: '98765432-abcd-0000-1234-000000000001',
      }
      const context = new BaseRestfulApiContext(args)

      const actual = context.NODE_ENV

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('BaseRestfulApiContext', () => {
  describe('#get:now', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    const visaMock = RestfulApiVisa.create()

    /**
     * @type {Array<{
     *   params: {
     *     requestedAt: Date
     *   }
     *   expected: renchan.RenchanEnv
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          requestedAt: new Date('2024-11-21T11:22:33.999Z'),
        },
      },
      {
        params: {
          requestedAt: new Date('2024-11-22T11:22:33.999Z'),
        },
      },
    ])

    test.each(cases)('requestedAt: $params.requestedAt', ({ params }) => {
      const engine = new BaseRestfulApiServerEngine({
        config: /** @type {*} */ ({}),
        share: /** @type {*} */ ({}),
        errorResponseHash: {},
      })

      const args = {
        expressRequest: expressRequestMock,
        engine,
        userEntity: null,
        visa: visaMock,
        requestedAt: params.requestedAt,
        uuid: '98765432-abcd-0000-1234-000000000001',
      }
      const context = new BaseRestfulApiContext(args)

      const actual = context.now

      expect(actual)
        .toEqual(params.requestedAt)
    })
  })
})
