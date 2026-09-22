import {
  __Schema,
  __Type,
  GraphQLError,
  buildSchema,
  getNamedType,
  GraphQLNonNull,
  GraphQLString,
  isIntrospectionType,
  parse,
  specifiedRules,
  validate,
} from 'graphql'

import {
  EnvironmentFacade,
} from '@openreachtech/renchan-env'

import IntrospectionAccessedGraphqlRequestValidator from '../../../../../../lib/server/graphql/validators/concretes/IntrospectionAccessedGraphqlRequestValidator.js'
import BaseGraphqlServerEngine from '../../../../../../lib/server/graphql/BaseGraphqlServerEngine.js'
import BaseGraphqlShare from '../../../../../../lib/server/graphql/contexts/BaseGraphqlShare.js'
import RenchanGraphqlError from '../../../../../../lib/server/graphql/errors/RenchanGraphqlError.js'
import BaseGraphqlRequestValidator from '../../../../../../lib/server/graphql/validators/BaseGraphqlRequestValidator.js'

describe('IntrospectionAccessedGraphqlRequestValidator', () => {
  describe('inheritance', () => {
    test('should be correct class', () => {
      const received = IntrospectionAccessedGraphqlRequestValidator.prototype

      expect(received)
        .toBeInstanceOf(BaseGraphqlRequestValidator)
    })
  })
})

describe('IntrospectionAccessedGraphqlRequestValidator', () => {
  describe('.get:errorName', () => {
    test('to be fixed value', () => {
      const received = IntrospectionAccessedGraphqlRequestValidator.errorName

      expect(received)
        .toBe('IntrospectionAccessed')
    })
  })
})

describe('IntrospectionAccessedGraphqlRequestValidator', () => {
  describe('.get:getNamedType', () => {
    test('to be bridge function', () => {
      const received = IntrospectionAccessedGraphqlRequestValidator.getNamedType

      expect(received)
        .toBe(getNamedType) // same reference
    })
  })
})

describe('IntrospectionAccessedGraphqlRequestValidator', () => {
  describe('.get:isIntrospectionType', () => {
    test('to be bridge function', () => {
      const received = IntrospectionAccessedGraphqlRequestValidator.isIntrospectionType

      expect(received)
        .toBe(isIntrospectionType) // same reference
    })
  })
})

describe('IntrospectionAccessedGraphqlRequestValidator', () => {
  describe('.isAcceptable()', () => {
    /** @type {GraphqlType.Config} */
    const mockConfig = {
      graphqlEndpoint: '/graphql-alpha',
      staticPath: '/path/to/static/',
      schemaPath: '/path/to/schema',
      actualResolversPath: '/path/to/actual/',
      stubResolversPath: null,
      postWorkersPath: null,
    }

    describe('should be truthy', () => {
      const cases = [
        {
          input: {
            env: new EnvironmentFacade({
              environmentHash: {
                NODE_ENV: 'production',
              },
            })
              .generateFacade(),
          },
        },
      ]

      test.each(cases)('NODE_ENV: $input.env.NODE_ENV', ({ input }) => {
        const share = BaseGraphqlShare.create({
          env: input.env,
        })

        const engine = new BaseGraphqlServerEngine({
          config: mockConfig,
          share,
          errorHash: {},
        })

        const args = {
          engine,
        }

        const received = IntrospectionAccessedGraphqlRequestValidator.isAcceptable(args)

        expect(received)
          .toBeTruthy()
      })
    })

    describe('should be falsy', () => {
      const cases = [
        {
          input: {
            env: new EnvironmentFacade({
              environmentHash: {
                NODE_ENV: 'development',
              },
            })
              .generateFacade(),
          },
        },
        {
          input: {
            env: new EnvironmentFacade({
              environmentHash: {
                NODE_ENV: 'live',
              },
            })
              .generateFacade(),
          },
        },
        {
          input: {
            env: new EnvironmentFacade({
              environmentHash: {
                NODE_ENV: 'staging',
              },
            })
              .generateFacade(),
          },
        },
      ]

      test.each(cases)('NODE_ENV: $input.env.NODE_ENV', ({ input }) => {
        const share = BaseGraphqlShare.create({
          env: input.env,
        })

        const engine = new BaseGraphqlServerEngine({
          config: mockConfig,
          share,
          errorHash: {},
        })

        const args = {
          engine,
        }

        const received = IntrospectionAccessedGraphqlRequestValidator.isAcceptable(args)

        expect(received)
          .toBeFalsy()
      })
    })
  })
})

describe('IntrospectionAccessedGraphqlRequestValidator', () => {
  describe('#get:Ctor', () => {
    const IntrospectionAccessedError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.002',
    })

    describe('to be fixed value as constructor', () => {
      const AlphaValidator = class extends IntrospectionAccessedGraphqlRequestValidator {}

      const cases = [
        { input: { ValidatorCtor: IntrospectionAccessedGraphqlRequestValidator } },
        { input: { ValidatorCtor: AlphaValidator } },
      ]

      test.each(cases)('ValidatorCtor: $input.ValidatorCtor.name', ({ input }) => {
        const validator = new input.ValidatorCtor({
          ErrorCtor: IntrospectionAccessedError,
        })
        const received = validator.Ctor

        expect(received)
          .toBe(input.ValidatorCtor) // same reference
      })
    })
  })
})

describe('IntrospectionAccessedGraphqlRequestValidator', () => {
  describe('#defineValidationRule()', () => {
    const IntrospectionAccessedError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.002',
    })

    const schemaTally = buildSchema(`
      type Query {
        alpha: Alpha
        beta: String
      }

      type Alpha {
        id: ID
        name: String
      }
    `)

    describe('to report each introspection field', () => {
      const cases = [
        {
          input: {
            document: parse('{ __schema { queryType { name } } }'),
          },
          expected: [
            expect.objectContaining({
              message: '103.X000.002 {"fieldName":"__schema"}',
            }),
            expect.objectContaining({
              message: '103.X000.002 {"fieldName":"queryType"}',
            }),
          ],
        },
        {
          input: {
            document: parse('{ __schema { types { name } } }'), // a list of an introspection type
          },
          expected: [
            expect.objectContaining({
              message: '103.X000.002 {"fieldName":"__schema"}',
            }),
            expect.objectContaining({
              message: '103.X000.002 {"fieldName":"types"}',
            }),
          ],
        },
        {
          input: {
            document: parse('{ __type(name: "Alpha") { name } }'),
          },
          expected: [
            expect.objectContaining({
              message: '103.X000.002 {"fieldName":"__type"}',
            }),
          ],
        },
      ]

      test.each(cases)('query: $input.document.loc.source.body', ({ input, expected }) => {
        const validator = IntrospectionAccessedGraphqlRequestValidator.create({
          ErrorCtor: IntrospectionAccessedError,
        })

        const rule = validator.defineValidationRule()

        const received = validate(
          schemaTally,
          input.document,
          [
            ...specifiedRules,
            rule,
          ]
        )

        expect(received)
          .toStrictEqual(expected)
      })
    })

    describe('to report nothing on ordinary field', () => {
      const cases = [
        { input: { document: parse('{ alpha { id name } }') } },
        { input: { document: parse('{ beta }') } },
        { input: { document: parse('{ __typename }') } },
      ]

      test.each(cases)('query: $input.document.loc.source.body', ({ input }) => {
        const validator = IntrospectionAccessedGraphqlRequestValidator.create({
          ErrorCtor: IntrospectionAccessedError,
        })

        const rule = validator.defineValidationRule()

        const received = validate(
          schemaTally,
          input.document,
          [
            ...specifiedRules,
            rule,
          ]
        )

        expect(received)
          .toStrictEqual([])
      })
    })
  })
})

describe('IntrospectionAccessedGraphqlRequestValidator', () => {
  describe('#reportIntrospectionField()', () => {
    const IntrospectionAccessedError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.002',
    })

    /** @type {import('graphql').FieldNode} */
    const mockNode = /** @type {*} */ ({
      kind: 'Field',
      name: {
        kind: 'Name',
        value: '__schema',
      },
    })

    describe('to report when the field resolves to an introspection type', () => {
      const cases = [
        { input: { type: __Schema } },
      ]

      test.each(cases)('type: $input.type.name', ({ input }) => {
        const expected = expect.objectContaining({
          message: '103.X000.002 {"fieldName":"__schema"}',
          originalError: expect.any(IntrospectionAccessedError),
        })

        /** @type {GraphqlType.ValidationContext} */
        const mockContext = /** @type {*} */ ({
          getType: () => input.type,
          reportError: () => {},
        })

        const reportErrorSpy = jest.spyOn(mockContext, 'reportError')

        const validator = IntrospectionAccessedGraphqlRequestValidator.create({
          ErrorCtor: IntrospectionAccessedError,
        })

        validator.reportIntrospectionField({
          context: mockContext,
          node: mockNode,
        })

        expect(reportErrorSpy)
          .toHaveBeenCalledWith(expect.any(GraphQLError))
        expect(reportErrorSpy)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('to report nothing', () => {
      const cases = [
        { input: { type: GraphQLString } },
        { input: { type: null } },
        { input: { type: undefined } },
      ]

      test.each(cases)('type: $input.type', ({ input }) => {
        /** @type {GraphqlType.ValidationContext} */
        const mockContext = /** @type {*} */ ({
          getType: () => input.type,
          reportError: () => {},
        })

        const reportErrorSpy = jest.spyOn(mockContext, 'reportError')

        const validator = IntrospectionAccessedGraphqlRequestValidator.create({
          ErrorCtor: IntrospectionAccessedError,
        })

        validator.reportIntrospectionField({
          context: mockContext,
          node: mockNode,
        })

        expect(reportErrorSpy)
          .not
          .toHaveBeenCalled()
      })
    })
  })
})

describe('IntrospectionAccessedGraphqlRequestValidator', () => {
  describe('#isIntrospectionField()', () => {
    const IntrospectionAccessedError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.002',
    })

    describe('should be truthy', () => {
      const cases = [
        { input: { type: __Schema } },
        { input: { type: __Type } },
        { input: { type: new GraphQLNonNull(__Schema) } }, // wrapped in a non-null
      ]

      test.each(cases)('type: $input.type', ({ input }) => {
        /** @type {GraphqlType.ValidationContext} */
        const mockContext = /** @type {*} */ ({
          getType: () => input.type,
        })

        const validator = IntrospectionAccessedGraphqlRequestValidator.create({
          ErrorCtor: IntrospectionAccessedError,
        })

        const received = validator.isIntrospectionField({
          context: mockContext,
        })

        expect(received)
          .toBeTruthy()
      })
    })

    describe('should be falsy', () => {
      const cases = [
        { input: { type: GraphQLString } },
        { input: { type: new GraphQLNonNull(GraphQLString) } }, // wrapped in a non-null
        { input: { type: null } },
        { input: { type: undefined } },
      ]

      test.each(cases)('type: $input.type', ({ input }) => {
        /** @type {GraphqlType.ValidationContext} */
        const mockContext = /** @type {*} */ ({
          getType: () => input.type,
        })

        const validator = IntrospectionAccessedGraphqlRequestValidator.create({
          ErrorCtor: IntrospectionAccessedError,
        })

        const received = validator.isIntrospectionField({
          context: mockContext,
        })

        expect(received)
          .toBeFalsy()
      })
    })
  })
})
