import TopicParcel from '../../../../../lib/server/graphql/subscription/TopicParcel.js'

describe('TopicParcel', () => {
  describe('constructor', () => {
    describe('should keep property', () => {
      describe('#channel', () => {
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
          const parcel = new TopicParcel(input)

          expect(parcel)
            .toHaveProperty('channel', input.channel)
        })
      })

      describe('#message', () => {
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

        test.each(cases)('message: $input.message', ({ input }) => {
          const parcel = new TopicParcel(input)

          expect(parcel)
            .toHaveProperty('message', input.message)
        })
      })
    })
  })

  describe('.create()', () => {
    describe('should be an instance of own class', () => {
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
        const received = TopicParcel.create(input)

        expect(received)
          .toBeInstanceOf(TopicParcel)
      })
    })
  })
})

describe('TopicParcel', () => {
  describe('#get:Ctor', () => {
    describe('should return the constructor of the instance', () => {
      class AlphaTopicParcel extends TopicParcel {}

      const cases = [
        {
          input: {
            Parcel: TopicParcel,
          },
        },
        {
          input: {
            Parcel: AlphaTopicParcel,
          },
        },
      ]

      test.each(cases)('Parcel: $input.Parcel.name', ({ input }) => {
        const parcel = new input.Parcel({
          channel: 'alpha-channel',
          message: '{"alpha":1}',
        })

        const received = parcel.Ctor

        expect(received)
          .toBe(input.Parcel)
      })
    })
  })

  describe('#hasParsedError()', () => {
    describe('should return false when raw message is valid JSON', () => {
      const cases = [
        { message: '{"alpha":1}' },
        { message: '[1,2]' },
      ]

      test.each(cases)('message: $message', ({ message }) => {
        const parcel = new TopicParcel({
          channel: 'alpha-channel',
          message,
        })

        const received = parcel.hasParsedError()

        expect(received)
          .toBe(false)
      })
    })

    describe('should return true when message is not available, that is, not valid JSON or null', () => {
      const cases = [
        { message: '{"alpha":' },
        { message: 'not-json' },
        { message: '' },
        { message: 'null' },
      ]

      test.each(cases)('message: $message', ({ message }) => {
        const parcel = new TopicParcel({
          channel: 'alpha-channel',
          message,
        })

        const received = parcel.hasParsedError()

        expect(received)
          .toBe(true)
      })
    })
  })
})

describe('TopicParcel', () => {
  describe('#isAvailable()', () => {
    describe('should return true when message is valid JSON other than null', () => {
      const cases = [
        { message: '{"alpha":1}' },
        { message: '[1,2]' },
      ]

      test.each(cases)('message: $message', ({ message }) => {
        const parcel = new TopicParcel({
          channel: 'alpha-channel',
          message,
        })

        const received = parcel.isAvailable()

        expect(received)
          .toBe(true)
      })
    })

    describe('should return false when message is not available, that is, not valid JSON or null', () => {
      const cases = [
        { message: '{"alpha":' },
        { message: 'not-json' },
        { message: '' },
        { message: 'null' },
      ]

      test.each(cases)('message: $message', ({ message }) => {
        const parcel = new TopicParcel({
          channel: 'alpha-channel',
          message,
        })

        const received = parcel.isAvailable()

        expect(received)
          .toBe(false)
      })
    })

    describe('should be the complement of #hasParsedError()', () => {
      const cases = [
        {
          input: {
            message: '{"alpha":1}',
          },
          expected: {
            isAvailable: true,
            hasParsedError: false,
          },
        },
        {
          input: {
            message: '{"alpha":',
          },
          expected: {
            isAvailable: false,
            hasParsedError: true,
          },
        },
      ]

      test.each(cases)('message: $input.message', ({ input, expected }) => {
        const parcel = new TopicParcel({
          channel: 'alpha-channel',
          message: input.message,
        })

        const isAvailable = parcel.isAvailable()
        const hasParsedError = parcel.hasParsedError()

        expect(isAvailable)
          .toBe(expected.isAvailable)
        expect(hasParsedError)
          .toBe(expected.hasParsedError)
      })
    })
  })
})

describe('TopicParcel', () => {
  describe('#ensureParsedMessage()', () => {
    describe('should return the parsed value', () => {
      const cases = [
        {
          input: {
            message: '{"alpha":1}',
          },
          expected: { alpha: 1 },
        },
        {
          input: {
            message: '[1,2]',
          },
          expected: [1, 2],
        },
        {
          input: {
            message: 'null',
          },
          expected: null,
        },
      ]

      test.each(cases)('message: $input.message', ({ input, expected }) => {
        const parcel = new TopicParcel({
          channel: 'alpha-channel',
          message: input.message,
        })

        const received = parcel.ensureParsedMessage()

        expect(received)
          .toEqual(expected)
      })
    })

    describe('should return null when raw message is not valid JSON', () => {
      const cases = [
        { message: '{"alpha":' },
        { message: 'not-json' },
      ]

      test.each(cases)('message: $message', ({ message }) => {
        const parcel = new TopicParcel({
          channel: 'alpha-channel',
          message,
        })

        const received = parcel.ensureParsedMessage()

        expect(received)
          .toBeNull()
      })
    })

    describe('should parse the raw message only once', () => {
      const cases = [
        {
          input: {
            message: '{"alpha":1}',
          },
          expected: { alpha: 1 },
        },
        {
          input: {
            message: '[1,2]',
          },
          expected: [1, 2],
        },
      ]

      test.each(cases)('message: $input.message', ({ input, expected }) => {
        const parcel = new TopicParcel({
          channel: 'alpha-channel',
          message: input.message,
        })

        const parseSpy = jest.spyOn(JSON, 'parse')

        const received = parcel.ensureParsedMessage()
        const hasParsedError = parcel.hasParsedError()

        expect(received)
          .toEqual(expected)
        expect(hasParsedError)
          .toBe(false)
        expect(parseSpy)
          .toHaveBeenCalledWith(input.message)
        expect(parseSpy)
          .toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('#inflateMessage()', () => {
    describe('should return the parsed value', () => {
      const cases = [
        {
          input: {
            message: '{"alpha":1}',
          },
          expected: { alpha: 1 },
        },
        {
          input: {
            message: '[1,2]',
          },
          expected: [1, 2],
        },
        {
          input: {
            message: 'null',
          },
          expected: null,
        },
      ]

      test.each(cases)('message: $input.message', ({ input, expected }) => {
        const parcel = new TopicParcel({
          channel: 'alpha-channel',
          message: input.message,
        })

        const received = parcel.inflateMessage()

        expect(received)
          .toEqual(expected)
      })
    })

    describe('should return null when raw message is not valid JSON', () => {
      const cases = [
        { message: '{"alpha":' },
        { message: 'not-json' },
      ]

      test.each(cases)('message: $message', ({ message }) => {
        const parcel = new TopicParcel({
          channel: 'alpha-channel',
          message,
        })

        const received = parcel.inflateMessage()

        expect(received)
          .toBeNull()
      })
    })
  })
})

describe('TopicParcel', () => {
  describe('#extractValueBySchema()', () => {
    describe('should return the value of the schema out of the parsed message', () => {
      const cases = [
        {
          input: {
            message: '{"alpha":{"id":1}}',
            schema: 'alpha',
          },
          expected: { id: 1 },
        },
        {
          input: {
            message: '{"alpha":"alpha-value","beta":2}',
            schema: 'alpha',
          },
          expected: 'alpha-value',
        },
      ]

      test.each(cases)('message: $input.message, schema: $input.schema', ({ input, expected }) => {
        const parcel = TopicParcel.create({
          channel: 'alpha-channel',
          message: input.message,
        })

        const received = parcel.extractValueBySchema({
          schema: input.schema,
        })

        expect(received)
          .toStrictEqual(expected)
      })
    })

    describe('should return null when the schema is not in the parsed message', () => {
      const cases = [
        { message: '{"beta":2}' },
        { message: '{"gamma":3}' },
      ]

      test.each(cases)('message: $message', ({ message }) => {
        const parcel = TopicParcel.create({
          channel: 'alpha-channel',
          message,
        })

        const received = parcel.extractValueBySchema({
          schema: 'alpha',
        })

        expect(received)
          .toBeNull()
      })
    })

    describe('should return null when the message is not available', () => {
      const cases = [
        { message: '{"alpha":' },
        { message: 'null' },
      ]

      test.each(cases)('message: $message', ({ message }) => {
        const parcel = TopicParcel.create({
          channel: 'alpha-channel',
          message,
        })

        const received = parcel.extractValueBySchema({
          schema: 'alpha',
        })

        expect(received)
          .toBeNull()
      })
    })
  })
})
