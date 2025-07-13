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
}
