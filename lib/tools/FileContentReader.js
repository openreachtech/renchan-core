/**
 * File content reader.
 *
 * @property {import('graphql-upload/processRequest.mjs').FileUpload} file - File to read.
 */
export default class FileContentReader {
  /**
   * Constructor.
   *
   * @param {FileContentReaderParams} options - Parameters of this constructor.
   */
  constructor ({
    file,
  }) {
    this.file = file
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof FileContentReader ? X : never} T, X
   * @param {FileContentReaderFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    file,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        file,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof FileContentReader ? X : never} T, X
   * @param {FileContentReaderAsyncFactoryParams} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    upload,
  }) {
    await upload.promise

    return /** @type {InstanceType<T>} */ (
      this.create({
        file: upload.file,
      })
    )
  }

  /**
   * Read file content.
   *
   * @returns {Promise<Buffer | null>} File content.
   */
  async readContent () {
    if (!this.file) {
      return null
    }

    const stream = this.file.createReadStream()

    return this.concatenateChunks({
      stream,
    })
  }

  /**
   * Concatenate chunks.
   *
   * @param {{
   *   stream: import('stream').Readable
   * }} params - Parameters.
   * @returns {Promise<Buffer>} - Concatenated chunks.
   */
  async concatenateChunks ({
    stream,
  }) {
    const accumulator = []

    return new Promise((resolve, reject) => {
      stream
        .on('data', chunk =>
          accumulator.push(chunk)
        )
        .on('end', () =>
          resolve(Buffer.concat(accumulator))
        )
        .on('error', reject)
    })
  }

  /**
   * get: file name.
   *
   * @returns {string | null} - File name.
   */
  get filename () {
    return this.file?.filename
      ?? null
  }
}

/**
 * @typedef {{
 *   file: import('graphql-upload/processRequest.mjs').FileUpload
 * }} FileContentReaderParams
 */

// export interface FileUpload {
//     filename: string;
//     mimetype: string;
//     encoding: string;
//     // We omit the capacitor property because it's a private implementation detail that shouldn't be used outside.
//     createReadStream: FileUploadCreateReadStream;
// }

/**
 * @typedef {FileContentReaderParams} FileContentReaderFactoryParams
 */

/**
 * @typedef {{
 *   upload: import('graphql-upload/Upload.mjs').default
 * }} FileContentReaderAsyncFactoryParams
 */

// import Upload from 'graphql-upload/Upload.mjs'
//
// export default class Upload {
//   promise: Promise<FileUpload>;
//   resolve: (file: FileUpload) => void;
//   file: FileUpload | undefined;
//   reject: (reason?: any) => void;
// }
