import BaseMutationResolver from '../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'
import BaseResolver from '../../../../../lib/server/graphql/resolvers/BaseResolver.js'

describe('BaseMutationResolver', () => {
  describe('super class', () => {
    test('to be BaseResolver', () => {
      const actual = BaseMutationResolver.prototype

      expect(actual)
        .toBeInstanceOf(BaseResolver)
    })
  })
})

describe('BaseMutationResolver', () => {
  describe('.get:operation', () => {
    test('to be fixed value', () => {
      const expected = 'Mutation'

      const actual = BaseMutationResolver.operation

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('BaseMutationResolver', () => {
  describe('#publishTopic()', () => {
    describe('to call context.broker.publish()', () => {
      /**
       * @type {Array<{
       *   params: {
       *     context: GraphqlType.Context
       *     topic: {
       *       channel: string
       *       message: *
       *     }
       *   }
       * }>}
       */
      const cases = /** @type {*} */ ([
        {
          params: {
            context: {
              broker: {
                publish: () => {},
              },
            },
            topic: {
              channel: 'alpha',
              message: 'message (1)',
            },
          },
        },
        {
          params: {
            context: {
              broker: {
                publish: () => {},
              },
            },
            topic: {
              channel: 'beta',
              message: 'message (2)',
            },
          },
        },
        {
          params: {
            context: {
              broker: {
                publish: () => {},
              },
            },
            topic: {
              channel: 'gamma',
              message: 'message (3)',
            },
          },
        },
      ])

      test.each(cases)('channel: $params.topic.channel', ({ params }) => {
        const resolver = BaseMutationResolver.create()

        const publishSpy = jest.spyOn(params.context.broker, 'publish')

        resolver.publishTopic(params)

        expect(publishSpy)
          .toHaveBeenCalledWith(params.topic)
      })
    })
  })
})
