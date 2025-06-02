import Redis from 'ioredis'

import BaseRedisClerk from '../../../../lib/client/redis/BaseRedisClerk.js'

import LocalRedis from '../../../../lib/server/redis/LocalRedis.js'

describe('BaseRedisClerk', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      const alphaRedisOptions = {
        host: 'localhost',
        port: 6379,
      }
      const betaRedisOptions = {
        host: 'localhost',
        port: 2222,
      }

      const alphaReadableRedisClient = new Redis(alphaRedisOptions)
      const alphaWritableRedisClient = new Redis(alphaRedisOptions)

      const betaReadableRedisClient = new Redis(betaRedisOptions)
      const betaWritableRedisClient = new Redis(betaRedisOptions)

      afterAll(() => {
        alphaReadableRedisClient.disconnect()
        alphaWritableRedisClient.disconnect()
        betaReadableRedisClient.disconnect()
        betaWritableRedisClient.disconnect()
      })

      describe('#readableRedisClient', () => {
        const cases = [
          {
            title: 'alpha Redis clients',
            params: {
              readableRedisClient: alphaReadableRedisClient,
              writableRedisClient: alphaWritableRedisClient,
            },
          },
          {
            title: 'beta Redis clients',
            params: {
              readableRedisClient: betaReadableRedisClient,
              writableRedisClient: betaWritableRedisClient,
            },
          },
        ]

        test.each(cases)('$title', ({ params }) => {
          const clerk = new BaseRedisClerk(params)

          expect(clerk)
            .toHaveProperty('readableRedisClient', params.readableRedisClient)
        })
      })

      describe('#writableRedisClient', () => {
        const cases = [
          {
            title: 'alpha Redis clients',
            params: {
              readableRedisClient: alphaReadableRedisClient,
              writableRedisClient: alphaWritableRedisClient,
            },
          },
          {
            title: 'beta Redis clients',
            params: {
              readableRedisClient: betaReadableRedisClient,
              writableRedisClient: betaWritableRedisClient,
            },
          },
        ]

        test.each(cases)('$title', ({ params }) => {
          const clerk = new BaseRedisClerk(params)

          expect(clerk)
            .toHaveProperty('writableRedisClient', params.writableRedisClient)
        })
      })
    })
  })
})

describe('BaseRedisClerk', () => {
  describe('.create()', () => {
    const alphaRedisOptions = {
      host: 'localhost',
      port: 6379,
    }
    const betaRedisOptions = {
      host: 'localhost',
      port: 2222,
    }

    const alphaReadableRedisClient = new Redis(alphaRedisOptions)
    const alphaWritableRedisClient = new Redis(alphaRedisOptions)

    const betaReadableRedisClient = new Redis(betaRedisOptions)
    const betaWritableRedisClient = new Redis(betaRedisOptions)

    afterAll(() => {
      alphaReadableRedisClient.disconnect()
      alphaWritableRedisClient.disconnect()
      betaReadableRedisClient.disconnect()
      betaWritableRedisClient.disconnect()
    })

    describe('to be an instance of own class', () => {
      const cases = [
        {
          params: {
            options: alphaRedisOptions,
          },
          tally: {
            readableRedisClient: alphaReadableRedisClient,
            writableRedisClient: alphaWritableRedisClient,
          },
        },
        {
          params: {
            options: betaRedisOptions,
          },
          tally: {
            readableRedisClient: betaReadableRedisClient,
            writableRedisClient: betaWritableRedisClient,
          },
        },
      ]

      test.each(cases)('options: $params.options', ({ params, tally }) => {
        jest.spyOn(BaseRedisClerk, 'createRedis')
          .mockReturnValueOnce(tally.alphaReadableRedisClient)
          .mockReturnValueOnce(tally.alphaWritableRedisClient)

        const clerk = BaseRedisClerk.create(params)

        expect(clerk)
          .toBeInstanceOf(BaseRedisClerk)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            options: alphaRedisOptions,
          },
          tally: {
            readableRedisClient: alphaReadableRedisClient,
            writableRedisClient: alphaWritableRedisClient,
          },
        },
        {
          params: {
            options: betaRedisOptions,
          },
          tally: {
            readableRedisClient: betaReadableRedisClient,
            writableRedisClient: betaWritableRedisClient,
          },
        },
      ]

      test.each(cases)('options: $params.options', ({ params, tally }) => {
        const createRedisSpy = jest.spyOn(BaseRedisClerk, 'createRedis')
          .mockReturnValueOnce(tally.readableRedisClient)
          .mockReturnValueOnce(tally.writableRedisClient)

        const SpyClass = globalThis.constructorSpy.spyOn(BaseRedisClerk)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(tally)

        expect(createRedisSpy)
          .toHaveBeenNthCalledWith(1, params)
        expect(createRedisSpy)
          .toHaveBeenNthCalledWith(2, params)
      })
    })
  })
})

describe('BaseRedisClerk', () => {
  describe('.createRedis()', () => {
    describe('can instantiate Redis', () => {
      const cases = [
        {
          params: {
            options: {
              host: 'localhost',
              port: 6379,
            },
          },
          dbTally: 0,
          expected: {
            host: 'localhost',
            port: 6379,
            db: 0,
          },
        },
        {
          params: {
            options: {
              host: 'localhost',
              port: 2222,
              db: 1,
            },
          },
          dbTally: 9999,
          expected: {
            host: 'localhost',
            port: 2222,
            db: 1,
          },
        },
      ]

      test.each(cases)('options: $params.options', ({ params, dbTally, expected }) => {
        jest.spyOn(BaseRedisClerk, 'db', 'get')
          .mockReturnValue(dbTally)
        const createSpy = jest.spyOn(LocalRedis, 'create')

        const actual = BaseRedisClerk.createRedis(params)

        expect(actual)
          .toBeInstanceOf(Redis)

        expect(actual.options)
          .toMatchObject(expected)
        expect(createSpy)
          .not
          .toHaveBeenCalled()

        actual.disconnect()
      })
    })

    describe('cannot instantiate Redis', () => {
      const cases = [
        {
          params: {
            options: {
              // host: 'localhost',
              port: 6379,
            },
          },
        },
        {
          params: {
            options: {
              host: 'localhost',
              // port: 2222,
              db: 1,
            },
          },
        },
      ]

      test.each(cases)('options: $params.options', ({ params, expected }) => {
        const dbSpy = jest.spyOn(BaseRedisClerk, 'db', 'get')
        const createSpy = jest.spyOn(LocalRedis, 'create')

        const actual = BaseRedisClerk.createRedis(params)

        expect(actual)
          .toBeInstanceOf(LocalRedis)

        expect(createSpy)
          .toHaveBeenCalledWith(params)
        expect(dbSpy)
          .not
          .toHaveBeenCalled()
      })
    })
  })
})

describe('BaseRedisClerk', () => {
  describe('.canInstantiateRedis()', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          params: {
            options: {
              host: 'localhost',
              port: 6379,
            },
          },
        },
        {
          params: {
            options: {
              host: 'localhost',
              port: 2222,
              db: 1,
            },
          },
        },
      ]

      test.each(cases)('options: $params.options', ({ params }) => {
        const actual = BaseRedisClerk.canInstantiateRedis(params)

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      /**
       * @type {Array<{
       *   params: {
       *     options: import('ioredis').RedisOptions | null
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            options: {
              // host: 'localhost',
              port: 6379,
            },
          },
        },
        {
          params: {
            options: {
              host: 'localhost',
              // port: 2222,
              db: 1,
            },
          },
        },
        {
          params: {
            options: null,
          },
        },
        {
          params: {
            options: 'invalid option',
          },
        },
        {
          params: {
            options: [],
          },
        },
      ])

      test.each(cases)('options: $params.options', ({ params }) => {
        const actual = BaseRedisClerk.canInstantiateRedis(params)

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('BaseRedisClerk', () => {
  describe('.get:RedisCtor', () => {
    test('to be a Redis constructor', () => {
      const actual = BaseRedisClerk.RedisCtor

      expect(actual)
        .toBe(Redis)
    })
  })
})

describe('BaseRedisClerk', () => {
  describe('.get:db', () => {
    test('to throw an error', () => {
      expect(() => BaseRedisClerk.db)
        .toThrow('this function must be inherited')
    })
  })
})

describe('BaseRedisClerk', () => {
  describe('#saveValue()', () => {
    const readableRedisClient = new Redis({
      host: 'localhost',
      port: 6379,
    })
    const writableRedisClient = new Redis({
      host: 'localhost',
      port: 6379,
    })

    const redisClerk = new BaseRedisClerk({
      readableRedisClient,
      writableRedisClient,
    })

    afterAll(() => {
      readableRedisClient.disconnect()
      writableRedisClient.disconnect()
    })

    const cases = [
      {
        params: {
          key: 'alpha',
          value: 'alpha value',
        },
      },
      {
        params: {
          key: 'beta',
          value: 'beta value',
        },
      },
      {
        params: {
          key: 'gamma',
          value: 'gamma value',
        },
      },
    ]

    test.each(cases)('key: $params.key', async ({ params }) => {
      const setSpy = jest.spyOn(redisClerk.writableRedisClient, 'set')
        .mockResolvedValueOnce('OK')

      const actual = await redisClerk.saveValue(params)

      expect(actual)
        .toBe('OK')

      expect(setSpy)
        .toHaveBeenCalledWith(params.key, params.value)
    })
  })
})

describe('BaseRedisClerk', () => {
  describe('#loadValue()', () => {
    const args = {
      options: {
        host: 'localhost',
        port: 6379,
      },
    }

    const readableRedisClient = LocalRedis.create(args)
    const writableRedisClient = LocalRedis.create(args)

    const redisClerk = new BaseRedisClerk({
      readableRedisClient,
      writableRedisClient,
    })

    describe('to return a value', () => {
      const cases = [
        {
          params: {
            key: 'alpha',
          },
          tally: 'alpha value',
        },
        {
          params: {
            key: 'beta',
          },
          tally: 'beta value',
        },
        {
          params: {
            key: 'gamma',
          },
          tally: 'gamma value',
        },
      ]

      test.each(cases)('key: $params.key', async ({ params, tally }) => {
        const getSpy = jest.spyOn(redisClerk.readableRedisClient, 'get')
          .mockResolvedValueOnce(tally)

        const actual = await redisClerk.loadValue({
          key: params.key,
        })

        expect(actual)
          .toBe(tally)

        expect(getSpy)
          .toHaveBeenCalledWith(params.key)
      })
    })

    describe('to be null', () => {
      const cases = [
        {
          params: {
            key: 'alpha',
          },
        },
        {
          params: {
            key: 'beta',
          },
        },
        {
          params: {
            key: 'gamma',
          },
        },
      ]

      test.each(cases)('key: $params.key', async ({ params, tally }) => {
        const getSpy = jest.spyOn(redisClerk.readableRedisClient, 'get')

        const actual = await redisClerk.loadValue({
          key: params.key,
        })

        expect(actual)
          .toBeNull()

        expect(getSpy)
          .toHaveBeenCalledWith(params.key)
      })
    })
  })
})

describe('BaseRedisClerk', () => {
  describe('#deleteValue()', () => {
    const args = {
      options: {
        host: 'localhost',
        port: 6379,
      },
    }

    const readableRedisClient = LocalRedis.create(args)
    const writableRedisClient = LocalRedis.create(args)

    const redisClerk = new BaseRedisClerk({
      readableRedisClient,
      writableRedisClient,
    })

    const cases = [
      {
        params: {
          key: 'alpha',
        },
      },
      {
        params: {
          key: 'beta',
        },
      },
      {
        params: {
          key: 'gamma',
        },
      },
    ]

    test.each(cases)('key: $params.key', async ({ params }) => {
      const delSpy = jest.spyOn(redisClerk.writableRedisClient, 'del')
        .mockResolvedValueOnce(1)

      const actual = await redisClerk.deleteValue(params)

      expect(actual)
        .toBe(1)

      expect(delSpy)
        .toHaveBeenCalledWith(params.key)
    })
  })
})
