/**
 * Topic receiver.
 */
export default class TopicReceiver {
  /**
   * Constructor.
   *
   * @param {TopicReceiverParams} params - Parameters of this constructor.
   */
  constructor ({
    channel,
    broker,
  }) {
    this.channel = channel
    this.broker = broker

    /** @type {OnMessageCallback<*>} */
    this.onMessage = null

    this.listener = this.generateListener()
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof TopicReceiver ? X : never} T, X
   * @param {TopicReceiverFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    channel,
    broker,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        channel,
        broker,
      })
    )
  }

  /**
   * Generate listener.
   *
   * @returns {(
   *   channel: string,
   *   message: string
   * ) => void} - Listener.
   */
  generateListener () {
    return (channel, message) => {
      this.onMessage(
        JSON.parse(message)
      )
    }
  }

  /**
   * Set onMessage callback.
   *
   * @param {{
   *   onMessage: OnMessageCallback<*>
   * }} params - Parameters of this method.
   * @returns {this} - For method chaining.
   */
  setOnMessage ({
    onMessage,
  }) {
    this.onMessage = onMessage

    return this
  }

  /**
   * Subscribe to the topic via the broker.
   *
   * @returns {Promise<void>} - No return.
   */
  async subscribe () {
    await this.broker
      .subscribe({
        channel: this.channel,
        receiver: this,
      })
  }

  /**
   * Unsubscribe from the topic via the broker.
   *
   * @returns {Promise<void>} - No return.
   */
  async unsubscribe () {
    await this.broker
      .unsubscribe({
        channel: this.channel,
        receiver: this,
      })
  }

  /**
   * Generate an async iterator.
   *
   * @returns {AsyncIterable<*>} - Async iterator.
   * @public
   */
  generateAsyncIterable () {
    const iterator = this.generateAsyncIterator()

    return {
      [Symbol.asyncIterator]: () => iterator,
    }
  }

  /**
   * Generate an async iterator.
   *
   * @returns {AsyncIterator<*>} - Async iterator.
   */
  generateAsyncIterator () {
    const nextHandler = this.generateAsyncIteratorNext()
    const returnHandler = this.generateAsyncIteratorReturn()
    const throwHandler = this.generateAsyncIteratorThrow()

    return {
      next: nextHandler,
      return: returnHandler,
      throw: throwHandler,
    }
  }

  /**
   * Generate async iterator next function.
   *
   * @returns {() => Promise<AsyncIteratorResult<*>>} - Async iterator next function.
   */
  generateAsyncIteratorNext () {
    return async () => {
      const value = await new Promise(resolve => {
        this.setOnMessage({
          onMessage: resolve,
        })

        this.subscribe() // async
      })

      return {
        value,
        done: false,
      }
    }
  }

  /**
   * Generate async iterator return function.
   *
   * @returns {() => Promise<AsyncIteratorResult<*>>} - Async iterator return function.
   */
  generateAsyncIteratorReturn () {
    return async () => {
      await this.unsubscribe()

      return {
        value: undefined,
        done: true,
      }
    }
  }

  /**
   * Generate async iterator throw function.
   *
   * @returns {(error: Error) => Promise<AsyncIteratorResult<*>>} - Async iterator throw function.
   */
  generateAsyncIteratorThrow () {
    return async error => {
      await this.unsubscribe()

      throw error
    }
  }
}

/**
 * @typedef {{
 *   channel: string
 *   broker: GraphqlType.SubscriptionHandler
 * }} TopicReceiverParams
 */

/**
 * @typedef {TopicReceiverParams} TopicReceiverFactoryParams
 */

/**
 * @typedef {(payload: T) => T} OnMessageCallback
 * @template T
 */

/**
 * @typedef {{
 *   value: T
 *   done: boolean
 * }} AsyncIteratorResult
 * @template T
 */
