import RestfulApiVisa from '../../../../../lib/server/restfulapi/contexts/RestfulApiVisa.js'

import StubExpressRequest from '../../../../stubs/StubExpressRequest.js'

import AlphaRestfulApiServerEngine from '../../../../mocks/engines/AlphaRestfulApiServerEngine.js'
import BetaRestfulApiServerEngine from '../../../../mocks/engines/BetaRestfulApiServerEngine.js'

describe('RestfulApiVisa', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#hasAuthenticated', () => {
        const cases = [
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: true,
              hasPathPermission: true,
            },
          },
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: true,
              hasPathPermission: false,
            },
          },
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: false,
              hasPathPermission: true,
            },
          },
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: false,
              hasPathPermission: false,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: true,
              hasPathPermission: true,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: true,
              hasPathPermission: false,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: false,
              hasPathPermission: true,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: false,
              hasPathPermission: false,
            },
          },
        ]

        test.each(cases)('hasAuthenticated: $params.hasAuthenticated, hasAuthorized: $params.hasAuthorized, hasPathPermission: $params.hasPathPermission', ({ params }) => {
          const visa = new RestfulApiVisa(params)

          expect(visa)
            .toHaveProperty('hasAuthenticated', params.hasAuthenticated)
        })
      })

      describe('#hasAuthorized', () => {
        const cases = [
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: true,
              hasPathPermission: true,
            },
          },
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: true,
              hasPathPermission: false,
            },
          },
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: false,
              hasPathPermission: true,
            },
          },
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: false,
              hasPathPermission: false,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: true,
              hasPathPermission: true,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: true,
              hasPathPermission: false,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: false,
              hasPathPermission: true,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: false,
              hasPathPermission: false,
            },
          },
        ]

        test.each(cases)('hasAuthenticated: $params.hasAuthenticated, hasAuthorized: $params.hasAuthorized, hasPathPermission: $params.hasPathPermission', ({ params }) => {
          const visa = new RestfulApiVisa(params)

          expect(visa)
            .toHaveProperty('hasAuthorized', params.hasAuthorized)
        })
      })

      describe('#hasPathPermission', () => {
        const cases = [
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: true,
              hasPathPermission: true,
            },
          },
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: true,
              hasPathPermission: false,
            },
          },
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: false,
              hasPathPermission: true,
            },
          },
          {
            params: {
              hasAuthenticated: true,
              hasAuthorized: false,
              hasPathPermission: false,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: true,
              hasPathPermission: true,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: true,
              hasPathPermission: false,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: false,
              hasPathPermission: true,
            },
          },
          {
            params: {
              hasAuthenticated: false,
              hasAuthorized: false,
              hasPathPermission: false,
            },
          },
        ]

        test.each(cases)('hasAuthenticated: $params.hasAuthenticated, hasAuthorized: $params.hasAuthorized, hasPathPermission: $params.hasPathPermission', ({ params }) => {
          const visa = new RestfulApiVisa(params)

          expect(visa)
            .toHaveProperty('hasPathPermission', params.hasPathPermission)
        })
      })
    })

    describe('to throw an error with invalid type', () => {
      /**
       * @type {Array<{
       *   params: import('../../../../../lib/server/restfulapi/contexts/RestfulApiVisa.js').RestfulApiVisaParams
       *   expected: string
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: null,
          expected: 'Cannot destructure property \'hasAuthenticated\' of \'object null\' as it is null.',
        },
        {
          params: undefined,
          expected: 'Cannot destructure property \'hasAuthenticated\' of \'undefined\' as it is undefined.',
        },
      ])

      test.each(cases)('params: $params', ({ params, expected }) => {
        expect(() => new RestfulApiVisa(params))
          .toThrow(expected)
      })
    })
  })
})

describe('RestfulApiVisa', () => {
  describe('.create()', () => {
    describe('to be an instance of own class', () => {
      const cases = [
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: true,
            hasPathPermission: true,
          },
        },
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: true,
            hasPathPermission: false,
          },
        },
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: false,
            hasPathPermission: true,
          },
        },
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: false,
            hasPathPermission: false,
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: true,
            hasPathPermission: true,
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: true,
            hasPathPermission: false,
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: false,
            hasPathPermission: true,
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: false,
            hasPathPermission: false,
          },
        },
      ]

      test.each(cases)('hasAuthenticated: $params.hasAuthenticated, hasAuthorized: $params.hasAuthorized, hasPathPermission: $params.hasPathPermission', ({ params }) => {
        const visa = RestfulApiVisa.create(params)

        expect(visa)
          .toBeInstanceOf(RestfulApiVisa)
      })

      test('with no arguments', () => {
        const visa = RestfulApiVisa.create()

        expect(visa)
          .toBeInstanceOf(RestfulApiVisa)
      })
    })

    describe('to call constructor with arguments', () => {
      const cases = [
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: true,
            hasPathPermission: true,
          },
          expected: {
            hasAuthenticated: true,
            hasAuthorized: true,
            hasPathPermission: true,
          },
        },
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: true,
            hasPathPermission: false,
          },
          expected: {
            hasAuthenticated: true,
            hasAuthorized: true,
            hasPathPermission: false,
          },
        },
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: false,
            hasPathPermission: true,
          },
          expected: {
            hasAuthenticated: true,
            hasAuthorized: false,
            hasPathPermission: true,
          },
        },
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: false,
            hasPathPermission: false,
          },
          expected: {
            hasAuthenticated: true,
            hasAuthorized: false,
            hasPathPermission: false,
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: true,
            hasPathPermission: true,
          },
          expected: {
            hasAuthenticated: false,
            hasAuthorized: true,
            hasPathPermission: true,
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: true,
            hasPathPermission: false,
          },
          expected: {
            hasAuthenticated: false,
            hasAuthorized: true,
            hasPathPermission: false,
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: false,
            hasPathPermission: true,
          },
          expected: {
            hasAuthenticated: false,
            hasAuthorized: false,
            hasPathPermission: true,
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: false,
            hasPathPermission: false,
          },
          expected: {
            hasAuthenticated: false,
            hasAuthorized: false,
            hasPathPermission: false,
          },
        },

        // lacked properties
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: false,
            // hasPathPermission: false,
          },
          expected: {
            hasAuthenticated: true,
            hasAuthorized: false,
            hasPathPermission: true,
          },
        },
        {
          params: {
            hasAuthenticated: true,
            // hasAuthorized: false,
            hasPathPermission: false,
          },
          expected: {
            hasAuthenticated: true,
            hasAuthorized: true,
            hasPathPermission: false,
          },
        },
        {
          params: {
            hasAuthenticated: true,
            // hasAuthorized: false,
            // hasPathPermission: false,
          },
          expected: {
            hasAuthenticated: true,
            hasAuthorized: true,
            hasPathPermission: true,
          },
        },
        {
          params: {
            // hasAuthenticated: true,
            hasAuthorized: false,
            hasPathPermission: false,
          },
          expected: {
            hasAuthenticated: false,
            hasAuthorized: false,
            hasPathPermission: false,
          },
        },
        {
          params: {
            // hasAuthenticated: true,
            hasAuthorized: false,
            // hasPathPermission: false,
          },
          expected: {
            hasAuthenticated: false,
            hasAuthorized: false,
            hasPathPermission: true,
          },
        },
        {
          params: {
            // hasAuthenticated: true,
            // hasAuthorized: false,
            hasPathPermission: false,
          },
          expected: {
            hasAuthenticated: false,
            hasAuthorized: true,
            hasPathPermission: false,
          },
        },
        {
          params: {
            // hasAuthenticated: true,
            // hasAuthorized: false,
            // hasPathPermission: false,
          },
          expected: {
            hasAuthenticated: false,
            hasAuthorized: true,
            hasPathPermission: true,
          },
        },
      ]

      test.each(cases)('hasAuthenticated: $params.hasAuthenticated, hasAuthorized: $params.hasAuthorized, hasPathPermission: $params.hasPathPermission', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(RestfulApiVisa)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })

      test('with no arguments', () => {
        const expected = {
          hasAuthenticated: false,
          hasAuthorized: true,
          hasPathPermission: true,
        }

        const SpyClass = globalThis.constructorSpy.spyOn(RestfulApiVisa)

        SpyClass.create()

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('to work correctly with inherited classes', () => {
      const cases = [
        {
          params: {
            Class: class AlphaRestfulApiVisa extends RestfulApiVisa {},
          },
        },
        {
          params: {
            Class: class BetaRestfulApiVisa extends RestfulApiVisa {},
          },
        },
        {
          params: {
            Class: class GammaRestfulApiVisa extends RestfulApiVisa {},
          },
        },
      ]

      test.each(cases)('Class: $params.Class.name', ({ params }) => {
        const visa = params.Class.create()

        expect(visa)
          .toBeInstanceOf(params.Class)
      })
    })
  })
})

describe('RestfulApiVisa', () => {
  describe('.createAsync()', () => {
    /** @type {ExpressType.Request} */
    const stubExpressRequest = /** @type {*} */ (
      StubExpressRequest.create()
    )

    describe('to be an instance of own class', () => {
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
          expressRequest: stubExpressRequest,
          engine,
          userEntity: null,
        }

        const visa = await RestfulApiVisa.createAsync(args)

        expect(visa)
          .toBeInstanceOf(RestfulApiVisa)
      })
    })

    describe('to call .create()', () => {
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
        const expected = {
          hasAuthenticated: false,
          hasAuthorized: true,
          hasPathPermission: true,
        }

        const createSpy = jest.spyOn(RestfulApiVisa, 'create')

        const engine = await params.Engine.createAsync()

        const args = {
          expressRequest: stubExpressRequest,
          engine,
          userEntity: null,
        }

        await RestfulApiVisa.createAsync(args)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('to call visa hooks', () => {
      const cases = [
        {
          params: {
            Engine: AlphaRestfulApiServerEngine,
            visaIssuers: {
              async hasAuthenticated () {
                return true // default value: false
              },
              async hasAuthorized () {
                return false // default value: true
              },
              async hasPathPermission () {
                return false // default value: true
              },
            },
          },
          expected: {
            hasAuthenticated: true,
            hasAuthorized: false,
            hasPathPermission: false,
          },
        },
        {
          params: {
            Engine: BetaRestfulApiServerEngine,
            visaIssuers: {
              async hasAuthenticated () {
                return false
              },
              async hasAuthorized () {
                return true
              },
              async hasPathPermission () {
                return true
              },
            },
          },
          expected: {
            hasAuthenticated: false,
            hasAuthorized: true,
            hasPathPermission: true,
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params, expected }) => {
        const engine = await params.Engine.createAsync()

        /** @type {RestfulApiType.ServerEngine} */
        const derivedEngine = /** @type {*} */ ({
          __proto__: engine,

          visaIssuers: params.visaIssuers,
        })

        /** @type {renchan.UserEntity} */
        const userEntityTally = /** @type {*} */ ({})

        const args = {
          expressRequest: stubExpressRequest,
          engine: derivedEngine,
          userEntity: userEntityTally,
        }

        const expectedPassedArgs = {
          expressRequest: stubExpressRequest,
          userEntity: userEntityTally,
          engine: derivedEngine,
          requestedAt: expect.any(Date), // TODO: Replace with requestedAt of parameter.
        }

        const createSpy = jest.spyOn(RestfulApiVisa, 'create')
        const hasAuthenticatedSpy = jest.spyOn(params.visaIssuers, 'hasAuthenticated')
        const hasAuthorizedSpy = jest.spyOn(params.visaIssuers, 'hasAuthorized')
        const hasPathPermissionSpy = jest.spyOn(params.visaIssuers, 'hasPathPermission')

        await RestfulApiVisa.createAsync(args)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
        expect(hasAuthenticatedSpy)
          .toHaveBeenCalledWith(expectedPassedArgs)
        expect(hasAuthorizedSpy)
          .toHaveBeenCalledWith(expectedPassedArgs)
        expect(hasPathPermissionSpy)
          .toHaveBeenCalledWith(expectedPassedArgs)
      })
    })
  })
})

describe('RestfulApiVisa', () => {
  describe('#canRender()', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: true,
            hasPathPermission: true,
          },
        },
      ]

      test.each(cases)('hasAuthenticated: $params.hasAuthenticated, hasAuthorized: $params.hasAuthorized, hasPathPermission: $params.hasPathPermission,', ({ params }) => {
        const visa = RestfulApiVisa.create(params)

        const actual = visa.canRender()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: true,
            hasPathPermission: false,
          },
        },
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: false,
            hasPathPermission: true,
          },
        },
        {
          params: {
            hasAuthenticated: true,
            hasAuthorized: false,
            hasPathPermission: false,
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: true,
            hasPathPermission: true,
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: true,
            hasPathPermission: false,
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: false,
            hasPathPermission: true,
          },
        },
        {
          params: {
            hasAuthenticated: false,
            hasAuthorized: false,
            hasPathPermission: false,
          },
        },
      ]

      test.each(cases)('hasAuthenticated: $params.hasAuthenticated, hasAuthorized: $params.hasAuthorized, hasPathPermission: $params.hasPathPermission,', ({ params }) => {
        const visa = RestfulApiVisa.create(params)

        const actual = visa.canRender()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})
