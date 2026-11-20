import TopicIteratorResult from '../../../../../lib/server/graphql/subscription/TopicIteratorResult.js'

describe('TopicIteratorResult', () => {
  describe('constructor', () => {
    describe('should keep property', () => {
      describe('#value', () => {
        const cases = [
          {
            input: {
              value: 'value-0001',
            },
            expected: 'value-0001',
          },
          {
            input: {
              value: 100002,
            },
            expected: 100002,
          },
          {
            input: {
              value: null,
            },
            expected: null,
          },
          {
            input: {
              value: {
                id: 100004,
              },
            },
            expected: {
              id: 100004,
            },
          },
        ]

        test.each(cases)('value: $input.value', ({ input, expected }) => {
          const args = {
            value: input.value,
            done: false,
          }

          const result = new TopicIteratorResult(args)

          expect(result)
            .toHaveProperty('value', expected)
        })
      })

      describe('#done', () => {
        const cases = [
          {
            input: {
              done: true,
            },
            expected: true,
          },
          {
            input: {
              done: false,
            },
            expected: false,
          },
        ]

        test.each(cases)('done: $input.done', ({ input, expected }) => {
          const args = {
            value: 'value-0001',
            done: input.done,
          }

          const result = new TopicIteratorResult(args)

          expect(result)
            .toHaveProperty('done', expected)
        })
      })
    })
  })
})

describe('TopicIteratorResult', () => {
  describe('.create()', () => {
    describe('should be an instance of own class', () => {
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
        const received = TopicIteratorResult.create(input)

        expect(received)
          .toBeInstanceOf(TopicIteratorResult)
      })
    })

    describe('should call constructor', () => {
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
        const SpyClass = globalThis.constructorSpy.spyOn(TopicIteratorResult)

        SpyClass.create(tally)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(tally)
      })
    })
  })
})
