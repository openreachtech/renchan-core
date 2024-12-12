import CustomerGraphqlShare from '../../../../../../app/server/graphql/contexts/CustomerGraphqlShare.js'
import BaseGraphqlShare from '../../../../../../lib/server/graphql/contexts/BaseGraphqlShare.js'

describe('CustomerGraphqlShare', () => {
  describe('super class', () => {
    test('to be defined from BaseGraphqlShare', () => {
      const actual = CustomerGraphqlShare.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlShare)
    })
  })
})
