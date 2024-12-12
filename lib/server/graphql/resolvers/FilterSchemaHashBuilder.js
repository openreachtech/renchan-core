/**
 * Schema hash builder.
 */
export default class FilterSchemaHashBuilder {
  /**
   * Constructor.
   *
   * @param {FilterSchemaHashBuilderParams} params - Parameters of this constructor.
   */
  constructor ({
    allowedSchemas,
    ignoredSchemas,
  }) {
    this.allowedSchemas = allowedSchemas
    this.ignoredSchemas = ignoredSchemas
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof FilterSchemaHashBuilder ? X : never} T, X
   * @param {FilterSchemaHashBuilderFactoryParams} [params] - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    allowedSchemas = null,
    ignoredSchemas = null,
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        allowedSchemas,
        ignoredSchemas,
      })
    )
  }

  /**
   * Build schema hash.
   *
   * @template V
   * @param {{
   *   sharedValue: V
   * }} params - Parameters.
   * @returns {Record<string, V | null>} - Accepted schemas.
   */
  buildSchemaHash ({
    sharedValue,
  }) {
    const allowedEntries = this.allowedSchemas
      .filter(
        it =>
          !this.ignoredSchemas?.includes(it)
      )
      .map(it => [
        it,
        sharedValue,
      ])
    const ignoredEntries = this.ignoredSchemas
      .map(it => [
        it,
        null,
      ])

    return Object.fromEntries([
      ...allowedEntries,
      ...ignoredEntries,
    ])
  }
}

/**
 * @typedef {GraphqlType.Engine.skipSchemaHash} FilterSchemaHashBuilderParams
 */

/**
 * @typedef {FilterSchemaHashBuilderParams} FilterSchemaHashBuilderFactoryParams
 */
