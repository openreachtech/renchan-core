import rootPath from '../../../../../lib/globals/root-path.js'

import SchemaFilesLoader from '../../../../../lib/server/graphql/schemas/SchemaFilesLoader.js'

describe('SchemaFilesLoader', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#schemaPath', () => {
        const cases = [
          {
            params: {
              schemaPath: '/path/to/scalars',
            },
          },
          {
            params: {
              schemaPath: '/path/to/sub-scalars',
            },
          },
        ]

        test.each(cases)('schemaPath: $params.schemaPath', ({ params }) => {
          const loader = new SchemaFilesLoader(params)

          expect(loader)
            .toHaveProperty('schemaPath', params.schemaPath)
        })
      })
    })
  })
})

describe('SchemaFilesLoader', () => {
  describe('.create()', () => {
    const cases = [
      {
        params: {
          schemaPath: '/path/to/scalars',
        },
      },
      {
        params: {
          schemaPath: '/path/to/sub-scalars',
        },
      },
    ]

    describe('to be instance of own class', () => {
      test.each(cases)('schemaPath: $params.schemaPath', ({ params }) => {
        const loader = SchemaFilesLoader.create(params)

        expect(loader)
          .toBeInstanceOf(SchemaFilesLoader)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('schemaPath: $params.schemaPath', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(SchemaFilesLoader)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('SchemaFilesLoader', () => {
  describe('#loadIntegratedSchema()', () => {
    describe('to be loaded text', () => {
      const cases = [
        {
          params: {
            schemaPath: rootPath.to('app/server/graphql/schemas/customer-subscription.graphql'),
          },
          expected: `
type Query {
  customer: Customer!
  messages: [Message!]!

  # for furo boilerplate -------------------------------------------------------
  companySponsors: CompanySponsorsResult!
  curriculums(input: CurriculumsSearchInput!): CurriculumsResult!

  # for subscription -----------------------------------------------------------
  chatMessages (input: ChatMessagesInput!): ChatMessagesResult!
  chatRooms: ChatRoomsResult!

  # for scalar sample ----------------------------------------------------------
  customerAmounts: CustomerAmountsResult!
}`,
        },
        {
          params: {
            schemaPath: rootPath.to('app/server/graphql/schemas/admin-subscription.graphql'),
          },
          expected: `
type Query {
  customers: [Customer!]!
  assets: [Asset!]!
}`,
        },
      ]

      test.each(cases)('schemaPath: $params.schemaPath', async ({ params, expected }) => {
        const loader = SchemaFilesLoader.create(params)

        const actual = await loader.loadIntegratedSchema()

        expect(actual)
          .toContain(expected)
      })
    })
  })
})

describe('SchemaFilesLoader', () => {
  describe('#loadWithSchemasPath()', () => {
    describe('to be loaded text', () => {
      const pathCases = [
        {
          params: {
            schemaPath: rootPath.to('app/server/graphql/schemas/'),
          },
          cases: [
            {
              match: `
type Query {
  customer: Customer!
  messages: [Message!]!

  # for furo boilerplate -------------------------------------------------------
  companySponsors: CompanySponsorsResult!
  curriculums(input: CurriculumsSearchInput!): CurriculumsResult!

  # for subscription -----------------------------------------------------------
  chatMessages (input: ChatMessagesInput!): ChatMessagesResult!
  chatRooms: ChatRoomsResult!

  # for scalar sample ----------------------------------------------------------
  customerAmounts: CustomerAmountsResult!
}`,
            },
            {
              match: `
type Query {
  customers: [Customer!]!
  assets: [Asset!]!
}`,
            },
            {
              match: '## customer-subscription.graphql',
            },
            {
              match: '## admin-subscription.graphql',
            },
          ],
        },
      ]

      describe.each(pathCases)('schemaPath: $params.schemaPath', ({ params, cases }) => {
        const loader = SchemaFilesLoader.create(params)

        test.each(cases)('to contain $match', async ({ match }) => {
          const actual = await loader.loadWithSchemasPath()

          expect(actual)
            .toContain(match)
        })
      })
    })
  })
})
