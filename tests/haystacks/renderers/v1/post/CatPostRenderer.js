import BasePostRenderer from '../../../../../lib/server/restfulapi/renderers/BasePostRenderer.js'

import RestfulApiResponse from '../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'

/**
 * Gamma post renderer.
 *
 * @extends {BasePostRenderer<
 *   CatPostRendererInputBody,
 *   CatPostRendererInputQuery
 * >}
 */
export default class CatPostRenderer extends BasePostRenderer {
  /** @override */
  get routePath () {
    return '/haystacks/post/cat'
  }

  /** @override */
  static get errorStructureHash () {
    return {
      PetTagRequired: {
        statusCode: 400,
        errorMessage: 'petTag is required',
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
   * Render Cat RESTful API success.
   *
   * @override
   * @param {RestfulApiType.RenderInput<*, *>} input - Input data.
   * @returns {Promise<RestfulApiType.RenderResponse>} - Success response.
   */
  async render ({
    body: {
      petTag,
    },
    query: {
      checksum,
    },
    context, // has now, share.env
    request, // has req, res, next
  }) {
    if (!petTag) {
      return this.Error.PetTagRequired.createAsError()
    }

    const receivedAt = context.now.toISOString()

    const content = {
      receivedAt,
      message: `petTag: ${petTag}, checksum: ${checksum}`,
    }

    return RestfulApiResponse.create({
      content,
    })
  }
}

/**
 * @typedef {{
 *   petTag: string
 * }} CatPostRendererInputBody
 */

/**
 * @typedef {{
 *   checksum: string
 * }} CatPostRendererInputQuery
 */

/**
 * @typedef {{
 *   receivedAt: string
 *   message: string
 * }} CatPostRendererResponse
 */
