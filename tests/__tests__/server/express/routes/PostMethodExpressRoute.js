import PostMethodExpressRoute from '../../../../../lib/server/express/routes/PostMethodExpressRoute.js'

import BaseExpressRoute from '../../../../../lib/server/express/routes/BaseExpressRoute.js'

describe('PostMethodExpressRoute', () => {
  describe('super class', () => {
    test('to be BaseExpressRoute', () => {
      const actual = PostMethodExpressRoute.prototype

      expect(actual)
        .toBeInstanceOf(BaseExpressRoute)
    })
  })
})

describe('PostMethodExpressRoute', () => {
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
        const route = PostMethodExpressRoute.create(params)

        expect(route)
          .toBeInstanceOf(PostMethodExpressRoute)
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
            method: 'post',
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
            method: 'post',
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

        PostMethodExpressRoute.create(params)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})
