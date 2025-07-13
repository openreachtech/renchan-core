import BasePostRenderer from '../../../../../lib/server/restfulapi/renderers/BasePostRenderer.js'

import BaseRequestBodyRenderer from '../../../../../lib/server/restfulapi/renderers/BaseRequestBodyRenderer.js'

describe('BasePostRenderer', () => {
  describe('inheritance', () => {
    test('to be BaseRequestBodyRenderer', () => {
      const actual = BasePostRenderer.prototype

      expect(actual)
        .toBeInstanceOf(BaseRequestBodyRenderer)
    })
  })
})

describe('BasePostRenderer', () => {
  describe('.get:method', () => {
    test('to be fixed value', () => {
      const expected = 'post'

      const actual = BasePostRenderer.method

      expect(actual)
        .toBe(expected)
    })
  })
})
