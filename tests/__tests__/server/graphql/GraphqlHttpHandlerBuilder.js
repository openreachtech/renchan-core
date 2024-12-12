import {
  GraphQLSchema,
} from 'graphql'

import GraphqlHttpHandlerBuilder from '../../../../lib/server/graphql/GraphqlHttpHandlerBuilder.js'
import GraphqlSchemaBuilder from '../../../../lib/server/graphql/GraphqlSchemaBuilder.js'
import AdminGraphqlServerEngine from '../../../../app/server/graphql/AdminGraphqlServerEngine.js'
import CustomerGraphqlServerEngine from '../../../../app/server/graphql/CustomerGraphqlServerEngine.js'
import BaseGraphqlContext from '../../../../lib/server/graphql/contexts/BaseGraphqlContext.js'

import CustomerGraphqlContext from '../../../../app/server/graphql/contexts/CustomerGraphqlContext.js'
import AdminGraphqlContext from '../../../../app/server/graphql/contexts/AdminGraphqlContext.js'

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
          }

          const actual = new GraphqlHttpHandlerBuilder(args)

          expect(actual)
            .toHaveProperty('validationRules', params.validationRules)
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

          const buildSchemaSpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'buildSchema')
            .mockResolvedValue(schemaTally)
          const generateContextFactorySpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'generateContextFactory')
            .mockReturnValue(contextFactoryTally)
          const createSpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'create')

          const argsExpected = {
            schema: schemaTally,
            context: contextFactoryTally,
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
          const argsExpected = {
            ...params.extraCreateHandlerParams,
            schema: params.schema,
            context: params.contextFactory,
          }

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

          jest.spyOn(GraphqlHttpHandlerBuilder, 'buildSchema')
            .mockResolvedValue(schemaTally)
          jest.spyOn(GraphqlHttpHandlerBuilder, 'generateContextFactory')
            .mockReturnValue(contextFactoryTally)

          const createSpy = jest.spyOn(GraphqlHttpHandlerBuilder, 'create')

          const engine = await params.Engine.createAsync()
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
  describe('#buildHandler()', () => {
    describe('to be function', () => {
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

        const actual = builder.buildHandler()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })
  })
})
