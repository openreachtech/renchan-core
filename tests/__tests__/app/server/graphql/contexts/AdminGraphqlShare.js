import AdminGraphqlShare from '../../../../../../app/server/graphql/contexts/AdminGraphqlShare.js'
import BaseGraphqlShare from '../../../../../../lib/server/graphql/contexts/BaseGraphqlShare.js'

describe('AdminGraphqlShare', () => {
  describe('super class', () => {
    test('to be defined from BaseGraphqlShare', () => {
      const actual = AdminGraphqlShare.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlShare)
    })
  })
})
