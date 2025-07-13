import BaseTraceRenderer from '../../../../../lib/server/restfulapi/renderers/BaseTraceRenderer.js'

import BaseRenderer from '../../../../../lib/server/restfulapi/renderers/BaseRenderer.js'

describe('BaseTraceRenderer', () => {
  describe('super class', () => {
    test('to be BaseRenderer', () => {
      const actual = BaseTraceRenderer.prototype

      expect(actual)
        .toBeInstanceOf(BaseRenderer)
    })
  })
})

describe('BaseTraceRenderer', () => {
  describe('.get:method', () => {
    test('to be fixed value', () => {
      const expected = 'trace'

      const actual = BaseTraceRenderer.method

      expect(actual)
        .toBe(expected)
    })
  })
})
