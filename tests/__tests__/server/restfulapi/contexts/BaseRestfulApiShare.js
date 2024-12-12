import util from 'util'

import BaseRestfulApiShare from '../../../../../lib/server/restfulapi/contexts/BaseRestfulApiShare.js'

describe('BaseRestfulApiShare', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#env', () => {
        /**
         * @type {Array<{
         *   params: {
         *     env: renchan.RenchanEnv
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              env: {
                NODE_ENV: 'production',
              },
            },
          },
          {
            params: {
              env: {
                NODE_ENV: 'staging',
              },
            },
          },
          {
            params: {
              env: {
                NODE_ENV: 'live',
              },
            },
          },
          {
            params: {
              env: {
                NODE_ENV: 'development',
              },
            },
          },
        ])

        test.each(cases)('NODE_ENV: $params.env.NODE_ENV', ({ params }) => {
          const args = {
            env: params.env,
          }

          const share = new BaseRestfulApiShare(args)

          expect(share)
            .toHaveProperty('env', args.env)
        })
      })
    })
  })
})

describe('BaseRestfulApiShare', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     env: renchan.RenchanEnv
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            env: {
              NODE_ENV: 'production',
            },
          },
        },
        {
          params: {
            env: {
              NODE_ENV: 'staging',
            },
          },
        },
        {
          params: {
            env: {
              NODE_ENV: 'live',
            },
          },
        },
        {
          params: {
            env: {
              NODE_ENV: 'development',
            },
          },
        },
      ])

      test.each(cases)('NODE_ENV: $params.env.NODE_ENV', ({ params }) => {
        const share = BaseRestfulApiShare.create(params)

        expect(share)
          .toBeInstanceOf(BaseRestfulApiShare)
      })

      test('without args', () => {
        const share = BaseRestfulApiShare.create()

        expect(share)
          .toBeInstanceOf(BaseRestfulApiShare)
      })
    })

    describe('to call constructor', () => {
      /**
       * @type {Array<{
       *   params: {
       *     env: renchan.RenchanEnv
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            env: {
              NODE_ENV: 'live',
            },
          },
        },
        {
          params: {
            env: {
              NODE_ENV: 'development',
            },
          },
        },
      ])

      test.each(cases)('NODE_ENV: $params.env.NODE_ENV', ({ params }) => {
        jest.spyOn(BaseRestfulApiShare, 'generateEnv')
          .mockReturnValue(params.env)

        const SpyClass = globalThis.constructorSpy.spyOn(BaseRestfulApiShare)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })

      test('without args', () => {
        /** @type {renchan.RenchanEnv} */
        const envTally = /** @type {*} */ ({})

        jest.spyOn(BaseRestfulApiShare, 'generateEnv')
          .mockReturnValue(envTally)

        const SpyClass = globalThis.constructorSpy.spyOn(BaseRestfulApiShare)

        const expectedArgs = {
          env: envTally,
        }

        SpyClass.create()

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expectedArgs)
      })
    })
  })
})

describe('BaseRestfulApiShare', () => {
  describe('.createAsync()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            config: /** @type {*} */ ({
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            }),
          },
        },
        {
          params: {
            config: /** @type {*} */ ({
              redisOptions: null,
            }),
          },
        },
      ]

      test.each(cases)('redisOptions: $params.config.redisOptions', async ({ params }) => {
        const share = await BaseRestfulApiShare.createAsync(params)

        expect(share)
          .toBeInstanceOf(BaseRestfulApiShare)
      })
    })

    describe('to call .create()', () => {
      const cases = [
        {
          params: {
            config: /** @type {*} */ ({
              redisOptions: {
                host: 'localhost',
                port: 6379,
              },
            }),
          },
        },
        {
          params: {
            config: /** @type {*} */ ({
              redisOptions: null,
            }),
          },
        },
      ]

      test.each(cases)('redisOptions: $params.config.redisOptions', async ({ params }) => {
        const createSpy = jest.spyOn(BaseRestfulApiShare, 'create')

        await BaseRestfulApiShare.createAsync(params)

        expect(createSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('BaseRestfulApiShare', () => {
  describe('.generateEnv()', () => {
    const env = BaseRestfulApiShare.generateEnv()

    const cases = [
      {
        member: 'isProduction()',
        actual: env.isProduction(),
        expected: false,
      },
      {
        member: 'isStaging()',
        actual: env.isStaging(),
        expected: false,
      },
      {
        member: 'isDevelopment()',
        actual: env.isDevelopment(),
        expected: expect.any(Boolean),
      },
      {
        member: 'isLive()',
        actual: env.isLive(),
        expected: expect.any(Boolean),
      },
    ]

    test.each(cases)('return value of $member', ({ actual, expected }) => {
      expect(actual)
        .toEqual(expected)
    })

    test('to be type of Proxy', () => {
      expect(util.types.isProxy(env))
        .toBeTruthy()
    })
  })
})
