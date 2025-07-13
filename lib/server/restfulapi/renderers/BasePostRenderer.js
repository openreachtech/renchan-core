import multer from 'multer'

import BaseRenderer from './BaseRenderer.js'

/**
 * Base RESTful API Renderer for GET method.
 *
 * @template {RestfulApiType.RenderRequestBody} B - POST Body.
 * @template {RestfulApiType.RenderRequestQuery} Q - GET Query.
 * @abstract
 * @extends {BaseRenderer<B, Q>}
 */
export default class BasePostRenderer extends BaseRenderer {
  /**
   * get: HTTP method.
   *
   * @override
   * @returns {ExpressType.HttpMethod} - HTTP method.
   */
  static get method () {
    return 'post'
  }

  /**
   * Build pre-Express handlers.
   *
   * @returns {Array<ExpressType.Middleware>} Pre-Express handlers.
   */
  static buildPreExpressHandlers () {
    const multerUploader = this.createMulterUploader()

    return [
      ...super.buildPreExpressHandlers(),

      multerUploader.none(), // for multipart/form-data
    ]
  }

  /**
   * Define Multer uploader Express handler.
   *
   * @returns {ExpressType.Middleware} - Multer uploader handler.
   */
  static defineMulterUploaderMiddleware () {
    const multerUploader = this.createMulterUploader()

    const multerUploaderFieldsInput = this.buildMulterUploaderFieldsInput()

    if (multerUploaderFieldsInput.length === 0) {
      return multerUploader.none() // no file upload
    }

    return multerUploader.fields(multerUploaderFieldsInput)
  }

  /**
   * get: Multer instance.
   *
   * @returns {multer.Multer} - Multer instance.
   */
  static createMulterUploader () {
    return this.multer()
  }

  /**
   * get: Multer instance.
   *
   * @returns {typeof multer} - Multer instance.
   */
  static get multer () {
    return multer
  }

  /**
   * Build Multer uploader fields input.
   *
   * @returns {Array<{
   *   name: string
   *   maxCount: number
   * }>} - Multer uploader fields input.
   */
  static buildMulterUploaderFieldsInput () {
    return Object.entries(this.fileFieldsConfigHash)
      .map(([name, maxCount]) => ({
        name,
        maxCount,
      }))
  }

  /**
   * get: File fields config hash of Multer uploader.
   *
   * @abstract
   * @returns {{
   *   [name: string]: number // maxCount of files for this field.
   * }} - Multer uploader fields config.
   */
  static get fileFieldsConfigHash () {
    return {}
  }
}
