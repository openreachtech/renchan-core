import ChannelGenerator from '../../../../../lib/server/graphql/subscription/ChannelGenerator.js'

describe('ChannelGenerator', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#prefix', () => {
        const cases = [
          {
            params: {
              prefix: 'onReceiveMessage',
            },
          },
          {
            params: {
              prefix: 'onCreateRoom',
            },
          },
        ]

        test.each(cases)('prefix: $params.prefix', ({ params }) => {
          const generator = new ChannelGenerator(params)

          expect(generator)
            .toHaveProperty('prefix', params.prefix)
        })
      })
    })
  })
})

describe('ChannelGenerator', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            prefix: 'onReceiveMessage',
          },
        },
        {
          params: {
            prefix: 'onCreateRoom',
          },
        },
      ]

      test.each(cases)('prefix: $params.prefix', ({ params }) => {
        const generator = ChannelGenerator.create(params)

        expect(generator)
          .toBeInstanceOf(ChannelGenerator)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            prefix: 'onReceiveMessage',
          },
        },
        {
          params: {
            prefix: 'onCreateRoom',
          },
        },
      ]

      test.each(cases)('prefix: $params.prefix', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(ChannelGenerator)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('SubscriptionTopicBuilder', () => {
  describe('.generateChannel()', () => {
    describe('to return channel', () => {
      const cases = [
        {
          params: {
            prefix: 'onReceiveMessage',
          },
          queryCases: [
            {
              query: {
                roomId: 10001,
              },
              expected: 'onReceiveMessage?roomId=10001',
            },
            {
              query: {
                roomId: 20001,
                locked: 'on',
              },
              expected: 'onReceiveMessage?roomId=20001&locked=on',
            },
          ],
        },
        {
          params: {
            prefix: 'onLeaveRoom',
          },
          queryCases: [
            {
              query: {
                roomId: 10001,
              },
              expected: 'onLeaveRoom?roomId=10001',
            },
            {
              query: {
                roomId: 20001,
                locked: 'on',
              },
              expected: 'onLeaveRoom?roomId=20001&locked=on',
            },
          ],
        },
      ]

      describe.each(cases)('prefix: $params.prefix', ({ params, queryCases }) => {
        const generator = ChannelGenerator.create(params)

        test.each(queryCases)('roomId: $query.roomId', ({ query, expected }) => {
          const args = {
            query,
          }

          const actual = generator.generateChannel(args)

          expect(actual)
            .toBe(expected)
        })

        test('with no args', () => {
          const expected = params.prefix

          const actual = generator.generateChannel()

          expect(actual)
            .toBe(expected)
        })
      })
    })

    describe('to return channel with incorrect query', () => {
      /**
       * @type {Array<{
       *   params: {
       *     prefix: string
       *   }
       *   queryCases: Array<{
       *     query: Record<string, *>
       *   }>
       * }>}
       */
      const cases = [
        {
          params: {
            prefix: 'onReceiveMessage',
          },
          queryCases: [
            {
              query: {
                roomId: null,
              },
            },
            {
              query: {
                roomId: undefined,
              },
            },
            {
              query: {
                roomId: Symbol('as irregular type'),
              },
            },
            {
              query: {
                roomId: {},
              },
            },
            {
              query: {
                roomId: [],
              },
            },
          ],
        },
      ]

      describe.each(cases)('prefix: $params.prefix', ({ params, queryCases }) => {
        const generator = ChannelGenerator.create(params)

        test.each(queryCases)('roomId: $query.roomId', ({ query }) => {
          const args = {
            query,
          }

          const actual = generator.generateChannel(args)

          expect(actual)
            .toBeNull()
        })
      })
    })
  })
})
