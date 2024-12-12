import {
  EventEmitter,
} from 'events'

import LocalPubSub from '../../../../../../lib/server/graphql/subscription/pubsub/LocalPubSub.js'
import EventHub from '../../../../../../lib/server/graphql/subscription/pubsub/tools/EventHub.js'

describe('LocalPubSub', () => {
  describe('constructor', () => {
    describe('to setup properties', () => {
      test('without arguments', () => {
        const localPubSub = new LocalPubSub()

        expect(localPubSub)
          .toHaveProperty('subscribersEventEmitterMap', new Map())
      })
    })
  })
})

describe('LocalPubSub', () => {
  describe('#publish()', () => {
    describe('to call members', () => {
      describe('when channel has set in #subscribersEventEmitterMap', () => {
        const localPubSub = new LocalPubSub()

        const alphaEmitter = new EventEmitter()
        const betaEmitter = new EventEmitter()

        localPubSub.subscribersEventEmitterMap
          .set('alpha-channel', alphaEmitter)
          .set('beta-channel', betaEmitter)

        const cases = [
          {
            params: {
              channel: 'alpha-channel',
              message: {
                value: 'alpha value',
              },
              emitter: alphaEmitter,
            },
            expected: [
              'alpha-channel',
              'alpha-channel',
              '{"value":"alpha value"}',
            ],
          },
          {
            params: {
              channel: 'beta-channel',
              message: {
                value: 'beta value',
              },
              emitter: betaEmitter,
            },
            expected: [
              'beta-channel',
              'beta-channel',
              '{"value":"beta value"}',
            ],
          },
        ]

        test.each(cases)('channel: $params.channel', async ({ params, expected }) => {
          const emitSpy = jest.spyOn(params.emitter, 'emit')

          await localPubSub.publish(params)

          expect(emitSpy)
            .toHaveBeenCalledWith(...expected)
        })
      })

      describe('when channel has not set in #subscribersEventEmitterMap', () => {
        const localPubSub = new LocalPubSub()

        const alphaEmitter = new EventEmitter()
        const betaEmitter = new EventEmitter()

        const cases = [
          {
            params: {
              channel: 'alpha-channel',
              message: {
                value: 'alpha value',
              },
              emitter: alphaEmitter,
            },
          },
          {
            params: {
              channel: 'beta-channel',
              message: {
                value: 'beta value',
              },
              emitter: betaEmitter,
            },
          },
        ]

        test.each(cases)('channel: $params.channel', async ({ params }) => {
          const emitSpy = jest.spyOn(params.emitter, 'emit')

          await localPubSub.publish(params)

          expect(emitSpy)
            .not
            .toHaveBeenCalled()
        })
      })
    })
  })
})

describe('LocalPubSub', () => {
  describe('#setupBroadcasterOnSubscribe()', () => {
    describe('to call members', () => {
      const localPubSub = new LocalPubSub()

      const alphaEmitter = new EventEmitter()
      const betaEmitter = new EventEmitter()

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            emitter: alphaEmitter,
            eventHub: EventHub.create({
              channel: 'alpha-channel',
            }),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            emitter: betaEmitter,
            eventHub: EventHub.create({
              channel: 'beta-channel',
            }),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', async ({ params }) => {
        const emitterArgsExpected = [
          params.channel,
          params.eventHub.listener,
        ]
        const setArgsExpected = [
          params.eventHub.channel,
          params.emitter,
        ]

        const createEventEmitterSpy = jest.spyOn(localPubSub, 'createEventEmitter')
          .mockReturnValue(params.emitter)
        const onSpy = jest.spyOn(params.emitter, 'on')
        const setSpy = jest.spyOn(localPubSub.subscribersEventEmitterMap, 'set')

        const args = {
          eventHub: params.eventHub,
        }

        await localPubSub.setupBroadcasterOnSubscribe(args)

        expect(createEventEmitterSpy)
          .toHaveBeenCalledWith()
        expect(onSpy)
          .toHaveBeenCalledWith(...emitterArgsExpected)
        expect(setSpy)
          .toHaveBeenCalledWith(...setArgsExpected)
      })
    })
  })
})

describe('LocalPubSub', () => {
  describe('#teardownBroadcasterOnUnsubscribe()', () => {
    describe('to call members', () => {
      describe('when channel has set in #subscribersEventEmitterMap', () => {
        const localPubSub = new LocalPubSub()

        const alphaEmitter = new EventEmitter()
        const betaEmitter = new EventEmitter()

        localPubSub.subscribersEventEmitterMap
          .set('alpha-channel', alphaEmitter)
          .set('beta-channel', betaEmitter)

        const cases = [
          {
            params: {
              channel: 'alpha-channel',
              emitter: alphaEmitter,
              eventHub: EventHub.create({
                channel: 'alpha-channel',
                emitter: alphaEmitter,
              }),
            },
          },
          {
            params: {
              channel: 'beta-channel',
              emitter: betaEmitter,
              eventHub: EventHub.create({
                channel: 'beta-channel',
                emitter: betaEmitter,
              }),
            },
          },
        ]

        test.each(cases)('channel: $params.channel', async ({ params }) => {
          const emitterArgsExpected = [
            params.eventHub.channel,
            params.eventHub.listener,
          ]

          const getSpy = jest.spyOn(localPubSub.subscribersEventEmitterMap, 'get')
          const offSpy = jest.spyOn(params.emitter, 'off')
          const deleteSpy = jest.spyOn(localPubSub.subscribersEventEmitterMap, 'delete')

          const args = {
            eventHub: params.eventHub,
          }

          await localPubSub.teardownBroadcasterOnUnsubscribe(args)

          expect(getSpy)
            .toHaveBeenCalledWith(params.channel)
          expect(offSpy)
            .toHaveBeenCalledWith(...emitterArgsExpected)
          expect(deleteSpy)
            .toHaveBeenCalledWith(params.channel)
        })
      })

      describe('when channel has not set in #subscribersEventEmitterMap', () => {
        const localPubSub = new LocalPubSub()

        const alphaEmitter = new EventEmitter()
        const betaEmitter = new EventEmitter()

        const cases = [
          {
            params: {
              channel: 'alpha-channel',
              emitter: alphaEmitter,
              eventHub: EventHub.create({
                channel: 'alpha-channel',
                emitter: alphaEmitter,
              }),
            },
          },
          {
            params: {
              channel: 'beta-channel',
              emitter: betaEmitter,
              eventHub: EventHub.create({
                channel: 'beta-channel',
                emitter: betaEmitter,
              }),
            },
          },
        ]

        test.each(cases)('channel: $params.channel', async ({ params }) => {
          const emitterArgsExpected = [
            params.eventHub.channel,
            params.eventHub.listener,
          ]

          const getSpy = jest.spyOn(localPubSub.subscribersEventEmitterMap, 'get')
          const offSpy = jest.spyOn(params.emitter, 'off')
          const deleteSpy = jest.spyOn(localPubSub.subscribersEventEmitterMap, 'delete')

          const args = {
            eventHub: params.eventHub,
          }

          await localPubSub.teardownBroadcasterOnUnsubscribe(args)

          expect(getSpy)
            .toHaveBeenCalledWith(params.channel)
          expect(offSpy)
            .not
            .toHaveBeenCalledWith(...emitterArgsExpected)
          expect(deleteSpy)
            .not
            .toHaveBeenCalledWith(params.channel)
        })
      })
    })
  })
})

describe('LocalPubSub', () => {
  describe('#createEventEmitter()', () => {
    describe('to be instance of EventEmitter', () => {
      test('without arguments', () => {
        const localPubSub = new LocalPubSub()

        const actual = localPubSub.createEventEmitter()

        expect(actual)
          .toBeInstanceOf(EventEmitter)
      })
    })
  })
})
