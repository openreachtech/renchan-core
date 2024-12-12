import RootPath from '../../../lib/tools/RootPath.js'

describe('RootPath', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#base', () => {
        const cases = [
          {
            params: {
              base: '/project-alpha',
            },
          },
          {
            params: {
              base: '/project-beta',
            },
          },
        ]

        test.each(cases)('base: $params.base', ({ params }) => {
          const rootPath = new RootPath(params)

          expect(rootPath)
            .toHaveProperty('base', params.base)
        })
      })
    })
  })
})

describe('RootPath', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            base: '/project-alpha',
          },
        },
        {
          params: {
            base: '/project-beta',
          },
        },
      ]

      test.each(cases)('base: $params.base', ({ params }) => {
        const rootPath = RootPath.create(params)

        expect(rootPath)
          .toBeInstanceOf(RootPath)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            base: '/project-alpha',
          },
        },
        {
          params: {
            base: '/project-beta',
          },
        },
      ]

      test.each(cases)('base: $params.base', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(RootPath)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('RootPath', () => {
  describe('#to()', () => {
    const cases = [
      {
        params: {
          base: '/project-alpha',
        },
        pathCases: [
          {
            targetPath: 'src',
            expected: '/project-alpha/src',
          },
          {
            targetPath: 'src/index.js',
            expected: '/project-alpha/src/index.js',
          },
        ],
      },
      {
        params: {
          base: '/project-beta',
        },
        pathCases: [
          {
            targetPath: 'src',
            expected: '/project-beta/src',
          },
          {
            targetPath: 'src/index.js',
            expected: '/project-beta/src/index.js',
          },
        ],
      },
    ]

    describe.each(cases)('base: $params.base', ({ params, pathCases }) => {
      const rootPath = new RootPath(params)

      test.each(pathCases)('targetPath: $targetPath', ({ targetPath, expected }) => {
        const actual = rootPath.to(targetPath)

        expect(actual)
          .toBe(expected)
      })
    })
  })
})
