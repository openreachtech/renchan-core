import BaseGetRenderer from '../../../../../lib/server/restfulapi/renderers/BaseGetRenderer.js'

import RestfulApiResponse from '../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'

/**
 * Alpha get renderer.
 *
 * @extends {BaseGetRenderer<
 *   AlphaGetRendererInputQuery,
 *   AlphaGetRendererResponse
 * >}
 */
export default class AlphaGetRenderer extends BaseGetRenderer {
  /** @override */
  get routePath () {
    return '/haystacks/get/alpha'
  }

  /** @override */
  static get errorStructureHash () {
    return {
      FirstParameterRequired: {
        statusCode: 400,
        errorMessage: 'first parameter is required',
      },
    }
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
   * Render Alpha RESTful API success.
   *
   * @override
   * @param {RestfulApiType.RenderInput<*, *>} input - Input data.
   * @returns {Promise<RestfulApiType.RenderResponse>} - Success response.
   */
  async render ({
    query: {
      first,
      second,
    },
    context, // has now, share.env
    request, // has req, res, next
  }) {
    if (!first) {
      return this.Error.FirstParameterRequired.createAsError()
    }

    const receivedAt = context.now.toISOString()

    const content = {
      receivedAt,
      message: `first: ${first}, second: ${second}`,
    }

    return RestfulApiResponse.create({
      statusCode: 200,
      content,
    })
  }
}

/**
 * @typedef {{
 *   first: string
 *   second: string
 * }} AlphaGetRendererInputQuery
 */

/**
 * @typedef {{
 *   receivedAt: string
 *   message: string
 * }} AlphaGetRendererResponse
 */
