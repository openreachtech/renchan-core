import RenchanGraphqlError from '../../../../../lib/server/graphql/errors/RenchanGraphqlError.js'

describe('RenchanGraphqlError', () => {
  describe('super class', () => {
    test('to be Error', () => {
      const actual = RenchanGraphqlError.prototype

      expect(actual)
        .toBeInstanceOf(Error)
    })
  })
})

describe('RenchanGraphqlError', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      describe('with code', () => {
        const cases = [
          {
            params: {
              code: '100.X000.001',
              options: {
                cause: 'because it is not fine',
              },
              value: {
                alpha: 111,
              },
            },
          },
          {
            params: {
              code: '10.00.02',
              options: {},
              // value: {
              //   beta: 222,
              // },
            },
          },
          {
            params: {
              code: '10.00.03',
              // options: {},
              value: {
                gamma: 333,
              },
            },
          },
          {
            params: {
              code: '10.00.04',
              // options: {},
              // value: {
              //   delta: 444,
              // },
            },
          },
        ]

        test.each(cases)('code: $params.code', ({ params }) => {
          const error = RenchanGraphqlError.create(params)

          expect(error)
            .toBeInstanceOf(RenchanGraphqlError)
        })
      })

      describe('with mock of .get:errorCode', () => {
        const cases = [
          {
            params: {
              code: '100.X000.001',
              options: {
                cause: 'because it is not fine',
              },
              value: {
                alpha: 111,
              },
            },
          },
          {
            params: {
              code: '10.00.02',
              options: {},
              // value: {
              //   beta: 222,
              // },
            },
          },
          {
            params: {
              code: '10.00.03',
              // options: {},
              value: {
                gamma: 333,
              },
            },
          },
          {
            params: {
              code: '10.00.04',
              // options: {},
              // value: {
              //   delta: 444,
              // },
            },
          },
        ]

        test.each(cases)('code: $params.code', ({ params }) => {
          const errorCodeSpy = jest.spyOn(RenchanGraphqlError, 'errorCode', 'get')
            .mockReturnValue(params.code)

          const args = {
            options: params.options,
            value: params.value,
          }

          const error = RenchanGraphqlError.create(args)

          expect(error)
            .toBeInstanceOf(RenchanGraphqlError)

          errorCodeSpy.mockRestore()
        })
      })

      describe('to throw error on call as is', () => {
        const cases = [
          {
            params: {
              code: '100.X000.001',
              options: {
                cause: 'because it is not fine',
              },
              value: {
                alpha: 111,
              },
            },
          },
          {
            params: {
              code: '10.00.02',
              options: {},
              // value: {
              //   beta: 222,
              // },
            },
          },
          {
            params: {
              code: '10.00.03',
              // options: {},
              value: {
                gamma: 333,
              },
            },
          },
          {
            params: {
              code: '10.00.04',
              // options: {},
              // value: {
              //   delta: 444,
              // },
            },
          },
        ]

        test.each(cases)('code: $params.code', ({ params }) => {
          const args = {
            options: params.options,
            value: params.value,
          }

          expect(() => RenchanGraphqlError.create(args))
            .toThrow('concrete-member-not-found {"memberName":"RenchanGraphqlError.get:errorCode"}')
        })
      })
    })

    describe('to call constructor', () => {
      describe('with code', () => {
        const cases = [
          {
            params: {
              code: '100.X000.001',
              options: {
                cause: 'because it is not fine',
              },
              value: {
                alpha: 111,
              },
            },
            expected: '100.X000.001 {"alpha":111}',
          },
          {
            params: {
              code: '10.00.02',
              options: {},
              // value: {
              //   beta: 222,
              // },
            },
            expected: '10.00.02',
          },
          {
            params: {
              code: '10.00.03',
              // options: {},
              value: {
                gamma: 333,
              },
            },
            expected: '10.00.03 {"gamma":333}',
          },
          {
            params: {
              code: '10.00.04',
              // options: {},
              // value: {
              //   delta: 444,
              // },
            },
            expected: '10.00.04',
          },
        ]

        test.each(cases)('code: $params.code', ({ params, expected }) => {
          const SpyClass = globalThis.constructorSpy.spyOn(RenchanGraphqlError)

          SpyClass.create(params)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(
              expected,
              params.options
            )
        })
      })

      describe('with mock of .get:errorCode', () => {
        const cases = [
          {
            params: {
              code: '100.X000.001',
              options: {
                cause: 'because it is not fine',
              },
              value: {
                alpha: 111,
              },
            },
            expected: '100.X000.001 {"alpha":111}',
          },
          {
            params: {
              code: '10.00.02',
              options: {},
              // value: {
              //   beta: 222,
              // },
            },
            expected: '10.00.02',
          },
          {
            params: {
              code: '10.00.03',
              // options: {},
              value: {
                gamma: 333,
              },
            },
            expected: '10.00.03 {"gamma":333}',
          },
          {
            params: {
              code: '10.00.04',
              // options: {},
              // value: {
              //   delta: 444,
              // },
            },
            expected: '10.00.04',
          },
        ]

        test.each(cases)('code: $params.code', ({ params, expected }) => {
          jest.spyOn(RenchanGraphqlError, 'errorCode', 'get')
            .mockReturnValue(params.code)

          const SpyClass = globalThis.constructorSpy.spyOn(RenchanGraphqlError)

          const args = {
            options: params.options,
            value: params.value,
          }

          SpyClass.create(args)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(
              expected,
              params.options
            )
        })
      })

      describe('to throw error on call as is', () => {
        const cases = [
          {
            params: {
              code: '100.X000.001',
              options: {
                cause: 'because it is not fine',
              },
              value: {
                alpha: 111,
              },
            },
          },
          {
            params: {
              code: '10.00.02',
              options: {},
              // value: {
              //   beta: 222,
              // },
            },
          },
          {
            params: {
              code: '10.00.03',
              // options: {},
              value: {
                gamma: 333,
              },
            },
          },
          {
            params: {
              code: '10.00.04',
              // options: {},
              // value: {
              //   delta: 444,
              // },
            },
          },
        ]

        test.each(cases)('code: $params.code', ({ params }) => {
          const args = {
            options: params.options,
            value: params.value,
          }

          expect(() => RenchanGraphqlError.create(args))
            .toThrow('concrete-member-not-found {"memberName":"RenchanGraphqlError.get:errorCode"}')
        })
      })
    })
  })
})

describe('RenchanGraphqlError', () => {
  describe('.get:errorCode', () => {
    test('to throw error', () => {
      expect(() => RenchanGraphqlError.errorCode)
        .toThrow('concrete-member-not-found {"memberName":"RenchanGraphqlError.get:errorCode"}')
    })
  })
})

describe('RenchanGraphqlError', () => {
  describe('.generateErrorMessage()', () => {
    const cases = [
      {
        params: {
          code: '100.X000.001',
          value: {
            alpha: 111,
            beta: 222,
          },
        },
        expected: '100.X000.001 {"alpha":111,"beta":222}',
      },
      {
        params: {
          code: '10.00.02',
          value: {
            first: 'abc',
            second: 'xyz',
          },
        },
        expected: '10.00.02 {"first":"abc","second":"xyz"}',
      },
      {
        params: {
          code: '10.00.03',
          // value: {},
        },
        expected: '10.00.03',
      },
    ]

    test.each(cases)('code: $params.code', ({ params, expected }) => {
      const args = {
        code: params.code,
        value: params.value,
      }

      const actual = RenchanGraphqlError.generateErrorMessage(args)

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('RenchanGraphqlError', () => {
  describe('.declareGraphqlError()', () => {
    describe('to be derived Class', () => {
      const cases = [
        {
          params: {
            code: '100.X000.001',
          },
        },
        {
          params: {
            code: '10.00.02',
          },
        },
      ]

      test.each(cases)('code: $params.code', ({ params }) => {
        const actual = RenchanGraphqlError.declareGraphqlError(params)

        expect(actual)
          .toBeInstanceOf(Function)
        expect(actual)
          .toHaveProperty('prototype', expect.any(RenchanGraphqlError))
      })
    })

    describe('not to throw error on call .create() as is', () => {
      const cases = [
        {
          params: {
            code: '100.X000.001',
          },
        },
        {
          params: {
            code: '10.00.02',
          },
        },
      ]

      describe.each(cases)('code: $params.code', ({ params }) => {
        const DerivedError = RenchanGraphqlError.declareGraphqlError(params)

        const valueCases = [
          {
            value: {
              alpha: 111,
              beta: 222,
            },
          },
          {
            value: {
              first: 'abc',
              second: 'xyz',
            },
          },
        ]

        test.each(valueCases)('value: $value', ({ value }) => {
          expect(
            () => DerivedError.create({
              value,
            })
          )
            .not
            .toThrow()
        })

        test('with no params', () => {
          expect(() => DerivedError.create())
            .not
            .toThrow()
        })
      })
    })

    describe('to call constructor on call .create()', () => {
      const cases = [
        {
          params: {
            code: '100.X000.001',
          },
          valueCases: [
            {
              input: {
                value: {
                  alpha: 111,
                  beta: 222,
                },
                options: {
                  cause: Symbol('cause alpha'),
                },
              },
              expected: '100.X000.001 {"alpha":111,"beta":222}',
            },
            {
              input: {
                value: {
                  first: 'abc',
                  second: 'xyz',
                },
                options: {
                  cause: Symbol('cause first'),
                },
              },
              expected: '100.X000.001 {"first":"abc","second":"xyz"}',
            },
          ],
        },
        {
          params: {
            code: '10.00.02',
          },
          valueCases: [
            {
              input: {
                value: {
                  alpha: 111,
                  beta: 222,
                },
                options: {
                  cause: Symbol('cause alpha'),
                },
              },
              expected: '10.00.02 {"alpha":111,"beta":222}',
            },
            {
              input: {
                value: {
                  first: 'abc',
                  second: 'xyz',
                },
                options: {
                  cause: Symbol('cause first'),
                },
              },
              expected: '10.00.02 {"first":"abc","second":"xyz"}',
            },
          ],
        },
      ]

      describe.each(cases)('code: $params.code', ({ params, valueCases }) => {
        const DerivedError = RenchanGraphqlError.declareGraphqlError(params)

        test.each(valueCases)('value: $input.value', ({ input, expected }) => {
          const SpyClass = globalThis.constructorSpy.spyOn(DerivedError)

          const args = {
            value: input.value,
            options: input.options,
          }

          SpyClass.create(args)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(
              expected,
              input.options
            )
        })

        test('with no args', () => {
          const SpyClass = globalThis.constructorSpy.spyOn(DerivedError)

          SpyClass.create()

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(params.code, undefined)
        })
      })
    })
  })
})
