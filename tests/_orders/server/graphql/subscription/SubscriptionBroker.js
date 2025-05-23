import SubscriptionBroker from '../../../../../lib/server/graphql/subscription/SubscriptionBroker.js'

import LocalPubSub from '../../../../../lib/server/graphql/subscription/pubsub/LocalPubSub.js'
import RedisPubSub from '../../../../../lib/server/graphql/subscription/pubsub/RedisPubSub.js'

import TopicReceiver from '../../../../../lib/server/graphql/subscription/TopicReceiver.js'

import MockRedis from '../../../../mocks/MockRedis.js'

describe('SubscriptionBroker', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      const redisPubSub = RedisPubSub.create()

      afterAll(() => {
        redisPubSub.publishingRedisClient.disconnect()
        redisPubSub.subscribingRedisClient.disconnect()
      })

      describe('#pubSub', () => {
        const cases = [
          {
            params: {
              pubSub: LocalPubSub.create(),
            },
          },
          {
            params: {
              pubSub: redisPubSub,
            },
          },
        ]

        test.each(cases)('pubSub: $params.pubSub', ({ params }) => {
          const broker = new SubscriptionBroker(params)

          expect(broker)
            .toHaveProperty('pubSub', params.pubSub)
        })
      })
    })
  })
})

describe('SubscriptionBroker', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            },
          },
        },
        {
          params: {
            config: {
              redisOptions: null, // to use LocalPubSub
            },
          },
        },
      ])

      test.each(cases)('config: $params.config', ({ params }) => {
        jest.spyOn(RedisPubSub, 'createRedis')
          .mockReturnValue(MockRedis.create())

        const broker = SubscriptionBroker.create(params)

        expect(broker)
          .toBeInstanceOf(SubscriptionBroker)
      })
    })

    describe('to call constructor', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *   }
       *   expected: {
       *     pubSub: GraphqlType.PubSub
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            },
          },
          expected: {
            pubSub: expect.any(RedisPubSub),
          },
        },
        {
          params: {
            config: {
              redisOptions: null, // to use LocalPubSub
            },
          },
          expected: {
            pubSub: expect.any(LocalPubSub),
          },
        },
      ])

      test.each(cases)('config: $params.config', ({ params, expected }) => {
        jest.spyOn(RedisPubSub, 'createRedis')
          .mockReturnValue(MockRedis.create())

        const SpyClass = globalThis.constructorSpy.spyOn(SubscriptionBroker)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('SubscriptionBroker', () => {
  describe('.createPubSub()', () => {
    const redisPubSub = RedisPubSub.create({
      options: {
        host: 'localhost',
        port: 6379,
      },
    })

    beforeAll(() => {
      jest.spyOn(RedisPubSub, 'create')
        .mockReturnValue(
          /** @type {never} */ (redisPubSub)
        )
    })

    afterAll(() => {
      redisPubSub.publishingRedisClient.disconnect()
      redisPubSub.subscribingRedisClient.disconnect()
    })

    describe('to be PubSub instance', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *   }
       *   expected: GraphqlType.PubSub
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            },
          },
          expected: expect.any(RedisPubSub),
        },
        {
          params: {
            config: {
              redisOptions: null, // to use LocalPubSub
            },
          },
          expected: expect.any(LocalPubSub),
        },
      ])

      test.each(cases)('config: $params.config', ({ params, expected }) => {
        const actual = SubscriptionBroker.createPubSub(params)

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('SubscriptionBroker', () => {
  describe('#publish()', () => {
    describe('to call PubSub#publish()', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *   }
       *   cases: Array<{
       *     input: {
       *       channel: string
       *       message: Record<string, unknown>
       *     }
       *   }>
       * }>}
       */
      const pubSubCases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            },
          },
          cases: [
            {
              input: {
                channel: 'alpha-channel',
                message: {
                  chatMessage: 'Message to Alpha-CHANNEL',
                },
              },
            },
            {
              input: {
                channel: 'beta-channel',
                message: {
                  chatMessage: 'Message to Beta-CHANNEL',
                },
              },
            },
          ],
        },
        {
          params: {
            config: {
              redisOptions: null, // to use LocalPubSub
            },
          },
          cases: [
            {
              input: {
                channel: 'gamma-channel',
                message: {
                  chatMessage: 'Message to Gamma-CHANNEL',
                },
              },
            },
            {
              input: {
                channel: 'delta-channel',
                message: {
                  chatMessage: 'Message to Delta-CHANNEL',
                },
              },
            },
          ],
        },
      ])

      describe.each(pubSubCases)('config: $params.config', ({ params, cases }) => {
        test.each(cases)('input: $input', ({ input }) => {
          jest.spyOn(RedisPubSub, 'create')
            .mockReturnValue(
              /** @type {never} */ (
                LocalPubSub.create()
              )
            )

          const broker = SubscriptionBroker.create(params)

          const publishSpy = jest.spyOn(broker.pubSub, 'publish')
            .mockImplementation(async () => {})

          broker.publish(input)

          expect(publishSpy)
            .toHaveBeenCalledWith(input)
        })
      })
    })
  })
})

describe('SubscriptionBroker', () => {
  describe('#subscribe()', () => {
    describe('to call PubSub#subscribe()', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *   }
       *   cases: Array<{
       *     input: {
       *       channel: string
       *       message: Record<string, unknown>
       *     }
       *   }>
       * }>}
       */
      const pubSubCases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            },
          },
          cases: [
            {
              input: {
                channel: 'alpha-channel',
              },
            },
            {
              input: {
                channel: 'beta-channel',
              },
            },
          ],
        },
        {
          params: {
            config: {
              redisOptions: null, // to use LocalPubSub
            },
          },
          cases: [
            {
              input: {
                channel: 'gamma-channel',
              },
            },
            {
              input: {
                channel: 'delta-channel',
              },
            },
          ],
        },
      ])

      describe.each(pubSubCases)('config: $params.config', ({ params, cases }) => {
        test.each(cases)('input: $input', ({ input }) => {
          jest.spyOn(RedisPubSub, 'create')
            .mockReturnValue(
              /** @type {never} */ (
                LocalPubSub.create()
              )
            )

          const broker = SubscriptionBroker.create(params)

          const subscribeSpy = jest.spyOn(broker.pubSub, 'subscribe')
            .mockImplementation(async () => {})

          const inputTally = {
            channel: input.channel,
            receiver: TopicReceiver.create({
              channel: input.channel,
              broker,
            }),
          }

          broker.subscribe(inputTally)

          expect(subscribeSpy)
            .toHaveBeenCalledWith(inputTally)
        })
      })
    })
  })
})

describe('SubscriptionBroker', () => {
  describe('#unsubscribe()', () => {
    describe('to call PubSub#unsubscribe()', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *   }
       *   cases: Array<{
       *     input: {
       *       channel: string
       *       message: Record<string, unknown>
       *     }
       *   }>
       * }>}
       */
      const pubSubCases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            },
          },
          cases: [
            {
              input: {
                channel: 'alpha-channel',
              },
            },
            {
              input: {
                channel: 'beta-channel',
              },
            },
          ],
        },
        {
          params: {
            config: {
              redisOptions: null, // to use LocalPubSub
            },
          },
          cases: [
            {
              input: {
                channel: 'gamma-channel',
              },
            },
            {
              input: {
                channel: 'delta-channel',
              },
            },
          ],
        },
      ])

      describe.each(pubSubCases)('config: $params.config', ({ params, cases }) => {
        test.each(cases)('input: $input', ({ input }) => {
          jest.spyOn(RedisPubSub, 'create')
            .mockReturnValue(
              /** @type {never} */ (
                LocalPubSub.create()
              )
            )

          const broker = SubscriptionBroker.create(params)

          const unsubscribeSpy = jest.spyOn(broker.pubSub, 'unsubscribe')
            .mockImplementation(async () => {})

          const inputTally = {
            channel: input.channel,
            receiver: TopicReceiver.create({
              channel: input.channel,
              broker,
            }),
          }

          broker.unsubscribe(inputTally)

          expect(unsubscribeSpy)
            .toHaveBeenCalledWith(inputTally)
        })
      })
    })
  })
})

describe('SubscriptionBroker', () => {
  describe('#generateAsyncIterable()', () => {
    describe('to be async iterable', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *   }
       *   cases: Array<{
       *     input: {
       *       channel: string
       *       message: Record<string, unknown>
       *     }
       *   }>
       * }>}
       */
      const pubSubCases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            },
          },
          cases: [
            {
              input: {
                channel: 'alpha-channel',
              },
            },
            {
              input: {
                channel: 'beta-channel',
              },
            },
          ],
        },
        {
          params: {
            config: {
              redisOptions: null, // to use LocalPubSub
            },
          },
          cases: [
            {
              input: {
                channel: 'gamma-channel',
              },
            },
            {
              input: {
                channel: 'delta-channel',
              },
            },
          ],
        },
      ])

      describe.each(pubSubCases)('config: $params.config', ({ params, cases }) => {
        const expected = {
          [Symbol.asyncIterator]: expect.any(Function),
        }

        const broker = SubscriptionBroker.create(params)

        test.each(cases)('input: $input', ({ input }) => {
          const args = {
            channel: input.channel,
          }

          const actual = broker.generateAsyncIterable(args)

          expect(actual)
            .toEqual(expected)
        })
      })
    })

    describe('to call member of TopicReceiver', () => {
      /**
       * @type {Array<{
       *   params: {
       *     config: GraphqlType.Config
       *   }
       *   cases: Array<{
       *     input: {
       *       channel: string
       *       message: Record<string, unknown>
       *     }
       *   }>
       * }>}
       */
      const pubSubCases = /** @type {Array<*>} */ ([
        {
          params: {
            config: {
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            },
          },
          cases: [
            {
              input: {
                channel: 'alpha-channel',
              },
            },
            {
              input: {
                channel: 'beta-channel',
              },
            },
          ],
        },
        {
          params: {
            config: {
              redisOptions: null, // to use LocalPubSub
            },
          },
          cases: [
            {
              input: {
                channel: 'gamma-channel',
              },
            },
            {
              input: {
                channel: 'delta-channel',
              },
            },
          ],
        },
      ])

      describe.each(pubSubCases)('config: $params.config', ({ params, cases }) => {
        const broker = SubscriptionBroker.create(params)

        test.each(cases)('input: $input', ({ input }) => {
          const expected = {
            channel: input.channel,
            broker,
          }

          const generateAsyncIterableSpy = jest.fn()

          const receiver = /** @type {never} */ ({
            generateAsyncIterable: generateAsyncIterableSpy,
          })

          const createSpy = jest.spyOn(TopicReceiver, 'create')
            .mockReturnValue(receiver)

          const args = {
            channel: input.channel,
          }

          broker.generateAsyncIterable(args)

          expect(createSpy)
            .toHaveBeenCalledWith(expected)
          expect(generateAsyncIterableSpy)
            .toHaveBeenCalledWith()
        })
      })
    })
  })
})
