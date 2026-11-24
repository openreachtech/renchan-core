import TopicReceiver from '../../../../../lib/server/graphql/subscription/TopicReceiver.js'

import TopicQueue from '../../../../../lib/server/graphql/subscription/TopicQueue.js'
import TopicParcel from '../../../../../lib/server/graphql/subscription/TopicParcel.js'
import SubscriptionBroker from '../../../../../lib/server/graphql/subscription/SubscriptionBroker.js'
import LocalPubSub from '../../../../../lib/server/graphql/subscription/pubsub/LocalPubSub.js'

describe('TopicReceiver', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      const brokerMock = new SubscriptionBroker({
        pubSub: LocalPubSub.create(),
      })

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
            topicQueue: TopicQueue.create(),
            onMessage: () => {},
            abortController: new AbortController(),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
            topicQueue: TopicQueue.create(),
            onMessage: () => {},
            abortController: new AbortController(),
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
            topicQueue: TopicQueue.create(),
            onMessage: () => {},
            abortController: new AbortController(),
          },
        },
      ]

      describe('#channel', () => {
        test.each(cases)('channel: $params.channel', ({ params }) => {
          const receiver = new TopicReceiver(params)

          expect(receiver)
            .toHaveProperty('channel', params.channel)
        })
      })

      describe('#broker', () => {
        test.each(cases)('channel: $params.channel', ({ params }) => {
          const receiver = new TopicReceiver(params)

          expect(receiver)
            .toHaveProperty('broker', params.broker)
        })
      })

      describe('#topicQueue', () => {
        test.each(cases)('channel: $params.channel', ({ params }) => {
          const receiver = new TopicReceiver(params)

          expect(receiver)
            .toHaveProperty('topicQueue', params.topicQueue)
        })
      })

      describe('#onMessage', () => {
        test.each(cases)('channel: $params.channel', ({ params }) => {
          const receiver = new TopicReceiver(params)

          expect(receiver)
            .toHaveProperty('onMessage', params.onMessage)
        })
      })

      describe('#abortController', () => {
        test.each(cases)('channel: $params.channel', ({ params }) => {
          const receiver = new TopicReceiver(params)

          expect(receiver)
            .toHaveProperty('abortController', params.abortController)
        })
      })
    })

    describe('to setup properties', () => {
      const brokerMock = new SubscriptionBroker({
        pubSub: LocalPubSub.create(),
      })

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
            onMessage: () => {},
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
            onMessage: () => {},
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
            onMessage: () => {},
          },
        },
      ]

      describe('#broker', () => {
        test.each(cases)('channel: $params.channel', ({ params }) => {
          const expected = expect.any(Function)

          const receiver = new TopicReceiver(params)

          expect(receiver)
            .toHaveProperty('onMessage', expected)
        })
      })

      describe('#broker', () => {
        describe('to be instance of Function', () => {
          test.each(cases)('channel: $params.channel', ({ params }) => {
            const receiver = new TopicReceiver(params)

            expect(receiver)
              .toHaveProperty('listener', expect.any(Function))
          })
        })

        describe('to call #generateListener()', () => {
          test.each(cases)('channel: $params.channel', ({ params }) => {
            const listenerTally = () => {}

            const generateListenerSpy = jest.spyOn(TopicReceiver.prototype, 'generateListener')
              .mockReturnValue(listenerTally)

            const receiver = new TopicReceiver(params)

            expect(receiver)
              .toHaveProperty('listener', listenerTally)

            expect(generateListenerSpy)
              .toHaveBeenCalledWith()
          })
        })
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('.create()', () => {
    const brokerMock = new SubscriptionBroker({
      pubSub: LocalPubSub.create(),
    })

    describe('to return instance of own class', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
            topicQueue: TopicQueue.create(),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
            topicQueue: TopicQueue.create(),
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
            topicQueue: TopicQueue.create(),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const actual = TopicReceiver.create(params)

        expect(actual)
          .toBeInstanceOf(TopicReceiver)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
            topicQueue: TopicQueue.create(),
            onMessage: () => {},
            abortController: new AbortController(),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
            topicQueue: TopicQueue.create(),
            onMessage: () => {},
            abortController: new AbortController(),
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
            topicQueue: TopicQueue.create(),
            onMessage: () => {},
            abortController: new AbortController(),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(TopicReceiver)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })

    describe('to fill default #topicQueue', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const expected = {
          channel: params.channel,
          broker: params.broker,
          topicQueue: expect.any(TopicQueue),
          onMessage: expect.any(Function),
          abortController: expect.any(AbortController),
        }

        const SpyClass = globalThis.constructorSpy.spyOn(TopicReceiver)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('to fill default #onMessage', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const expected = {
          channel: params.channel,
          broker: params.broker,
          topicQueue: expect.any(TopicQueue),
          onMessage: expect.any(Function),
          abortController: expect.any(AbortController),
        }

        const SpyClass = globalThis.constructorSpy.spyOn(TopicReceiver)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('to fill default #abortController', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const expected = {
          channel: params.channel,
          broker: params.broker,
          topicQueue: expect.any(TopicQueue),
          onMessage: expect.any(Function),
          abortController: expect.any(AbortController),
        }

        const SpyClass = globalThis.constructorSpy.spyOn(TopicReceiver)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('.get:TopicQueueCtor', () => {
    describe('when called as is', () => {
      test('should be TopicQueue', () => {
        const received = TopicReceiver.TopicQueueCtor

        expect(received)
          .toBe(TopicQueue) // same reference
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('.get:AbortControllerCtor', () => {
    describe('when called as is', () => {
      test('should be AbortController', () => {
        const received = TopicReceiver.AbortControllerCtor

        expect(received)
          .toBe(AbortController) // same reference
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('.createTopicQueue()', () => {
    describe('should create an instance through #TopicQueueCtor', () => {
      class AlphaTopicQueue extends TopicQueue {}

      class BetaTopicQueue extends TopicQueue {}

      const cases = [
        {
          override: {
            TopicQueueCtor: AlphaTopicQueue,
          },
        },
        {
          override: {
            TopicQueueCtor: BetaTopicQueue,
          },
        },
      ]

      test.each(cases)('TopicQueueCtor: $override.TopicQueueCtor.name', ({ override }) => {
        jest.spyOn(TopicReceiver, 'TopicQueueCtor', 'get')
          .mockReturnValue(override.TopicQueueCtor)

        const received = TopicReceiver.createTopicQueue()

        expect(received)
          .toBeInstanceOf(override.TopicQueueCtor)
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('.createAbortController()', () => {
    describe('should create an instance through #AbortControllerCtor', () => {
      class AlphaAbortController extends AbortController {}

      class BetaAbortController extends AbortController {}

      const cases = [
        {
          override: {
            AbortControllerCtor: AlphaAbortController,
          },
        },
        {
          override: {
            AbortControllerCtor: BetaAbortController,
          },
        },
      ]

      test.each(cases)('AbortControllerCtor: $override.AbortControllerCtor.name', ({ override }) => {
        jest.spyOn(TopicReceiver, 'AbortControllerCtor', 'get')
          .mockReturnValue(override.AbortControllerCtor)

        const received = TopicReceiver.createAbortController()

        expect(received)
          .toBeInstanceOf(override.AbortControllerCtor)
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#generateListener()', () => {
    const brokerMock = new SubscriptionBroker({
      pubSub: LocalPubSub.create(),
    })

    describe('to be instance of Function', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const receiver = new TopicReceiver(params)

        const actual = receiver.generateListener()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('to enqueue the topic as received without parsing the message', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            message: '{"name":"Alice","age":11}',
          },
          expected: [
            TopicParcel.create({ channel: 'alpha-channel', message: '{"name":"Alice","age":11}' }),
          ],
        },
        {
          input: {
            channel: 'beta-channel',
            message: '{"name":"Bob","age":22}',
          },
          expected: [
            TopicParcel.create({ channel: 'beta-channel', message: '{"name":"Bob","age":22}' }),
          ],
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input, expected }) => {
        const topicQueue = TopicQueue.create()

        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue,
        })
          .setOnMessage({
            onMessage: () => {},
          })

        const listener = receiver.generateListener()

        listener(
          input.channel,
          input.message
        )

        expect(topicQueue)
          .toHaveProperty('topics', expected)
      })
    })

    describe('to call #onMessage() with no arguments after enqueueing', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            message: '{"name":"Alice","age":11}',
          },
        },
        {
          input: {
            channel: 'beta-channel',
            message: '{"name":"Bob","age":22}',
          },
        },
        {
          input: {
            channel: 'gamma-channel',
            message: '{"name":"Charlie","age":33}',
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const topicQueue = TopicQueue.create()

        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue,
        })
          .setOnMessage({
            onMessage: () => {},
          })

        const onMessageSpy = jest.spyOn(receiver, 'onMessage')

        const listener = receiver.generateListener()

        listener(
          input.channel,
          input.message
        )

        expect(onMessageSpy)
          .toHaveBeenCalledWith()
        expect(onMessageSpy)
          .toHaveBeenCalledTimes(1)
      })
    })

    describe('to keep every topic that arrives back to back', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            alphaMessage: '{"phase":"STARTED"}',
            betaMessage: '{"phase":"COMPLETED"}',
          },
          expected: [
            TopicParcel.create({ channel: 'alpha-channel', message: '{"phase":"STARTED"}' }),
            TopicParcel.create({ channel: 'alpha-channel', message: '{"phase":"COMPLETED"}' }),
          ],
        },
        {
          input: {
            channel: 'beta-channel',
            alphaMessage: '{"phase":"ITEM","id":1}',
            betaMessage: '{"phase":"ITEM","id":2}',
          },
          expected: [
            TopicParcel.create({ channel: 'beta-channel', message: '{"phase":"ITEM","id":1}' }),
            TopicParcel.create({ channel: 'beta-channel', message: '{"phase":"ITEM","id":2}' }),
          ],
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input, expected }) => {
        const topicQueue = TopicQueue.create()

        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue,
        })
          .setOnMessage({
            onMessage: () => {},
          })

        const onMessageSpy = jest.spyOn(receiver, 'onMessage')

        const listener = receiver.generateListener()

        listener(input.channel, input.alphaMessage)
        listener(input.channel, input.betaMessage)

        expect(topicQueue)
          .toHaveProperty('topics', expected)
        expect(onMessageSpy)
          .toHaveBeenCalledTimes(2)
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#setOnMessage()', () => {
    describe('to update #onMessage', () => {
      const brokerMock = new SubscriptionBroker({
        pubSub: LocalPubSub.create(),
      })

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
            onMessage: () => {},
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
            onMessage: () => {},
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
            onMessage: () => {},
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const onMessageTally = () => {}

        const receiver = new TopicReceiver(params)

        expect(receiver)
          .toHaveProperty('onMessage', params.onMessage)

        receiver.setOnMessage({
          onMessage: onMessageTally,
        })

        expect(receiver)
          .toHaveProperty('onMessage', onMessageTally)
      })
    })

    describe('to return own instance for method chaining', () => {
      const brokerMock = new SubscriptionBroker({
        pubSub: LocalPubSub.create(),
      })

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const onMessageTally = () => {}

        const receiver = new TopicReceiver(params)

        const actual = receiver.setOnMessage({
          onMessage: onMessageTally,
        })

        expect(actual)
          .toBe(receiver) // same reference
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#subscribe()', () => {
    const brokerMock = new SubscriptionBroker({
      pubSub: LocalPubSub.create(),
    })

    const cases = [
      {
        params: {
          channel: 'alpha-channel',
          broker: brokerMock,
        },
      },
      {
        params: {
          channel: 'beta-channel',
          broker: brokerMock,
        },
      },
      {
        params: {
          channel: 'gamma-channel',
          broker: brokerMock,
        },
      },
    ]

    describe('to call #broker.subscribe()', () => {
      test.each(cases)('channel: $params.channel', async ({ params }) => {
        const subscribeSpy = jest.spyOn(brokerMock, 'subscribe')

        const receiver = new TopicReceiver(params)

        const expected = {
          channel: params.channel,
          receiver,
        }

        await receiver.subscribe()

        expect(subscribeSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#unsubscribe()', () => {
    const brokerMock = new SubscriptionBroker({
      pubSub: LocalPubSub.create(),
    })

    const cases = [
      {
        params: {
          channel: 'alpha-channel',
          broker: brokerMock,
        },
      },
      {
        params: {
          channel: 'beta-channel',
          broker: brokerMock,
        },
      },
      {
        params: {
          channel: 'gamma-channel',
          broker: brokerMock,
        },
      },
    ]

    describe('to call #broker.unsubscribe()', () => {
      test.each(cases)('channel: $params.channel', async ({ params }) => {
        const unsubscribeSpy = jest.spyOn(brokerMock, 'unsubscribe')

        const receiver = new TopicReceiver(params)

        const expected = {
          channel: params.channel,
          receiver,
        }

        await receiver.unsubscribe()

        expect(unsubscribeSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#generateAsyncIterable()', () => {
    describe('to return async iterable', () => {
      const brokerMock = new SubscriptionBroker({
        pubSub: LocalPubSub.create(),
      })

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
          },
        },
      ]

      test.each(cases)('channel: $params.channel', async ({ params }) => {
        const expected = {
          [Symbol.asyncIterator]: expect.any(Function),
        }

        const receiver = new TopicReceiver(params)

        const actual = await receiver.generateAsyncIterable()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to return async iterator by generated value', () => {
      const brokerMock = new SubscriptionBroker({
        pubSub: LocalPubSub.create(),
      })

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
          },
        },
      ]

      test.each(cases)('channel: $params.channel', async ({ params }) => {
        const nextTally = async () => ({
          value: null,
          done: false,
        })
        const returnTally = async () => ({
          value: null,
          done: true,
        })
        const throwTally = async error => {
          throw error
        }

        const receiver = new TopicReceiver(params)

        jest.spyOn(receiver, 'generateAsyncIteratorNext')
          .mockReturnValue(nextTally)
        jest.spyOn(receiver, 'generateAsyncIteratorReturn')
          .mockReturnValue(returnTally)
        jest.spyOn(receiver, 'generateAsyncIteratorThrow')
          .mockReturnValue(throwTally)

        const iterable = await receiver.generateAsyncIterable()
        const iteratorFunction = iterable[Symbol.asyncIterator]

        const actual = iteratorFunction()

        expect(actual)
          .toHaveProperty('next', nextTally)
        expect(actual)
          .toHaveProperty('return', returnTally)
        expect(actual)
          .toHaveProperty('throw', throwTally)
      })
    })

    describe('to subscribe before returning the iterable', () => {
      const brokerMock = new SubscriptionBroker({
        pubSub: LocalPubSub.create(),
      })

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
          },
        },
      ]

      test.each(cases)('channel: $params.channel', async ({ params }) => {
        const receiver = new TopicReceiver(params)

        const subscribeSpy = jest.spyOn(receiver, 'subscribe')
          .mockResolvedValue()

        await receiver.generateAsyncIterable()

        expect(subscribeSpy)
          .toHaveBeenCalledWith()
        expect(subscribeSpy)
          .toHaveBeenCalledTimes(1)
      })
    })

    describe('to reject when subscribe() fails', () => {
      const brokerMock = new SubscriptionBroker({
        pubSub: LocalPubSub.create(),
      })

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
          },
          tally: new Error('alpha-error'),
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
          },
          tally: new Error('beta-error'),
        },
      ]

      test.each(cases)('error: $tally.message', async ({ params, tally }) => {
        const receiver = new TopicReceiver(params)

        jest.spyOn(receiver, 'subscribe')
          .mockRejectedValue(tally)

        await expect(receiver.generateAsyncIterable())
          .rejects
          .toBe(tally)
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#generateAsyncIterator()', () => {
    describe('to return async iterator', () => {
      const brokerMock = new SubscriptionBroker({
        pubSub: LocalPubSub.create(),
      })

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
          },
        },
      ]

      test.each(cases)('channel: $params.channel', async ({ params }) => {
        const nextTally = async () => ({
          value: null,
          done: false,
        })
        const returnTally = async () => ({
          value: null,
          done: true,
        })
        const throwTally = async error => {
          throw error
        }

        const receiver = new TopicReceiver(params)

        jest.spyOn(receiver, 'generateAsyncIteratorNext')
          .mockReturnValue(nextTally)
        jest.spyOn(receiver, 'generateAsyncIteratorReturn')
          .mockReturnValue(returnTally)
        jest.spyOn(receiver, 'generateAsyncIteratorThrow')
          .mockReturnValue(throwTally)

        const actual = receiver.generateAsyncIterator()

        expect(actual)
          .toHaveProperty('next', nextTally)
        expect(actual)
          .toHaveProperty('return', returnTally)
        expect(actual)
          .toHaveProperty('throw', throwTally)
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#generateAsyncIteratorNext()', () => {
    const brokerMock = new SubscriptionBroker({
      pubSub: LocalPubSub.create(),
    })

    describe('to be instance of Function', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const receiver = new TopicReceiver(params)

        const actual = receiver.generateAsyncIteratorNext()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('for generated function when no message is held', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            message: '{"phase":"STARTED"}',
          },
          expected: {
            value: TopicParcel.create({ channel: 'alpha-channel', message: '{"phase":"STARTED"}' }),
            done: false,
          },
        },
        {
          input: {
            channel: 'beta-channel',
            message: '{"phase":"COMPLETED"}',
          },
          expected: {
            value: TopicParcel.create({ channel: 'beta-channel', message: '{"phase":"COMPLETED"}' }),
            done: false,
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, expected }) => {
        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue: TopicQueue.create(),
          abortController: new AbortController(),
        })

        const setOnMessageSpy = jest.spyOn(receiver, 'setOnMessage')
        const subscribeSpy = jest.spyOn(receiver, 'subscribe')
          .mockResolvedValue()

        const generatedNextFunction = receiver.generateAsyncIteratorNext()

        const nextPromise = generatedNextFunction()

        /*
         * The promise waits until the listener delivers a message.
         */
        receiver.listener(input.channel, input.message)

        const received = await nextPromise
        expect(received)
          .toStrictEqual(expected)
        expect(setOnMessageSpy)
          .toHaveBeenCalledWith({
            onMessage: expect.any(Function),
          })
        expect(subscribeSpy)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('for generated function when messages are held', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            alphaMessage: '{"phase":"STARTED"}',
            betaMessage: '{"phase":"ITEM"}',
            gammaMessage: '{"phase":"COMPLETED"}',
          },
          expected: {
            alpha: {
              value: TopicParcel.create({ channel: 'alpha-channel', message: '{"phase":"STARTED"}' }),
              done: false,
            },
            beta: {
              value: TopicParcel.create({ channel: 'alpha-channel', message: '{"phase":"ITEM"}' }),
              done: false,
            },
            gamma: {
              value: TopicParcel.create({ channel: 'alpha-channel', message: '{"phase":"COMPLETED"}' }),
              done: false,
            },
          },
        },
        {
          input: {
            channel: 'beta-channel',
            alphaMessage: '{"id":1}',
            betaMessage: '{"id":2}',
            gammaMessage: '{"id":3}',
          },
          expected: {
            alpha: {
              value: TopicParcel.create({ channel: 'beta-channel', message: '{"id":1}' }),
              done: false,
            },
            beta: {
              value: TopicParcel.create({ channel: 'beta-channel', message: '{"id":2}' }),
              done: false,
            },
            gamma: {
              value: TopicParcel.create({ channel: 'beta-channel', message: '{"id":3}' }),
              done: false,
            },
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, expected }) => {
        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue: TopicQueue.create({
            topics: [
              TopicParcel.create({ channel: input.channel, message: input.alphaMessage }),
              TopicParcel.create({ channel: input.channel, message: input.betaMessage }),
              TopicParcel.create({ channel: input.channel, message: input.gammaMessage }),
            ],
          }),
          abortController: new AbortController(),
        })

        const setOnMessageSpy = jest.spyOn(receiver, 'setOnMessage')
        const subscribeSpy = jest.spyOn(receiver, 'subscribe')

        const generatedNextFunction = receiver.generateAsyncIteratorNext()

        const alphaResult = await generatedNextFunction()
        const betaResult = await generatedNextFunction()
        const gammaResult = await generatedNextFunction()

        expect(alphaResult)
          .toStrictEqual(expected.alpha)
        expect(betaResult)
          .toStrictEqual(expected.beta)
        expect(gammaResult)
          .toStrictEqual(expected.gamma)
        expect(setOnMessageSpy)
          .not
          .toHaveBeenCalled()
        expect(subscribeSpy)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('for generated function when messages arrive back to back', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            alphaMessage: '{"phase":"STARTED"}',
            betaMessage: '{"phase":"ITEM"}',
            gammaMessage: '{"phase":"COMPLETED"}',
          },
          expected: {
            alpha: {
              value: TopicParcel.create({ channel: 'alpha-channel', message: '{"phase":"STARTED"}' }),
              done: false,
            },
            beta: {
              value: TopicParcel.create({ channel: 'alpha-channel', message: '{"phase":"ITEM"}' }),
              done: false,
            },
            gamma: {
              value: TopicParcel.create({ channel: 'alpha-channel', message: '{"phase":"COMPLETED"}' }),
              done: false,
            },
          },
        },
        {
          input: {
            channel: 'beta-channel',
            alphaMessage: '{"id":1}',
            betaMessage: '{"id":2}',
            gammaMessage: '{"id":3}',
          },
          expected: {
            alpha: {
              value: TopicParcel.create({ channel: 'beta-channel', message: '{"id":1}' }),
              done: false,
            },
            beta: {
              value: TopicParcel.create({ channel: 'beta-channel', message: '{"id":2}' }),
              done: false,
            },
            gamma: {
              value: TopicParcel.create({ channel: 'beta-channel', message: '{"id":3}' }),
              done: false,
            },
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, expected }) => {
        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue: TopicQueue.create(),
          abortController: new AbortController(),
        })

        jest.spyOn(receiver, 'subscribe')
          .mockResolvedValue()

        const generatedNextFunction = receiver.generateAsyncIteratorNext()

        const alphaPromise = generatedNextFunction()

        /*
         * All of them arrive before the next call of the generated function.
         */
        receiver.listener(input.channel, input.alphaMessage)
        receiver.listener(input.channel, input.betaMessage)
        receiver.listener(input.channel, input.gammaMessage)

        const alphaResult = await alphaPromise
        const betaResult = await generatedNextFunction()
        const gammaResult = await generatedNextFunction()

        expect(alphaResult)
          .toStrictEqual(expected.alpha)
        expect(betaResult)
          .toStrictEqual(expected.beta)
        expect(gammaResult)
          .toStrictEqual(expected.gamma)
      })
    })

    describe('for generated function when the iteration has ended', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            topics: [
              TopicParcel.create({ channel: 'alpha-channel', message: '{"phase":"STARTED"}' }),
            ],
            abortController: new AbortController(),
          },
          expected: {
            value: null,
            done: true,
          },
        },
        {
          input: {
            channel: 'beta-channel',
            topics: [
              TopicParcel.create({ channel: 'beta-channel', message: '{"id":1}' }),
              TopicParcel.create({ channel: 'beta-channel', message: '{"id":2}' }),
            ],
            abortController: new AbortController(),
          },
          expected: {
            value: null,
            done: true,
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, expected }) => {
        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue: TopicQueue.create({
            topics: input.topics,
          }),
          onMessage: () => {},
          abortController: input.abortController,
        })

        input.abortController.abort()

        const generatedNextFunction = receiver.generateAsyncIteratorNext()

        const received = await generatedNextFunction()

        expect(received)
          .toStrictEqual(expected)
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#hasEnded()', () => {
    const brokerMock = new SubscriptionBroker({
      pubSub: LocalPubSub.create(),
    })

    describe('should return false when the abortController has not been aborted', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            abortController: new AbortController(),
          },
        },
        {
          input: {
            channel: 'beta-channel',
            abortController: new AbortController(),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue: TopicQueue.create(),
          onMessage: () => {},
          abortController: input.abortController,
        })

        const received = receiver.hasEnded()

        expect(received)
          .toBe(false)
      })
    })

    describe('should return true when the abortController has been aborted', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            abortController: new AbortController(),
          },
        },
        {
          input: {
            channel: 'beta-channel',
            abortController: new AbortController(),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue: TopicQueue.create(),
          onMessage: () => {},
          abortController: input.abortController,
        })

        input.abortController.abort()

        const received = receiver.hasEnded()

        expect(received)
          .toBe(true)
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#canAnswerNext()', () => {
    const brokerMock = new SubscriptionBroker({
      pubSub: LocalPubSub.create(),
    })

    describe('should return true when a topic is held', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            topics: [
              TopicParcel.create({ channel: 'alpha-channel', message: '{"phase":"STARTED"}' }),
            ],
            abortController: new AbortController(),
          },
        },
        {
          input: {
            channel: 'beta-channel',
            topics: [
              TopicParcel.create({ channel: 'beta-channel', message: '{"id":1}' }),
              TopicParcel.create({ channel: 'beta-channel', message: '{"id":2}' }),
            ],
            abortController: new AbortController(),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue: TopicQueue.create({
            topics: input.topics,
          }),
          onMessage: () => {},
          abortController: input.abortController,
        })

        const received = receiver.canAnswerNext()

        expect(received)
          .toBe(true)
      })
    })

    describe('should return true when the iteration has ended', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            topics: [],
            abortController: new AbortController(),
          },
        },
        {
          input: {
            channel: 'beta-channel',
            topics: [
              TopicParcel.create({ channel: 'beta-channel', message: '{"id":1}' }),
            ],
            abortController: new AbortController(),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue: TopicQueue.create({
            topics: input.topics,
          }),
          onMessage: () => {},
          abortController: input.abortController,
        })

        input.abortController.abort()

        const received = receiver.canAnswerNext()

        expect(received)
          .toBe(true)
      })
    })

    describe('should return false when no topic is held and the iteration has not ended', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            abortController: new AbortController(),
          },
        },
        {
          input: {
            channel: 'beta-channel',
            abortController: new AbortController(),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue: TopicQueue.create(),
          onMessage: () => {},
          abortController: input.abortController,
        })

        const received = receiver.canAnswerNext()

        expect(received)
          .toBe(false)
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#waitTopic()', () => {
    const brokerMock = new SubscriptionBroker({
      pubSub: LocalPubSub.create(),
    })

    describe('when a topic is held', () => {
      describe('should return without waiting', () => {
        const cases = [
          {
            input: {
              channel: 'alpha-channel',
              topics: [
                TopicParcel.create({ channel: 'alpha-channel', message: '{"phase":"STARTED"}' }),
              ],
            },
          },
          {
            input: {
              channel: 'beta-channel',
              topics: [
                TopicParcel.create({ channel: 'beta-channel', message: '{"id":1}' }),
                TopicParcel.create({ channel: 'beta-channel', message: '{"id":2}' }),
              ],
            },
          },
        ]

        test.each(cases)('channel: $input.channel', async ({ input }) => {
          const receiver = new TopicReceiver({
            channel: input.channel,
            broker: brokerMock,
            topicQueue: TopicQueue.create({
              topics: input.topics,
            }),
            abortController: new AbortController(),
          })

          const setOnMessageSpy = jest.spyOn(receiver, 'setOnMessage')
          const subscribeSpy = jest.spyOn(receiver, 'subscribe')

          const received = await receiver.waitTopic()

          expect(received)
            .toBeUndefined()
          expect(setOnMessageSpy)
            .not
            .toHaveBeenCalled()
          expect(subscribeSpy)
            .not
            .toHaveBeenCalled()
        })
      })
    })

    describe('when no topic is held', () => {
      describe('should wait until a topic arrives', () => {
        const cases = [
          {
            input: {
              channel: 'alpha-channel',
              message: '{"phase":"STARTED"}',
            },
          },
          {
            input: {
              channel: 'beta-channel',
              message: '{"id":1}',
            },
          },
        ]

        test.each(cases)('channel: $input.channel', async ({ input }) => {
          const receiver = new TopicReceiver({
            channel: input.channel,
            broker: brokerMock,
            topicQueue: TopicQueue.create(),
            abortController: new AbortController(),
          })

          const setOnMessageSpy = jest.spyOn(receiver, 'setOnMessage')
          const subscribeSpy = jest.spyOn(receiver, 'subscribe')
            .mockResolvedValue()

          const waiting = receiver.waitTopic()

          /*
           * The promise waits until the listener delivers a topic.
           */
          receiver.listener(input.channel, input.message)

          const received = await waiting

          expect(received)
            .toBeUndefined()
          expect(setOnMessageSpy)
            .toHaveBeenCalledWith({
              onMessage: expect.any(Function),
            })
          expect(subscribeSpy)
            .not
            .toHaveBeenCalled()
        })
      })
    })

    describe('should keep waiting when a topic which is not available arrives', () => {
      const cases = [
        {
          input: {
            message: '{"alpha":',
          },
        },
        {
          input: {
            message: 'not-json',
          },
        },
      ]

      test.each(cases)('message: $input.message', async ({ input }) => {
        const topicQueue = TopicQueue.create()

        const receiver = new TopicReceiver({
          channel: 'alpha-channel',
          broker: brokerMock,
          topicQueue,
          abortController: new AbortController(),
        })

        jest.spyOn(receiver, 'subscribe')
          .mockResolvedValue()

        const waiting = receiver.waitTopic()

        receiver.listener('alpha-channel', input.message)

        const pending = new Promise(resolve => {
          setTimeout(() => resolve('pending'), 10)
        })
        const received = await Promise.race([waiting, pending])

        expect(received)
          .toBe('pending')
      })
    })

    describe('should resolve when an available topic arrives after a topic which is not available', () => {
      const cases = [
        {
          input: {
            message: '{"alpha":1}',
          },
        },
        {
          input: {
            message: '[1,2]',
          },
        },
      ]

      test.each(cases)('message: $input.message', async ({ input }) => {
        const topicQueue = TopicQueue.create()

        const receiver = new TopicReceiver({
          channel: 'alpha-channel',
          broker: brokerMock,
          topicQueue,
          abortController: new AbortController(),
        })

        jest.spyOn(receiver, 'subscribe')
          .mockResolvedValue()

        const waiting = receiver.waitTopic()

        receiver.listener('alpha-channel', '{"alpha":')
        receiver.listener('alpha-channel', input.message)

        await expect(waiting)
          .resolves
          .not
          .toThrow()
      })
    })

    describe('when the iteration has ended', () => {
      describe('should return without waiting', () => {
        const cases = [
          {
            input: {
              channel: 'alpha-channel',
              abortController: new AbortController(),
            },
          },
          {
            input: {
              channel: 'beta-channel',
              abortController: new AbortController(),
            },
          },
        ]

        test.each(cases)('channel: $input.channel', async ({ input }) => {
          const receiver = new TopicReceiver({
            channel: input.channel,
            broker: brokerMock,
            topicQueue: TopicQueue.create(),
            onMessage: () => {},
            abortController: input.abortController,
          })

          const setOnMessageSpy = jest.spyOn(receiver, 'setOnMessage')

          input.abortController.abort()

          const received = await receiver.waitTopic()

          expect(received)
            .toBeUndefined()
          expect(setOnMessageSpy)
            .not
            .toHaveBeenCalled()
        })
      })
    })

    describe('when the iteration ends while waiting', () => {
      describe('should stop waiting', () => {
        const cases = [
          {
            input: {
              channel: 'alpha-channel',
              abortController: new AbortController(),
            },
          },
          {
            input: {
              channel: 'beta-channel',
              abortController: new AbortController(),
            },
          },
        ]

        test.each(cases)('channel: $input.channel', async ({ input }) => {
          const receiver = new TopicReceiver({
            channel: input.channel,
            broker: brokerMock,
            topicQueue: TopicQueue.create(),
            onMessage: () => {},
            abortController: input.abortController,
          })

          const waiting = receiver.waitTopic()

          /*
           * What return() and throw() do: end the iteration, then call #onMessage().
           */
          input.abortController.abort()
          receiver.onMessage()

          const received = await waiting

          expect(received)
            .toBeUndefined()
        })
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#extractTopicParcel()', () => {
    const brokerMock = new SubscriptionBroker({
      pubSub: LocalPubSub.create(),
    })

    describe('should take the topic parcel at the head out as it is', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            topics: [
              TopicParcel.create({ channel: 'alpha-channel', message: '{"phase":"STARTED"}' }),
            ],
          },
          expected: {
            channel: 'alpha-channel',
            message: '{"phase":"STARTED"}',
            rest: [],
          },
        },
        {
          input: {
            channel: 'beta-channel',
            topics: [
              TopicParcel.create({ channel: 'beta-channel', message: '{"id":1}' }),
              TopicParcel.create({ channel: 'beta-channel', message: '{"id":2}' }),
            ],
          },
          expected: {
            channel: 'beta-channel',
            message: '{"id":1}',
            rest: [
              TopicParcel.create({ channel: 'beta-channel', message: '{"id":2}' }),
            ],
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input, expected }) => {
        const topicQueue = TopicQueue.create({
          topics: input.topics,
        })

        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue,
        })

        const received = receiver.extractTopicParcel()

        expect(received)
          .toBeInstanceOf(TopicParcel)
        expect(received)
          .toHaveProperty('channel', expected.channel)
        expect(received)
          .toHaveProperty('message', expected.message)
        expect(topicQueue)
          .toHaveProperty('topics', expected.rest)
      })
    })

    describe('should return null when no available topic parcel is held', () => {
      const cases = [
        {
          input: {
            message: '{"alpha":',
          },
        },
        {
          input: {
            message: 'not-json',
          },
        },
      ]

      test.each(cases)('message: $input.message', ({ input }) => {
        const topicQueue = TopicQueue.create()

        topicQueue.enqueue({
          channel: 'alpha-channel',
          message: input.message,
        })

        const receiver = new TopicReceiver({
          channel: 'alpha-channel',
          broker: brokerMock,
          topicQueue,
        })

        const received = receiver.extractTopicParcel()

        expect(received)
          .toBeNull()
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#generateAsyncIteratorReturn()', () => {
    const brokerMock = new SubscriptionBroker({
      pubSub: LocalPubSub.create(),
    })

    describe('to be instance of Function', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
            abortController: new AbortController(),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
            abortController: new AbortController(),
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
            abortController: new AbortController(),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const receiver = new TopicReceiver(params)

        const actual = receiver.generateAsyncIteratorReturn()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('for generated function', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
            abortController: new AbortController(),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
            abortController: new AbortController(),
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
            abortController: new AbortController(),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', async ({ params }) => {
        const receiver = new TopicReceiver(params)

        const unsubscribeSpy = jest.spyOn(receiver, 'unsubscribe')

        const generatedReturnFunction = receiver.generateAsyncIteratorReturn()

        const expected = {
          value: null,
          done: true,
        }

        const actual = await generatedReturnFunction()

        expect(actual)
          .toEqual(expected)

        expect(unsubscribeSpy)
          .toHaveBeenCalledWith()
      })
    })

    describe('to end the iteration', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            abortController: new AbortController(),
          },
        },
        {
          input: {
            channel: 'beta-channel',
            abortController: new AbortController(),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input }) => {
        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue: TopicQueue.create(),
          onMessage: () => {},
          abortController: input.abortController,
        })

        jest.spyOn(receiver, 'unsubscribe')
          .mockResolvedValue()

        const generatedReturnFunction = receiver.generateAsyncIteratorReturn()

        await generatedReturnFunction()

        const received = receiver.hasEnded()

        expect(received)
          .toBe(true)
      })
    })

    describe('to end the iteration even when #unsubscribe() fails', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            abortController: new AbortController(),
          },
          tally: new Error('alpha unsubscribe failed'),
        },
        {
          input: {
            channel: 'beta-channel',
            abortController: new AbortController(),
          },
          tally: new Error('beta unsubscribe failed'),
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue: TopicQueue.create(),
          onMessage: () => {},
          abortController: input.abortController,
        })

        jest.spyOn(receiver, 'unsubscribe')
          .mockRejectedValue(tally)

        const generatedReturnFunction = receiver.generateAsyncIteratorReturn()

        await expect(generatedReturnFunction())
          .rejects
          .toBe(tally) // same reference

        const received = receiver.hasEnded()

        expect(received)
          .toBe(true)
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#generateAsyncIteratorThrow()', () => {
    const brokerMock = new SubscriptionBroker({
      pubSub: LocalPubSub.create(),
    })

    describe('to be instance of Function', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
            abortController: new AbortController(),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
            abortController: new AbortController(),
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
            abortController: new AbortController(),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const receiver = new TopicReceiver(params)

        const actual = receiver.generateAsyncIteratorThrow()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('for generated function', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
            abortController: new AbortController(),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
            abortController: new AbortController(),
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
            abortController: new AbortController(),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', async ({ params }) => {
        const receiver = new TopicReceiver(params)

        const unsubscribeSpy = jest.spyOn(receiver, 'unsubscribe')

        const generatedThrowFunction = receiver.generateAsyncIteratorThrow()

        const messageTally = `tally on ${new Date()}`
        const errorTally = new Error(messageTally)

        await expect(generatedThrowFunction(errorTally))
          .rejects
          .toThrow(messageTally)

        expect(unsubscribeSpy)
          .toHaveBeenCalledWith()
      })
    })

    describe('to end the iteration', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            abortController: new AbortController(),
          },
          tally: new Error('alpha thrown'),
        },
        {
          input: {
            channel: 'beta-channel',
            abortController: new AbortController(),
          },
          tally: new Error('beta thrown'),
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue: TopicQueue.create(),
          onMessage: () => {},
          abortController: input.abortController,
        })

        jest.spyOn(receiver, 'unsubscribe')
          .mockResolvedValue()

        const generatedThrowFunction = receiver.generateAsyncIteratorThrow()

        await expect(generatedThrowFunction(tally))
          .rejects
          .toBe(tally) // same reference

        const received = receiver.hasEnded()

        expect(received)
          .toBe(true)
      })
    })

    describe('to end the iteration even when #unsubscribe() fails', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            abortController: new AbortController(),
          },
          tally: new Error('alpha unsubscribe failed'),
        },
        {
          input: {
            channel: 'beta-channel',
            abortController: new AbortController(),
          },
          tally: new Error('beta unsubscribe failed'),
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
        const receiver = new TopicReceiver({
          channel: input.channel,
          broker: brokerMock,
          topicQueue: TopicQueue.create(),
          onMessage: () => {},
          abortController: input.abortController,
        })

        jest.spyOn(receiver, 'unsubscribe')
          .mockRejectedValue(tally)

        const generatedThrowFunction = receiver.generateAsyncIteratorThrow()

        await expect(generatedThrowFunction(new Error('thrown')))
          .rejects
          .toBe(tally) // same reference

        const received = receiver.hasEnded()

        expect(received)
          .toBe(true)
      })
    })
  })
})
