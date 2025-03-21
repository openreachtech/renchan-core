import {
  setTimeout as sleep,
} from 'timers/promises'

import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

/**
 * Upload array images mutation resolver.
 *
 * @extends {BaseMutationResolver}
 */
export default class UploadDeepPropertyImagesMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'uploadDeepPropertyImages'
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
   *       profile: {
   *         nickname: string
   *         bio: string
   *         avatarImage: import('graphql-upload/Upload.mjs').default
   *       }
   *       config: {
   *         themeColor: string
   *         coverImage: import('graphql-upload/Upload.mjs').default
   *       }
   *     }
   *   }
   * }} params - Parameters.
   * @returns {Promise<{
   *   avatarImage: {
   *     filename: string
   *     mimetype: string
   *     encoding: string
   *   }
   *   coverImage: {
   *     filename: string
   *     mimetype: string
   *     encoding: string
   *   }
   * }>} - Response.
   */
  async resolve ({
    variables: {
      input: {
        profile: {
          nickname,
          bio,
          avatarImage,
        },
        config: {
          themeColor,
          coverImage,
        },
      },
    },
  }) {
    await sleep(300)

    /** @type {import('../../../../../../../lib/tools/FileContentReader.js').default} */
    const avatarImageContentReader = avatarImage
      ? await this.Ctor
        .createAsyncFileContentReader({
          upload: avatarImage,
        })
      : null

    /** @type {import('../../../../../../../lib/tools/FileContentReader.js').default} */
    const coverImageContentReader = coverImage
      ? await this.Ctor
        .createAsyncFileContentReader({
          upload: coverImage,
        })
      : null

    return this.formatResponse({
      avatarImageContentReader,
      coverImageContentReader,
    })
  }

  /**
   * Format response.
   *
   * @param {{
   *   avatarImageContentReader: import('../../../../../../../lib/tools/FileContentReader.js').default | null
   *   coverImageContentReader: import('../../../../../../../lib/tools/FileContentReader.js').default | null
   * }} params - Parameters.
   * @returns {{
   *   avatarImage: {
   *     filename: string
   *     mimetype: string
   *     encoding: string
   *   }
   *   coverImage: {
   *     filename: string
   *     mimetype: string
   *     encoding: string
   *   }
   * }} - Response.
   */
  formatResponse ({
    avatarImageContentReader,
    coverImageContentReader,
  }) {
    return {
      avatarImage: {
        filename: avatarImageContentReader?.filename,
        mimetype: avatarImageContentReader?.mimetype,
        encoding: avatarImageContentReader?.encoding,
      },
      coverImage: {
        filename: coverImageContentReader?.filename,
        mimetype: coverImageContentReader?.mimetype,
        encoding: coverImageContentReader?.encoding,
      },
    }
  }
}
