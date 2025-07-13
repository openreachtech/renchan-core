import BaseConnectRenderer from '../../../../../lib/server/restfulapi/renderers/BaseConnectRenderer.js'

import BaseRenderer from '../../../../../lib/server/restfulapi/renderers/BaseRenderer.js'

describe('BaseConnectRenderer', () => {
  describe('super class', () => {
    test('to be BaseRenderer', () => {
      const actual = BaseConnectRenderer.prototype

      expect(actual)
        .toBeInstanceOf(BaseRenderer)
    })
  })
})

describe('BaseConnectRenderer', () => {
  describe('.get:method', () => {
    test('to be fixed value', () => {
      const expected = 'connect'

      const actual = BaseConnectRenderer.method

      expect(actual)
        .toBe(expected)
    })
  })
})
