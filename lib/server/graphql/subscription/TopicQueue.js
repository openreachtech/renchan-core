import TopicParcel from './TopicParcel.js'

/**
 * Topic queue.
 *
 * Holds the topic parcels an async iterator has received and not yet handed out.
 * A topic parcel which is not available is never held.
 */
export default class TopicQueue {
  /**
   * Constructor.
   *
   * @param {{
   *   topics: Array<TopicParcel>
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
   *   topics?: Array<TopicParcel>
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
   * get: TopicParcel constructor.
   *
   * @returns {typeof TopicParcel} - TopicParcel constructor.
   */
  static get TopicParcelCtor () {
    return TopicParcel
  }

  /**
   * Create a topic parcel.
   *
   * @param {{
   *   channel: string
   *   message: string
   * }} params - Parameters of this method.
   * @returns {TopicParcel} - Topic parcel.
   */
  static createTopicParcel ({
    channel,
    message,
  }) {
    return this.TopicParcelCtor.create({
      channel,
      message,
    })
  }

  /**
   * get: Ctor of this instance.
   *
   * @returns {typeof TopicQueue} - Constructor.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * Enqueue a topic at the tail, as a topic parcel, unless the topic parcel is not available.
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
    const parcel = this.Ctor.createTopicParcel({
      channel,
      message,
    })

    if (parcel.isAvailable()) {
      this.topics.push(parcel)
    }

    return this
  }

  /**
   * Dequeue the topic parcel at the head.
   *
   * @returns {TopicParcel | null} - Topic parcel at the head, or null when no topic parcel is held.
   */
  dequeue () {
    return this.topics.shift()
      ?? null
  }

  /**
   * Check if no topic parcel is held.
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
