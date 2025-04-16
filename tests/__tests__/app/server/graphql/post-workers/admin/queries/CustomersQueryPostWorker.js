import CustomersQueryPostWorker from '../../../../../../../../app/server/graphql/post-workers/admin/queries/CustomersQueryPostWorker.js'

import BaseGraphqlPostWorker from '../../../../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

describe('CustomersQueryPostWorker', () => {
  describe('super class', () => {
    test('to be instance of BaseGraphqlPostWorker', () => {
      const actual = CustomersQueryPostWorker.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPostWorker)
    })
  })
})

describe('CustomersQueryPostWorker', () => {
  describe('.get:schema', () => {
    test('to be fixed value', () => {
      const expected = 'customers'

      const actual = CustomersQueryPostWorker.schema

      expect(actual)
        .toBe(expected)
    })
  })
})
