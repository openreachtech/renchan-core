/**
 * Result of one step of a topic async iterator.
 */
export default class TopicIteratorResult {
  /**
   * Constructor.
   *
   * @param {TopicIteratorResultParams} params - Parameters of this constructor.
   */
  constructor ({
    value,
    done,
  }) {
    this.value = value
    this.done = done
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof TopicIteratorResult ? X : never} T, X
   * @param {TopicIteratorResultParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} Instance of this constructor.
   * @this {T}
   * @public
   */
  static create ({
    value,
    done,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        value,
        done,
      })
    )
  }
}

/**
 * @typedef {{
 *   value: *
 *   done: boolean
 * }} TopicIteratorResultParams
 */
