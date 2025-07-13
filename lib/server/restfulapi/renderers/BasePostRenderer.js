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
