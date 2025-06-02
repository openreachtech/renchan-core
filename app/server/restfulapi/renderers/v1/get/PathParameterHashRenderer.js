import BaseGetRenderer from '../../../../../../lib/server/restfulapi/renderers/BaseGetRenderer.js'

import RestfulApiResponse from '../../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'

/**
 * Alpha external callback success renderer.
 *
 * @extends {BaseGetRenderer<
 *   PathParameterHashRendererInputQuery,
 *   PathParameterHashRendererResponse
 * >}
 */
export default class PathParameterHashRenderer extends BaseGetRenderer {
  /** @override */
  get routePath () {
    return '/path-parameter-hash/:id/:name'
  }

  /** @override */
  static get errorStructureHash () {
    return {}
  }

  /**
   * Passes filter.
   *
   * @override
   * @returns {boolean} - false: filter for visa
   */
  get passesFilter () {
    return true
  }

  /**
   * Render AlphaExternalCallback success.
   *
   * @override
   * @param {RestfulApiType.RenderInput<*, *>} input - Input data.
   * @returns {Promise<RestfulApiResponse>} - Success response.
   */
  async render ({
    query,
    body,
    context, // has now, share.env
    request, // has req, res, next
  }) {
    const id = this.resolveId({
      pathParameterHash: request.pathParameterHash,
    })

    const content = {
      status: 'success',
      pathParams: {
        id,
        name: request.pathParameterHash.name,
      },
    }

    return RestfulApiResponse.create({
      statusCode: 200,
      content,
    })
  }

  /**
   * Resolve ID from request.
   *
   * @param {{
   *   pathParameterHash: ExpressType.Request['params']
   * }} params - Parameters for resolving ID.
   * @returns {number | null} - Resolved ID or null if not found.
   */
  resolveId ({
    pathParameterHash,
  }) {
    try {
      return Number.parseInt(pathParameterHash.id)
    } catch (error) {
      return null
    }
  }
}

/**
 * @typedef {{}} PathParameterHashRendererInputQuery
 */

/**
 * @typedef {{
 *   status: string
 *   pathParams: {
 *     id: number | null
 *     name: string | null
 *   }
 * }} PathParameterHashRendererResponse
 */
