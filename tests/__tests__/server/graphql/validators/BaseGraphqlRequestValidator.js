import BaseGraphqlRequestValidator from '../../../../../lib/server/graphql/validators/BaseGraphqlRequestValidator.js'
import BaseGraphqlServerEngine from '../../../../../lib/server/graphql/BaseGraphqlServerEngine.js'
import BaseGraphqlShare from '../../../../../lib/server/graphql/contexts/BaseGraphqlShare.js'
import RenchanGraphqlError from '../../../../../lib/server/graphql/errors/RenchanGraphqlError.js'

describe('BaseGraphqlRequestValidator', () => {
  describe('constructor', () => {
    const AlphaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.002',
    })
    const BetaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })

    describe('to keep properties', () => {
      describe('#ErrorCtor', () => {
        const cases = [
          { input: { ErrorCtor: AlphaError } },
          { input: { ErrorCtor: BetaError } },
        ]

        test.each(cases)('ErrorCtor code: $input.ErrorCtor.errorCode', ({ input }) => {
          const received = new BaseGraphqlRequestValidator(input)

          expect(received)
            .toHaveProperty('ErrorCtor', input.ErrorCtor)
        })
      })
    })
  })
})

describe('BaseGraphqlRequestValidator', () => {
  describe('.create()', () => {
    const AlphaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.002',
    })
    const BetaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })

    describe('to return instance', () => {
      const cases = [
        { input: { ErrorCtor: AlphaError } },
        { input: { ErrorCtor: BetaError } },
      ]

      test.each(cases)('ErrorCtor code: $input.ErrorCtor.errorCode', ({ input }) => {
        const received = BaseGraphqlRequestValidator.create(input)

        expect(received)
          .toBeInstanceOf(BaseGraphqlRequestValidator)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        { tally: { ErrorCtor: AlphaError } },
        { tally: { ErrorCtor: BetaError } },
      ]

      test.each(cases)('ErrorCtor code: $tally.ErrorCtor.errorCode', ({ tally }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(BaseGraphqlRequestValidator)

        SpyClass.create(tally)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(tally)
      })
    })
  })
})

describe('BaseGraphqlRequestValidator', () => {
  describe('.createAsync()', () => {
    const AlphaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.002',
    })
    const BetaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })
    const GammaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.004',
    })
    const DeltaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.005',
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
     *   containingErrorNameCases: Array<{
     *     override: {
     *       errorName: string
     *     }
     *     expected: {
     *       ErrorCtor: typeof RenchanGraphqlError
     *     }
     *   }>
     *   notContainingErrorNameCases: Array<{
     *     override: {
     *       errorName: string
     *     }
     *   }>
     * }>}
     */
    const cases = [
      {
        input: {
          errorHash: {
            Alpha: AlphaError,
            Beta: BetaError,
            Unknown: UnknownError,
          },
        },
        containingErrorNameCases: [
          {
            override: {
              errorName: 'Alpha',
            },
            expected: {
              ErrorCtor: AlphaError,
            },
          },
          {
            override: {
              errorName: 'Beta',
            },
            expected: {
              ErrorCtor: BetaError,
            },
          },
        ],
        notContainingErrorNameCases: [
          {
            override: {
              errorName: 'Gamma',
            },
          },
          {
            override: {
              errorName: 'Delta',
            },
          },
        ],
      },
      {
        input: {
          errorHash: {
            Gamma: GammaError,
            Delta: DeltaError,
            Unknown: UnknownError,
          },
        },
        containingErrorNameCases: [
          {
            override: {
              errorName: 'Gamma',
            },
            expected: {
              ErrorCtor: GammaError,
            },
          },
          {
            override: {
              errorName: 'Delta',
            },
            expected: {
              ErrorCtor: DeltaError,
            },
          },
        ],
        notContainingErrorNameCases: [
          {
            override: {
              errorName: 'Alpha',
            },
          },
          {
            override: {
              errorName: 'Beta',
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
        containingErrorNameCases: [
          {
            override: {
              errorName: 'Unknown',
            },
            expected: {
              ErrorCtor: UnknownError,
            },
          },
        ],
        notContainingErrorNameCases: [
          {
            override: {
              errorName: 'Alpha',
            },
          },
          {
            override: {
              errorName: 'Gamma',
            },
          },
        ],
      },
    ]

    describe('to be instance of own class', () => {
      describe.each(cases)('errorHash: $input.errorHash', ({ input, containingErrorNameCases, notContainingErrorNameCases }) => {
        describe('when the errorHash contains the error name', () => {
          test.each(containingErrorNameCases)('errorName: $override.errorName', async ({ override }) => {
            const engine = new BaseGraphqlServerEngine({
              config: mockConfig,
              share: mockShare,
              errorHash: input.errorHash,
            })

            jest.spyOn(BaseGraphqlRequestValidator, 'errorName', 'get')
              .mockReturnValue(override.errorName)

            const received = await BaseGraphqlRequestValidator.createAsync({
              engine,
            })

            expect(received)
              .toBeInstanceOf(BaseGraphqlRequestValidator)
          })
        })

        describe('when the errorHash does not contain the error name', () => {
          test.each(notContainingErrorNameCases)('errorName: $override.errorName', async ({ override }) => {
            const engine = new BaseGraphqlServerEngine({
              config: mockConfig,
              share: mockShare,
              errorHash: input.errorHash,
            })

            jest.spyOn(BaseGraphqlRequestValidator, 'errorName', 'get')
              .mockReturnValue(override.errorName)

            const received = await BaseGraphqlRequestValidator.createAsync({
              engine,
            })

            expect(received)
              .toBeInstanceOf(BaseGraphqlRequestValidator)
          })
        })
      })
    })

    describe('to call constructor', () => {
      describe.each(cases)('errorHash: $input.errorHash', ({ input, containingErrorNameCases, notContainingErrorNameCases }) => {
        describe('when the errorHash contains the error name', () => {
          test.each(containingErrorNameCases)('errorName: $override.errorName', async ({ override, expected }) => {
            const engine = new BaseGraphqlServerEngine({
              config: mockConfig,
              share: mockShare,
              errorHash: input.errorHash,
            })

            jest.spyOn(BaseGraphqlRequestValidator, 'errorName', 'get')
              .mockReturnValue(override.errorName)

            const SpyClass = globalThis.constructorSpy.spyOn(BaseGraphqlRequestValidator)

            await SpyClass.createAsync({
              engine,
            })

            expect(SpyClass.__spy__)
              .toHaveBeenCalledWith(expected)
          })
        })

        describe('when the errorHash does not contain the error name', () => {
          test.each(notContainingErrorNameCases)('errorName: $override.errorName', async ({ override }) => {
            const expected = {
              ErrorCtor: UnknownError,
            }

            const engine = new BaseGraphqlServerEngine({
              config: mockConfig,
              share: mockShare,
              errorHash: input.errorHash,
            })

            jest.spyOn(BaseGraphqlRequestValidator, 'errorName', 'get')
              .mockReturnValue(override.errorName)

            const SpyClass = globalThis.constructorSpy.spyOn(BaseGraphqlRequestValidator)

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
})

describe('BaseGraphqlRequestValidator', () => {
  describe('.get:errorName', () => {
    describe('to throw error', () => {
      const cases = [
        {
          input: {
            ValidatorCtor: BaseGraphqlRequestValidator,
          },
          expected: '101.X000.001 {"memberName":"BaseGraphqlRequestValidator.get:errorName"}',
        },
        {
          input: {
            ValidatorCtor: class AlphaGraphqlRequestValidator extends BaseGraphqlRequestValidator {},
          },
          expected: '101.X000.001 {"memberName":"AlphaGraphqlRequestValidator.get:errorName"}',
        },
      ]

      test.each(cases)('ValidatorCtor: $input.ValidatorCtor.name', ({ input, expected }) => {
        expect(() => input.ValidatorCtor.errorName)
          .toThrow(expected)
      })
    })
  })
})

describe('BaseGraphqlRequestValidator', () => {
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

    const mockShare = BaseGraphqlShare.create({})

    describe('should be truthy', () => {
      const cases = [
        {
          input: {
            ValidatorCtor: BaseGraphqlRequestValidator,
          },
        },
        {
          input: {
            ValidatorCtor: class GammaGraphqlRequestValidator extends BaseGraphqlRequestValidator {},
          },
        },
      ]

      test.each(cases)('ValidatorCtor: $input.ValidatorCtor.name', ({ input }) => {
        const engine = new BaseGraphqlServerEngine({
          config: mockConfig,
          share: mockShare,
          errorHash: {},
        })

        const received = input.ValidatorCtor.isAcceptable({
          engine,
        })

        expect(received)
          .toBeTruthy()
      })
    })
  })
})

describe('BaseGraphqlRequestValidator', () => {
  describe('.resolveErrorCtor()', () => {
    const AlphaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.002',
    })
    const BetaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })
    const GammaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.004',
    })
    const DeltaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.005',
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
     *   containingErrorNameCases: Array<{
     *     override: {
     *       errorName: string
     *     }
     *     expected: typeof RenchanGraphqlError
     *   }>
     *   notContainingErrorNameCases: Array<{
     *     override: {
     *       errorName: string
     *     }
     *   }>
     * }>}
     */
    const cases = [
      {
        input: {
          errorHash: {
            Alpha: AlphaError,
            Beta: BetaError,
            Unknown: UnknownError,
          },
        },
        containingErrorNameCases: [
          {
            override: {
              errorName: 'Alpha',
            },
            expected: AlphaError,
          },
          {
            override: {
              errorName: 'Beta',
            },
            expected: BetaError,
          },
        ],
        notContainingErrorNameCases: [
          {
            override: {
              errorName: 'Gamma',
            },
          },
          {
            override: {
              errorName: 'Delta',
            },
          },
        ],
      },
      {
        input: {
          errorHash: {
            Gamma: GammaError,
            Delta: DeltaError,
            Unknown: UnknownError,
          },
        },
        containingErrorNameCases: [
          {
            override: {
              errorName: 'Gamma',
            },
            expected: GammaError,
          },
          {
            override: {
              errorName: 'Delta',
            },
            expected: DeltaError,
          },
        ],
        notContainingErrorNameCases: [
          {
            override: {
              errorName: 'Alpha',
            },
          },
          {
            override: {
              errorName: 'Beta',
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
        containingErrorNameCases: [
          {
            override: {
              errorName: 'Unknown',
            },
            expected: UnknownError,
          },
        ],
        notContainingErrorNameCases: [
          {
            override: {
              errorName: 'Alpha',
            },
          },
          {
            override: {
              errorName: 'Gamma',
            },
          },
        ],
      },
    ]

    describe('to be the error class the error hash resolves to', () => {
      describe.each(cases)('errorHash: $input.errorHash', ({ input, containingErrorNameCases, notContainingErrorNameCases }) => {
        describe('when the errorHash contains the error name', () => {
          test.each(containingErrorNameCases)('errorName: $override.errorName', ({ override, expected }) => {
            const engine = new BaseGraphqlServerEngine({
              config: mockConfig,
              share: mockShare,
              errorHash: input.errorHash,
            })

            jest.spyOn(BaseGraphqlRequestValidator, 'errorName', 'get')
              .mockReturnValue(override.errorName)

            const received = BaseGraphqlRequestValidator.resolveErrorCtor({
              engine,
            })

            expect(received)
              .toBe(expected) // same reference
          })
        })

        describe('when the errorHash does not contain the error name', () => {
          test.each(notContainingErrorNameCases)('errorName: $override.errorName', ({ override }) => {
            const expected = UnknownError

            const engine = new BaseGraphqlServerEngine({
              config: mockConfig,
              share: mockShare,
              errorHash: input.errorHash,
            })

            jest.spyOn(BaseGraphqlRequestValidator, 'errorName', 'get')
              .mockReturnValue(override.errorName)

            const received = BaseGraphqlRequestValidator.resolveErrorCtor({
              engine,
            })

            expect(received)
              .toBe(expected) // same reference
          })
        })
      })
    })
  })
})

describe('BaseGraphqlRequestValidator', () => {
  describe('#get:Ctor', () => {
    const AlphaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.002',
    })

    describe('to be fixed value as constructor', () => {
      const AlphaValidator = class extends BaseGraphqlRequestValidator {}

      const cases = [
        { input: { ValidatorCtor: BaseGraphqlRequestValidator } },
        { input: { ValidatorCtor: AlphaValidator } },
      ]

      test.each(cases)('ValidatorCtor: $input.ValidatorCtor.name', ({ input }) => {
        const validator = new input.ValidatorCtor({
          ErrorCtor: AlphaError,
        })

        expect(validator.Ctor)
          .toBe(input.ValidatorCtor) // same reference
      })
    })
  })
})

describe('BaseGraphqlRequestValidator', () => {
  describe('#defineValidationRule()', () => {
    const AlphaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.002',
    })

    describe('to throw error', () => {
      const cases = [
        {
          input: {
            ValidatorCtor: BaseGraphqlRequestValidator,
          },
          expected: '101.X000.001 {"memberName":"BaseGraphqlRequestValidator#defineValidationRule()"}',
        },
        {
          input: {
            ValidatorCtor: class BetaGraphqlRequestValidator extends BaseGraphqlRequestValidator {},
          },
          expected: '101.X000.001 {"memberName":"BetaGraphqlRequestValidator#defineValidationRule()"}',
        },
      ]

      test.each(cases)('ValidatorCtor: $input.ValidatorCtor.name', ({ input, expected }) => {
        const validator = new input.ValidatorCtor({
          ErrorCtor: AlphaError,
        })

        expect(() => validator.defineValidationRule())
          .toThrow(expected)
      })
    })
  })
})

describe('BaseGraphqlRequestValidator', () => {
  describe('#createError()', () => {
    const AlphaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.002',
    })
    const BetaError = RenchanGraphqlError.declareGraphqlError({
      code: '103.X000.003',
    })

    describe('to be the error its endpoint declares', () => {
      const cases = [
        {
          input: {
            ErrorCtor: AlphaError,
            value: null,
          },
          expected: {
            message: '103.X000.002',
          },
        },
        {
          input: {
            ErrorCtor: BetaError,
            value: {
              depth: 11,
              maxDocumentDepth: 10,
            },
          },
          expected: {
            message: '103.X000.003 {"depth":11,"maxDocumentDepth":10}',
          },
        },
      ]

      test.each(cases)('ErrorCtor code: $input.ErrorCtor.errorCode', ({ input, expected }) => {
        const validator = BaseGraphqlRequestValidator.create({
          ErrorCtor: input.ErrorCtor,
        })

        const received = validator.createError({
          value: input.value,
        })

        expect(received)
          .toBeInstanceOf(input.ErrorCtor)
        expect(received)
          .toHaveProperty('message', expected.message)
      })
    })

    describe('to be the error with no value', () => {
      const cases = [
        {
          input: {
            ErrorCtor: AlphaError,
          },
          expected: {
            message: '103.X000.002',
          },
        },
        {
          input: {
            ErrorCtor: BetaError,
          },
          expected: {
            message: '103.X000.003',
          },
        },
      ]

      test.each(cases)('ErrorCtor code: $input.ErrorCtor.errorCode', ({ input, expected }) => {
        const validator = BaseGraphqlRequestValidator.create({
          ErrorCtor: input.ErrorCtor,
        })

        const received = validator.createError({})

        expect(received)
          .toBeInstanceOf(input.ErrorCtor)
        expect(received)
          .toHaveProperty('message', expected.message)
      })
    })
  })
})
