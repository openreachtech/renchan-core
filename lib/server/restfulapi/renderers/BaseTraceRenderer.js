import BaseRenderer from './BaseRenderer.js'

/**
 * Base RESTful API Renderer for TRACE method.
 *
 * @template {RestfulApiType.RenderRequestQuery} Q - Request Query.
 * @abstract
 * @extends {BaseRenderer<null, Q>}
 */
export default class BaseTraceRenderer extends BaseRenderer {
  /**
   * get: HTTP method.
   *
   * @override
   * @returns {ExpressType.HttpMethod} - HTTP method.
   */
  static get method () {
    return 'trace'
  }
}
