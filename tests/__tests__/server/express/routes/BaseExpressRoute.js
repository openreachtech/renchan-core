import BaseExpressRoute from '../../../../../lib/server/express/routes/BaseExpressRoute.js'

import MiddlewareExpressRoute from '../../../../../lib/server/express/routes/MiddlewareExpressRoute.js'
import GetMethodExpressRoute from '../../../../../lib/server/express/routes/GetMethodExpressRoute.js'
import PostMethodExpressRoute from '../../../../../lib/server/express/routes/PostMethodExpressRoute.js'

describe('BaseExpressRoute', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#method', () => {
        const cases = [
          {
            params: {
              method: 'use',
            },
          },
          {
            params: {
              method: 'get',
            },
          },
          {
            params: {
              method: 'post',
            },
          },
        ]

        test.each(cases)('method: $params.method', ({ params }) => {
          const args = {
            method: params.method,
            path: '/',
            handlers: [],
          }
          const route = new BaseExpressRoute(args)

          expect(route)
            .toHaveProperty('method', params.method)
        })
      })

      describe('#path', () => {
        const cases = [
          {
            params: {
              path: 'use',
            },
          },
          {
            params: {
              path: 'get',
            },
          },
          {
            params: {
              path: 'post',
            },
          },
        ]

        test.each(cases)('path: $params.path', ({ params }) => {
          const args = {
            method: 'use',
            path: params.path,
            handlers: [],
          }
          const route = new BaseExpressRoute(args)

          expect(route)
            .toHaveProperty('path', params.path)
        })
      })

      describe('#handlers', () => {
        /**
         * @type {Array<{
         *   params: {
         *     handlers: Array<ExpressType.Middleware>
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              handlers: [
                MiddlewareExpressRoute.create({
                  path: '/',
                  handlers: [],
                }),
              ],
            },
          },
          {
            params: {
              handlers: [
                GetMethodExpressRoute.create({
                  path: '/customer',
                  handlers: [],
                }),
                PostMethodExpressRoute.create({
                  path: '/customer',
                  handlers: [],
                }),
              ],
            },
          },
          {
            params: {
              handlers: [],
            },
          },
        ])

        test.each(cases)('handlers: $params.handlers.length', ({ params }) => {
          const args = {
            method: 'use',
            path: '/',
            handlers: params.handlers,
          }
          const route = new BaseExpressRoute(args)

          expect(route)
            .toHaveProperty('handlers', params.handlers)
        })
      })
    })
  })
})

describe('BaseExpressRoute', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            method: 'use',
            path: '/',
            handlers: [],
          },
        },
        {
          params: {
            method: 'get',
            path: '/v1',
            handlers: [],
          },
        },
        {
          params: {
            method: 'post',
            path: '/bypass',
            handlers: [],
          },
        },
      ]

      test.each(cases)('method: $params.method', ({ params }) => {
        const route = BaseExpressRoute.create(params)

        expect(route)
          .toBeInstanceOf(BaseExpressRoute)
      })
    })

    describe('to call constructor', () => {
      describe('with full parameters', () => {
        const cases = [
          {
            params: {
              method: 'use',
              path: '/',
              handlers: [
                () => {},
                () => {},
                () => {},
              ],
            },
          },
          {
            params: {
              method: 'get',
              path: '/v1',
              handlers: [
                () => {},
                () => {},
              ],
            },
          },
          {
            params: {
              method: 'post',
              path: '/bypass',
              handlers: [
                () => {},
              ],
            },
          },
        ]

        test.each(cases)('method: $params.method', ({ params }) => {
          const SpyClass = globalThis.constructorSpy.spyOn(BaseExpressRoute)

          SpyClass.create(params)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(params)
        })
      })

      describe('with lacked parameters', () => {
        /**
         * @type {Array<{
         *   params: {
         *     method?: string
         *     path?: string
         *     handlers: Array<ExpressType.Middleware>
         *   }
         *   expected: {
         *     method: string
         *     path: string
         *     handlers: Array<ExpressType.Middleware>
         *   }
         * }>}
         */
        const cases = [
          {
            params: {
              // method: 'use',
              path: '/',
              handlers: [
                () => {},
                () => {},
                () => {},
              ],
            },
            expected: {
              method: 'use',
              path: '/',
              handlers: [
                expect.any(Function),
                expect.any(Function),
                expect.any(Function),
              ],
            },
          },
          {
            params: {
              method: 'get',
              // path: '/v1',
              handlers: [
                () => {},
                () => {},
              ],
            },
            expected: {
              method: 'get',
              path: '/',
              handlers: [
                expect.any(Function),
                expect.any(Function),
              ],
            },
          },
          {
            params: {
              // method: 'post',
              // path: '/bypass',
              handlers: [
                () => {},
              ],
            },
            expected: {
              method: 'use',
              path: '/',
              handlers: [
                expect.any(Function),
              ],
            },
          },
        ]

        test.each(cases)('method: $params.method', ({ params, expected }) => {
          const SpyClass = globalThis.constructorSpy.spyOn(BaseExpressRoute)

          SpyClass.create(params)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(expected)
        })
      })
    })
  })
})

describe('BaseExpressRoute', () => {
  describe('#mountTo()', () => {
    const cases = [
      {
        params: {
          method: 'use',
          path: '/',
          handlers: [],
        },
      },
      {
        params: {
          method: 'get',
          path: '/v1',
          handlers: [],
        },
      },
      {
        params: {
          method: 'post',
          path: '/bypass',
          handlers: [],
        },
      },
    ]

    test.each(cases)('method: $params.method', ({ params }) => {
      const route = new BaseExpressRoute(params)

      /**
       * @type {jest.Mocked<ExpressType.Application>}
       */
      const appSpy = /** @type {any} */ ({
        use: jest.fn(),
        get: jest.fn(),
        post: jest.fn(),
      })

      const expected = [
        params.path,
        ...params.handlers,
      ]

      route.mountTo({
        app: appSpy,
      })

      expect(appSpy[params.method])
        .toHaveBeenCalledWith(...expected)
    })
  })
})
