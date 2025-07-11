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
