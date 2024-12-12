/**
 * Channel generator.
 */
export default class ChannelGenerator {
  /**
   * Constructor.
   *
   * @param {ChannelGeneratorParams} params - Parameters of this constructor.
   */
  constructor ({
    prefix,
  }) {
    this.prefix = prefix
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof ChannelGenerator ? X : never} T, X
   * @param {ChannelGeneratorFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    prefix,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        prefix,
      })
    )
  }

  /**
   * Generate channel.
   *
   * @param {{
   *   query?: Record<string, string | number>
   * }} [params] - Parameter.
   * @returns {string | null} - Channel.
   */
  generateChannel ({
    query = {},
  } = {}) {
    const values = Object.values(query)

    const hasIrregularValue = values
      .some(value =>
        typeof value !== 'string'
        && typeof value !== 'number'
      )
    if (hasIrregularValue) {
      return null
    }

    const appended = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    return [
      this.prefix,
      appended,
    ]
      .filter(it => it)
      .join('?')
  }
}

/**
 * @typedef {{
 *   prefix: string
 * }} ChannelGeneratorParams
 */

/**
 * @typedef {ChannelGeneratorParams} ChannelGeneratorFactoryParams
 */
