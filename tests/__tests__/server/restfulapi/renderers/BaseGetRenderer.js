import BaseGetRenderer from '../../../../../lib/server/restfulapi/renderers/BaseGetRenderer.js'

import BaseRenderer from '../../../../../lib/server/restfulapi/renderers/BaseRenderer.js'

describe('BaseGetRenderer', () => {
  describe('super class', () => {
    test('to be BaseRenderer', () => {
      const actual = BaseGetRenderer.prototype

      expect(actual)
        .toBeInstanceOf(BaseRenderer)
    })
  })
})

describe('BaseGetRenderer', () => {
  describe('.get:method', () => {
    test('to be fixed value', () => {
      const expected = 'get'

      const actual = BaseGetRenderer.method

      expect(actual)
        .toBe(expected)
    })
  })
})
