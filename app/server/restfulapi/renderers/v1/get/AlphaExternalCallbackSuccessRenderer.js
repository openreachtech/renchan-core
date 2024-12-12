import BaseGetRenderer from '../../../../../../lib/server/restfulapi/renderers/BaseGetRenderer.js'

import RestfulApiResponse from '../../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'

/**
 * Alpha external callback success renderer.
 *
 * @extends {BaseGetRenderer<
 *   AlphaExternalCallbackSuccessRendererInputQuery,
 *   AlphaExternalCallbackSuccessRendererResponse
 * >}
 */
export default class AlphaExternalCallbackSuccessRenderer extends BaseGetRenderer {
  /** @override */
  get routePath () {
    return '/alpha-external-callback/success'
  }

  /** @override */
  static get errorStructureHash () {
    return {
      AlphaRequired: {
        statusCode: 400,
        errorMessage: 'alpha is required',
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
   * Render AlphaExternalCallback success.
   *
   * @override
   * @param {RestfulApiType.RenderInput<*, *>} input - Input data.
   * @returns {Promise<RestfulApiResponse>} - Success response.
   */
  async render ({
    query: {
      alpha,
      beta,
    },
    context, // has now, share.env
    request, // has req, res, next
  }) {
    if (!alpha) {
      return this.Error.AlphaRequired.createAsError()
    }

    const content = {
      status: 'success',
      message: 'I am version 1.0.0 of AlphaExternalCallback (^_^)',
      receivedValues: [
        {
          alpha,
          beta,
        },
        context.now.toISOString(),
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
 *   alpha: string
 *   beta: string
 * }} AlphaExternalCallbackSuccessRendererInputQuery
 */

/**
 * @typedef {{
 *   status: string
 *   message: string
 *   receivedValues: Array<*>
 * }} AlphaExternalCallbackSuccessRendererResponse
 */
