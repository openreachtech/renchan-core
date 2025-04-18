import CompanySponsorsQueryPostWorker from '../../../../../../../../app/server/graphql/post-workers/customer/queries/CompanySponsorsQueryPostWorker.js'

import BaseGraphqlPostWorker from '../../../../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

describe('CompanySponsorsQueryPostWorker', () => {
  describe('super class', () => {
    test('to be instance of BaseGraphqlPostWorker', () => {
      const actual = CompanySponsorsQueryPostWorker.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPostWorker)
    })
  })
})

describe('CompanySponsorsQueryPostWorker', () => {
  describe('.get:schema', () => {
    test('to be fixed value', () => {
      const expected = 'companySponsors'

      const actual = CompanySponsorsQueryPostWorker.schema

      expect(actual)
        .toBe(expected)
    })
  })
})
