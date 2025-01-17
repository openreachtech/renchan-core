import UploadImageMutationResolver from '../../../../../../../../../app/server/graphql/resolvers/customer/actual/mutations/UploadImageMutationResolver.js'
import FileContentReader from '../../../../../../../../../lib/tools/FileContentReader.js'

describe('UploadImageMutationResolver', () => {
  describe('.get:schema', () => {
    test('to be fixed value', () => {
      const expected = 'uploadImage'

      const actual = UploadImageMutationResolver.schema

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('UploadImageMutationResolver', () => {
  describe('#formatResponse()', () => {
    /**
     * @typedef {Array<{
     *   params: {
     *     file: import('graphql-upload/processRequest.mjs').FileUpload
     *   },
     *   expected: {
     *     filename: string
     *     mimetype: string
     *     encoding: string
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          file: {
            filename: 'test.jpg',
            mimetype: 'image/jpeg',
            encoding: 'utf-8',
          },
        },
        expected: {
          filename: 'test.jpg',
          mimetype: 'image/jpeg',
          encoding: 'utf-8',
        },
      },
      {
        params: {
          file: {
            filename: 'another.png',
            mimetype: 'image/png',
            encoding: 'base64',
          },
        },
        expected: {
          filename: 'another.png',
          mimetype: 'image/png',
          encoding: 'base64',
        },
      },
    ])

    test.each(cases)('filename: $params.file.filename', ({ params, expected }) => {
      const contentReader = FileContentReader.create({
        file: params.file,
      })

      const resolver = UploadImageMutationResolver.create()

      const actual = resolver.formatResponse({
        contentReader,
      })

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('UploadImageMutationResolver', () => {
  describe('#resolve()', () => {
    describe('to call .createAsyncFileContentReader()', () => {
      /**
       * @type {Array<{
       *   params: {
       *     variables: {
       *       input: {
       *         image: import('graphql-upload/Upload.mjs').default
       *       }
       *     }
       *   }
       *   uploadTally: import('graphql-upload/processRequest.mjs').FileUpload
       *   expected: {
       *     filename: string
       *     mimetype: string
       *     encoding: string
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            variables: {
              input: {
                image: {
                  filename: 'alpha.jpg',
                  mimetype: 'image/jpeg',
                  encoding: 'utf-8',
                },
              },
            },
          },
          uploadTally: {
            filename: 'alpha.jpg',
            mimetype: 'image/jpeg',
            encoding: 'utf-8',
          },
          expected: {
            upload: {
              filename: 'alpha.jpg',
              mimetype: 'image/jpeg',
              encoding: 'utf-8',
            },
          },
        },
        {
          params: {
            variables: {
              input: {
                image: {
                  filename: 'beta.png',
                  mimetype: 'image/png',
                  encoding: 'base64',
                },
              },
            },
          },
          uploadTally: {
            filename: 'beta.png',
            mimetype: 'image/png',
            encoding: 'base64',
          },
          expected: {
            upload: {
              filename: 'beta.png',
              mimetype: 'image/png',
              encoding: 'base64',
            },
          },
        },
      ])

      test.each(cases)('filename: $params.variables.input.image.filename', async ({ params, uploadTally, expected }) => {
        const resolver = await UploadImageMutationResolver.createAsync()

        const readerTally = new FileContentReader({
          file: uploadTally,
        })

        const createAsyncFileContentReaderSpy = jest.spyOn(UploadImageMutationResolver, 'createAsyncFileContentReader')
          .mockResolvedValue(readerTally)

        const args = {
          variables: params.variables,
        }

        await resolver.resolve(args)

        expect(createAsyncFileContentReaderSpy)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('to call #formatResponse()', () => {
      /**
       * @type {Array<{
       *   params: {
       *     variables: {
       *       input: {
       *         image: import('graphql-upload/Upload.mjs').default
       *       }
       *     }
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            variables: {
              input: {
                image: {
                  filename: 'alpha.jpg',
                  mimetype: 'image/jpeg',
                  encoding: 'utf-8',
                },
              },
            },
          },
        },
        {
          params: {
            variables: {
              input: {
                image: {
                  filename: 'beta.png',
                  mimetype: 'image/png',
                  encoding: 'base64',
                },
              },
            },
          },
        },
      ])

      test.each(cases)('filename: $params.variables.input.image.filename', async ({ params }) => {
        const expected = {
          contentReader: expect.any(FileContentReader),
        }

        const resolver = await UploadImageMutationResolver.createAsync()

        const formatResponseSpy = jest.spyOn(resolver, 'formatResponse')

        const args = {
          variables: params.variables,
        }

        await resolver.resolve(args)

        expect(formatResponseSpy)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('to be response value', () => {
      /**
       * @type {Array<{
       *   params: {
       *     variables: {
       *       input: {
       *         image: import('graphql-upload/Upload.mjs').default
       *       }
       *     }
       *   }
       *   uploadTally: import('graphql-upload/processRequest.mjs').FileUpload
       *   expected: {
       *     filename: string
       *     mimetype: string
       *     encoding: string
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            variables: {
              input: {
                image: {
                  filename: 'alpha.jpg',
                  mimetype: 'image/jpeg',
                  encoding: 'utf-8',
                },
              },
            },
          },
          uploadTally: {
            filename: 'alpha.jpg',
            mimetype: 'image/jpeg',
            encoding: 'utf-8',
          },
          expected: {
            filename: 'alpha.jpg',
            mimetype: 'image/jpeg',
            encoding: 'utf-8',
          },
        },
        {
          params: {
            variables: {
              input: {
                image: {
                  filename: 'beta.png',
                  mimetype: 'image/png',
                  encoding: 'base64',
                },
              },
            },
          },
          uploadTally: {
            filename: 'beta.png',
            mimetype: 'image/png',
            encoding: 'base64',
          },
          expected: {
            filename: 'beta.png',
            mimetype: 'image/png',
            encoding: 'base64',
          },
        },
      ])

      test.each(cases)('filename: $params.variables.input.image.filename', async ({ params, uploadTally, expected }) => {
        const resolver = await UploadImageMutationResolver.createAsync()

        const readerTally = new FileContentReader({
          file: uploadTally,
        })

        jest.spyOn(UploadImageMutationResolver, 'createAsyncFileContentReader')
          .mockResolvedValue(readerTally)

        const args = {
          variables: params.variables,
        }

        const actual = await resolver.resolve(args)

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})
