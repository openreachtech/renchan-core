import RenchanRestfulApiError from '../../../../../lib/server/restfulapi/errors/RenchanRestfulApiError.js'

import RestfulApiResponse from '../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'

describe('RestfulApiResponse', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#statusCode', () => {
        const cases = [
          {
            params: {
              statusCode: 200,
            },
          },
          {
            params: {
              statusCode: 500,
            },
          },
        ]

        test.each(cases)('statusCode: $params.statusCode', ({ params }) => {
          const args = {
            statusCode: params.statusCode,
            headers: {},
            content: null,
            error: null,
          }

          const response = new RestfulApiResponse(args)

          expect(response)
            .toHaveProperty('statusCode', params.statusCode)
        })
      })

      describe('#headers', () => {
        const cases = [
          {
            params: {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          },
          {
            params: {
              headers: {
                'Content-Type': 'text/html',
              },
            },
          },
        ]

        test.each(cases)('headers: $params.headers', ({ params }) => {
          const args = {
            statusCode: 200,
            headers: params.headers,
            content: null,
            error: null,
          }

          const response = new RestfulApiResponse(args)

          expect(response)
            .toHaveProperty('headers', params.headers)
        })
      })

      describe('#content', () => {
        const cases = [
          {
            params: {
              content: {
                message: 'first message',
                course: 'first course',
              },
            },
          },
          {
            params: {
              content: {
                message: 'second message',
                course: 'second course',
              },
            },
          },
          {
            params: {
              content: null,
            },
          },
        ]

        test.each(cases)('content: $params.content', ({ params }) => {
          const args = {
            statusCode: 500,
            headers: {},
            content: params.content,
            error: null,
          }

          const response = new RestfulApiResponse(args)

          expect(response)
            .toHaveProperty('content', params.content)
        })
      })

      describe('#error', () => {
        const cases = [
          {
            params: {
              error: RenchanRestfulApiError.create({
                code: '190.X000.001',
                options: {
                  cause: new Error('first cause'),
                },
              }),
            },
          },
          {
            params: {
              error: RenchanRestfulApiError.create({
                code: '190.X000.002',
                options: {
                  cause: new Error('second cause'),
                },
              }),
            },
          },
          {
            params: {
              error: null,
            },
          },
        ]

        test.each(cases)('error: $params.error', ({ params }) => {
          const args = {
            statusCode: 500,
            headers: {},
            content: null,
            error: params.error,
          }

          const response = new RestfulApiResponse(args)

          expect(response)
            .toHaveProperty('error', params.error)
        })
      })
    })
  })
})

describe('RestfulApiResponse', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      describe('with status code', () => {
        const cases = [
          {
            params: {
              statusCode: 200,
              headers: {},
              content: {
                message: 'first message',
                course: 'first course',
              },
              error: null,
            },
          },
          {
            params: {
              statusCode: 300,
              headers: {},
              content: {
                message: 'second message',
                course: 'second course',
              },
              // error: null,
            },
          },
          {
            params: {
              statusCode: 400,
              headers: {},
              // content: {
              //   message: 'third message',
              //   course: 'third course',
              // },
              error: null,
            },
          },
          {
            params: {
              statusCode: 500,
              headers: {},
              // content: {
              //   message: 'fourth message',
              //   course: 'fourth course',
              // },
              // error: null,
            },
          },
          {
            params: {
              statusCode: 201,
              // headers: {},
              content: {
                message: 'first message',
                course: 'first course',
              },
              error: null,
            },
          },
          {
            params: {
              statusCode: 301,
              // headers: {},
              content: {
                message: 'second message',
                course: 'second course',
              },
              // error: null,
            },
          },
          {
            params: {
              statusCode: 401,
              // headers: {},
              // content: {
              //   message: 'third message',
              //   course: 'third course',
              // },
              error: null,
            },
          },
          {
            params: {
              statusCode: 501,
              // headers: {},
              // content: {
              //   message: 'fourth message',
              //   course: 'fourth course',
              // },
              // error: null,
            },
          },
        ]

        test.each(cases)('statusCode: $params.statusCode', ({ params }) => {
          const response = RestfulApiResponse.create(params)

          expect(response)
            .toBeInstanceOf(RestfulApiResponse)
        })
      })

      describe('with no status code', () => {
        const cases = [
          {
            params: {
              // statusCode: 200,
              headers: {},
              content: {
                message: 'first message',
                course: 'first course',
              },
              error: null,
            },
          },
          {
            params: {
              // statusCode: 300,
              headers: {},
              content: {
                message: 'second message',
                course: 'second course',
              },
              // error: null,
            },
          },
          {
            params: {
              // statusCode: 400,
              headers: {},
              // content: {
              //   message: 'third message',
              //   course: 'third course',
              // },
              error: null,
            },
          },
          {
            params: {
              // statusCode: 500,
              headers: {},
              // content: {
              //   message: 'fourth message',
              //   course: 'fourth course',
              // },
              // error: null,
            },
          },
          {
            params: {
              // statusCode: 201,
              // headers: {},
              content: {
                message: 'first message',
                course: 'first course',
              },
              error: null,
            },
          },
          {
            params: {
              // statusCode: 301,
              // headers: {},
              content: {
                message: 'second message',
                course: 'second course',
              },
              // error: null,
            },
          },
          {
            params: {
              // statusCode: 401,
              // headers: {},
              // content: {
              //   message: 'third message',
              //   course: 'third course',
              // },
              error: null,
            },
          },
          {
            params: {
              // statusCode: 501,
              // headers: {},
              // content: {
              //   message: 'fourth message',
              //   course: 'fourth course',
              // },
              // error: null,
            },
          },
        ]

        test.each(cases)('$#', ({ params }) => {
          expect(() => RestfulApiResponse.create(params))
            .toThrow('concrete-member-not-found {"memberName":"RestfulApiResponse.get:statusCode"}')
        })
      })
    })

    describe('to call constructor', () => {
      describe('with status code', () => {
        const cases = [
          {
            params: {
              statusCode: 200,
              headers: {
                tally: 'type/alpha',
              },
              content: {
                message: 'first message',
                course: 'first course',
              },
              error: null,
            },
            expected: {
              statusCode: 200,
              headers: {
                tally: 'type/alpha',
              },
              content: {
                message: 'first message',
                course: 'first course',
              },
              error: null,
            },
          },
          {
            params: {
              statusCode: 300,
              headers: {
                tally: 'type/beta',
              },
              content: {
                message: 'second message',
                course: 'second course',
              },
              // error: null,
            },
            expected: {
              statusCode: 300,
              headers: {
                tally: 'type/beta',
              },
              content: {
                message: 'second message',
                course: 'second course',
              },
              error: null,
            },
          },
          {
            params: {
              statusCode: 400,
              headers: {
                tally: 'type/gamma',
              },
              // content: {
              //   message: 'third message',
              //   course: 'third course',
              // },
              error: null,
            },
            expected: {
              statusCode: 400,
              headers: {
                tally: 'type/gamma',
              },
              content: null,
              error: null,
            },
          },
          {
            params: {
              statusCode: 500,
              headers: {
                tally: 'type/delta',
              },
              // content: {
              //   message: 'fourth message',
              //   course: 'fourth course',
              // },
              // error: null,
            },
            expected: {
              statusCode: 500,
              headers: {
                tally: 'type/delta',
              },
              content: null,
              error: null,
            },
          },
          {
            params: {
              statusCode: 201,
              // headers: {},
              content: {
                message: 'first message',
                course: 'first course',
              },
              error: null,
            },
            expected: {
              statusCode: 201,
              headers: {},
              content: {
                message: 'first message',
                course: 'first course',
              },
              error: null,
            },
          },
          {
            params: {
              statusCode: 301,
              // headers: {},
              content: {
                message: 'second message',
                course: 'second course',
              },
              // error: null,
            },
            expected: {
              statusCode: 301,
              headers: {},
              content: {
                message: 'second message',
                course: 'second course',
              },
              error: null,
            },
          },
          {
            params: {
              statusCode: 401,
              // headers: {},
              // content: {
              //   message: 'third message',
              //   course: 'third course',
              // },
              error: null,
            },
            expected: {
              statusCode: 401,
              headers: {},
              content: null,
              error: null,
            },
          },
          {
            params: {
              statusCode: 501,
              // headers: {},
              // content: {
              //   message: 'fourth message',
              //   course: 'fourth course',
              // },
              // error: null,
            },
            expected: {
              statusCode: 501,
              headers: {},
              content: null,
              error: null,
            },
          },
        ]

        test.each(cases)('statusCode: $params.statusCode', ({ params, expected }) => {
          const SpyClass = globalThis.constructorSpy.spyOn(RestfulApiResponse)

          SpyClass.create(params)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(expected)
        })
      })

      describe('with no status code', () => {
        const cases = [
          {
            params: {
              // statusCode: 200,
              headers: {
                tally: 'type/alpha',
              },
              content: {
                message: 'first message',
                course: 'first course',
              },
              error: null,
            },
          },
          {
            params: {
              // statusCode: 300,
              headers: {
                tally: 'type/beta',
              },
              content: {
                message: 'second message',
                course: 'second course',
              },
              // error: null,
            },
          },
          {
            params: {
              // statusCode: 400,
              headers: {
                tally: 'type/gamma',
              },
              // content: {
              //   message: 'third message',
              //   course: 'third course',
              // },
              error: null,
            },
          },
          {
            params: {
              // statusCode: 500,
              headers: {
                tally: 'type/delta',
              },
              // content: {
              //   message: 'fourth message',
              //   course: 'fourth course',
              // },
              // error: null,
            },
          },
          {
            params: {
              // statusCode: 201,
              // headers: {},
              content: {
                message: 'first message',
                course: 'first course',
              },
              error: null,
            },
          },
          {
            params: {
              // statusCode: 301,
              // headers: {},
              content: {
                message: 'second message',
                course: 'second course',
              },
              // error: null,
            },
          },
          {
            params: {
              // statusCode: 401,
              // headers: {},
              // content: {
              //   message: 'third message',
              //   course: 'third course',
              // },
              error: null,
            },
          },
          {
            params: {
              // statusCode: 501,
              // headers: {},
              // content: {
              //   message: 'fourth message',
              //   course: 'fourth course',
              // },
              // error: null,
            },
          },
        ]

        test.each(cases)('$#', ({ params, expected }) => {
          const SpyClass = globalThis.constructorSpy.spyOn(RestfulApiResponse)

          expect(() => SpyClass.create(params))
            .toThrow('concrete-member-not-found {"memberName":"RestfulApiResponse.get:statusCode"}')

          expect(SpyClass.__spy__)
            .toHaveBeenCalledTimes(0)
        })
      })
    })
  })
})

describe('RestfulApiResponse', () => {
  describe('.createAsError()', () => {
    describe('to be instance of own class', () => {
      describe('with fulfilled args', () => {
        const cases = [
          {
            params: {
              statusCode: 300,
              errorMessage: 'first message',
              course: new Error('first course'),
            },
          },
          {
            params: {
              statusCode: 400,
              errorMessage: 'second message',
              // course: new Error('second course'),
            },
          },
        ]

        test.each(cases)('statusCode: $params.statusCode', ({ params }) => {
          const response = RestfulApiResponse.createAsError(params)

          expect(response)
            .toBeInstanceOf(RestfulApiResponse)
        })
      })
    })

    describe('to call .create()', () => {
      describe('with fulfilled args', () => {
        const cases = [
          {
            params: {
              statusCode: 400,
              errorMessage: 'first message',
              course: new Error('first course'),
            },
            expected: {
              statusCode: 400,
              error: {
                message: 'first message',
                course: new Error('first course'),
              },
            },
          },
          {
            params: {
              statusCode: 401,
              errorMessage: 'second message',
              // course: new Error('second course'),
            },
            expected: {
              statusCode: 401,
              error: {
                message: 'second message',
              },
            },
          },
        ]

        test.each(cases)('statusCode: $params.statusCode', ({ params, expected }) => {
          const createSpy = jest.spyOn(RestfulApiResponse, 'create')

          RestfulApiResponse.createAsError(params)

          expect(createSpy)
            .toHaveBeenCalledWith(expected)
        })
      })
    })

    describe('with not fulfilled args', () => {
      const cases = [
        {
          params: {
            statusCode: 401,
            // errorMessage: 'first message',
            course: new Error('first course'),
          },
          expected: 'concrete-member-not-found {"memberName":"RestfulApiResponse.get:errorMessage"}',
        },
        {
          params: {
            // statusCode: 402,
            errorMessage: 'second message',
            course: new Error('second course'),
          },
          expected: 'concrete-member-not-found {"memberName":"RestfulApiResponse.get:statusCode"}',
        },
        {
          params: {
            // statusCode: 403,
            // errorMessage: 'third message',
            course: new Error('third course'),
          },
          expected: 'concrete-member-not-found {"memberName":"RestfulApiResponse.get:errorMessage"}',
        },
        {
          params: {
            statusCode: 404,
            // errorMessage: 'fourth message',
            // course: new Error('fourth course'),
          },
          expected: 'concrete-member-not-found {"memberName":"RestfulApiResponse.get:errorMessage"}',
        },
        {
          params: {
            // statusCode: 405,
            errorMessage: 'fifth message',
            // course: new Error('fifth course'),
          },
          expected: 'concrete-member-not-found {"memberName":"RestfulApiResponse.get:statusCode"}',
        },
        {
          params: {
            // statusCode: 406,
            // errorMessage: 'sixth message',
            // course: new Error('sixth course'),
          },
          expected: 'concrete-member-not-found {"memberName":"RestfulApiResponse.get:errorMessage"}',
        },
      ]

      test.each(cases)('$#', ({ params, expected }) => {
        expect(() => RestfulApiResponse.createAsError(params))
          .toThrow(expected)
      })
    })
  })
})

describe('RestfulApiResponse', () => {
  describe('.get:statusCode', () => {
    describe('to throw', () => {
      test('without args', () => {
        expect(() => RestfulApiResponse.statusCode)
          .toThrow('concrete-member-not-found {"memberName":"RestfulApiResponse.get:statusCode"}')
      })
    })
  })
})

describe('RestfulApiResponse', () => {
  describe('.get:errorMessage', () => {
    describe('to throw', () => {
      test('without args', () => {
        expect(() => RestfulApiResponse.errorMessage)
          .toThrow('concrete-member-not-found {"memberName":"RestfulApiResponse.get:errorMessage"}')
      })
    })
  })
})

describe('RestfulApiResponse', () => {
  describe('.generateErrorEnvelope()', () => {
    const cases = [
      {
        params: {
          errorMessage: 'first error',
          course: new Error('first course'),
        },
        expected: {
          message: 'first error',
          course: new Error('first course'),
        },
      },
      {
        params: {
          errorMessage: 'second error',
          course: new Error('second course'),
        },
        expected: {
          message: 'second error',
          course: new Error('second course'),
        },
      },
      {
        params: {
          errorMessage: 'third error',
        },
        expected: {
          message: 'third error',
        },
      },
    ]

    test.each(cases)('errorMessage: $params.errorMessage', ({ params, expected }) => {
      const response = RestfulApiResponse.generateErrorEnvelope(params)

      expect(response)
        .toEqual(expected)
    })
  })
})

describe('RestfulApiResponse', () => {
  describe('.declareErrorRestfulApiResponse()', () => {
    describe('to be Derived Class of RestfulApiResponse', () => {
      const cases = [
        {
          params: {
            errorEnvelope: {
              statusCode: 300,
              errorMessage: 'first error',
            },
          },
        },
        {
          params: {
            errorEnvelope: {
              statusCode: 400,
              errorMessage: 'second error',
            },
          },
        },
        {
          params: {
            errorEnvelope: {
              statusCode: 500,
              errorMessage: 'third error',
            },
          },
        },
      ]

      test.each(cases)('statusCode: $params.errorEnvelope.statusCode', ({ params }) => {
        const response = RestfulApiResponse.declareErrorRestfulApiResponse(params)

        expect(response)
          .toHaveProperty('prototype', expect.any(RestfulApiResponse))
      })
    })

    describe('to work as fulfilled Derived Class of RestfulApiResponse', () => {
      const cases = [
        {
          params: {
            errorEnvelope: {
              statusCode: 300,
              errorMessage: 'first error',
            },
          },
        },
        {
          params: {
            errorEnvelope: {
              statusCode: 400,
              errorMessage: 'second error',
            },
          },
        },
        {
          params: {
            errorEnvelope: {
              statusCode: 500,
              errorMessage: 'third error',
            },
          },
        },
      ]

      describe('with course', () => {
        test.each(cases)('statusCode: $params.errorEnvelope.statusCode', ({ params }) => {
          const courseTally = {
            reason: Symbol('reason'),
          }
          const expected = {
            message: params.errorEnvelope.errorMessage,
            course: courseTally,
          }

          const DerivedClass = RestfulApiResponse.declareErrorRestfulApiResponse(params)

          const response = DerivedClass.createAsError({
            course: courseTally,
          })

          expect(response)
            .toHaveProperty('statusCode', params.errorEnvelope.statusCode)
          expect(response)
            .toHaveProperty('content', null)
          expect(response)
            .toHaveProperty('error', expected)
        })
      })

      describe('with no course', () => {
        test.each(cases)('statusCode: $params.errorEnvelope.statusCode', ({ params }) => {
          const DerivedClass = RestfulApiResponse.declareErrorRestfulApiResponse(params)

          const response = DerivedClass.createAsError()

          expect(response)
            .toHaveProperty('statusCode', params.errorEnvelope.statusCode)
          expect(response)
            .toHaveProperty('content', null)
          expect(response)
            .toHaveProperty('error', {
              message: params.errorEnvelope.errorMessage,
            })
        })
      })
    })
  })
})
