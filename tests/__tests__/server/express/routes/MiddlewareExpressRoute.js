import MiddlewareExpressRoute from '../../../../../lib/server/express/routes/MiddlewareExpressRoute.js'

import BaseExpressRoute from '../../../../../lib/server/express/routes/BaseExpressRoute.js'

describe('MiddlewareExpressRoute', () => {
  describe('super class', () => {
    test('to be BaseExpressRoute', () => {
      const actual = MiddlewareExpressRoute.prototype

      expect(actual)
        .toBeInstanceOf(BaseExpressRoute)
    })
  })
})

describe('MiddlewareExpressRoute', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            path: '/',
            handlers: [
              () => {},
            ],
          },
        },
        {
          params: {
            path: '/customer',
            handlers: [
              () => {},
              () => {},
            ],
          },
        },
        {
          params: {
            // path: undefined,
            handlers: [
              () => {},
              () => {},
              () => {},
            ],
          },
        },
      ]

      test.each(cases)('path: $params.path', ({ params }) => {
        const route = MiddlewareExpressRoute.create(params)

        expect(route)
          .toBeInstanceOf(MiddlewareExpressRoute)
      })
    })

    describe('to call super.create()', () => {
      const cases = [
        {
          params: {
            path: '/',
            handlers: [
              () => {},
            ],
          },
          expected: {
            path: '/',
            handlers: [
              expect.any(Function),
            ],
          },
        },
        {
          params: {
            path: '/customer',
            handlers: [
              () => {},
              () => {},
            ],
          },
          expected: {
            path: '/customer',
            handlers: [
              expect.any(Function),
              expect.any(Function),
            ],
          },
        },
        {
          params: {
            path: undefined,
            handlers: [
              () => {},
              () => {},
              () => {},
            ],
          },
          expected: {
            path: '/',
            handlers: [
              expect.any(Function),
              expect.any(Function),
              expect.any(Function),
            ],
          },
        },
      ]

      test.each(cases)('path: $params.path', ({ params, expected }) => {
        const createSpy = jest.spyOn(BaseExpressRoute, 'create')

        MiddlewareExpressRoute.create(params)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})
