import BasePatchRenderer from '../../../../../lib/server/restfulapi/renderers/BasePatchRenderer.js'

import BaseRequestBodyRenderer from '../../../../../lib/server/restfulapi/renderers/BaseRequestBodyRenderer.js'

describe('BasePatchRenderer', () => {
  describe('inheritance', () => {
    test('to be BaseRequestBodyRenderer', () => {
      const actual = BasePatchRenderer.prototype

      expect(actual)
        .toBeInstanceOf(BaseRequestBodyRenderer)
    })
  })
})

describe('BasePatchRenderer', () => {
  describe('.get:method', () => {
    test('to be fixed value', () => {
      const expected = 'patch'

      const actual = BasePatchRenderer.method

      expect(actual)
        .toBe(expected)
    })
  })
})
