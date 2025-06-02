import LocalRedis from '../../../../lib/server/redis/LocalRedis.js'

describe('LocalRedis', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#options', () => {
        const cases = [
          {
            params: {
              options: {
                host: 'localhost',
                port: 6379,
                db: 1,
              },
            },
          },
          {
            params: {
              options: {
                db: 1,
              },
            },
          },
        ]

        test.each(cases)('options: $params.options', ({ params }) => {
          const localRedis = new LocalRedis(params.options)

          expect(localRedis)
            .toHaveProperty('options', params.options)
        })
      })
    })
  })
})

describe('LocalRedis', () => {
  describe('.create()', () => {
    describe('to return instance of own class', () => {
      const cases = [
        {
          params: {
            options: {
              host: 'localhost',
              port: 6379,
              db: 1,
            },
          },
        },
        {
          params: {
            options: {
              db: 1,
            },
          },
        },
      ]

      test.each(cases)('options: $params.options', ({ params }) => {
        const localRedis = LocalRedis.create(params)

        expect(localRedis)
          .toBeInstanceOf(LocalRedis)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            options: {
              host: 'localhost',
              port: 6379,
              db: 1,
            },
          },
        },
        {
          params: {
            options: {
              db: 1,
            },
          },
        },
      ]

      test.each(cases)('options: $params.options', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(LocalRedis)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params.options)
      })
    })
  })
})

describe('LocalRedis', () => {
  describe('#get:entryPool', () => {
    describe('to be object', () => {
      const cases = [
        {
          params: {
            options: {
              host: 'localhost',
              port: 6379,
              db: 1,
            },
          },
        },
        {
          params: {
            options: {
              db: 1,
            },
          },
        },
      ]

      test.each(cases)('options: $params.options', ({ params }) => {
        const redis = new LocalRedis(params.options)

        expect(redis.entryPool)
          .toEqual({})
      })
    })
  })
})

describe('LocalRedis', () => {
  describe('#set()', () => {
    describe('to set value by key', () => {
      const optionsTally = {
        host: 'localhost',
        port: 6379,
        db: 1,
      }

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
      ]

      test.each(cases)('key: $params.key', async ({ params }) => {
        const redis = new LocalRedis(optionsTally)

        await redis.set(params.key, params.value)

        expect(redis.entryPool)
          .toHaveProperty(params.key, params.value)
      })
    })
  })
})

describe('LocalRedis', () => {
  describe('#get()', () => {
    describe('to get value by key', () => {
      const optionsTally = {
        host: 'localhost',
        port: 6379,
        db: 1,
      }

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
      ]

      test.each(cases)('key: $params.key', async ({ params }) => {
        const redis = new LocalRedis(optionsTally)

        await redis.set(params.key, params.value)

        const value = await redis.get(params.key)

        expect(value)
          .toBe(params.value)
      })
    })
  })
})

describe('LocalRedis', () => {
  describe('#del()', () => {
    describe('to delete value by key', () => {
      const optionsTally = {
        host: 'localhost',
        port: 6379,
        db: 1,
      }

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
      ]

      test.each(cases)('key: $params.key', async ({ params }) => {
        const redis = new LocalRedis(optionsTally)

        await redis.set(params.key, params.value)

        expect(redis.entryPool)
          .toHaveProperty(params.key, params.value)

        const deletedCount = await redis.del(params.key)

        expect(deletedCount)
          .toBe(1)

        expect(redis.entryPool)
          .not
          .toHaveProperty(params.key, params.value)
      })
    })
  })
})
