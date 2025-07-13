import BaseHeadRenderer from '../../../../../lib/server/restfulapi/renderers/BaseHeadRenderer.js'

import BaseRenderer from '../../../../../lib/server/restfulapi/renderers/BaseRenderer.js'

describe('BaseHeadRenderer', () => {
  describe('super class', () => {
    test('to be BaseRenderer', () => {
      const actual = BaseHeadRenderer.prototype

      expect(actual)
        .toBeInstanceOf(BaseRenderer)
    })
  })
})

describe('BaseHeadRenderer', () => {
  describe('.get:method', () => {
    test('to be fixed value', () => {
      const expected = 'head'

      const actual = BaseHeadRenderer.method

      expect(actual)
        .toBe(expected)
    })
  })
})
