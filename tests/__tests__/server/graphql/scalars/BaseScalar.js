import {
  GraphQLScalarType,
  Kind,
} from 'graphql'

import BaseScalar from '../../../../../lib/server/graphql/scalars/BaseScalar.js'

describe('BaseScalar', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#scalarName', () => {
        const cases = [
          {
            params: {
              scalarName: 'Alpha',
            },
          },
          {
            params: {
              scalarName: 'Beta',
            },
          },
        ]

        test.each(cases)('scalarName: $params.scalarName', ({ params }) => {
          const scalar = new BaseScalar(params)

          expect(scalar)
            .toHaveProperty('scalarName', params.scalarName)
        })
      })
    })
  })
})

describe('BaseScalar', () => {
  describe('.create()', () => {
    describe('to return instance', () => {
      const cases = [
        {
          params: {
            scalarName: 'Alpha',
          },
        },
        {
          params: {
            scalarName: 'Beta',
          },
        },
      ]

      test.each(cases)('scalarName: $params.scalarName', ({ params }) => {
        jest.spyOn(BaseScalar, 'scalarName', 'get')
          .mockReturnValue(params.scalarName)

        const scalar = BaseScalar.create(params)

        expect(scalar)
          .toBeInstanceOf(BaseScalar)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            scalarName: 'Alpha',
          },
        },
        {
          params: {
            scalarName: 'Beta',
          },
        },
      ]

      test.each(cases)('scalarName: $params.scalarName', ({ params }) => {
        jest.spyOn(BaseScalar, 'scalarName', 'get')
          .mockReturnValue(params.scalarName)

        const SpyClass = globalThis.constructorSpy.spyOn(BaseScalar)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })

    describe('to throw error when called as it', () => {
      test('with concrete member not found error', () => {
        expect(() => BaseScalar.create())
          .toThrow('concrete-member-not-found {"memberName":"BaseScalar.get:scalarName"}')
      })
    })
  })
})

describe('BaseScalar', () => {
  describe('.get:scalarName', () => {
    describe('to throw error', () => {
      test('with concrete member not found error', () => {
        expect(() => BaseScalar.scalarName)
          .toThrow('concrete-member-not-found {"memberName":"BaseScalar.get:scalarName"}')
      })
    })
  })
})

describe('BaseScalar', () => {
  describe('.get:description', () => {
    describe('to throw error', () => {
      test('with concrete member not found error', () => {
        expect(() => BaseScalar.description)
          .toThrow('concrete-member-not-found {"memberName":"BaseScalar.get:description"}')
      })
    })
  })
})

describe('BaseScalar', () => {
  describe('#get:Ctor', () => {
    describe('to be fixed value as constructor', () => {
      const cases = [
        {
          params: {
            scalarName: 'Alpha',
          },
        },
        {
          params: {
            scalarName: 'Beta',
          },
        },
      ]

      test.each(cases)('scalarName: $params.scalarName', ({ params }) => {
        const scalar = new BaseScalar(params)

        expect(scalar.Ctor)
          .toBe(BaseScalar) // same reference
      })
    })
  })
})

describe('BaseScalar', () => {
  describe('#serialize()', () => {
    describe('to throw error', () => {
      const cases = [
        {
          params: {
            scalarName: 'Alpha',
          },
        },
        {
          params: {
            scalarName: 'Beta',
          },
        },
      ]

      describe.each(cases)('scalarName: $params.scalarName', ({ params }) => {
        const scalar = new BaseScalar(params)

        const valueCases = [
          {
            value: new Date(),
          },
          {
            value: {
              alpha: 111,
              beta: 222,
            },
          },
        ]

        test.each(valueCases)('value: $value', ({ value }) => {
          expect(
            () => scalar.serialize({
              value,
            })
          )
            .toThrow('concrete-member-not-found {"memberName":"BaseScalar#serialize()"}')
        })
      })
    })
  })
})

describe('BaseScalar', () => {
  describe('#parseValue()', () => {
    describe('to throw error', () => {
      const cases = [
        {
          params: {
            scalarName: 'Alpha',
          },
        },
        {
          params: {
            scalarName: 'Beta',
          },
        },
      ]

      describe.each(cases)('scalarName: $params.scalarName', ({ params }) => {
        const scalar = new BaseScalar(params)

        const valueCases = [
          {
            value: '2024-11-04T11:22:33.999Z',
          },
          {
            value: `{
              alpha: 111,
              beta: 222,
            }`,
          },
        ]

        test.each(valueCases)('value: $value', ({ value }) => {
          expect(
            () => scalar.parseValue({
              value,
            })
          )
            .toThrow('concrete-member-not-found {"memberName":"BaseScalar#parseValue()"}')
        })
      })
    })
  })
})

describe('BaseScalar', () => {
  describe('#parseLiteral()', () => {
    describe('to throw error', () => {
      const cases = [
        {
          params: {
            scalarName: 'Alpha',
          },
        },
        {
          params: {
            scalarName: 'Beta',
          },
        },
      ]

      describe.each(cases)('scalarName: $params.scalarName', ({ params }) => {
        const scalar = new BaseScalar(params)

        /**
         * @type {Array<{
         *   ast: import('graphql').ASTNode
         * }>}
         */
        const valueCases = ([
          {
            ast: { // NameNode
              kind: Kind.NAME,
              value: '2024-11-04T11:22:33.999Z',
            },
          },
          {
            ast: { // VariableNode
              kind: Kind.VARIABLE,
              name: { // NameNode
                kind: Kind.NAME,
                value: 'NameOfVariableNode',
              },
            },
          },
        ])

        test.each(valueCases)('ast: $ast', ({ ast }) => {
          expect(
            () => scalar.parseLiteral({
              ast,
            })
          )
            .toThrow('concrete-member-not-found {"memberName":"BaseScalar#parseLiteral()"}')
        })
      })
    })
  })
})

describe('BaseScalar', () => {
  describe('#createGraphqlScalarType()', () => {
    describe('to be instance of GraphQLScalarType', () => {
      const cases = [
        {
          params: {
            Scalar: class AlphaScalar extends BaseScalar {
              static get scalarName () {
                return 'Alpha'
              }

              static get description () {
                return 'Description of Alpha'
              }
            },
          },
        },
        {
          params: {
            Scalar: class BetaScalar extends BaseScalar {
              static get scalarName () {
                return 'Beta'
              }

              static get description () {
                return 'Description of Beta'
              }
            },
          },
        },
      ]

      test.each(cases)('Scalar: $params.Scalar.name', ({ params }) => {
        const scalar = params.Scalar.create()

        const actual = scalar.createGraphqlScalarType()

        expect(actual)
          .toBeInstanceOf(GraphQLScalarType)
      })
    })
  })
})

describe('BaseScalar', () => {
  describe('#generateGraphqlScalarTypeOptions()', () => {
    describe('to be options as object', () => {
      const cases = [
        {
          params: {
            Scalar: class AlphaScalar extends BaseScalar {
              static get scalarName () {
                return 'Alpha'
              }

              static get description () {
                return 'Description of Alpha'
              }
            },
          },
          expected: {
            name: 'Alpha',
            description: 'Description of Alpha',
            serialize: expect.any(Function),
            parseValue: expect.any(Function),
            parseLiteral: expect.any(Function),
          },
        },
        {
          params: {
            Scalar: class BetaScalar extends BaseScalar {
              static get scalarName () {
                return 'Beta'
              }

              static get description () {
                return 'Description of Beta'
              }
            },
          },
          expected: {
            name: 'Beta',
            description: 'Description of Beta',
            serialize: expect.any(Function),
            parseValue: expect.any(Function),
            parseLiteral: expect.any(Function),
          },
        },
      ]

      test.each(cases)('Scalar: $params.Scalar.name', ({ params, expected }) => {
        const scalar = params.Scalar.create()

        const actual = scalar.generateGraphqlScalarTypeOptions()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to call members', () => {
      const cases = [
        {
          params: {
            Scalar: class AlphaScalar extends BaseScalar {
              static get scalarName () {
                return 'Alpha'
              }

              static get description () {
                return 'Description of Alpha'
              }
            },
          },
        },
        {
          params: {
            Scalar: class BetaScalar extends BaseScalar {
              static get scalarName () {
                return 'Beta'
              }

              static get description () {
                return 'Description of Beta'
              }
            },
          },
        },
      ]

      test.each(cases)('Scalar: $params.Scalar.name', ({ params }) => {
        const scalar = params.Scalar.create()
        const {
          serialize,
          parseValue,
          parseLiteral,
        } = scalar.generateGraphqlScalarTypeOptions()

        const serializeSpy = jest.spyOn(scalar, 'serialize')
        const parseValueSpy = jest.spyOn(scalar, 'parseValue')
        const parseLiteralSpy = jest.spyOn(scalar, 'parseLiteral')

        const serializeArgs = new Date()
        const parseValueArgs = '2024-11-04T11:22:33.999Z'

        const parseLiteralArgs = /** @type {import('graphql').ValueNode} */ ({
          kind: Kind.VARIABLE,
          name: {
            kind: Kind.NAME,
            value: 'NameOfVariableNode',
          },
        })

        expect(() => serialize(serializeArgs))
          .toThrow('concrete-member-not-found {"memberName":"BaseScalar#serialize()"}')

        expect(() => parseValue(parseValueArgs))
          .toThrow('concrete-member-not-found {"memberName":"BaseScalar#parseValue()"}')

        expect(() => parseLiteral(parseLiteralArgs))
          .toThrow('concrete-member-not-found {"memberName":"BaseScalar#parseLiteral()"}')

        expect(serializeSpy)
          .toHaveBeenCalledWith({
            value: serializeArgs,
          })
        expect(parseValueSpy)
          .toHaveBeenCalledWith({
            value: parseValueArgs,
          })
        expect(parseLiteralSpy)
          .toHaveBeenCalledWith({
            ast: parseLiteralArgs,
          })
      })
    })
  })
})
