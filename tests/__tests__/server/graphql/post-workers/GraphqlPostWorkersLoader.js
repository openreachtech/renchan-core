import path from 'path'

import rootPath from '../../../../../lib/globals/root-path.js'

import GraphqlPostWorkersLoader from '../../../../../lib/server/graphql/post-workers/GraphqlPostWorkersLoader.js'

import CustomersQueryPostWorker from '../../../../haystacks/post-workers/admin/queries/CustomersQueryPostWorker.js'
import StatisticsQueryPostWorker from '../../../../haystacks/post-workers/admin/queries/StatisticsQueryPostWorker.js'
import BroadcastNotificationMutationPostWorker from '../../../../haystacks/post-workers/admin/mutations/BroadcastNotificationMutationPostWorker.js'
import { default as AdminSignInMutationPostWorker } from '../../../../haystacks/post-workers/admin/mutations/SignInMutationPostWorker.js'

import CompanySponsorsQueryPostWorker from '../../../../haystacks/post-workers/customer/queries/CompanySponsorsQueryPostWorker.js'
import CurriculumsQueryPostWorker from '../../../../haystacks/post-workers/customer/queries/CurriculumsQueryPostWorker copy.js'
import SendChatMessageMutationPostWorker from '../../../../haystacks/post-workers/customer/mutations/SendChatMessageMutationPostWorker.js'
import { default as SignInMutationPostWorker } from '../../../../haystacks/post-workers/customer/mutations/SignInMutationPostWorker.js'

describe('GraphqlPostWorkersLoader', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('poolPath', () => {
        const cases = [
          {
            params: {
              poolPath: rootPath.to('tests/haystacks/post-workers/admin/'),
            },
          },
          {
            params: {
              poolPath: rootPath.to('tests/haystacks/post-workers/customer/'),
            },
          },
        ]

        test.each(cases)('poolPath: $params.poolPath', ({ params }) => {
          const loader = new GraphqlPostWorkersLoader(params)

          expect(loader)
            .toHaveProperty('poolPath', params.poolPath)
        })
      })
    })
  })
})

describe('GraphqlPostWorkersLoader', () => {
  describe('.create()', () => {
    const cases = [
      {
        params: {
          poolPath: rootPath.to('tests/haystacks/post-workers/admin/'),
        },
      },
      {
        params: {
          poolPath: rootPath.to('tests/haystacks/post-workers/customer/'),
        },
      },
    ]

    describe('to be instance of own class', () => {
      test.each(cases)('poolPath: $params.poolPath', ({ params }) => {
        const loader = GraphqlPostWorkersLoader.create(params)

        expect(loader)
          .toBeInstanceOf(GraphqlPostWorkersLoader)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('poolPath: $params.poolPath', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(GraphqlPostWorkersLoader)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('GraphqlPostWorkersLoader', () => {
  describe('#loadPostWorkers()', () => {
    describe('exists directory', () => {
      const cases = [
        {
          params: {
            poolPath: rootPath.to('tests/haystacks/post-workers/admin/'),
          },
          expected: expect.arrayContaining([
            BroadcastNotificationMutationPostWorker,
            AdminSignInMutationPostWorker,
            CustomersQueryPostWorker,
            StatisticsQueryPostWorker,
          ]),
        },
        {
          params: {
            poolPath: rootPath.to('tests/haystacks/post-workers/admin/queries/'),
          },
          expected: expect.arrayContaining([
            CustomersQueryPostWorker,
            StatisticsQueryPostWorker,
          ]),
        },
        {
          params: {
            poolPath: rootPath.to('tests/haystacks/post-workers/admin/mutations/'),
          },
          expected: expect.arrayContaining([
            BroadcastNotificationMutationPostWorker,
            AdminSignInMutationPostWorker,
          ]),
        },
        {
          params: {
            poolPath: rootPath.to('tests/haystacks/post-workers/customer/'),
          },
          expected: expect.arrayContaining([
            CompanySponsorsQueryPostWorker,
            CurriculumsQueryPostWorker,
            SendChatMessageMutationPostWorker,
            SignInMutationPostWorker,
          ]),
        },
        {
          params: {
            poolPath: rootPath.to('tests/haystacks/post-workers/customer/queries/'),
          },
          expected: expect.arrayContaining([
            CompanySponsorsQueryPostWorker,
            CurriculumsQueryPostWorker,
          ]),
        },
        {
          params: {
            poolPath: rootPath.to('tests/haystacks/post-workers/customer/mutations/'),
          },
          expected: expect.arrayContaining([
            SendChatMessageMutationPostWorker,
            SignInMutationPostWorker,
          ]),
        },
      ]

      test.each(cases)('poolPath: $params.poolPath', async ({ params, expected }) => {
        const loader = GraphqlPostWorkersLoader.create({
          poolPath: params.poolPath,
        })

        const resolverClasses = await loader.loadPostWorkers()

        expect(resolverClasses)
          .toEqual(expected)
      })
    })

    test('not-exists directory', async () => {
      const expected = /^ENOENT: no such file or directory, scandir/u

      const poolPath = path.join(
        process.cwd(),
        'tests/haystacks/post-workers/not-exists'
      )

      const loader = GraphqlPostWorkersLoader.create({
        poolPath,
      })

      await expect(() => loader.loadPostWorkers())
        .rejects
        .toThrow(expected)
    })
  })
})
