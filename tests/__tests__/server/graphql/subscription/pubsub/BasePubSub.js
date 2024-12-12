import BasePubSub from '../../../../../../lib/server/graphql/subscription/pubsub/BasePubSub.js'

import EventHub from '../../../../../../lib/server/graphql/subscription/pubsub/tools/EventHub.js'
import SubscriptionBroker from '../../../../../../lib/server/graphql/subscription/SubscriptionBroker.js'
import TopicReceiver from '../../../../../../lib/server/graphql/subscription/TopicReceiver.js'

describe('BasePubSub', () => {
  describe('constructor', () => {
    describe('to setup properties', () => {
      test('without no arguments', () => {
        const basePubSub = new BasePubSub()

        const actual = basePubSub.eventMap

        expect(actual)
          .toBeInstanceOf(Map)
        expect(actual.size)
          .toBe(0)
      })
    })
  })
})

describe('BasePubSub', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      test('without no arguments', () => {
        const basePubSub = BasePubSub.create()

        expect(basePubSub)
          .toBeInstanceOf(BasePubSub)
      })
    })

    describe('to call constructor', () => {
      test('without no arguments', () => {
        const SpyClass = globalThis.constructorSpy.spyOn(BasePubSub)

        SpyClass.create()

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('BasePubSub', () => {
  describe('#publish()', () => {
    describe('to throw error', () => {
      const pubSub = new BasePubSub()

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            message: {
              value: 1001,
            },
          },
        },
        {
          params: {
            channel: 'beta-channel',
            message: {
              value: 1002,
            },
          },
        },
      ]

      test.each(cases)('channel: $params.channel', async ({ params }) => {
        await expect(pubSub.publish(params))
          .rejects
          .toThrow('concrete-member-not-found {"memberName":"BasePubSub#publish()"}')
      })
    })
  })
})

describe('BasePubSub', () => {
  describe('#subscribe()', () => {
    describe('to call members', () => {
      const brokerMock = SubscriptionBroker.create(/** @type {*} */ ({
        config: {
          redisOptions: null,
        },
      }))

      describe('when channel has set in #eventMap', () => {
        const pubSub = new BasePubSub()

        const alphaEventHub = EventHub.create({
          channel: 'alpha-channel',
        })
        const betaEventHub = EventHub.create({
          channel: 'beta-channel',
        })

        pubSub.eventMap
          .set('alpha-channel', alphaEventHub)
          .set('beta-channel', betaEventHub)

        const cases = [
          {
            params: {
              channel: 'alpha-channel',
              receiver: TopicReceiver.create({
                channel: 'alpha-channel',
                broker: brokerMock,
              }),
              eventHub: alphaEventHub,
            },
          },
          {
            params: {
              channel: 'beta-channel',
              receiver: TopicReceiver.create({
                channel: 'beta-channel',
                broker: brokerMock,
              }),
              eventHub: betaEventHub,
            },
          },
        ]

        test.each(cases)('channel: $params.channel', async ({ params }) => {
          const argsExpected = {
            listener: params.receiver.listener,
          }

          const createEventHubSpy = jest.spyOn(pubSub, 'createEventHub')
          const addListenerSpy = jest.spyOn(params.eventHub, 'addListener')
          const setupBroadcasterOnSubscribeSpy = jest.spyOn(pubSub, 'setupBroadcasterOnSubscribe')

          const args = {
            channel: params.channel,
            receiver: params.receiver,
          }

          await pubSub.subscribe(args)

          expect(createEventHubSpy)
            .not
            .toHaveBeenCalled()
          expect(addListenerSpy)
            .toHaveBeenCalledWith(argsExpected)
          expect(setupBroadcasterOnSubscribeSpy)
            .not
            .toHaveBeenCalled()
        })
      })

      describe('when channel has not set in #eventMap', () => {
        const pubSub = new BasePubSub()

        const alphaEventHub = EventHub.create({
          channel: 'alpha-channel',
        })
        const betaEventHub = EventHub.create({
          channel: 'beta-channel',
        })

        const cases = [
          {
            params: {
              channel: 'alpha-channel',
              receiver: TopicReceiver.create({
                channel: 'alpha-channel',
                broker: brokerMock,
              }),
              eventHub: alphaEventHub,
            },
          },
          {
            params: {
              channel: 'beta-channel',
              receiver: TopicReceiver.create({
                channel: 'beta-channel',
                broker: brokerMock,
              }),
              eventHub: betaEventHub,
            },
          },
        ]

        test.each(cases)('channel: $params.channel', async ({ params }) => {
          const createEventHubArgsExpected = {
            channel: params.channel,
          }
          const addListenerArgsExpected = {
            listener: params.receiver.listener,
          }
          const setupBroadcasterOnSubscribeArgsExpected = {
            eventHub: params.eventHub,
          }

          const createEventHubSpy = jest.spyOn(pubSub, 'createEventHub')
            .mockReturnValue(params.eventHub)
          const addListenerSpy = jest.spyOn(params.eventHub, 'addListener')
          const setupBroadcasterOnSubscribeSpay = jest.spyOn(pubSub, 'setupBroadcasterOnSubscribe')
            .mockImplementation(async () => {})

          const args = {
            channel: params.channel,
            receiver: params.receiver,
          }

          await pubSub.subscribe(args)

          expect(createEventHubSpy)
            .toHaveBeenCalledWith(createEventHubArgsExpected)
          expect(addListenerSpy)
            .toHaveBeenCalledWith(addListenerArgsExpected)
          expect(setupBroadcasterOnSubscribeSpay)
            .toHaveBeenCalledWith(setupBroadcasterOnSubscribeArgsExpected)
        })
      })
    })
  })
})

describe('BasePubSub', () => {
  describe('#setupBroadcasterOnSubscribe()', () => {
    describe('to throw error', () => {
      const pubSub = new BasePubSub()

      const cases = [
        {
          params: {
            eventHub: EventHub.create({
              channel: 'alpha-channel',
            }),
          },
        },
        {
          params: {
            eventHub: EventHub.create({
              channel: 'alpha-channel',
            }),
          },
        },
      ]

      test.each(cases)('channel: $params.eventHub.channel', async ({ params }) => {
        await expect(pubSub.setupBroadcasterOnSubscribe(params))
          .rejects
          .toThrow('concrete-member-not-found {"memberName":"BasePubSub#setupBroadcasterOnSubscribe()"}')
      })
    })
  })
})

describe('BasePubSub', () => {
  describe('#unsubscribe()', () => {
    describe('to call members', () => {
      const brokerMock = SubscriptionBroker.create(/** @type {*} */ ({
        config: {
          redisOptions: null,
        },
      }))

      describe('when channel has set in #eventMap', () => {
        const alphaReceiver = TopicReceiver.create({
          channel: 'alpha-channel',
          broker: brokerMock,
        })
        const betaReceiver = TopicReceiver.create({
          channel: 'beta-channel',
          broker: brokerMock,
        })
        const extraReceiver = TopicReceiver.create({
          channel: 'extra-channel',
          broker: brokerMock,
        })

        describe('with remained eventHub in #eventMap', () => {
          const pubSub = new BasePubSub()

          const alphaEventHub = EventHub.create({
            channel: 'alpha-channel',
          })
            .addListener({
              listener: alphaReceiver.listener,
            })
            .addListener({
              listener: extraReceiver.listener,
            })

          const betaEventHub = EventHub.create({
            channel: 'beta-channel',
          })
            .addListener({
              listener: betaReceiver.listener,
            })
            .addListener({
              listener: extraReceiver.listener,
            })

          pubSub.eventMap
            .set('alpha-channel', alphaEventHub)
            .set('beta-channel', betaEventHub)

          const cases = [
            {
              params: {
                channel: 'alpha-channel',
                receiver: alphaReceiver,
                eventHub: alphaEventHub,
              },
            },
            {
              params: {
                channel: 'beta-channel',
                receiver: betaReceiver,
                eventHub: betaEventHub,
              },
            },
          ]

          test.each(cases)('channel: $params.channel', async ({ params }) => {
            const argsExpected = {
              listener: params.receiver.listener,
            }

            const removeListenerSpy = jest.spyOn(params.eventHub, 'removeListener')
            const existsListenerSpy = jest.spyOn(params.eventHub, 'existsListener')
            const teardownBroadcasterOnUnsubscribeSpy = jest.spyOn(pubSub, 'teardownBroadcasterOnUnsubscribe')

            const args = {
              channel: params.channel,
              receiver: params.receiver,
            }

            await pubSub.unsubscribe(args)

            expect(removeListenerSpy)
              .toHaveBeenCalledWith(argsExpected)
            expect(existsListenerSpy)
              .toHaveBeenCalledWith()
            expect(teardownBroadcasterOnUnsubscribeSpy)
              .not
              .toHaveBeenCalled()
          })
        })

        describe('with no remained eventHub in #eventMap', () => {
          const pubSub = new BasePubSub()

          const alphaEventHub = EventHub.create({
            channel: 'alpha-channel',
          })
            .addListener({
              listener: alphaReceiver.listener,
            })
          const betaEventHub = EventHub.create({
            channel: 'beta-channel',
          })
            .addListener({
              listener: betaReceiver.listener,
            })

          pubSub.eventMap
            .set('alpha-channel', alphaEventHub)
            .set('beta-channel', betaEventHub)

          const cases = [
            {
              params: {
                channel: 'alpha-channel',
                receiver: alphaReceiver,
                eventHub: alphaEventHub,
              },
            },
            {
              params: {
                channel: 'beta-channel',
                receiver: betaReceiver,
                eventHub: betaEventHub,
              },
            },
          ]

          test.each(cases)('channel: $params.channel', async ({ params }) => {
            const removeListenerSpyArgsExpected = {
              listener: params.receiver.listener,
            }
            const teardownBroadcasterOnUnsubscribeSpyArgsExpected = {
              eventHub: params.eventHub,
            }

            const removeListenerSpy = jest.spyOn(params.eventHub, 'removeListener')
            const existsListenerSpy = jest.spyOn(params.eventHub, 'existsListener')
            const teardownBroadcasterOnUnsubscribeSpy = jest.spyOn(pubSub, 'teardownBroadcasterOnUnsubscribe')
              .mockImplementation(async () => {})

            const args = {
              channel: params.channel,
              receiver: params.receiver,
            }

            await pubSub.unsubscribe(args)

            expect(removeListenerSpy)
              .toHaveBeenCalledWith(removeListenerSpyArgsExpected)
            expect(existsListenerSpy)
              .toHaveBeenCalledWith()
            expect(teardownBroadcasterOnUnsubscribeSpy)
              .toHaveBeenCalledWith(teardownBroadcasterOnUnsubscribeSpyArgsExpected)
          })
        })
      })

      describe('when channel has not set in #eventMap', () => {
        const pubSub = new BasePubSub()

        const cases = [
          {
            params: {
              channel: 'alpha-channel',
              receiver: TopicReceiver.create({
                channel: 'alpha-channel',
                broker: brokerMock,
              }),
            },
          },
          {
            params: {
              channel: 'beta-channel',
              receiver: TopicReceiver.create({
                channel: 'beta-channel',
                broker: brokerMock,
              }),
            },
          },
        ]

        test.each(cases)('channel: $params.channel', async ({ params }) => {
          const getSpy = jest.spyOn(pubSub.eventMap, 'get')
          const teardownBroadcasterOnUnsubscribeSpy = jest.spyOn(pubSub, 'teardownBroadcasterOnUnsubscribe')

          const args = {
            channel: params.channel,
            receiver: params.receiver,
          }

          await pubSub.unsubscribe(args)

          expect(getSpy)
            .not
            .toHaveBeenCalled()
          expect(teardownBroadcasterOnUnsubscribeSpy)
            .not
            .toHaveBeenCalled()
        })
      })
    })
  })
})

describe('BasePubSub', () => {
  describe('#teardownBroadcasterOnUnsubscribe()', () => {
    describe('to throw error', () => {
      const pubSub = new BasePubSub()

      const cases = [
        {
          params: {
            eventHub: EventHub.create({
              channel: 'alpha-channel',
            }),
          },
        },
        {
          params: {
            eventHub: EventHub.create({
              channel: 'alpha-channel',
            }),
          },
        },
      ]

      test.each(cases)('channel: $params.eventHub.channel', async ({ params }) => {
        await expect(pubSub.teardownBroadcasterOnUnsubscribe(params))
          .rejects
          .toThrow('concrete-member-not-found {"memberName":"BasePubSub#teardownBroadcasterOnUnsubscribe()"}')
      })
    })
  })
})

describe('BasePubSub', () => {
  describe('#createEventHub()', () => {
    describe('to be instance of EventHub', () => {
      const pubSub = new BasePubSub()

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
          },
        },
        {
          params: {
            channel: 'beta-channel',
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const actual = pubSub.createEventHub(params)

        expect(actual)
          .toBeInstanceOf(EventHub)
        expect(actual)
          .toHaveProperty('channel', params.channel)
      })
    })
  })
})
