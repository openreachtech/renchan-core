import events, {
  EventEmitter,
} from 'events'

import TopicAsyncIterator from '../../../../../lib/server/graphql/subscription/TopicAsyncIterator.js'

import BufferedTopicReceiver from '../../../../../lib/server/graphql/subscription/BufferedTopicReceiver.js'
import SubscriptionBroker from '../../../../../lib/server/graphql/subscription/SubscriptionBroker.js'
import TopicIteratorResult from '../../../../../lib/server/graphql/subscription/TopicIteratorResult.js'

describe('TopicAsyncIterator', () => {
  describe('constructor', () => {
    describe('should keep property', () => {
      const broker = SubscriptionBroker.create({
        config: {},
      })

      const cases = [
        {
          tally: {
            receiver: BufferedTopicReceiver.create({
              channel: 'channel-0001',
              broker,
            }),
            messages: events.on(new EventEmitter(), 'message'),
            subscribeErrorPromise: Promise.resolve(null),
            abortController: new AbortController(),
          },
        },
        {
          tally: {
            receiver: BufferedTopicReceiver.create({
              channel: 'channel-0002',
              broker,
            }),
            messages: events.on(new EventEmitter(), 'message'),
            subscribeErrorPromise: Promise.resolve(new Error('error-0002')),
            abortController: new AbortController(),
          },
        },
      ]

      describe('#receiver', () => {
        test.each(cases)('channel: $tally.receiver.channel', ({ tally }) => {
          const iterator = new TopicAsyncIterator(tally)

          expect(iterator)
            .toHaveProperty('receiver', tally.receiver)
        })
      })

      describe('#messages', () => {
        test.each(cases)('channel: $tally.receiver.channel', ({ tally }) => {
          const iterator = new TopicAsyncIterator(tally)

          expect(iterator)
            .toHaveProperty('messages', tally.messages)
        })
      })

      describe('#subscribeErrorPromise', () => {
        test.each(cases)('channel: $tally.receiver.channel', ({ tally }) => {
          const iterator = new TopicAsyncIterator(tally)

          expect(iterator)
            .toHaveProperty('subscribeErrorPromise', tally.subscribeErrorPromise)
        })
      })

      describe('#abortController', () => {
        test.each(cases)('channel: $tally.receiver.channel', ({ tally }) => {
          const iterator = new TopicAsyncIterator(tally)

          expect(iterator)
            .toHaveProperty('abortController', tally.abortController)
        })
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('.create()', () => {
    const broker = SubscriptionBroker.create({
      config: {},
    })

    describe('should be an instance of own class', () => {
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
        const received = TopicAsyncIterator.create(input)

        expect(received)
          .toBeInstanceOf(TopicAsyncIterator)
      })
    })

    describe('should call constructor', () => {
      const cases = [
        {
          tally: {
            receiver: BufferedTopicReceiver.create({
              channel: 'channel-0001',
              broker,
            }),
            messages: events.on(new EventEmitter(), 'message'),
            subscribeErrorPromise: Promise.resolve(null),
            abortController: new AbortController(),
          },
        },
        {
          tally: {
            receiver: BufferedTopicReceiver.create({
              channel: 'channel-0002',
              broker,
            }),
            messages: events.on(new EventEmitter(), 'message'),
            subscribeErrorPromise: Promise.resolve(new Error('error-0002')),
            abortController: new AbortController(),
          },
        },
      ]

      test.each(cases)('channel: $tally.receiver.channel', ({ tally }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(TopicAsyncIterator)

        SpyClass.create(tally)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(tally)
      })
    })

    describe('should fill default abortController', () => {
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
          expected: {
            abortController: expect.any(AbortController),
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
          expected: {
            abortController: expect.any(AbortController),
          },
        },
      ]

      test.each(cases)('channel: $input.receiver.channel', ({ input, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(TopicAsyncIterator)

        SpyClass.create(input)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expect.objectContaining(expected))
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('.get:AbortControllerCtor', () => {
    describe('when called as is', () => {
      test('should be correct class', () => {
        const received = TopicAsyncIterator.AbortControllerCtor

        expect(received)
          .toBe(AbortController) // same reference
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('.get:TopicIteratorResultCtor', () => {
    describe('when called as is', () => {
      test('should be correct class', () => {
        const received = TopicAsyncIterator.TopicIteratorResultCtor

        expect(received)
          .toBe(TopicIteratorResult) // same reference
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('.createAbortController()', () => {
    describe('should be an instance of AbortControllerCtor', () => {
      class AlphaAbortController extends AbortController {}

      class BetaAbortController extends AbortController {}

      const cases = [
        {
          override: {
            AbortControllerCtor: AlphaAbortController,
          },
          expected: AlphaAbortController,
        },
        {
          override: {
            AbortControllerCtor: BetaAbortController,
          },
          expected: BetaAbortController,
        },
      ]

      test.each(cases)('AbortControllerCtor: $expected.name', ({ override, expected }) => {
        jest.spyOn(TopicAsyncIterator, 'AbortControllerCtor', 'get')
          .mockReturnValue(override.AbortControllerCtor)

        const received = TopicAsyncIterator.createAbortController()

        expect(received)
          .toBeInstanceOf(expected)
      })
    })

    describe('should be an instance of AbortController by default', () => {
      test('when called as is', () => {
        const received = TopicAsyncIterator.createAbortController()

        expect(received)
          .toBeInstanceOf(AbortController)
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('.createTopicIteratorResult()', () => {
    describe('should be an instance of TopicIteratorResult', () => {
      const cases = [
        {
          input: {
            value: 'value-0001',
            done: false,
          },
        },
        {
          input: {
            value: null,
            done: true,
          },
        },
      ]

      test.each(cases)('value: $input.value, done: $input.done', ({ input }) => {
        const received = TopicAsyncIterator.createTopicIteratorResult(input)

        expect(received)
          .toBeInstanceOf(TopicIteratorResult)
      })
    })

    describe('should call TopicIteratorResult.create()', () => {
      const cases = [
        {
          tally: {
            value: 'value-0001',
            done: false,
          },
        },
        {
          tally: {
            value: {
              id: 100002,
            },
            done: false,
          },
        },
        {
          tally: {
            value: null,
            done: true,
          },
        },
      ]

      test.each(cases)('value: $tally.value, done: $tally.done', ({ tally }) => {
        const createSpy = jest.spyOn(TopicIteratorResult, 'create')

        TopicAsyncIterator.createTopicIteratorResult(tally)

        expect(createSpy)
          .toHaveBeenCalledWith(tally)
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('#get:Ctor', () => {
    class AlphaTopicAsyncIterator extends TopicAsyncIterator {}

    class BetaTopicAsyncIterator extends TopicAsyncIterator {}

    describe('should be constructor of instance', () => {
      const broker = SubscriptionBroker.create({
        config: {},
      })

      const cases = [
        {
          input: {
            Iterator: TopicAsyncIterator,
          },
          expected: TopicAsyncIterator,
        },
        {
          input: {
            Iterator: AlphaTopicAsyncIterator,
          },
          expected: AlphaTopicAsyncIterator,
        },
        {
          input: {
            Iterator: BetaTopicAsyncIterator,
          },
          expected: BetaTopicAsyncIterator,
        },
      ]

      test.each(cases)('Iterator: $input.Iterator.name', ({ input, expected }) => {
        const args = {
          receiver: BufferedTopicReceiver.create({
            channel: 'channel-0001',
            broker,
          }),
          messages: events.on(new EventEmitter(), 'message'),
          subscribeErrorPromise: Promise.resolve(null),
        }
        const iterator = input.Iterator.create(args)

        const received = iterator.Ctor

        expect(received)
          .toBe(expected) // same reference
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('#[Symbol.asyncIterator]()', () => {
    describe('should return own instance', () => {
      const broker = SubscriptionBroker.create({
        config: {},
      })

      const cases = [
        {
          tally: BufferedTopicReceiver.create({
            channel: 'channel-0001',
            broker,
          })
            .generateAsyncIterable(),
        },
        {
          tally: BufferedTopicReceiver.create({
            channel: 'channel-0002',
            broker,
          })
            .generateAsyncIterable(),
        },
      ]

      test.each(cases)('channel: $tally.receiver.channel', ({ tally }) => {
        const received = tally[Symbol.asyncIterator]()

        expect(received)
          .toBe(tally) // same reference
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('#next()', () => {
    describe('should resolve a message that arrives while waiting', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
            message: {
              text: 'message-0001',
            },
          },
          expected: {
            value: {
              text: 'message-0001',
            },
            done: false,
          },
        },
        {
          input: {
            channel: 'channel-0002',
            message: {
              text: 'message-0002',
            },
          },
          expected: {
            value: {
              text: 'message-0002',
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

        const pending = iterator.next()
        await iterator.subscribeErrorPromise
        await broker.publish(input)

        const received = await pending
        await iterator.return()

        expect(received)
          .toEqual(expected)
      })
    })

    describe('should settle concurrent calls in order', () => {
      const cases = [
        {
          input: {
            alphaPublish: {
              channel: 'channel-0001',
              message: {
                text: 'message-0001',
              },
            },
            betaPublish: {
              channel: 'channel-0001',
              message: {
                text: 'message-0002',
              },
            },
          },
          expected: [
            {
              value: {
                text: 'message-0001',
              },
              done: false,
            },
            {
              value: {
                text: 'message-0002',
              },
              done: false,
            },
          ],
        },
        {
          input: {
            alphaPublish: {
              channel: 'channel-0002',
              message: {
                text: 'message-0003',
              },
            },
            betaPublish: {
              channel: 'channel-0002',
              message: {
                text: 'message-0004',
              },
            },
          },
          expected: [
            {
              value: {
                text: 'message-0003',
              },
              done: false,
            },
            {
              value: {
                text: 'message-0004',
              },
              done: false,
            },
          ],
        },
      ]

      test.each(cases)('channel: $input.alphaPublish.channel', async ({ input, expected }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        const iterator = BufferedTopicReceiver.create({
          channel: input.alphaPublish.channel,
          broker,
        })
          .generateAsyncIterable()

        const alphaPending = iterator.next()
        const betaPending = iterator.next()
        await broker.publish(input.alphaPublish)
        await broker.publish(input.betaPublish)

        const received = await Promise.all([
          alphaPending,
          betaPending,
        ])
        await iterator.return()

        expect(received)
          .toEqual(expected)
      })
    })

    describe('should resolve done after return() while a message is buffered', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
            message: {
              text: 'message-0001',
            },
          },
          expected: {
            value: null,
            done: true,
          },
        },
        {
          input: {
            channel: 'channel-0002',
            message: {
              text: 'message-0002',
            },
          },
          expected: {
            value: null,
            done: true,
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
        await iterator.return()

        const received = await iterator.next()

        expect(received)
          .toEqual(expected)
      })
    })

    describe('when subscribing failed', () => {
      describe('should reject with the original error', () => {
        const cases = [
          {
            input: {
              channel: 'channel-0001',
            },
            tally: new Error('subscribe-error-0001'),
          },
          {
            input: {
              channel: 'channel-0002',
            },
            tally: new Error('subscribe-error-0002'),
          },
        ]

        test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          jest.spyOn(broker.pubSub, 'setupBroadcasterOnSubscribe')
            .mockRejectedValue(tally)
          const iterator = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })
            .generateAsyncIterable()

          const received = iterator.next()

          await expect(received)
            .rejects
            .toBe(tally)
        })
      })

      describe('should leave no hub', () => {
        const cases = [
          {
            input: {
              channel: 'channel-0001',
              error: new Error('subscribe-error-0001'),
            },
          },
          {
            input: {
              channel: 'channel-0002',
              error: new Error('subscribe-error-0002'),
            },
          },
        ]

        test.each(cases)('channel: $input.channel', async ({ input }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          jest.spyOn(broker.pubSub, 'setupBroadcasterOnSubscribe')
            .mockRejectedValue(input.error)
          const iterator = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })
            .generateAsyncIterable()

          await Promise.allSettled([
            iterator.next(),
          ])
          const received = broker.pubSub.eventMap

          expect(received)
            .toHaveProperty('size', 0)
        })
      })

      describe('when unsubscribing also failed', () => {
        const cases = [
          {
            input: {
              channel: 'channel-0001',
            },
            tally: {
              subscribeError: new Error('subscribe-error-0001'),
              releaseError: new Error('release-error-0001'),
            },
          },
          {
            input: {
              channel: 'channel-0002',
            },
            tally: {
              subscribeError: new Error('subscribe-error-0002'),
              releaseError: new Error('release-error-0002'),
            },
          },
        ]

        describe('should reject with the original error', () => {
          test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
            const broker = SubscriptionBroker.create({
              config: {},
            })
            jest.spyOn(broker.pubSub, 'setupBroadcasterOnSubscribe')
              .mockRejectedValue(tally.subscribeError)
            jest.spyOn(broker.pubSub, 'unsubscribe')
              .mockRejectedValue(tally.releaseError)
            const iterator = BufferedTopicReceiver.create({
              channel: input.channel,
              broker,
            })
              .generateAsyncIterable()

            const received = iterator.next()

            await expect(received)
              .rejects
              .toBe(tally.subscribeError)
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
            const iterator = receiver.generateAsyncIterable()

            await Promise.allSettled([
              iterator.next(),
            ])

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
})

describe('TopicAsyncIterator', () => {
  describe('#return()', () => {
    describe('should resolve done', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
          },
          expected: {
            value: null,
            done: true,
          },
        },
        {
          input: {
            channel: 'channel-0002',
          },
          expected: {
            value: null,
            done: true,
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

        const received = await iterator.return()

        expect(received)
          .toEqual(expected)
      })
    })

    describe('should settle a waiting next() with done', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
          },
          expected: {
            value: null,
            done: true,
          },
        },
        {
          input: {
            channel: 'channel-0002',
          },
          expected: {
            value: null,
            done: true,
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

        const received = iterator.next()
        await iterator.subscribeErrorPromise
        await iterator.return()

        await expect(received)
          .resolves
          .toEqual(expected)
      })
    })

    describe('should leave no hub', () => {
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

      describe('when called before the first next()', () => {
        test.each(cases)('channel: $input.channel', async ({ input }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          const iterator = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })
            .generateAsyncIterable()

          await iterator.return()
          const received = broker.pubSub.eventMap

          expect(received)
            .toHaveProperty('size', 0)
        })
      })

      describe('when a next() is waiting', () => {
        test.each(cases)('channel: $input.channel', async ({ input }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          const iterator = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })
            .generateAsyncIterable()

          iterator.next()
          await iterator.subscribeErrorPromise
          await iterator.return()
          const received = broker.pubSub.eventMap

          expect(received)
            .toHaveProperty('size', 0)
        })
      })
    })

    describe('when two receivers share one channel', () => {
      describe('should keep the hub for the other receiver', () => {
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
          const alphaIterator = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })
            .generateAsyncIterable()
          BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })
            .generateAsyncIterable()

          await alphaIterator.return()
          const received = broker.pubSub.eventMap

          expect(received)
            .toHaveProperty('size', 1)
        })
      })

      describe('should keep the other receiver receiving', () => {
        const cases = [
          {
            input: {
              channel: 'channel-0001',
              message: {
                text: 'message-0001',
              },
            },
            expected: {
              value: {
                text: 'message-0001',
              },
              done: false,
            },
          },
          {
            input: {
              channel: 'channel-0002',
              message: {
                text: 'message-0002',
              },
            },
            expected: {
              value: {
                text: 'message-0002',
              },
              done: false,
            },
          },
        ]

        test.each(cases)('channel: $input.channel', async ({ input, expected }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })
          const alphaIterator = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })
            .generateAsyncIterable()
          const betaIterator = BufferedTopicReceiver.create({
            channel: input.channel,
            broker,
          })
            .generateAsyncIterable()

          await alphaIterator.return()
          await broker.publish(input)

          const received = await betaIterator.next()
          await betaIterator.return()

          expect(received)
            .toEqual(expected)
        })
      })
    })

    describe('when called twice concurrently', () => {
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
        const iterator = receiver.generateAsyncIterable()

        const expected = {
          channel: input.channel,
          receiver,
        }

        await Promise.all([
          iterator.return(),
          iterator.return(),
        ])

        expect(unsubscribeSpy)
          .toHaveBeenCalledWith(expected)
        expect(unsubscribeSpy)
          .toHaveBeenCalledTimes(1)
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('#throw()', () => {
    describe('should rethrow the error', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
          },
          tally: new Error('error-0001'),
        },
        {
          input: {
            channel: 'channel-0002',
          },
          tally: new Error('error-0002'),
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input, tally }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        const iterator = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
          .generateAsyncIterable()

        const received = iterator.throw(tally)

        await expect(received)
          .rejects
          .toBe(tally)
      })
    })

    describe('should leave no hub', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
            error: new Error('error-0001'),
          },
        },
        {
          input: {
            channel: 'channel-0002',
            error: new Error('error-0002'),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        const iterator = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
          .generateAsyncIterable()

        await Promise.allSettled([
          iterator.throw(input.error),
        ])
        const received = broker.pubSub.eventMap

        expect(received)
          .toHaveProperty('size', 0)
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('#closeIterator()', () => {
    describe('should abort once', () => {
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
        const iterator = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
          .generateAsyncIterable()
        const abortSpy = jest.spyOn(iterator, 'invokeAbort')

        await iterator.closeIterator()
        await iterator.closeIterator()

        expect(abortSpy)
          .toHaveBeenCalledWith()
        expect(abortSpy)
          .toHaveBeenCalledTimes(1)
      })
    })

    describe('should not release the topic when subscribing failed', () => {
      const cases = [
        {
          input: {
            channel: 'channel-0001',
            error: new Error('subscribe-error-0001'),
          },
        },
        {
          input: {
            channel: 'channel-0002',
            error: new Error('subscribe-error-0002'),
          },
        },
      ]

      test.each(cases)('channel: $input.channel', async ({ input }) => {
        const broker = SubscriptionBroker.create({
          config: {},
        })
        jest.spyOn(broker.pubSub, 'setupBroadcasterOnSubscribe')
          .mockRejectedValue(input.error)
        const iterator = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
          .generateAsyncIterable()
        const releaseTopicSpy = jest.spyOn(iterator, 'invokeReleaseTopic')

        await iterator.closeIterator()

        expect(releaseTopicSpy)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('should release the topic when subscribing succeeded', () => {
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
        const iterator = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
          .generateAsyncIterable()
        const releaseTopicSpy = jest.spyOn(iterator, 'invokeReleaseTopic')

        await iterator.closeIterator()

        expect(releaseTopicSpy)
          .toHaveBeenCalledWith()
        expect(releaseTopicSpy)
          .toHaveBeenCalledTimes(1)
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('#isClosed()', () => {
    const broker = SubscriptionBroker.create({
      config: {},
    })

    describe('should be truthy', () => {
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

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const iterator = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
          .generateAsyncIterable()
        iterator.invokeAbort()

        const received = iterator.isClosed()

        expect(received)
          .toBeTruthy()
      })
    })

    describe('should be falsy', () => {
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

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const iterator = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
          .generateAsyncIterable()

        const received = iterator.isClosed()

        expect(received)
          .toBeFalsy()
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('#createDoneResult()', () => {
    describe('should be a result that ends iteration', () => {
      const broker = SubscriptionBroker.create({
        config: {},
      })

      const cases = [
        {
          input: {
            channel: 'channel-0001',
          },
          expected: {
            value: null,
            done: true,
          },
        },
        {
          input: {
            channel: 'channel-0002',
          },
          expected: {
            value: null,
            done: true,
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input, expected }) => {
        const iterator = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
          .generateAsyncIterable()

        const received = iterator.createDoneResult()

        expect(received)
          .toEqual(expected)
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('#createMessageResult()', () => {
    describe('should be a result that carries the payload', () => {
      const broker = SubscriptionBroker.create({
        config: {},
      })

      const cases = [
        {
          input: {
            payload: {
              text: 'message-0001',
            },
          },
          expected: {
            value: {
              text: 'message-0001',
            },
            done: false,
          },
        },
        {
          input: {
            payload: null,
          },
          expected: {
            value: null,
            done: false,
          },
        },
        {
          input: {
            payload: 'message-0003',
          },
          expected: {
            value: 'message-0003',
            done: false,
          },
        },
      ]

      test.each(cases)('payload: $input.payload', ({ input, expected }) => {
        const iterator = BufferedTopicReceiver.create({
          channel: 'channel-0001',
          broker,
        })
          .generateAsyncIterable()

        const received = iterator.createMessageResult(input)

        expect(received)
          .toEqual(expected)
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('#invokeReadMessage()', () => {
    describe('should resolve the result of messages.next()', () => {
      const broker = SubscriptionBroker.create({
        config: {},
      })

      const cases = [
        {
          tally: {
            value: [
              {
                text: 'message-0001',
              },
            ],
            done: false,
          },
        },
        {
          tally: {
            value: [
              {
                text: 'message-0002',
              },
            ],
            done: false,
          },
        },
      ]

      test.each(cases)('value: $tally.value', async ({ tally }) => {
        const iterator = BufferedTopicReceiver.create({
          channel: 'channel-0001',
          broker,
        })
          .generateAsyncIterable()
        const nextSpy = jest.spyOn(iterator.messages, 'next')
          .mockResolvedValue(tally)

        const received = await iterator.invokeReadMessage()

        expect(received)
          .toBe(tally) // same reference
        expect(nextSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('#invokeReturnMessages()', () => {
    describe('should resolve the result of messages.return()', () => {
      const broker = SubscriptionBroker.create({
        config: {},
      })

      const cases = [
        {
          tally: {
            value: [
              {
                text: 'message-0001',
              },
            ],
            done: true,
          },
        },
        {
          tally: {
            value: [
              {
                text: 'message-0002',
              },
            ],
            done: true,
          },
        },
      ]

      test.each(cases)('value: $tally.value', async ({ tally }) => {
        const iterator = BufferedTopicReceiver.create({
          channel: 'channel-0001',
          broker,
        })
          .generateAsyncIterable()
        const returnSpy = jest.spyOn(iterator.messages, 'return')
          .mockResolvedValue(tally)

        const received = await iterator.invokeReturnMessages()

        expect(received)
          .toBe(tally) // same reference
        expect(returnSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('#invokeAbort()', () => {
    describe('should call abort() of the abort controller', () => {
      const broker = SubscriptionBroker.create({
        config: {},
      })

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

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const iterator = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
          .generateAsyncIterable()
        const abortSpy = jest.spyOn(iterator.abortController, 'abort')

        iterator.invokeAbort()

        expect(abortSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('TopicAsyncIterator', () => {
  describe('#invokeReleaseTopic()', () => {
    describe('should call releaseTopic() of the receiver', () => {
      const broker = SubscriptionBroker.create({
        config: {},
      })

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
        const receiver = BufferedTopicReceiver.create({
          channel: input.channel,
          broker,
        })
        const iterator = receiver.generateAsyncIterable()
        const releaseTopicSpy = jest.spyOn(receiver, 'releaseTopic')

        await iterator.invokeReleaseTopic()

        expect(releaseTopicSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})
