import multer from 'multer'

import BasePostRenderer from '../../../../../lib/server/restfulapi/renderers/BasePostRenderer.js'

import BaseRenderer from '../../../../../lib/server/restfulapi/renderers/BaseRenderer.js'

describe('BasePostRenderer', () => {
  describe('super class', () => {
    test('to be BaseRenderer', () => {
      const actual = BasePostRenderer.prototype

      expect(actual)
        .toBeInstanceOf(BaseRenderer)
    })
  })
})

describe('BasePostRenderer', () => {
  describe('.get:method', () => {
    test('to be fixed value', () => {
      const expected = 'post'

      const actual = BasePostRenderer.method

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('BasePostRenderer', () => {
  describe('.buildPreExpressHandlers()', () => {
    test('should be an instance of Multer', () => {
      const multerUploaderTally = multer()
      const handlerTally = () => {}

      const expected = [
        handlerTally,
      ]

      const createMulterUploaderSpy = jest.spyOn(BasePostRenderer, 'createMulterUploader')
        .mockReturnValue(multerUploaderTally)
      const buildPreExpressHandlersSpy = jest.spyOn(BaseRenderer, 'buildPreExpressHandlers')

      const noneSpy = jest.spyOn(multerUploaderTally, 'none')
        .mockReturnValue(handlerTally)

      const actual = BasePostRenderer.buildPreExpressHandlers()

      expect(actual)
        .toEqual(expected)

      expect(createMulterUploaderSpy)
        .toHaveBeenCalledWith()
      expect(buildPreExpressHandlersSpy)
        .toHaveBeenCalledWith()
      expect(noneSpy)
        .toHaveBeenCalledWith()
    })
  })
})

describe('BasePostRenderer', () => {
  describe('.defineMulterUploaderMiddleware()', () => {
    describe('should be return value of Multer#fields()', () => {
      const cases = [
        {
          input: {
            fileFieldsConfigHash: {
              alpha: 1,
            },
          },
          expected: {
            fieldsArgs: [
              { name: 'alpha', maxCount: 1 },
            ],
          },
        },
      ]

      test.each(cases)('with $input.fileFieldsConfigHash', ({ input, expected }) => {
        const multerUploaderTally = multer()
        const noneHandlerTally = () => {}
        const fieldsHandlerTally = () => {}

        const createMulterUploaderSpy = jest.spyOn(BasePostRenderer, 'createMulterUploader')
          .mockReturnValue(multerUploaderTally)

        jest.spyOn(BasePostRenderer, 'fileFieldsConfigHash', 'get')
          .mockReturnValue(input.fileFieldsConfigHash)

        const noneSpy = jest.spyOn(multerUploaderTally, 'none')
          .mockReturnValue(noneHandlerTally)
        const fieldsSpy = jest.spyOn(multerUploaderTally, 'fields')
          .mockReturnValue(fieldsHandlerTally)

        const actual = BasePostRenderer.defineMulterUploaderMiddleware()

        expect(actual)
          .toBe(fieldsHandlerTally) // same reference

        expect(createMulterUploaderSpy)
          .toHaveBeenCalledWith()

        expect(noneSpy)
          .not
          .toHaveBeenCalledWith()
        expect(fieldsSpy)
          .toHaveBeenCalledWith(expected.fieldsArgs)
      })
    })

    describe('should be return value of Multer#none()', () => {
      const cases = [
        {
          input: {
            fileFieldsConfigHash: {},
          },
        },
      ]

      test.each(cases)('with $input.fileFieldsConfigHash', ({ input }) => {
        const multerUploaderTally = multer()
        const noneHandlerTally = () => {}
        const fieldsHandlerTally = () => {}

        const createMulterUploaderSpy = jest.spyOn(BasePostRenderer, 'createMulterUploader')
          .mockReturnValue(multerUploaderTally)

        jest.spyOn(BasePostRenderer, 'fileFieldsConfigHash', 'get')
          .mockReturnValue(input.fileFieldsConfigHash)

        const noneSpy = jest.spyOn(multerUploaderTally, 'none')
          .mockReturnValue(noneHandlerTally)
        const fieldsSpy = jest.spyOn(multerUploaderTally, 'fields')
          .mockReturnValue(fieldsHandlerTally)

        const actual = BasePostRenderer.defineMulterUploaderMiddleware()

        expect(actual)
          .toBe(noneHandlerTally) // same reference

        expect(createMulterUploaderSpy)
          .toHaveBeenCalledWith()

        expect(noneSpy)
          .toHaveBeenCalledWith()
        expect(fieldsSpy)
          .not
          .toHaveBeenCalled()
      })
    })
  })
})

describe('BasePostRenderer', () => {
  describe('.createMulterUploader()', () => {
    test('should be an instance of Multer', () => {
      const multerUploaderTally = multer()

      /** @type {typeof multer} */
      const multerSpy = /** @type {*} */ (
        jest.fn()
          .mockReturnValue(multerUploaderTally)
      )

      jest.spyOn(BasePostRenderer, 'multer', 'get')
        .mockReturnValue(multerSpy)

      const actual = BasePostRenderer.createMulterUploader()

      expect(actual)
        .toBe(multerUploaderTally) // same reference

      expect(multerSpy)
        .toHaveBeenCalledWith()
    })
  })
})

describe('BasePostRenderer', () => {
  describe('.get:multer', () => {
    test('to be fixed value', () => {
      const expected = multer

      const actual = BasePostRenderer.multer

      expect(actual)
        .toBe(expected) // same reference
    })
  })
})

describe('BasePostRenderer', () => {
  describe('.buildMulterUploaderFieldsInput()', () => {
    describe('should return array of config', () => {
      const cases = [
        {
          input: {
            fileFieldsConfigHash: {
              alpha: 1,
            },
          },
          expected: [
            { name: 'alpha', maxCount: 1 },
          ],
        },
        {
          input: {
            fileFieldsConfigHash: {
              avatar: 1,
              gallery: 8,
            },
          },
          expected: [
            { name: 'avatar', maxCount: 1 },
            { name: 'gallery', maxCount: 8 },
          ],
        },
      ]

      test.each(cases)('with $input.fileFieldsConfigHash', ({ input, expected }) => {
        jest.spyOn(BasePostRenderer, 'fileFieldsConfigHash', 'get')
          .mockReturnValue(input.fileFieldsConfigHash)

        const actual = BasePostRenderer.buildMulterUploaderFieldsInput()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('should return empty array', () => {
      test('with default definition of .get:fileFieldsConfigHash', () => {
        const expected = []

        const actual = BasePostRenderer.buildMulterUploaderFieldsInput()

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('BasePostRenderer', () => {
  describe('.get:fileFieldsConfigHash', () => {
    test('to be fixed value', () => {
      const expected = {}

      const actual = BasePostRenderer.fileFieldsConfigHash

      expect(actual)
        .toEqual(expected)
    })
  })
})
