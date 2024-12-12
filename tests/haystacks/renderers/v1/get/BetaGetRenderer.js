import BaseGetRenderer from '../../../../../lib/server/restfulapi/renderers/BaseGetRenderer.js'

import RestfulApiResponse from '../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'

/**
 * Beta get renderer.
 *
 * @extends {BaseGetRenderer<
 *   BetaGetRendererInputQuery,
 *   BetaGetRendererResponse
 * >}
 */
export default class BetaGetRenderer extends BaseGetRenderer {
  /** @override */
  get routePath () {
    return '/haystacks/get/beta'
  }

  /** @override */
  static get errorStructureHash () {
    return {
      AllParametersRequired: {
        statusCode: 400,
        errorMessage: 'all parameters are required',
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
    return false
  }

  /**
   * Render Beta RESTful API success.
   *
   * @override
   * @param {RestfulApiType.RenderInput<*, *>} input - Input data.
   * @returns {Promise<RestfulApiType.RenderResponse>} - Success response.
   */
  async render ({
    query: {
      one,
      two,
    },
    context, // has now, share.env
    request, // has req, res, next
  }) {
    if (
      !one
      || !two
    ) {
      return this.Error.AllParametersRequired.createAsError()
    }

    const receivedAt = context.now.toISOString()

    const content = {
      receivedAt,
      message: `one: ${one}, two: ${two}`,
    }

    return RestfulApiResponse.create({
      statusCode: 200,
      content,
    })
  }
}

/**
 * @typedef {{
 *   one: string
 *   two: string
 * }} BetaGetRendererInputQuery
 */

/**
 * @typedef {{
 *   receivedAt: string
 *   message: string
 * }} BetaGetRendererResponse
 */
