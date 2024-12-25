import FileContentReader from '../../../lib/tools/FileContentReader.js'

describe('FileContentReader', () => {
  describe('constructor', () => {
    const alphaStreamMock = {
      on: jest.fn((event, callback) => alphaStreamMock),
    }
    const betaStreamMock = {
      on: jest.fn((event, callback) => betaStreamMock),
    }

    describe('to keep properties', () => {
      describe('#file', () => {
        /**
         * @type {Array<{
         *   params: {
         *     file: import('graphql-upload/processRequest.mjs').FileUpload
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              file: alphaStreamMock,
            },
          },
          {
            params: {
              file: betaStreamMock,
            },
          },
          {
            params: {
              // file: fileUploadMock,
            },
          },
        ])

        test.each(cases)('file: $params.file', ({ params }) => {
          const args = {
            file: params.file,
          }

          const reader = new FileContentReader(args)

          expect(reader)
            .toHaveProperty('file', params.file)
        })
      })
    })
  })
})

describe('FileContentReader', () => {
  describe('create', () => {
    const alphaStreamMock = {
      on: jest.fn((event, callback) => alphaStreamMock),
    }
    const betaStreamMock = {
      on: jest.fn((event, callback) => betaStreamMock),
    }

    /**
     * @type {Array<{
     *   params: {
     *     file: import('graphql-upload/processRequest.mjs').FileUpload
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          file: alphaStreamMock,
        },
      },
      {
        params: {
          file: betaStreamMock,
        },
      },
      {
        params: {
          // file: fileUploadMock,
        },
      },
    ])

    describe('to be instance of own class', () => {
      test.each(cases)('file: $params.file', ({ params }) => {
        const args = {
          file: params.file,
        }

        const actual = FileContentReader.create(args)

        expect(actual)
          .toBeInstanceOf(FileContentReader)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('file: $params.file', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FileContentReader)

        const args = {
          file: params.file,
        }

        SpyClass.create(args)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('FileContentReader', () => {
  describe('createAsync', () => {
    const alphaStreamMock = {
      on: jest.fn((event, callback) => alphaStreamMock),
    }
    const betaStreamMock = {
      on: jest.fn((event, callback) => betaStreamMock),
    }

    describe('to be instance of own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     upload: import('graphql-upload/Upload.mjs').default
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            upload: {
              promise: Promise.resolve(),
              file: alphaStreamMock,
            },
          },
        },
        {
          params: {
            upload: {
              promise: Promise.resolve(),
              file: betaStreamMock,
            },
          },
        },
        {
          params: {
            upload: {
              promise: Promise.resolve(),
              file: undefined,
            },
          },
        },
      ])

      test.each(cases)('upload: $params.upload', async ({ params }) => {
        const args = {
          upload: params.upload,
        }

        const actual = await FileContentReader.createAsync(args)

        expect(actual)
          .toBeInstanceOf(FileContentReader)
      })
    })

    describe('to call .create()', () => {
      /**
       * @type {Array<{
       *   params: {
       *     upload: import('graphql-upload/Upload.mjs').default
       *   }
       *   expected: {
       *     file: import('graphql-upload/processRequest.mjs').FileUpload
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            upload: {
              promise: Promise.resolve(),
              file: alphaStreamMock,
            },
          },
          expected: {
            file: alphaStreamMock,
          },
        },
        {
          params: {
            upload: {
              promise: Promise.resolve(),
              file: betaStreamMock,
            },
          },
          expected: {
            file: betaStreamMock,
          },
        },
        {
          params: {
            upload: {
              promise: Promise.resolve(),
              file: undefined,
            },
          },
          expected: {
            file: undefined,
          },
        },
      ])

      test.each(cases)('upload: $params.upload', async ({ params, expected }) => {
        const createSpy = jest.spyOn(FileContentReader, 'create')

        const args = {
          upload: params.upload,
        }

        await FileContentReader.createAsync(args)

        expect(createSpy)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('to call upload.promise', () => {
      /**
       * @type {Array<{
       *   params: {
       *     upload: import('graphql-upload/Upload.mjs').default
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            upload: {
              promise: Promise.resolve(),
              file: alphaStreamMock,
            },
          },
        },
        {
          params: {
            upload: {
              promise: Promise.resolve(),
              file: betaStreamMock,
            },
          },
        },
        {
          params: {
            upload: {
              promise: Promise.resolve(),
              file: undefined,
            },
          },
        },
      ])

      test.each(cases)('upload: $params.upload', async ({ params }) => {
        const promiseSpy = jest.fn(() => Promise.resolve())

        /** @type {import('graphql-upload/Upload.mjs').default} */
        const upload = /** @type {*} */ ({
          __proto__: params.upload,
          promise: promiseSpy(),
        })

        const args = {
          upload,
        }

        await FileContentReader.createAsync(args)

        expect(promiseSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('FileContentReader', () => {
  describe('#readContent()', () => {
    describe('to be null when no file is set', () => {
      const cases = [
        {
          params: {
            file: undefined,
          },
        },
        {
          params: {
            // file: undefined,
          },
        },
      ]

      test.each(cases)('file: $params.file', async ({ params }) => {
        const args = {
          file: params.file,
        }
        const reader = new FileContentReader(args)

        const actual = await reader.readContent()

        expect(actual)
          .toBeNull()
      })
    })

    describe('should return file content as Buffer', () => {
      const alphaStreamMock = {
        on: jest.fn((event, callback) => {
          if (event === 'data') {
            // @ts-expect-error
            callback(Buffer.from('alpha-chunk'))
          }

          if (event === 'end') {
            // @ts-expect-error
            callback()
          }

          return alphaStreamMock
        }),
      }
      const betaStreamMock = {
        on: jest.fn((event, callback) => {
          if (event === 'data') {
            // @ts-expect-error
            callback(Buffer.from('beta-chunk'))
          }

          if (event === 'end') {
            // @ts-expect-error
            callback()
          }

          return betaStreamMock
        }),
      }

      const cases = [
        {
          params: {
            file: alphaStreamMock,
          },
          expected: Buffer.from('alpha-chunk'),
        },
        {
          params: {
            file: betaStreamMock,
          },
          expected: Buffer.from('beta-chunk'),
        },
      ]

      test.each(cases)('file: $params.file', async ({ params, expected }) => {
        /** @type {import('graphql-upload/processRequest.mjs').FileUpload} */
        const fileMock = /** @type {*} */ ({
          createReadStream: jest.fn()
            .mockReturnValue(params.file),
        })

        const args = {
          file: fileMock,
        }
        const reader = new FileContentReader(args)

        const actual = await reader.readContent()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('should handle stream errors', () => {
      const alphaStreamMock = {
        on: jest.fn((event, callback) => {
          if (event === 'error') {
            // @ts-expect-error
            callback(new Error('Alpha stream error'))
          }

          return alphaStreamMock
        }),
      }
      const betaStreamMock = {
        on: jest.fn((event, callback) => {
          if (event === 'error') {
            // @ts-expect-error
            callback(new Error('Beta stream error'))
          }

          return betaStreamMock
        }),
      }

      const cases = [
        {
          params: {
            file: alphaStreamMock,
          },
          expected: 'Alpha stream error',
        },
        {
          params: {
            file: betaStreamMock,
          },
          expected: 'Beta stream error',
        },
      ]

      test.each(cases)('file: $params.file', async ({ params, expected }) => {
        /** @type {import('graphql-upload/processRequest.mjs').FileUpload} */
        const fileMock = /** @type {*} */ ({
          createReadStream: jest.fn()
            .mockReturnValue(params.file),
        })

        const args = {
          file: fileMock,
        }
        const reader = new FileContentReader(args)

        await expect(reader.readContent())
          .rejects
          .toThrow(expected)
      })
    })
  })
})

describe('FileContentReader', () => {
  describe('#concatenateChunks()', () => {
    describe('should concatenate chunks from the stream', () => {
      /** @type {import('stream').Readable} */
      const alphaStreamMock = /** @type {*} */ ({
        on: jest.fn((event, callback) => {
          if (event === 'data') {
            // @ts-expect-error
            callback(Buffer.from('alpha-chunk-first'))
            // @ts-expect-error
            callback(Buffer.from('alpha-chunk-second'))
          }

          if (event === 'end') {
            // @ts-expect-error
            callback()
          }

          return alphaStreamMock
        }),
      })

      /** @type {import('stream').Readable} */
      const betaStreamMock = /** @type {*} */ ({
        on: jest.fn((event, callback) => {
          if (event === 'data') {
            // @ts-expect-error
            callback(Buffer.from('beta-chunk-first'))
            // @ts-expect-error
            callback(Buffer.from('beta-chunk-second'))
          }

          if (event === 'end') {
            // @ts-expect-error
            callback()
          }

          return betaStreamMock
        }),
      })

      /**
       * @type {Array<{
       *   params: {
       *     stream: import('stream').Readable
       *   }
       *   expected: Buffer
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            stream: alphaStreamMock,
          },
          expected: Buffer.concat([
            Buffer.from('alpha-chunk-first'),
            Buffer.from('alpha-chunk-second'),
          ]),
        },
        {
          params: {
            stream: betaStreamMock,
          },
          expected: Buffer.concat([
            Buffer.from('beta-chunk-first'),
            Buffer.from('beta-chunk-second'),
          ]),
        },
      ])

      test.each(cases)('stream: $params.stream', async ({ params, expected }) => {
        /** @type {import('graphql-upload/processRequest.mjs').FileUpload} */
        const fileMock = /** @type {*} */ ({
          createReadStream: jest.fn()
            .mockReturnValue(params.stream),
        })

        const args = {
          file: fileMock,
        }
        const reader = new FileContentReader(args)

        const actual = await reader.concatenateChunks({
          stream: params.stream,
        })

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('should handle stream errors during concatenation', () => {
      const alphaStreamMock = {
        on: jest.fn((event, callback) => {
          if (event === 'error') {
            // @ts-expect-error
            callback(new Error('Alpha stream error'))
          }

          return alphaStreamMock
        }),
      }
      const betaStreamMock = {
        on: jest.fn((event, callback) => {
          if (event === 'error') {
            // @ts-expect-error
            callback(new Error('Beta stream error'))
          }

          return betaStreamMock
        }),
      }

      /**
       * @type {Array<{
       *   params: {
       *     stream: import('stream').Readable
       *   }
       *   expected: string
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            stream: alphaStreamMock,
          },
          expected: 'Alpha stream error',
        },
        {
          params: {
            stream: betaStreamMock,
          },
          expected: 'Beta stream error',
        },
      ])

      test.each(cases)('stream: $params.stream', async ({ params, expected }) => {
        /** @type {import('graphql-upload/processRequest.mjs').FileUpload} */
        const fileMock = /** @type {*} */ ({
          createReadStream: jest.fn()
            .mockReturnValue(params.stream),
        })

        const args = {
          file: fileMock,
        }
        const reader = new FileContentReader(args)

        await expect(reader.concatenateChunks({
          stream: params.stream,
        }))
          .rejects
          .toThrow(expected)
      })
    })
  })
})

describe('FileContentReader', () => {
  describe('#get:filename', () => {
    describe('should return #file.filename', () => {
      /**
       * @type {Array<{
       *   params: {
       *     file: import('graphql-upload/processRequest.mjs').FileUpload
       *   }
       *   expected: string
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            file: {
              filename: 'alpha.png',
              mimetype: 'image/png',
              encoding: '7bit',
            },
          },
          expected: 'alpha.png',
        },
        {
          params: {
            file: {
              filename: 'beta.jpg',
              mimetype: 'image/jpeg',
              encoding: '7bit',
            },
          },
          expected: 'beta.jpg',
        },
      ])

      test.each(cases)('file: $params.file', ({ params, expected }) => {
        const args = {
          file: params.file,
        }
        const reader = new FileContentReader(args)

        const actual = reader.filename

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('should return null when #file is not set', () => {
      const cases = [
        {
          params: {
            file: undefined,
          },
        },
        {
          params: {
            // file: undefined,
          },
        },
      ]

      test.each(cases)('file: $params.file', ({ params }) => {
        const args = {
          file: params.file,
        }
        const reader = new FileContentReader(args)

        const actual = reader.filename

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('FileContentReader', () => {
  describe('#get:mimetype', () => {
    describe('should return #file.mimetype', () => {
      /**
       * @type {Array<{
       *   params: {
       *     file: import('graphql-upload/processRequest.mjs').FileUpload
       *   }
       *   expected: string
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            file: {
              filename: 'alpha.png',
              mimetype: 'image/png',
              encoding: '7bit',
            },
          },
          expected: 'image/png',
        },
        {
          params: {
            file: {
              filename: 'beta.jpg',
              mimetype: 'image/jpeg',
              encoding: '7bit',
            },
          },
          expected: 'image/jpeg',
        },
      ])

      test.each(cases)('file: $params.file', ({ params, expected }) => {
        const args = {
          file: params.file,
        }
        const reader = new FileContentReader(args)

        const actual = reader.mimetype

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('should return null when #file is not set', () => {
      const cases = [
        {
          params: {
            file: undefined,
          },
        },
        {
          params: {
            // file: undefined,
          },
        },
      ]

      test.each(cases)('file: $params.file', ({ params }) => {
        const args = {
          file: params.file,
        }
        const reader = new FileContentReader(args)

        const actual = reader.mimetype

        expect(actual)
          .toBeNull()
      })
    })
  })
})
