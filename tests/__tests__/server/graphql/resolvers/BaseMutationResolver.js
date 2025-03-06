import BaseMutationResolver from '../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'
import BaseResolver from '../../../../../lib/server/graphql/resolvers/BaseResolver.js'
import FileContentReader from '../../../../../lib/tools/FileContentReader.js'

describe('BaseMutationResolver', () => {
  describe('super class', () => {
    test('to be BaseResolver', () => {
      const actual = BaseMutationResolver.prototype

      expect(actual)
        .toBeInstanceOf(BaseResolver)
    })
  })
})

describe('BaseMutationResolver', () => {
  describe('.get:operation', () => {
    test('to be fixed value', () => {
      const expected = 'Mutation'

      const actual = BaseMutationResolver.operation

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('BaseMutationResolver', () => {
  describe('.createAsyncFileContentReader()', () => {
    describe('to be instance of FileContentReader', () => {
      /**
       * @type {Array<{
       *   params: {
       *     upload: import('graphql-upload/Upload.mjs').default
       *   }
       *   expected: {
       *     upload: import('graphql-upload/Upload.mjs').default
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            upload: {
              file: {
                filename: 'alpha.jpg',
                mimetype: 'image/jpeg',
                encoding: '7bit',
              },
              promise: Promise.resolve(),
              resolve: () => {},
              reject: () => {},
            },
          },
        },
        {
          params: {
            upload: {
              file: {
                filename: 'beta.png',
                mimetype: 'image/png',
                encoding: '7bit',
              },
              promise: Promise.resolve(),
              resolve: () => {},
              reject: () => {},
            },
          },
        },
        {
          params: {
            upload: {
              file: {
                filename: 'gamma.gif',
                mimetype: 'image/gif',
                encoding: '7bit',
              },
              promise: Promise.resolve(),
              resolve: () => {},
              reject: () => {},
            },
          },
        },
      ])

      test.each(cases)('filename: $params.upload.filename', async ({ params }) => {
        const actual = await BaseMutationResolver.createAsyncFileContentReader(params)

        expect(actual)
          .toBeInstanceOf(FileContentReader)
      })
    })

    describe('to call FileContentReader.createAsync()', () => {
      /**
       * @type {Array<{
       *   params: {
       *     upload: import('graphql-upload/Upload.mjs').default
       *   }
       *   expected: {
       *     upload: import('graphql-upload/Upload.mjs').default
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            upload: {
              file: {
                filename: 'alpha.jpg',
                mimetype: 'image/jpeg',
                encoding: '7bit',
              },
              promise: Promise.resolve(),
              resolve: () => {},
              reject: () => {},
            },
          },
        },
        {
          params: {
            upload: {
              file: {
                filename: 'beta.png',
                mimetype: 'image/png',
                encoding: '7bit',
              },
              promise: Promise.resolve(),
              resolve: () => {},
              reject: () => {},
            },
          },
        },
        {
          params: {
            upload: {
              file: {
                filename: 'gamma.gif',
                mimetype: 'image/gif',
                encoding: '7bit',
              },
              promise: Promise.resolve(),
              resolve: () => {},
              reject: () => {},
            },
          },
        },
      ])

      test.each(cases)('filename: $params.upload.file.filename', async ({ params }) => {
        const createAsyncSpy = jest.spyOn(FileContentReader, 'createAsync')

        await BaseMutationResolver.createAsyncFileContentReader(params)

        expect(createAsyncSpy)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})
