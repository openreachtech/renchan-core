import BaseSubscriptionResolver from '../../../../../lib/server/graphql/resolvers/BaseSubscriptionResolver.js'
import BaseResolver from '../../../../../lib/server/graphql/resolvers/BaseResolver.js'
import SubscriptionBroker from '../../../../../lib/server/graphql/subscription/SubscriptionBroker.js'

describe('BaseSubscriptionResolver', () => {
  describe('super class', () => {
    test('to be BaseResolver', () => {
      const actual = BaseSubscriptionResolver.prototype

      expect(actual)
        .toBeInstanceOf(BaseResolver)
    })
  })
})

describe('BaseSubscriptionResolver', () => {
  describe('.get:operation', () => {
    test('to be fixed value', () => {
      const expected = 'Subscription'

      const actual = BaseSubscriptionResolver.operation

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('BaseSubscriptionResolver', () => {
  describe('.get:errorCodeHash', () => {
    test('to be fixed value', () => {
      const expected = {
        CanNotSubscribe: '102.S000.001',
      }

      const actual = BaseSubscriptionResolver.errorCodeHash

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('BaseSubscriptionResolver', () => {
  describe('.get:channelPrefix', () => {
    describe('to return same value as .get:schema', () => {
      const cases = [
        {
          params: {
            Resolver: class AlphaSubscriptionResolver extends BaseSubscriptionResolver {
              static get schema () {
                return 'alpha'
              }
            },
          },
          expected: 'alpha',
        },
        {
          params: {
            Resolver: class BetaSubscriptionResolver extends BaseSubscriptionResolver {
              static get schema () {
                return 'beta'
              }
            },
          },
          expected: 'beta',
        },
        {
          params: {
            Resolver: class GammaSubscriptionResolver extends BaseSubscriptionResolver {
              static get schema () {
                return 'gamma'
              }
            },
          },
          expected: 'gamma',
        },
      ]

      test.each(cases)('Resolver: $params.Resolver.name', ({ params, expected }) => {
        const actual = params.Resolver.channelPrefix

        expect(actual)
          .toBe(expected)
      })
    })

    describe('to call from Base class', () => {
      test('throw error', () => {
        const expected = 'concrete-member-not-found {"memberName":"BaseResolver.get:schema"}'

        expect(() => BaseSubscriptionResolver.channelPrefix)
          .toThrow(expected)
      })
    })
  })
})

describe('BaseSubscriptionResolver', () => {
  describe('#subscribe()', () => {
    describe('to call members', () => {
      /** @type {GraphqlType.ResolverInputContext} */
      const contextMock = /** @type {*} */ ({
        broker: SubscriptionBroker.create({
          config: /** @type {*} */ ({
            redisOptions: null,
          }),
        }),
      })

      /** @type {GraphqlType.ResolverInputInformation} */
      const informationMock = /** @type {*} */ ({})

      /** @type {GraphqlType.ResolverOutput} */
      const parentMock = /** @type {*} */ ({})

      const cases = [
        {
          params: {
            Resolver: class AlphaSubscriptionResolver extends BaseSubscriptionResolver {
              static get schema () {
                return 'alpha'
              }
            },
            variables: {
              input: {
                roomId: 10001,
              },
            },
          },
          tally: {
            channelQuery: {
              roomId: 10001,
            },
          },
          expected: {
            channel: 'alpha?roomId=10001',
          },
        },
        {
          params: {
            Resolver: class BetaSubscriptionResolver extends BaseSubscriptionResolver {
              static get schema () {
                return 'beta'
              }
            },
            variables: {
              input: {
                roomId: 10002,
              },
            },
          },
          tally: {
            channelQuery: {
              roomId: 10002,
            },
          },
          expected: {
            channel: 'beta?roomId=10002',
          },
        },
      ]

      test.each(cases)('Resolver: $params.Resolver.name', async ({ params, tally, expected }) => {
        const resolver = params.Resolver.create()

        const channelTally = `${params.Resolver.schema}?roomId=${params.variables.input.roomId}`

        const generateChannelQuerySpy = jest.spyOn(resolver, 'generateChannelQuery')
          .mockReturnValue(tally.channelQuery)
        const generateChannelSpy = jest.spyOn(resolver, 'generateChannel')
          .mockReturnValue(channelTally)
        const generateAsyncIterableSpy = jest.spyOn(resolver, 'generateAsyncIterable')

        const argsTally = {
          variables: params.variables,
          context: contextMock,
          information: informationMock,
          parent: parentMock,
        }

        const subscribeExpected = {
          [Symbol.asyncIterator]: expect.any(Function),
        }
        const generateChannelArgsExpected = {
          query: tally.channelQuery,
        }
        const generateAsyncIterableArgsExpected = {
          context: contextMock,
          channel: expected.channel,
        }

        const actual = await resolver.subscribe(argsTally)

        expect(actual)
          .toEqual(subscribeExpected)

        expect(generateChannelQuerySpy)
          .toHaveBeenCalledWith(argsTally)
        expect(generateChannelSpy)
          .toHaveBeenCalledWith(generateChannelArgsExpected)
        expect(generateAsyncIterableSpy)
          .toHaveBeenCalledWith(generateAsyncIterableArgsExpected)
      })
    })
  })
})

describe('BaseSubscriptionResolver', () => {
  describe('.publishTopic()', () => {
    describe('to call members', () => {
      /** @type {GraphqlType.ResolverInputContext} */
      const contextMock = /** @type {*} */ ({
        broker: SubscriptionBroker.create({
          config: /** @type {*} */ ({
            redisOptions: null,
          }),
        }),
      })

      const cases = [
        {
          params: {
            Resolver: class AlphaSubscriptionResolver extends BaseSubscriptionResolver {
              static get schema () {
                return 'alpha'
              }
            },
            payload: {
              message: 'Alpha message.',
            },
            channelQuery: {},
          },
          topicTally: {
            channel: 'alpha',
            message: {
              alpha: {
                message: 'Alpha message.',
              },
            },
          },
        },
        {
          params: {
            Resolver: class BetaSubscriptionResolver extends BaseSubscriptionResolver {
              static get schema () {
                return 'beta'
              }
            },
            payload: {
              message: 'Beta message.',
            },
            channelQuery: {
              roomId: 1002,
              maxNumber: 10,
            },
          },
          topicTally: {
            channel: 'beta?roomId=1002&maxNumber=10',
            message: {
              beta: {
                message: 'Beta message.',
              },
            },
          },
        },
        {
          params: {
            Resolver: class GammaSubscriptionResolver extends BaseSubscriptionResolver {
              static get schema () {
                return 'gamma'
              }
            },
            payload: {
              message: 'Gamma message.',
            },
            channelQuery: {
              roomId: 1003,
              maxNumber: 2,
            },
          },
          topicTally: {
            channel: 'gamma?roomId=1003&maxNumber=2',
            message: {
              gamma: {
                message: 'Gamma message.',
              },
            },
          },
        },
      ]

      test.each(cases)('Resolver: $params.Resolver.name', async ({ params, topicTally }) => {
        const buildTopicArgsExpected = {
          payload: params.payload,
          channelQuery: params.channelQuery,
        }

        const buildTopicSpy = jest.spyOn(params.Resolver, 'buildTopic')
          .mockReturnValue(topicTally)
        const publishSpy = jest.spyOn(contextMock.broker, 'publish')

        const args = {
          context: contextMock,
          payload: params.payload,
          channelQuery: params.channelQuery,
        }

        await params.Resolver.publishTopic(args)

        expect(buildTopicSpy)
          .toHaveBeenCalledWith(buildTopicArgsExpected)
        expect(publishSpy)
          .toHaveBeenCalledWith(topicTally)
      })
    })
  })
})

describe('BaseSubscriptionResolver', () => {
  describe('.buildTopic()', () => {
    describe('to return generated topic', () => {
      const cases = [
        {
          params: {
            Resolver: class AlphaSubscriptionResolver extends BaseSubscriptionResolver {
              static get schema () {
                return 'alpha'
              }
            },
            payload: {
              message: 'Alpha message.',
            },
            channelQuery: {},
          },
          expected: {
            channel: 'alpha',
            message: {
              alpha: {
                message: 'Alpha message.',
              },
            },
          },
        },
        {
          params: {
            Resolver: class BetaSubscriptionResolver extends BaseSubscriptionResolver {
              static get schema () {
                return 'beta'
              }
            },
            payload: {
              message: 'Beta message.',
            },
            channelQuery: {
              roomId: 1002,
              maxNumber: 10,
            },
          },
          expected: {
            channel: 'beta?roomId=1002&maxNumber=10',
            message: {
              beta: {
                message: 'Beta message.',
              },
            },
          },
        },
        {
          params: {
            Resolver: class GammaSubscriptionResolver extends BaseSubscriptionResolver {
              static get schema () {
                return 'gamma'
              }
            },
            payload: {
              message: 'Gamma message.',
            },
            channelQuery: {
              roomId: 1003,
              maxNumber: 2,
            },
          },
          expected: {
            channel: 'gamma?roomId=1003&maxNumber=2',
            message: {
              gamma: {
                message: 'Gamma message.',
              },
            },
          },
        },
      ]

      test.each(cases)('Resolver: $params.Resolver.name', ({ params, expected }) => {
        const args = {
          payload: params.payload,
          channelQuery: params.channelQuery,
        }

        const actual = params.Resolver.buildTopic(args)

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('BaseSubscriptionResolver', () => {
  describe('#generateChannel()', () => {
    describe('to be generated channel', () => {
      const cases = [
        {
          params: {
            Resolver: class AlphaSubscriptionResolver extends BaseSubscriptionResolver {
              static get channelPrefix () {
                return 'alpha'
              }
            },
            query: {
              roomId: 10001,
            },
          },
          expected: 'alpha?roomId=10001',
        },
        {
          params: {
            Resolver: class BetaSubscriptionResolver extends BaseSubscriptionResolver {
              static get channelPrefix () {
                return 'beta'
              }
            },
            query: {
              roomId: 10002,
            },
          },
          expected: 'beta?roomId=10002',
        },
      ]

      test.each(cases)('Resolver: $params.Resolver.name', ({ params, expected }) => {
        const resolver = params.Resolver.create()

        const actual = resolver.generateChannel({
          query: params.query,
        })

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('BaseSubscriptionResolver', () => {
  describe('#generateChannelQuery()', () => {
    describe('to be fixed value', () => {
      const mockContext = /** @type {*} */ ({
        broker: /** @type {*} */ ({
          generateAsyncIterable: () => ({}),
        }),
      })

      const cases = [
        {
          variables: {
            input: {
              roomId: 123,
            },
          },
        },
        {
          variables: {
            input: {
              roomId: 456,
            },
          },
        },
      ]

      test.each(cases)('to return empty object', async ({ variables }) => {
        const expected = {}

        const resolver = BaseSubscriptionResolver.create()

        const actual = resolver.generateChannelQuery({
          variables,
          context: mockContext,
        })

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('BaseSubscriptionResolver', () => {
  describe('#generateAsyncIterable()', () => {
    describe('to return async iterable', () => {
      /** @type {GraphqlType.ResolverInputContext} */
      const mockContext = /** @type {*} */ ({
        broker: /** @type {*} */ (
          SubscriptionBroker.create({
            config: /** @type {*} */ ({
              redisOptions: null,
            }),
          })
        ),
      })

      const cases = [
        {
          params: {
            Resolver: class AlphaSubscriptionResolver extends BaseSubscriptionResolver {
              static get schema () {
                return 'alpha'
              }
            },
            broker: {
              generateAsyncIterable () {
                return {}
              },
            },
          },
          tally: {
            channel: 'alpha?roomId=10001',
          },
        },
        {
          params: {
            Resolver: class BetaSubscriptionResolver extends BaseSubscriptionResolver {
              static get schema () {
                return 'beta'
              }
            },
          },
          tally: {
            channel: 'beta?roomId=10002',
          },
        },
      ]

      test.each(cases)('Resolver: $params.Resolver', async ({ params, tally }) => {
        const expected = {
          [Symbol.asyncIterator]: expect.any(Function),
        }
        const generateAsyncIterableArgsExpected = {
          channel: tally.channel,
        }

        const generateAsyncIterableSpy = jest.spyOn(mockContext.broker, 'generateAsyncIterable')

        const resolver = BaseSubscriptionResolver.create()

        const actual = resolver.generateAsyncIterable({
          context: mockContext,
          channel: tally.channel,
        })

        expect(actual)
          .toEqual(expected)

        expect(generateAsyncIterableSpy)
          .toHaveBeenCalledWith(generateAsyncIterableArgsExpected)
      })
    })
  })
})
