/**
 * Topic queue.
 *
 * Holds the topics an async iterator has received and not yet handed out.
 * A topic is a pair of a channel and a message.
 */
export default class TopicQueue {
  /**
   * Constructor.
   *
   * @param {{
   *   topics: Array<{
   *     channel: string
   *     message: string
   *   }>
   * }} params - Parameters of this constructor.
   */
  constructor ({
    topics,
  }) {
    this.topics = topics
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof TopicQueue ? X : never} T, X
   * @param {{
   *   topics?: Array<{
   *     channel: string
   *     message: string
   *   }>
   * }} [params] - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    topics = [],
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        topics,
      })
    )
  }

  /**
   * Enqueue a topic at the tail.
   *
   * @param {{
   *   channel: string
   *   message: string
   * }} params - Parameters of this method.
   * @returns {this} - For method chaining.
   */
  enqueue ({
    channel,
    message,
  }) {
    this.topics.push({
      channel,
      message,
    })

    return this
  }

  /**
   * Dequeue the topic at the head.
   *
   * @returns {{
   *   channel: string
   *   message: string
   * } | null} - Topic at the head, or null when no topic is held.
   */
  dequeue () {
    return this.topics.shift()
      ?? null
  }

  /**
   * Check if no topic is held.
   *
   * @returns {boolean} - true: empty, false: not empty.
   */
  isEmpty () {
    return this.topics.length === 0
  }

  /**
   * Check if any topic is held.
   *
   * @returns {boolean} - true: held, false: not held.
   */
  hasTopic () {
    return !this.isEmpty()
  }
}
