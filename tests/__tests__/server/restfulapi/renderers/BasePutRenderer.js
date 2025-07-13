import BasePutRenderer from '../../../../../lib/server/restfulapi/renderers/BasePutRenderer.js'

import BaseRequestBodyRenderer from '../../../../../lib/server/restfulapi/renderers/BaseRequestBodyRenderer.js'

describe('BasePutRenderer', () => {
  describe('inheritance', () => {
    test('to be BaseRequestBodyRenderer', () => {
      const actual = BasePutRenderer.prototype

      expect(actual)
        .toBeInstanceOf(BaseRequestBodyRenderer)
    })
  })
})

describe('BasePutRenderer', () => {
  describe('.get:method', () => {
    test('to be fixed value', () => {
      const expected = 'put'

      const actual = BasePutRenderer.method

      expect(actual)
        .toBe(expected)
    })
  })
})
