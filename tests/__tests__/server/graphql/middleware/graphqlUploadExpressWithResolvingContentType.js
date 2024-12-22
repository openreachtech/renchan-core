import graphqlUploadExpressWithResolvingContentType from '../../../../../lib/server/graphql/middleware/graphqlUploadExpressWithResolvingContentType'

describe('graphqlUploadExpressWithResolvingContentType', () => {
  describe('to be a function', () => {
    const cases = [
      {
        params: {
          options: {},
        },
      },
      {
        params: {
          options: {
            maxFileSize: 10000,
          },
        },
      },
      {
        params: {
          options: {
            maxFileSize: 10000000,
            maxFiles: 10,
          },
        },
      },
    ]
    test.each(cases)('options: $params.options', ({ params }) => {
      const actual = graphqlUploadExpressWithResolvingContentType(params.options)

      expect(actual)
        .toBeInstanceOf(Function)
    })
  })

  describe('to set `application/json`', () => {
    const expressRequestMock = {
      is (contentType) {
        return this.headers['content-type'] === contentType
      },
      on () {
        return this
      },
    }

    /**
     * @type {Array<{
     *   params: {
     *     options: Parameters<graphqlUploadExpressWithResolvingContentType>[0],
     *     expressRequest: ExpressType.Request,
     *   },
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          options: {
            maxFileSize: 10000,
          },
          expressRequest: {
            __proto__: expressRequestMock,

            headers: {
              'content-type': 'multipart/form-data',
            },
          },
        },
      },
      {
        params: {
          options: {
            maxFileSize: 10000000,
            maxFiles: 10,
          },
          expressRequest: {
            __proto__: expressRequestMock,

            headers: {
              'content-type': 'application/json',
            },
          },
        },
      },
    ])

    test.each(cases)('options: $params.options', async ({ params }) => {
      const expected = 'application/json'

      const middleware = graphqlUploadExpressWithResolvingContentType(params.options)

      await new Promise(resolve => {
        middleware(
          params.expressRequest,
          /** @type {ExpressType.Response} */ ({}),
          resolve
        )
      })

      expect(params.expressRequest.headers['content-type'])
        .toBe(expected)
    })
  })
})
