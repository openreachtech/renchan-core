import SignInMutationPostWorker from '../../../../../../../../app/server/graphql/post-workers/customer/mutations/SignInMutationPostWorker.js'

import BaseGraphqlPostWorker from '../../../../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

describe('SignInMutationPostWorker', () => {
  describe('super class', () => {
    test('to be instance of BaseGraphqlPostWorker', () => {
      const actual = SignInMutationPostWorker.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPostWorker)
    })
  })
})

describe('SignInMutationPostWorker', () => {
  describe('.get:schema', () => {
    test('to be fixed value', () => {
      const expected = 'signIn'

      const actual = SignInMutationPostWorker.schema

      expect(actual)
        .toBe(expected)
    })
  })
})
