import {
  setTimeout as sleep,
} from 'timers/promises'

import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

/**
 * Upload array images mutation resolver.
 *
 * @extends {BaseMutationResolver}
 */
export default class UploadArrayImagesMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'uploadArrayImages'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,
    }
  }

  /**
   * Resolve.
   *
   * @param {{
   *   variables: {
   *     input: {
   *       images: Array<import('graphql-upload/Upload.mjs').default>
   *     }
   *   }
   * }} params - Parameters.
   * @returns {Promise<Array<{
   *   filename: string
   *   mimetype: string
   *   encoding: string
   * }>>} - Response.
   */
  async resolve ({
    variables: {
      input: {
        images,
      },
    },
  }) {
    await sleep(300)

    /** @type {Array<import('../../../../../../../lib/tools/FileContentReader.js').default>} */
    const contentReaders = /** @type {Array<*>} */ (
      await Promise.all(
        images.map(
          it =>
            this.Ctor.createAsyncFileContentReader({
              upload: it,
            })
        )
      )
    )

    return this.formatResponse({
      contentReaders,
    })
  }

  /**
   * Format response.
   *
   * @param {{
   *   contentReaders: Array<import('../../../../../../../lib/tools/FileContentReader.js').default>
   * }} params - Parameters.
   * @returns {Array<{
   *   filename: string
   *   mimetype: string
   *   encoding: string
   * }>} - Response.
   */
  formatResponse ({
    contentReaders,
  }) {
    return contentReaders.map(
      it => ({
        filename: it.filename,
        mimetype: it.mimetype,
        encoding: it.encoding,
      })
    )
  }
}
