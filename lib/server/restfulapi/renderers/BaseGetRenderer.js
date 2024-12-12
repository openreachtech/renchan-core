import BaseRenderer from './BaseRenderer.js'

/**
 * Base RESTful API Renderer for GET method.
 *
 * @template {RestfulApiType.RenderRequestQuery} Q - GET Query.
 * @abstract
 * @extends {BaseRenderer<null, Q>}
 */
export default class BaseGetRenderer extends BaseRenderer {
  /**
   * get: HTTP method.
   *
   * @override
   * @returns {ExpressType.HttpMethod} - HTTP method.
   */
  static get method () {
    return 'get'
  }
}
