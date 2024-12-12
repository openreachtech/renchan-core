import FilterSchemaHashBuilder from '../../../../../lib/server/graphql/resolvers/FilterSchemaHashBuilder.js'

describe('FilterSchemaHashBuilder', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#allowedSchemas', () => {
        const cases = [
          {
            params: {
              allowedSchemas: [
                'customer',
                'products',
              ],
              ignoredSchemas: [
                'products',
              ],
            },
            expected: [
              'customer',
              'products',
            ],
          },
          {
            params: {
              allowedSchemas: [
                'admin',
                'customers',
              ],
              ignoredSchemas: [],
            },
            expected: [
              'admin',
              'customers',
            ],
          },
          {
            params: {
              allowedSchemas: [
                'provider',
                'affiliates',
              ],
              ignoredSchemas: null,
            },
            expected: [
              'provider',
              'affiliates',
            ],
          },
          {
            params: {
              allowedSchemas: null,
              ignoredSchemas: [
                'customers',
              ],
            },
            expected: null,
          },
        ]

        test.each(cases)('allowedSchemas: $params.allowedSchemas', ({ params, expected }) => {
          const builder = new FilterSchemaHashBuilder(params)

          expect(builder)
            .toHaveProperty('allowedSchemas', expected)
        })
      })

      describe('#ignoredSchemas', () => {
        const cases = [
          {
            params: {
              allowedSchemas: [
                'customer',
                'products',
              ],
              ignoredSchemas: [
                'products',
              ],
            },
            expected: [
              'products',
            ],
          },
          {
            params: {
              allowedSchemas: [
                'admin',
                'customers',
              ],
              ignoredSchemas: [],
            },
            expected: [],
          },
          {
            params: {
              allowedSchemas: [
                'provider',
                'affiliates',
              ],
              ignoredSchemas: null,
            },
            expected: null,
          },
          {
            params: {
              allowedSchemas: null,
              ignoredSchemas: [
                'customers',
              ],
            },
            expected: [
              'customers',
            ],
          },
        ]

        test.each(cases)('ignoredSchemas: $params.ignoredSchemas', ({ params, expected }) => {
          const builder = new FilterSchemaHashBuilder(params)

          expect(builder)
            .toHaveProperty('ignoredSchemas', expected)
        })
      })
    })
  })
})

describe('FilterSchemaHashBuilder', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            allowedSchemas: [
              'customer',
              'products',
            ],
            ignoredSchemas: [
              'products',
            ],
          },
        },
        {
          params: {
            allowedSchemas: [
              'admin',
              'customers',
            ],
            ignoredSchemas: [],
          },
        },
        {
          params: {
            allowedSchemas: [
              'provider',
              'affiliates',
            ],
            // ignoredSchemas: [],
          },
        },
        {
          params: {
            // allowedSchemas: [],
            ignoredSchemas: [
              'customers',
            ],
          },
        },
      ]

      test.each(cases)('Resolver prefix: $params.title', ({ params }) => {
        const builder = FilterSchemaHashBuilder.create(params)

        expect(builder)
          .toBeInstanceOf(FilterSchemaHashBuilder)
      })

      test('without params', () => {
        const builder = FilterSchemaHashBuilder.create()

        expect(builder)
          .toBeInstanceOf(FilterSchemaHashBuilder)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            allowedSchemas: [
              'customer',
              'products',
            ],
            ignoredSchemas: [
              'products',
            ],
          },
          expected: {
            allowedSchemas: [
              'customer',
              'products',
            ],
            ignoredSchemas: [
              'products',
            ],
          },
        },
        {
          params: {
            allowedSchemas: [
              'admin',
              'customers',
            ],
            ignoredSchemas: [],
          },
          expected: {
            allowedSchemas: [
              'admin',
              'customers',
            ],
            ignoredSchemas: [],
          },
        },
        {
          params: {
            allowedSchemas: [
              'provider',
              'affiliates',
            ],
            // ignoredSchemas: [],
          },
          expected: {
            allowedSchemas: [
              'provider',
              'affiliates',
            ],
            ignoredSchemas: null,
          },
        },
        {
          params: {
            // allowedSchemas: [],
            ignoredSchemas: [
              'customers',
            ],
          },
          expected: {
            allowedSchemas: null,
            ignoredSchemas: [
              'customers',
            ],
          },
        },
      ]

      test.each(cases)('allowedSchemas: $params.allowedSchemas', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FilterSchemaHashBuilder)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })

      test('without params', () => {
        const expected = {
          allowedSchemas: null,
          ignoredSchemas: null,
        }

        const SpyClass = globalThis.constructorSpy.spyOn(FilterSchemaHashBuilder)

        SpyClass.create()

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('FilterSchemaHashBuilder', () => {
  describe('#buildSchemaHash()', () => {
    const cases = [
      {
        params: {
          allowedSchemas: [
            'alpha',
            'beta',
            'gamma',
            'delta',
          ],
          ignoredSchemas: [
            'beta',
            'gamma',
          ],
          sharedValue: Symbol.for('shared (1)'),
        },
        schemaCases: [
          { schema: 'alpha', expected: Symbol.for('shared (1)') },
          { schema: 'beta', expected: null },
          { schema: 'gamma', expected: null },
          { schema: 'delta', expected: Symbol.for('shared (1)') },
        ],
      },
      {
        params: {
          allowedSchemas: [
            'alpha',
            'beta',
            'gamma',
            'delta',
          ],
          ignoredSchemas: [
            'epsilon',
            'zeta',
          ],
          sharedValue: Symbol.for('shared (2)'),
        },
        schemaCases: [
          { schema: 'alpha', expected: Symbol.for('shared (2)') },
          { schema: 'beta', expected: Symbol.for('shared (2)') },
          { schema: 'gamma', expected: Symbol.for('shared (2)') },
          { schema: 'delta', expected: Symbol.for('shared (2)') },
          { schema: 'epsilon', expected: null },
          { schema: 'zeta', expected: null },
        ],
      },
      {
        params: {
          allowedSchemas: [
            'alpha',
            'beta',
            'gamma',
            'delta',
          ],
          ignoredSchemas: [],
          sharedValue: Symbol.for('shared (3)'),
        },
        schemaCases: [
          { schema: 'alpha', expected: Symbol.for('shared (3)') },
          { schema: 'beta', expected: Symbol.for('shared (3)') },
          { schema: 'gamma', expected: Symbol.for('shared (3)') },
          { schema: 'delta', expected: Symbol.for('shared (3)') },
        ],
      },
      {
        params: {
          allowedSchemas: [],
          ignoredSchemas: [
            'alpha',
            'beta',
            'gamma',
            'delta',
          ],
          sharedValue: Symbol.for('shared (4)'),
        },
        schemaCases: [
          { schema: 'alpha', expected: null },
          { schema: 'beta', expected: null },
          { schema: 'gamma', expected: null },
          { schema: 'delta', expected: null },
        ],
      },
      {
        params: {
          allowedSchemas: [],
          ignoredSchemas: [],
          sharedValue: Symbol.for('shared (5)'),
        },
        schemaCases: [
          { schema: 'alpha', expected: undefined },
          { schema: 'beta', expected: undefined },
        ],
      },
    ]

    describe.each(cases)('allowed: $params.allowedSchemas, ignored: $params.ignoredSchemas', ({ params, schemaCases }) => {
      const builderArgs = {
        allowedSchemas: params.allowedSchemas,
        ignoredSchemas: params.ignoredSchemas,
      }
      const builder = FilterSchemaHashBuilder.create(builderArgs)

      const args = {
        sharedValue: params.sharedValue,
      }

      const schemaHash = builder.buildSchemaHash(args)

      test.each(schemaCases)('schema: $schema', ({ schema, expected }) => {
        const actual = schemaHash[schema]

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})
