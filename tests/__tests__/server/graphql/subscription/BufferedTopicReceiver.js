import events, {
  EventEmitter,
} from 'events'

import BufferedTopicReceiver from '../../../../../lib/server/graphql/subscription/BufferedTopicReceiver.js'

import SubscriptionBroker from '../../../../../lib/server/graphql/subscription/SubscriptionBroker.js'
import TopicAsyncIterator from '../../../../../lib/server/graphql/subscription/TopicAsyncIterator.js'

describe('BufferedTopicReceiver', () => {
  describe('constructor', () => {
    describe('should keep property', () => {
      const broker = SubscriptionBroker.create({
        config: {},
      })

      const cases = [
        {
          tally: {
            channel: 'channel-0001',
            broker,
            emitter: new EventEmitter(),
            listener: () => {},
          },
        },
        {
          tally: {
            channel: 'channel-0002',
            broker,
            emitter: new EventEmitter(),
            listener: () => {},
          },
        },
      ]

      describe('#channel', () => {
        test.each(cases)('channel: $tally.channel', ({ tally }) => {
          const receiver = new BufferedTopicReceiver(tally)

          expect(receiver)
            .toHaveProperty('channel', tally.channel)
        })
      })

      describe('#broker', () => {
        test.each(cases)('channel: $tally.channel', ({ tally }) => {
          const receiver = new BufferedTopicReceiver(tally)

          expect(receiver)
            .toHaveProperty('broker', tally.broker)
        })
      })

      describe('#emitter', () => {
        test.each(cases)('channel: $tally.channel', ({ tally }) => {
          const receiver = new BufferedTopicReceiver(tally)

          expect(receiver)
            .toHaveProperty('emitter', tally.emitter)
        })
      })

      describe('#listener', () => {
        test.each(cases)('channel: $tally.channel', ({ tally }) => {
          const receiver = new BufferedTopicReceiver(tally)

          expect(receiver)
            .toHaveProperty('listener', tally.listener)
        })
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('.create()', () => {
    const broker = SubscriptionBroker.create({
      config: {},
    })

    describe('should be an instance of own class', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
            broker,
          },
        },
        {
          input: {
            channel: 'channel-0002',
            broker,
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const received = BufferedTopicReceiver.create(input)

        expect(received)
          .toBeInstanceOf(BufferedTopicReceiver)
      })
    })

    describe('should call constructor', () => {
      const alphaEmitter = new EventEmitter()
      const betaEmitter = new EventEmitter()

      const cases = [
        {
          input: {
            channel: 'channel-0001',
            broker,
            emitter: alphaEmitter,
          },
          expected: {
            channel: 'channel-0001',
            broker,
            emitter: alphaEmitter,
            listener: expect.any(Function),
          },
        },
        {
          input: {
            channel: 'channel-0002',
            broker,
            emitter: betaEmitter,
          },
          expected: {
            channel: 'channel-0002',
            broker,
            emitter: betaEmitter,
            listener: expect.any(Function),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(BufferedTopicReceiver)

        SpyClass.create(input)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('should fill default emitter', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0003',
            broker,
          },
          expected: {
            channel: 'channel-0003',
            broker,
            emitter: expect.any(EventEmitter),
            listener: expect.any(Function),
          },
        },
        {
          input: {
            channel: 'channel-0004',
            broker,
          },
          expected: {
            channel: 'channel-0004',
            broker,
            emitter: expect.any(EventEmitter),
            listener: expect.any(Function),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(BufferedTopicReceiver)

        SpyClass.create(input)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('should generate the listener from channel and emitter', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0005',
            broker,
            emitter: new EventEmitter(),
          },
          expected: {
            channel: 'channel-0005',
          },
        },
        {
          input: {
            channel: 'channel-0006',
            broker,
            emitter: new EventEmitter(),
          },
          expected: {
            channel: 'channel-0006',
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input, expected }) => {
        const generateListenerSpy = jest.spyOn(BufferedTopicReceiver, 'generateListener')

        BufferedTopicReceiver.create(input)

        expect(generateListenerSpy)
          .toHaveBeenCalledWith({
            channel: expected.channel,
            emitter: input.emitter,
          })
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('.get:events', () => {
    describe('when called as is', () => {
      test('should be correct module', () => {
        const received = BufferedTopicReceiver.events

        expect(received)
          .toBe(events) // same reference
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('.get:EventEmitterCtor', () => {
    describe('when called as is', () => {
      test('should be correct class', () => {
        const received = BufferedTopicReceiver.EventEmitterCtor

        expect(received)
          .toBe(EventEmitter) // same reference
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('.get:TopicAsyncIteratorCtor', () => {
    describe('when called as is', () => {
      test('should be correct class', () => {
        const received = BufferedTopicReceiver.TopicAsyncIteratorCtor

        expect(received)
          .toBe(TopicAsyncIterator) // same reference
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('.createEventEmitter()', () => {
    describe('should be an instance of EventEmitter by default', () => {
      test('when called as is', () => {
        const received = BufferedTopicReceiver.createEventEmitter()

        expect(received)
          .toBeInstanceOf(EventEmitter)
      })
    })

    describe('should be an instance of EventEmitterCtor', () => {
      class AlphaEventEmitter extends EventEmitter {}

      class BetaEventEmitter extends EventEmitter {}

      const cases = [
        {
          override: {
            EventEmitterCtor: AlphaEventEmitter,
          },
          expected: AlphaEventEmitter,
        },
        {
          override: {
            EventEmitterCtor: BetaEventEmitter,
          },
          expected: BetaEventEmitter,
        },
      ]

      test.each(cases)('EventEmitterCtor: $expected.name', ({ override, expected }) => {
        jest.spyOn(BufferedTopicReceiver, 'EventEmitterCtor', 'get')
          .mockReturnValue(override.EventEmitterCtor)

        const received = BufferedTopicReceiver.createEventEmitter()

        expect(received)
          .toBeInstanceOf(expected)
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('.createTopicAsyncIterator()', () => {
    const broker = SubscriptionBroker.create({
      config: {},
    })

    describe('should be an instance of TopicAsyncIterator', () => {
      const cases = [
        {
          input: {
            receiver: BufferedTopicReceiver.create({
              channel: 'channel-0001',
              broker,
            }),
            messages: events.on(new EventEmitter(), 'message'),
            subscribeErrorPromise: Promise.resolve(null),
          },
        },
        {
          input: {
            receiver: BufferedTopicReceiver.create({
              channel: 'channel-0002',
              broker,
            }),
            messages: events.on(new EventEmitter(), 'message'),
            subscribeErrorPromise: Promise.resolve(new Error('error-0002')),
          },
        },
      ]

      test.each(cases)('channel: $input.receiver.channel', ({ input }) => {
        const received = BufferedTopicReceiver.createTopicAsyncIterator(input)

        expect(received)
          .toBeInstanceOf(TopicAsyncIterator)
      })
    })

    describe('should call TopicAsyncIterator.create()', () => {
      const cases = [
        {
          tally: {
            receiver: BufferedTopicReceiver.create({
              channel: 'channel-0003',
              broker,
            }),
            messages: events.on(new EventEmitter(), 'message'),
            subscribeErrorPromise: Promise.resolve(null),
          },
        },
        {
          tally: {
            receiver: BufferedTopicReceiver.create({
              channel: 'channel-0004',
              broker,
            }),
            messages: events.on(new EventEmitter(), 'message'),
            subscribeErrorPromise: Promise.resolve(new Error('error-0004')),
          },
        },
      ]

      test.each(cases)('channel: $tally.receiver.channel', ({ tally }) => {
        const createSpy = jest.spyOn(TopicAsyncIterator, 'create')

        BufferedTopicReceiver.createTopicAsyncIterator(tally)

        expect(createSpy)
          .toHaveBeenCalledWith(tally)
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('.generateListener()', () => {
    describe('should be an instance of Function', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
            emitter: new EventEmitter(),
          },
        },
        {
          input: {
            channel: 'channel-0002',
            emitter: new EventEmitter(),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const received = BufferedTopicReceiver.generateListener(input)

        expect(received)
          .toBeInstanceOf(Function)
      })
    })

    describe('should emit the parsed message', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0003',
            message: '{"text":"message-0003"}',
          },
          expected: {
            text: 'message-0003',
          },
        },
        {
          input: {
            channel: 'channel-0004',
            message: 'null',
          },
          expected: null,
        },
        {
          input: {
            channel: 'channel-0005',
            message: '{"nested":{"text":"message-0005"}}',
          },
          expected: {
            nested: {
              text: 'message-0005',
            },
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input, expected }) => {
        const emitter = new EventEmitter()
        const invokeEmitMessageSpy = jest.spyOn(BufferedTopicReceiver, 'invokeEmitMessage')

        const listener = BufferedTopicReceiver.generateListener({
          channel: input.channel,
          emitter,
        })

        listener(input.channel, input.message)

        expect(invokeEmitMessageSpy)
          .toHaveBeenCalledWith({
            emitter,
            payload: expected,
          })
        expect(invokeEmitMessageSpy)
          .toHaveBeenCalledTimes(1)
      })
    })

    describe('should skip a malformed message', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0006',
            message: '{bad',
          },
        },
        {
          input: {
            channel: 'channel-0007',
            message: 'message-0007',
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const emitter = new EventEmitter()
        const invokeEmitMessageSpy = jest.spyOn(BufferedTopicReceiver, 'invokeEmitMessage')

        const listener = BufferedTopicReceiver.generateListener({
          channel: input.channel,
          emitter,
        })

        listener(input.channel, input.message)

        expect(invokeEmitMessageSpy)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('should pass a malformed message to onMalformedMessage()', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0008',
            message: '{bad',
          },
          expected: {
            channel: 'channel-0008',
            message: '{bad',
            error: expect.any(SyntaxError),
          },
        },
        {
          input: {
            channel: 'channel-0009',
            message: 'message-0009',
          },
          expected: {
            channel: 'channel-0009',
            message: 'message-0009',
            error: expect.any(SyntaxError),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input, expected }) => {
        const emitter = new EventEmitter()
        const onMalformedMessageSpy = jest.spyOn(BufferedTopicReceiver, 'onMalformedMessage')

        const listener = BufferedTopicReceiver.generateListener({
          channel: input.channel,
          emitter,
        })

        listener(input.channel, input.message)

        expect(onMalformedMessageSpy)
          .toHaveBeenCalledWith(expected)
        expect(onMalformedMessageSpy)
          .toHaveBeenCalledTimes(1)
      })
    })

    describe('should propagate an error thrown by a listener of the emitter', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0010',
            message: '{"text":"message-0010"}',
          },
          tally: new Error('listener-error-0010'),
        },
        {
          input: {
            channel: 'channel-0011',
            message: '{"text":"message-0011"}',
          },
          tally: new Error('listener-error-0011'),
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input, tally }) => {
        const emitter = new EventEmitter()
        emitter.on('message', () => {
          throw tally
        })
        const onMalformedMessageSpy = jest.spyOn(BufferedTopicReceiver, 'onMalformedMessage')

        const listener = BufferedTopicReceiver.generateListener({
          channel: input.channel,
          emitter,
        })

        expect(() => listener(input.channel, input.message))
          .toThrow(tally)
        expect(onMalformedMessageSpy)
          .not
          .toHaveBeenCalled()
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('.parseMessage()', () => {
    describe('with valid values', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
            message: '{"id":100001}',
          },
          expected: {
            id: 100001,
          },
        },
        {
          input: {
            channel: 'channel-0002',
            message: 'null',
          },
          expected: null,
        },
        {
          input: {
            channel: 'channel-0003',
            message: '"text-0003"',
          },
          expected: 'text-0003',
        },
        {
          input: {
            channel: 'channel-0004',
            message: '100004',
          },
          expected: 100004,
        },
      ]

      describe('should return the parsed payload', () => {
        test.each(cases)('message: $input.message', ({ input, expected }) => {
          const received = BufferedTopicReceiver.parseMessage(input)

          expect(received)
            .toEqual(expected)
        })
      })

      describe('should not call onMalformedMessage()', () => {
        test.each(cases)('message: $input.message', ({ input }) => {
          const onMalformedMessageSpy = jest.spyOn(BufferedTopicReceiver, 'onMalformedMessage')

          BufferedTopicReceiver.parseMessage(input)

          expect(onMalformedMessageSpy)
            .not
            .toHaveBeenCalled()
        })
      })
    })

    describe('with invalid values', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0005',
            message: '{bad',
          },
          expected: {
            channel: 'channel-0005',
            message: '{bad',
            error: expect.any(SyntaxError),
          },
        },
        {
          input: {
            channel: 'channel-0006',
            message: 'message-0006',
          },
          expected: {
            channel: 'channel-0006',
            message: 'message-0006',
            error: expect.any(SyntaxError),
          },
        },
      ]

      describe('should call onMalformedMessage()', () => {
        test.each(cases)('message: $input.message', ({ input, expected }) => {
          const onMalformedMessageSpy = jest.spyOn(BufferedTopicReceiver, 'onMalformedMessage')

          BufferedTopicReceiver.parseMessage(input)

          expect(onMalformedMessageSpy)
            .toHaveBeenCalledWith(expected)
          expect(onMalformedMessageSpy)
            .toHaveBeenCalledTimes(1)
        })
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('.onMalformedMessage()', () => {
    describe('should return nothing', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
            message: '{bad',
            error: new SyntaxError('error-0001'),
          },
        },
        {
          input: {
            channel: 'channel-0002',
            message: 'message-0002',
            error: new SyntaxError('error-0002'),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const received = BufferedTopicReceiver.onMalformedMessage(input)

        expect(received)
          .toBeUndefined()
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('.invokeEmitMessage()', () => {
    describe('should call emit() of the emitter', () => {
      const cases = [
        {
          input: {
            payload: {
              text: 'message-0001',
            },
          },
          expected: [
            'message',
            {
              text: 'message-0001',
            },
          ],
        },
        {
          input: {
            payload: null,
          },
          expected: [
            'message',
            null,
          ],
        },
      ]

      test.each(cases)('payload: $input.payload', ({ input, expected }) => {
        const emitter = new EventEmitter()
        const emitSpy = jest.spyOn(emitter, 'emit')
        const args = {
          emitter,
          payload: input.payload,
        }

        BufferedTopicReceiver.invokeEmitMessage(args)

        expect(emitSpy)
          .toHaveBeenCalledWith(...expected)
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('#get:Ctor', () => {
    class AlphaBufferedTopicReceiver extends BufferedTopicReceiver {}

    class BetaBufferedTopicReceiver extends BufferedTopicReceiver {}

    describe('should be constructor of instance', () => {
      const broker = SubscriptionBroker.create({
        config: {},
      })

      const cases = [
        {
          input: {
            Receiver: BufferedTopicReceiver,
          },
          expected: BufferedTopicReceiver,
        },
        {
          input: {
            Receiver: AlphaBufferedTopicReceiver,
          },
          expected: AlphaBufferedTopicReceiver,
        },
        {
          input: {
            Receiver: BetaBufferedTopicReceiver,
          },
          expected: BetaBufferedTopicReceiver,
        },
      ]

      test.each(cases)('Receiver: $input.Receiver.name', ({ input, expected }) => {
        const args = {
          channel: 'channel-0001',
          broker,
        }
        const receiver = input.Receiver.create(args)

        const received = receiver.Ctor

        expect(received)
          .toBe(expected) // same reference
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('#generateAsyncIterable()', () => {
    describe('should be an instance of TopicAsyncIterator', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
          },
        },
        {
          input: {
            channel: 'channel-0002',
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        const receiver = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })

        const received = receiver.generateAsyncIterable()
        await received.return()

        expect(received)
          .toBeInstanceOf(TopicAsyncIterator)
      })
    })

    describe('should create the iterator from receiver, messages and subscribe result', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0003',
          },
          override: {
            messages: events.on(new EventEmitter(), 'message'),
          },
        },
        {
          input: {
            channel: 'channel-0004',
          },
          override: {
            messages: events.on(new EventEmitter(), 'message'),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input, override }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        const receiver = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
        jest.spyOn(receiver, 'generateMessageIterator')
          .mockReturnValue(override.messages)
        jest.spyOn(receiver, 'captureSubscribeError')
          .mockResolvedValue(null)
        const createTopicAsyncIteratorSpy = jest.spyOn(BufferedTopicReceiver, 'createTopicAsyncIterator')

        const expected = {
          receiver,
          messages: override.messages,
          subscribeErrorPromise: expect.any(Promise),
        }

        receiver.generateAsyncIterable()

        expect(createTopicAsyncIteratorSpy)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('should keep a message published before the first next()', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0005',
            message: {
              text: 'message-0005',
            },
          },
          expected: {
            value: {
              text: 'message-0005',
            },
            done: false,
          },
        },
        {
          input: {
            channel: 'channel-0006',
            message: {
              text: 'message-0006',
            },
          },
          expected: {
            value: {
              text: 'message-0006',
            },
            done: false,
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, expected }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        const iterator = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
          .generateAsyncIterable()

        await broker.publish(input)

        const received = await iterator.next()
        await iterator.return()

        expect(received)
          .toEqual(expected)
      })
    })

    describe('should skip a malformed raw message', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0007',
            rawMessage: '{bad',
            message: {
              text: 'message-0007',
            },
          },
          expected: {
            value: {
              text: 'message-0007',
            },
            done: false,
          },
        },
        {
          input: {
            channel: 'channel-0008',
            rawMessage: 'message-0008',
            message: {
              text: 'message-0008',
            },
          },
          expected: {
            value: {
              text: 'message-0008',
            },
            done: false,
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, expected }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        const iterator = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
          .generateAsyncIterable()

        broker.pubSub.eventMap
          .get(input.channel)
          .listener(input.channel, input.rawMessage)
        await broker.publish({
          channel: input.channel,
          message: input.message,
        })

        const received = await iterator.next()
        await iterator.return()

        expect(received)
          .toEqual(expected)
      })
    })

    describe('should pass a malformed raw message to onMalformedMessage()', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0009',
            rawMessage: '{bad',
          },
          expected: {
            channel: 'channel-0009',
            message: '{bad',
            error: expect.any(SyntaxError),
          },
        },
        {
          input: {
            channel: 'channel-0010',
            rawMessage: 'message-0010',
          },
          expected: {
            channel: 'channel-0010',
            message: 'message-0010',
            error: expect.any(SyntaxError),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, expected }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        const iterator = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
          .generateAsyncIterable()
        const onMalformedMessageSpy = jest.spyOn(BufferedTopicReceiver, 'onMalformedMessage')

        broker.pubSub.eventMap
          .get(input.channel)
          .listener(input.channel, input.rawMessage)
        await iterator.return()

        expect(onMalformedMessageSpy)
          .toHaveBeenCalledWith(expected)
        expect(onMalformedMessageSpy)
          .toHaveBeenCalledTimes(1)
      })
    })

    describe('should deliver a raw falsy JSON message as its value', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0011',
            rawMessage: 'null',
          },
          expected: {
            value: null,
            done: false,
          },
        },
        {
          input: {
            channel: 'channel-0012',
            rawMessage: '0',
          },
          expected: {
            value: 0,
            done: false,
          },
        },
        {
          input: {
            channel: 'channel-0013',
            rawMessage: 'false',
          },
          expected: {
            value: false,
            done: false,
          },
        },
      ]

      test.each(cases)('rawMessage: $input.rawMessage', async ({ input, expected }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        const iterator = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
          .generateAsyncIterable()

        broker.pubSub.eventMap
          .get(input.channel)
          .listener(input.channel, input.rawMessage)

        const received = await iterator.next()
        await iterator.return()

        expect(received)
          .toEqual(expected)
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('#generateMessageIterator()', () => {
    const broker = SubscriptionBroker.create({
      config: {},
    })

    describe('should resolve a message the emitter emits while waiting', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
            payload: {
              text: 'message-0001',
            },
          },
          expected: {
            value: [
              {
                text: 'message-0001',
              },
            ],
            done: false,
          },
        },
        {
          input: {
            channel: 'channel-0002',
            payload: {
              text: 'message-0002',
            },
          },
          expected: {
            value: [
              {
                text: 'message-0002',
              },
            ],
            done: false,
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, expected }) => {
        const emitter = new EventEmitter()
        const receiver = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
          emitter,
        })
        const iterator = receiver.generateMessageIterator()

        const pending = iterator.next()
        emitter.emit('message', input.payload)

        const received = await pending
        await iterator.return()

        expect(received)
          .toEqual(expected)
      })
    })

    describe('should buffer messages the emitter emits before reading', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0003',
            alphaPayload: {
              text: 'message-0003',
            },
            betaPayload: {
              text: 'message-0004',
            },
          },
          expected: [
            {
              value: [
                {
                  text: 'message-0003',
                },
              ],
              done: false,
            },
            {
              value: [
                {
                  text: 'message-0004',
                },
              ],
              done: false,
            },
          ],
        },
        {
          input: {
            channel: 'channel-0004',
            alphaPayload: {
              text: 'message-0005',
            },
            betaPayload: {
              text: 'message-0006',
            },
          },
          expected: [
            {
              value: [
                {
                  text: 'message-0005',
                },
              ],
              done: false,
            },
            {
              value: [
                {
                  text: 'message-0006',
                },
              ],
              done: false,
            },
          ],
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, expected }) => {
        const emitter = new EventEmitter()
        const receiver = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
          emitter,
        })
        const iterator = receiver.generateMessageIterator()

        emitter.emit('message', input.alphaPayload)
        emitter.emit('message', input.betaPayload)

        const received = await Promise.all([
          iterator.next(),
          iterator.next(),
        ])
        await iterator.return()

        expect(received)
          .toEqual(expected)
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('#captureSubscribeError()', () => {
    describe('when subscribing succeeded', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
          },
        },
        {
          input: {
            channel: 'channel-0002',
          },
        },
      ]

      describe('should resolve null', () => {
        test.each(cases)('channel: $input.channel', async ({ input }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          const receiver = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })

          const received = await receiver.captureSubscribeError()

          expect(received)
            .toBeNull()
        })
      })

      describe('should not release the topic', () => {
        test.each(cases)('channel: $input.channel', async ({ input }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          const receiver = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })
          const releaseTopicSpy = jest.spyOn(receiver, 'releaseTopic')

          await receiver.captureSubscribeError()

          expect(releaseTopicSpy)
            .not
            .toHaveBeenCalled()
        })
      })
    })

    describe('when subscribing failed', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0003',
          },
          tally: new Error('subscribe-error-0003'),
        },
        {
          input: {
            channel: 'channel-0004',
          },
          tally: new Error('subscribe-error-0004'),
        },
      ]

      describe('should resolve the error', () => {
        test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          jest.spyOn(broker.pubSub, 'setupBroadcasterOnSubscribe')
            .mockRejectedValue(tally)
          const receiver = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })

          const received = await receiver.captureSubscribeError()

          expect(received)
            .toBe(tally) // same reference
        })
      })

      describe('should release the topic', () => {
        test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          jest.spyOn(broker.pubSub, 'setupBroadcasterOnSubscribe')
            .mockRejectedValue(tally)
          const receiver = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })
          const releaseTopicSpy = jest.spyOn(receiver, 'releaseTopic')

          await receiver.captureSubscribeError()

          expect(releaseTopicSpy)
            .toHaveBeenCalledWith()
          expect(releaseTopicSpy)
            .toHaveBeenCalledTimes(1)
        })
      })

      describe('should leave no hub', () => {
        test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          jest.spyOn(broker.pubSub, 'setupBroadcasterOnSubscribe')
            .mockRejectedValue(tally)
          const receiver = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })

          await receiver.captureSubscribeError()
          const received = broker.pubSub.eventMap

          expect(received)
            .toHaveProperty('size', 0)
        })
      })
    })

    describe('when subscribing and unsubscribing both failed', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0005',
          },
          tally: {
            subscribeError: new Error('subscribe-error-0005'),
            releaseError: new Error('release-error-0005'),
          },
        },
        {
          input: {
            channel: 'channel-0006',
          },
          tally: {
            subscribeError: new Error('subscribe-error-0006'),
            releaseError: new Error('release-error-0006'),
          },
        },
      ]

      describe('should resolve the original error', () => {
        test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          jest.spyOn(broker.pubSub, 'setupBroadcasterOnSubscribe')
            .mockRejectedValue(tally.subscribeError)
          jest.spyOn(broker.pubSub, 'unsubscribe')
            .mockRejectedValue(tally.releaseError)
          const receiver = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })

          const received = await receiver.captureSubscribeError()

          expect(received)
            .toBe(tally.subscribeError) // same reference
        })
      })

      describe('should hand the release error to onReleaseError()', () => {
        test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          jest.spyOn(broker.pubSub, 'setupBroadcasterOnSubscribe')
            .mockRejectedValue(tally.subscribeError)
          jest.spyOn(broker.pubSub, 'unsubscribe')
            .mockRejectedValue(tally.releaseError)
          const receiver = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })
          const onReleaseErrorSpy = jest.spyOn(receiver, 'onReleaseError')

          await receiver.captureSubscribeError()

          expect(onReleaseErrorSpy)
            .toHaveBeenCalledWith({
              error: tally.releaseError,
            })
          expect(onReleaseErrorSpy)
            .toHaveBeenCalledTimes(1)
        })
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('#releaseTopic()', () => {
    describe('should call invokeUnsubscribe()', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
          },
        },
        {
          input: {
            channel: 'channel-0002',
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        const receiver = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
        const invokeUnsubscribeSpy = jest.spyOn(receiver, 'invokeUnsubscribe')

        await receiver.releaseTopic()

        expect(invokeUnsubscribeSpy)
          .toHaveBeenCalledWith()
        expect(invokeUnsubscribeSpy)
          .toHaveBeenCalledTimes(1)
      })
    })

    describe('when unsubscribing succeeded', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0003',
          },
        },
        {
          input: {
            channel: 'channel-0004',
          },
        },
      ]

      describe('should not call onReleaseError()', () => {
        test.each(cases)('channel: $input.channel', async ({ input }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          const receiver = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })
          const onReleaseErrorSpy = jest.spyOn(receiver, 'onReleaseError')

          await receiver.releaseTopic()

          expect(onReleaseErrorSpy)
            .not
            .toHaveBeenCalled()
        })
      })
    })

    describe('when unsubscribing failed', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0005',
          },
          tally: new Error('release-error-0005'),
        },
        {
          input: {
            channel: 'channel-0006',
          },
          tally: new Error('release-error-0006'),
        },
      ]

      describe('should hand the error to onReleaseError()', () => {
        test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          jest.spyOn(broker, 'unsubscribe')
            .mockRejectedValue(tally)
          const receiver = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })
          const onReleaseErrorSpy = jest.spyOn(receiver, 'onReleaseError')

          await receiver.releaseTopic()

          expect(onReleaseErrorSpy)
            .toHaveBeenCalledWith({
              error: tally,
            })
          expect(onReleaseErrorSpy)
            .toHaveBeenCalledTimes(1)
        })
      })

      describe('should resolve without rethrowing', () => {
        test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          jest.spyOn(broker, 'unsubscribe')
            .mockRejectedValue(tally)
          const receiver = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })

          const received = receiver.releaseTopic()

          await expect(received)
            .resolves
            .toBeUndefined()
        })
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('#onReleaseError()', () => {
    describe('should return nothing', () => {
      const broker = SubscriptionBroker.create({
        config: {},
      })

      const cases = [
        {
          input: {
            error: new Error('release-error-0001'),
          },
        },
        {
          input: {
            error: new Error('release-error-0002'),
          },
        },
      ]

      test.each(cases)('error: $input.error', ({ input }) => {
        const receiver = BufferedTopicReceiver.create({
          channel: 'channel-0001',
          broker,
        })

        const received = receiver.onReleaseError(input)

        expect(received)
          .toBeUndefined()
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('#invokeSubscribe()', () => {
    describe('should call subscribe() of the broker', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
          },
        },
        {
          input: {
            channel: 'channel-0002',
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        const subscribeSpy = jest.spyOn(broker, 'subscribe')
        const receiver = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })

        const expected = {
          channel: input.channel,
          receiver,
        }

        await receiver.invokeSubscribe()

        expect(subscribeSpy)
          .toHaveBeenCalledWith(expected)
        expect(subscribeSpy)
          .toHaveBeenCalledTimes(1)
      })
    })

    describe('should reject with the error of the broker', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0003',
          },
          tally: new Error('subscribe-error-0003'),
        },
        {
          input: {
            channel: 'channel-0004',
          },
          tally: new Error('subscribe-error-0004'),
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        jest.spyOn(broker, 'subscribe')
          .mockRejectedValue(tally)
        const receiver = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })

        const received = receiver.invokeSubscribe()

        await expect(received)
          .rejects
          .toBe(tally)
      })
    })
  })
})

describe('BufferedTopicReceiver', () => {
  describe('#invokeUnsubscribe()', () => {
    describe('should call unsubscribe() of the broker', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
          },
        },
        {
          input: {
            channel: 'channel-0002',
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        const unsubscribeSpy = jest.spyOn(broker, 'unsubscribe')
        const receiver = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })

        const expected = {
          channel: input.channel,
          receiver,
        }

        await receiver.invokeUnsubscribe()

        expect(unsubscribeSpy)
          .toHaveBeenCalledWith(expected)
        expect(unsubscribeSpy)
          .toHaveBeenCalledTimes(1)
      })
    })

    describe('should reject with the error of the broker', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0003',
          },
          tally: new Error('release-error-0003'),
        },
        {
          input: {
            channel: 'channel-0004',
          },
          tally: new Error('release-error-0004'),
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        jest.spyOn(broker, 'unsubscribe')
          .mockRejectedValue(tally)
        const receiver = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })

        const received = receiver.invokeUnsubscribe()

        await expect(received)
          .rejects
          .toBe(tally)
      })
    })
  })
})
