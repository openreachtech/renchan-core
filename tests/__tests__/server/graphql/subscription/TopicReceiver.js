import TopicReceiver from '../../../../../lib/server/graphql/subscription/TopicReceiver.js'

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

    describe('to return instance of own class', () => {
      test.each(cases)('channel: $params.channel', ({ params }) => {
        const actual = TopicReceiver.create(params)

        expect(actual)
          .toBeInstanceOf(TopicReceiver)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('channel: $params.channel', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(TopicReceiver)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
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

    describe('to call #onMessage()', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            broker: brokerMock,
          },
          channelCases: [
            {
              input: {
                channel: 'alpha-channel',
                message: `{
                  "name": "Alice",
                  "age": 11
                }`,
              },
              expected: {
                name: 'Alice',
                age: 11,
              },
            },
          ],
        },
        {
          params: {
            channel: 'beta-channel',
            broker: brokerMock,
          },
          channelCases: [
            {
              input: {
                channel: 'beta-channel',
                message: `{
                  "name": "Bob",
                  "age": 22
                }`,
              },
              expected: {
                name: 'Bob',
                age: 22,
              },
            },
          ],
        },
        {
          params: {
            channel: 'gamma-channel',
            broker: brokerMock,
          },
          channelCases: [
            {
              input: {
                channel: 'gamma-channel',
                message: `{
                  "name": "Charlie",
                  "age": 33
                }`,
              },
              expected: {
                name: 'Charlie',
                age: 33,
              },
            },
          ],
        },
      ]

      describe.each(cases)('channel: $params.channel', ({ params, channelCases }) => {
        test.each(channelCases)('channel: $input.channel', ({ input, expected }) => {
          const onMessageSpy = jest.fn()

          const receiver = new TopicReceiver(params)
            .setOnMessage({
              onMessage: onMessageSpy,
            })

          const listener = receiver.generateListener()

          listener(
            input.channel,
            input.message
          )

          expect(onMessageSpy)
            .toHaveBeenCalledWith(expected)
        })
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
          value: undefined,
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
