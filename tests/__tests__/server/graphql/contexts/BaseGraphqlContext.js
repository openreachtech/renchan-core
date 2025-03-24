import BaseGraphqlContext from '../../../../../lib/server/graphql/contexts/BaseGraphqlContext.js'
import GraphqlVisa from '../../../../../lib/server/graphql/contexts/GraphqlVisa.js'

import CustomerGraphqlServerEngine from '../../../../../app/server/graphql/CustomerGraphqlServerEngine.js'
import AdminGraphqlServerEngine from '../../../../../app/server/graphql/AdminGraphqlServerEngine.js'
import BaseGraphqlServerEngine from '../../../../../lib/server/graphql/BaseGraphqlServerEngine.js'

import CustomerGraphqlShare from '../../../../../app/server/graphql/contexts/CustomerGraphqlShare.js'
import AdminGraphqlShare from '../../../../../app/server/graphql/contexts/AdminGraphqlShare.js'

import SubscriptionBroker from '../../../../../lib/server/graphql/subscription/SubscriptionBroker.js'

import StubExpressRequest from '../../../../stubs/StubExpressRequest.js'

describe('BaseGraphqlContext', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      /** @type {ExpressType.Request} */
      const stubExpressRequest = /** @type {*} */ (
        StubExpressRequest.create()
      )

      const queryMock = `
        subscription OnObserveChatStates ($input: OnObserveChatStatesInput!) {
          onObserveChatStates (input: $input) {
            hasUnreadMessages
            isUpdatedMembers
          }
        }
      `

      /** @type {GraphqlType.WebSocketRequestParams} */
      const stubRequestParams = {
        id: '98765432-abcd-0000-1234-000000000001',
        type: 'subscribe',
        payload: {
          query: queryMock,
          context: {
            headers: {
              'x-renchan-access-token': 'omega',
            },
          },
          variables: {
            roomId: 999999,
          },
        },
      }

      /** @type {renchan.UserEntity} */
      const mockUser = /** @type {*} */ ({})

      /** @type {GraphqlType.ServerEngine} */
      const mockEngine = /** @type {*} */ ({})

      /** @type {GraphqlType.Visa} */
      const mockVisa = /** @type {*} */ ({})

      describe('#expressRequest', () => {
        /**
         * @type {Array<{
         *   params: {
         *     expressRequest: ExpressType.Request
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              expressRequest: {
                path: '/graphql-customer',
              },
            },
          },
          {
            params: {
              expressRequest: {
                path: '/graphql-admin',
              },
            },
          },
        ])

        test.each(cases)('req.path: $params.expressRequest.path', ({ params }) => {
          const args = {
            expressRequest: params.expressRequest,
            requestParams: stubRequestParams,
            engine: mockEngine,
            userEntity: mockUser,
            visa: mockVisa,
            requestedAt: new Date(),
            uuid: '98765432-abcd-0000-1234-000000000001',
          }

          const context = new BaseGraphqlContext(args)

          expect(context)
            .toHaveProperty('expressRequest', params.expressRequest)
        })
      })

      describe('#requestParams', () => {
        /**
         * @type {Array<{
         *   params: {
         *     requestParams: GraphqlType.WebSocketRequestParams
         *   }
         * }>}
         */
        const cases = [
          {
            params: {
              requestParams: {
                id: '98765432-abcd-0000-1234-000000000001',
                type: 'subscribe',
                payload: {
                  query: queryMock,
                  context: {
                    headers: {
                      'x-renchan-access-token': 'alpha',
                    },
                  },
                  variables: {
                    roomId: 1000001,
                  },
                },
              },
            },
          },
          {
            params: {
              requestParams: {
                id: '98765432-abcd-0000-1234-000000000002',
                type: 'subscribe',
                payload: {
                  query: queryMock,
                  context: {
                    headers: {
                      'x-renchan-access-token': 'beta',
                    },
                  },
                  variables: {
                    roomId: 1000002,
                  },
                },
              },
            },
          },
        ]

        test.each(cases)('headers: $params.requestParams.payload.context.headers', ({ params }) => {
          const args = {
            expressRequest: stubExpressRequest,
            requestParams: params.requestParams,
            engine: mockEngine,
            userEntity: mockUser,
            visa: mockVisa,
            requestedAt: new Date(),
            uuid: '98765432-abcd-0000-1234-999999999991',
          }

          const context = new BaseGraphqlContext(args)

          expect(context)
            .toHaveProperty('requestParams', params.requestParams)
        })
      })

      describe('#userEntity', () => {
        /**
         * @type {Array<{
         *   params: {
         *     userEntity: renchan.UserEntity
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              userEntity: {
                id: 1,
                name: 'John Doe',
              },
            },
          },
          {
            params: {
              userEntity: {
                id: 2,
                name: 'Jane Smith',
              },
            },
          },
        ])

        test.each(cases)('userId: $params.userEntity.id', ({ params }) => {
          const args = {
            expressRequest: stubExpressRequest,
            requestParams: stubRequestParams,
            engine: mockEngine,
            userEntity: params.userEntity,
            visa: mockVisa,
            requestedAt: new Date(),
            uuid: '98765432-abcd-0000-1234-000000000001',
          }

          const context = new BaseGraphqlContext(args)

          expect(context)
            .toHaveProperty('userEntity', params.userEntity)
        })
      })

      describe('#visa', () => {
        const cases = /** @type {Array<*>} */ ([
          {
            params: new GraphqlVisa({
              hasAuthenticated: true,
              hasAuthorized: true,
              schemaPermissionHash: {
                customer: true,
                statistics: false,
              },
            }),
          },
          {
            params: new GraphqlVisa({
              hasAuthenticated: true,
              hasAuthorized: false,
              schemaPermissionHash: {
                admin: true,
                customers: true,
              },
            }),
          },
          {
            params: new GraphqlVisa({
              hasAuthenticated: false,
              hasAuthorized: true,
              schemaPermissionHash: null,
            }),
          },
          {
            params: new GraphqlVisa({
              hasAuthenticated: false,
              hasAuthorized: false,
              schemaPermissionHash: null,
            }),
          },
        ])

        test.each(cases)('hasAuthenticated: $params.hasAuthenticated, hasAuthorized: $params.hasAuthorized', ({ params }) => {
          const args = {
            expressRequest: stubExpressRequest,
            requestParams: stubRequestParams,
            engine: mockEngine,
            userEntity: mockUser,
            visa: params.visa,
            requestedAt: new Date(),
            uuid: '98765432-abcd-0000-1234-000000000001',
          }

          const context = new BaseGraphqlContext(args)

          expect(context)
            .toHaveProperty('visa', params.visa)
        })
      })

      describe('#engine', () => {
        const engineArgs = {
          config: /** @type {*} */ ({}),
          share: /** @type {*} */ ({}),
        }

        /**
         * @type {Array<{
         *   params: {
         *     Engine: GraphqlType.ServerEngineCtor
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              Engine: CustomerGraphqlServerEngine,
            },
          },
          {
            params: {
              Engine: AdminGraphqlServerEngine,
            },
          },
        ])

        test.each(cases)('Engine: $params.Engine.name', ({ params }) => {
          const engine = params.Engine.create(engineArgs)

          const args = {
            expressRequest: stubExpressRequest,
            requestParams: stubRequestParams,
            engine,
            userEntity: mockUser,
            visa: mockVisa,
            requestedAt: new Date(),
            uuid: '98765432-abcd-0000-1234-000000000001',
          }

          const context = new BaseGraphqlContext(args)

          expect(context)
            .toHaveProperty('engine', engine)
        })
      })

      describe('#requestedAt', () => {
        const cases = [
          {
            params: {
              requestedAt: new Date('2024-11-21T11:22:33.999Z'),
            },
          },
          {
            params: {
              requestedAt: new Date('2024-11-22T11:22:33.999Z'),
            },
          },
        ]

        test.each(cases)('requestedAt: $params.requestedAt', ({ params }) => {
          const args = {
            expressRequest: stubExpressRequest,
            requestParams: stubRequestParams,
            engine: mockEngine,
            userEntity: mockUser,
            visa: mockVisa,
            requestedAt: params.requestedAt,
            uuid: '98765432-abcd-0000-1234-000000000001',
          }

          const context = new BaseGraphqlContext(args)

          expect(context)
            .toHaveProperty('requestedAt', params.requestedAt)
        })
      })

      describe('#uuid', () => {
        const cases = [
          {
            params: {
              uuid: 'alpha',
            },
          },
          {
            params: {
              uuid: 'beta',
            },
          },
        ]

        test.each(cases)('uuid: $params.uuid', ({ params }) => {
          const args = {
            expressRequest: stubExpressRequest,
            requestParams: stubRequestParams,
            engine: mockEngine,
            userEntity: mockUser,
            visa: mockVisa,
            requestedAt: new Date(),
            uuid: params.uuid,
          }

          const context = new BaseGraphqlContext(args)

          expect(context)
            .toHaveProperty('uuid', params.uuid)
        })
      })
    })

    describe('to throw an error with invalid type', () => {
      /**
       * @type {Array<{
       *   params: import('../../../../../lib/server/graphql/contexts/BaseGraphqlContext.js').BaseGraphqlContextParams
       *   expected: string
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: null,
          expected: 'Cannot destructure property \'expressRequest\' of \'object null\' as it is null.',
        },
        {
          params: undefined,
          expected: 'Cannot destructure property \'expressRequest\' of \'undefined\' as it is undefined.',
        },
      ])

      test.each(cases)('params: $params', ({ params, expected }) => {
        expect(() => new BaseGraphqlContext(params))
          .toThrow(expected)
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('.create()', () => {
    const queryMock = `
      subscription OnObserveChatStates ($input: OnObserveChatStatesInput!) {
        onObserveChatStates (input: $input) {
          hasUnreadMessages
          isUpdatedMembers
        }
      }
    `

    /** @type {renchan.UserEntity} */
    const mockUser = /** @type {*} */ ({})

    /** @type {GraphqlType.Visa} */
    const mockVisa = /** @type {*} */ ({})

    describe('to return an instance of own class', () => {
      /**
       * @type {Array<{
       *   params: import('../../../../../lib/server/graphql/contexts/BaseGraphqlContext.js').BaseGraphqlContextFactoryParams
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            expressRequest: {
              path: '/graphql-customer',
            },
            requestParams: {
              id: '98765432-abcd-0000-1234-000000000001',
              type: 'subscribe',
              payload: {
                query: queryMock,
                context: {
                  headers: {
                    'x-renchan-access-token': 'alpha',
                  },
                },
                variables: {
                  roomId: 100001,
                },
              },
            },
            userEntity: mockUser,
            visa: mockVisa,
          },
        },
        {
          params: {
            expressRequest: {
              path: '/graphql-admin',
            },
            requestParams: {
              id: '98765432-abcd-0000-1234-000000000002',
              type: 'subscribe',
              payload: {
                query: queryMock,
                context: {
                  headers: {
                    'x-renchan-access-token': 'beta',
                  },
                },
                variables: {
                  roomId: 100002,
                },
              },
            },
            userEntity: mockUser,
            visa: mockVisa,
          },
        },
      ])

      test.each(cases)('path: $params.expressRequest.path', ({ params }) => {
        const context = BaseGraphqlContext.create(params)

        expect(context)
          .toBeInstanceOf(BaseGraphqlContext)
      })
    })

    describe('to call constructor', () => {
      /**
       * @type {Array<{
       *   params: import('../../../../../lib/server/graphql/contexts/BaseGraphqlContext.js').BaseGraphqlContextFactoryParams
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            expressRequest: {
              path: '/graphql-customer',
            },
            requestParams: {
              id: '98765432-abcd-0000-1234-000000000001',
              type: 'subscribe',
              payload: {
                query: queryMock,
                context: {
                  headers: {
                    'x-renchan-access-token': 'alpha',
                  },
                },
                variables: {
                  roomId: 100001,
                },
              },
            },
            engine: null,
            userEntity: mockUser,
            visa: mockVisa,
            requestedAt: new Date('2024-11-21T11:22:33.999Z'),
            uuid: '98765432-abcd-0000-1234-000000000001',
          },
        },
        {
          params: {
            expressRequest: {
              path: '/graphql-admin',
            },
            requestParams: {
              id: '98765432-abcd-0000-1234-000000000002',
              type: 'subscribe',
              payload: {
                query: queryMock,
                context: {
                  headers: {
                    'x-renchan-access-token': 'beta',
                  },
                },
                variables: {
                  roomId: 100002,
                },
              },
            },
            engine: null,
            userEntity: mockUser,
            visa: mockVisa,
            requestedAt: new Date('2024-11-22T11:22:33.999Z'),
            uuid: '98765432-50d7-70b2-9c03-000000000002',
          },
        },
      ])

      test.each(cases)('path: $params.expressRequest.path', ({ params }) => {
        const BaseGraphqlContextSpy = globalThis.constructorSpy.spyOn(BaseGraphqlContext)

        BaseGraphqlContextSpy.create(params)

        expect(BaseGraphqlContextSpy.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('.createAsync()', () => {
    const queryMock = `
      subscription OnObserveChatStates ($input: OnObserveChatStatesInput!) {
        onObserveChatStates (input: $input) {
          hasUnreadMessages
          isUpdatedMembers
        }
      }
    `

    describe('to return an instance of own class', () => {
      /**
       * @type {Array<{
       *   params: import('../../../../../lib/server/graphql/contexts/BaseGraphqlContext.js').BaseGraphqlContextAsyncFactoryParams & {
       *     EngineCtor: GraphqlType.ServerEngineCtor
       *   }
       *   mocks: {
       *     visa: GraphqlType.Visa
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            expressRequest: {
              path: '/graphql-customer',
            },
            requestParams: {
              id: '98765432-abcd-0000-1234-000000000001',
              type: 'subscribe',
              payload: {
                query: queryMock,
                variables: {
                  roomId: 100001,
                },
                context: {
                  headers: {
                    'x-renchan-access-token': 'alpha',
                  },
                },
              },
            },
            EngineCtor: CustomerGraphqlServerEngine,
          },
          mocks: {
            visa: GraphqlVisa.create({
              hasAuthenticated: true,
              hasAuthorized: true,
              schemaPermissionHash: {
                customer: true,
                statistics: false,
              },
            }),
          },
        },
        {
          params: {
            expressRequest: {
              path: '/graphql-admin',
            },
            requestParams: {
              id: '98765432-abcd-0000-1234-000000000002',
              type: 'subscribe',
              payload: {
                query: queryMock,
                variables: {
                  roomId: 100002,
                },
                context: {
                  headers: {
                    'x-renchan-access-token': 'beta',
                  },
                },
              },
            },
            EngineCtor: AdminGraphqlServerEngine,
          },
          mocks: {
            visa: GraphqlVisa.create({
              hasAuthenticated: true,
              hasAuthorized: false,
              schemaPermissionHash: {
                admin: true,
                customers: true,
              },
            }),
          },
        },
      ])

      test.each(cases)('path: $params.expressRequest.path', async ({ params, mocks }) => {
        const createVisaSpy = jest.spyOn(BaseGraphqlContext, 'createVisa')
          .mockResolvedValue(mocks.visa)

        const engine = await params.EngineCtor.createAsync()

        const args = {
          expressRequest: params.expressRequest,
          requestParams: params.requestParams,
          engine,
          requestedAt: new Date(),
        }

        const context = await BaseGraphqlContext.createAsync(args)

        expect(context)
          .toBeInstanceOf(BaseGraphqlContext)

        createVisaSpy.mockRestore()
      })
    })

    describe('to call .create()', () => {
      /** @type {GraphqlType.ServerEngine} */
      const mockEngine = /** @type {*} */ ({})

      /**
       * @type {Array<{
       *   params: import('../../../../../lib/server/graphql/contexts/BaseGraphqlContext.js').BaseGraphqlContextAsyncFactoryParams
       *   mocks: {
       *     userEntity: renchan.UserEntity
       *     visa: GraphqlType.Visa
       *   }
       *   expected: {
       *     accessToken: string
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            expressRequest: {
              path: '/graphql-customer',
              headers: {
                'x-renchan-access-token': 'alpha',
              },
            },
            requestParams: {
              id: '98765432-abcd-0000-1234-000000000001',
              type: 'subscribe',
              payload: {
                query: queryMock,
                variables: {
                  roomId: 100001,
                },
                context: {
                  headers: {
                    'x-renchan-access-token': 'omega',
                  },
                },
              },
            },
            requestedAt: new Date('2024-11-01T01:00:01.001Z'),
          },
          mocks: {
            userEntity: {
              id: 10001,
              username: 'JohnDoe',
            },
            visa: GraphqlVisa.create({
              hasAuthenticated: true,
              hasAuthorized: true,
              schemaPermissionHash: {
                customer: true,
                statistics: false,
              },
            }),
          },
          expected: {
            accessToken: 'alpha',
          },
        },
        {
          params: {
            expressRequest: {
              path: '/graphql-admin',
            },
            requestParams: {
              id: '98765432-abcd-0000-1234-000000000002',
              type: 'subscribe',
              payload: {
                query: queryMock,
                variables: {
                  roomId: 100002,
                },
                context: {
                  headers: {
                    'x-renchan-access-token': 'beta',
                  },
                },
              },
            },
            requestedAt: new Date('2024-11-02T02:00:02.002Z'),
          },
          mocks: {
            userEntity: {
              id: 10002,
              username: 'JaneSmith',
            },
            visa: GraphqlVisa.create({
              hasAuthenticated: true,
              hasAuthorized: false,
              schemaPermissionHash: {
                admin: true,
                customers: true,
              },
            }),
          },
          expected: {
            accessToken: 'beta',
          },
        },
      ])

      test.each(cases)('path: $params.expressRequest.path', async ({ params, mocks, expected }) => {
        const expectedCreateArgs = {
          expressRequest: params.expressRequest,
          requestParams: params.requestParams,
          engine: mockEngine,
          userEntity: mocks.userEntity,
          visa: mocks.visa,
          requestedAt: params.requestedAt,
        }
        const expectedExtractAccessTokenArgs = {
          expressRequest: params.expressRequest,
          requestParams: params.requestParams,
        }
        const expectedFindUserArgs = {
          expressRequest: params.expressRequest,
          accessToken: expected.accessToken,
          requestedAt: params.requestedAt,
        }
        const expectedCreateVisaArgs = {
          expressRequest: params.expressRequest,
          engine: mockEngine,
          userEntity: mocks.userEntity,
          requestedAt: params.requestedAt,
        }

        const createSpy = jest.spyOn(BaseGraphqlContext, 'create')
        const extractAccessTokenSpy = jest.spyOn(BaseGraphqlContext, 'extractAccessToken')
        const findUserSpy = jest.spyOn(BaseGraphqlContext, 'findUser')
          .mockResolvedValue(mocks.userEntity)
        const createVisaSpy = jest.spyOn(BaseGraphqlContext, 'createVisa')
          .mockResolvedValue(mocks.visa)

        const args = {
          expressRequest: params.expressRequest,
          requestParams: params.requestParams,
          engine: mockEngine,
          requestedAt: params.requestedAt,
        }

        await BaseGraphqlContext.createAsync(args)

        expect(createSpy)
          .toHaveBeenCalledWith(expectedCreateArgs)
        expect(extractAccessTokenSpy)
          .toHaveBeenCalledWith(expectedExtractAccessTokenArgs)
        expect(findUserSpy)
          .toHaveBeenCalledWith(expectedFindUserArgs)
        expect(createVisaSpy)
          .toHaveBeenCalledWith(expectedCreateVisaArgs)

        createSpy.mockRestore()
        findUserSpy.mockRestore()
        createVisaSpy.mockRestore()
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('.get:ACCESS_TOKEN_HEADER_KEY', () => {
    describe('to return fixed value', () => {
      test('to return "x-renchan-access-token"', () => {
        const expected = 'x-renchan-access-token'

        expect(BaseGraphqlContext.ACCESS_TOKEN_HEADER_KEY)
          .toBe(expected)
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('.extractAccessToken()', () => {
    describe('to return access token', () => {
      describe('from expressRequest', () => {
        /**
         * @type {GraphqlType.HttpRequestParams & {
         *   payload?: {
         *     context?: {
         *       headers?: Record<string, string>
         *     }
         *   }
         * }}
         */
        const requestParamsMock = /** @type {*} */ ({
          payload: {
            context: {
              headers: {
                'x-renchan-access-token': 'omega',
              },
            },
          },
        })

        /**
         * @type {Array<{
         *   params: {
         *     expressRequest: ExpressType.Request
         *   }
         *   expected: string
         * }>}
         */
        const cases = /** @type {*} */ ([
          {
            params: {
              expressRequest: {
                headers: {
                  'x-renchan-access-token': 'alpha',
                },
              },
            },
            expected: 'alpha',
          },
          {
            params: {
              expressRequest: {
                headers: {
                  'x-renchan-access-token': 'beta',
                },
              },
            },
            expected: 'beta',
          },
        ])

        test.each(cases)('x-renchan-access-token: $params.expressRequest.headers["x-renchan-access-token"]', ({ params, expected }) => {
          const args = {
            expressRequest: params.expressRequest,
            requestParams: requestParamsMock,
          }
          const accessToken = BaseGraphqlContext.extractAccessToken(args)

          expect(accessToken)
            .toBe(expected)
        })
      })

      describe('from requestParams', () => {
        /** @type {ExpressType.Request} */
        const expressRequestMock = /** @type {*} */ ({})

        /**
         * @type {Array<{
         *   params: {
         *     requestParams: GraphqlType.HttpRequestParams & {
         *       payload?: {
         *         context?: {
         *           headers?: Record<string, string>
         *         }
         *       }
         *     }
         *   }
         *   expected: string
         * }>}
         */
        const cases = /** @type {*} */ ([
          {
            params: {
              requestParams: {
                payload: {
                  context: {
                    headers: {
                      'x-renchan-access-token': 'alpha',
                    },
                  },
                },
              },
            },
            expected: 'alpha',
          },
          {
            params: {
              requestParams: {
                payload: {
                  context: {
                    headers: {
                      'x-renchan-access-token': 'beta',
                    },
                  },
                },
              },
            },
            expected: 'beta',
          },
        ])

        test.each(cases)('x-renchan-access-token: $params.expressRequest.headers["x-renchan-access-token"]', ({ params, expected }) => {
          const args = {
            expressRequest: expressRequestMock,
            requestParams: params.requestParams,
          }
          const accessToken = BaseGraphqlContext.extractAccessToken(args)

          expect(accessToken)
            .toBe(expected)
        })
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('.extractHeadersFromRequestParams()', () => {
    describe('to return access token', () => {
      /**
       * @type {Array<{
       *   params: {
       *     requestParams: GraphqlType.WebSocketRequestParams
       *   }
       *   expected: string
       * }>}
       */
      const cases = /** @type {*} */ ([
        {
          params: {
            requestParams: {
              payload: {
                context: {
                  headers: {
                    'x-renchan-access-token': 'alpha',
                  },
                },
              },
            },
          },
          expected: {
            'x-renchan-access-token': 'alpha',
          },
        },
        {
          params: {
            requestParams: {
              payload: {
                context: {
                  headers: {
                    'x-renchan-access-token': 'beta',
                  },
                },
              },
            },
          },
          expected: {
            'x-renchan-access-token': 'beta',
          },
        },
      ])

      test.each(cases)('x-renchan-access-token: $params.requestParams.payload.context.headers["x-renchan-access-token"]', ({ params, expected }) => {
        const accessToken = BaseGraphqlContext.extractHeadersFromRequestParams(params)

        expect(accessToken)
          .toEqual(expected)
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('.get:Visa', () => {
    test('to be bridge class', () => {
      const actual = BaseGraphqlContext.Visa

      expect(actual)
        .toBe(GraphqlVisa) // same reference
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('.findUser()', () => {
    describe('to return fixed value', () => {
      test('to return null', async () => {
        /** @type {ExpressType.Request} */
        const stubExpressRequest = /** @type {*} */ (
          StubExpressRequest.create()
        )

        const userEntity = await BaseGraphqlContext.findUser({
          expressRequest: stubExpressRequest,
          accessToken: null,
          requestedAt: new Date(),
        })

        expect(userEntity)
          .toBeNull()
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('.createVisa()', () => {
    /** @type {GraphqlType.ServerEngine} */
    const mockEngine = /** @type {*} */ ({
      visaIssuers: {},
    })

    describe('to return Visa instance', () => {
      /** @type {ExpressType.Request} */
      const stubExpressRequest = /** @type {*} */ (
        StubExpressRequest.create()
      )

      const cases = [
        {
          params: {
            Visa: class AlphaVisa extends GraphqlVisa {},
          },
        },
        {
          params: {
            Visa: class BetaVisa extends GraphqlVisa {},
          },
        },
      ]

      test.each(cases)('Visa: $params.Visa.name', async ({ params }) => {
        const BaseGraphqlContextSpy = class extends BaseGraphqlContext {
          static get Visa () {
            return params.Visa
          }
        }

        const args = {
          expressRequest: stubExpressRequest,
          userEntity: params.userEntity,
          engine: mockEngine,
          requestedAt: new Date(),
        }

        const visa = await BaseGraphqlContextSpy.createVisa(args)

        expect(visa)
          .toBeInstanceOf(params.Visa)
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('.generateUuid()', () => {
    describe('to be UUID like string', () => {
      const expected = expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/u)

      const cases = [
        { label: '[1] random generated UUID' },
        { label: '[2] random generated UUID' },
        { label: '[3] random generated UUID' },
        { label: '[4] random generated UUID' },
        { label: '[5] random generated UUID' },
      ]

      test.each(cases)('$label', ({ label }) => {
        const uuid = BaseGraphqlContext.generateUuid()

        expect(uuid)
          .toEqual(expected)
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('#get:Ctor', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ ({})

    const queryMock = `
      subscription OnObserveChatStates ($input: OnObserveChatStatesInput!) {
        onObserveChatStates (input: $input) {
          hasUnreadMessages
          isUpdatedMembers
        }
      }
    `

    /** @type {GraphqlType.WebSocketRequestParams} */
    const requestParamsMock = {
      id: '98765432-abcd-0000-1234-999999999999',
      type: 'subscribe',
      payload: {
        query: queryMock,
        variables: {
          roomId: 9999999,
        },
        context: {
          headers: {
            'x-renchan-access-token': 'omega',
          },
        },
      },
    }

    /** @type {GraphqlType.ServerEngine} */
    const engineMock = /** @type {*} */ ({})

    /** @type {GraphqlType.Visa} */
    const visaMock = /** @type {*} */ ({})

    describe('to return own class', () => {
      const cases = [
        {
          params: {
            userEntity: {
              id: 10001,
              username: 'JohnDoe',
            },
          },
        },
        {
          params: {
            userEntity: {
              id: 10002,
              username: 'JaneSmith',
            },
          },
        },
      ]

      test.each(cases)('userId: $params.userEntity.id', ({ params }) => {
        const context = new BaseGraphqlContext({
          expressRequest: expressRequestMock,
          requestParams: requestParamsMock,
          engine: engineMock,
          userEntity: params.userEntity,
          visa: visaMock,
          requestedAt: new Date(),
          uuid: '98765432-abcd-0000-1234-000000000001',
        })

        const actual = context.Ctor

        expect(actual)
          .toBe(BaseGraphqlContext) // same reference
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('#get:accessToken', () => {
    const queryMock = `
      subscription OnObserveChatStates ($input: OnObserveChatStatesInput!) {
        onObserveChatStates (input: $input) {
          hasUnreadMessages
          isUpdatedMembers
        }
      }
    `

    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ ({})

    /** @type {GraphqlType.ServerEngine} */
    const engineMock = /** @type {*} */ ({})

    /** @type {renchan.UserEntity} */
    const userEntityMock = {
      id: 10001,
    }

    /** @type {GraphqlType.Visa} */
    const visaMock = /** @type {*} */ ({})

    describe('to be available string', () => {
      /**
       * @type {Array<{
       *   params: {
       *     expressRequest: ExpressType.Request
       *     requestParams: GraphqlType.WebSocketRequestParams
       *   }
       *   expected: string
       * }>}
       */
      const cases = /** @type {*} */ ([
        {
          params: {
            expressRequest: {
              headers: {
                'x-renchan-access-token': 'alpha',
              },
            },
            requestParams: {
              id: '98765432-abcd-0000-1234-000000000001',
              type: 'subscribe',
              payload: {
                query: queryMock,
                variables: {
                  roomId: 1000001,
                },
                context: {
                  // headers: {},
                },
              },
            },
          },
          expected: 'alpha',
        },
        {
          params: {
            expressRequest: {
              // headers: {},
            },
            requestParams: {
              id: '98765432-abcd-0000-1234-000000000002',
              type: 'subscribe',
              payload: {
                query: queryMock,
                variables: {
                  roomId: 1000002,
                },
                context: {
                  headers: {
                    'x-renchan-access-token': 'beta',
                  },
                },
              },
            },
          },
          expected: 'beta',
        },
      ])

      test.each(cases)('headers: $params.expressRequest.headers', ({ params, expected }) => {
        const context = new BaseGraphqlContext({
          expressRequest: params.expressRequest,
          requestParams: params.requestParams,
          engine: engineMock,
          userEntity: userEntityMock,
          visa: visaMock,
          requestedAt: new Date(),
          uuid: '98765432-abcd-0000-1234-aaaaaaaaaaaa',
        })

        const actual = context.accessToken

        expect(actual)
          .toBe(expected)
      })
    })

    describe('to be null', () => {
      const cases = [
        {
          params: {
            expressRequest: {},
            requestParams: {
              id: '98765432-abcd-0000-1234-000000000003',
              type: 'subscribe',
              payload: {
                query: queryMock,
                variables: {
                  roomId: 1000003,
                },
                context: {
                  headers: {},
                },
              },
            },
          },
        },
      ]

      test.each(cases)('expressRequest: $params.expressRequest', ({ params }) => {
        const context = new BaseGraphqlContext({
          expressRequest: expressRequestMock,
          requestParams: params.requestParams,
          engine: engineMock,
          userEntity: params.userEntity,
          visa: visaMock,
          requestedAt: new Date(),
          uuid: '98765432-abcd-0000-1234-000000000001',
        })

        const actual = context.accessToken

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('#get:userId', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ ({})

    const queryMock = `
      subscription OnObserveChatStates ($input: OnObserveChatStatesInput!) {
        onObserveChatStates (input: $input) {
          hasUnreadMessages
          isUpdatedMembers
        }
      }
    `

    /** @type {GraphqlType.WebSocketRequestParams} */
    const requestParamsMock = {
      id: '98765432-abcd-0000-1234-999999999999',
      type: 'subscribe',
      payload: {
        query: queryMock,
        variables: {
          roomId: 9999999,
        },
        context: {
          headers: {
            'x-renchan-access-token': 'omega',
          },
        },
      },
    }

    /** @type {GraphqlType.ServerEngine} */
    const engineMock = /** @type {*} */ ({})

    /** @type {GraphqlType.Visa} */
    const visaMock = /** @type {*} */ ({})

    describe('to return id of #userEntity', () => {
      const cases = [
        {
          params: {
            userEntity: {
              id: 10001,
              username: 'JohnDoe',
            },
          },
          expected: 10001,
        },
        {
          params: {
            userEntity: {
              id: 10002,
              username: 'JaneSmith',
            },
          },
          expected: 10002,
        },
      ]

      test.each(cases)('userId: $params.userEntity.id', ({ params, expected }) => {
        const context = new BaseGraphqlContext({
          expressRequest: expressRequestMock,
          requestParams: requestParamsMock,
          engine: engineMock,
          userEntity: params.userEntity,
          visa: visaMock,
          requestedAt: new Date(),
          uuid: '98765432-abcd-0000-1234-000000000001',
        })

        const actual = context.userId

        expect(actual)
          .toBe(expected)
      })
    })

    describe('to be null', () => {
      const cases = [
        {
          params: {
            userEntity: null,
          },
        },
      ]

      test.each(cases)('userEntity: $params.userEntity', ({ params, expected }) => {
        const context = new BaseGraphqlContext({
          expressRequest: expressRequestMock,
          requestParams: requestParamsMock,
          engine: engineMock,
          userEntity: params.userEntity,
          visa: visaMock,
          requestedAt: new Date(),
          uuid: '98765432-abcd-0000-1234-000000000001',
        })

        const actual = context.userId

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('#canResolve()', () => {
    describe('to call GraphqlVisa#canResolve()', () => {
      /** @type {ExpressType.Request} */
      const expressRequestMock = /** @type {*} */ (
        StubExpressRequest.create()
      )

      const queryMock = `
        subscription OnObserveChatStates ($input: OnObserveChatStatesInput!) {
          onObserveChatStates (input: $input) {
            hasUnreadMessages
            isUpdatedMembers
          }
        }
      `

      /** @type {GraphqlType.WebSocketRequestParams} */
      const requestParamsMock = {
        id: '98765432-abcd-0000-1234-999999999999',
        type: 'subscribe',
        payload: {
          query: queryMock,
          variables: {
            roomId: 9999999,
          },
          context: {
            headers: {
              'x-renchan-access-token': 'omega',
            },
          },
        },
      }

      /** @type {GraphqlType.ServerEngine} */
      const engineMock = /** @type {*} */ ({})

      const visaMock = GraphqlVisa.create({
        hasAuthenticated: true,
        hasAuthorized: true,
        schemaPermissionHash: {
          customer: true,
          assets: true,
          statistics: false,
        },
      })

      const cases = [
        {
          params: {
            schema: 'customer',
            canResolveTally: true,
          },
        },
        {
          params: {
            schema: 'statistics',
            canResolveTally: false,
          },
        },
      ]

      test.each(cases)('canResolveTally: $params.canResolveTally', ({ params }) => {
        const context = new BaseGraphqlContext({
          expressRequest: expressRequestMock,
          requestParams: requestParamsMock,
          engine: engineMock,
          userEntity: null,
          visa: visaMock,
          requestedAt: new Date(),
          uuid: '98765432-abcd-0000-1234-000000000001',
        })

        const canResolveSpy = jest.spyOn(visaMock, 'canResolve')
          .mockReturnValue(params.canResolveTally)

        const argsTally = {
          schema: params.schema,
        }

        const actual = context.canResolve(argsTally)

        expect(actual)
          .toBe(params.canResolveTally)

        expect(canResolveSpy)
          .toHaveBeenCalledWith(argsTally)
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('#hasAuthenticated()', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    const queryMock = `
      subscription OnObserveChatStates ($input: OnObserveChatStatesInput!) {
        onObserveChatStates (input: $input) {
          hasUnreadMessages
          isUpdatedMembers
        }
      }
    `

    /** @type {GraphqlType.WebSocketRequestParams} */
    const requestParamsMock = {
      id: '98765432-abcd-0000-1234-999999999999',
      type: 'subscribe',
      payload: {
        query: queryMock,
        variables: {
          roomId: 9999999,
        },
        context: {
          headers: {
            'x-renchan-access-token': 'omega',
          },
        },
      },
    }

    /** @type {GraphqlType.ServerEngine} */
    const engineMock = /** @type {*} */ ({})

    const cases = [
      {
        params: {
          hasAuthenticated: true,
        },
        expected: true,
      },
      {
        params: {
          hasAuthenticated: false,
        },
        expected: false,
      },
    ]

    test.each(cases)('hasAuthenticated: $params.hasAuthenticated', ({ params, expected }) => {
      const args = {
        hasAuthenticated: params.hasAuthenticated,
        hasAuthorized: true,
        schemaPermissionHash: {},
      }
      const visa = GraphqlVisa.create(args)

      const context = new BaseGraphqlContext({
        expressRequest: expressRequestMock,
        requestParams: requestParamsMock,
        engine: engineMock,
        userEntity: null,
        visa,
        requestedAt: new Date(),
        uuid: '98765432-abcd-0000-1234-000000000001',
      })

      const actual = context.hasAuthenticated()

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('#hasAuthorized()', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    const queryMock = `
      subscription OnObserveChatStates ($input: OnObserveChatStatesInput!) {
        onObserveChatStates (input: $input) {
          hasUnreadMessages
          isUpdatedMembers
        }
      }
    `

    /** @type {GraphqlType.WebSocketRequestParams} */
    const requestParamsMock = {
      id: '98765432-abcd-0000-1234-999999999999',
      type: 'subscribe',
      payload: {
        query: queryMock,
        variables: {
          roomId: 9999999,
        },
        context: {
          headers: {
            'x-renchan-access-token': 'omega',
          },
        },
      },
    }

    /** @type {GraphqlType.ServerEngine} */
    const engineMock = /** @type {*} */ ({})

    const cases = [
      {
        params: {
          hasAuthorized: true,
        },
        expected: true,
      },
      {
        params: {
          hasAuthorized: false,
        },
        expected: false,
      },
    ]

    test.each(cases)('hasAuthorized: $params.hasAuthorized', ({ params, expected }) => {
      const args = {
        hasAuthenticated: false,
        hasAuthorized: params.hasAuthorized,
        schemaPermissionHash: {},
      }
      const visa = GraphqlVisa.create(args)

      const context = new BaseGraphqlContext({
        expressRequest: expressRequestMock,
        requestParams: requestParamsMock,
        engine: engineMock,
        userEntity: null,
        visa,
        requestedAt: new Date(),
        uuid: '98765432-abcd-0000-1234-000000000001',
      })

      const actual = context.hasAuthorized()

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('#hasSchemaPermission()', () => {
    describe('to call GraphqlVisa#canResolve()', () => {
      /** @type {ExpressType.Request} */
      const expressRequestMock = /** @type {*} */ (
        StubExpressRequest.create()
      )

      const queryMock = `
        subscription OnObserveChatStates ($input: OnObserveChatStatesInput!) {
          onObserveChatStates (input: $input) {
            hasUnreadMessages
            isUpdatedMembers
          }
        }
      `

      /** @type {GraphqlType.WebSocketRequestParams} */
      const requestParamsMock = {
        id: '98765432-abcd-0000-1234-999999999999',
        type: 'subscribe',
        payload: {
          query: queryMock,
          variables: {
            roomId: 9999999,
          },
          context: {
            headers: {
              'x-renchan-access-token': 'omega',
            },
          },
        },
      }

      /** @type {GraphqlType.ServerEngine} */
      const engineMock = /** @type {*} */ ({})

      const visaMock = GraphqlVisa.create({
        hasAuthenticated: true,
        hasAuthorized: true,
        schemaPermissionHash: {
          customer: true,
          assets: true,
          statistics: false,
        },
      })

      const cases = [
        {
          params: {
            schema: 'customer',
            hasSchemaPermissionTally: true,
          },
        },
        {
          params: {
            schema: 'statistics',
            hasSchemaPermissionTally: false,
          },
        },
      ]

      test.each(cases)('canResolveTally: $params.canResolveTally', ({ params }) => {
        const context = new BaseGraphqlContext({
          expressRequest: expressRequestMock,
          requestParams: requestParamsMock,
          engine: engineMock,
          userEntity: null,
          visa: visaMock,
          requestedAt: new Date(),
          uuid: '98765432-abcd-0000-1234-000000000001',
        })

        const hasSchemaPermissionSpy = jest.spyOn(visaMock, 'hasSchemaPermission')
          .mockReturnValue(params.hasSchemaPermissionTally)

        const argsTally = {
          schema: params.schema,
        }

        const actual = context.hasSchemaPermission(argsTally)

        expect(actual)
          .toBe(params.hasSchemaPermissionTally)

        expect(hasSchemaPermissionSpy)
          .toHaveBeenCalledWith(argsTally)
      })
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('#get:share', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    const visaMock = GraphqlVisa.create()

    const cases = [
      {
        params: {
          Engine: CustomerGraphqlServerEngine,
        },
        expected: {
          Share: CustomerGraphqlShare,
        },
      },
      {
        params: {
          Engine: AdminGraphqlServerEngine,
        },
        expected: {
          Share: AdminGraphqlShare,
        },
      },
    ]

    test.each(cases)('Engine: $params.Engine.name', async ({ params, expected }) => {
      const engine = await params.Engine.createAsync()

      const args = {
        expressRequest: expressRequestMock,
        engine,
        userEntity: null,
        visa: visaMock,
        requestedAt: new Date(),
        uuid: '98765432-abcd-0000-1234-000000000001',
      }
      const context = new BaseGraphqlContext(args)

      const actual = context.share

      expect(actual)
        .toBeInstanceOf(expected.Share)
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('#get:broker', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    const visaMock = GraphqlVisa.create()

    const cases = [
      {
        params: {
          Engine: CustomerGraphqlServerEngine,
        },
      },
      {
        params: {
          Engine: AdminGraphqlServerEngine,
        },
      },
    ]

    test.each(cases)('Engine: $params.Engine.name', async ({ params }) => {
      const engine = await params.Engine.createAsync()

      const args = {
        expressRequest: expressRequestMock,
        engine,
        userEntity: null,
        visa: visaMock,
        requestedAt: new Date(),
        uuid: '98765432-abcd-0000-1234-000000000001',
      }
      const context = new BaseGraphqlContext(args)

      const actual = context.broker

      expect(actual)
        .toBeInstanceOf(SubscriptionBroker)
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('#get:env', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    const visaMock = GraphqlVisa.create()

    /**
     * @type {Array<{
     *   params: {
     *     Engine: GraphqlType.ServerEngineCtor
     *   }
     *   expected: renchan.RenchanEnv
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          Engine: class extends BaseGraphqlServerEngine {
            get env () {
              return /** @type {*} */ ({
                NODE_ENV: 'customer-development',
              })
            }
          },
        },
        expected: {
          NODE_ENV: 'customer-development',
        },
      },
      {
        params: {
          Engine: class extends BaseGraphqlServerEngine {
            get env () {
              return /** @type {*} */ ({
                NODE_ENV: 'admin-development',
              })
            }
          },
        },
        expected: {
          NODE_ENV: 'admin-development',
        },
      },
    ])

    test.each(cases)('Engine: $params.Engine.name', ({ params, expected }) => {
      const engine = new params.Engine({
        config: /** @type {*} */ ({}),
        share: /** @type {*} */ ({}),
        errorHash: {},
      })

      const args = {
        expressRequest: expressRequestMock,
        engine,
        userEntity: null,
        visa: visaMock,
        requestedAt: new Date(),
        uuid: '98765432-abcd-0000-1234-000000000001',
      }
      const context = new BaseGraphqlContext(args)

      const actual = context.env

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('#get:NODE_ENV', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    const visaMock = GraphqlVisa.create()

    /**
     * @type {Array<{
     *   params: {
     *     Engine: GraphqlType.ServerEngineCtor
     *   }
     *   expected: string
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          Engine: class extends BaseGraphqlServerEngine {
            get env () {
              return /** @type {*} */ ({
                NODE_ENV: 'customer-development',
              })
            }
          },
        },
        expected: 'customer-development',
      },
      {
        params: {
          Engine: class extends BaseGraphqlServerEngine {
            get env () {
              return /** @type {*} */ ({
                NODE_ENV: 'admin-development',
              })
            }
          },
        },
        expected: 'admin-development',
      },
    ])

    test.each(cases)('Engine: $params.Engine.name', ({ params, expected }) => {
      const engine = new params.Engine({
        config: /** @type {*} */ ({}),
        share: /** @type {*} */ ({}),
        errorHash: {},
      })

      const args = {
        expressRequest: expressRequestMock,
        engine,
        userEntity: null,
        visa: visaMock,
        requestedAt: new Date(),
        uuid: '98765432-abcd-0000-1234-000000000001',
      }
      const context = new BaseGraphqlContext(args)

      const actual = context.NODE_ENV

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('BaseGraphqlContext', () => {
  describe('#get:now', () => {
    /** @type {ExpressType.Request} */
    const expressRequestMock = /** @type {*} */ (
      StubExpressRequest.create()
    )

    const visaMock = GraphqlVisa.create()

    /**
     * @type {Array<{
     *   params: {
     *     requestedAt: Date
     *   }
     *   expected: renchan.RenchanEnv
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          requestedAt: new Date('2024-11-21T11:22:33.999Z'),
        },
      },
      {
        params: {
          requestedAt: new Date('2024-11-22T11:22:33.999Z'),
        },
      },
    ])

    test.each(cases)('requestedAt: $params.requestedAt', ({ params }) => {
      const engine = new BaseGraphqlServerEngine({
        config: /** @type {*} */ ({}),
        share: /** @type {*} */ ({}),
        errorHash: {},
      })

      const args = {
        expressRequest: expressRequestMock,
        engine,
        userEntity: null,
        visa: visaMock,
        requestedAt: params.requestedAt,
        uuid: '98765432-abcd-0000-1234-000000000001',
      }
      const context = new BaseGraphqlContext(args)

      const actual = context.now

      expect(actual)
        .toEqual(params.requestedAt)
    })
  })
})
