import BasePostRenderer from '../../../../../lib/server/restfulapi/renderers/BasePostRenderer.js'

import RestfulApiResponse from '../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'

/**
 * Gamma post renderer.
 *
 * @extends {BasePostRenderer<
 *   DogPostRendererInputBody,
 *   DogPostRendererInputQuery
 * >}
 */
export default class DogPostRenderer extends BasePostRenderer {
  /** @override */
  get routePath () {
    return '/haystacks/post/dog'
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
    return true
  }

  /**
   * Render Dog RESTful API success.
   *
   * @override
   * @param {RestfulApiType.RenderInput<*, *>} input - Input data.
   * @returns {Promise<RestfulApiType.RenderResponse>} - Success response.
   */
  async render ({
    query: {
      petTag,
    },
    query: {
      name,
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
      message: `petTag: ${petTag}, name: ${name}`,
    }

    return RestfulApiResponse.create({
      content,
    })
  }
}

/**
 * @typedef {{
 *   petTag: string
 * }} DogPostRendererInputBody
 */

/**
 * @typedef {{
 *   name: string
 * }} DogPostRendererInputQuery
 */

/**
 * @typedef {{
 *   status: string
 *   message: string
 *   receivedValues: Array<*>
 * }} DogPostRendererResponse
 */
