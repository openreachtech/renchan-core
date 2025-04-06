import {
  setTimeout as sleep,
} from 'timers/promises'

import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

/**
 * Upload image mutation resolver.
 */
export default class UploadImageMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'uploadImage'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,
    }
  }

  /** @override */
  async resolve ({
    variables: {
      input: {
        image,
      },
    },
  }) {
    await sleep(300)

    const contentReader = await this.Ctor
      .createAsyncFileContentReader({
        upload: image,
      })

    return this.formatResponse({
      contentReader,
    })
  }

  /**
   * Format response.
   *
   * @param {{
   *   contentReader: GraphqlType.FileContentReader
   * }} params - Parameters.
   * @returns {{
   *   filename: string
   *   mimetype: string
   *   encoding: string
   * }} - Response.
   */
  formatResponse ({
    contentReader,
  }) {
    return {
      filename: contentReader.filename,
      mimetype: contentReader.mimetype,
      encoding: contentReader.encoding,
    }
  }
}
