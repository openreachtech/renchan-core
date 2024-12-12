import OnReceiveMessageSubscriptionResolver from '../../../../../../../../../app/server/graphql/resolvers/customer/actual/subscriptions/OnReceiveMessageSubscriptionResolver.js'

describe('OnReceiveMessageSubscriptionResolver', () => {
  describe('.get:schema', () => {
    test('to be fixed value', () => {
      const expected = 'onReceiveMessage'

      const actual = OnReceiveMessageSubscriptionResolver.schema

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('OnReceiveMessageSubscriptionResolver', () => {
  describe('.generateChannelQuery', () => {
    describe('to extract from variables', () => {
      const cases = [
        {
          variables: {
            input: {
              roomId: 123,
            },
          },
          expected: {
            roomId: 123,
          },
        },
        {
          variables: {
            input: {
              roomId: 456,
            },
          },
          expected: {
            roomId: 456,
          },
        },
      ]

      test.each(cases)('to return object with roomId', async ({ variables, expected }) => {
        const resolver = await OnReceiveMessageSubscriptionResolver.createAsync()

        const actual = resolver.generateChannelQuery({
          variables,
        })

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})
