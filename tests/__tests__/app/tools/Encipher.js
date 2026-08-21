import bcrypt from 'bcrypt'

import Encipher from '../../../../app/tools/Encipher.js'

describe('Encipher', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#bcryptHandler', () => {
        const alphaHandlerMock = /** @type {*} */ ({
          hash: jest.fn(),
          compare: jest.fn(),
        })
        const betaHandlerMock = /** @type {*} */ ({
          hash: jest.fn(),
          compare: jest.fn(),
        })

        const cases = [
          {
            params: {
              bcryptHandler: alphaHandlerMock,
            },
          },
          {
            params: {
              bcryptHandler: betaHandlerMock,
            },
          },
        ]

        test.each(cases)('bcryptHandler: $params.bcryptHandler', ({ params }) => {
          const encipher = new Encipher(params)

          expect(encipher)
            .toHaveProperty('bcryptHandler', params.bcryptHandler)
        })
      })
    })
  })
})

describe('Encipher', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const alphaHandlerMock = /** @type {*} */ ({
        hash: jest.fn(),
        compare: jest.fn(),
      })

      const cases = [
        {
          params: {
            bcryptHandler: alphaHandlerMock,
          },
        },
        {
          params: {},
        },
      ]

      test.each(cases)('bcryptHandler: $params.bcryptHandler', ({ params }) => {
        const encipher = Encipher.create(params)

        expect(encipher)
          .toBeInstanceOf(Encipher)
      })

      test('with no arguments', () => {
        const encipher = Encipher.create()

        expect(encipher)
          .toBeInstanceOf(Encipher)
      })
    })

    describe('to call constructor', () => {
      const alphaHandlerMock = /** @type {*} */ ({
        hash: jest.fn(),
        compare: jest.fn(),
      })
      const betaHandlerMock = /** @type {*} */ ({
        hash: jest.fn(),
        compare: jest.fn(),
      })

      const cases = [
        {
          params: {
            bcryptHandler: alphaHandlerMock,
          },
        },
        {
          params: {
            bcryptHandler: betaHandlerMock,
          },
        },
      ]

      test.each(cases)('bcryptHandler: $params.bcryptHandler', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(Encipher)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })

    describe('to fill default bcryptHandler', () => {
      const expected = {
        bcryptHandler: bcrypt,
      }

      test('with no arguments', () => {
        const SpyClass = globalThis.constructorSpy.spyOn(Encipher)

        SpyClass.create()

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('Encipher', () => {
  describe('#get:hashRounds', () => {
    test('to be fixed value', () => {
      const encipher = Encipher.create()

      expect(encipher.hashRounds)
        .toBe(10)
    })
  })
})

describe('Encipher', () => {
  describe('#hash()', () => {
    describe('to hand over to bcrypt handler', () => {
      const cases = [
        {
          params: {
            originalText: 'alpha-password',
          },
          tally: '$2b$10$alpha',
        },
        {
          params: {
            originalText: 'beta-password',
          },
          tally: '$2b$10$beta',
        },
      ]

      test.each(cases)('originalText: $params.originalText', async ({ params, tally }) => {
        const bcryptHandlerMock = /** @type {*} */ ({
          hash: jest.fn()
            .mockResolvedValue(tally),
          compare: jest.fn(),
        })

        const encipher = Encipher.create({
          bcryptHandler: bcryptHandlerMock,
        })

        const actual = await encipher.hash(params.originalText)

        expect(actual)
          .toBe(tally)
        expect(bcryptHandlerMock.hash)
          .toHaveBeenCalledWith(params.originalText, 10)
      })
    })
  })
})

describe('Encipher', () => {
  describe('#compare()', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          params: {
            originalText: 'abcdef',
          },
        },
        {
          params: {
            originalText: '123456',
          },
        },
        {
          params: {
            originalText: 'variable',
          },
        },
      ]

      test.each(cases)('originalText: $params.originalText', async ({ params }) => {
        const encipher = Encipher.create()

        const hashedText = await encipher.hash(params.originalText)

        const actual = await encipher.compare(params.originalText, hashedText)

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          params: {
            originalText: 'abcdef',
          },
        },
        {
          params: {
            originalText: '123456',
          },
        },
        {
          params: {
            originalText: 'variable',
          },
        },
      ]

      test.each(cases)('originalText: $params.originalText', async ({ params }) => {
        const encipher = Encipher.create()

        const hashedText = await encipher.hash('unknown')

        const actual = await encipher.compare(params.originalText, hashedText)

        expect(actual)
          .toBeFalsy()
      })
    })

    describe('to be falsy without calling bcrypt handler', () => {
      const cases = [
        {
          params: {
            originalText: '',
          },
        },
        {
          params: {
            originalText: null,
          },
        },
        {
          params: {
            originalText: undefined,
          },
        },
      ]

      test.each(cases)('originalText: $params.originalText', async ({ params }) => {
        const bcryptHandlerMock = /** @type {*} */ ({
          hash: jest.fn(),
          compare: jest.fn(),
        })

        const encipher = Encipher.create({
          bcryptHandler: bcryptHandlerMock,
        })

        const actual = await encipher.compare(
          /** @type {*} */ (params.originalText),
          '$2b$10$hashed'
        )

        expect(actual)
          .toBeFalsy()
        expect(bcryptHandlerMock.compare)
          .not
          .toHaveBeenCalled()
      })
    })
  })
})
