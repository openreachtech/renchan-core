/**
 * Base class for creating GraphQL errors.
 */
export default class ValueTemplateHydrator {
  /**
   * Constructor.
   *
   * @param {ValueTemplateHydratorParams} params - Parameters.
   */
  constructor ({
    template,
    delimiter,
  }) {
    this.template = template
    this.delimiter = delimiter
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof ValueTemplateHydrator ? X : never} T, X
   * @param {ValueTemplateHydratorFactoryParams} params - Parameters.
   * @returns {InstanceType<T>} - Instance of this class.
   * @this {T}
   */
  static create ({
    template,
    delimiter = '$',
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        template,
        delimiter,
      })
    )
  }

  /**
   * Generate hydrated string.
   *
   * @param {{
   *   valueHash?: object
   * }} [params] - Parameters.
   * @returns {string} - Error message.
   */
  generateHydratedString ({
    valueHash = {},
  } = {}) {
    const escapedDelimiter = this.delimiter
      .replace(/[.*+?^${}()|[\]\\]/ug, '\\$&')

    const regex = new RegExp(`${escapedDelimiter}(\\w+)\\b`, 'ug')

    return this.template
      .replace(
        regex,
        (_, key) => valueHash[key] ?? ''
      )
  }
}

/**
 * @typedef {{
 *   template: string
 *   delimiter: string
 * }} ValueTemplateHydratorParams
 */

/**
 * @typedef {{
 *   template: string
 *   delimiter?: string
 * }} ValueTemplateHydratorFactoryParams
 */
