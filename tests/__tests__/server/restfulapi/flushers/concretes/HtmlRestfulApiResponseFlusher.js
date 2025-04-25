import HtmlRestfulApiResponseFlusher from '../../../../../../lib/server/restfulapi/flushers/concretes/HtmlRestfulApiResponseFlusher.js'

import BaseRestfulApiResponseFlusher from '../../../../../../lib/server/restfulapi/flushers/BaseRestfulApiResponseFlusher.js'
import RestfulApiResponse from '../../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'
import RenchanRestfulApiError from '../../../../../../lib/server/restfulapi/errors/RenchanRestfulApiError.js'

describe('HtmlRestfulApiResponseFlusher', () => {
  describe('super class', () => {
    test('to be BaseRestfulApiResponseFlusher', () => {
      const actual = HtmlRestfulApiResponseFlusher.prototype

      expect(actual)
        .toBeInstanceOf(BaseRestfulApiResponseFlusher)
    })
  })
})

describe('HtmlRestfulApiResponseFlusher', () => {
  describe('.get:contentType', () => {
    test('to be fixed value', () => {
      const expected = 'text/html'

      const actual = HtmlRestfulApiResponseFlusher.contentType

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('HtmlRestfulApiResponseFlusher', () => {
  describe('#flushResponseBody', () => {
    /** @type {ExpressType.Response} */
    const expressResponseMock = /** @type {*} */ ({
      send (args) {
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
            content: '<DOCTYPE html><html><head></head><body>alpha value</body></html>',
            error: null,
          }),
        },
        expected: '<DOCTYPE html><html><head></head><body>alpha value</body></html>',
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
        expected: null,
      },
    ]

    test.each(cases)('renderResponse: $params.renderResponse', ({ params, expected }) => {
      const flusher = new HtmlRestfulApiResponseFlusher({
        expressResponse: expressResponseMock,
        renderResponse: params.renderResponse,
      })

      const sendSpy = jest.spyOn(expressResponseMock, 'send')

      flusher.flushResponseBody()

      expect(sendSpy)
        .toHaveBeenCalledWith(expected)
    })
  })
})
