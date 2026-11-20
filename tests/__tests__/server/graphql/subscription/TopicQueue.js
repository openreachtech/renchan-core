import TopicQueue from '../../../../../lib/server/graphql/subscription/TopicQueue.js'

describe('TopicQueue', () => {
  describe('constructor', () => {
    describe('should keep property', () => {
      describe('#topics', () => {
        const cases = [
          {
            input: {
              topics: [],
            },
            expected: [],
          },
          {
            input: {
              topics: [
                { channel: 'alpha-channel', message: '{"alpha":1}' },
              ],
            },
            expected: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
            ],
          },
          {
            input: {
              topics: [
                { channel: 'alpha-channel', message: '{"alpha":1}' },
                { channel: 'beta-channel', message: '{"beta":2}' },
              ],
            },
            expected: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
              { channel: 'beta-channel', message: '{"beta":2}' },
            ],
          },
        ]

        test.each(cases)('topics: $input.topics', ({ input, expected }) => {
          const queue = new TopicQueue(input)

          expect(queue)
            .toHaveProperty('topics', expected)
        })
      })
    })
  })
})

describe('TopicQueue', () => {
  describe('.create()', () => {
    describe('should be an instance of own class', () => {
      const cases = [
        {
          input: {
            topics: [],
          },
        },
        {
          input: {
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
            ],
          },
        },
        {
          input: {
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
              { channel: 'beta-channel', message: '{"beta":2}' },
            ],
          },
        },
      ]

      test.each(cases)('topics: $input.topics', ({ input }) => {
        const received = TopicQueue.create(input)

        expect(received)
          .toBeInstanceOf(TopicQueue)
      })
    })

    describe('should call constructor', () => {
      const cases = [
        {
          tally: {
            topics: [],
          },
        },
        {
          tally: {
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
            ],
          },
        },
        {
          tally: {
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
              { channel: 'beta-channel', message: '{"beta":2}' },
            ],
          },
        },
      ]

      test.each(cases)('topics: $tally.topics', ({ tally }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(TopicQueue)

        SpyClass.create(tally)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(tally)
      })
    })

    describe('should fill default topics', () => {
      test('with no arguments', () => {
        const expected = {
          topics: [],
        }

        const SpyClass = globalThis.constructorSpy.spyOn(TopicQueue)

        SpyClass.create()

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('TopicQueue', () => {
  describe('#enqueue()', () => {
    describe('should append the topic at the tail', () => {
      const cases = [
        {
          input: {
            topics: [],
            channel: 'alpha-channel',
            message: '{"alpha":1}',
          },
          expected: [
            { channel: 'alpha-channel', message: '{"alpha":1}' },
          ],
        },
        {
          input: {
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
            ],
            channel: 'beta-channel',
            message: '{"beta":2}',
          },
          expected: [
            { channel: 'alpha-channel', message: '{"alpha":1}' },
            { channel: 'beta-channel', message: '{"beta":2}' },
          ],
        },
        {
          input: {
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
              { channel: 'beta-channel', message: '{"beta":2}' },
            ],
            channel: 'gamma-channel',
            message: '{"gamma":3}',
          },
          expected: [
            { channel: 'alpha-channel', message: '{"alpha":1}' },
            { channel: 'beta-channel', message: '{"beta":2}' },
            { channel: 'gamma-channel', message: '{"gamma":3}' },
          ],
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input, expected }) => {
        const constructorArgs = {
          topics: input.topics,
        }
        const enqueueArgs = {
          channel: input.channel,
          message: input.message,
        }

        const queue = new TopicQueue(constructorArgs)

        queue.enqueue(enqueueArgs)

        expect(queue)
          .toHaveProperty('topics', expected)
      })
    })

    describe('should return own instance for method chaining', () => {
      const cases = [
        {
          input: {
            topics: [],
            channel: 'alpha-channel',
            message: '{"alpha":1}',
          },
        },
        {
          input: {
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
            ],
            channel: 'beta-channel',
            message: '{"beta":2}',
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const constructorArgs = {
          topics: input.topics,
        }
        const enqueueArgs = {
          channel: input.channel,
          message: input.message,
        }

        const queue = new TopicQueue(constructorArgs)

        const received = queue.enqueue(enqueueArgs)

        expect(received)
          .toBe(queue) // same reference
      })
    })
  })
})

describe('TopicQueue', () => {
  describe('#dequeue()', () => {
    describe('should take the topic at the head out', () => {
      const cases = [
        {
          input: {
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
            ],
          },
          expected: {
            topic: { channel: 'alpha-channel', message: '{"alpha":1}' },
            topics: [],
          },
        },
        {
          input: {
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
              { channel: 'beta-channel', message: '{"beta":2}' },
            ],
          },
          expected: {
            topic: { channel: 'alpha-channel', message: '{"alpha":1}' },
            topics: [
              { channel: 'beta-channel', message: '{"beta":2}' },
            ],
          },
        },
        {
          input: {
            topics: [
              { channel: 'beta-channel', message: '{"beta":2}' },
              { channel: 'alpha-channel', message: '{"alpha":1}' },
              { channel: 'gamma-channel', message: '{"gamma":3}' },
            ],
          },
          expected: {
            topic: { channel: 'beta-channel', message: '{"beta":2}' },
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
              { channel: 'gamma-channel', message: '{"gamma":3}' },
            ],
          },
        },
      ]

      test.each(cases)('topics: $input.topics', ({ input, expected }) => {
        const queue = new TopicQueue(input)

        const received = queue.dequeue()

        expect(received)
          .toStrictEqual(expected.topic)
        expect(queue)
          .toHaveProperty('topics', expected.topics)
      })
    })

    describe('should be null when no topic is held', () => {
      const cases = [
        {
          input: {
            topics: [],
          },
        },
      ]

      test.each(cases)('topics: $input.topics', ({ input }) => {
        const queue = new TopicQueue(input)

        const received = queue.dequeue()

        expect(received)
          .toBeNull()
      })
    })
  })
})

describe('TopicQueue', () => {
  describe('#isEmpty()', () => {
    describe('should be truthy', () => {
      const cases = [
        {
          input: {
            topics: [],
          },
        },
      ]

      test.each(cases)('topics: $input.topics', ({ input }) => {
        const queue = new TopicQueue(input)

        const received = queue.isEmpty()

        expect(received)
          .toBeTruthy()
      })
    })

    describe('should be falsy', () => {
      const cases = [
        {
          input: {
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
            ],
          },
        },
        {
          input: {
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
              { channel: 'beta-channel', message: '{"beta":2}' },
            ],
          },
        },
      ]

      test.each(cases)('topics: $input.topics', ({ input }) => {
        const queue = new TopicQueue(input)

        const received = queue.isEmpty()

        expect(received)
          .toBeFalsy()
      })
    })
  })
})

describe('TopicQueue', () => {
  describe('#hasTopic()', () => {
    describe('should be truthy', () => {
      const cases = [
        {
          input: {
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
            ],
          },
        },
        {
          input: {
            topics: [
              { channel: 'alpha-channel', message: '{"alpha":1}' },
              { channel: 'beta-channel', message: '{"beta":2}' },
            ],
          },
        },
      ]

      test.each(cases)('topics: $input.topics', ({ input }) => {
        const queue = new TopicQueue(input)

        const received = queue.hasTopic()

        expect(received)
          .toBeTruthy()
      })
    })

    describe('should be falsy', () => {
      const cases = [
        {
          input: {
            topics: [],
          },
        },
      ]

      test.each(cases)('topics: $input.topics', ({ input }) => {
        const queue = new TopicQueue(input)

        const received = queue.hasTopic()

        expect(received)
          .toBeFalsy()
      })
    })
  })
})
