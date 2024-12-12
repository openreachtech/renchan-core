import ConcreteMemberNotFoundGraphqlError from '../../../../../../lib/server/graphql/errors/concretes/ConcreteMemberNotFoundGraphqlError.js'
import RenchanGraphqlError from '../../../../../../lib/server/graphql/errors/RenchanGraphqlError.js'

describe('ConcreteMemberNotFoundGraphqlError', () => {
  describe('super class', () => {
    test('to be RenchanGraphqlError', () => {
      const actual = ConcreteMemberNotFoundGraphqlError.prototype

      expect(actual)
        .toBeInstanceOf(RenchanGraphqlError)
    })
  })
})

describe('ConcreteMemberNotFoundGraphqlError', () => {
  describe('.get:errorCode', () => {
    test('to be fixed value', () => {
      const expected = 'concrete-member-not-found'

      const actual = ConcreteMemberNotFoundGraphqlError.errorCode

      expect(actual)
        .toBe(expected)
    })
  })
})
