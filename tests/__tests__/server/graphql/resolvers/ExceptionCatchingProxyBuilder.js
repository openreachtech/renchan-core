import ExceptionCatchingProxyBuilder from '../../../../../lib/server/graphql/resolvers/ExceptionCatchingProxyBuilder.js'

import CustomerGraphqlServerEngine from '../../../../../app/server/graphql/CustomerGraphqlServerEngine.js'
import AdminGraphqlServerEngine from '../../../../../app/server/graphql/AdminGraphqlServerEngine.js'

describe('ExceptionCatchingProxyBuilder', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      const cases = [
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => error,
                error => error,
              ],
            ]),
          },
        },
        {
          params: {
            alternativeExceptionMap: new Map(),
          },
        },
      ]

      test.each(cases)('alternativeExceptionMap: $params.alternativeExceptionMap', ({ params }) => {
        const actual = new ExceptionCatchingProxyBuilder(params)

        expect(actual)
          .toHaveProperty('alternativeExceptionMap', params.alternativeExceptionMap)
      })
    })
  })
})

describe('ExceptionCatchingProxyBuilder', () => {
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

        const actual = ExceptionCatchingProxyBuilder.create({
          engine,
        })

        expect(actual)
          .toBeInstanceOf(ExceptionCatchingProxyBuilder)
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
        const expected = {
          alternativeExceptionMap: expect.any(Map),
        }

        const SpyClass = globalThis.constructorSpy.spyOn(ExceptionCatchingProxyBuilder)

        const engine = await params.Engine.createAsync()

        SpyClass.create({
          engine,
        })

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('ExceptionCatchingProxyBuilder', () => {
  describe('#buildProxy()', () => {
    describe('to be Function', () => {
      const cases = [
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => false,
                error => new Error('alpha'),
              ],
              [
                error => true,
                error => new Error('beta'),
              ],
            ]),
            realFunction: () => 'alpha value',
          },
        },
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => true,
                error => new Error('alpha'),
              ],
              [
                error => true,
                error => new Error('beta'),
              ],
            ]),
            realFunction: () => 'beta value',
          },
        },
      ]

      test.each(cases)('realFunction: $params.realFunction', ({ params }) => {
        const builder = new ExceptionCatchingProxyBuilder({
          alternativeExceptionMap: params.alternativeExceptionMap,
        })

        const actual = builder.buildProxy(params)

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('to work proxy function', () => {
      const cases = [
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => false,
                error => new Error('alpha'),
              ],
              [
                error => true,
                error => new Error('beta'),
              ],
            ]),
            realFunction: () => {
              throw new Error('original @alpha')
            },
          },
          expected: 'beta',
        },
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => true,
                error => new Error('alpha'),
              ],
              [
                error => true,
                error => new Error('beta'),
              ],
            ]),
            realFunction: () => {
              throw new Error('original @beta')
            },
          },
          expected: 'alpha',
        },
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => false,
                error => new Error('alpha'),
              ],
              [
                error => false,
                error => new Error('beta'),
              ],
            ]),
            realFunction: () => {
              throw new Error('original @gamma')
            },
          },
          expected: 'original @gamma',
        },
      ]

      test.each(cases)('realFunction: $params.realFunction', ({ params, expected }) => {
        const builder = new ExceptionCatchingProxyBuilder({
          alternativeExceptionMap: params.alternativeExceptionMap,
        })

        const args = {
          realFunction: params.realFunction,
        }

        const proxyFunction = builder.buildProxy(args)

        expect(() => proxyFunction())
          .toThrow(expected)
      })
    })
  })
})

describe('ExceptionCatchingProxyBuilder', () => {
  describe('#buildProxyAsync()', () => {
    describe('to be Function', () => {
      const cases = [
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => false,
                error => new Error('alpha'),
              ],
              [
                error => true,
                error => new Error('beta'),
              ],
            ]),
            realFunction: async () => 'alpha value',
          },
        },
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => true,
                error => new Error('alpha'),
              ],
              [
                error => true,
                error => new Error('beta'),
              ],
            ]),
            realFunction: async () => 'beta value',
          },
        },
      ]

      test.each(cases)('realFunction: $params.realFunction', ({ params }) => {
        const builder = new ExceptionCatchingProxyBuilder({
          alternativeExceptionMap: params.alternativeExceptionMap,
        })

        const actual = builder.buildProxyAsync(params)

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('to work proxy function', () => {
      const cases = [
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => false,
                error => new Error('alpha'),
              ],
              [
                error => true,
                error => new Error('beta'),
              ],
            ]),
            realFunction: async () => {
              throw new Error('original @alpha')
            },
          },
          expected: 'beta',
        },
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => true,
                error => new Error('alpha'),
              ],
              [
                error => true,
                error => new Error('beta'),
              ],
            ]),
            realFunction: async () => {
              throw new Error('original @beta')
            },
          },
          expected: 'alpha',
        },
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => false,
                error => new Error('alpha'),
              ],
              [
                error => false,
                error => new Error('beta'),
              ],
            ]),
            realFunction: async () => {
              throw new Error('original @gamma')
            },
          },
          expected: 'original @gamma',
        },
      ]

      test.each(cases)('realFunction: $params.realFunction', async ({ params, expected }) => {
        const builder = new ExceptionCatchingProxyBuilder({
          alternativeExceptionMap: params.alternativeExceptionMap,
        })

        const args = {
          realFunction: params.realFunction,
        }

        const proxyFunction = builder.buildProxyAsync(args)

        await expect(proxyFunction())
          .rejects
          .toThrow(expected)
      })
    })
  })
})

describe('ExceptionCatchingProxyBuilder', () => {
  describe('#resolveAlternativeError()', () => {
    describe('to be alternative exception', () => {
      const cases = [
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => true,
                error => new Error('alpha'),
              ],
              [
                error => false,
                error => new Error('beta'),
              ],
            ]),
            error: new Error('original @alpha'),
          },
          expected: 'alpha',
        },
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => false,
                error => new Error('alpha'),
              ],
              [
                error => true,
                error => new Error('beta'),
              ],
            ]),
            error: new Error('original @beta'),
          },
          expected: 'beta',
        },
      ]

      test.each(cases)('error: $params.error', ({ params, expected }) => {
        const constructorArgs = {
          alternativeExceptionMap: params.alternativeExceptionMap,
        }
        const builder = new ExceptionCatchingProxyBuilder(constructorArgs)

        const args = {
          error: params.error,
        }

        const actual = builder.resolveAlternativeError(args)

        expect(actual)
          .toBeInstanceOf(Error)
        expect(actual)
          .toHaveProperty('message', expected)
      })
    })

    describe('to be null when does not match', () => {
      const cases = [
        {
          params: {
            alternativeExceptionMap: new Map([
              [
                error => false,
                error => new Error('alpha'),
              ],
              [
                error => false,
                error => new Error('beta'),
              ],
            ]),
            error: new Error('original @alpha'),
          },
        },
        {
          params: {
            alternativeExceptionMap: new Map(),
            error: new Error('original @beta'),
          },
        },
      ]

      test.each(cases)('error: $params.error', ({ params, expected }) => {
        const constructorArgs = {
          alternativeExceptionMap: params.alternativeExceptionMap,
        }
        const builder = new ExceptionCatchingProxyBuilder(constructorArgs)

        const args = {
          error: params.error,
        }

        const actual = builder.resolveAlternativeError(args)

        expect(actual)
          .toBeNull()
      })
    })
  })
})
