import RestfulApiRequest from '../../../../../lib/server/restfulapi/interfaces/RestfulApiRequest.js'

describe('RestfulApiRequest', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#expressRequest', () => {
        const pathParameterHashProxyMock = new Proxy({}, {})

        /**
         * @type {Array<{
         *   params: {
         *     expressRequest: ExpressType.Request
         *   }
         * }
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

        test.each(cases)('expressRequest: $params.expressRequest', ({ params }) => {
          const args = {
            expressRequest: params.expressRequest,
            pathParameterHashProxy: pathParameterHashProxyMock,
          }
          const request = new RestfulApiRequest(args)

          expect(request)
            .toHaveProperty('expressRequest', params.expressRequest)
        })
      })

      describe('#pathParameterHashProxy', () => {
        /** @type {ExpressType.Request} */
        const expressRequestMock = /** @type {*} */ ({})

        /**
         * @type {Array<{
         *   params: {
         *     pathParameterHashProxy: ExpressType.Request['params']
         *   }
         * }>}
         */
        const cases = /** @type {*} */ ([
          {
            params: {
              pathParameterHashProxy: new Proxy({
                alpha: 1,
              }, {
                get: (target, key) => Reflect.get(target, key),
              }),
            },
          },
          {
            params: {
              pathParameterHashProxy: {
                query: {
                  beta: 2,
                },
              },
            },
          },
        ])

        test.each(cases)('expressRequest: $params.expressRequest', ({ params }) => {
          const args = {
            expressRequest: expressRequestMock,
            pathParameterHashProxy: params.pathParameterHashProxy,
          }
          const request = new RestfulApiRequest(args)

          expect(request)
            .toHaveProperty('pathParameterHashProxy', params.pathParameterHashProxy)
        })
      })
    })
  })
})

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

describe('RestfulApiRequest', () => {
  describe('.createPashParameterHashProxy()', () => {
    describe('with existing parameter', () => {
      /**
       * @type {Array<{
       *   params: {
       *     expressRequest: ExpressType.Request
       *   }
       *   cases: Array<{
       *     key: string
       *     expected: * // any type
       *   }>
       * }>}
       */
      const requestCases = /** @type {*} */ ([
        {
          params: {
            expressRequest: {
              params: {
                alpha: Symbol.for('alpha-value'),
                beta: Symbol.for('beta-value'),
              },
            },
          },
          cases: [
            {
              key: 'alpha',
              expected: Symbol.for('alpha-value'),
            },
            {
              key: 'beta',
              expected: Symbol.for('beta-value'),
            },
          ],
        },
        {
          params: {
            expressRequest: {
              params: {
                gamma: Symbol.for('alpha-value'),
                delta: Symbol.for('beta-value'),
              },
            },
          },
          cases: [
            {
              key: 'gamma',
              expected: Symbol.for('alpha-value'),
            },
            {
              key: 'delta',
              expected: Symbol.for('beta-value'),
            },
          ],
        },
      ])

      describe.each(requestCases)('expressRequest: $params.expressRequest', ({ params, cases }) => {
        const parameterHash = RestfulApiRequest.createPashParameterHashProxy(params)

        test.each(cases)('key: $key', ({ key, expected }) => {
          const actual = parameterHash[key]

          expect(actual)
            .toEqual(expected)
        })
      })
    })

    describe('with not-existing parameter', () => {
      /**
       * @type {Array<{
       *   params: {
       *     expressRequest: ExpressType.Request
       *   }
       *   cases: Array<{
       *     key: string
       *     expected: * // any type
       *   }>
       * }>}
       */
      const requestCases = /** @type {*} */ ([
        {
          params: {
            expressRequest: {
              params: {
                alpha: Symbol.for('alpha-value'),
                beta: Symbol.for('beta-value'),
              },
            },
          },
          cases: [
            { key: 'gamma' },
            { key: 'delta' },
          ],
        },
        {
          params: {
            expressRequest: {
              params: {
                gamma: Symbol.for('alpha-value'),
                delta: Symbol.for('beta-value'),
              },
            },
          },
          cases: [
            { key: 'alpha' },
            { key: 'beta' },
          ],
        },
      ])

      describe.each(requestCases)('expressRequest: $params.expressRequest', ({ params, cases }) => {
        const parameterHash = RestfulApiRequest.createPashParameterHashProxy(params)

        test.each(cases)('key: $key', ({ key }) => {
          const actual = parameterHash[key]

          expect(actual)
            .toBeNull()
        })
      })
    })
  })
})

describe('RestfulApiRequest', () => {
  describe('#get:pathParameterHash', () => {
    describe('with existing parameter', () => {
      /**
       * @type {Array<{
       *   params: {
       *     expressRequest: ExpressType.Request
       *   }
       *   cases: Array<{
       *     key: string
       *     expected: * // any type
       *   }>
       * }>}
       */
      const requestCases = /** @type {*} */ ([
        {
          params: {
            expressRequest: {
              params: {
                alpha: Symbol.for('alpha-value'),
                beta: Symbol.for('beta-value'),
              },
            },
          },
          cases: [
            {
              key: 'alpha',
              expected: Symbol.for('alpha-value'),
            },
            {
              key: 'beta',
              expected: Symbol.for('beta-value'),
            },
          ],
        },
        {
          params: {
            expressRequest: {
              params: {
                gamma: Symbol.for('alpha-value'),
                delta: Symbol.for('beta-value'),
              },
            },
          },
          cases: [
            {
              key: 'gamma',
              expected: Symbol.for('alpha-value'),
            },
            {
              key: 'delta',
              expected: Symbol.for('beta-value'),
            },
          ],
        },
      ])

      describe.each(requestCases)('expressRequest: $params.expressRequest', ({ params, cases }) => {
        const request = RestfulApiRequest.create(params)

        const parameterHash = request.pathParameterHash

        test.each(cases)('key: $key', ({ key, expected }) => {
          const actual = parameterHash[key]

          expect(actual)
            .toEqual(expected)
        })
      })
    })

    describe('with not-existing parameter', () => {
      /**
       * @type {Array<{
       *   params: {
       *     expressRequest: ExpressType.Request
       *   }
       *   cases: Array<{
       *     key: string
       *     expected: * // any type
       *   }>
       * }>}
       */
      const requestCases = /** @type {*} */ ([
        {
          params: {
            expressRequest: {
              params: {
                alpha: Symbol.for('alpha-value'),
                beta: Symbol.for('beta-value'),
              },
            },
          },
          cases: [
            { key: 'gamma' },
            { key: 'delta' },
          ],
        },
        {
          params: {
            expressRequest: {
              params: {
                gamma: Symbol.for('alpha-value'),
                delta: Symbol.for('beta-value'),
              },
            },
          },
          cases: [
            { key: 'alpha' },
            { key: 'beta' },
          ],
        },
      ])

      describe.each(requestCases)('expressRequest: $params.expressRequest', ({ params, cases }) => {
        const request = RestfulApiRequest.create(params)

        const parameterHash = request.pathParameterHash

        test.each(cases)('key: $key', ({ key }) => {
          const actual = parameterHash[key]

          expect(actual)
            .toBeNull()
        })
      })
    })
  })
})
