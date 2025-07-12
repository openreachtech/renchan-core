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
}
