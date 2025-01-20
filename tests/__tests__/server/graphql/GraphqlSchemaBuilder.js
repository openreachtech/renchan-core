import {
  GraphQLSchema,
  GraphQLScalarType,
} from 'graphql'

import GraphqlSchemaBuilder from '../../../../lib/server/graphql/GraphqlSchemaBuilder.js'
import GraphqlResolversBuilder from '../../../../lib/server/graphql/resolvers/GraphqlResolversBuilder.js'
import ScalarHashBuilder from '../../../../lib/server/graphql/scalars/ScalarHashBuilder.js'

import CustomerGraphqlServerEngine from '../../../../app/server/graphql/CustomerGraphqlServerEngine.js'
import AdminGraphqlServerEngine from '../../../../app/server/graphql/AdminGraphqlServerEngine.js'

describe('GraphqlSchemaBuilder', () => {
  describe('constructor', () => {
    describe('to keep parameters', () => {
      describe('#engine', () => {
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

          const builder = new GraphqlSchemaBuilder({
            engine,
          })

          expect(builder)
            .toHaveProperty('engine', engine)
        })
      })
    })
  })
})

describe('GraphqlSchemaBuilder', () => {
  describe('.create()', () => {
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

        const builder = GraphqlSchemaBuilder.create({
          engine,
        })

        expect(builder)
          .toBeInstanceOf(GraphqlSchemaBuilder)
      })
    })

    describe('to call constructor', () => {
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
        const argsTally = {
          engine,
        }

        const SpyClass = globalThis.constructorSpy.spyOn(GraphqlSchemaBuilder)

        SpyClass.create(argsTally)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(argsTally)
      })
    })
  })
})

describe('GraphqlSchemaBuilder', () => {
  describe('.get:ResolversBuilder', () => {
    test('to be fixed value', () => {
      const actual = GraphqlSchemaBuilder.ResolversBuilder

      expect(actual)
        .toEqual(GraphqlResolversBuilder)
    })
  })
})

describe('GraphqlSchemaBuilder', () => {
  describe('.get:ScalarsBuilder', () => {
    test('to be fixed value', () => {
      const actual = GraphqlSchemaBuilder.ScalarsBuilder

      expect(actual)
        .toEqual(ScalarHashBuilder)
    })
  })
})

describe('GraphqlSchemaBuilder', () => {
  describe('#get:Ctor', () => {
    describe('to be own Class', () => {
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

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const args = {
          engine,
        }
        const builder = GraphqlSchemaBuilder.create(args)

        const actual = builder.Ctor

        expect(actual)
          .toBe(GraphqlSchemaBuilder) // same reference
      })
    })
  })
})

describe('GraphqlSchemaBuilder', () => {
  describe('#buildSchema()', () => {
    describe('to be instance of GraphQLSchema', () => {
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

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params }) => {
        const engine = await params.Engine.createAsync()

        const args = {
          engine,
        }
        const builder = GraphqlSchemaBuilder.create(args)

        const actual = await builder.buildSchema()

        expect(actual)
          .toBeInstanceOf(GraphQLSchema)
      })
    })
  })
})

describe('GraphqlSchemaBuilder', () => {
  describe('#loadSchemaTypeDefs()', () => {
    describe('to be string of SchemaTypeDefs', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
          expected: 'customer: Customer!',
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
          expected: 'admin: Admin!',
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
        const engine = await params.Engine.createAsync()

        const args = {
          engine,
        }
        const builder = GraphqlSchemaBuilder.create(args)

        const actual = await builder.loadSchemaTypeDefs()

        expect(actual)
          .toContain(expected)
      })
    })
  })
})

describe('GraphqlSchemaBuilder', () => {
  describe('#buildResolverHash()', () => {
    describe('to be resolver hash', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
          expected: {
            Query: {
              chatMessages: expect.any(Function),
              chatRooms: expect.any(Function),
              companySponsors: expect.any(Function),
              curriculums: expect.any(Function),
              customer: expect.any(Function),
              customerAmounts: expect.any(Function),
              messages: expect.any(Function),
            },
            Mutation: {
              createChatRoom: expect.any(Function),
              postAppointment: expect.any(Function),
              renewAccessToken: expect.any(Function),
              sendChatMessage: expect.any(Function),
              signIn: expect.any(Function),
              signUp: expect.any(Function),
              uploadArrayImages: expect.any(Function),
              uploadCustomerForumPostImage: expect.any(Function),
              uploadDeepPropertyImages: expect.any(Function),
              uploadImage: expect.any(Function),
            },
            Subscription: {
              onReceiveMessage: {
                subscribe: expect.any(Function),
                resolve: expect.any(Function),
              },
            },
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
          expected: {
            Query: {
              assets: expect.any(Function),
              customers: expect.any(Function),
            },
            Mutation: {
              signIn: expect.any(Function),
              signUp: expect.any(Function),
            },
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
        const engine = await params.Engine.createAsync()

        const args = {
          engine,
        }
        const builder = GraphqlSchemaBuilder.create(args)

        const actual = await builder.buildResolverHash()

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('GraphqlSchemaBuilder', () => {
  describe('#buildCustomScalarHash()', () => {
    describe('to be scalar hash', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
          expected: {
            BigNumber: expect.any(GraphQLScalarType),
            DateTime: expect.any(GraphQLScalarType),
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
          expected: {
            DateTime: expect.any(GraphQLScalarType),
          },
        },
      ]

      test.each(cases)('Engine: $params.EngineCtor.name', async ({ params, expected }) => {
        const engine = await params.Engine.createAsync()

        const args = {
          engine,
        }
        const builder = GraphqlSchemaBuilder.create(args)

        const actual = await builder.buildCustomScalarHash()

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})
