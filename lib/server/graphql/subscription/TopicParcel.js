/**
 * Topic parcel.
 *
 * Holds a topic received from a channel, and inflates its message on demand.
 */
export default class TopicParcel {
  /**
   * Parsed values, keyed by topic parcel.
   *
   * @type {WeakMap<TopicParcel, *>}
   */
  static poolParsedValue = new WeakMap()

  /**
   * Constructor.
   *
   * @param {{
   *   channel: string
   *   message: string
   * }} params - Parameters of this constructor.
   */
  constructor ({
    channel,
    message,
  }) {
    this.channel = channel
    this.message = message
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof TopicParcel ? X : never} T, X
   * @param {{
   *   channel: string
   *   message: string
   * }} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    channel,
    message,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        channel,
        message,
      })
    )
  }

  /**
   * get: Ctor of this instance.
   *
   * @returns {typeof TopicParcel} - Constructor.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * Check if the message is not available, that is, failed to parse or parsed into null.
   *
   * @returns {boolean} - true: not available, false: available.
   */
  hasParsedError () {
    return this.ensureParsedMessage() === null
  }

  /**
   * Check if the message is available, that is, not failed to parse and not parsed into null.
   *
   * @returns {boolean} - true: available, false: not available.
   */
  isAvailable () {
    return !this.hasParsedError()
  }

  /**
   * Ensure the message is parsed.
   *
   * The message is parsed once, at the first call. The result is kept outside of this instance.
   * A message which failed to parse is kept as null.
   *
   * @returns {*} - Parsed message, or null when the message failed to parse.
   */
  ensureParsedMessage () {
    if (this.Ctor.poolParsedValue.has(this)) {
      return this.Ctor.poolParsedValue.get(this)
    }

    const parsedMessage = this.inflateMessage()

    this.Ctor.poolParsedValue.set(this, parsedMessage)

    return parsedMessage
  }

  /**
   * Parse the message.
   *
   * @returns {*} - Parsed message, or null when the message failed to parse.
   */
  inflateMessage () {
    try {
      return JSON.parse(this.message)
    } catch {
      return null
    }
  }

  /**
   * Extract the value of the schema out of the parsed message.
   *
   * @param {{
   *   schema: string
   * }} params - Parameters of this method.
   * @returns {*} - Value of the schema.
   */
  extractValueBySchema ({
    schema,
  }) {
    const parsedMessage = this.ensureParsedMessage()

    return parsedMessage?.[schema]
      ?? null
  }
}
