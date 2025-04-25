import JsonRestfulApiResponseFlusher from '../../../../../../lib/server/restfulapi/flushers/concretes/JsonRestfulApiResponseFlusher.js'

import BaseRestfulApiResponseFlusher from '../../../../../../lib/server/restfulapi/flushers/BaseRestfulApiResponseFlusher.js'
import RestfulApiResponse from '../../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'
import RenchanRestfulApiError from '../../../../../../lib/server/restfulapi/errors/RenchanRestfulApiError.js'

describe('JsonRestfulApiResponseFlusher', () => {
  describe('super class', () => {
    test('to be BaseRestfulApiResponseFlusher', () => {
      const actual = JsonRestfulApiResponseFlusher.prototype

      expect(actual)
        .toBeInstanceOf(BaseRestfulApiResponseFlusher)
    })
  })
})

describe('JsonRestfulApiResponseFlusher', () => {
  describe('.get:contentType', () => {
    test('to be fixed value', () => {
      const expected = 'application/json'

      const actual = JsonRestfulApiResponseFlusher.contentType

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('JsonRestfulApiResponseFlusher', () => {
  describe('#flushResponseBody', () => {
    /** @type {ExpressType.Response} */
    const expressResponseMock = /** @type {*} */ ({
      json (args) {
        return this
      },
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
          renderResponse: new RestfulApiResponse({
            statusCode: 200,
            headers: {
              first: 'alpha value',
            },
            content: {
              alpha: 'alpha value',
              beta: 'beta value',
            },
            error: null,
          }),
        },
        expected: {
          content: {
            alpha: 'alpha value',
            beta: 'beta value',
          },
          error: null,
        },
      },
      {
        params: {
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
          content: null,
          error: RenchanRestfulApiError.create({
            code: '500',
          }),
        },
      },
    ]

    test.each(cases)('renderResponse: $params.renderResponse', ({ params, expected }) => {
      const flusher = new JsonRestfulApiResponseFlusher({
        expressResponse: expressResponseMock,
        renderResponse: params.renderResponse,
      })

      const generateJsonBodySpy = jest.spyOn(flusher, 'generateJsonBody')
      const jsonSpy = jest.spyOn(expressResponseMock, 'json')

      flusher.flushResponseBody()

      expect(generateJsonBodySpy)
        .toHaveBeenCalledWith()
      expect(jsonSpy)
        .toHaveBeenCalledWith(expected)
    })
  })
})

describe('JsonRestfulApiResponseFlusher', () => {
  describe('#generateJsonBody', () => {
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
          renderResponse: new RestfulApiResponse({
            statusCode: 200,
            headers: {
              first: 'alpha value',
            },
            content: {
              alpha: 'alpha value',
              beta: 'beta value',
            },
            error: null,
          }),
        },
        expected: {
          content: {
            alpha: 'alpha value',
            beta: 'beta value',
          },
          error: null,
        },
      },
      {
        params: {
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
          content: null,
          error: RenchanRestfulApiError.create({
            code: '500',
          }),
        },
      },
    ]

    test.each(cases)('renderResponse: $params.renderResponse', ({ params, expected }) => {
      const flusher = new JsonRestfulApiResponseFlusher({
        expressResponse: expressResponseMock,
        renderResponse: params.renderResponse,
      })

      const actual = flusher.generateJsonBody()

      expect(actual)
        .toEqual(expected)
    })
  })
})
