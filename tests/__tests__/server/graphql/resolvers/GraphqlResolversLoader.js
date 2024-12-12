import path from 'path'

import GraphqlResolversLoader from '../../../../../lib/server/graphql/resolvers/GraphqlResolversLoader.js'

import CountQueryResolver from '../../../../haystacks/resolvers/Query/CountQueryResolver.js'
import FindQueryResolver from '../../../../haystacks/resolvers/Query/FindQueryResolver.js'
import SaveMutationResolver from '../../../../haystacks/resolvers/Mutation/SaveMutationResolver.js'
import UpdateMutationResolver from '../../../../haystacks/resolvers/Mutation/UpdateMutationResolver.js'
import ChatRoomSubscriptionResolver from '../../../../haystacks/resolvers/Subscription/ChatRoomSubscriptionResolver.js'

describe('GraphqlResolversLoader', () => {
  test('.create()', () => {
    const builder = GraphqlResolversLoader.create({
      poolPath: '',
    })

    expect(builder)
      .toBeInstanceOf(GraphqlResolversLoader)
  })
})

describe('GraphqlResolversLoader', () => {
  describe('#loadResolvers()', () => {
    describe('exists directory', () => {
      const cases = [
        {
          params: {
            poolPath: path.join(
              process.cwd(),
              'tests/haystacks/resolvers'
            ),
          },
          expected: expect.arrayContaining([
            CountQueryResolver,
            FindQueryResolver,
            SaveMutationResolver,
            UpdateMutationResolver,
            ChatRoomSubscriptionResolver,
          ]),
        },
        {
          params: {
            poolPath: path.join(
              process.cwd(),
              'tests/haystacks/resolvers/Query'
            ),
          },
          expected: expect.arrayContaining([
            CountQueryResolver,
            FindQueryResolver,
          ]),
        },
        {
          params: {
            poolPath: path.join(
              process.cwd(),
              'tests/haystacks/resolvers/Mutation'
            ),
          },
          expected: expect.arrayContaining([
            SaveMutationResolver,
            UpdateMutationResolver,
          ]),
        },
        {
          params: {
            poolPath: path.join(
              process.cwd(),
              'tests/haystacks/resolvers/Subscription'
            ),
          },
          expected: expect.arrayContaining([
            ChatRoomSubscriptionResolver,
          ]),
        },
      ]

      test.each(cases)('poolPath: $params.poolPath', async ({ params, expected }) => {
        const loader = GraphqlResolversLoader.create({
          poolPath: params.poolPath,
        })

        const resolverClasses = await loader.loadResolvers()

        expect(resolverClasses)
          .toEqual(expected)
      })
    })

    test('not-exists directory', async () => {
      const expected = /^ENOENT: no such file or directory, scandir/u

      const poolPath = path.join(
        process.cwd(),
        'tests/haystacks/resolvers/not-exists'
      )

      const loader = GraphqlResolversLoader.create({
        poolPath,
      })

      await expect(() => loader.loadResolvers())
        .rejects
        .toThrow(expected)
    })
  })
})
