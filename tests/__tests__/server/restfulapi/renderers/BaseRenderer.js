import BaseRenderer from '../../../../../lib/server/restfulapi/renderers/BaseRenderer.js'

import RestfulApiResponse from '../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'
import BaseRestfulApiContext from '../../../../../lib/server/restfulapi/contexts/BaseRestfulApiContext.js'

describe('BaseRenderer', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#errorResponseHash', () => {
        const cases = [
          {
            params: {
              errorResponseHash: {
                BadRequest: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 400,
                    errorMessage: 'Bad Request error occurred',
                  },
                }),
                Unauthorized: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 401,
                    errorMessage: 'Unauthorized error occurred',
                  },
                }),
                PaymentRequired: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 402,
                    errorMessage: 'Payment Required error occurred',
                  },
                }),
              },
            },
          },
          {
            params: {
              errorResponseHash: {
                Forbidden: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 403,
                    errorMessage: 'Forbidden error occurred',
                  },
                }),
                NotFound: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 404,
                    errorMessage: 'Not Found error occurred',
                  },
                }),
                MethodNotAllowed: RestfulApiResponse.declareErrorRestfulApiResponse({
                  errorEnvelope: {
                    statusCode: 405,
                    errorMessage: 'Method Not Allowed error occurred',
                  },
                }),
              },
            },
          },
        ]

        test.each(cases)('errorResponseHash: $params.errorResponseHash', ({ params }) => {
          const args = {
            errorResponseHash: params.errorResponseHash,
          }

          const renderer = new BaseRenderer(args)

          expect(renderer)
            .toHaveProperty('errorResponseHash', params.errorResponseHash)
        })
      })
    })
  })
})

describe('BaseRenderer', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            errorStructureHash: {
              BadRequest: {
                statusCode: 400,
                errorMessage: 'Bad Request',
              },
              Unauthorized: {
                statusCode: 401,
                errorMessage: 'Unauthorized',
              },
              PaymentRequired: {
                statusCode: 402,
                errorMessage: 'Payment Required',
              },
            },
          },
        },
        {
          params: {
            errorStructureHash: {
              Forbidden: {
                statusCode: 403,
                errorMessage: 'Forbidden',
              },
              NotFound: {
                statusCode: 404,
                errorMessage: 'Not Found',
              },
              MethodNotAllowed: {
                statusCode: 405,
                errorMessage: 'Method Not Allowed',
              },
            },
          },
        },
      ]

      test.each(cases)('errorStructureHash: $params.errorStructureHash', ({ params }) => {
        const renderer = BaseRenderer.create({
          errorStructureHash: params.errorStructureHash,
        })

        expect(renderer)
          .toBeInstanceOf(BaseRenderer)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            errorStructureHash: {
              BadRequest: {
                statusCode: 400,
                errorMessage: 'Bad Request',
              },
              Unauthorized: {
                statusCode: 401,
                errorMessage: 'Unauthorized',
              },
              PaymentRequired: {
                statusCode: 402,
                errorMessage: 'Payment Required',
              },
            },
          },
          expected: {
            errorResponseHash: {
              BadRequest: expect.any(Function),
              Unauthorized: expect.any(Function),
              PaymentRequired: expect.any(Function),
            },
          },
        },
        {
          params: {
            errorStructureHash: {
              Forbidden: {
                statusCode: 403,
                errorMessage: 'Forbidden',
              },
              NotFound: {
                statusCode: 404,
                errorMessage: 'Not Found',
              },
              MethodNotAllowed: {
                statusCode: 405,
                errorMessage: 'Method Not Allowed',
              },
            },
          },
          expected: {
            errorResponseHash: {
              Forbidden: expect.any(Function),
              NotFound: expect.any(Function),
              MethodNotAllowed: expect.any(Function),
            },
          },
        },
      ]

      test.each(cases)('errorStructureHash: $params.errorStructureHash', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(BaseRenderer)

        const args = {
          errorStructureHash: params.errorStructureHash,
        }

        SpyClass.create(args)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('BaseRenderer', () => {
  describe('.createAsync()', () => {
    describe('to be instance of own class', () => {
      test('with no arguments', async () => {
        const renderer = await BaseRenderer.createAsync()

        expect(renderer)
          .toBeInstanceOf(BaseRenderer)
      })
    })

    describe('to call .create()', () => {
      test('with no arguments', async () => {
        const createSpy = jest.spyOn(BaseRenderer, 'create')

        await BaseRenderer.createAsync()

        expect(createSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('BaseRenderer', () => {
  describe('.errorStructureHash', () => {
    describe('to be empty object', () => {
      test('with no arguments', () => {
        const expected = {}

        const actual = BaseRenderer.errorStructureHash

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('BaseRenderer', () => {
  describe('.buildErrorResponseHash()', () => {
    describe('to return error response hash', () => {
      const cases = [
        {
          params: {
            errorStructureHash: {
              BadRequest: {
                statusCode: 400,
                errorMessage: 'Bad Request',
              },
              Unauthorized: {
                statusCode: 401,
                errorMessage: 'Unauthorized',
              },
              PaymentRequired: {
                statusCode: 402,
                errorMessage: 'Payment Required',
              },
            },
          },
          expected: {
            BadRequest: expect.any(Function),
            Unauthorized: expect.any(Function),
            PaymentRequired: expect.any(Function),
          },
        },
        {
          params: {
            errorStructureHash: {
              Forbidden: {
                statusCode: 403,
                errorMessage: 'Forbidden',
              },
              NotFound: {
                statusCode: 404,
                errorMessage: 'Not Found',
              },
              MethodNotAllowed: {
                statusCode: 405,
                errorMessage: 'Method Not Allowed',
              },
            },
          },
          expected: {
            Forbidden: expect.any(Function),
            NotFound: expect.any(Function),
            MethodNotAllowed: expect.any(Function),
          },
        },
      ]

      test.each(cases)('errorStructureHash: $params.errorStructureHash', ({ params, expected }) => {
        const errorResponseHash = BaseRenderer.buildErrorResponseHash(params)

        expect(errorResponseHash)
          .toEqual(expected)
      })
    })
  })
})

describe('BaseRenderer', () => {
  describe('.get:method', () => {
    describe('to throw error', () => {
      test('on call', () => {
        const expected = 'concrete-member-not-found {"memberName":"BaseRenderer.get:method"}'

        expect(() => BaseRenderer.method)
          .toThrow(expected)
      })
    })
  })
})

describe('BaseRenderer', () => {
  describe('.get:routePath', () => {
    describe('to throw error', () => {
      test('on call', () => {
        const expected = 'concrete-member-not-found {"memberName":"BaseRenderer.get:routePath"}'

        expect(() => BaseRenderer.routePath)
          .toThrow(expected)
      })
    })
  })
})

describe('BaseRenderer', () => {
  describe('#get:Ctor', () => {
    describe('to be own class', () => {
      const cases = [
        {
          params: {
            errorStructureHash: {
              BadRequest: {
                statusCode: 400,
                errorMessage: 'Bad Request',
              },
              Unauthorized: {
                statusCode: 401,
                errorMessage: 'Unauthorized',
              },
              PaymentRequired: {
                statusCode: 402,
                errorMessage: 'Payment Required',
              },
            },
          },
        },
        {
          params: {
            errorStructureHash: {
              Forbidden: {
                statusCode: 403,
                errorMessage: 'Forbidden',
              },
              NotFound: {
                statusCode: 404,
                errorMessage: 'Not Found',
              },
              MethodNotAllowed: {
                statusCode: 405,
                errorMessage: 'Method Not Allowed',
              },
            },
          },
        },
      ]

      test.each(cases)('errorStructureHash: $params.errorStructureHash', ({ params }) => {
        const args = {
          errorStructureHash: params.errorStructureHash,
        }

        const renderer = BaseRenderer.create(args)

        const actual = renderer.Ctor

        expect(actual)
          .toBe(BaseRenderer) // same reference
      })
    })
  })
})

describe('BaseRenderer', () => {
  describe('#get:method', () => {
    describe('to throw error', () => {
      const cases = [
        {
          params: {
            errorStructureHash: {
              BadRequest: {
                statusCode: 400,
                errorMessage: 'Bad Request',
              },
              Unauthorized: {
                statusCode: 401,
                errorMessage: 'Unauthorized',
              },
              PaymentRequired: {
                statusCode: 402,
                errorMessage: 'Payment Required',
              },
            },
          },
        },
        {
          params: {
            errorStructureHash: {
              Forbidden: {
                statusCode: 403,
                errorMessage: 'Forbidden',
              },
              NotFound: {
                statusCode: 404,
                errorMessage: 'Not Found',
              },
              MethodNotAllowed: {
                statusCode: 405,
                errorMessage: 'Method Not Allowed',
              },
            },
          },
        },
      ]

      test.each(cases)('errorStructureHash: $params.errorStructureHash', ({ params }) => {
        const expected = 'concrete-member-not-found {"memberName":"BaseRenderer.get:method"}'

        const args = {
          errorStructureHash: params.errorStructureHash,
        }
        const renderer = BaseRenderer.create(args)

        expect(() => renderer.method)
          .toThrow(expected)
      })
    })
  })
})

describe('BaseRenderer', () => {
  describe('#get:routePath', () => {
    describe('to throw error', () => {
      const cases = [
        {
          params: {
            errorStructureHash: {
              BadRequest: {
                statusCode: 400,
                errorMessage: 'Bad Request',
              },
              Unauthorized: {
                statusCode: 401,
                errorMessage: 'Unauthorized',
              },
              PaymentRequired: {
                statusCode: 402,
                errorMessage: 'Payment Required',
              },
            },
          },
        },
        {
          params: {
            errorStructureHash: {
              Forbidden: {
                statusCode: 403,
                errorMessage: 'Forbidden',
              },
              NotFound: {
                statusCode: 404,
                errorMessage: 'Not Found',
              },
              MethodNotAllowed: {
                statusCode: 405,
                errorMessage: 'Method Not Allowed',
              },
            },
          },
        },
      ]

      test.each(cases)('errorStructureHash: $params.errorStructureHash', ({ params }) => {
        const expected = 'concrete-member-not-found {"memberName":"BaseRenderer.get:routePath"}'

        const args = {
          errorStructureHash: params.errorStructureHash,
        }
        const renderer = BaseRenderer.create(args)

        expect(() => renderer.routePath)
          .toThrow(expected)
      })
    })
  })
})

describe('BaseRenderer', () => {
  describe('#get:Error', () => {
    describe('to throw error', () => {
      const cases = [
        {
          params: {
            errorResponseHash: {
              BadRequest: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 400,
                  errorMessage: 'Bad Request error occurred',
                },
              }),
              Unauthorized: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 401,
                  errorMessage: 'Unauthorized error occurred',
                },
              }),
              PaymentRequired: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 402,
                  errorMessage: 'Payment Required error occurred',
                },
              }),
            },
          },
        },
        {
          params: {
            errorResponseHash: {
              Forbidden: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 403,
                  errorMessage: 'Forbidden error occurred',
                },
              }),
              NotFound: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 404,
                  errorMessage: 'Not Found error occurred',
                },
              }),
              MethodNotAllowed: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 405,
                  errorMessage: 'Method Not Allowed error occurred',
                },
              }),
            },
          },
        },
      ]

      test.each(cases)('errorStructureHash: $params.errorStructureHash', ({ params }) => {
        const args = {
          errorResponseHash: params.errorResponseHash,
        }
        const renderer = new BaseRenderer(args)

        const actual = renderer.Error

        expect(actual)
          .toBe(params.errorResponseHash) // same reference
      })
    })
  })
})

describe('BaseRenderer', () => {
  describe('#get:passesFilter', () => {
    describe('to fixed value', () => {
      const cases = [
        {
          params: {
            errorResponseHash: {
              BadRequest: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 400,
                  errorMessage: 'Bad Request error occurred',
                },
              }),
              Unauthorized: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 401,
                  errorMessage: 'Unauthorized error occurred',
                },
              }),
              PaymentRequired: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 402,
                  errorMessage: 'Payment Required error occurred',
                },
              }),
            },
          },
        },
        {
          params: {
            errorResponseHash: {
              Forbidden: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 403,
                  errorMessage: 'Forbidden error occurred',
                },
              }),
              NotFound: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 404,
                  errorMessage: 'Not Found error occurred',
                },
              }),
              MethodNotAllowed: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 405,
                  errorMessage: 'Method Not Allowed error occurred',
                },
              }),
            },
          },
        },
      ]

      test.each(cases)('errorStructureHash: $params.errorStructureHash', ({ params }) => {
        const expected = false

        const args = {
          errorStructureHash: params.errorStructureHash,
        }
        const renderer = BaseRenderer.create(args)

        const actual = renderer.passesFilter

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('BaseRenderer', () => {
  describe('#render()', () => {
    describe('to throw error', () => {
      /** @type {ExpressType.Request} */
      const expressRequestMock = /** @type {*} */ ({})

      /** @type {RestfulApiType.ServerEngine} */
      const engineMock = /** @type {*} */ ({})

      /** @type {RestfulApiType.Visa} */
      const visaMock = /** @type {*} */ ({})

      const contextMock = BaseRestfulApiContext.create({
        expressRequest: expressRequestMock,
        engine: engineMock,
        userEntity: {
          id: 9999,
        },
        visa: visaMock,
        requestedAt: new Date(),
        uuid: '00000000-0000-0000-0000-000000000000',
      })

      /** @type {RestfulApiType.Request} */
      const restfulApiRequestMock = /** @type {*} */ ({})

      const cases = [
        {
          params: {
            errorResponseHash: {
              BadRequest: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 400,
                  errorMessage: 'Bad Request error occurred',
                },
              }),
              Unauthorized: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 401,
                  errorMessage: 'Unauthorized error occurred',
                },
              }),
              PaymentRequired: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 402,
                  errorMessage: 'Payment Required error occurred',
                },
              }),
            },
          },
        },
        {
          params: {
            errorResponseHash: {
              Forbidden: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 403,
                  errorMessage: 'Forbidden error occurred',
                },
              }),
              NotFound: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 404,
                  errorMessage: 'Not Found error occurred',
                },
              }),
              MethodNotAllowed: RestfulApiResponse.declareErrorRestfulApiResponse({
                errorEnvelope: {
                  statusCode: 405,
                  errorMessage: 'Method Not Allowed error occurred',
                },
              }),
            },
          },
        },
      ]

      test.each(cases)('errorStructureHash: $params.errorStructureHash', async ({ params }) => {
        const expected = 'concrete-member-not-found {"memberName":"BaseRenderer#render()"}'

        const args = {
          errorStructureHash: params.errorStructureHash,
        }
        const renderer = BaseRenderer.create(args)

        const renderArgs = {
          query: null,
          body: null,
          context: contextMock,
          request: restfulApiRequestMock,
        }

        await expect(renderer.render(renderArgs))
          .rejects
          .toThrow(expected)
      })
    })
  })
})
