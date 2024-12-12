import BaseQueryResolver from '../../../../../lib/server/graphql/resolvers/BaseQueryResolver.js'
import BaseResolver from '../../../../../lib/server/graphql/resolvers/BaseResolver.js'

describe('BaseQueryResolver', () => {
  describe('super class', () => {
    test('to be BaseResolver', () => {
      const actual = BaseQueryResolver.prototype

      expect(actual)
        .toBeInstanceOf(BaseResolver)
    })
  })
})

describe('BaseQueryResolver', () => {
  describe('.get:operation', () => {
    test('to be fixed value', () => {
      const expected = 'Query'

      const actual = BaseQueryResolver.operation

      expect(actual)
        .toBe(expected)
    })
  })
})
