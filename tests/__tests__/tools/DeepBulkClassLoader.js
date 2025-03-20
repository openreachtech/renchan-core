import path from 'path'

import rootPath from '../../../lib/globals/root-path.js'

import DeepBulkClassLoader from '../../../lib/tools/DeepBulkClassLoader.js'

import CountQueryResolver from '../../haystacks/resolvers/Query/CountQueryResolver.js'
import FindQueryResolver from '../../haystacks/resolvers/Query/FindQueryResolver.js'
import SaveMutationResolver from '../../haystacks/resolvers/Mutation/SaveMutationResolver.js'
import UpdateMutationResolver from '../../haystacks/resolvers/Mutation/UpdateMutationResolver.js'
import ChatRoomSubscriptionResolver from '../../haystacks/resolvers/Subscription/ChatRoomSubscriptionResolver.js'
import AlphaQueryResolver from '../../haystacks/resolvers/AlphaQueryResolver.js'
import BetaQueryResolver from '../../haystacks/resolvers/BetaQueryResolver.js'

const rootDir = process.cwd()
const testDir = path.join(rootDir, 'tests/')

describe('DeepBulkClassLoader', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#poolPath', () => {
        const cases = [
          {
            params: {
              poolPath: path.join(testDir, 'haystacks/resolvers'),
            },
          },
          {
            params: {
              poolPath: path.join(testDir, 'haystacks/resolvers/Query'),
            },
          },
          {
            params: {
              poolPath: path.join(testDir, 'haystacks/resolvers/Mutation'),
            },
          },
          {
            params: {
              poolPath: path.join(testDir, 'haystacks/resolvers/Subscription'),
            },
          },
        ]

        test.each(cases)('poolPath: $params.poolPath', ({ params }) => {
          const args = {
            poolPath: params.poolPath,
          }

          const loader = new DeepBulkClassLoader(args)

          expect(loader)
            .toHaveProperty('poolPath', params.poolPath)
        })
      })
    })
  })
})

describe('DeepBulkClassLoader', () => {
  describe('.create()', () => {
    const cases = [
      {
        params: {
          poolPath: path.join(testDir, 'haystacks/resolvers'),
        },
      },
      {
        params: {
          poolPath: path.join(testDir, 'haystacks/resolvers/Query'),
        },
      },
      {
        params: {
          poolPath: path.join(testDir, 'haystacks/resolvers/Mutation'),
        },
      },
      {
        params: {
          poolPath: path.join(testDir, 'haystacks/resolvers/Subscription'),
        },
      },
    ]

    describe('to be instance of own class', () => {
      test.each(cases)('poolPath: $params.poolPath', ({ params }) => {
        const loader = DeepBulkClassLoader.create(params)

        expect(loader)
          .toBeInstanceOf(DeepBulkClassLoader)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('poolPath: $params.poolPath', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(DeepBulkClassLoader)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('DeepBulkClassLoader', () => {
  describe('#generateFilterHandler()', () => {
    const cases = [
      {
        params: {
          poolPath: path.join(testDir, 'haystacks/resolvers'),
        },
      },
      {
        params: {
          poolPath: path.join(testDir, 'haystacks/resolvers/Query'),
        },
      },
      {
        params: {
          poolPath: path.join(testDir, 'haystacks/resolvers/Mutation'),
        },
      },
      {
        params: {
          poolPath: path.join(testDir, 'haystacks/resolvers/Subscription'),
        },
      },
    ]

    describe('to be instance of Function', () => {
      test.each(cases)('poolPath: $params.poolPath', ({ params }) => {
        const loader = new DeepBulkClassLoader(params)

        const actual = loader.generateFilterHandler()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('confirm filter handler to work', () => {
      describe.each(cases)('poolPath: $params.poolPath', ({ params }) => {
        const loader = new DeepBulkClassLoader(params)

        const filterHandler = loader.generateFilterHandler()

        describe('to be truthy', () => {
          const filenameCases = [
            {
              filename: '/haystacks/resolvers/AlphaQueryResolver.js',
            },
            {
              filename: '/haystacks/resolvers/BetaMutationResolver.mjs',
            },
            {
              filename: '/haystacks/migrations/create_table-customers.cjs',
            },
          ]

          test.each(filenameCases)('filename: $filename', ({ filename }) => {
            const actual = filterHandler(filename)

            expect(actual)
              .toBeTruthy()
          })
        })

        describe('to be falsy', () => {
          const filenameCases = [
            {
              filename: '/haystacks/resolvers/',
            },
            {
              filename: '/haystacks/resolvers/Query',
            },
            {
              filename: '/haystacks/graphql/customer.graphql',
            },
            {
              filename: '/haystacks/js/irregular.xjs',
            },
          ]

          test.each(filenameCases)('filename: $filename', ({ filename }) => {
            const actual = filterHandler(filename)

            expect(actual)
              .toBeFalsy()
          })
        })
      })
    })
  })
})

describe('DeepBulkClassLoader', () => {
  describe('#loadFileNames()', () => {
    describe('for presented path', () => {
      const cases = [
        {
          params: {
            poolPath: path.join(testDir, 'haystacks/resolvers'),
          },
          expected: [
            path.join(testDir, 'haystacks/resolvers/AlphaQueryResolver.js'),
            path.join(testDir, 'haystacks/resolvers/BetaQueryResolver.js'),
            path.join(testDir, 'haystacks/resolvers/Mutation/SaveMutationResolver.js'),
            path.join(testDir, 'haystacks/resolvers/Mutation/UpdateMutationResolver.js'),
            path.join(testDir, 'haystacks/resolvers/Query/CountQueryResolver.js'),
            path.join(testDir, 'haystacks/resolvers/Query/FindQueryResolver.js'),
            path.join(testDir, 'haystacks/resolvers/Subscription/ChatRoomSubscriptionResolver.js'),
          ],
        },
        {
          params: {
            poolPath: path.join(testDir, 'haystacks/resolvers/Query'),
          },
          expected: [
            path.join(testDir, 'haystacks/resolvers/Query/CountQueryResolver.js'),
            path.join(testDir, 'haystacks/resolvers/Query/FindQueryResolver.js'),
          ],
        },
        {
          params: {
            poolPath: path.join(testDir, 'haystacks/resolvers/Mutation'),
          },
          expected: [
            path.join(testDir, 'haystacks/resolvers/Mutation/SaveMutationResolver.js'),
            path.join(testDir, 'haystacks/resolvers/Mutation/UpdateMutationResolver.js'),
          ],
        },
        {
          params: {
            poolPath: path.join(testDir, 'haystacks/resolvers/Subscription'),
          },
          expected: [
            path.join(testDir, 'haystacks/resolvers/Subscription/ChatRoomSubscriptionResolver.js'),
          ],
        },
        {
          params: {
            poolPath: rootPath.to('app/server/graphql'),
          },
          expected: [
            rootPath.to('app/server/graphql/AdminGraphqlServerEngine.js'),
            rootPath.to('app/server/graphql/CustomerGraphqlServerEngine.js'),
            rootPath.to('app/server/graphql/contexts/AdminGraphqlContext.js'),
            rootPath.to('app/server/graphql/contexts/AdminGraphqlShare.js'),
            rootPath.to('app/server/graphql/contexts/CustomerGraphqlContext.js'),
            rootPath.to('app/server/graphql/contexts/CustomerGraphqlShare.js'),
            rootPath.to('app/server/graphql/resolvers/admin/actual/mutations/SignUpMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/admin/actual/queries/CustomersQueryResolver.js'),

            rootPath.to('app/server/graphql/resolvers/admin/stub/mutations/SignInMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/admin/stub/mutations/SignUpMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/admin/stub/queries/AssetsQueryResolver.js'),
            rootPath.to('app/server/graphql/resolvers/admin/stub/queries/CustomersQueryResolver.js'),

            rootPath.to('app/server/graphql/resolvers/customer/actual/mutations/CreateChatRoomMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/mutations/PostNotificationMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/mutations/RenewAccessTokenMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/mutations/SendChatMessageMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/mutations/SignInMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/mutations/UploadArrayImagesMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/mutations/UploadDeepPropertyImagesMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/mutations/UploadImageMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/queries/ChatMessagesQueryResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/queries/ChatRoomsQueryResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/queries/CompanySponsorsQueryResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/queries/CustomerQueryResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/queries/MessagesQueryResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/subscriptions/OnBroadcastNotificationsSubscriptionResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/subscriptions/OnObserveChatStatesSubscriptionResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/subscriptions/OnReceiveMessageSubscriptionResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/actual/subscriptions/OnUpdateChatRoomsSubscriptionResolver.js'),

            rootPath.to('app/server/graphql/resolvers/customer/stub/mutations/PostAppointmentMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/stub/mutations/SignInMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/stub/mutations/SignUpMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/stub/mutations/UploadCustomerForumPostImageMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/stub/mutations/UploadImageMutationResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/stub/queries/CompanySponsorsQueryResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/stub/queries/CurriculumsQueryResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/stub/queries/CustomerAmountsQueryResolver.js'),
            rootPath.to('app/server/graphql/resolvers/customer/stub/queries/PaginationArticlesQueryResolver.js'),
          ],
        },
      ]

      test.each(cases)('poolPath: $params.poolPath', ({ params, expected }) => {
        const args = {
          poolPath: params.poolPath,
        }
        const loader = DeepBulkClassLoader.create(args)

        const actual = loader.loadFileNames()

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('DeepBulkClassLoader', () => {
  describe('#loadClasses()', () => {
    describe('for presented path', () => {
      describe('with no callbacks', () => {
        const cases = [
          {
            params: {
              poolPath: path.join(testDir, 'haystacks/resolvers'),
            },
            expected: [
              AlphaQueryResolver,
              BetaQueryResolver,
              SaveMutationResolver,
              UpdateMutationResolver,
              CountQueryResolver,
              FindQueryResolver,
              ChatRoomSubscriptionResolver,
            ],
          },
          {
            params: {
              poolPath: path.join(testDir, 'haystacks/resolvers/Query'),
            },
            expected: [
              CountQueryResolver,
              FindQueryResolver,
            ],
          },
          {
            params: {
              poolPath: path.join(testDir, 'haystacks/resolvers/Mutation'),
            },
            expected: [
              SaveMutationResolver,
              UpdateMutationResolver,
            ],
          },
          {
            params: {
              poolPath: path.join(testDir, 'haystacks/resolvers/Subscription'),
            },
            expected: [
              ChatRoomSubscriptionResolver,
            ],
          },
        ]

        test.each(cases)('poolPath: $params.poolPath', async ({ params, expected }) => {
          const loader = DeepBulkClassLoader.create(params)

          const actual = await loader.loadClasses({
            poolPath: params.poolPath,
          })

          expect(actual)
            .toEqual(expected)
        })
      })
    })
  })
})
