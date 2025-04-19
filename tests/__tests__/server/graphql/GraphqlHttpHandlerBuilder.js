import {
  GraphQLSchema,
} from 'graphql'

import {
  createHandler,
} from 'graphql-http/lib/use/express'

import {
  applyMiddleware,
} from 'graphql-middleware'

import GraphqlHttpHandlerBuilder from '../../../../lib/server/graphql/GraphqlHttpHandlerBuilder.js'
import GraphqlSchemaBuilder from '../../../../lib/server/graphql/GraphqlSchemaBuilder.js'
import AdminGraphqlServerEngine from '../../../../app/server/graphql/AdminGraphqlServerEngine.js'
import CustomerGraphqlServerEngine from '../../../../app/server/graphql/CustomerGraphqlServerEngine.js'
import BaseGraphqlContext from '../../../../lib/server/graphql/contexts/BaseGraphqlContext.js'

import CustomerGraphqlContext from '../../../../app/server/graphql/contexts/CustomerGraphqlContext.js'
import AdminGraphqlContext from '../../../../app/server/graphql/contexts/AdminGraphqlContext.js'
import GraphqlResolvedParcelPorter from '../../../../lib/server/graphql/post-workers/GraphqlResolvedParcelPorter.js'
import GraphqlPostWorkerHashBuilder from '../../../../lib/server/graphql/post-workers/GraphqlPostWorkerHashBuilder.js'

describe('GraphqlHttpHandlerBuilder', () => {
  describe('constructor', () => {
    describe('to keep parameters', () => {
      /** @type {GraphqlType.Schema} */
      const schemaMock = /** @type {*} */ ({})

      /** @type {GraphqlType.ContextFactory} */
      const contextFactoryMock = /** @type {*} */ (() => {})

      /** @type {Record<string, any>} */
      const rootValueMock = /** @type {*} */ ({})

      /** @type {import('graphql-http').FormatError} */
      const formatErrorMock = /** @type {*} */ (() => {})

      /** @type {import('graphql-http').HandlerOptions['validationRules']} */
      const validationRulesMock = /** @type {*} */ ([])

      const onResolvedMock = /** @type {*} */ (async parcel => {})

      /** @type {Record<string, (parcel: GraphqlType.OnResolvedParcel) => Promise<void>>} */
      const postWorkerHashMock = /** @type {*} */ ({})

      const parcelPorterMock = GraphqlResolvedParcelPorter.create()

      describe('#schema', () => {
        /**
         * @type {Array<{
         *   params: {
         *     schema: GraphqlType.Schema
         *   }
         * }>}
         */
        const cases = /** @type {*} */ ([
          {
            params: {
              schema: {
                description: 'alpha schema',
              },
            },
          },
          {
            params: {
              schema: {
                description: 'beta schema',
              },
            },
          },
        ])

        test.each(cases)('schema: $param.schema.description', ({ params }) => {
          const args = {
            schema: params.schema,
            context: contextFactoryMock,
            rootValue: rootValueMock,
            formatError: formatErrorMock,
            validationRules: validationRulesMock,

            onResolved: onResolvedMock,
            postWorkerHash: postWorkerHashMock,
            parcelPorter: parcelPorterMock,
          }

          const actual = new GraphqlHttpHandlerBuilder(args)

          expect(actual)
            .toHaveProperty('schema', params.schema)
        })
      })

      describe('#context', () => {
        function alphaFactory () {
          // noop
        }

        function betaFactory () {
          // noop
        }

        /**
         * @type {Array<{
         *   params: {
         *     context: GraphqlType.Context
         *   }
         * }>}
         */
        const cases = /** @type {*} */ ([
          {
            params: {
              context: alphaFactory,
            },
          },
          {
            params: {
              context: betaFactory,
            },
          },
        ])

        test.each(cases)('context: $param.context.name', ({ params }) => {
          const args = {
            schema: schemaMock,
            context: params.context,
            rootValue: rootValueMock,
            formatError: formatErrorMock,
            validationRules: validationRulesMock,

            onResolved: onResolvedMock,
            postWorkerHash: postWorkerHashMock,
            parcelPorter: parcelPorterMock,
          }

          const actual = new GraphqlHttpHandlerBuilder(args)

          expect(actual)
            .toHaveProperty('context', params.context)
        })
      })

      describe('#rootValue', () => {
        /**
         * @type {Array<{
         *   params: {
         *     rootValue: Record<string, any>
         *   }
         * }>}
         */
        const cases = /** @type {*} */ ([
          {
            params: {
              rootValue: {
                customer: () => {},
              },
            },
          },
          {
            params: {
              rootValue: {
                admin: () => {},
              },
            },
          },
        ])

        test.each(cases)('rootValue: $param.rootValue', ({ params }) => {
          const args = {
            schema: schemaMock,
            context: contextFactoryMock,
            rootValue: params.rootValue,
            formatError: formatErrorMock,
            validationRules: validationRulesMock,

            onResolved: onResolvedMock,
            postWorkerHash: postWorkerHashMock,
            parcelPorter: parcelPorterMock,
          }

          const actual = new GraphqlHttpHandlerBuilder(args)

          expect(actual)
            .toHaveProperty('rootValue', params.rootValue)
        })
      })

      describe('#formatError', () => {
        /**
         * @type {Array<{
         *   params: {
         *     formatError: import('graphql-http').FormatError
         *   }
         * }>}
         */
        const cases = /** @type {*} */ ([
          {
            params: {
              formatError: () => {
                throw new Error('alpha error')
              },
            },
          },
          {
            params: {
              formatError: () => {
                throw new Error('beta error')
              },
            },
          },
        ])

        test.each(cases)('rootValue: $param.rootValue', ({ params }) => {
          const args = {
            schema: schemaMock,
            context: contextFactoryMock,
            rootValue: rootValueMock,
            formatError: params.formatError,
            validationRules: validationRulesMock,

            onResolved: onResolvedMock,
            postWorkerHash: postWorkerHashMock,
            parcelPorter: parcelPorterMock,
          }

          const actual = new GraphqlHttpHandlerBuilder(args)

          expect(actual)
            .toHaveProperty('formatError', params.formatError)
        })
      })

      describe('#validationRules', () => {
        /**
         * @type {Array<{
         *   params: {
         *     validationRules: import('graphql-http').HandlerOptions['validationRules']
         *   }
         * }>}
         */
        const cases = /** @type {*} */ ([
          {
            params: {
              validationRules: [
                () => {},
              ],
            },
          },
          {
            params: {
              validationRules: () => {},
            },
          },
        ])

        test.each(cases)('rootValue: $param.rootValue', ({ params }) => {
          const args = {
            schema: schemaMock,
            context: contextFactoryMock,
            rootValue: rootValueMock,
            formatError: formatErrorMock,
            validationRules: params.validationRules,

            onResolved: onResolvedMock,
            postWorkerHash: postWorkerHashMock,
            parcelPorter: parcelPorterMock,
          }

          const actual = new GraphqlHttpHandlerBuilder(args)

          expect(actual)
            .toHaveProperty('validationRules', params.validationRules)
        })
      })

      describe('#onResolved', () => {
        /**
         * @type {Array<{
         *   label: string
         *   params: {
         *     onResolved: (parcel: GraphqlType.OnResolvedParcel) => Promise<void>
         *   }
         * }>}
         */
        const cases = /** @type {*} */ ([
          {
            label: 'first case',
            params: {
              onResolved: async () => {},
            },
          },
          {
            label: 'second case',
            params: {
              onResolved: async () => {},
            },
          },
        ])

        test.each(cases)('$label', ({ params }) => {
          const args = {
            schema: schemaMock,
            context: contextFactoryMock,
            rootValue: rootValueMock,
            formatError: formatErrorMock,
            validationRules: validationRulesMock,

            onResolved: params.onResolved,
            postWorkerHash: postWorkerHashMock,
            parcelPorter: parcelPorterMock,
          }

          const actual = new GraphqlHttpHandlerBuilder(args)

          expect(actual)
            .toHaveProperty('onResolved', params.onResolved)
        })
      })

      describe('#postWorkerHash', () => {
        /**
         * @type {Array<{
         *   params: {
         *     postWorkerHash: Record<string, (parcel: GraphqlType.OnResolvedParcel) => Promise<void>>
         *   }
         * }>}
         */
        const cases = /** @type {*} */ ([
          {
            params: {
              postWorkerHash: {
                alpha: async parcel => {},
              },
            },
          },
          {
            params: {
              postWorkerHash: {
                beta: async parcel => {},
              },
            },
          },
        ])

        test.each(cases)('postWorkerHash: $param.postWorkerHash', ({ params }) => {
          const args = {
            schema: schemaMock,
            context: contextFactoryMock,
            rootValue: rootValueMock,
            formatError: formatErrorMock,
            validationRules: validationRulesMock,

            onResolved: onResolvedMock,
            postWorkerHash: params.postWorkerHash,
            parcelPorter: parcelPorterMock,
          }

          const actual = new GraphqlHttpHandlerBuilder(args)

          expect(actual)
            .toHaveProperty('postWorkerHash', params.postWorkerHash)
        })
      })

      describe('#parcelPorter', () => {
        /**
         * @type {Array<{
         *   params: {
         *     parcelPorter: GraphqlResolvedParcelPorter
         *   }
         * }>}
         */
        const cases = /** @type {*} */ ([
          {
            params: {
              parcelPorter: GraphqlResolvedParcelPorter.create({
                parcelMap: new WeakMap(),
              }),
            },
          },
          {
            params: {
              parcelPorter: GraphqlResolvedParcelPorter.create(),
            },
          },
        ])

        test.each(cases)('parcelPorter: $params.parcelPorter', ({ params }) => {
          const args = {
            schema: schemaMock,
            context: contextFactoryMock,
            rootValue: rootValueMock,
            formatError: formatErrorMock,
            validationRules: validationRulesMock,

            onResolved: onResolvedMock,
            postWorkerHash: postWorkerHashMock,
            parcelPorter: params.parcelPorter,
          }

          const actual = new GraphqlHttpHandlerBuilder(args)

          expect(actual)
            .toHaveProperty('parcelPorter', params.parcelPorter)
        })
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('.create()', () => {
    /** @type {GraphqlType.ContextFactory} */
    const contextFactoryMock = /** @type {*} */ (() => {})

    /** @type {Record<string, any>} */
    const rootValueMock = /** @type {*} */ ({})

    /** @type {import('graphql-http').FormatError} */
    const formatErrorMock = /** @type {*} */ (() => {})

    /** @type {import('graphql-http').HandlerOptions['validationRules']} */
    const validationRulesMock = /** @type {*} */ ([])

    const onResolvedMock = /** @type {*} */ (async parcel => {})

    /** @type {Record<string, (parcel: GraphqlType.OnResolvedParcel) => Promise<void>>} */
    const postWorkerHashMock = /** @type {*} */ ({})

    const parcelPorterMock = GraphqlResolvedParcelPorter.create()

    describe('to be instance of own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     schema: GraphqlType.Schema
       *   }
       * }>}
       */
      const cases = /** @type {*} */ ([
        {
          params: {
            schema: {
              description: 'alpha schema',
            },
          },
        },
        {
          params: {
            schema: {
              description: 'beta schema',
            },
          },
        },
      ])

      test.each(cases)('schema: $param.schema.description', ({ params }) => {
        const args = {
          schema: params.schema,
          context: contextFactoryMock,
          rootValue: rootValueMock,
          formatError: formatErrorMock,
          validationRules: validationRulesMock,

          onResolved: onResolvedMock,
          postWorkerHash: postWorkerHashMock,
          parcelPorter: parcelPorterMock,
        }

        const actual = GraphqlHttpHandlerBuilder.create(args)

        expect(actual)
          .toBeInstanceOf(GraphqlHttpHandlerBuilder)
      })
    })

    describe('to call constructor', () => {
      /**
       * @type {Array<{
       *   params: {
       *     schema: GraphqlType.Schema
       *   }
       * }>}
       */
      const cases = /** @type {*} */ ([
        {
          params: {
            schema: {
              description: 'alpha schema',
            },
          },
        },
        {
          params: {
            schema: {
              description: 'beta schema',
            },
          },
        },
      ])

      test.each(cases)('schema: $param.schema.description', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(GraphqlHttpHandlerBuilder)

        const args = {
          schema: params.schema,
          context: contextFactoryMock,
          rootValue: rootValueMock,
          formatError: formatErrorMock,
          validationRules: validationRulesMock,

          onResolved: onResolvedMock,
          postWorkerHash: postWorkerHashMock,
          parcelPorter: parcelPorterMock,
        }

        SpyClass.create(args)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('.createAsync()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const actual = await GraphqlHttpHandlerBuilder.createAsync({
          engine,
        })

        expect(actual)
          .toBeInstanceOf(GraphqlHttpHandlerBuilder)
      })
    })

    describe('to call .create()', () => {
      describe('with default value of .extraCreateHandlerParams()', () => {
        const cases = [
          {
            params: {
              Engine: CustomerGraphqlServerEngine,
              schema: {},
              contextFactory: () => {},
            },
          },
          {
            params: {
              Engine: AdminGraphqlServerEngine,
              schema: {},
              contextFactory: () => {},
            },
          },
        ]

        test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
          const engine = await params.Engine.createAsync()

          const engineExpected = {
            engine,
          }

          /** @type {GraphqlType.Schema} */
          const schemaTally = /** @type {*} */ (params.schema)

          /** @type {GraphqlType.ContextFactory} */
          const contextFactoryTally = /** @type {*} */ (
            params.contextFactory
          )

          const onResolvedTally = /** @type {*} */ (async parcel => {})
          const postWorkerHashTally = /** @type {*} */ ({})
          const parcelPorterTally = GraphqlResolvedParcelPorter.create()

          const buildSchemaSpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'buildSchema')
            .mockResolvedValue(schemaTally)
          const generateContextFactorySpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'generateContextFactory')
            .mockReturnValue(contextFactoryTally)
          const defineOnResolvedSpy = jest.spyOn(engine, 'defineOnResolved')
            .mockReturnValue(onResolvedTally)
          const generateOnResolvedSchemaHashSpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'generateOnResolvedSchemaHash')
            .mockReturnValue(postWorkerHashTally)
          const createParcelPorterSpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'createParcelPorter')
            .mockReturnValue(parcelPorterTally)

          const createSpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'create')

          const argsExpected = {
            schema: schemaTally,
            context: contextFactoryTally,

            onResolved: onResolvedTally,
            postWorkerHash: postWorkerHashTally,
            parcelPorter: parcelPorterTally,
          }

          const args = {
            engine,
          }
          await GraphqlHttpHandlerBuilder.createAsync(args)

          expect(createSpy)
            .toHaveBeenCalledWith(argsExpected)

          expect(buildSchemaSpy)
            .toHaveBeenCalledWith(engineExpected)
          expect(generateContextFactorySpy)
            .toHaveBeenCalledWith(engineExpected)
          expect(defineOnResolvedSpy)
            .toHaveBeenCalledWith()
          expect(generateOnResolvedSchemaHashSpy)
            .toHaveBeenCalledWith(engineExpected)
          expect(createParcelPorterSpy)
            .toHaveBeenCalledWith()
        })
      })

      describe('with custom value of .extraCreateHandlerParams()', () => {
        const cases = [
          {
            params: {
              Engine: CustomerGraphqlServerEngine,
              contextFactory: async () => {},
              extraCreateHandlerParams: {
                rootValue: {
                  amounts: async () => {},
                },
                formatError: () => {},
                validationRules: [],
              },
            },
          },
          {
            params: {
              Engine: AdminGraphqlServerEngine,
              extraCreateHandlerParams: {
                // rootValue: {
                //   customers: async () => {},
                // },
                formatError: () => {},
                validationRules: [],
              },
            },
          },
          {
            params: {
              Engine: CustomerGraphqlServerEngine,
              extraCreateHandlerParams: {
                rootValue: {
                  amounts: async () => {},
                },
                // formatError: () => {},
                validationRules: [],
              },
            },
          },
          {
            params: {
              Engine: AdminGraphqlServerEngine,
              extraCreateHandlerParams: {
                rootValue: {
                  customers: async () => {},
                },
                formatError: () => {},
                // validationRules: [],
              },
            },
          },
        ]

        test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
          const engine = await params.Engine.createAsync()

          /** @type {GraphqlType.Schema} */
          const schemaTally = /** @type {*} */ (params.schema)

          /** @type {GraphqlType.ContextFactory} */
          const contextFactoryTally = /** @type {*} */ (
            params.contextFactory
          )

          const GraphqlHttpHandlerBuilderSpy = class extends GraphqlHttpHandlerBuilder {
            /** @override */
            static get extraCreateHandlerParams () {
              return params.extraCreateHandlerParams
            }
          }

          const onResolvedTally = /** @type {*} */ (async parcel => {})
          const postWorkerHashTally = /** @type {*} */ ({})
          const parcelPorterTally = GraphqlResolvedParcelPorter.create()

          jest.spyOn(GraphqlHttpHandlerBuilder, 'buildSchema')
            .mockResolvedValue(schemaTally)
          jest.spyOn(GraphqlHttpHandlerBuilder, 'generateContextFactory')
            .mockReturnValue(contextFactoryTally)
          jest.spyOn(engine, 'defineOnResolved')
            .mockReturnValue(onResolvedTally)
          jest.spyOn(GraphqlHttpHandlerBuilder, 'generateOnResolvedSchemaHash')
            .mockReturnValue(postWorkerHashTally)
          jest.spyOn(GraphqlHttpHandlerBuilder, 'createParcelPorter')
            .mockReturnValue(parcelPorterTally)

          const createSpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'create')

          const argsExpected = {
            ...params.extraCreateHandlerParams,
            schema: params.schema,
            context: params.contextFactory,

            onResolved: onResolvedTally,
            postWorkerHash: postWorkerHashTally,
            parcelPorter: parcelPorterTally,
          }

          const args = {
            engine,
          }
          await GraphqlHttpHandlerBuilderSpy.createAsync(args)

          expect(createSpy)
            .toHaveBeenCalledWith(argsExpected)
        })
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('.generateOnResolvedSchemaHash()', () => {
    describe('to be PostWorker handler hash', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
          expected: {
            companySponsors: expect.any(Function),
            signIn: expect.any(Function),
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
          expected: {
            customers: expect.any(Function),
            signIn: expect.any(Function),
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params, expected }) => {
        const engine = await params.Engine.createAsync()

        const actual = await GraphqlHttpHandlerBuilder.generateOnResolvedSchemaHash({
          engine,
        })

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to call members', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const expectedArgs = {
          engine,
        }

        const buildOnResolvedSchemaHashSpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'createPostWorkerHashBuilder')

        await GraphqlHttpHandlerBuilder.generateOnResolvedSchemaHash({
          engine,
        })

        expect(buildOnResolvedSchemaHashSpy)
          .toHaveBeenCalledWith(expectedArgs)
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('.createPostWorkerHashBuilder()', () => {
    describe('to be instance of GraphqlPostWorkerHashBuilder', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const actual = await GraphqlHttpHandlerBuilder.createPostWorkerHashBuilder({
          engine,
        })

        expect(actual)
          .toBeInstanceOf(GraphqlPostWorkerHashBuilder)
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('.createParcelPorter()', () => {
    describe('to be equivalent to instance of GraphqlResolvedParcelPorter', () => {
      test('with no parameters', () => {
        const actual = GraphqlHttpHandlerBuilder.createParcelPorter()

        expect(actual)
          .toBeInstanceOf(GraphqlResolvedParcelPorter)
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('.get:SchemaBuilder', () => {
    test('to be bridge class', () => {
      const actual = GraphqlHttpHandlerBuilder.SchemaBuilder

      expect(actual)
        .toBe(GraphqlSchemaBuilder)
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('.get:extraCreateHandlerParams', () => {
    test('to be fixed value', () => {
      const actual = GraphqlHttpHandlerBuilder.extraCreateHandlerParams

      expect(actual)
        .toStrictEqual({})
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('.buildSchema()', () => {
    const cases = [
      {
        params: {
          Engine: CustomerGraphqlServerEngine,
        },
      },
      {
        params: {
          Engine: AdminGraphqlServerEngine,
        },
      },
    ]

    describe('to be instance of GraphqlSchema', () => {
      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const actual = await GraphqlHttpHandlerBuilder.buildSchema({
          engine,
        })

        expect(actual)
          .toBeInstanceOf(GraphQLSchema)
      })
    })

    describe('to call GraphqlSchemaBuilder.create()', () => {
      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const expected = {
          engine,
        }

        const createSpy = jest.spyOn(GraphqlSchemaBuilder, 'create')

        await GraphqlHttpHandlerBuilder.buildSchema({
          engine,
        })

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('.generateContextFactory()', () => {
    const cases = [
      {
        params: {
          Engine: CustomerGraphqlServerEngine,
        },
      },
      {
        params: {
          Engine: AdminGraphqlServerEngine,
        },
      },
    ]

    describe('to be function', () => {
      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const actual = GraphqlHttpHandlerBuilder.generateContextFactory({
          engine,
        })

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('to call member from returned function', () => {
      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const factory = GraphqlHttpHandlerBuilder.generateContextFactory({
          engine,
        })

        const buildContextSpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'buildContext')

        /** @type {ExpressType.Request} */
        const reqTally = /** @type {*} */ ({})
        const paramsTally = {}

        const expected = {
          expressRequest: reqTally,
          requestParams: paramsTally,
          engine,
        }

        const actual = await factory(reqTally, paramsTally)

        expect(actual)
          .toBeInstanceOf(BaseGraphqlContext)
        expect(buildContextSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('.get:applyMiddleware', () => {
    describe('to be fixed value', () => {
      test('as applyMiddleware()', () => {
        const actual = GraphqlHttpHandlerBuilder.applyMiddleware

        expect(actual)
          .toBe(applyMiddleware) // same reference
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('.get:createHandler', () => {
    describe('to be fixed value', () => {
      test('as createHandler()', () => {
        const actual = GraphqlHttpHandlerBuilder.createHandler

        expect(actual)
          .toBe(createHandler) // same reference
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('.buildContext()', () => {
    /** @type {ExpressType.Request} */
    const expressRequestTally = /** @type {*} */ ({})

    /** @type {GraphqlType.HttpRequestParams} */
    const requestParamsTally = /** @type {*} */ ({})

    describe('to be instance of GraphqlContext', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
          expected: CustomerGraphqlContext,
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
          expected: AdminGraphqlContext,
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params, expected }) => {
        const engine = await params.Engine.createAsync()

        const args = {
          expressRequest: expressRequestTally,
          requestParams: requestParamsTally,
          engine,
        }

        const actual = await GraphqlHttpHandlerBuilder.buildContext(args)

        expect(actual)
          .toBeInstanceOf(expected)
      })
    })

    describe('to call Engine.Context.createAsync()', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const createAsyncSpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'buildContext')

        const engine = await params.Engine.createAsync()

        const argsTally = {
          expressRequest: expressRequestTally,
          requestParams: requestParamsTally,
          engine,
        }

        await GraphqlHttpHandlerBuilder.buildContext(argsTally)

        expect(createAsyncSpy)
          .toHaveBeenCalledWith(argsTally)
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('#get:Ctor', () => {
    describe('to be fixed value', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const builder = await GraphqlHttpHandlerBuilder.createAsync({
          engine,
        })

        const actual = builder.Ctor

        expect(actual)
          .toBe(GraphqlHttpHandlerBuilder)
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('#buildHandler()', () => {
    const cases = [
      {
        params: {
          Engine: CustomerGraphqlServerEngine,
        },
      },
      {
        params: {
          Engine: AdminGraphqlServerEngine,
        },
      },
    ]

    describe('to be function', () => {
      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const builder = await GraphqlHttpHandlerBuilder.createAsync({
          engine,
        })

        const actual = builder.buildHandler()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('to call members', () => {
      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const builder = await GraphqlHttpHandlerBuilder.createAsync({
          engine,
        })

        const expressRequestTally = /** @type {*} */ ({})
        const expressResponseTally = /** @type {*} */ ({
          on: () => {},
        })
        const nextTally = /** @type {*} */ (() => {})

        const schemaTally = /** @type {*} */ ({})
        const onListenerTally = /** @type {*} */ (async () => {})

        const graphqlHandlerSpy = /** @type {*} */ (
          jest.fn()
        )
        const generateInterceptedSchemaSpy = jest.spyOn(builder, 'generateInterceptedSchema')
          .mockReturnValue(schemaTally)
        const createHandlerSpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'createHandler')
          .mockReturnValue(graphqlHandlerSpy)
        const defineOnFinishHandlerSpy = jest.spyOn(builder, 'defineOnFinishHandler')
          .mockReturnValue(onListenerTally)
        const onSpy = jest.spyOn(expressResponseTally, 'on')

        const createHandlerExpectedArgs = {
          schema: schemaTally,
          context: builder.context,
          rootValue: builder.rootValue,
          formatError: builder.formatError,
          validationRules: builder.validationRules,
        }
        const defineOnFinishHandlerExpectedArgs = {
          expressRequest: expressRequestTally,
        }

        const actualGraphqlHandler = builder.buildHandler()

        actualGraphqlHandler(
          expressRequestTally,
          expressResponseTally,
          nextTally
        )

        expect(generateInterceptedSchemaSpy)
          .toHaveBeenCalledWith()
        expect(createHandlerSpy)
          .toHaveBeenCalledWith(createHandlerExpectedArgs)
        expect(defineOnFinishHandlerSpy)
          .toHaveBeenCalledWith(defineOnFinishHandlerExpectedArgs)
        expect(onSpy)
          .toHaveBeenCalledWith(
            'finish',
            onListenerTally
          )
        expect(graphqlHandlerSpy)
          .toHaveBeenCalledWith(
            expressRequestTally,
            expressResponseTally,
            nextTally
          )
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('#defineOnResolveMiddleware()', () => {
    const engineCases = [
      {
        params: {
          Engine: CustomerGraphqlServerEngine,
        },
      },
      {
        params: {
          Engine: AdminGraphqlServerEngine,
        },
      },
    ]

    describe('to be Function', () => {
      test.each(engineCases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const builder = await GraphqlHttpHandlerBuilder.createAsync({
          engine,
        })

        const actual = builder.defineOnResolveMiddleware()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('behavior of defined function', () => {
      /** @type {ExpressType.Request} */
      const alphaExpressRequest = /** @type {*} */ ({
        headers: {
          'x-renchan-access-token': 'alpha',
        },
      })

      /** @type {ExpressType.Request} */
      const betaExpressRequest = /** @type {*} */ ({
        headers: {
          'x-renchan-access-token': 'beta',
        },
      })

      /** @type {GraphqlType.ResolverInputInformation} */
      const informationMock = /** @type {*} */ ({})

      /**
       * @type {Array<{
       *   args: {
       *     variables: GraphqlType.ResolverInputVariables
       *     context: GraphqlType.Context
       *   }
       * }>}
       */
      const cases = /** @type {*} */ ([
        {
          args: {
            variables: {
              value: 100001,
            },
            context: {
              expressRequest: {
                raw: alphaExpressRequest,
              },
            },
          },
        },
        {
          args: {
            variables: {
              value: 100002,
            },
            context: {
              expressRequest: {
                raw: betaExpressRequest,
              },
            },
          },
        },
      ])

      describe.each(engineCases)('Engine: $params.Engine.name', ({ params }) => {
        describe('as rootValue', () => {
          describe('to return output', () => {
            test.each(cases)('value: $args.variables.value', async ({ args }) => {
              const engine = await params.Engine.createAsync()

              const builder = await GraphqlHttpHandlerBuilder.createAsync({
                engine,
              })

              const outputTally = {
                schemaName: Symbol('tally'),
              }

              const saveParcelSpy = jest.spyOn(builder.parcelPorter, 'saveParcel')

              const resolveSpy = jest.fn(async () => outputTally)

              const resolveMiddleware = builder.defineOnResolveMiddleware()

              const expectedArgs = {
                expressRequest: args.context.expressRequest['raw'],
                parcel: {
                  variables: args.variables,
                  context: args.context,
                  information: informationMock,
                  response: {
                    output: outputTally,
                    error: null,
                  },
                },
              }

              const expectedResolveArgs = [
                null, // parent
                args.variables,
                args.context,
                informationMock,
              ]

              const output = await resolveMiddleware(
                resolveSpy,
                null, // parent
                args.variables,
                args.context,
                informationMock
              )

              expect(output)
                .toEqual(outputTally)

              expect(resolveSpy)
                .toHaveBeenCalledWith(...expectedResolveArgs)
              expect(saveParcelSpy)
                .toHaveBeenCalledWith(expectedArgs)
            })
          })

          describe('to throw error', () => {
            test.each(cases)('value: $args.variables.value', async ({ args }) => {
              const engine = await params.Engine.createAsync()

              const builder = await GraphqlHttpHandlerBuilder.createAsync({
                engine,
              })

              const errorTally = new Error('tally')

              const saveParcelSpy = jest.spyOn(builder.parcelPorter, 'saveParcel')

              const resolveSpy = jest.fn(async () => {
                throw errorTally
              })

              const resolveMiddleware = builder.defineOnResolveMiddleware()

              const expectedArgs = {
                expressRequest: args.context.expressRequest['raw'],
                parcel: {
                  variables: args.variables,
                  context: args.context,
                  information: informationMock,
                  response: {
                    output: null,
                    error: errorTally,
                  },
                },
              }

              const expectedResolveArgs = [
                null, // parent
                args.variables,
                args.context,
                informationMock,
              ]

              await expect(
                async () => resolveMiddleware(
                  resolveSpy,
                  null, // parent
                  args.variables,
                  args.context,
                  informationMock
                )
              )
                .rejects
                .toThrow(errorTally)

              expect(resolveSpy)
                .toHaveBeenCalledWith(...expectedResolveArgs)
              expect(saveParcelSpy)
                .toHaveBeenCalledWith(expectedArgs)
            })
          })
        })

        describe('as not rootValue', () => {
          describe('to return output', () => {
            test.each(cases)('value: $args.variables.value', async ({ args }) => {
              const engine = await params.Engine.createAsync()

              const builder = await GraphqlHttpHandlerBuilder.createAsync({
                engine,
              })

              const parentTally = {
                value: Symbol('parent'),
              }
              const outputTally = {
                schemaName: Symbol('tally'),
              }

              const saveParcelSpy = jest.spyOn(builder.parcelPorter, 'saveParcel')

              const resolveSpy = jest.fn(async () => outputTally)

              const resolveMiddleware = builder.defineOnResolveMiddleware()

              const expectedArgs = {
                expressRequest: args.context.expressRequest['raw'],
                parcel: {
                  variables: args.variables,
                  context: args.context,
                  information: informationMock,
                  response: {
                    output: outputTally,
                    error: null,
                  },
                },
              }

              const expectedResolveArgs = [
                parentTally,
                args.variables,
                args.context,
                informationMock,
              ]

              const output = await resolveMiddleware(
                resolveSpy,
                parentTally,
                args.variables,
                args.context,
                informationMock
              )

              expect(output)
                .toEqual(outputTally)

              expect(resolveSpy)
                .toHaveBeenCalledWith(...expectedResolveArgs)
              expect(saveParcelSpy)
                .not
                .toHaveBeenCalledWith(expectedArgs)
            })
          })

          describe('to throw error', () => {
            test.each(cases)('value: $args.variables.value', async ({ args }) => {
              const engine = await params.Engine.createAsync()

              const builder = await GraphqlHttpHandlerBuilder.createAsync({
                engine,
              })

              const parentTally = {
                value: Symbol('parent'),
              }
              const errorTally = new Error('tally')

              const saveParcelSpy = jest.spyOn(builder.parcelPorter, 'saveParcel')

              const resolveSpy = jest.fn(async () => {
                throw errorTally
              })

              const resolveMiddleware = builder.defineOnResolveMiddleware()

              const expectedArgs = {
                expressRequest: args.context.expressRequest['raw'],
                parcel: {
                  variables: args.variables,
                  context: args.context,
                  information: informationMock,
                  response: {
                    output: null,
                    error: errorTally,
                  },
                },
              }

              const expectedResolveArgs = [
                parentTally,
                args.variables,
                args.context,
                informationMock,
              ]

              await expect(
                async () => resolveMiddleware(
                  resolveSpy,
                  parentTally,
                  args.variables,
                  args.context,
                  informationMock
                )
              )
                .rejects
                .toThrow(errorTally)

              expect(resolveSpy)
                .toHaveBeenCalledWith(...expectedResolveArgs)
              expect(saveParcelSpy)
                .not
                .toHaveBeenCalledWith(expectedArgs)
            })
          })
        })
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('#extractIndividualOnResolved()', () => {
    describe('to be function', () => {
      /**
       * @type {Array<{
       *   params: {
       *     Engine: GraphqlType.ServerEngineCtor
       *   }
       *   functionCases: Array<{
       *     information: GraphqlType.ResolverInputInformation
       *   }>
       *   nullCases: Array<{
       *     information: GraphqlType.ResolverInputInformation
       *   }>
       * }>}
       */
      const engineCases = /** @type {*} */ ([
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
          functionCases: [
            {
              information: {
                fieldName: 'companySponsors',
              },
            },
            {
              information: {
                fieldName: 'signIn',
              },
            },
          ],
          nullCases: [
            {
              information: {
                fieldName: 'unknown',
              },
            },
            {
              information: {
                fieldName: 'customers',
              },
            },
          ],
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
          functionCases: [
            {
              information: {
                fieldName: 'customers',
              },
            },
            {
              information: {
                fieldName: 'signIn',
              },
            },
          ],
          nullCases: [
            {
              information: {
                fieldName: 'unknown',
              },
            },
            {
              information: {
                fieldName: 'companySponsors',
              },
            },
          ],
        },
      ])

      describe.each(engineCases)('Engine: $params.Engine.name', ({ params, functionCases, nullCases }) => {
        test.each(functionCases)('fieldName: $information.fieldName', async ({ information }) => {
          const engine = await params.Engine.createAsync()

          const builder = await GraphqlHttpHandlerBuilder.createAsync({
            engine,
          })

          const actual = builder.extractIndividualOnResolved({
            information,
          })

          expect(actual)
            .toBeInstanceOf(Function)
        })

        test.each(nullCases)('fieldName: $information.fieldName', async ({ information }) => {
          const engine = await params.Engine.createAsync()

          const builder = await GraphqlHttpHandlerBuilder.createAsync({
            engine,
          })

          const actual = builder.extractIndividualOnResolved({
            information,
          })

          expect(actual)
            .toBeNull()
        })
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('#defineOnFinishHandler()', () => {
    /**
     * @type {Array<{
     *   params: {
     *     Engine: GraphqlType.ServerEngineCtor
     *   }
     *   individualOnResolvedCases: Array<{
     *     information: GraphqlType.ResolverInputInformation
     *   }>
     * }>}
     */
    const engineCases = /** @type {Array<*>} */ ([
      {
        params: {
          Engine: CustomerGraphqlServerEngine,
        },
        individualOnResolvedCases: [
          {
            information: {
              fieldName: 'companySponsors',
            },
          },
          {
            information: {
              fieldName: 'signIn',
            },
          },
        ],
      },
      {
        params: {
          Engine: AdminGraphqlServerEngine,
        },
        individualOnResolvedCases: [
          {
            information: {
              fieldName: 'customers',
            },
          },
          {
            information: {
              fieldName: 'signIn',
            },
          },
        ],
      },
    ])

    describe('to be function', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params }) => {
        /**
         * @type {Array<{
         *   expressRequest: ExpressType.Request
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            expressRequest: {
              headers: {
                'x-renchan-access-token': 'alpha-access-token',
              },
            },
          },
          {
            expressRequest: {
              headers: {
                'x-renchan-access-token': 'beta-access-token',
              },
            },
          },
        ])

        test.each(cases)('expressRequest: $expressRequest', async ({ expressRequest }) => {
          const engine = await params.Engine.createAsync()

          const builder = await GraphqlHttpHandlerBuilder.createAsync({
            engine,
          })

          const args = {
            expressRequest,
          }

          const actual = builder.defineOnFinishHandler(args)

          expect(actual)
            .toBeInstanceOf(Function)
        })
      })
    })

    describe('behavior of defined function', () => {
      describe.each(engineCases)('Engine: $params.Engine.name', ({ params, individualOnResolvedCases }) => {
        /**
         * @type {Array<{
         *   expressRequest: ExpressType.Request
         * }>}
         */
        const expressCases = /** @type {Array<*>} */ ([
          {
            expressRequest: {
              headers: {
                'x-renchan-access-token': 'alpha-access-token',
              },
            },
          },
          {
            expressRequest: {
              headers: {
                'x-renchan-access-token': 'beta-access-token',
              },
            },
          },
        ])

        describe.each(expressCases)('expressRequest: $expressRequest', ({ expressRequest }) => {
          describe('with parcel', () => {
            /**
             * @type {Array<{
             *   parcel: GraphqlType.OnResolvedParcel
             * }>}
             */
            const cases = /** @type {*} */ ([
              {
                parcel: {
                  variables: {
                    value: 10001,
                  },
                  context: {
                    expressRequest,
                  },
                  response: {
                    output: {
                      names: [
                        'John Doe',
                        'Jane Smith',
                      ],
                    },
                    error: null,
                  },
                },
              },
              {
                parcel: {
                  variables: {
                    value: 10002,
                  },
                  context: {
                    expressRequest,
                  },
                  response: {
                    output: null,
                    error: new Error('tally'),
                  },
                },
              },
            ])

            describe('to call individual onResolved()', () => {
              describe.each(individualOnResolvedCases)('information: $information', ({ information }) => {
                test.each(cases)('parcel: $parcel', async ({ parcel }) => {
                  const engine = await params.Engine.createAsync()

                  const builder = await GraphqlHttpHandlerBuilder.createAsync({
                    engine,
                  })

                  const loadParcelSpy = jest.spyOn(builder.parcelPorter, 'loadParcel')

                  const onResolvedSpy = /** @type {*} */ (
                    jest.fn()
                      .mockImplementation(async () => {})
                  )
                  builder.onResolved = onResolvedSpy // Bad practice, but needed to test

                  const parcelTally = {
                    variables: parcel.variables,
                    context: parcel.context,
                    information,
                    response: parcel.response,
                  }

                  builder.parcelPorter.saveParcel({
                    expressRequest,
                    parcel: parcelTally,
                  })

                  const args = {
                    expressRequest,
                  }
                  const definedOnResolved = builder.defineOnFinishHandler(args)

                  await definedOnResolved()

                  expect(loadParcelSpy)
                    .toHaveBeenCalledWith(args)
                  expect(onResolvedSpy)
                    .toHaveBeenCalledWith(parcelTally)
                })
              })
            })

            describe('not to call individual onResolved()', () => {
              /**
               * @type {Array<{
               *   information: GraphqlType.ResolverInputInformation
               * }>}
               */
              const noIndividualOnResolvedCases = /** @type {Array<*>} */ ([
                {
                  information: {
                    fieldName: 'unknown',
                  },
                },
                {
                  information: {
                    fieldName: 'extra',
                  },
                },
              ])

              describe.each(noIndividualOnResolvedCases)('information: $information', ({ information }) => {
                test.each(cases)('parcel: $parcel', async ({ parcel }) => {
                  const engine = await params.Engine.createAsync()

                  const builder = await GraphqlHttpHandlerBuilder.createAsync({
                    engine,
                  })

                  const loadParcelSpy = jest.spyOn(builder.parcelPorter, 'loadParcel')

                  const onResolvedSpy = /** @type {*} */ (
                    jest.fn()
                      .mockImplementation(async () => {})
                  )
                  builder.onResolved = onResolvedSpy // Bad practice, but needed to test

                  const extractIndividualOnResolvedSpy = jest.spyOn(builder, 'extractIndividualOnResolved')

                  const parcelTally = {
                    variables: parcel.variables,
                    context: parcel.context,
                    information,
                    response: parcel.response,
                  }

                  builder.parcelPorter.saveParcel({
                    expressRequest,
                    parcel: parcelTally,
                  })

                  const extractIndividualOnResolvedExpectedArgs = {
                    information,
                  }

                  const args = {
                    expressRequest,
                  }
                  const definedOnResolved = builder.defineOnFinishHandler(args)

                  await definedOnResolved()

                  expect(loadParcelSpy)
                    .toHaveBeenCalledWith(args)
                  expect(onResolvedSpy)
                    .toHaveBeenCalledWith(parcelTally)
                  expect(extractIndividualOnResolvedSpy)
                    .toHaveBeenCalledWith(extractIndividualOnResolvedExpectedArgs)
                })
              })
            })
          })

          describe('with no parcel', () => {
            describe.each(individualOnResolvedCases)('information: $information', ({ information }) => {
              test('parcel: null', async () => {
                const engine = await params.Engine.createAsync()

                const builder = await GraphqlHttpHandlerBuilder.createAsync({
                  engine,
                })

                const loadParcelSpy = jest.spyOn(builder.parcelPorter, 'loadParcel')

                const onResolvedSpy = /** @type {*} */ (
                  jest.fn()
                    .mockImplementation(async () => {})
                )
                builder.onResolved = onResolvedSpy // Bad practice, but needed to test

                const extractIndividualOnResolvedSpy = jest.spyOn(builder, 'extractIndividualOnResolved')

                const args = {
                  expressRequest,
                }
                const definedOnResolved = builder.defineOnFinishHandler(args)

                await definedOnResolved()

                expect(loadParcelSpy)
                  .toHaveBeenCalledWith(args)
                expect(onResolvedSpy)
                  .not
                  .toHaveBeenCalled()
                expect(extractIndividualOnResolvedSpy)
                  .not
                  .toHaveBeenCalled()
              })
            })
          })
        })
      })
    })
  })
})

describe('GraphqlHttpHandlerBuilder', () => {
  describe('#generateInterceptedSchema()', () => {
    describe('to call members', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const builder = await GraphqlHttpHandlerBuilder.createAsync({
          engine,
        })

        const onResolveMiddlewareTally = async () => {}
        const applyMiddlewareTally = /** @type {*} */ ({
          tally: Symbol('tally'),
        })

        const defineOnResolveMiddlewareSpy = jest.spyOn(builder, 'defineOnResolveMiddleware')
          .mockReturnValue(onResolveMiddlewareTally)
        const applyMiddlewareSpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'applyMiddleware')
          .mockReturnValue(applyMiddlewareTally)

        const actual = builder.generateInterceptedSchema()

        expect(actual)
          .toBe(applyMiddlewareTally) // same reference
        expect(defineOnResolveMiddlewareSpy)
          .toHaveBeenCalledWith()
        expect(applyMiddlewareSpy)
          .toHaveBeenCalledWith(
            builder.schema,
            onResolveMiddlewareTally
          )
      })
    })
  })
})
