import SubscriptionBroker from '../../../../../lib/server/graphql/subscription/SubscriptionBroker.js'

import BufferedTopicReceiver from '../../../../../lib/server/graphql/subscription/BufferedTopicReceiver.js'
import TopicAsyncIterator from '../../../../../lib/server/graphql/subscription/TopicAsyncIterator.js'
import TopicReceiver from '../../../../../lib/server/graphql/subscription/TopicReceiver.js'

describe('SubscriptionBroker', () => {
  describe('.get:TopicReceiverCtor', () => {
    describe('when called as is', () => {
      test('should be correct class', () => {
        const received = SubscriptionBroker.TopicReceiverCtor

        expect(received)
          .toBe(TopicReceiver) // same reference
      })
    })

    describe('when overridden', () => {
      class CustomTopicReceiver extends TopicReceiver {}

      class AlphaSubscriptionBroker extends SubscriptionBroker {
        static get TopicReceiverCtor () {
          return BufferedTopicReceiver
        }
      }

      class BetaSubscriptionBroker extends SubscriptionBroker {
        static get TopicReceiverCtor () {
          return CustomTopicReceiver
        }
      }

      const cases = [
        {
          input: {
            Broker: AlphaSubscriptionBroker,
          },
          expected: BufferedTopicReceiver,
        },
        {
          input: {
            Broker: BetaSubscriptionBroker,
          },
          expected: CustomTopicReceiver,
        },
      ]

      describe('should be the overriding class', () => {
        test.each(cases)('Broker: $input.Broker.name', ({ input, expected }) => {
          const received = input.Broker.TopicReceiverCtor

          expect(received)
            .toBe(expected) // same reference
        })
      })
    })
  })
})

describe('SubscriptionBroker', () => {
  describe('.createTopicReceiver()', () => {
    describe('when not opted in', () => {
      const broker = SubscriptionBroker.create({
        config: {},
      })

      describe('should be an instance of TopicReceiver', () => {
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
          const received = SubscriptionBroker.createTopicReceiver(input)

          expect(received)
            .toBeInstanceOf(TopicReceiver)
        })
      })

      describe('should call TopicReceiver.create()', () => {
        const cases = [
          {
            tally: {
              channel: 'channel-0003',
              broker,
            },
          },
          {
            tally: {
              channel: 'channel-0004',
              broker,
            },
          },
        ]

        test.each(cases)('channel: $tally.channel', ({ tally }) => {
          const createSpy = jest.spyOn(TopicReceiver, 'create')

          SubscriptionBroker.createTopicReceiver(tally)

          expect(createSpy)
            .toHaveBeenCalledWith(tally)
          expect(createSpy)
            .toHaveBeenCalledTimes(1)
        })
      })
    })

    describe('when opted in to BufferedTopicReceiver', () => {
      class OptedInSubscriptionBroker extends SubscriptionBroker {
        static get TopicReceiverCtor () {
          return BufferedTopicReceiver
        }
      }

      const broker = OptedInSubscriptionBroker.create({
        config: {},
      })

      describe('should be an instance of BufferedTopicReceiver', () => {
        const cases = [
          {
            input: {
              channel: 'channel-0005',
              broker,
            },
          },
          {
            input: {
              channel: 'channel-0006',
              broker,
            },
          },
        ]

        test.each(cases)('channel: $input.channel', ({ input }) => {
          const received = OptedInSubscriptionBroker.createTopicReceiver(input)

          expect(received)
            .toBeInstanceOf(BufferedTopicReceiver)
        })
      })

      describe('should call BufferedTopicReceiver.create()', () => {
        const cases = [
          {
            tally: {
              channel: 'channel-0007',
              broker,
            },
          },
          {
            tally: {
              channel: 'channel-0008',
              broker,
            },
          },
        ]

        test.each(cases)('channel: $tally.channel', ({ tally }) => {
          const createSpy = jest.spyOn(BufferedTopicReceiver, 'create')

          OptedInSubscriptionBroker.createTopicReceiver(tally)

          expect(createSpy)
            .toHaveBeenCalledWith(tally)
          expect(createSpy)
            .toHaveBeenCalledTimes(1)
        })
      })
    })
  })
})

describe('SubscriptionBroker', () => {
  describe('#get:Ctor', () => {
    class AlphaSubscriptionBroker extends SubscriptionBroker {}

    class BetaSubscriptionBroker extends SubscriptionBroker {}

    describe('should be constructor of instance', () => {
      const cases = [
        {
          input: {
            Broker: SubscriptionBroker,
          },
          expected: SubscriptionBroker,
        },
        {
          input: {
            Broker: AlphaSubscriptionBroker,
          },
          expected: AlphaSubscriptionBroker,
        },
        {
          input: {
            Broker: BetaSubscriptionBroker,
          },
          expected: BetaSubscriptionBroker,
        },
      ]

      test.each(cases)('Broker: $input.Broker.name', ({ input, expected }) => {
        const args = {
          config: {},
        }
        const broker = input.Broker.create(args)

        const received = broker.Ctor

        expect(received)
          .toBe(expected) // same reference
      })
    })
  })
})

describe('SubscriptionBroker', () => {
  describe('#generateAsyncIterable()', () => {
    describe('when opted in to BufferedTopicReceiver', () => {
      class OptedInSubscriptionBroker extends SubscriptionBroker {
        static get TopicReceiverCtor () {
          return BufferedTopicReceiver
        }
      }

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

      describe('should be an instance of TopicAsyncIterator', () => {
        test.each(cases)('channel: $input.channel', async ({ input }) => {
          const broker = OptedInSubscriptionBroker.create({
            config: {},
          })

          const received = broker.generateAsyncIterable(input)
          await received.return()

          expect(received)
            .toBeInstanceOf(TopicAsyncIterator)
        })
      })

      describe('should keep a message published before the first next()', () => {
        const messageCases = [
          {
            input: {
              channel: 'channel-0003',
              message: {
                text: 'message-0003',
              },
            },
            expected: {
              value: {
                text: 'message-0003',
              },
              done: false,
            },
          },
          {
            input: {
              channel: 'channel-0004',
              message: {
                text: 'message-0004',
              },
            },
            expected: {
              value: {
                text: 'message-0004',
              },
              done: false,
            },
          },
        ]

        test.each(messageCases)('channel: $input.channel', async ({ input, expected }) => {
          const broker = OptedInSubscriptionBroker.create({
            config: {},
          })
          const iterator = broker.generateAsyncIterable({
            channel: input.channel,
          })

          await broker.publish(input)

          const received = await iterator.next()
          await iterator.return()

          expect(received)
            .toEqual(expected)
        })
      })
    })

    describe('when not opted in', () => {
      describe('should not be an instance of TopicAsyncIterator', () => {
        const cases = [
          {
            input: {
              channel: 'channel-0005',
            },
          },
          {
            input: {
              channel: 'channel-0006',
            },
          },
        ]

        test.each(cases)('channel: $input.channel', ({ input }) => {
          const broker = SubscriptionBroker.create({
            config: {},
          })

          const received = broker.generateAsyncIterable(input)

          expect(received)
            .not
            .toBeInstanceOf(TopicAsyncIterator)
        })
      })
    })
  })
})
