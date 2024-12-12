import BasePostRenderer from '../../../../../../lib/server/restfulapi/renderers/BasePostRenderer.js'

import RestfulApiResponse from '../../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'

/**
 * BetaExternalCallback success renderer.
 *
 * @extends {BasePostRenderer<
 *   BetaExternalCallbackSuccessRendererInputBody,
 *   BetaExternalCallbackSuccessRendererInputQuery
 * >}
 */
export default class BetaExternalCallbackSuccessRenderer extends BasePostRenderer {
  /** @override */
  get routePath () {
    return '/beta-external-callback/success'
  }

  /** @override */
  static get errorStructureHash () {
    return {
      AlphaRequired: {
        statusCode: 400,
        errorMessage: 'first is required',
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
   * Render BetaExternalCallback success.
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
    const content = {
      status: 'success',
      message: 'I am version 1.0.0 of BetaExternalCallback (^_^)',
      receivedValues: [
        first,
        second,
      ],
    }

    return RestfulApiResponse.create({
      content,
    })
  }
}

/**
 * @typedef {{
 *   one: string
 *   two: string
 * }} BetaExternalCallbackSuccessRendererInputBody
 */

/**
 * @typedef {{
 *   alpha: string
 *   beta: string
 * }} BetaExternalCallbackSuccessRendererInputQuery
 */

/**
 * @typedef {{
 *   status: string
 *   message: string
 *   receivedValues: Array<*>
 * }} BetaExternalCallbackSuccessRendererResponse
 */
