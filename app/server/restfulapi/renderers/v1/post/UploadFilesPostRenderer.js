import BasePostRenderer from '../../../../../../lib/server/restfulapi/renderers/BasePostRenderer.js'

import RestfulApiResponse from '../../../../../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'

/**
 * BetaExternalCallback success renderer.
 *
 * @extends {BasePostRenderer<UploadFilesPostRendererInputBody>}
 * @example
 * ```shell
 * curl -X POST \
 *   -F "first=First value" \
 *   -F "second=Second value" \
 *   -F "avatar=@app/haystacks/images/blue-circle.svg" \
 *   -F "images=@app/haystacks/images/green-checker.svg" \
 *   -F "images=@app/haystacks/images/red-square.svg" \
 *   -F "images=@app/haystacks/images/yellow-stripes.svg" \
 *   http://localhost:8001/v1/upload-files
 * ```
 */
export default class UploadFilesPostRenderer extends BasePostRenderer {
  /** @override */
  get routePath () {
    return '/upload-files'
  }

  /** @override */
  static get errorStructureHash () {
    return {}
  }

  /** @override */
  static get fileFieldsConfigHash () {
    return {
      avatar: 1, // max 1 file
      images: 3, // max 3 files
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
   * @param {RestfulApiType.RenderInput<UploadFilesPostRendererInputBody, *>} input - Input data.
   * @returns {Promise<RestfulApiType.RenderResponse>} - Success response.
   */
  async render ({
    query,
    body,
    context, // has now, share.env
    request, // has req, res, next
  }) {
    const avatar = body.avatar.at(0)
      ?? /** @type {Express.Multer.File} */ ({})
    const avatarFile = {
      filename: avatar.originalname ?? null,
      mimetype: avatar.mimetype ?? null,
      size: avatar.size ?? null,
    }

    const imageFiles = body.images
      .map(it => ({
        filename: it.originalname,
        mimetype: it.mimetype,
        size: it.size,
      }))

    const content = {
      status: 'success',
      message: 'I am version 1.0.0 of UploadFiles (^_^)',
      receivedValues: {
        body: {
          first: body.first,
          second: body.second,
          avatar: avatarFile,
          images: imageFiles,
        },
      },
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
 *   avatar: Array<Express.Multer.File>
 *   images: Array<Express.Multer.File>
 * }} UploadFilesPostRendererInputBody
 */

/**
 * @typedef {{
 *   status: string
 *   message: string
 *   receivedValues: {
 *     body: {
 *       first: string
 *       second: string
 *       avatar: Express.Multer.File
 *       images: Array<Express.Multer.File>
 *     }
 *   }
 * }} UploadFilesPostRendererResponse
 */
