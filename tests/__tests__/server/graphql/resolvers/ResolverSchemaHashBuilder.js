import path from 'path'

import ResolverSchemaHashBuilder from '../../../../../lib/server/graphql/resolvers/ResolverSchemaHashBuilder.js'

import AlphaQueryResolver from '../../../../haystacks/resolvers/AlphaQueryResolver.js'
import BetaQueryResolver from '../../../../haystacks/resolvers/BetaQueryResolver.js'
import CountQueryResolver from '../../../../haystacks/resolvers/Query/CountQueryResolver.js'
import FindQueryResolver from '../../../../haystacks/resolvers/Query/FindQueryResolver.js'
import SaveMutationResolver from '../../../../haystacks/resolvers/Mutation/SaveMutationResolver.js'
import UpdateMutationResolver from '../../../../haystacks/resolvers/Mutation/UpdateMutationResolver.js'
import ChatRoomSubscriptionResolver from '../../../../haystacks/resolvers/Subscription/ChatRoomSubscriptionResolver.js'

describe('ResolverSchemaHashBuilder', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#poolPath', () => {
        const cases = [
          {
            params: {
              title: 'Alpha, Beta',
              resolvers: [
                AlphaQueryResolver.create(),
                BetaQueryResolver.create(),
              ],
            },
          },
          {
            params: {
              title: 'Count, Find',
              resolvers: [
                CountQueryResolver.create(),
                FindQueryResolver.create(),
              ],
            },
          },
          {
            params: {
              title: 'Save, Update',
              resolvers: [
                SaveMutationResolver.create(),
                UpdateMutationResolver.create(),
              ],
            },
          },
          {
            params: {
              title: 'ChatRoom',
              resolvers: [
                ChatRoomSubscriptionResolver.create(),
              ],
            },
          },
        ]

        test.each(cases)('Resolver prefix: $params.title', ({ params }) => {
          const builder = new ResolverSchemaHashBuilder({
            resolvers: params.resolvers,
          })

          expect(builder)
            .toHaveProperty('resolvers', params.resolvers)
        })

        test('with empty array', () => {
          const builder = new ResolverSchemaHashBuilder({
            resolvers: [],
          })

          expect(builder)
            .toHaveProperty('resolvers', [])
        })
      })
    })
  })
})

describe('ResolverSchemaHashBuilder', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            title: 'Alpha, Beta',
            resolvers: [
              AlphaQueryResolver.create(),
              BetaQueryResolver.create(),
            ],
          },
        },
        {
          params: {
            title: 'Count, Find',
            resolvers: [
              CountQueryResolver.create(),
              FindQueryResolver.create(),
            ],
          },
        },
        {
          params: {
            title: 'Save, Update',
            resolvers: [
              SaveMutationResolver.create(),
              UpdateMutationResolver.create(),
            ],
          },
        },
        {
          params: {
            title: 'ChatRoom',
            resolvers: [
              ChatRoomSubscriptionResolver.create(),
            ],
          },
        },
      ]

      test.each(cases)('Resolver prefix: $params.title', ({ params }) => {
        const builder = ResolverSchemaHashBuilder.create({
          resolvers: params.resolvers,
        })

        expect(builder)
          .toBeInstanceOf(ResolverSchemaHashBuilder)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            title: 'Alpha, Beta',
            resolvers: [
              AlphaQueryResolver.create(),
              BetaQueryResolver.create(),
            ],
          },
        },
        {
          params: {
            title: 'Count, Find',
            resolvers: [
              CountQueryResolver.create(),
              FindQueryResolver.create(),
            ],
          },
        },
        {
          params: {
            title: 'Save, Update',
            resolvers: [
              SaveMutationResolver.create(),
              UpdateMutationResolver.create(),
            ],
          },
        },
        {
          params: {
            title: 'ChatRoom',
            resolvers: [
              ChatRoomSubscriptionResolver.create(),
            ],
          },
        },
      ]

      test.each(cases)('Resolver prefix: $params.title', ({ params }) => {
        const expected = {
          resolvers: params.resolvers,
        }

        const SpyClass = globalThis.constructorSpy.spyOn(ResolverSchemaHashBuilder)

        SpyClass.create({
          resolvers: params.resolvers,
        })

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('ResolverSchemaHashBuilder', () => {
  describe('.createAsync()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            poolPath: path.join(
              process.cwd(),
              'tests/haystacks/resolvers'
            ),
          },
          expected: expect.arrayContaining([
            AlphaQueryResolver.create(),
            BetaQueryResolver.create(),
            CountQueryResolver.create(),
            FindQueryResolver.create(),
            SaveMutationResolver.create(),
            UpdateMutationResolver.create(),
            ChatRoomSubscriptionResolver.create(),
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
            CountQueryResolver.create(),
            FindQueryResolver.create(),
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
            SaveMutationResolver.create(),
            UpdateMutationResolver.create(),
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
            ChatRoomSubscriptionResolver.create(),
          ]),
        },
      ]

      test.each(cases)('poolPath: $params.poolPath', async ({ params }) => {
        const builder = await ResolverSchemaHashBuilder.createAsync({
          poolPath: params.poolPath,
        })

        expect(builder)
          .toBeInstanceOf(ResolverSchemaHashBuilder)
      })
    })

    describe('to call .create()', () => {
      const cases = [
        {
          params: {
            poolPath: path.join(
              process.cwd(),
              'tests/haystacks/resolvers'
            ),
          },
          expected: {
            resolvers: expect.arrayContaining([
              AlphaQueryResolver.create(),
              BetaQueryResolver.create(),
              CountQueryResolver.create(),
              FindQueryResolver.create(),
              SaveMutationResolver.create(),
              UpdateMutationResolver.create(),
              ChatRoomSubscriptionResolver.create(),
            ]),
          },
        },
        {
          params: {
            poolPath: path.join(
              process.cwd(),
              'tests/haystacks/resolvers/Query'
            ),
          },
          expected: {
            resolvers: expect.arrayContaining([
              CountQueryResolver.create(),
              FindQueryResolver.create(),
            ]),
          },
        },
        {
          params: {
            poolPath: path.join(
              process.cwd(),
              'tests/haystacks/resolvers/Mutation'
            ),
          },
          expected: {
            resolvers: expect.arrayContaining([
              SaveMutationResolver.create(),
              UpdateMutationResolver.create(),
            ]),
          },
        },
        {
          params: {
            poolPath: path.join(
              process.cwd(),
              'tests/haystacks/resolvers/Subscription'
            ),
          },
          expected: {
            resolvers: expect.arrayContaining([
              ChatRoomSubscriptionResolver.create(),
            ]),
          },
        },
      ]

      test.each(cases)('poolPath: $params.poolPath', async ({ params, expected }) => {
        const createSpy = jest.spyOn(ResolverSchemaHashBuilder, 'create')

        const args = {
          poolPath: params.poolPath,
        }

        await ResolverSchemaHashBuilder.createAsync(args)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)

        createSpy.mockRestore()
      })
    })
  })
})

describe('ResolverSchemaHashBuilder', () => {
  describe('.loadResolvers()', () => {
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
            AlphaQueryResolver,
            BetaQueryResolver,
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
        const resolvers = await ResolverSchemaHashBuilder.loadResolvers({
          poolPath: params.poolPath,
        })

        expect(resolvers)
          .toEqual(expected)
      })
    })
  })
})

describe('ResolverSchemaHashBuilder', () => {
  describe('#buildSchemaHash()', () => {
    describe('to be resolver schema hash', () => {
      const cases = [
        {
          params: {
            resolvers: [
              AlphaQueryResolver.create(),
              BetaQueryResolver.create(),
            ],
          },
          expected: {
            alpha: expect.any(AlphaQueryResolver),
            beta: expect.any(BetaQueryResolver),
          },
        },
        {
          params: {
            resolvers: [
              CountQueryResolver.create(),
              FindQueryResolver.create(),
            ],
          },
          expected: {
            count: expect.any(CountQueryResolver),
            find: expect.any(FindQueryResolver),
          },
        },
        {
          params: {
            resolvers: [
              SaveMutationResolver.create(),
              UpdateMutationResolver.create(),
            ],
          },
          expected: {
            save: expect.any(SaveMutationResolver),
            update: expect.any(UpdateMutationResolver),
          },
        },
        {
          params: {
            resolvers: [
              ChatRoomSubscriptionResolver.create(),
            ],
          },
          expected: {
            chatRoom: expect.any(ChatRoomSubscriptionResolver),
          },
        },
      ]

      test.each(cases)('Resolver: $params.resolvers.0', ({ params, expected }) => {
        const builder = new ResolverSchemaHashBuilder({
          resolvers: params.resolvers,
        })

        const actual = builder.buildSchemaHash()

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})
