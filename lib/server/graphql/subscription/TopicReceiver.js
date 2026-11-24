import TopicQueue from './TopicQueue.js'

/**
 * Topic receiver.
 */
export default class TopicReceiver {
  /**
   * Constructor.
   *
   * @param {{
   *   channel: string
   *   broker: GraphqlType.SubscriptionHandler
   *   topicQueue: TopicQueue
   *   onMessage: OnMessageCallback
   *   abortController: AbortController
   * }} params - Parameters of this constructor.
   */
  constructor ({
    channel,
    broker,
    topicQueue,
    onMessage,
    abortController,
  }) {
    this.channel = channel
    this.broker = broker
    this.topicQueue = topicQueue
    this.abortController = abortController

    /** @type {OnMessageCallback} */
    this.onMessage = onMessage

    this.listener = this.generateListener()
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof TopicReceiver ? X : never} T, X
   * @param {{
   *   channel: string
   *   broker: GraphqlType.SubscriptionHandler
   *   topicQueue?: TopicQueue
   *   onMessage?: OnMessageCallback
   *   abortController?: AbortController
   * }} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    channel,
    broker,
    topicQueue = this.createTopicQueue(),
    onMessage = () => {},
    abortController = this.createAbortController(),
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        channel,
        broker,
        topicQueue,
        onMessage,
        abortController,
      })
    )
  }

  /**
   * get: TopicQueue constructor.
   *
   * @returns {typeof TopicQueue} - TopicQueue constructor.
   */
  static get TopicQueueCtor () {
    return TopicQueue
  }

  /**
   * get: AbortController constructor.
   *
   * @returns {typeof AbortController} - AbortController constructor.
   */
  static get AbortControllerCtor () {
    return AbortController
  }

  /**
   * Create a topic queue.
   *
   * @returns {TopicQueue} - Topic queue.
   */
  static createTopicQueue () {
    return this.TopicQueueCtor.create()
  }

  /**
   * Create an abort controller.
   *
   * @returns {AbortController} - Abort controller.
   */
  static createAbortController () {
    return new this.AbortControllerCtor()
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
      this.topicQueue.enqueue({
        channel,
        message,
      })

      this.onMessage()
    }
  }

  /**
   * Set onMessage callback.
   *
   * @param {{
   *   onMessage: OnMessageCallback
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
   * @returns {Promise<AsyncIterable<*>>} - Async iterator.
   * @public
   */
  async generateAsyncIterable () {
    await this.subscribe()

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
      await this.waitTopic()

      return {
        value: this.extractTopicParcel(),
        done: false,
      }
    }
  }

  /**
   * Check if the iteration has ended, that is, return() or throw() has been called.
   *
   * @returns {boolean} - true: ended, false: not ended.
   */
  hasEnded () {
    return this.abortController.signal.aborted
  }

  /**
   * Wait until a topic is held in the queue.
   *
   * @returns {Promise<void>} - Resolved once a topic is held.
   */
  async waitTopic () {
    if (this.topicQueue.hasTopic()) {
      return
    }

    const arrival = new Promise(resolve => {
      this.setOnMessage({
        onMessage: () => {
          if (this.topicQueue.isEmpty()) {
            return
          }

          resolve()
        },
      })
    })

    await arrival
  }

  /**
   * Extract the topic parcel an iteration yields, out of the topic at the head of the queue.
   *
   * @returns {TopicParcel | null} - Topic parcel, or null when no available topic parcel is held.
   */
  extractTopicParcel () {
    return this.topicQueue.dequeue()
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
        value: null,
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
 * @typedef {() => void} OnMessageCallback
 */

/**
 * @typedef {{
 *   value: T
 *   done: boolean
 * }} AsyncIteratorResult
 * @template T
 */
