import Redis from 'ioredis'

import RedisPubSub from '../../../../../../lib/server/graphql/subscription/pubsub/RedisPubSub.js'
import EventHub from '../../../../../../lib/server/graphql/subscription/pubsub/tools/EventHub.js'
import MockRedis from '../../../../../mocks/MockRedis.js'

describe('RedisPubSub', () => {
  describe('constructor', () => {
    const clientHash = {}

    beforeAll(() => {
      clientHash.alpha = new Redis({
        host: 'localhost',
        port: 6379,
      })
      clientHash.beta = new Redis({
        host: 'localhost',
        port: 6379,
      })
      clientHash.gamma = new Redis({
        host: 'localhost',
        port: 8888,
      })
      clientHash.delta = new Redis({
        host: 'localhost',
        port: 8888,
      })
    })

    afterAll(() => {
      clientHash.alpha.disconnect()
      clientHash.beta.disconnect()
      clientHash.gamma.disconnect()
      clientHash.delta.disconnect()
    })

    describe('to keep private properties', () => {
      describe('#publishingRedisClient', () => {
        const cases = [
          {
            params: {
              port: 6379,
              publishingRedisClient: clientHash.alpha,
              subscribingRedisClient: clientHash.beta,
            },
          },
          {
            params: {
              port: 8888,
              publishingRedisClient: clientHash.gamma,
              subscribingRedisClient: clientHash.delta,
            },
          },
        ]

        test.each(cases)('port: $params.port', ({ params }) => {
          const args = {
            publishingRedisClient: params.publishingRedisClient,
            subscribingRedisClient: params.subscribingRedisClient,
          }

          const actual = new RedisPubSub(args)

          expect(actual)
            .toHaveProperty(
              'publishingRedisClient',
              params.publishingRedisClient
            )
        })
      })

      describe('#subscribingRedisClient', () => {
        const cases = [
          {
            params: {
              port: 6379,
              publishingRedisClient: clientHash.alpha,
              subscribingRedisClient: clientHash.beta,
            },
          },
          {
            params: {
              port: 8888,
              publishingRedisClient: clientHash.gamma,
              subscribingRedisClient: clientHash.delta,
            },
          },
        ]

        test.each(cases)('port: $params.port', ({ params }) => {
          const args = {
            publishingRedisClient: params.publishingRedisClient,
            subscribingRedisClient: params.subscribingRedisClient,
          }

          const actual = new RedisPubSub(args)

          expect(actual)
            .toHaveProperty(
              'subscribingRedisClient',
              params.subscribingRedisClient
            )
        })
      })
    })
  })
})

describe('RedisPubSub', () => {
  describe('.create()', () => {
    const firstRedisTally = new Redis({
      host: 'localhost',
      port: 6379,
    })
    const secondRedisTally = new Redis({
      host: 'localhost',
      port: 8888,
    })

    afterAll(() => {
      firstRedisTally.disconnect()
      secondRedisTally.disconnect()
    })

    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            options: {
              host: 'localhost',
              port: 6379,
            },
          },
        },
        {
          params: {
            options: {
              host: 'localhost',
              port: 8888,
            },
          },
        },
      ]

      test.each(cases)('port: $params.options.port', ({ params }) => {
        jest.spyOn(RedisPubSub, 'createRedis')
          .mockReturnValueOnce(firstRedisTally)
          .mockReturnValueOnce(secondRedisTally)

        const actual = RedisPubSub.create(params)

        expect(actual)
          .toBeInstanceOf(RedisPubSub)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            options: {
              host: 'localhost',
              port: 6379,
            },
          },
          expected: {
            publishingRedisClient: firstRedisTally,
            subscribingRedisClient: secondRedisTally,
          },
        },
        {
          params: {
            options: {
              host: 'localhost',
              port: 8888,
            },
          },
          expected: {
            publishingRedisClient: firstRedisTally,
            subscribingRedisClient: secondRedisTally,
          },
        },
      ]

      test.each(cases)('port: $params.options.port', ({ params, expected }) => {
        jest.spyOn(RedisPubSub, 'createRedis')
          .mockReturnValueOnce(firstRedisTally)
          .mockReturnValueOnce(secondRedisTally)

        const SpyClass = globalThis.constructorSpy.spyOn(RedisPubSub)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('RedisPubSub', () => {
  describe('.get:RedisCtor', () => {
    test('to be fixed value', () => {
      const actual = RedisPubSub.RedisCtor

      expect(actual)
        .toBe(Redis) // same reference
    })
  })
})

describe('RedisPubSub', () => {
  describe('.createRedis()', () => {
    const cases = [
      {
        params: {
          options: {
            host: 'localhost',
            port: 6379,
          },
        },
        expected: {
          host: 'localhost',
          port: 6379,
        },
      },
      {
        params: {
          options: {
            host: 'localhost',
            port: 8888,
          },
        },
        expected: {
          host: 'localhost',
          port: 8888,
        },
      },
    ]

    test.each(cases)('port: $params.options.port', ({ params, expected }) => {
      const redisTally = MockRedis.create()

      const RedisCtorSpy = jest.fn()
        .mockReturnValue(redisTally)

      const SpyClass = class extends RedisPubSub {
        static get RedisCtor () {
          return /** @type {*} */ (RedisCtorSpy)
        }
      }

      const actual = SpyClass.createRedis(params)

      expect(actual)
        .toBe(redisTally) // same reference
      expect(RedisCtorSpy)
        .toHaveBeenCalledWith(expected)
    })
  })
})

describe('RedisPubSub', () => {
  describe('#publish()', () => {
    const redisPubSub = RedisPubSub.create({
      options: {
        host: 'localhost',
        port: 6379,
      },
    })

    afterAll(() => {
      redisPubSub.publishingRedisClient.disconnect()
      redisPubSub.subscribingRedisClient.disconnect()
    })

    describe('to call publishingRedisClient.publish()', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            message: {
              value: 'alpha message',
            },
          },
          expected: [
            'alpha-channel',
            '{"value":"alpha message"}',
          ],
        },
        {
          params: {
            channel: 'beta-channel',
            message: {
              value: 'beta message',
            },
          },
          expected: [
            'beta-channel',
            '{"value":"beta message"}',
          ],
        },
      ]

      test.each(cases)('channel: $params.channel', async ({ params, expected }) => {
        const publishSpy = jest.spyOn(redisPubSub.publishingRedisClient, 'publish')
          .mockResolvedValue(1)

        await redisPubSub.publish(params)

        expect(publishSpy)
          .toHaveBeenCalledWith(...expected)
      })
    })
  })
})

describe('RedisPubSub', () => {
  describe('#setupBroadcasterOnSubscribe()', () => {
    const redisPubSub = RedisPubSub.create({
      options: {
        host: 'localhost',
        port: 6379,
      },
    })

    afterAll(() => {
      redisPubSub.publishingRedisClient.disconnect()
      redisPubSub.subscribingRedisClient.disconnect()
    })

    describe('to call member of Redis client', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            eventHub: EventHub.create({
              channel: 'alpha-channel',
            }),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            eventHub: EventHub.create({
              channel: 'beta-channel',
            }),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', async ({ params }) => {
        const redisClientArgsExpected = [
          'message',
          params.eventHub.listener,
        ]

        const offSpy = jest.spyOn(redisPubSub.subscribingRedisClient, 'off')
        const onSpy = jest.spyOn(redisPubSub.subscribingRedisClient, 'on')
        const subscribeSpy = jest.spyOn(redisPubSub.subscribingRedisClient, 'subscribe')
          .mockResolvedValue(1)

        await redisPubSub.setupBroadcasterOnSubscribe(params)

        expect(offSpy)
          .toHaveBeenCalledWith(...redisClientArgsExpected)
        expect(onSpy)
          .toHaveBeenCalledWith(...redisClientArgsExpected)
        expect(subscribeSpy)
          .toHaveBeenCalledWith(params.channel)
      })
    })
  })
})

describe('RedisPubSub', () => {
  describe('#teardownBroadcasterOnUnsubscribe()', () => {
    const redisPubSub = RedisPubSub.create({
      options: {
        host: 'localhost',
        port: 6379,
      },
    })

    afterAll(() => {
      redisPubSub.publishingRedisClient.disconnect()
      redisPubSub.subscribingRedisClient.disconnect()
    })

    describe('to call member of Redis client', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            eventHub: EventHub.create({
              channel: 'alpha-channel',
            }),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            eventHub: EventHub.create({
              channel: 'beta-channel',
            }),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', async ({ params }) => {
        const redisClientArgsExpected = [
          'message',
          params.eventHub.listener,
        ]

        const offSpy = jest.spyOn(redisPubSub.subscribingRedisClient, 'off')
        const unsubscribeSpy = jest.spyOn(redisPubSub.subscribingRedisClient, 'unsubscribe')
          .mockResolvedValue(0)

        await redisPubSub.teardownBroadcasterOnUnsubscribe(params)

        expect(offSpy)
          .toHaveBeenCalledWith(...redisClientArgsExpected)
        expect(unsubscribeSpy)
          .toHaveBeenCalledWith(params.channel)
      })
    })
  })
})
