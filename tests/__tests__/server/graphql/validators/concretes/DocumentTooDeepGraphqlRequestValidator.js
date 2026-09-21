import {
  buildSchema,
  GraphQLError,
  Kind,
  parse,
  specifiedRules,
  validate,
} from 'graphql'

import {
  EnvironmentFacade,
} from '@openreachtech/renchan-env'

import DocumentTooDeepGraphqlRequestValidator from '../../../../../../lib/server/graphql/validators/concretes/DocumentTooDeepGraphqlRequestValidator.js'
import BaseGraphqlServerEngine from '../../../../../../lib/server/graphql/BaseGraphqlServerEngine.js'
import BaseGraphqlShare from '../../../../../../lib/server/graphql/contexts/BaseGraphqlShare.js'
import RenchanGraphqlError from '../../../../../../lib/server/graphql/errors/RenchanGraphqlError.js'
import BaseGraphqlRequestValidator from '../../../../../../lib/server/graphql/validators/BaseGraphqlRequestValidator.js'

describe('DocumentTooDeepGraphqlRequestValidator', () => {
  describe('inheritance', () => {
    test('should be correct class', () => {
      const received = DocumentTooDeepGraphqlRequestValidator.prototype

      expect(received)
        .toBeInstanceOf(BaseGraphqlRequestValidator)
    })
  })
})

describe('DocumentTooDeepGraphqlRequestValidator', () => {
  describe('constructor', () => {
    const DocumentTooDeepError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })

    describe('to keep properties', () => {
      describe('#ErrorCtor', () => {
        const AlphaError = RenchanGraphqlError.declareGraphqlError({
          code: '103.X000.002',
        })

        const cases = [
          { input: { ErrorCtor: DocumentTooDeepError } },
          { input: { ErrorCtor: AlphaError } },
        ]

        test.each(cases)('ErrorCtor code: $input.ErrorCtor.errorCode', ({ input }) => {
          const args = {
            ErrorCtor: input.ErrorCtor,

            maxDocumentDepth: null,
          }

          const received = new DocumentTooDeepGraphqlRequestValidator(args)

          expect(received)
            .toHaveProperty('ErrorCtor', input.ErrorCtor)
        })
      })

      describe('#maxDocumentDepth', () => {
        const cases = [
          { input: { maxDocumentDepth: 10 } },
          { input: { maxDocumentDepth: 3 } },
          { input: { maxDocumentDepth: 1 } },
          { input: { maxDocumentDepth: null } },
        ]

        test.each(cases)('maxDocumentDepth: $input.maxDocumentDepth', ({ input }) => {
          const args = {
            ErrorCtor: DocumentTooDeepError,

            maxDocumentDepth: input.maxDocumentDepth,
          }

          const received = new DocumentTooDeepGraphqlRequestValidator(args)

          expect(received)
            .toHaveProperty('maxDocumentDepth', input.maxDocumentDepth)
        })
      })
    })
  })
})

describe('DocumentTooDeepGraphqlRequestValidator', () => {
  describe('.create()', () => {
    const DocumentTooDeepError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })

    describe('to return instance', () => {
      const cases = [
        {
          input: {
            ErrorCtor: DocumentTooDeepError,
            maxDocumentDepth: 10,
          },
        },
        {
          input: {
            ErrorCtor: DocumentTooDeepError,
            maxDocumentDepth: 1,
          },
        },
      ]

      test.each(cases)('maxDocumentDepth: $input.maxDocumentDepth', ({ input }) => {
        const received = DocumentTooDeepGraphqlRequestValidator.create(input)

        expect(received)
          .toBeInstanceOf(DocumentTooDeepGraphqlRequestValidator)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          tally: {
            ErrorCtor: DocumentTooDeepError,
            maxDocumentDepth: 10,
          },
        },
        {
          tally: {
            ErrorCtor: DocumentTooDeepError,
            maxDocumentDepth: 1,
          },
        },
      ]

      test.each(cases)('maxDocumentDepth: $tally.maxDocumentDepth', ({ tally }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(DocumentTooDeepGraphqlRequestValidator)

        SpyClass.create(tally)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(tally)
      })
    })
  })
})

describe('DocumentTooDeepGraphqlRequestValidator', () => {
  describe('.createAsync()', () => {
    const DocumentTooDeepError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })
    const UnknownError = RenchanGraphqlError.declareGraphqlError({
      code: '100.X000.001',
    })

    /** @type {GraphqlType.Config} */
    const mockConfig = {
      graphqlEndpoint: '/graphql-alpha',
      staticPath: '/path/to/static/',
      schemaPath: '/path/to/schema',
      actualResolversPath: '/path/to/actual/',
      stubResolversPath: null,
      postWorkersPath: null,
    }

    const mockShare = BaseGraphqlShare.create({})

    /**
     * @type {Array<{
     *   input: {
     *     errorHash: Record<string, typeof RenchanGraphqlError>
     *   }
     *   maxDocumentDepthCases: Array<{
     *     input: {
     *       maxDocumentDepth: number
     *     }
     *     expected: {
     *       ErrorCtor: typeof RenchanGraphqlError
     *       maxDocumentDepth: number
     *     }
     *   }>
     * }>}
     */
    const cases = [
      {
        input: {
          errorHash: {
            DocumentTooDeep: DocumentTooDeepError,
            Unknown: UnknownError,
          },
        },
        maxDocumentDepthCases: [
          {
            input: {
              maxDocumentDepth: 3,
            },
            expected: {
              ErrorCtor: DocumentTooDeepError,
              maxDocumentDepth: 3,
            },
          },
          {
            input: {
              maxDocumentDepth: 10,
            },
            expected: {
              ErrorCtor: DocumentTooDeepError,
              maxDocumentDepth: 10,
            },
          },
        ],
      },
      {
        input: {
          errorHash: {
            Unknown: UnknownError,
          },
        },
        maxDocumentDepthCases: [
          {
            input: {
              maxDocumentDepth: 3,
            },
            expected: {
              ErrorCtor: UnknownError,
              maxDocumentDepth: 3,
            },
          },
          {
            input: {
              maxDocumentDepth: 10,
            },
            expected: {
              ErrorCtor: UnknownError,
              maxDocumentDepth: 10,
            },
          },
        ],
      },
    ]

    describe('to be instance of own class', () => {
      describe.each(cases)('errorHash: $input.errorHash', ({ input, maxDocumentDepthCases }) => {
        test.each(maxDocumentDepthCases)('maxDocumentDepth: $input.maxDocumentDepth', async ({ input: depthInput }) => {
          const engine = new BaseGraphqlServerEngine({
            config: {
              ...mockConfig,
              maxDocumentDepth: depthInput.maxDocumentDepth,
            },
            share: mockShare,
            errorHash: input.errorHash,
          })

          const received = await DocumentTooDeepGraphqlRequestValidator.createAsync({
            engine,
          })

          expect(received)
            .toBeInstanceOf(DocumentTooDeepGraphqlRequestValidator)
        })
      })
    })

    describe('to call constructor', () => {
      describe.each(cases)('errorHash: $input.errorHash', ({ input, maxDocumentDepthCases }) => {
        test.each(maxDocumentDepthCases)('maxDocumentDepth: $input.maxDocumentDepth', async ({ input: depthInput, expected }) => {
          const engine = new BaseGraphqlServerEngine({
            config: {
              ...mockConfig,
              maxDocumentDepth: depthInput.maxDocumentDepth,
            },
            share: mockShare,
            errorHash: input.errorHash,
          })

          const SpyClass = globalThis.constructorSpy.spyOn(DocumentTooDeepGraphqlRequestValidator)

          await SpyClass.createAsync({
            engine,
          })

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(expected)
        })
      })
    })
  })
})

describe('DocumentTooDeepGraphqlRequestValidator', () => {
  describe('.get:errorName', () => {
    test('to be fixed value', () => {
      const received = DocumentTooDeepGraphqlRequestValidator.errorName

      expect(received)
        .toBe('DocumentTooDeep')
    })
  })
})

describe('DocumentTooDeepGraphqlRequestValidator', () => {
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

    const productionEnv = new EnvironmentFacade({
      environmentHash: {
        NODE_ENV: 'production',
      },
    })
      .generateFacade()

    describe('should be truthy', () => {
      const cases = [
        { input: { maxDocumentDepth: 1 } },
        { input: { maxDocumentDepth: 3 } },
        { input: { maxDocumentDepth: 10 } },
      ]

      test.each(cases)('maxDocumentDepth: $input.maxDocumentDepth', ({ input }) => {
        const share = BaseGraphqlShare.create({
          env: productionEnv,
        })

        const engine = new BaseGraphqlServerEngine({
          config: {
            ...mockConfig,
            maxDocumentDepth: input.maxDocumentDepth,
          },
          share,
          errorHash: {},
        })

        const args = {
          engine,
        }

        const received = DocumentTooDeepGraphqlRequestValidator.isAcceptable(args)

        expect(received)
          .toBeTruthy()
      })
    })

    describe('should be falsy', () => {
      describe('where the cap is no integer of one or more', () => {
        const cases = [
          { input: { maxDocumentDepth: null } },
          { input: { maxDocumentDepth: undefined } },
          { input: { maxDocumentDepth: 1.5 } },
          { input: { maxDocumentDepth: Infinity } },
          { input: { maxDocumentDepth: NaN } },
          { input: { maxDocumentDepth: 0 } },
          { input: { maxDocumentDepth: -1 } },
        ]

        test.each(cases)('maxDocumentDepth: $input.maxDocumentDepth', ({ input }) => {
          const share = BaseGraphqlShare.create({
            env: productionEnv,
          })

          const engine = new BaseGraphqlServerEngine({
            config: {
              ...mockConfig,
              maxDocumentDepth: input.maxDocumentDepth,
            },
            share,
            errorHash: {},
          })

          const args = {
            engine,
          }

          const received = DocumentTooDeepGraphqlRequestValidator.isAcceptable(args)

          expect(received)
            .toBeFalsy()
        })
      })

      describe('where the endpoint runs outside production', () => {
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
        ]

        test.each(cases)('NODE_ENV: $input.env.NODE_ENV', ({ input }) => {
          const share = BaseGraphqlShare.create({
            env: input.env,
          })

          const engine = new BaseGraphqlServerEngine({
            config: {
              ...mockConfig,
              maxDocumentDepth: 10,
            },
            share,
            errorHash: {},
          })

          const args = {
            engine,
          }

          const received = DocumentTooDeepGraphqlRequestValidator.isAcceptable(args)

          expect(received)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('DocumentTooDeepGraphqlRequestValidator', () => {
  describe('.extractMaxDocumentDepth()', () => {
    /** @type {GraphqlType.Config} */
    const mockConfig = {
      graphqlEndpoint: '/graphql-alpha',
      staticPath: '/path/to/static/',
      schemaPath: '/path/to/schema',
      actualResolversPath: '/path/to/actual/',
      stubResolversPath: null,
      postWorkersPath: null,
    }

    describe('to be the cap its config declares', () => {
      const cases = [
        {
          input: {
            maxDocumentDepth: 3,
          },
          expected: 3,
        },
        {
          input: {
            maxDocumentDepth: 10,
          },
          expected: 10,
        },
      ]

      test.each(cases)('maxDocumentDepth: $input.maxDocumentDepth', ({ input, expected }) => {
        const args = {
          config: {
            ...mockConfig,
            maxDocumentDepth: input.maxDocumentDepth,
          },
        }

        const received = DocumentTooDeepGraphqlRequestValidator.extractMaxDocumentDepth(args)

        expect(received)
          .toBe(expected)
      })
    })

    describe('to be null where its config declares none', () => {
      const cases = [
        { input: { maxDocumentDepth: null } },
        { input: { maxDocumentDepth: undefined } },
      ]

      test.each(cases)('maxDocumentDepth: $input.maxDocumentDepth', ({ input }) => {
        const args = {
          config: {
            ...mockConfig,
            maxDocumentDepth: input.maxDocumentDepth,
          },
        }

        const received = DocumentTooDeepGraphqlRequestValidator.extractMaxDocumentDepth(args)

        expect(received)
          .toBeNull()
      })
    })
  })
})

describe('DocumentTooDeepGraphqlRequestValidator', () => {
  describe('#get:Ctor', () => {
    const DocumentTooDeepError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })

    describe('to be fixed value as constructor', () => {
      const AlphaValidator = class extends DocumentTooDeepGraphqlRequestValidator {}

      const cases = [
        { input: { ValidatorCtor: DocumentTooDeepGraphqlRequestValidator } },
        { input: { ValidatorCtor: AlphaValidator } },
      ]

      test.each(cases)('ValidatorCtor: $input.ValidatorCtor.name', ({ input }) => {
        const validator = new input.ValidatorCtor({
          ErrorCtor: DocumentTooDeepError,
          maxDocumentDepth: 10,
        })
        const received = validator.Ctor

        expect(received)
          .toBe(input.ValidatorCtor) // same reference
      })
    })
  })
})

describe('DocumentTooDeepGraphqlRequestValidator', () => {
  describe('#defineValidationRule()', () => {
    const DocumentTooDeepError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })

    const schemaTally = buildSchema(`
      type Query {
        alpha: Alpha
        beta: String
      }

      type Mutation {
        saveAlpha: Alpha
      }

      type Alpha {
        id: ID
        name: String
        child: Alpha
      }
    `)

    describe('to report nothing within the cap', () => {
      const cases = [
        {
          input: { maxDocumentDepth: 1 },
          documentCases: [
            {
              input: {
                document: parse('{ beta }'),
              },
            },
          ],
        },
        {
          input: { maxDocumentDepth: 2 },
          documentCases: [
            {
              input: {
                document: parse('{ alpha { id } }'),
              },
            },
            {
              input: {
                document: parse('{ alpha { ... on Alpha { id } } }'),
              },
            }, // inline fragment adds no level
          ],
        },
        {
          input: { maxDocumentDepth: 3 },
          documentCases: [
            {
              input: {
                document: parse('{ alpha { child { id } } }'),
              },
            },
            {
              input: {
                document: parse('mutation { saveAlpha { child { id } } }'),
              },
            },
            {
              input: {
                document: parse('{ alpha { ...AlphaFields } } fragment AlphaFields on Alpha { child { id } }'),
              },
            },
          ],
        },
      ]

      describe.each(cases)('maxDocumentDepth: $input.maxDocumentDepth', ({ input, documentCases }) => {
        test.each(documentCases)('query: $input.document.loc.source.body', ({ input: documentInput }) => {
          const validator = DocumentTooDeepGraphqlRequestValidator.create({
            ErrorCtor: DocumentTooDeepError,

            maxDocumentDepth: input.maxDocumentDepth,
          })

          const rule = validator.defineValidationRule()

          const received = validate(
            schemaTally,
            documentInput.document,
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

    describe('to report each top-level selection over the cap', () => {
      const cases = [
        {
          input: { maxDocumentDepth: 1 },
          documentCases: [
            {
              input: { document: parse('{ alpha { id } }') },
              expected: [
                expect.objectContaining({
                  message: '103.X000.003 {"depth":2,"maxDocumentDepth":1}',
                }),
              ],
            },
          ],
        },
        {
          input: { maxDocumentDepth: 2 },
          documentCases: [
            {
              input: { document: parse('{ alpha { ...AlphaFields } } fragment AlphaFields on Alpha { child { id } }') },
              expected: [
                expect.objectContaining({
                  message: '103.X000.003 {"depth":3,"maxDocumentDepth":2}',
                }),
              ],
            },
            {
              input: { document: parse('{ alpha { ... on Alpha { child { id } } } }') },
              expected: [
                expect.objectContaining({
                  message: '103.X000.003 {"depth":3,"maxDocumentDepth":2}',
                }),
              ],
            },
          ],
        },
        {
          input: { maxDocumentDepth: 3 },
          documentCases: [
            {
              input: { document: parse('{ alpha { child { child { id } } } }') },
              expected: [
                expect.objectContaining({
                  message: '103.X000.003 {"depth":4,"maxDocumentDepth":3}',
                }),
              ],
            },
            {
              input: { document: parse('mutation { saveAlpha { child { child { id } } } }') },
              expected: [
                expect.objectContaining({
                  message: '103.X000.003 {"depth":4,"maxDocumentDepth":3}',
                }),
              ],
            },
            {
              input: { document: parse('{ one: alpha { child { child { id } } } two: alpha { child { child { name } } } }') },
              expected: [
                expect.objectContaining({
                  message: '103.X000.003 {"depth":4,"maxDocumentDepth":3}',
                }),
                expect.objectContaining({
                  message: '103.X000.003 {"depth":4,"maxDocumentDepth":3}',
                }),
              ],
            },
          ],
        },
      ]

      describe.each(cases)('maxDocumentDepth: $input.maxDocumentDepth', ({ input, documentCases }) => {
        test.each(documentCases)('query: $input.document.loc.source.body', ({ input: documentInput, expected }) => {
          const validator = DocumentTooDeepGraphqlRequestValidator.create({
            ErrorCtor: DocumentTooDeepError,

            maxDocumentDepth: input.maxDocumentDepth,
          })

          const rule = validator.defineValidationRule()

          const received = validate(
            schemaTally,
            documentInput.document,
            [
              ...specifiedRules,
              rule,
            ]
          )

          expect(received)
            .toStrictEqual(expected)
        })
      })
    })
  })
})

describe('DocumentTooDeepGraphqlRequestValidator', () => {
  describe('#reportDeepSelections()', () => {
    const DocumentTooDeepError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })

    /** @type {GraphqlType.ValidationContext} */
    const mockContext = /** @type {*} */ ({
      getFragment: () => null,
      reportError: () => {},
    })

    describe('to report each selection over the cap', () => {
      const cases = [
        {
          input: { maxDocumentDepth: 1 },
          documentCases: [
            {
              input: { document: parse('{ alpha { id } beta }') },
              expected: expect.objectContaining({
                message: '103.X000.003 {"depth":2,"maxDocumentDepth":1}',
              }),
            },
          ],
        },
        {
          input: { maxDocumentDepth: 3 },
          documentCases: [
            {
              input: { document: parse('{ alpha { child { child { id } } } }') },
              expected: expect.objectContaining({
                message: '103.X000.003 {"depth":4,"maxDocumentDepth":3}',
              }),
            },
            {
              input: { document: parse('{ alpha { child { child { id } } } beta }') },
              expected: expect.objectContaining({
                message: '103.X000.003 {"depth":4,"maxDocumentDepth":3}',
              }),
            },
          ],
        },
      ]

      describe.each(cases)('maxDocumentDepth: $input.maxDocumentDepth', ({ input, documentCases }) => {
        test.each(documentCases)('query: $input.document.loc.source.body', ({ input: documentInput, expected }) => {
          const reportErrorSpy = jest.spyOn(mockContext, 'reportError')

          const [definitionNode] = documentInput.document.definitions

          /** @type {import('graphql').OperationDefinitionNode} */
          const definition = /** @type {*} */ (definitionNode)

          const validator = DocumentTooDeepGraphqlRequestValidator.create({
            ErrorCtor: DocumentTooDeepError,

            maxDocumentDepth: input.maxDocumentDepth,
          })

          validator.reportDeepSelections({
            context: mockContext,
            selections: definition.selectionSet.selections,
          })

          expect(reportErrorSpy)
            .toHaveBeenCalledWith(expected)
        })
      })
    })

    describe('to report nothing', () => {
      const cases = [
        {
          input: { maxDocumentDepth: 1 },
          documentCases: [
            {
              input: {
                document: parse('{ beta }'),
              },
            },
          ],
        },
        {
          input: { maxDocumentDepth: 10 },
          documentCases: [
            {
              input: {
                document: parse('{ alpha { child { id } } }'),
              },
            },
            {
              input: {
                document: parse('{ alpha { id } beta }'),
              },
            },
          ],
        },
      ]

      describe.each(cases)('maxDocumentDepth: $input.maxDocumentDepth', ({ input, documentCases }) => {
        test.each(documentCases)('query: $input.document.loc.source.body', ({ input: documentInput }) => {
          const reportErrorSpy = jest.spyOn(mockContext, 'reportError')

          const [definitionNode] = documentInput.document.definitions

          /** @type {import('graphql').OperationDefinitionNode} */
          const definition = /** @type {*} */ (definitionNode)

          const validator = DocumentTooDeepGraphqlRequestValidator.create({
            ErrorCtor: DocumentTooDeepError,

            maxDocumentDepth: input.maxDocumentDepth,
          })

          validator.reportDeepSelections({
            context: mockContext,
            selections: definition.selectionSet.selections,
          })

          expect(reportErrorSpy)
            .not
            .toHaveBeenCalled()
        })
      })
    })

    describe('to report nothing where no cap is declared', () => {
      const cases = [
        { input: { document: parse('{ alpha { child { child { id } } } }') } },
        { input: { document: parse('{ alpha { id } beta }') } },
      ]

      test.each(cases)('query: $input.document.loc.source.body', ({ input }) => {
        const reportErrorSpy = jest.spyOn(mockContext, 'reportError')

        const [definitionNode] = input.document.definitions

        /** @type {import('graphql').OperationDefinitionNode} */
        const definition = /** @type {*} */ (definitionNode)

        const validator = DocumentTooDeepGraphqlRequestValidator.create({
          ErrorCtor: DocumentTooDeepError,
          maxDocumentDepth: null,
        })

        validator.reportDeepSelections({
          context: mockContext,
          selections: definition.selectionSet.selections,
        })

        expect(reportErrorSpy)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('to report the error converted for the context', () => {
      const cases = [
        {
          input: { maxDocumentDepth: 1 },
          documentCases: [
            {
              input: {
                document: parse('{ alpha { id } }'),
              },
            },
            {
              input: {
                document: parse('{ alpha { id } beta }'),
              },
            },
          ],
        },
        {
          input: { maxDocumentDepth: 3 },
          documentCases: [
            {
              input: {
                document: parse('{ alpha { child { child { id } } } }'),
              },
            },
            {
              input: {
                document: parse('{ alpha { child { child { name } } } }'),
              },
            },
          ],
        },
      ]

      describe.each(cases)('maxDocumentDepth: $input.maxDocumentDepth', ({ input, documentCases }) => {
        test.each(documentCases)('query: $input.document.loc.source.body', ({ input: documentInput }) => {
          const expected = expect.objectContaining({
            originalError: expect.any(DocumentTooDeepError),
          })

          const reportErrorSpy = jest.spyOn(mockContext, 'reportError')

          const [definitionNode] = documentInput.document.definitions

          /** @type {import('graphql').OperationDefinitionNode} */
          const definition = /** @type {*} */ (definitionNode)

          const validator = DocumentTooDeepGraphqlRequestValidator.create({
            ErrorCtor: DocumentTooDeepError,

            maxDocumentDepth: input.maxDocumentDepth,
          })

          validator.reportDeepSelections({
            context: mockContext,
            selections: definition.selectionSet.selections,
          })

          expect(reportErrorSpy)
            .toHaveBeenCalledWith(expect.any(GraphQLError))
          expect(reportErrorSpy)
            .toHaveBeenCalledWith(expected)
        })
      })
    })
  })
})

describe('DocumentTooDeepGraphqlRequestValidator', () => {
  describe('#deepMeasureSelectionDepth()', () => {
    const DocumentTooDeepError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })

    /** @type {GraphqlType.ValidationContext} */
    const noFragmentContext = /** @type {*} */ ({
      getFragment: () => null,
    })

    describe('to measure the depth a selection reaches', () => {
      const cases = [
        {
          input: {
            document: parse('{ beta }'),
          },
          expected: 1,
        },
        {
          input: {
            document: parse('{ alpha { id } }'),
          },
          expected: 2,
        },
        {
          input: {
            document: parse('{ alpha { child { id } } }'),
          },
          expected: 3,
        },
        {
          input: {
            document: parse('{ alpha { id child { id child { id } } } }'),
          },
          expected: 4,
        },
        {
          input: {
            document: parse('{ ... on Query { beta } }'), // inline fragment adds no level
          },
          expected: 1,
        },
      ]

      test.each(cases)('query: $input.document.loc.source.body', ({ input, expected }) => {
        const [definitionNode] = input.document.definitions

        /** @type {import('graphql').OperationDefinitionNode} */
        const definition = /** @type {*} */ (definitionNode)
        const [selection] = definition.selectionSet.selections

        const validator = DocumentTooDeepGraphqlRequestValidator.create({
          ErrorCtor: DocumentTooDeepError,
          maxDocumentDepth: 10,
        })

        const args = {
          context: noFragmentContext,
          selection,
        }

        const received = validator.deepMeasureSelectionDepth(args)

        expect(received)
          .toBe(expected)
      })
    })
    describe('to measure the fragment it spreads', () => {
      const cases = [
        {
          input: {
            document: parse('{ alpha { ...AlphaFields } } fragment AlphaFields on Alpha { id }'),
          },
          expected: 1,
        },
        {
          input: {
            document: parse('{ alpha { ...AlphaFields } } fragment AlphaFields on Alpha { child { id } }'),
          },
          expected: 2,
        },
        {
          input: {
            document: parse('{ alpha { ...AlphaFields } } fragment AlphaFields on Alpha { child { child { id } } }'),
          },
          expected: 3,
        },
      ]

      test.each(cases)('query: $input.document.loc.source.body', ({ input, expected }) => {
        const [operationDefinition, fragmentDefinition] = /** @type {[import('graphql').OperationDefinitionNode, import('graphql').FragmentDefinitionNode]} */ (input.document.definitions)

        const [alphaField] = /** @type {ReadonlyArray<{ selectionSet: import('graphql').SelectionSetNode }>} */ (
          operationDefinition.selectionSet.selections
        )

        const [fragmentSpread] = /** @type {ReadonlyArray<import('graphql').FragmentSpreadNode>} */ (
          alphaField.selectionSet.selections
        )

        /** @type {GraphqlType.ValidationContext} */
        const mockContext = /** @type {*} */ ({
          getFragment: () => fragmentDefinition,
        })

        const validator = DocumentTooDeepGraphqlRequestValidator.create({
          ErrorCtor: DocumentTooDeepError,

          maxDocumentDepth: 10,
        })

        const args = {
          context: mockContext,
          selection: fragmentSpread,
          visitedFragmentNames: [],
        }

        const received = validator.deepMeasureSelectionDepth(args)

        expect(received)
          .toBe(expected)
      })
    })

    describe('to be zero where the fragment is already on the path', () => {
      const cases = [
        {
          input: {
            visitedFragmentNames: [
              'AlphaFields',
            ],
          },
        },
        {
          input: {
            visitedFragmentNames: [
              'BetaFields',
              'AlphaFields',
            ],
          },
        },
      ]

      test.each(cases)('visitedFragmentNames: $input.visitedFragmentNames', ({ input }) => {
        const document = parse('{ alpha { ...AlphaFields } } fragment AlphaFields on Alpha { child { id } }')

        const [operationDefinition, fragmentDefinition] = /** @type {[import('graphql').OperationDefinitionNode, import('graphql').FragmentDefinitionNode]} */ (document.definitions)

        const [alphaField] = /** @type {ReadonlyArray<{ selectionSet: import('graphql').SelectionSetNode }>} */ (
          operationDefinition.selectionSet.selections
        )

        const [fragmentSpread] = /** @type {ReadonlyArray<import('graphql').FragmentSpreadNode>} */ (
          alphaField.selectionSet.selections
        )

        /** @type {GraphqlType.ValidationContext} */
        const mockContext = /** @type {*} */ ({
          getFragment: () => fragmentDefinition,
        })

        const validator = DocumentTooDeepGraphqlRequestValidator.create({
          ErrorCtor: DocumentTooDeepError,

          maxDocumentDepth: 10,
        })

        const args = {
          context: mockContext,
          selection: fragmentSpread,
          visitedFragmentNames: input.visitedFragmentNames,
        }

        const received = validator.deepMeasureSelectionDepth(args)

        expect(received)
          .toBe(0)
      })
    })

    describe('to be zero where the context resolves no fragment', () => {
      const cases = [
        {
          input: {
            document: parse('{ alpha { ...AlphaFields } } fragment AlphaFields on Alpha { child { id } }'),
          },
        },
        {
          input: {
            document: parse('{ alpha { ...BetaFields } } fragment BetaFields on Alpha { child { child { id } } }'),
          },
        },
      ]

      test.each(cases)('query: $input.document.loc.source.body', ({ input }) => {
        const [operationDefinition] = /** @type {ReadonlyArray<import('graphql').OperationDefinitionNode>} */ (
          input.document.definitions
        )

        const [alphaField] = /** @type {ReadonlyArray<{ selectionSet: import('graphql').SelectionSetNode }>} */ (
          operationDefinition.selectionSet.selections
        )

        const [fragmentSpread] = /** @type {ReadonlyArray<import('graphql').FragmentSpreadNode>} */ (
          alphaField.selectionSet.selections
        )

        /** @type {GraphqlType.ValidationContext} */
        const mockContext = /** @type {*} */ ({
          getFragment: () => null,
        })

        const validator = DocumentTooDeepGraphqlRequestValidator.create({
          ErrorCtor: DocumentTooDeepError,

          maxDocumentDepth: 10,
        })

        const args = {
          context: mockContext,
          selection: fragmentSpread,
          visitedFragmentNames: [],
        }

        const received = validator.deepMeasureSelectionDepth(args)

        expect(received)
          .toBe(0)
      })
    })
  })
})

describe('DocumentTooDeepGraphqlRequestValidator', () => {
  describe('#isVisitedFragmentSpread()', () => {
    const DocumentTooDeepError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })

    describe('should be truthy', () => {
      const cases = [
        {
          input: {
            document: parse('{ alpha { ...AlphaFields } } fragment AlphaFields on Alpha { id }'),
            visitedFragmentNames: [
              'AlphaFields',
            ],
          },
        },
        {
          input: {
            document: parse('{ alpha { ...BetaFields } } fragment BetaFields on Alpha { id }'),
            visitedFragmentNames: [
              'AlphaFields',
              'BetaFields',
            ],
          },
        },
      ]

      test.each(cases)('visitedFragmentNames: $input.visitedFragmentNames', ({ input }) => {
        const [operationDefinition] = /** @type {ReadonlyArray<import('graphql').OperationDefinitionNode>} */ (
          input.document.definitions
        )

        const [alphaField] = /** @type {ReadonlyArray<{ selectionSet: import('graphql').SelectionSetNode }>} */ (
          operationDefinition.selectionSet.selections
        )

        const [selection] = alphaField.selectionSet.selections

        const validator = DocumentTooDeepGraphqlRequestValidator.create({
          ErrorCtor: DocumentTooDeepError,

          maxDocumentDepth: 10,
        })

        const args = {
          selection,
          visitedFragmentNames: input.visitedFragmentNames,
        }

        const received = validator.isVisitedFragmentSpread(args)

        expect(received)
          .toBeTruthy()
      })
    })

    describe('should be falsy', () => {
      const cases = [
        {
          input: {
            document: parse('{ alpha { ...AlphaFields } } fragment AlphaFields on Alpha { id }'),
            visitedFragmentNames: [],
          },
        },
        {
          input: {
            document: parse('{ alpha { ...AlphaFields } } fragment AlphaFields on Alpha { id }'),
            visitedFragmentNames: [
              'BetaFields',
            ],
          },
        },
        {
          input: {
            document: parse('{ alpha { id } }'), // a field spreads nothing
            visitedFragmentNames: [
              'AlphaFields',
            ],
          },
        },
        {
          input: {
            document: parse('{ alpha { ... on Alpha { id } } }'), // an inline fragment spreads nothing
            visitedFragmentNames: [
              'AlphaFields',
            ],
          },
        },
      ]

      test.each(cases)('query: $input.document.loc.source.body', ({ input }) => {
        const [operationDefinition] = /** @type {ReadonlyArray<import('graphql').OperationDefinitionNode>} */ (
          input.document.definitions
        )

        const [alphaField] = /** @type {ReadonlyArray<{ selectionSet: import('graphql').SelectionSetNode }>} */ (
          operationDefinition.selectionSet.selections
        )

        const [selection] = alphaField.selectionSet.selections

        const validator = DocumentTooDeepGraphqlRequestValidator.create({
          ErrorCtor: DocumentTooDeepError,

          maxDocumentDepth: 10,
        })

        const args = {
          selection,
          visitedFragmentNames: input.visitedFragmentNames,
        }

        const received = validator.isVisitedFragmentSpread(args)

        expect(received)
          .toBeFalsy()
      })
    })
  })
})

describe('DocumentTooDeepGraphqlRequestValidator', () => {
  describe('#measureSelectionSetDepth()', () => {
    const DocumentTooDeepError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })

    /** @type {GraphqlType.ValidationContext} */
    const mockContext = /** @type {*} */ ({
      getFragment: () => null,
    })

    describe('to measure the deepest selection it holds', () => {
      const cases = [
        {
          input: {
            document: parse('{ beta }'),
          },
          expected: 1,
        },
        {
          input: {
            document: parse('{ beta alpha { child { id } } }'),
          },
          expected: 3,
        },
        {
          input: {
            document: parse('{ alpha { child { id } } beta }'),
          },
          expected: 3,
        },
      ]

      test.each(cases)('query: $input.document.loc.source.body', ({ input, expected }) => {
        const [definitionNode] = input.document.definitions

        /** @type {import('graphql').OperationDefinitionNode} */
        const definition = /** @type {*} */ (definitionNode)

        const validator = DocumentTooDeepGraphqlRequestValidator.create({
          ErrorCtor: DocumentTooDeepError,
          maxDocumentDepth: 10,
        })

        const received = validator.measureSelectionSetDepth({
          context: mockContext,
          selectionSet: definition.selectionSet,
          visitedFragmentNames: [],
        })

        expect(received)
          .toBe(expected)
      })
    })

    describe('to be zero where it holds no selection', () => {
      const cases = [
        {
          input: {
            selectionSet: null,
          },
        },
        {
          input: {
            selectionSet: /** @type {*} */ ({
              kind: Kind.SELECTION_SET,
              selections: [],
            }),
          },
        },
      ]

      test.each(cases)('selectionSet: $input.selectionSet', ({ input }) => {
        const validator = DocumentTooDeepGraphqlRequestValidator.create({
          ErrorCtor: DocumentTooDeepError,
          maxDocumentDepth: 10,
        })

        const args = {
          context: mockContext,
          selectionSet: input.selectionSet,
          visitedFragmentNames: [],
        }

        const received = validator.measureSelectionSetDepth(args)

        expect(received)
          .toBe(0)
      })
    })
  })
})

describe('DocumentTooDeepGraphqlRequestValidator', () => {
  describe('#exceedsMaxDocumentDepth()', () => {
    const DocumentTooDeepError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })

    describe('should be truthy', () => {
      const cases = [
        {
          input: { maxDocumentDepth: 3 },
          depthCases: [
            {
              input: {
                depth: 4,
              },
            },
            {
              input: {
                depth: 100,
              },
            },
          ],
        },
        {
          input: { maxDocumentDepth: 1 },
          depthCases: [
            {
              input: {
                depth: 2,
              },
            },
            {
              input: {
                depth: 10,
              },
            },
          ],
        },
      ]

      describe.each(cases)('maxDocumentDepth: $input.maxDocumentDepth', ({ input, depthCases }) => {
        test.each(depthCases)('depth: $input.depth', ({ input: depthInput }) => {
          const validator = DocumentTooDeepGraphqlRequestValidator.create({
            ErrorCtor: DocumentTooDeepError,

            maxDocumentDepth: input.maxDocumentDepth,
          })

          const received = validator.exceedsMaxDocumentDepth(depthInput)

          expect(received)
            .toBeTruthy()
        })
      })
    })

    describe('should be falsy', () => {
      const cases = [
        {
          input: { maxDocumentDepth: 3 },
          depthCases: [
            {
              input: {
                depth: 3,
              },
            },
            {
              input: {
                depth: 1,
              },
            },
          ],
        },
        {
          input: { maxDocumentDepth: null },
          depthCases: [
            {
              input: {
                depth: 4,
              },
            },
            {
              input: {
                depth: 100,
              },
            },
          ],
        },
      ]

      describe.each(cases)('maxDocumentDepth: $input.maxDocumentDepth', ({ input, depthCases }) => {
        test.each(depthCases)('depth: $input.depth', ({ input: depthInput }) => {
          const validator = DocumentTooDeepGraphqlRequestValidator.create({
            ErrorCtor: DocumentTooDeepError,

            maxDocumentDepth: input.maxDocumentDepth,
          })

          const received = validator.exceedsMaxDocumentDepth(depthInput)

          expect(received)
            .toBeFalsy()
        })
      })
    })
  })
})
