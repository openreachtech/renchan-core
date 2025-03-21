import BaseResolver from './BaseResolver.js'
import FileContentReader from '../../../tools/FileContentReader.js'

/**
 * Base graphql resolver for Query.
 *
 * @abstract
 */
export default class BaseMutationResolver extends BaseResolver {
  /** @override */
  static get operation () {
    return 'Mutation'
  }

  /**
   * Create an instance of FileContentReader as async.
   *
   * @param {{
   *   upload: import('graphql-upload/Upload.mjs').default
   * }} params - Parameters.
   * @returns {Promise<FileContentReader>} - An instance of FileContentReader.
   */
  static async createAsyncFileContentReader ({
    upload,
  }) {
    return FileContentReader.createAsync({
      upload,
    })
  }
}
