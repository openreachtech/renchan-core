import {
  Kind,
} from 'graphql'

import BigNumber from 'bignumber.js'

import BigNumberScalar from '../../../../../../lib/server/graphql/scalars/concretes/BigNumberScalar.js'
import BaseScalar from '../../../../../../lib/server/graphql/scalars/BaseScalar.js'

describe('BigNumberScalar', () => {
  describe('super class', () => {
    test('to be BaseScalar', () => {
      const actual = BigNumberScalar.prototype

      expect(actual)
        .toBeInstanceOf(BaseScalar)
    })
  })
})

describe('BigNumberScalar', () => {
  describe('.get:scalarName', () => {
    describe('to be fixed value', () => {
      test('as "BigNumber"', () => {
        const expected = 'BigNumber'

        const actual = BigNumberScalar.scalarName

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('BigNumberScalar', () => {
  describe('.get:description', () => {
    describe('to be fixed value', () => {
      test('as "BigNumber custom scalar type"', () => {
        const expected = 'BigNumber custom scalar type'

        const actual = BigNumberScalar.description

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('BigNumberScalar', () => {
  describe('#serialize()', () => {
    describe('to be fixed string', () => {
      describe('from BigNumber', () => {
        const cases = [
          {
            params: {
              value: new BigNumber('123.001'),
            },
            expected: '123.001',
          },
          {
            params: {
              value: new BigNumber(123.002),
            },
            expected: '123.002',
          },
          {
            params: {
              value: new BigNumber(1001),
            },
            expected: '1001',
          },
          {
            params: {
              value: new BigNumber(0),
            },
            expected: '0',
          },
        ]

        test.each(cases)('value $params.value', ({ params, expected }) => {
          const scalar = BigNumberScalar.create()

          const actual = scalar.serialize(params)

          expect(actual)
            .toBe(expected)
        })
      })

      describe('from BigNumber like value', () => {
        const cases = [
          {
            params: {
              value: '123.001',
            },
            expected: '123.001',
          },
          {
            params: {
              value: 123.002,
            },
            expected: '123.002',
          },
          {
            params: {
              value: 1001,
            },
            expected: '1001',
          },
          {
            params: {
              value: 0,
            },
            expected: '0',
          },
        ]

        test.each(cases)('value $params.value', ({ params, expected }) => {
          const scalar = BigNumberScalar.create()

          const actual = scalar.serialize(params)

          expect(actual)
            .toBe(expected)
        })
      })
    })

    describe('to throw with not BigNumber', () => {
      const cases = [
        { value: 'incorrect string' },
        { value: true },
        { value: Symbol('incorrect') },
        { value: {} },
        { value: [] },
        { value: null },
        { value: undefined },
      ]

      test.each(cases)('value $value', ({ value }) => {
        const scalar = BigNumberScalar.create()

        expect(() => scalar.serialize({
          value,
        }))
          .toThrow('GraphQL BigNumber Scalar serializer expected a `BigNumber` object')
      })
    })
  })
})

describe('BigNumberScalar', () => {
  describe('#parseValue()', () => {
    describe('to be BigNumber', () => {
      const cases = [
        {
          params: {
            value: '123.001001',
          },
          expected: new BigNumber('123.001001'),
        },
        {
          params: {
            value: '-123.002002',
          },
          expected: new BigNumber('-123.002002'),
        },
        {
          params: {
            value: 1001,
          },
          expected: new BigNumber(1001),
        },
        {
          params: {
            value: 0,
          },
          expected: new BigNumber(0),
        },
      ]

      test.each(cases)('value $params.value', ({ params, expected }) => {
        const scalar = BigNumberScalar.create()

        const actual = scalar.parseValue(params)

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to throw', () => {
      const cases = [
        { value: 'incorrect string' },
        { value: true },
        { value: Symbol('incorrect') },
        { value: {} },
        { value: [] },
        { value: null },
        { value: undefined },
      ]

      test.each(cases)('value $value', ({ value }) => {
        const scalar = BigNumberScalar.create()

        expect(() => scalar.parseValue({
          value,
        }))
          .toThrow('GraphQL BigNumber Scalar parser expected a `string`')
      })
    })
  })
})

describe('BigNumberScalar', () => {
  describe('#parseLiteral()', () => {
    describe('to be BigNumber', () => {
      const cases = [
        {
          params: {
            ast: {
              kind: Kind.STRING,
              value: '123.001001',
            },
          },
          expected: new BigNumber('123.001001'),
        },
        {
          params: {
            ast: {
              kind: Kind.INT,
              value: 1001,
            },
          },
          expected: new BigNumber(1001),
        },
        {
          params: {
            ast: {
              kind: Kind.FLOAT,
              value: 123.002002,
            },
          },
          expected: new BigNumber('123.002002'),
        },
      ]

      test.each(cases)('value $params.ast.value', ({ params, expected }) => {
        const scalar = BigNumberScalar.create()

        const actual = scalar.parseLiteral(params)

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to be null', () => {
      describe('with not acceptable Kind', () => {
        const cases = [
          {
            params: {
              ast: {
                kind: Kind.BOOLEAN,
                value: true,
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
          {
            params: {
              ast: {
                kind: Kind.OBJECT,
                value: {},
              },
            },
          },
          {
            params: {
              ast: {
                kind: Kind.VARIABLE,
                value: '123.003001',
              },
            },
          },
        ]

        test.each(cases)('ast $params.ast.value', ({ params }) => {
          const scalar = BigNumberScalar.create()

          const actual = scalar.parseLiteral(params)

          expect(actual)
            .toBeNull()
        })
      })

      describe('with NaN value', () => {
        const cases = [
          {
            params: {
              ast: {
                kind: Kind.STRING,
                value: 'incorrect string',
              },
            },
          },
        ]

        test.each(cases)('ast $value', ({ value }) => {
          const scalar = BigNumberScalar.create()

          const actual = scalar.parseLiteral({
            ast: {
              kind: Kind.STRING,
              value,
            },
          })

          expect(actual)
            .toBeNull()
        })
      })
    })
  })
})
