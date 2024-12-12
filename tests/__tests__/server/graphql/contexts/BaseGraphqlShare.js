import util from 'util'

import BaseGraphqlShare from '../../../../../lib/server/graphql/contexts/BaseGraphqlShare.js'

import SubscriptionBroker from '../../../../../lib/server/graphql/subscription/SubscriptionBroker.js'

describe('BaseGraphqlShare', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#broker', () => {
        const envMock = BaseGraphqlShare.generateEnv()

        const brokerWithRedis = SubscriptionBroker.create({
          config: /** @type {*} */ ({
            redisOptions: {
              host: 'localhost',
              port: 6379,
            },
          }),
        })

        afterAll(() => {
          /** @type {import('../../../../../lib/server/graphql/subscription/pubsub/RedisPubSub.js').default} */
          const pubsub = /** @type {*} */ (brokerWithRedis.pubSub)

          pubsub.publishingRedisClient.disconnect()
          pubsub.subscribingRedisClient.disconnect()
        })

        const cases = [
          {
            params: {
              broker: brokerWithRedis,
            },
          },
          {
            params: {
              broker: SubscriptionBroker.create({
                config: /** @type {*} */ ({
                  redisOptions: null,
                }),
              }),
            },
          },
        ]

        test.each(cases)('broker: $params.broker', ({ params }) => {
          const args = {
            broker: params.broker,
            env: envMock,
          }

          const share = new BaseGraphqlShare(args)

          expect(share)
            .toHaveProperty('broker', params.broker)
        })
      })

      describe('#env', () => {
        const brokerMock = SubscriptionBroker.create({
          config: /** @type {*} */ ({
            redisOptions: null,
          }),
        })

        /**
         * @type {Array<{
         *   params: {
         *     env: renchan.RenchanEnv
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              env: {
                NODE_ENV: 'production',
              },
            },
          },
          {
            params: {
              env: {
                NODE_ENV: 'staging',
              },
            },
          },
          {
            params: {
              env: {
                NODE_ENV: 'live',
              },
            },
          },
          {
            params: {
              env: {
                NODE_ENV: 'development',
              },
            },
          },
        ])

        test.each(cases)('NODE_ENV: $params.env.NODE_ENV', ({ params }) => {
          const args = {
            broker: brokerMock,
            env: params.env,
          }

          const share = new BaseGraphqlShare(args)

          expect(share)
            .toHaveProperty('env', args.env)
        })
      })
    })
  })
})

describe('BaseGraphqlShare', () => {
  describe('.create()', () => {
    const brokerWithRedis = SubscriptionBroker.create({
      config: /** @type {*} */ ({
        redisOptions: {
          host: 'localhost',
          port: 6379,
        },
      }),
    })

    afterAll(() => {
      /** @type {import('../../../../../lib/server/graphql/subscription/pubsub/RedisPubSub.js').default} */
      const pubsub = /** @type {*} */ (brokerWithRedis.pubSub)

      pubsub.publishingRedisClient.disconnect()
      pubsub.subscribingRedisClient.disconnect()
    })

    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            broker: brokerWithRedis,
          },
        },
        {
          params: {
            broker: SubscriptionBroker.create({
              config: /** @type {*} */ ({
                redisOptions: null,
              }),
            }),
          },
        },
      ]

      test.each(cases)('broker: $params.broker', ({ params }) => {
        const args = {
          broker: params.broker,
        }

        const share = BaseGraphqlShare.create(args)

        expect(share)
          .toBeInstanceOf(BaseGraphqlShare)
      })
    })

    describe('to call constructor', () => {
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            broker: brokerWithRedis,
            env: {
              NODE_ENV: 'live',
            },
          },
        },
        {
          params: {
            broker: SubscriptionBroker.create({
              config: /** @type {*} */ ({
                redisOptions: null,
              }),
            }),
            env: {
              NODE_ENV: 'development',
            },
          },
        },
      ])

      test.each(cases)('NODE_ENV: $params.env.NODE_ENV', ({ params }) => {
        jest.spyOn(BaseGraphqlShare, 'generateEnv')
          .mockReturnValue(params.env)

        const SpyClass = globalThis.constructorSpy.spyOn(BaseGraphqlShare)

        const args = {
          broker: params.broker,
        }

        const expectedArgs = {
          broker: params.broker,
          env: params.env,
        }

        SpyClass.create(args)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expectedArgs)
      })
    })
  })
})

describe('BaseGraphqlShare', () => {
  describe('.createAsync()', () => {
    describe('to be instance of own class', () => {
      const brokerWithRedis = SubscriptionBroker.create({
        config: /** @type {*} */ ({
          redisOptions: {
            host: 'localhost',
            port: 6379,
          },
        }),
      })

      afterAll(() => {
        /** @type {import('../../../../../lib/server/graphql/subscription/pubsub/RedisPubSub.js').default} */
        const pubsub = /** @type {*} */ (brokerWithRedis.pubSub)

        pubsub.publishingRedisClient.disconnect()
        pubsub.subscribingRedisClient.disconnect()
      })

      const cases = [
        {
          params: {
            config: /** @type {*} */ ({
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            }),
          },
          redisTally: brokerWithRedis,
        },
        {
          params: {
            config: /** @type {*} */ ({
              redisOptions: null,
            }),
          },
          redisTally: SubscriptionBroker.create({
            config: /** @type {*} */ ({
              redisOptions: null,
            }),
          }),
        },
      ]

      test.each(cases)('redisOptions: $params.config.redisOptions', async ({ params, redisTally }) => {
        jest.spyOn(BaseGraphqlShare, 'createBroker')
          .mockReturnValue(redisTally)

        const share = await BaseGraphqlShare.createAsync(params)

        expect(share)
          .toBeInstanceOf(BaseGraphqlShare)
      })
    })

    describe('to call .create()', () => {
      const brokerWithRedis = SubscriptionBroker.create({
        config: /** @type {*} */ ({
          redisOptions: null,
        }),
      })

      const cases = [
        {
          params: {
            config: /** @type {*} */ ({
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            }),
          },
          redisTally: brokerWithRedis,
        },
        {
          params: {
            config: /** @type {*} */ ({
              redisOptions: null,
            }),
          },
          redisTally: SubscriptionBroker.create({
            config: /** @type {*} */ ({
              redisOptions: null,
            }),
          }),
        },
      ]

      test.each(cases)('redisOptions: $params.config.redisOptions', async ({ params, redisTally }) => {
        jest.spyOn(BaseGraphqlShare, 'createBroker')
          .mockReturnValue(redisTally)

        const createSpy = jest.spyOn(BaseGraphqlShare, 'create')

        const args = {
          config: params.config,
        }

        const expectedArgs = {
          broker: redisTally,
        }

        await BaseGraphqlShare.createAsync(args)

        expect(createSpy)
          .toHaveBeenCalledWith(expectedArgs)
      })
    })
  })
})

describe('BaseGraphqlShare', () => {
  describe('.generateEnv()', () => {
    const env = BaseGraphqlShare.generateEnv()

    const cases = [
      {
        member: 'isProduction()',
        actual: env.isProduction(),
        expected: false,
      },
      {
        member: 'isStaging()',
        actual: env.isStaging(),
        expected: false,
      },
      {
        member: 'isDevelopment()',
        actual: env.isDevelopment(),
        expected: expect.any(Boolean),
      },
      {
        member: 'isLive()',
        actual: env.isLive(),
        expected: expect.any(Boolean),
      },
    ]

    test.each(cases)('return value of $member', ({ actual, expected }) => {
      expect(actual)
        .toEqual(expected)
    })

    test('to be type of Proxy', () => {
      expect(util.types.isProxy(env))
        .toBeTruthy()
    })
  })
})

describe('BaseGraphqlShare', () => {
  describe('.createBroker()', () => {
    const brokerMock = SubscriptionBroker.create({
      config: /** @type {*} */ ({
        redisOptions: null,
      }),
    })

    describe('to be SubscriptionBroker', () => {
      const cases = [
        {
          params: {
            config: /** @type {*} */ ({
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            }),
          },
        },
        {
          params: {
            config: /** @type {*} */ ({
              redisOptions: null,
            }),
          },
        },
      ]

      test.each(cases)('redisOptions: $params.config.redisOptions', ({ params }) => {
        jest.spyOn(SubscriptionBroker, 'create')
          .mockReturnValue(
            /** @type {never} */ (brokerMock)
          )

        const share = BaseGraphqlShare.createBroker(params)

        expect(share)
          .toBe(brokerMock) // same reference
      })
    })

    describe('to call SubscriptionBroker.create()', () => {
      const cases = [
        {
          params: {
            config: /** @type {*} */ ({
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            }),
          },
        },
        {
          params: {
            config: /** @type {*} */ ({
              redisOptions: null,
            }),
          },
        },
      ]

      test.each(cases)('redisOptions: $params.config.redisOptions', ({ params }) => {
        const expected = {
          config: params.config,
        }

        const createSpy = jest.spyOn(SubscriptionBroker, 'create')
          .mockReturnValue(
            /** @type {never} */ (brokerMock)
          )

        BaseGraphqlShare.createBroker(params)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})
