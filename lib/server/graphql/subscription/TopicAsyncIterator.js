import TopicIteratorResult from './TopicIteratorResult.js'

/**
 * Async iterator over the messages a buffered topic receiver collects.
 */
export default class TopicAsyncIterator {
  /**
   * Constructor.
   *
   * @param {TopicAsyncIteratorParams} params - Parameters of this constructor.
   */
  constructor ({
    receiver,
    messages,
    subscribeErrorPromise,
    abortController,
  }) {
    this.receiver = receiver
    this.messages = messages
    this.subscribeErrorPromise = subscribeErrorPromise
    this.abortController = abortController
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof TopicAsyncIterator ? X : never} T, X
   * @param {TopicAsyncIteratorFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} Instance of this constructor.
   * @this {T}
   * @public
   */
  static create ({
    receiver,
    messages,
    subscribeErrorPromise,
    abortController = this.createAbortController(),
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        receiver,
        messages,
        subscribeErrorPromise,
        abortController,
      })
    )
  }

  /**
   * get: AbortController class.
   *
   * @returns {typeof AbortController} AbortController class.
   */
  static get AbortControllerCtor () {
    return AbortController
  }

  /**
   * get: TopicIteratorResult class.
   *
   * @returns {typeof TopicIteratorResult} TopicIteratorResult class.
   */
  static get TopicIteratorResultCtor () {
    return TopicIteratorResult
  }

  /**
   * Create an abort controller that marks this iterator as closed.
   *
   * @returns {AbortController} Abort controller.
   */
  static createAbortController () {
    return new this.AbortControllerCtor()
  }

  /**
   * Create a result of one iteration step.
   *
   * @param {TopicIteratorResultParams} params - Parameters of this method.
   * @returns {TopicIteratorResult} Result.
   */
  static createTopicIteratorResult ({
    value,
    done,
  }) {
    return this.TopicIteratorResultCtor
      .create({
        value,
        done,
      })
  }

  /**
   * get: Constructor of this instance.
   *
   * @returns {typeof TopicAsyncIterator} Constructor.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * Return this iterator as its own async iterable.
   *
   * @returns {this} This iterator.
   * @public
   */
  [Symbol.asyncIterator] () {
    return this
  }

  /**
   * Read the next message.
   *
   * @returns {Promise<TopicIteratorResult>} Result.
   * @public
   */
  async next () {
    const subscribeError = await this.subscribeErrorPromise

    if (this.isClosed()) {
      return this.createDoneResult()
    }

    if (subscribeError) {
      throw subscribeError
    }

    const {
      value,
      done,
    } = await this.invokeReadMessage()

    if (done) {
      return this.createDoneResult()
    }

    const [payload] = value

    return this.createMessageResult({
      payload,
    })
  }

  /**
   * Close this iterator.
   *
   * @returns {Promise<TopicIteratorResult>} Result that ends iteration.
   * @public
   */
  async return () {
    await this.closeIterator()

    return this.createDoneResult()
  }

  /**
   * Close this iterator, then throw the error.
   *
   * @param {Error} error - Error to throw.
   * @returns {Promise<never>} Never resolves.
   * @public
   */
  async throw (error) {
    await this.closeIterator()

    throw error
  }

  /**
   * Close this iterator once, and release the topic when the subscription succeeded.
   *
   * @returns {Promise<void>}
   */
  async closeIterator () {
    if (this.isClosed()) {
      return
    }

    this.invokeAbort()

    await this.invokeReturnMessages()

    const subscribeError = await this.subscribeErrorPromise

    if (subscribeError) {
      return
    }

    await this.invokeReleaseTopic()
  }

  /**
   * Check whether this iterator is closed.
   *
   * @returns {BooleanLike} true: closed.
   */
  isClosed () {
    return this.abortController
      .signal
      .aborted
  }

  /**
   * Create the result that ends iteration.
   *
   * @returns {TopicIteratorResult} Result.
   */
  createDoneResult () {
    return this.Ctor
      .createTopicIteratorResult({
        value: null,
        done: true,
      })
  }

  /**
   * Create the result that carries a message.
   *
   * @param {{
   *   payload: *
   * }} params - Parameters of this method.
   * @returns {TopicIteratorResult} Result.
   */
  createMessageResult ({
    payload,
  }) {
    return this.Ctor
      .createTopicIteratorResult({
        value: payload,
        done: false,
      })
  }

  /**
   * Invoke next() of the message iterator.
   *
   * @returns {Promise<IteratorResult<Array<*>>>} Result of the message iterator.
   */
  invokeReadMessage () {
    return this.messages.next()
  }

  /**
   * Invoke return() of the message iterator.
   *
   * @returns {Promise<IteratorResult<Array<*>>>} Result of the message iterator.
   */
  invokeReturnMessages () {
    return this.messages.return()
  }

  /**
   * Invoke abort() of the abort controller.
   *
   * @returns {void}
   */
  invokeAbort () {
    this.abortController.abort()
  }

  /**
   * Invoke releaseTopic() of the receiver.
   *
   * @returns {Promise<void>}
   */
  async invokeReleaseTopic () {
    await this.receiver.releaseTopic()
  }
}

/**
 * @typedef {{
 *   receiver: import('./BufferedTopicReceiver.js').default
 *   messages: Required<AsyncIterableIterator<Array<*>>>
 *   subscribeErrorPromise: Promise<Error | null>
 *   abortController: AbortController
 * }} TopicAsyncIteratorParams
 */

/**
 * @typedef {{
 *   receiver: import('./BufferedTopicReceiver.js').default
 *   messages: Required<AsyncIterableIterator<Array<*>>>
 *   subscribeErrorPromise: Promise<Error | null>
 *   abortController?: AbortController
 * }} TopicAsyncIteratorFactoryParams
 */

/**
 * @typedef {{
 *   value: *
 *   done: boolean
 * }} TopicIteratorResultParams
 */

/**
 * @typedef {*} BooleanLike
 */
