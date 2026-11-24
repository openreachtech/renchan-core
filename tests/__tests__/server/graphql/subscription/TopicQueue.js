import TopicQueue from '../../../../../lib/server/graphql/subscription/TopicQueue.js'
import TopicParcel from '../../../../../lib/server/graphql/subscription/TopicParcel.js'

describe('TopicQueue', () => {
  describe('constructor', () => {
    describe('should keep property', () => {
      describe('#topics', () => {
        const cases = [
          {
            tally: [],
          },
          {
            tally: [
              TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
            ],
          },
          {
            tally: [
              TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
              TopicParcel.create({ channel: 'beta-channel', message: '{"beta":2}' }),
            ],
          },
        ]

        test.each(cases)('topics length: $tally.length', ({ tally }) => {
          const args = {
            topics: tally,
          }

          const queue = new TopicQueue(args)

          expect(queue)
            .toHaveProperty('topics', tally)
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
          input: {},
        },
        {
          input: {
            topics: [],
          },
        },
      ]

      test.each(cases)('input: $input', ({ input }) => {
        const received = TopicQueue.create(input)

        expect(received)
          .toBeInstanceOf(TopicQueue)
      })
    })

    describe('should call constructor', () => {
      const cases = [
        {
          input: {
            topics: [],
          },
        },
        {
          input: {
            topics: [
              TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
            ],
          },
        },
      ]

      test.each(cases)('topics length: $input.topics.length', ({ input }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(TopicQueue)

        SpyClass.create(input)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(input)
      })
    })

    describe('should fill default topics', () => {
      describe('when no arguments', () => {
        test('should fill topics with an empty array', () => {
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
})

describe('TopicQueue', () => {
  describe('.TopicParcelCtor', () => {
    describe('when called as is', () => {
      test('should return TopicParcel', () => {
        const received = TopicQueue.TopicParcelCtor

        expect(received)
          .toBe(TopicParcel)
      })
    })
  })
})

describe('TopicQueue', () => {
  describe('.createTopicParcel()', () => {
    describe('should be an instance of TopicParcel with channel and message', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            message: '{"alpha":1}',
          },
        },
        {
          input: {
            channel: 'beta-channel',
            message: '{"beta":2}',
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const received = TopicQueue.createTopicParcel(input)

        expect(received)
          .toBeInstanceOf(TopicParcel)
        expect(received)
          .toHaveProperty('channel', input.channel)
        expect(received)
          .toHaveProperty('message', input.message)
      })
    })
  })
})

describe('TopicQueue', () => {
  describe('#enqueue()', () => {
    describe('should append an available topic parcel at the tail', () => {
      const cases = [
        {
          input: {
            topics: [],
            channel: 'alpha-channel',
            message: '{"alpha":1}',
          },
          expected: [
            TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
          ],
        },
        {
          input: {
            topics: [
              TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
            ],
            channel: 'beta-channel',
            message: '{"beta":2}',
          },
          expected: [
            TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
            TopicParcel.create({ channel: 'beta-channel', message: '{"beta":2}' }),
          ],
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input, expected }) => {
        const queue = new TopicQueue({
          topics: input.topics,
        })

        queue.enqueue({
          channel: input.channel,
          message: input.message,
        })

        expect(queue)
          .toHaveProperty('topics', expected)
      })
    })

    describe('should not append a topic parcel which is not available', () => {
      const cases = [
        { message: '{"alpha":' },
        { message: 'not-json' },
        { message: 'null' },
      ]

      test.each(cases)('message: $message', ({ message }) => {
        const queue = TopicQueue.create()

        queue.enqueue({
          channel: 'alpha-channel',
          message,
        })

        expect(queue)
          .toHaveProperty('topics', [])
      })
    })

    describe('should enqueue instances of TopicParcel', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            message: '{"alpha":1}',
          },
        },
        {
          input: {
            channel: 'beta-channel',
            message: '{"beta":2}',
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const queue = TopicQueue.create()

        queue.enqueue(input)

        expect(queue)
          .toHaveProperty('topics', [
            TopicParcel.create({ channel: input.channel, message: input.message }),
          ])
      })
    })

    describe('should return own instance for method chaining', () => {
      const cases = [
        {
          input: {
            channel: 'alpha-channel',
            message: '{"alpha":1}',
          },
        },
        {
          input: {
            channel: 'beta-channel',
            message: '{"beta":2}',
          },
        },
      ]

      test.each(cases)('channel: $input.channel', ({ input }) => {
        const queue = TopicQueue.create()

        const received = queue.enqueue(input)

        expect(received)
          .toBe(queue)
      })
    })
  })
})

describe('TopicQueue', () => {
  describe('#dequeue()', () => {
    describe('should take the topic parcel at the head out', () => {
      const cases = [
        {
          input: {
            topics: [
              TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
            ],
          },
          expected: {
            head: TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
            rest: [],
          },
        },
        {
          input: {
            topics: [
              TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
              TopicParcel.create({ channel: 'beta-channel', message: '{"beta":2}' }),
            ],
          },
          expected: {
            head: TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
            rest: [
              TopicParcel.create({ channel: 'beta-channel', message: '{"beta":2}' }),
            ],
          },
        },
      ]

      test.each(cases)('topics length: $input.topics.length', ({ input, expected }) => {
        const queue = new TopicQueue({
          topics: input.topics,
        })

        const received = queue.dequeue()

        expect(received)
          .toStrictEqual(expected.head)
        expect(queue)
          .toHaveProperty('topics', expected.rest)
      })
    })

    describe('should return null when no topic parcel is held', () => {
      const cases = [
        {
          input: {
            message: '{"alpha":',
          },
        },
        {
          input: {
            message: 'null',
          },
        },
      ]

      test.each(cases)('message: $input.message', ({ input }) => {
        const queue = TopicQueue.create()

        queue.enqueue({
          channel: 'alpha-channel',
          message: input.message,
        })

        const received = queue.dequeue()

        expect(received)
          .toBeNull()
        expect(queue)
          .toHaveProperty('topics', [])
      })
    })
  })
})

describe('TopicQueue', () => {
  describe('#isEmpty()', () => {
    describe('should return true when no topic parcel is held', () => {
      const cases = [
        {
          input: {
            message: '{"alpha":',
          },
        },
        {
          input: {
            message: 'not-json',
          },
        },
      ]

      test.each(cases)('message: $input.message', ({ input }) => {
        const queue = TopicQueue.create()

        queue.enqueue({
          channel: 'alpha-channel',
          message: input.message,
        })

        const received = queue.isEmpty()

        expect(received)
          .toBe(true)
      })
    })

    describe('should return false when any topic parcel is held', () => {
      const cases = [
        {
          input: {
            topics: [
              TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
            ],
          },
        },
        {
          input: {
            topics: [
              TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
              TopicParcel.create({ channel: 'beta-channel', message: '{"beta":2}' }),
            ],
          },
        },
      ]

      test.each(cases)('topics length: $input.topics.length', ({ input }) => {
        const queue = TopicQueue.create(input)

        const received = queue.isEmpty()

        expect(received)
          .toBe(false)
      })
    })
  })
})

describe('TopicQueue', () => {
  describe('#hasTopic()', () => {
    describe('should return true when any topic parcel is held', () => {
      const cases = [
        {
          input: {
            topics: [
              TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
            ],
          },
        },
        {
          input: {
            topics: [
              TopicParcel.create({ channel: 'alpha-channel', message: '{"alpha":1}' }),
              TopicParcel.create({ channel: 'beta-channel', message: '{"beta":2}' }),
            ],
          },
        },
      ]

      test.each(cases)('topics length: $input.topics.length', ({ input }) => {
        const queue = TopicQueue.create(input)

        const received = queue.hasTopic()

        expect(received)
          .toBe(true)
      })
    })

    describe('should return false when no topic parcel is held', () => {
      const cases = [
        {
          input: {
            message: '{"alpha":',
          },
        },
        {
          input: {
            message: 'not-json',
          },
        },
      ]

      test.each(cases)('message: $input.message', ({ input }) => {
        const queue = TopicQueue.create()

        queue.enqueue({
          channel: 'alpha-channel',
          message: input.message,
        })

        const received = queue.hasTopic()

        expect(received)
          .toBe(false)
      })
    })
  })
})
