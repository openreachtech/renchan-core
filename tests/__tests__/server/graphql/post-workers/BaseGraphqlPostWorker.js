import BaseGraphqlPostWorker from '../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

import CustomerGraphqlServerEngine from '../../../../../app/server/graphql/CustomerGraphqlServerEngine.js'
import AdminGraphqlServerEngine from '../../../../../app/server/graphql/AdminGraphqlServerEngine.js'

import ConcreteMemberNotFoundGraphqlError from '../../../../../lib/server/graphql/errors/concretes/ConcreteMemberNotFoundGraphqlError.js'

describe('BaseGraphqlPostWorker', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
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

        const postWorker = new BaseGraphqlPostWorker({
          engine,
        })

        expect(postWorker)
          .toHaveProperty('engine', engine)
      })
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
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

        const postWorker = BaseGraphqlPostWorker.create({
          engine,
        })

        expect(postWorker)
          .toBeInstanceOf(BaseGraphqlPostWorker)
      })
    })

    describe('to call constructor', () => {
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

        const tallyArgs = {
          engine,
        }

        const SpyClass = globalThis.constructorSpy.spyOn(BaseGraphqlPostWorker)

        SpyClass.create(tallyArgs)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(tallyArgs)
      })
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('.createAsync()', () => {
    describe('to be instance of own class', () => {
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

        const postWorker = await BaseGraphqlPostWorker.createAsync({
          engine,
        })

        expect(postWorker)
          .toBeInstanceOf(BaseGraphqlPostWorker)
      })
    })

    describe('to call constructor', () => {
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

        const tallyArgs = {
          engine,
        }

        const SpyClass = globalThis.constructorSpy.spyOn(BaseGraphqlPostWorker)

        await SpyClass.createAsync(tallyArgs)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(tallyArgs)
      })
    })
  })
})

describe('BaseGraphqlPostWorker', () => {
  describe('.get:schema', () => {
    test('to throw ConcreteMemberNotFoundGraphqlError', () => {
      expect(() => BaseGraphqlPostWorker.schema)
        .toThrow(expect.any(ConcreteMemberNotFoundGraphqlError))
    })
  })
})
