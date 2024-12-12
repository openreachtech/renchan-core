import RestfulApiRequest from '../../../../../lib/server/restfulapi/interfaces/RestfulApiRequest.js'

describe('RestfulApiRequest', () => {
  describe('.create()', () => {
    /**
     * @type {Array<{
     *   params: {
     *     expressRequest: ExpressType.Request
     *   }
     * }>}
     */
    const cases = /** @type {*} */ ([
      {
        params: {
          expressRequest: {
            query: {
              alpha: 1,
            },
          },
        },
      },
      {
        params: {
          expressRequest: {
            query: {
              beta: 2,
            },
          },
        },
      },
    ])

    describe('to be instance of own class', () => {
      test.each(cases)('expressRequest: $params.expressRequest', ({ params }) => {
        const error = RestfulApiRequest.create(params)

        expect(error)
          .toBeInstanceOf(RestfulApiRequest)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('expressRequest: $params.expressRequest', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(RestfulApiRequest)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('RestfulApiRequest', () => {
  describe('.get:headers', () => {
    /**
     * @type {Array<{
     *   params: {
     *     expressRequest: ExpressType.Request
     *   }
     *   expected: Headers
     * }>}
     */
    const cases = /** @type {*} */ ([
      {
        params: {
          expressRequest: {
            headers: {
              alpha: Symbol.for('alpha-value'),
            },
          },
        },
        expected: {
          alpha: Symbol.for('alpha-value'),
        },
      },
      {
        params: {
          expressRequest: {
            headers: {
              beta: Symbol.for('beta-value'),
            },
          },
        },
        expected: {
          beta: Symbol.for('beta-value'),
        },
      },
    ])

    test.each(cases)('expressRequest: $params.expressRequest', ({ params, expected }) => {
      const request = RestfulApiRequest.create(params)

      const actual = request.headers

      expect(actual)
        .toEqual(expected)
    })
  })
})
