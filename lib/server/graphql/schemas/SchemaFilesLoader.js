import {
  promises as fs,
} from 'fs'

import path from 'path'

/**
 * Schema files loader.
 */
export default class SchemaFilesLoader {
  /**
   * Constructor.
   *
   * @param {SchemaFilesLoaderParams} params - Parameters of this constructor.
   */
  constructor ({
    schemaPath,
  }) {
    this.schemaPath = schemaPath
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof SchemaFilesLoader ? X : never} T, X
   * @param {SchemaFilesLoaderFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    schemaPath,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        schemaPath,
      })
    )
  }

  /**
   * Load schema files.
   *
   * @returns {Promise<string>} - Schema files.
   */
  async loadIntegratedSchema () {
    const stat = await fs.stat(this.schemaPath)

    if (stat.isFile()) {
      return fs.readFile(this.schemaPath, 'utf-8')
    }

    return this.loadWithSchemasPath()
  }

  /**
   * Load schema files.
   *
   * @returns {Promise<string>} - Schema files.
   */
  async loadWithSchemasPath () {
    const files = await fs.readdir(this.schemaPath)

    const contents = await Promise.all(
      files.map(async it => [
        [
          '##',
          '##',
          `## ${it}`,
          '##',
          '##',
          '\n',
        ]
          .join('\n'),
        await fs.readFile(
          path.join(this.schemaPath, it),
          'utf-8'
        ),
        '\n',
      ])
    )

    return contents
      .flat()
      .join('\n')
  }
}

/**
 * @typedef {{
 *   schemaPath: string
 * }} SchemaFilesLoaderParams
 */

/**
 * @typedef {SchemaFilesLoaderParams} SchemaFilesLoaderFactoryParams
 */
