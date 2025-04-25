import BaseRestfulApiResponseFlusher from '../../../../../lib/server/restfulapi/flushers/BaseRestfulApiResponseFlusher.js'

import RestfulApiResponse from '../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'
import RenchanRestfulApiError from '../../../../../lib/server/restfulapi/errors/RenchanRestfulApiError.js'
import ConcreteMemberNotFoundRestfulApiError from '../../../../../lib/server/restfulapi/errors/concretes/ConcreteMemberNotFoundRestfulApiError.js'

describe('BaseRestfulApiResponseFlusher', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#expressResponse', () => {
        /** @type {ExpressType.Response} */
        const alphaExpressResponse = /** @type {*} */ ({
          tally: Symbol('alpha tally'),
        })

        /** @type {ExpressType.Response} */
        const betaExpressResponse = /** @type {*} */ ({
          tally: Symbol('beta tally'),
        })

        const restfulApiResponseMock = new RestfulApiResponse({
          statusCode: 200,
          headers: {
            'X-Alpha': 'alpha',
          },
          content: {
            alpha: 'alpha',
          },
          error: null,
        })

        const cases = [
          {
            params: {
              expressResponse: alphaExpressResponse,
            },
          },
          {
            params: {
              expressResponse: betaExpressResponse,
            },
          },
        ]

        test.each(cases)('expressResponse: $params.expressResponse', ({ params }) => {
          const args = {
            expressResponse: params.expressResponse,
            renderResponse: restfulApiResponseMock,
          }

          const flusher = new BaseRestfulApiResponseFlusher(args)

          expect(flusher)
            .toHaveProperty('expressResponse', params.expressResponse)
        })
      })

      describe('#renderResponse', () => {
        /** @type {ExpressType.Response} */
        const expressResponseMock = /** @type {*} */ ({
          tally: Symbol('alpha tally'),
        })

        const cases = [
          {
            params: {
              renderResponse: new RestfulApiResponse({
                statusCode: 200,
                headers: {
                  'X-Alpha': 'alpha',
                },
                content: {
                  alpha: 'alpha',
                },
                error: null,
              }),
            },
          },
          {
            params: {
              renderResponse: new RestfulApiResponse({
                statusCode: 500,
                headers: {
                  'X-Alpha': 'alpha',
                },
                content: null,
                error: RenchanRestfulApiError.create({
                  code: '500',
                }),
              }),
            },
          },
        ]

        test.each(cases)('renderResponse: $params.renderResponse', ({ params }) => {
          const args = {
            expressResponse: expressResponseMock,
            renderResponse: params.renderResponse,
          }

          const flusher = new BaseRestfulApiResponseFlusher(args)

          expect(flusher)
            .toHaveProperty('renderResponse', params.renderResponse)
        })
      })
    })
  })
})

describe('BaseRestfulApiResponseFlusher', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            expressResponse: /** @type {*} */ ({
              tally: Symbol('alpha tally'),
            }),
            renderResponse: new RestfulApiResponse({
              statusCode: 200,
              headers: {
                'X-Alpha': 'alpha',
              },
              content: {
                alpha: 'alpha',
              },
              error: null,
            }),
          },
        },
        {
          params: {
            expressResponse: /** @type {*} */ ({
              tally: Symbol('beta tally'),
            }),
            renderResponse: new RestfulApiResponse({
              statusCode: 500,
              headers: {
                'X-Alpha': 'alpha',
              },
              content: null,
              error: RenchanRestfulApiError.create({
                code: '500',
              }),
            }),
          },
        },
      ]

      test.each(cases)('expressResponse: $params.expressResponse', ({ params }) => {
        const actual = BaseRestfulApiResponseFlusher.create(params)

        expect(actual)
          .toBeInstanceOf(BaseRestfulApiResponseFlusher)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            expressResponse: /** @type {*} */ ({
              tally: Symbol('alpha tally'),
            }),
            renderResponse: new RestfulApiResponse({
              statusCode: 200,
              headers: {
                'X-Alpha': 'alpha',
              },
              content: {
                alpha: 'alpha',
              },
              error: null,
            }),
          },
        },
        {
          params: {
            expressResponse: /** @type {*} */ ({
              tally: Symbol('beta tally'),
            }),
            renderResponse: new RestfulApiResponse({
              statusCode: 500,
              headers: {
                'X-Alpha': 'alpha',
              },
              content: null,
              error: RenchanRestfulApiError.create({
                code: '500',
              }),
            }),
          },
        },
      ]

      test.each(cases)('expressResponse: $params.expressResponse', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(BaseRestfulApiResponseFlusher)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('BaseRestfulApiResponseFlusher', () => {
  describe('.get:contentType', () => {
    test('to throw ConcreteMemberNotFoundRestfulApiError', () => {
      const expected = ConcreteMemberNotFoundRestfulApiError.create({
        value: {
          memberName: 'BaseRestfulApiResponseFlusher.get:contentType',
        },
      })

      expect(() => BaseRestfulApiResponseFlusher.contentType)
        .toThrow(expected)
    })
  })
})

describe('BaseRestfulApiResponseFlusher', () => {
  describe('.get:headers', () => {
    describe('to throw ConcreteMemberNotFoundRestfulApiError', () => {
      test('on call as is', () => {
        const expected = ConcreteMemberNotFoundRestfulApiError.create({
          value: {
            memberName: 'BaseRestfulApiResponseFlusher.get:contentType',
          },
        })

        expect(() => BaseRestfulApiResponseFlusher.headers)
          .toThrow(expected)
      })
    })

    describe('to be headers with "Content-Type"', () => {
      const cases = [
        {
          params: {
            contentType: 'application/json',
          },
          expected: {
            'Content-Type': 'application/json',
          },
        },
        {
          params: {
            contentType: 'text/html',
          },
          expected: {
            'Content-Type': 'text/html',
          },
        },
      ]

      test.each(cases)('Content-Type: $params.contentType', ({ params, expected }) => {
        jest.spyOn(BaseRestfulApiResponseFlusher, 'contentType', 'get')
          .mockReturnValue(params.contentType)

        const actual = BaseRestfulApiResponseFlusher.headers

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('#get:Ctor', () => {
    describe('to be own class', () => {
      /** @type {ExpressType.Response} */
      const alphaExpressResponse = /** @type {*} */ ({
        status: 200,
        tally: Symbol('alpha tally'),
      })

      /** @type {ExpressType.Response} */
      const betaExpressResponse = /** @type {*} */ ({
        status: 500,
        tally: Symbol('beta tally'),
      })

      const cases = [
        {
          params: {
            expressResponse: alphaExpressResponse,
            renderResponse: new RestfulApiResponse({
              statusCode: 200,
              headers: {
                'X-Alpha': 'alpha',
              },
              content: {
                alpha: 'alpha',
              },
              error: null,
            }),
          },
        },
        {
          params: {
            expressResponse: betaExpressResponse,
            renderResponse: new RestfulApiResponse({
              statusCode: 500,
              headers: {
                'X-Alpha': 'alpha',
              },
              content: null,
              error: RenchanRestfulApiError.create({
                code: '500',
              }),
            }),
          },
        },
      ]

      test.each(cases)('Ctor: $params.PostWorker.name', ({ params }) => {
        const flusher = new BaseRestfulApiResponseFlusher(params)

        const actual = flusher.Ctor

        expect(actual)
          .toBe(BaseRestfulApiResponseFlusher) // same reference
      })
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('#flushResponse()', () => {
    describe('to call members', () => {
      /** @type {ExpressType.Response} */
      const expressResponseMock = /** @type {*} */ ({
        status (args) {
          return this
        },
        set (args) {
          return this
        },
      })

      const cases = [
        {
          params: {
            contentType: 'application/json',
            renderResponse: new RestfulApiResponse({
              statusCode: 200,
              headers: {
                first: 'alpha value',
              },
              content: {},
              error: null,
            }),
          },
        },
        {
          params: {
            contentType: 'text/html',
            renderResponse: new RestfulApiResponse({
              statusCode: 500,
              headers: {
                second: 'beta value',
              },
              content: null,
              error: RenchanRestfulApiError.create({
                code: '500',
              }),
            }),
          },
        },
      ]

      test.each(cases)('contentType: $params.contentType', ({ params }) => {
        jest.spyOn(BaseRestfulApiResponseFlusher, 'contentType', 'get')
          .mockReturnValue(params.contentType)

        const args = {
          expressResponse: expressResponseMock,
          renderResponse: params.renderResponse,
        }
        const flusher = new BaseRestfulApiResponseFlusher(args)

        const flushStatusSpy = jest.spyOn(flusher, 'flushStatus')
        const flushHeadersSpy = jest.spyOn(flusher, 'flushHeaders')
        const flushResponseBodySpy = jest.spyOn(flusher, 'flushResponseBody')
          .mockImplementation(() => {})

        flusher.flushResponse()

        expect(flushStatusSpy)
          .toHaveBeenCalledWith()
        expect(flushHeadersSpy)
          .toHaveBeenCalledWith()
        expect(flushResponseBodySpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('#flushStatus()', () => {
    describe('to call ExpressResponse#status()', () => {
      /** @type {ExpressType.Response} */
      const expressResponseMock = /** @type {*} */ ({
        status (args) {
          return this
        },
        set (args) {
          return this
        },
      })

      const cases = [
        {
          params: {
            contentType: 'application/json',
            renderResponse: new RestfulApiResponse({
              statusCode: 200,
              headers: {
                first: 'alpha value',
              },
              content: {},
              error: null,
            }),
          },
          expected: 200,
        },
        {
          params: {
            contentType: 'text/html',
            renderResponse: new RestfulApiResponse({
              statusCode: 500,
              headers: {
                second: 'beta value',
              },
              content: null,
              error: RenchanRestfulApiError.create({
                code: '500',
              }),
            }),
          },
          expected: 500,
        },
      ]

      test.each(cases)('contentType: $params.contentType', ({ params, expected }) => {
        const statusSpy = jest.spyOn(expressResponseMock, 'status')

        const args = {
          expressResponse: expressResponseMock,
          renderResponse: params.renderResponse,
        }
        const flusher = new BaseRestfulApiResponseFlusher(args)

        flusher.flushStatus()

        expect(statusSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('#flushHeaders()', () => {
    describe('to call ExpressResponse#set()', () => {
      /** @type {ExpressType.Response} */
      const expressResponseMock = /** @type {*} */ ({
        status (args) {
          return this
        },
        set (args) {
          return this
        },
      })

      const cases = [
        {
          params: {
            contentType: 'application/json',
            renderResponse: new RestfulApiResponse({
              statusCode: 200,
              headers: {
                first: 'alpha value',
              },
              content: {},
              error: null,
            }),
          },
          expected: {
            'Content-Type': 'application/json',
            first: 'alpha value',
          },
        },
        {
          params: {
            contentType: 'text/html',
            renderResponse: new RestfulApiResponse({
              statusCode: 500,
              headers: {
                second: 'beta value',
              },
              content: null,
              error: RenchanRestfulApiError.create({
                code: '500',
              }),
            }),
          },
          expected: {
            'Content-Type': 'text/html',
            second: 'beta value',
          },
        },
      ]

      test.each(cases)('contentType: $params.contentType', ({ params, expected }) => {
        const args = {
          expressResponse: expressResponseMock,
          renderResponse: params.renderResponse,
        }
        const flusher = new BaseRestfulApiResponseFlusher(args)

        jest.spyOn(BaseRestfulApiResponseFlusher, 'contentType', 'get')
          .mockReturnValue(params.contentType)
        const setSpy = jest.spyOn(expressResponseMock, 'set')
        const collectHeadersSpy = jest.spyOn(flusher, 'collectHeaders')

        flusher.flushHeaders()

        expect(collectHeadersSpy)
          .toHaveBeenCalledWith()
        expect(setSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('#collectHeaders()', () => {
    describe('to be fixed value', () => {
      /** @type {ExpressType.Response} */
      const expressResponseMock = /** @type {*} */ ({
        status: 200,
        tally: Symbol('alpha tally'),
      })

      const cases = [
        {
          params: {
            contentType: 'application/json',
            renderResponse: new RestfulApiResponse({
              statusCode: 200,
              headers: {
                first: 'alpha value',
              },
              content: {},
              error: null,
            }),
          },
          expected: {
            'Content-Type': 'application/json',
            first: 'alpha value',
          },
        },
        {
          params: {
            contentType: 'text/html',
            renderResponse: new RestfulApiResponse({
              statusCode: 500,
              headers: {
                second: 'beta value',
              },
              content: null,
              error: RenchanRestfulApiError.create({
                code: '500',
              }),
            }),
          },
          expected: {
            'Content-Type': 'text/html',
            second: 'beta value',
          },
        },
      ]

      test.each(cases)('contentType: $params.contentType', ({ params, expected }) => {
        jest.spyOn(BaseRestfulApiResponseFlusher, 'contentType', 'get')
          .mockReturnValue(params.contentType)

        const args = {
          expressResponse: expressResponseMock,
          renderResponse: params.renderResponse,
        }
        const flusher = new BaseRestfulApiResponseFlusher(args)

        const actual = flusher.collectHeaders()

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('#flushResponseBody()', () => {
    describe('to throw', () => {
      const cases = [
        {
          params: {
            expressResponse: /** @type {*} */ ({
              tally: Symbol('alpha tally'),
            }),
            renderResponse: new RestfulApiResponse({
              statusCode: 200,
              headers: {
                'X-Alpha': 'alpha',
              },
              content: {
                alpha: 'alpha',
              },
              error: null,
            }),
          },
        },
        {
          params: {
            expressResponse: /** @type {*} */ ({
              tally: Symbol('beta tally'),
            }),
            renderResponse: new RestfulApiResponse({
              statusCode: 500,
              headers: {
                'X-Alpha': 'alpha',
              },
              content: null,
              error: RenchanRestfulApiError.create({
                code: '500',
              }),
            }),
          },
        },
      ]

      test.each(cases)('expressResponse: $params.expressResponse', ({ params }) => {
        const expected = ConcreteMemberNotFoundRestfulApiError.create({
          value: {
            memberName: 'BaseRestfulApiResponseFlusher#flushResponseBody()',
          },
        })

        const args = {
          expressResponse: /** @type {*} */ ({
            tally: Symbol('alpha tally'),
          }),
          renderResponse: new RestfulApiResponse({
            statusCode: 200,
            headers: {
              'X-Alpha': 'alpha',
            },
            content: {
              alpha: 'alpha',
            },
            error: null,
          }),
        }
        const flusher = new BaseRestfulApiResponseFlusher(args)

        expect(() => flusher.flushResponseBody())
          .toThrow(expected)
      })
    })
  })
})
