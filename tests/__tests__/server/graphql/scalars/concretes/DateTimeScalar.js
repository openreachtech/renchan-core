import {
  Kind,
} from 'graphql'

import DateTimeScalar from '../../../../../../lib/server/graphql/scalars/concretes/DateTimeScalar.js'
import BaseScalar from '../../../../../../lib/server/graphql/scalars/BaseScalar.js'

describe('DateTimeScalar', () => {
  describe('super class', () => {
    test('to be BaseScalar', () => {
      const actual = DateTimeScalar.prototype

      expect(actual)
        .toBeInstanceOf(BaseScalar)
    })
  })
})

describe('DateTimeScalar', () => {
  describe('.get:scalarName', () => {
    describe('to be fixed value', () => {
      test('as "DateTime"', () => {
        const expected = 'DateTime'

        const actual = DateTimeScalar.scalarName

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('DateTimeScalar', () => {
  describe('.get:description', () => {
    describe('to be fixed value', () => {
      test('as "DateTime custom scalar type"', () => {
        const expected = 'DateTime custom scalar type'

        const actual = DateTimeScalar.description

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('DateTimeScalar', () => {
  describe('#serialize()', () => {
    describe('to be ISO string', () => {
      const cases = [
        {
          params: {
            value: new Date('2024-11-04T19:00:01.000Z'),
          },
          expected: '2024-11-04T19:00:01.000Z',
        },
        {
          params: {
            value: new Date('2024-11-04T19:00:02.000Z'),
          },
          expected: '2024-11-04T19:00:02.000Z',
        },
      ]

      test.each(cases)('value $params.value', ({ params, expected }) => {
        const scalar = DateTimeScalar.create()

        const actual = scalar.serialize(params)

        expect(actual)
          .toBe(expected)
      })
    })

    describe('to throw', () => {
      const cases = [
        {
          params: {
            value: 'incorrect string',
          },
        },
        {
          params: {
            value: 1000,
          },
        },
      ]

      test.each(cases)('value $params.value', ({ params }) => {
        const scalar = DateTimeScalar.create()

        expect(() => scalar.serialize(params))
          .toThrow('GraphQL Date Scalar serializer expected a `Date` object')
      })
    })
  })
})

describe('DateTimeScalar', () => {
  describe('#parseValue()', () => {
    describe('to be Date', () => {
      const cases = [
        {
          params: {
            value: '2024-11-04T19:00:01.000Z',
          },
          expected: new Date('2024-11-04T19:00:01.000Z'),
        },
        {
          params: {
            value: '2024-11-04T19:00:02.000Z',
          },
          expected: new Date('2024-11-04T19:00:02.000Z'),
        },
      ]

      test.each(cases)('value $params.value', ({ params, expected }) => {
        const scalar = DateTimeScalar.create()

        const actual = scalar.parseValue(params)

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to throw', () => {
      const cases = [
        {
          params: {
            value: 1000,
          },
        },
        {
          params: {
            value: {},
          },
        },
        {
          params: {
            value: [],
          },
        },
      ]

      test.each(cases)('value $params.value', ({ params }) => {
        const scalar = DateTimeScalar.create()

        expect(() => scalar.parseValue(params))
          .toThrow('GraphQL Date Scalar parser expected a `string`')
      })
    })
  })
})

describe('DateTimeScalar', () => {
  describe('#parseLiteral()', () => {
    describe('to be Date', () => {
      const cases = [
        {
          params: {
            ast: {
              kind: Kind.STRING,
              value: '2024-11-04T19:00:01.000Z',
            },
          },
          expected: new Date('2024-11-04T19:00:01.000Z'),
        },
        {
          params: {
            ast: {
              kind: Kind.STRING,
              value: '2024-11-04T19:00:02.000Z',
            },
          },
          expected: new Date('2024-11-04T19:00:02.000Z'),
        },
      ]

      test.each(cases)('value $params.ast.value', ({ params, expected }) => {
        const scalar = DateTimeScalar.create()

        const actual = scalar.parseLiteral(params)

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to be null', () => {
      const cases = [
        {
          params: {
            ast: {
              kind: Kind.VARIABLE,
              value: 'I am Variable',
            },
          },
        },
        {
          params: {
            ast: {
              kind: Kind.NAME,
              value: 'I am Name',
            },
          },
        },
      ]

      test.each(cases)('ast $params.ast.value', ({ params }) => {
        const scalar = DateTimeScalar.create()

        const actual = scalar.parseLiteral(params)

        expect(actual)
          .toBeNull()
      })
    })
  })
})
