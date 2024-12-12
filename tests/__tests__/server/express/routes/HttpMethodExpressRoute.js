import HttpMethodExpressRoute from '../../../../../lib/server/express/routes/HttpMethodExpressRoute.js'

import BaseExpressRoute from '../../../../../lib/server/express/routes/BaseExpressRoute.js'

describe('HttpMethodExpressRoute', () => {
  describe('super class', () => {
    test('to be BaseExpressRoute', () => {
      const actual = HttpMethodExpressRoute.prototype

      expect(actual)
        .toBeInstanceOf(BaseExpressRoute)
    })
  })
})
