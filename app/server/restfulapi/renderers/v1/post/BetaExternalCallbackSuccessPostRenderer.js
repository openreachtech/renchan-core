import BasePostRenderer from '../../../../../../lib/server/restfulapi/renderers/BasePostRenderer.js'

import RestfulApiResponse from '../../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'

/**
 * BetaExternalCallback success renderer.
 *
 * @extends {BasePostRenderer<
 *   BetaExternalCallbackSuccessPostRendererInputBody
 * >}
 */
export default class BetaExternalCallbackSuccessPostRenderer extends BasePostRenderer {
  /** @override */
  get routePath () {
    return '/beta-external-callback/success'
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
   * Render BetaExternalCallback success.
   *
   * @override
   * @param {RestfulApiType.RenderInput<BetaExternalCallbackSuccessPostRendererInputBody, *>} input - Input data.
   * @returns {Promise<RestfulApiType.RenderResponse>} - Success response.
   */
  async render ({
    query,
    body,
    context, // has now, share.env
    request, // has req, res, next
  }) {
    const content = {
      status: 'success',
      message: 'I am version 1.0.0 of BetaExternalCallback (^_^)',
      receivedValues: [
        body.first,
        body.second,
      ],
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
 * }} BetaExternalCallbackSuccessPostRendererInputBody
 */

/**
 * @typedef {{
 *   status: string
 *   message: string
 *   receivedValues: Array<*>
 * }} BetaExternalCallbackSuccessPostRendererResponse
 */
