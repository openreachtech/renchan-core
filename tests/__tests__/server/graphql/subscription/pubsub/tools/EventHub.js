import {
  EventEmitter,
} from 'events'

import EventHub from '../../../../../../../lib/server/graphql/subscription/pubsub/tools/EventHub.js'

describe('EventHub', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#channel', () => {
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
          {
            params: {
              channel: 'gamma-channel',
            },
          },
        ]

        test.each(cases)('channel: $params.channel', ({ params }) => {
          const emitter = new EventEmitter()

          const args = {
            channel: params.channel,
            emitter,
          }

          const actual = new EventHub(args)

          expect(actual)
            .toHaveProperty('channel', params.channel)
        })
      })

      describe('#emitter', () => {
        const cases = [
          {
            params: {
              EventEmitter: class AlphaEmitter extends EventEmitter {},
            },
          },
          {
            params: {
              EventEmitter: class BetaEmitter extends EventEmitter {},
            },
          },
          {
            params: {
              EventEmitter: class GammaEmitter extends EventEmitter {},
            },
          },
        ]

        test.each(cases)('EventEmitter: $params.EventEmitter.name', ({ params }) => {
          const emitter = new params.EventEmitter()

          const args = {
            channel: params.channel,
            emitter,
          }

          const actual = new EventHub(args)

          expect(actual)
            .toHaveProperty('emitter', emitter)
        })
      })
    })
  })
})

describe('EventHub', () => {
  describe('.create', () => {
    describe('to return instance', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            EventEmitter: class AlphaEmitter extends EventEmitter {},
          },
        },
        {
          params: {
            channel: 'beta-channel',
            EventEmitter: class BetaEmitter extends EventEmitter {},
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            EventEmitter: class GammaEmitter extends EventEmitter {},
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const emitter = new params.EventEmitter()

        const args = {
          channel: params.channel,
          emitter,
        }

        const actual = EventHub.create(args)

        expect(actual)
          .toBeInstanceOf(EventHub)
      })
    })

    describe('to call constructor', () => {
      describe('with EventEmitter', () => {
        const cases = [
          {
            params: {
              channel: 'alpha-channel',
              EventEmitter: class AlphaEmitter extends EventEmitter {},
            },
          },
          {
            params: {
              channel: 'beta-channel',
              EventEmitter: class BetaEmitter extends EventEmitter {},
            },
          },
          {
            params: {
              channel: 'gamma-channel',
              EventEmitter: class GammaEmitter extends EventEmitter {},
            },
          },
        ]

        test.each(cases)('channel: $params.channel', ({ params }) => {
          const SpyClass = globalThis.constructorSpy.spyOn(EventHub)

          const emitter = new params.EventEmitter()

          const args = {
            channel: params.channel,
            emitter,
          }

          SpyClass.create(args)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(args)
        })
      })

      describe('without EventEmitter', () => {
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
          {
            params: {
              channel: 'gamma-channel',
            },
          },
        ]

        test.each(cases)('channel: $params.channel', ({ params }) => {
          const expected = {
            channel: params.channel,
            emitter: expect.any(EventEmitter),
          }

          const SpyClass = globalThis.constructorSpy.spyOn(EventHub)

          SpyClass.create(params)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(expected)
        })
      })
    })
  })
})

describe('EventHub', () => {
  describe('.createEmitter', () => {
    describe('to be instance of EventEmitter', () => {
      test('without arguments', () => {
        const actual = EventHub.createEmitter()

        expect(actual)
          .toBeInstanceOf(EventEmitter)
      })
    })
  })
})

describe('EventHub', () => {
  describe('#generateListener', () => {
    const cases = [
      {
        params: {
          channel: 'alpha-channel',
          EventEmitter: class AlphaEmitter extends EventEmitter {},
        },
      },
      {
        params: {
          channel: 'beta-channel',
          EventEmitter: class BetaEmitter extends EventEmitter {},
        },
      },
      {
        params: {
          channel: 'gamma-channel',
          EventEmitter: class GammaEmitter extends EventEmitter {},
        },
      },
    ]

    describe('to be instance of Function', () => {
      test.each(cases)('channel: $params.channel', ({ params }) => {
        const emitter = new params.EventEmitter()

        const args = {
          channel: params.channel,
          emitter,
        }

        const hub = new EventHub(args)

        const actual = hub.generateListener()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('to call #emitter.emit()', () => {
      test.each(cases)('channel: $params.channel', ({ params }) => {
        const emitter = new params.EventEmitter()

        const emitSpy = jest.spyOn(emitter, 'emit')

        const factoryArgs = {
          channel: params.channel,
          emitter,
        }

        const hub = new EventHub(factoryArgs)
        const listener = hub.generateListener()

        const args = [
          params.channel,
          Symbol('args'),
        ]
        const expected = [
          'broadcast',
          ...args,
        ]

        listener(...args)

        expect(emitSpy)
          .toHaveBeenCalledWith(...expected)
      })
    })
  })
})

describe('EventHub', () => {
  describe('#existsListener', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            emitter: new (class AlphaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {}),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            emitter: new (class BetaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {})
              .addListener('broadcast', () => {}),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const args = {
          channel: params.channel,
          emitter: params.emitter,
        }

        const hub = new EventHub(args)

        const actual = hub.existsListener()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            EventEmitter: class AlphaEmitter extends EventEmitter {},
          },
        },
        {
          params: {
            channel: 'beta-channel',
            EventEmitter: class BetaEmitter extends EventEmitter {},
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const emitter = new params.EventEmitter()

        const args = {
          channel: params.channel,
          emitter,
        }

        const hub = new EventHub(args)

        const actual = hub.existsListener()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('EventHub', () => {
  describe('#emptyListener', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            EventEmitter: class AlphaEmitter extends EventEmitter {},
          },
        },
        {
          params: {
            channel: 'beta-channel',
            EventEmitter: class BetaEmitter extends EventEmitter {},
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const emitter = new params.EventEmitter()

        const args = {
          channel: params.channel,
          emitter,
        }

        const hub = new EventHub(args)

        const actual = hub.emptyListener()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            emitter: new (class AlphaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {}),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            emitter: new (class BetaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {})
              .addListener('broadcast', () => {}),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const args = {
          channel: params.channel,
          emitter: params.emitter,
        }

        const hub = new EventHub(args)

        const actual = hub.emptyListener()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('EventHub', () => {
  describe('#addListener', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            emitter: new (class AlphaEmitter extends EventEmitter {})(),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            emitter: new (class BetaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {}),
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            emitter: new (class GammaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {})
              .addListener('broadcast', () => {}),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const args = {
          channel: params.channel,
          emitter: params.emitter,
        }

        const hub = new EventHub(args)

        const actual = hub.addListener({
          listener: () => {},
        })

        expect(actual)
          .toBe(hub) // same instance
      })
    })

    describe('to call member of emitter', () => {
      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            emitter: new (class AlphaEmitter extends EventEmitter {})(),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            emitter: new (class BetaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {}),
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            emitter: new (class GammaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {})
              .addListener('broadcast', () => {}),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const listenerTally = () => {}

        const expected = [
          'broadcast',
          listenerTally,
        ]

        const offSpy = jest.spyOn(params.emitter, 'off')
        const onSpy = jest.spyOn(params.emitter, 'on')

        const args = {
          channel: params.channel,
          emitter: params.emitter,
        }

        const hub = new EventHub(args)

        hub.addListener({
          listener: listenerTally,
        })

        expect(offSpy)
          .toHaveBeenCalledWith(...expected)
        expect(onSpy)
          .toHaveBeenCalledWith(...expected)
      })
    })
  })
})

describe('EventHub', () => {
  describe('#removeListener', () => {
    describe('to be instance of own class', () => {
      const listenerTally = () => {}

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            emitter: new (class AlphaEmitter extends EventEmitter {})()
              .addListener('broadcast', listenerTally),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            emitter: new (class BetaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {})
              .addListener('broadcast', listenerTally),
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            emitter: new (class GammaEmitter extends EventEmitter {})(),
          },
        },
        {
          params: {
            channel: 'delta-channel',
            emitter: new (class DeltaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {})
              .addListener('broadcast', () => {})
              .addListener('broadcast', () => {}),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const args = {
          channel: params.channel,
          emitter: params.emitter,
        }

        const hub = new EventHub(args)

        const actual = hub.removeListener({
          listener: listenerTally,
        })

        expect(actual)
          .toBe(hub) // same instance
      })
    })

    describe('to call member of emitter', () => {
      const listenerTally = () => {}

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            emitter: new (class AlphaEmitter extends EventEmitter {})()
              .addListener('broadcast', listenerTally),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            emitter: new (class BetaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {})
              .addListener('broadcast', listenerTally),
          },
        },
        {
          params: {
            channel: 'gamma-channel',
            emitter: new (class GammaEmitter extends EventEmitter {})(),
          },
        },
        {
          params: {
            channel: 'delta-channel',
            emitter: new (class DeltaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {})
              .addListener('broadcast', () => {})
              .addListener('broadcast', () => {}),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const expected = [
          'broadcast',
          listenerTally,
        ]

        const offSpy = jest.spyOn(params.emitter, 'off')

        const args = {
          channel: params.channel,
          emitter: params.emitter,
        }

        const hub = new EventHub(args)

        hub.removeListener({
          listener: listenerTally,
        })

        expect(offSpy)
          .toHaveBeenCalledWith(...expected)
      })
    })
  })
})

describe('EventHub', () => {
  describe('#hasListener', () => {
    describe('to be truthy', () => {
      const listenerTally = () => {}

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            emitter: new (class AlphaEmitter extends EventEmitter {})()
              .addListener('broadcast', listenerTally),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            emitter: new (class BetaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {})
              .addListener('broadcast', listenerTally),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const args = {
          channel: params.channel,
          emitter: params.emitter,
        }

        const hub = new EventHub(args)

        const actual = hub.hasListener({
          listener: listenerTally,
        })

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const listenerTally = () => {}

      const cases = [
        {
          params: {
            channel: 'alpha-channel',
            emitter: new (class AlphaEmitter extends EventEmitter {})(),
          },
        },
        {
          params: {
            channel: 'beta-channel',
            emitter: new (class BetaEmitter extends EventEmitter {})()
              .addListener('broadcast', () => {})
              .addListener('broadcast', () => {})
              .addListener('broadcast', () => {}),
          },
        },
      ]

      test.each(cases)('channel: $params.channel', ({ params }) => {
        const args = {
          channel: params.channel,
          emitter: params.emitter,
        }

        const hub = new EventHub(args)

        const actual = hub.hasListener({
          listener: listenerTally,
        })

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})
