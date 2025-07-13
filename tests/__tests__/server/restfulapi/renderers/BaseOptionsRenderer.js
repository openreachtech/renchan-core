import BaseOptionsRenderer from '../../../../../lib/server/restfulapi/renderers/BaseOptionsRenderer.js'

import BaseRenderer from '../../../../../lib/server/restfulapi/renderers/BaseRenderer.js'

describe('BaseOptionsRenderer', () => {
  describe('super class', () => {
    test('to be BaseRenderer', () => {
      const actual = BaseOptionsRenderer.prototype

      expect(actual)
        .toBeInstanceOf(BaseRenderer)
    })
  })
})

describe('BaseOptionsRenderer', () => {
  describe('.get:method', () => {
    test('to be fixed value', () => {
      const expected = 'options'

      const actual = BaseOptionsRenderer.method

      expect(actual)
        .toBe(expected)
    })
  })
})
