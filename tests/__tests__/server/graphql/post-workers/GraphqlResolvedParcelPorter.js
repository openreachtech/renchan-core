import GraphqlResolvedParcelPorter from '../../../../../lib/server/graphql/post-workers/GraphqlResolvedParcelPorter.js'

describe('GraphqlResolvedParcelPorter', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      const cases = [
        {
          params: {
            parcelMap: new WeakMap(),
          },
        },
      ]

      test.each(cases)('parcelMap: $params.parcelMap', ({ params }) => {
        const porter = new GraphqlResolvedParcelPorter(params)

        expect(porter)
          .toHaveProperty('parcelMap', params.parcelMap)
      })
    })
  })
})

describe('GraphqlResolvedParcelPorter', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            parcelMap: new WeakMap(),
          },
        },
      ]

      test.each(cases)('parcelMap: $params.parcelMap', ({ params }) => {
        const porter = GraphqlResolvedParcelPorter.create(params)

        expect(porter)
          .toBeInstanceOf(GraphqlResolvedParcelPorter)
      })

      test('with no parameters', () => {
        const porter = GraphqlResolvedParcelPorter.create()

        expect(porter)
          .toBeInstanceOf(GraphqlResolvedParcelPorter)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            parcelMap: new WeakMap(),
          },
        },
      ]

      test.each(cases)('parcelMap: $params.parcelMap', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(GraphqlResolvedParcelPorter)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })

      test('with no parameters', () => {
        const expectedArgs = {
          parcelMap: new WeakMap(),
        }

        const SpyClass = globalThis.constructorSpy.spyOn(GraphqlResolvedParcelPorter)

        SpyClass.create()

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expectedArgs)
      })
    })
  })
})

describe('GraphqlResolvedParcelPorter', () => {
  describe('.createParcelMap()', () => {
    test('to be fixed value', () => {
      const actual = GraphqlResolvedParcelPorter.createParcelMap()

      expect(actual)
        .toBeInstanceOf(WeakMap)
    })
  })
})

describe('GraphqlResolvedParcelPorter', () => {
  describe('#saveParcel()', () => {
    /**
     * @type {Array<{
     *   params: {
     *     expressRequest: ExpressType.Request
     *     parcel: GraphqlType.OnResolvedParcel
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          expressRequest: {
            headers: {
              'x-renchan-access-token': 'alpha-0001',
            },
          },
          parcel: {
            variables: {
              input: {
                value: 'alpha-value',
              },
            },
            context: {},
            information: {},
            response: {
              output: {},
              error: null,
            },
          },
        },
      },
      {
        params: {
          expressRequest: {
            headers: {
              'x-renchan-access-token': 'beta-0002',
            },
          },
          parcel: {
            variables: {
              input: {
                value: 'beta-value',
              },
            },
            context: {},
            information: {},
            response: {
              output: {},
              error: null,
            },
          },
        },
      },
    ])

    test.each(cases)('expressRequest: $params.expressRequest', ({ params }) => {
      const porter = GraphqlResolvedParcelPorter.create()

      const args = {
        expressRequest: params.expressRequest,
        parcel: params.parcel,
      }

      porter.saveParcel(args)

      const actual = porter.parcelMap.get(args.expressRequest)

      expect(actual)
        .toEqual(params.parcel)
    })
  })
})

describe('GraphqlResolvedParcelPorter', () => {
  describe('#loadParcel()', () => {
    describe('to be saved parcel', () => {
      /**
       * @type {Array<{
       *   params: {
       *     expressRequest: ExpressType.Request
       *     parcel: GraphqlType.OnResolvedParcel
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            expressRequest: {
              headers: {
                'x-renchan-access-token': 'alpha-0001',
              },
            },
            parcel: {
              variables: {
                input: {
                  value: 'alpha-value',
                },
              },
              context: {},
              information: {},
              response: {
                output: {},
                error: null,
              },
            },
          },
        },
        {
          params: {
            expressRequest: {
              headers: {
                'x-renchan-access-token': 'beta-0002',
              },
            },
            parcel: {
              variables: {
                input: {
                  value: 'beta-value',
                },
              },
              context: {},
              information: {},
              response: {
                output: {},
                error: null,
              },
            },
          },
        },
      ])

      test.each(cases)('expressRequest: $params.expressRequest', ({ params }) => {
        const porter = GraphqlResolvedParcelPorter.create()

        const saveArgs = {
          expressRequest: params.expressRequest,
          parcel: params.parcel,
        }
        porter.saveParcel(saveArgs)

        const loadArgs = {
          expressRequest: params.expressRequest,
        }
        const actual = porter.loadParcel(loadArgs)

        expect(actual)
          .toBe(params.parcel) // same reference
      })
    })

    describe('to be null with not saved Express request', () => {
      /** @type {ExpressType.Request} */
      const unknownExpressRequest = /** @type {*} */ ({
        headers: {
          'x-renchan-access-token': 'unknown-0002',
        },
      })

      /**
       * @type {Array<{
       *   params: {
       *     expressRequest: ExpressType.Request
       *     parcel: GraphqlType.OnResolvedParcel
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            expressRequest: {
              headers: {
                'x-renchan-access-token': 'alpha-0001',
              },
            },
            parcel: {
              variables: {
                input: {
                  value: 'alpha-value',
                },
              },
              context: {},
              information: {},
              response: {
                output: {},
                error: null,
              },
            },
          },
        },
        {
          params: {
            expressRequest: {
              headers: {
                'x-renchan-access-token': 'beta-0002',
              },
            },
            parcel: {
              variables: {
                input: {
                  value: 'beta-value',
                },
              },
              context: {},
              information: {},
              response: {
                output: {},
                error: null,
              },
            },
          },
        },
      ])

      test.each(cases)('expressRequest: $params.expressRequest', ({ params }) => {
        const porter = GraphqlResolvedParcelPorter.create()

        const saveArgs = {
          expressRequest: params.expressRequest,
          parcel: params.parcel,
        }
        porter.saveParcel(saveArgs)

        const loadArgs = {
          expressRequest: unknownExpressRequest,
        }
        const actual = porter.loadParcel(loadArgs)

        expect(actual)
          .toBeNull()
      })
    })
  })
})
