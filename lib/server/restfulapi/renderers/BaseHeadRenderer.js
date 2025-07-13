import BaseRenderer from './BaseRenderer.js'

/**
 * Base RESTful API Renderer for HEAD method.
 *
 * @template {RestfulApiType.RenderRequestQuery} Q - Request Query.
 * @abstract
 * @extends {BaseRenderer<null, Q>}
 */
export default class BaseHeadRenderer extends BaseRenderer {
  /**
   * get: HTTP method.
   *
   * @override
   * @returns {ExpressType.HttpMethod} - HTTP method.
   */
  static get method () {
    return 'head'
  }
}
