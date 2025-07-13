import BaseDeleteRenderer from '../../../../../lib/server/restfulapi/renderers/BaseDeleteRenderer.js'

import BaseRenderer from '../../../../../lib/server/restfulapi/renderers/BaseRenderer.js'

describe('BaseDeleteRenderer', () => {
  describe('super class', () => {
    test('to be BaseRenderer', () => {
      const actual = BaseDeleteRenderer.prototype

      expect(actual)
        .toBeInstanceOf(BaseRenderer)
    })
  })
})

describe('BaseDeleteRenderer', () => {
  describe('.get:method', () => {
    test('to be fixed value', () => {
      const expected = 'delete'

      const actual = BaseDeleteRenderer.method

      expect(actual)
        .toBe(expected)
    })
  })
})
