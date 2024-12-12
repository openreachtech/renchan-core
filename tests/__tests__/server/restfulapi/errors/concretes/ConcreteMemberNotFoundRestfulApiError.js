import ConcreteMemberNotFoundRestfulApiError from '../../../../../../lib/server/restfulapi/errors/concretes/ConcreteMemberNotFoundRestfulApiError.js'
import RenchanRestfulApiError from '../../../../../../lib/server/restfulapi/errors/RenchanRestfulApiError.js'

describe('ConcreteMemberNotFoundRestfulApiError', () => {
  describe('super class', () => {
    test('to be RenchanRestfulApiError', () => {
      const actual = ConcreteMemberNotFoundRestfulApiError.prototype

      expect(actual)
        .toBeInstanceOf(RenchanRestfulApiError)
    })
  })
})

describe('ConcreteMemberNotFoundRestfulApiError', () => {
  describe('.get:errorCode', () => {
    test('to be fixed value', () => {
      const expected = 'concrete-member-not-found'

      const actual = ConcreteMemberNotFoundRestfulApiError.errorCode

      expect(actual)
        .toBe(expected)
    })
  })
})
