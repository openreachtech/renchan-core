import ValueTemplateHydrator from '../../../lib/tools/ValueTemplateHydrator.js'

describe('ValueTemplateHydrator', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#template', () => {
        const cases = [
          {
            params: {
              template: 'No authenticated',
            },
          },
          {
            params: {
              template: 'Invalid email [$email]',
            },
          },
        ]

        test.each(cases)('template: $params.template', ({ params }) => {
          const args = {
            template: params.template,
            delimiter: '$',
          }

          const hydrator = new ValueTemplateHydrator(args)

          expect(hydrator)
            .toHaveProperty('template', params.template)
        })
      })

      describe('#template', () => {
        const cases = [
          {
            params: {
              delimiter: '$',
            },
          },
          {
            params: {
              delimiter: '%',
            },
          },
        ]

        test.each(cases)('delimiter: $params.delimiter', ({ params }) => {
          const args = {
            template: 'message template',
            delimiter: params.delimiter,
          }

          const hydrator = new ValueTemplateHydrator(args)

          expect(hydrator)
            .toHaveProperty('delimiter', params.delimiter)
        })
      })
    })
  })
})

describe('ValueTemplateHydrator', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            template: 'No authenticated',
            delimiter: '$',
          },
        },
        {
          params: {
            template: 'Invalid email [$email]',
            // delimiter: '$',
          },
        },
      ]

      test.each(cases)('template: $params.template', ({ params }) => {
        const hydrator = ValueTemplateHydrator.create(params)

        expect(hydrator)
          .toBeInstanceOf(ValueTemplateHydrator)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            template: 'No authenticated',
            delimiter: '$',
          },
          expected: {
            template: 'No authenticated',
            delimiter: '$',
          },
        },
        {
          params: {
            template: 'Invalid email [$email]',
            // delimiter: '$',
          },
          expected: {
            template: 'Invalid email [$email]',
            delimiter: '$',
          },
        },
        {
          params: {
            template: 'Invalid username [%username]',
            delimiter: '%',
          },
          expected: {
            template: 'Invalid username [%username]',
            delimiter: '%',
          },
        },
      ]

      test.each(cases)('template: $params.template', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(ValueTemplateHydrator)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('ValueTemplateHydrator', () => {
  describe('#generateHydratedString()', () => {
    describe('with hydration', () => {
      /**
       * @type {Array<{
       *   params: import('../../../lib/tools/ValueTemplateHydrator.js').ValueTemplateHydratorFactoryParams
       *   cases: Array<{
       *     valueHash: Record<string, any>
       *     expected: string
       *   }>
       * }>}
       */
      const templateCases = [
        {
          params: {
            template: 'Invalid email [$email]',
            delimiter: '$',
          },
          cases: [
            {
              valueHash: {
                email: 'alpha@example.com',
              },
              expected: 'Invalid email [alpha@example.com]',
            },
            {
              valueHash: {
                email: 'beta@example.com',
              },
              expected: 'Invalid email [beta@example.com]',
            },
          ],
        },
        {
          params: {
            template: 'Invalid values [$first, $second]',
            // delimiter: '$',
          },
          cases: [
            {
              valueHash: {
                first: 111,
                second: 222,
              },
              expected: 'Invalid values [111, 222]',
            },
            {
              valueHash: {
                first: 'alpha',
                second: 'beta',
              },
              expected: 'Invalid values [alpha, beta]',
            },
          ],
        },
        {
          params: {
            template: 'Invalid username [%username]',
            delimiter: '%',
          },
          cases: [
            {
              valueHash: {
                username: 'John Doe',
              },
              expected: 'Invalid username [John Doe]',
            },
            {
              valueHash: {
                username: 'Jane Smith',
              },
              expected: 'Invalid username [Jane Smith]',
            },
          ],
        },
        {
          params: {
            template: 'Invalid email [$email]',
            delimiter: '%',
          },
          cases: [
            {
              valueHash: {
                email: 'alpha@example.com',
              },
              expected: 'Invalid email [$email]',
            },
            {
              valueHash: {
                email: 'beta@example.com',
              },
              expected: 'Invalid email [$email]',
            },
          ],
        },
      ]

      describe.each(templateCases)('template: $params.template', ({ params, cases }) => {
        const hydrator = ValueTemplateHydrator.create(params)

        test.each(cases)('valueHash: $valueHash', ({ valueHash, expected }) => {
          const actual = hydrator.generateHydratedString({
            valueHash,
          })

          expect(actual)
            .toBe(expected)
        })
      })
    })

    describe('with no hydration', () => {
      const cases = [
        {
          params: {
            template: 'No authenticated',
            delimiter: '$',
          },
        },
        {
          params: {
            template: 'Unknown error',
            // delimiter: '$',
          },
        },
      ]

      test.each(cases)('template: $params.template', ({ params }) => {
        const hydrator = ValueTemplateHydrator.create(params)

        const actual = hydrator.generateHydratedString()

        expect(actual)
          .toBe(params.template)
      })
    })
  })
})
