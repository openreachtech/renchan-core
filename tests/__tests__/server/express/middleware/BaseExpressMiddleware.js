import BaseExpressMiddleware from '../../../../../lib/server/express/middleware/BaseExpressMiddleware.js'

describe('BaseExpressMiddleware', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#engine', () => {
        const cases = [
          {
            params: {
              engine: { share: { name: 'alpha' } },
            },
          },
          {
            params: {
              engine: { share: { name: 'beta' } },
            },
          },
        ]

        test.each(cases)('engine: $params.engine.share.name', ({ params }) => {
          const middleware = new BaseExpressMiddleware({
            engine: params.engine,
          })

          expect(middleware)
            .toHaveProperty('engine', params.engine)
        })
      })
    })
  })

  describe('.create()', () => {
    describe('to return an instance of own class', () => {
      const AlphaExpressMiddleware = class extends BaseExpressMiddleware {}
      const BetaExpressMiddleware = class extends BaseExpressMiddleware {}

      const cases = [
        {
          params: {
            Ctor: BaseExpressMiddleware,
          },
        },
        {
          params: {
            Ctor: AlphaExpressMiddleware,
          },
        },
        {
          params: {
            Ctor: BetaExpressMiddleware,
          },
        },
      ]

      test.each(cases)('Ctor: $params.Ctor.name', ({ params }) => {
        const engine = { share: {} }

        const actual = params.Ctor.create({
          engine,
        })

        expect(actual)
          .toBeInstanceOf(params.Ctor)
        expect(actual)
          .toHaveProperty('engine', engine)
      })
    })
  })

  describe('#get:Ctor', () => {
    describe('to be own constructor', () => {
      const AlphaExpressMiddleware = class extends BaseExpressMiddleware {}

      const cases = [
        {
          params: {
            Ctor: BaseExpressMiddleware,
          },
        },
        {
          params: {
            Ctor: AlphaExpressMiddleware,
          },
        },
      ]

      test.each(cases)('Ctor: $params.Ctor.name', ({ params }) => {
        const middleware = params.Ctor.create({
          engine: { share: {} },
        })

        expect(middleware.Ctor)
          .toBe(params.Ctor)
      })
    })
  })

  describe('#get:share', () => {
    describe('to be share of engine', () => {
      const cases = [
        {
          params: {
            share: { name: 'alpha' },
          },
        },
        {
          params: {
            share: { name: 'beta' },
          },
        },
      ]

      test.each(cases)('share: $params.share.name', ({ params }) => {
        const middleware = BaseExpressMiddleware.create({
          engine: { share: params.share },
        })

        expect(middleware.share)
          .toBe(params.share)
      })
    })
  })

  describe('#composeMiddleware()', () => {
    describe('to throw', () => {
      const AlphaExpressMiddleware = class extends BaseExpressMiddleware {}

      const cases = [
        {
          params: {
            Ctor: BaseExpressMiddleware,
          },
        },
        {
          params: {
            Ctor: AlphaExpressMiddleware,
          },
        },
      ]

      test.each(cases)('Ctor: $params.Ctor.name', ({ params }) => {
        const middleware = params.Ctor.create({
          engine: { share: {} },
        })

        expect(() => middleware.composeMiddleware())
          .toThrow('101.X000.001 {"memberName":"BaseExpressMiddleware#composeMiddleware()"}')
      })
    })
  })
})
