import CsvRestfulApiResponseFlusher from '../../../../../../lib/server/restfulapi/flushers/concretes/CsvRestfulApiResponseFlusher.js'

import BaseRestfulApiResponseFlusher from '../../../../../../lib/server/restfulapi/flushers/BaseRestfulApiResponseFlusher.js'
import RestfulApiResponse from '../../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'
import RenchanRestfulApiError from '../../../../../../lib/server/restfulapi/errors/RenchanRestfulApiError.js'

describe('CsvRestfulApiResponseFlusher', () => {
  describe('super class', () => {
    test('to be BaseRestfulApiResponseFlusher', () => {
      const actual = CsvRestfulApiResponseFlusher.prototype

      expect(actual)
        .toBeInstanceOf(BaseRestfulApiResponseFlusher)
    })
  })
})

describe('CsvRestfulApiResponseFlusher', () => {
  describe('.get:contentType', () => {
    test('to be fixed value', () => {
      const expected = 'text/csv'

      const actual = CsvRestfulApiResponseFlusher.contentType

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('CsvRestfulApiResponseFlusher', () => {
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
            content: 'id,name,value\n1,Alpha,alpha value\n',
            error: null,
          }),
        },
        expected: 'id,name,value\n1,Alpha,alpha value\n',
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
      const flusher = new CsvRestfulApiResponseFlusher({
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
