import BaseRequestBodyRenderer from './BaseRequestBodyRenderer.js'

/**
 * Base RESTful API Renderer for PATCH method.
 *
 * @template {RestfulApiType.RenderRequestBody} B - Request Body.
 * @template {RestfulApiType.RenderRequestQuery} Q - Request Query.
 * @abstract
 * @extends {BaseRequestBodyRenderer<B, Q>}
 */
export default class BasePatchRenderer extends BaseRequestBodyRenderer {
  /**
   * get: HTTP method.
   *
   * @override
   * @returns {ExpressType.HttpMethod} - HTTP method.
   */
  static get method () {
    return 'patch'
  }
}
