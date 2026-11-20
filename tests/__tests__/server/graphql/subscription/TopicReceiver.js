import {
  setTimeout as delay,
} from 'node:timers/promises'

import TopicReceiver from '../../../../../lib/server/graphql/subscription/TopicReceiver.js'

import TopicQueue from '../../../../../lib/server/graphql/subscription/TopicQueue.js'
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

      describe('#broker', () => {
        test.each(cases)('channel: $params.channel', ({ params }) => {
          const expected = null

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
            { channel: 'alpha-channel', message: '{"name":"Alice","age":11}' },
          ],
        },
        {
          input: {
            channel: 'beta-channel',
            message: '{"name":"Bob","age":22}',
          },
          expected: [
            { channel: 'beta-channel', message: '{"name":"Bob","age":22}' },
          ],
        },
        {
          input: {
            channel: 'gamma-channel',
            message: 'not a json',
          },
          expected: [
            { channel: 'gamma-channel', message: 'not a json' },
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
            { channel: 'alpha-channel', message: '{"phase":"STARTED"}' },
            { channel: 'alpha-channel', message: '{"phase":"COMPLETED"}' },
          ],
        },
        {
          input: {
            channel: 'beta-channel',
            alphaMessage: '{"phase":"ITEM","id":1}',
            betaMessage: '{"phase":"ITEM","id":2}',
          },
          expected: [
            { channel: 'beta-channel', message: '{"phase":"ITEM","id":1}' },
            { channel: 'beta-channel', message: '{"phase":"ITEM","id":2}' },
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

        expect(receiver)
          .toHaveProperty('onMessage', null)

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

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const expected = {
          [Symbol.asyncIterator]: expect.any(Function),
        }

        const receiver = new TopicReceiver(params)

        const actual = receiver.generateAsyncIterable()

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

      test.each(cases)('channel: $params.channel', ({ params }) => {
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

        const iterable = receiver.generateAsyncIterable()
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

      test.each(cases)('channel: $params.channel', ({ params }) => {
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

    describe('to be instance of Function', () => {
      test.each(cases)('channel: $params.channel', ({ params }) => {
        const receiver = new TopicReceiver(params)

        const actual = receiver.generateAsyncIteratorNext()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('for generated function', () => {
      test.each(cases)('channel: $params.channel', async ({ params }) => {
        const receiver = new TopicReceiver(params)

        const setOnMessageSpy = jest.spyOn(receiver, 'setOnMessage')
        const subscribeSpy = jest.spyOn(receiver, 'subscribe')

        const generatedNextFunction = receiver.generateAsyncIteratorNext()

        /*
          * Confirm null before calling #generateAsyncIteratorNext()
          */
        expect(receiver)
          .toHaveProperty('onMessage', null)
        expect(setOnMessageSpy)
          .not
          .toHaveBeenCalled()
        expect(subscribeSpy)
          .not
          .toHaveBeenCalled()

        /*
          * Call generated function.
          */
        const setOnMessageArgsExpected = {
          onMessage: expect.any(Function),
        }

        const valueTally = {
          alpha: Symbol('alpha'),
        }
        const resolvedTally = {
          value: valueTally,
          done: false,
        }

        /*
          * 3 seconds later, call #onMessage() with valueTally to resolve the promise.
          */
        setTimeout(
          () => receiver.onMessage(valueTally),
          2000
        )

        const actual = await generatedNextFunction()

        expect(actual)
          .toEqual(resolvedTally)

        expect(setOnMessageSpy)
          .toHaveBeenCalledWith(setOnMessageArgsExpected)
        expect(subscribeSpy)
          .toHaveBeenCalledWith()
      })
    })

    describe('to keep messages that arrive back to back', () => {
      const timeoutTally = Symbol('timeout')

      /**
       * Await the next value, or the timeout tally when no message reaches it.
       *
       * @param {() => Promise<{ value: * }>} nextFunction - Generated next function.
       * @returns {Promise<*>} - Value of the next result, or the timeout tally.
       */
      async function nextValueOrTimeout (nextFunction) {
        const timeoutController = new AbortController()
        const timeoutPromise = delay(100, timeoutTally, {
          signal: timeoutController.signal,
        })
          .catch(() => timeoutTally)
        const nextPromise = nextFunction()
          .then(result => result.value)

        return Promise.race([
          nextPromise,
          timeoutPromise,
        ])
          .finally(() => timeoutController.abort())
      }

      test.each(cases)('channel: $params.channel', async ({ params }) => {
        const receiver = new TopicReceiver(params)

        const generatedNextFunction = receiver.generateAsyncIteratorNext()

        const firstPromise = nextValueOrTimeout(generatedNextFunction)

        receiver.listener(params.channel, JSON.stringify({ phase: 'STARTED' }))
        receiver.listener(params.channel, JSON.stringify({ phase: 'ITEM' }))
        receiver.listener(params.channel, JSON.stringify({ phase: 'COMPLETED' }))

        const actual = [
          await firstPromise,
          await nextValueOrTimeout(generatedNextFunction),
          await nextValueOrTimeout(generatedNextFunction),
        ]

        expect(actual)
          .toEqual([
            { phase: 'STARTED' },
            { phase: 'ITEM' },
            { phase: 'COMPLETED' },
          ])
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#buildIterationValue()', () => {
    const brokerMock = new SubscriptionBroker({
      pubSub: LocalPubSub.create(),
    })

    describe('should take the topic at the head out as a parsed value', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            topics: [
              { channel: 'alpha-channel', message: '{"phase":"STARTED"}' },
            ],
          },
          expected: {
            value: { phase: 'STARTED' },
            topics: [],
          },
        },
        {
          input: {
            channel: 'beta-channel',
            topics: [
              { channel: 'beta-channel', message: '{"id":1}' },
              { channel: 'beta-channel', message: '{"id":2}' },
            ],
          },
          expected: {
            value: { id: 1 },
            topics: [
              { channel: 'beta-channel', message: '{"id":2}' },
            ],
          },
        },
        {
          input: {
            channel: 'gamma-channel',
            topics: [
              { channel: 'gamma-channel', message: '{"name":"Alice","age":11}' },
              { channel: 'gamma-channel', message: '{"id":2}' },
              { channel: 'gamma-channel', message: '{"id":3}' },
            ],
          },
          expected: {
            value: { name: 'Alice', age: 11 },
            topics: [
              { channel: 'gamma-channel', message: '{"id":2}' },
              { channel: 'gamma-channel', message: '{"id":3}' },
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

        const received = receiver.buildIterationValue()

        expect(received)
          .toStrictEqual(expected.value)
        expect(topicQueue)
          .toHaveProperty('topics', expected.topics)
      })
    })
  })
})

describe('TopicReceiver', () => {
  describe('#generateAsyncIteratorReturn()', () => {
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

    describe('to be instance of Function', () => {
      test.each(cases)('channel: $params.channel', ({ params }) => {
        const receiver = new TopicReceiver(params)

        const actual = receiver.generateAsyncIteratorReturn()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('for generated function', () => {
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
  })
})

describe('TopicReceiver', () => {
  describe('#generateAsyncIteratorThrow()', () => {
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

    describe('to be instance of Function', () => {
      test.each(cases)('channel: $params.channel', ({ params }) => {
        const receiver = new TopicReceiver(params)

        const actual = receiver.generateAsyncIteratorThrow()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('for generated function', () => {
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
  })
})
