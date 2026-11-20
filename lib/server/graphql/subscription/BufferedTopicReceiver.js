import events, {
  EventEmitter,
} from 'events'

import TopicAsyncIterator from './TopicAsyncIterator.js'

const MESSAGE_EVENT_KEY = 'message'
const MALFORMED_MESSAGE = Symbol('malformed message')

/**
 * Topic receiver that buffers every message it receives.
 */
export default class BufferedTopicReceiver {
  /**
   * Constructor.
   *
   * @param {BufferedTopicReceiverParams} params - Parameters of this constructor.
   */
  constructor ({
    channel,
    broker,
    emitter,
    listener,
  }) {
    this.channel = channel
    this.broker = broker
    this.emitter = emitter
    this.listener = listener
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BufferedTopicReceiver ? X : never} T, X
   * @param {BufferedTopicReceiverFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} Instance of this constructor.
   * @this {T}
   * @public
   */
  static create ({
    channel,
    broker,
    emitter = this.createEventEmitter(),
  }) {
    const listener = this.generateListener({
      channel,
      emitter,
    })

    return /** @type {InstanceType<T>} */ (
      new this({
        channel,
        broker,
        emitter,
        listener,
      })
    )
  }

  /**
   * get: events module.
   *
   * @returns {typeof events} events module.
   */
  static get events () {
    return events
  }

  /**
   * get: EventEmitter class.
   *
   * @returns {typeof EventEmitter} EventEmitter class.
   */
  static get EventEmitterCtor () {
    return EventEmitter
  }

  /**
   * get: TopicAsyncIterator class.
   *
   * @returns {typeof TopicAsyncIterator} TopicAsyncIterator class.
   */
  static get TopicAsyncIteratorCtor () {
    return TopicAsyncIterator
  }

  /**
   * Create an event emitter.
   *
   * @returns {EventEmitter} Event emitter.
   */
  static createEventEmitter () {
    return new this.EventEmitterCtor()
  }

  /**
   * Create an async iterator over the buffered messages.
   *
   * @param {TopicAsyncIteratorFactoryParams} params - Parameters of this method.
   * @returns {TopicAsyncIterator} Async iterator.
   */
  static createTopicAsyncIterator ({
    receiver,
    messages,
    subscribeErrorPromise,
  }) {
    return this.TopicAsyncIteratorCtor
      .create({
        receiver,
        messages,
        subscribeErrorPromise,
      })
  }

  /**
   * Generate the listener that the pub/sub calls with each raw message.
   *
   * @param {{
   *   channel: string
   *   emitter: EventEmitter
   * }} params - Parameters of this method.
   * @returns {(
   *   channel: string,
   *   message: string
   * ) => void} Listener.
   */
  static generateListener ({
    channel,
    emitter,
  }) {
    return (receivedChannel, message) => {
      const payload = this.parseMessage({
        channel,
        message,
      })

      if (payload === MALFORMED_MESSAGE) {
        return
      }

      this.invokeEmitMessage({
        emitter,
        payload,
      })
    }
  }

  /**
   * Parse a raw message.
   *
   * @param {{
   *   channel: string
   *   message: string
   * }} params - Parameters of this method.
   * @returns {* | symbol} Payload, or the malformed marker when the message is not JSON.
   */
  static parseMessage ({
    channel,
    message,
  }) {
    try {
      return JSON.parse(message)
    } catch (error) {
      this.onMalformedMessage({
        channel,
        message,
        error,
      })

      return MALFORMED_MESSAGE
    }
  }

  /**
   * Handle a message that is not JSON. Override to log it.
   *
   * @param {{
   *   channel: string
   *   message: string
   *   error: unknown
   * }} params - Parameters of this method.
   * @returns {void}
   */
  static onMalformedMessage ({
    channel,
    message,
    error,
  }) {
    // noop
  }

  /**
   * Invoke emit() of the event emitter.
   *
   * @param {{
   *   emitter: EventEmitter
   *   payload: *
   * }} params - Parameters of this method.
   * @returns {void}
   */
  static invokeEmitMessage ({
    emitter,
    payload,
  }) {
    emitter.emit(
      MESSAGE_EVENT_KEY,
      payload
    )
  }

  /**
   * get: Constructor of this instance.
   *
   * @returns {typeof BufferedTopicReceiver} Constructor.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * Generate an async iterable, and subscribe to the topic at once.
   *
   * @returns {AsyncIterable<*>} Async iterable.
   * @public
   */
  generateAsyncIterable () {
    const messages = this.generateMessageIterator()
    const subscribeErrorPromise = this.captureSubscribeError()

    return this.Ctor
      .createTopicAsyncIterator({
        receiver: this,
        messages,
        subscribeErrorPromise,
      })
  }

  /**
   * Generate an iterator that buffers the messages the emitter emits.
   *
   * @returns {Required<AsyncIterableIterator<Array<*>>>} Message iterator.
   */
  generateMessageIterator () {
    return /** @type {Required<AsyncIterableIterator<Array<*>>>} */ (
      this.Ctor.events
        .on(
          this.emitter,
          MESSAGE_EVENT_KEY
        )
    )
  }

  /**
   * Subscribe to the topic, and settle a failure into a value that never rejects.
   * A throw from onReleaseError() is dropped, because nobody may await this promise.
   *
   * @returns {Promise<Error | null>} Error of the subscription, or null.
   */
  async captureSubscribeError () {
    try {
      await this.invokeSubscribe()

      return null
    } catch (error) {
      await this.releaseTopic()
        .catch(() => {
          // noop
        })

      return /** @type {Error} */ (error)
    }
  }

  /**
   * Unsubscribe from the topic, and hand a failure to the hook.
   *
   * @returns {Promise<void>}
   * @public
   */
  async releaseTopic () {
    try {
      await this.invokeUnsubscribe()
    } catch (error) {
      this.onReleaseError({
        error,
      })
    }
  }

  /**
   * Handle a failure to unsubscribe. Override to log it.
   *
   * @param {{
   *   error: unknown
   * }} params - Parameters of this method.
   * @returns {void}
   */
  onReleaseError ({
    error,
  }) {
    // noop
  }

  /**
   * Invoke subscribe() of the broker.
   *
   * @returns {Promise<void>}
   */
  async invokeSubscribe () {
    await this.broker
      .subscribe({
        channel: this.channel,
        receiver: this,
      })
  }

  /**
   * Invoke unsubscribe() of the broker.
   *
   * @returns {Promise<void>}
   */
  async invokeUnsubscribe () {
    await this.broker
      .unsubscribe({
        channel: this.channel,
        receiver: this,
      })
  }
}

/**
 * @typedef {{
 *   channel: string
 *   broker: GraphqlType.SubscriptionHandler
 *   emitter: EventEmitter
 *   listener: (channel: string, message: string) => void
 * }} BufferedTopicReceiverParams
 */

/**
 * @typedef {{
 *   channel: string
 *   broker: GraphqlType.SubscriptionHandler
 *   emitter?: EventEmitter
 * }} BufferedTopicReceiverFactoryParams
 */

/**
 * @typedef {{
 *   receiver: BufferedTopicReceiver
 *   messages: Required<AsyncIterableIterator<Array<*>>>
 *   subscribeErrorPromise: Promise<Error | null>
 * }} TopicAsyncIteratorFactoryParams
 */
