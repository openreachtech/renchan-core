import BaseRenderer from './BaseRenderer.js'

/**
 * Base RESTful API Renderer for OPTIONS method.
 *
 * @template {RestfulApiType.RenderRequestQuery} Q - Request Query.
 * @abstract
 * @extends {BaseRenderer<null, Q>}
 */
export default class BaseOptionsRenderer extends BaseRenderer {
  /**
   * get: HTTP method.
   *
   * @override
   * @returns {ExpressType.HttpMethod} - HTTP method.
   */
  static get method () {
    return 'options'
  }
}
