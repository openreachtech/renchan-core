import {
  GraphQLScalarType,
} from 'graphql'

import ScalarHashBuilder from '../../../../../lib/server/graphql/scalars/ScalarHashBuilder.js'

import BaseScalar from '../../../../../lib/server/graphql/scalars/BaseScalar.js'

import CustomerGraphqlServerEngine from '../../../../../app/server/graphql/CustomerGraphqlServerEngine.js'
import AdminGraphqlServerEngine from '../../../../../app/server/graphql/AdminGraphqlServerEngine.js'
import DateTimeScalar from '../../../../../lib/server/graphql/scalars/concretes/DateTimeScalar.js'
import BigNumberScalar from '../../../../../lib/server/graphql/scalars/concretes/BigNumberScalar.js'

const AlphaScalar = class extends BaseScalar {
  static get scalarName () {
    return 'Alpha'
  }

  static get description () {
    return 'Alpha description.'
  }
}
const BetaScalar = class extends BaseScalar {
  static get scalarName () {
    return 'Beta'
  }

  static get description () {
    return 'Beta description.'
  }
}
const GammaScalar = class extends BaseScalar {
  static get scalarName () {
    return 'Gamma'
  }

  static get description () {
    return 'Gamma description.'
  }
}
const DeltaScalar = class extends BaseScalar {
  static get scalarName () {
    return 'Delta'
  }

  static get description () {
    return 'Delta description.'
  }
}

describe('ScalarHashBuilder', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#scalars', () => {
        const scalars = [
          {
            params: {
              scalars: [
                AlphaScalar.create(),
                BetaScalar.create(),
              ],
            },
          },
          {
            params: {
              scalars: [
                GammaScalar.create(),
                DeltaScalar.create(),
              ],
            },
          },
        ]

        test.each(scalars)('[0] Scalar: $params.scalars.0.name', ({ params }) => {
          const builder = new ScalarHashBuilder(params)

          expect(builder)
            .toHaveProperty('scalars', params.scalars)
        })
      })
    })
  })
})

describe('ScalarHashBuilder', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const scalars = [
        {
          params: {
            scalars: [
              AlphaScalar.create(),
              BetaScalar.create(),
            ],
          },
        },
        {
          params: {
            scalars: [
              GammaScalar.create(),
              DeltaScalar.create(),
            ],
          },
        },
      ]

      test.each(scalars)('[0] Scalar: $params.scalars.0.name', ({ params }) => {
        const actual = ScalarHashBuilder.create(params)

        expect(actual)
          .toBeInstanceOf(ScalarHashBuilder)
      })
    })

    describe('to call constructor', () => {
      const scalars = [
        {
          params: {
            scalars: [
              AlphaScalar.create(),
              BetaScalar.create(),
            ],
          },
        },
        {
          params: {
            scalars: [
              GammaScalar.create(),
              DeltaScalar.create(),
            ],
          },
        },
      ]

      test.each(scalars)('[0] Scalar: $params.scalars.0.name', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(ScalarHashBuilder)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('ScalarHashBuilder', () => {
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

        const actual = await ScalarHashBuilder.createAsync({
          engine,
        })

        expect(actual)
          .toBeInstanceOf(ScalarHashBuilder)
      })
    })

    describe('to call .create()', () => {
      const cases = [
        {
          params: {
            Engine: CustomerGraphqlServerEngine,
          },
          expected: {
            scalars: expect.arrayContaining([
              DateTimeScalar.create(),
              BigNumberScalar.create(),
            ]),
          },
        },
        {
          params: {
            Engine: AdminGraphqlServerEngine,
          },
          expected: {
            scalars: expect.arrayContaining([
              DateTimeScalar.create(),
            ]),
          },
        },
      ]

      test.each(cases)('Engine: $params.Engine.name', async ({ params, expected }) => {
        const engine = await params.Engine.createAsync()

        const createSpy = jest.spyOn(ScalarHashBuilder, 'create')

        await ScalarHashBuilder.createAsync({
          engine,
        })

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('ScalarHashBuilder', () => {
  describe('#buildScalarHash()', () => {
    describe('to be scalar hash', () => {
      const scalars = [
        {
          params: {
            scalars: [
              AlphaScalar.create(),
              BetaScalar.create(),
            ],
          },
          expected: {
            Alpha: expect.any(GraphQLScalarType),
            Beta: expect.any(GraphQLScalarType),
          },
        },
        {
          params: {
            scalars: [
              GammaScalar.create(),
              DeltaScalar.create(),
            ],
          },
          expected: {
            Gamma: expect.any(GraphQLScalarType),
            Delta: expect.any(GraphQLScalarType),
          },
        },
      ]

      test.each(scalars)('[0] Scalar: $params.scalars.0.name', ({ params, expected }) => {
        const builder = ScalarHashBuilder.create(params)

        const actual = builder.buildScalarHash()

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})
