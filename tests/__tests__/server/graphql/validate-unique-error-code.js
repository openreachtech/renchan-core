import rootPath from '../../../../lib/globals/root-path.js'

import GraphqlResolversLoader from '../../../../lib/server/graphql/resolvers/GraphqlResolversLoader.js'

describe('validate-unique-error-code', () => {
  describe('to be unique', () => {
    const cases = [
      {
        params: {
          poolPath: rootPath.to('tests/haystacks/unique-errors/correct/queries/'),
        },
      },
      {
        params: {
          poolPath: rootPath.to('tests/haystacks/unique-errors/correct/mutations/'),
        },
      },
      {
        params: {
          poolPath: rootPath.to('tests/haystacks/unique-errors/correct/'),
        },
      },

      // app
      {
        params: {
          poolPath: rootPath.to('app/server/graphql/resolvers/customer/actual/queries/'),
        },
      },
      {
        params: {
          poolPath: rootPath.to('app/server/graphql/resolvers/customer/actual/mutations/'),
        },
      },
      {
        params: {
          poolPath: rootPath.to('app/server/graphql/resolvers/customer/actual/subscriptions/'),
        },
      },
    ]

    test.each(cases)('poolPath: $params.poolPath', async ({ params }) => {
      const loader = GraphqlResolversLoader.create(params)

      const resolvers = await loader.loadResolvers()

      const allErrorCodes = resolvers
        .flatMap(it =>
          Object.values(it.errorCodeHash)
        )
        .sort(
          (alpha, beta) =>
            alpha.localeCompare(beta)
        )

      const uniqueErrorCodes = [...new Set(allErrorCodes)]

      expect(allErrorCodes)
        .toEqual(uniqueErrorCodes)
    })
  })

  /**
   * @description
   * Please do not use this test, because it is for finding not-unique error codes in the poolPath.
   */
  describe('to be not unique', () => {
    const cases = [
      {
        params: {
          poolPath: rootPath.to('tests/haystacks/unique-errors/incorrect/queries/'),
        },
      },
      {
        params: {
          poolPath: rootPath.to('tests/haystacks/unique-errors/incorrect/mutations/'),
        },
      },
      {
        params: {
          poolPath: rootPath.to('tests/haystacks/unique-errors/incorrect/'),
        },
      },
      {
        params: {
          poolPath: rootPath.to('tests/haystacks/unique-errors/'),
        },
      },
    ]

    test.each(cases)('poolPath: $params.poolPath', async ({ params }) => {
      const loader = GraphqlResolversLoader.create(params)

      const resolvers = await loader.loadResolvers()

      const allErrorCodes = resolvers
        .flatMap(it =>
          Object.values(it.errorCodeHash)
        )
        .sort(
          (alpha, beta) =>
            alpha.localeCompare(beta)
        )

      const uniqueErrorCodes = [...new Set(allErrorCodes)]

      expect(allErrorCodes)
        .not
        .toEqual(uniqueErrorCodes)
    })
  })
})
