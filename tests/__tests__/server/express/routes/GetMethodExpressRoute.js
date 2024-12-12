import GetMethodExpressRoute from '../../../../../lib/server/express/routes/GetMethodExpressRoute.js'

import BaseExpressRoute from '../../../../../lib/server/express/routes/BaseExpressRoute.js'

describe('GetMethodExpressRoute', () => {
  describe('super class', () => {
    test('to be BaseExpressRoute', () => {
      const actual = GetMethodExpressRoute.prototype

      expect(actual)
        .toBeInstanceOf(BaseExpressRoute)
    })
  })
})

describe('GetMethodExpressRoute', () => {
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
      ]

      test.each(cases)('path: $params.path', ({ params }) => {
        const route = GetMethodExpressRoute.create(params)

        expect(route)
          .toBeInstanceOf(GetMethodExpressRoute)
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
            method: 'get',
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
            method: 'get',
            path: '/customer',
            handlers: [
              expect.any(Function),
              expect.any(Function),
            ],
          },
        },
      ]

      test.each(cases)('path: $params.path', ({ params, expected }) => {
        const createSpy = jest.spyOn(BaseExpressRoute, 'create')

        GetMethodExpressRoute.create(params)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})
