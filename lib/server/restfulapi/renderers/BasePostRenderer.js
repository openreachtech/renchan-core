import BaseRequestBodyRenderer from './BaseRequestBodyRenderer.js'

/**
 * Base RESTful API Renderer for GET method.
 *
 * @template {RestfulApiType.RenderRequestBody} B - POST Body.
 * @template {RestfulApiType.RenderRequestQuery} Q - GET Query.
 * @abstract
 * @extends {BaseRequestBodyRenderer<B, Q>}
 */
export default class BasePostRenderer extends BaseRequestBodyRenderer {
  /**
   * get: HTTP method.
   *
   * @override
   * @returns {ExpressType.HttpMethod} - HTTP method.
   */
  static get method () {
    return 'post'
  }
}
