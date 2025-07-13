import BaseRenderer from './BaseRenderer.js'

/**
 * Base RESTful API Renderer for DELETE method.
 *
 * @template {RestfulApiType.RenderRequestQuery} Q - Request Query.
 * @abstract
 * @extends {BaseRenderer<null, Q>}
 */
export default class BaseDeleteRenderer extends BaseRenderer {
  /**
   * get: HTTP method.
   *
   * @override
   * @returns {ExpressType.HttpMethod} - HTTP method.
   */
  static get method () {
    return 'delete'
  }
}
