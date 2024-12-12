import {
  EventEmitter,
} from 'events'

const BROADCAST_EVENT_KEY = 'broadcast'

export default class EventHub {
  /**
   * Constructor.
   *
   * @param {EventHubParams} params - Parameters of this constructor.
   */
  constructor ({
    channel,
    emitter,
  }) {
    this.channel = channel
    this.emitter = emitter

    this.listener = this.generateListener()
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof EventHub ? X : never} T, X
   * @param {EventHubFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    channel,
    emitter = this.createEmitter(),
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        channel,
        emitter,
      })
    )
  }

  /**
   * Create emitter.
   *
   * @returns {EventEmitter} - Emitter
   */
  static createEmitter () {
    return new EventEmitter()
  }

  /**
   * Generate listener to set Redis client.
   *
   * @returns {(...args: Array<*>) => void} - Listener.
   */
  generateListener () {
    return (channel, message) => {
      if (channel !== this.channel) {
        return
      }

      this.emitter
        .emit(
          BROADCAST_EVENT_KEY,
          channel,
          message
        )
    }
  }

  /**
   * Check if the listener exists.
   *
   * @returns {boolean} - true: exists, false: not exists.
   * @public
   */
  existsListener () {
    const listenerCount = this.emitter
      .listenerCount(BROADCAST_EVENT_KEY)

    return listenerCount > 0
  }

  /**
   * Check if the listener is empty.
   *
   * @returns {boolean} - true: empty, false: not empty.
   * @public
   */
  emptyListener () {
    return !this.existsListener()
  }

  /**
   * Add listener.
   *
   * @param {{
   *   listener: EventHubListener
   * }} listener - Listener.
   * @returns {EventHub} - For method chaining.
   * @public
   */
  addListener ({
    listener,
  }) {
    this.emitter
      .off(BROADCAST_EVENT_KEY, listener)
    this.emitter
      .on(BROADCAST_EVENT_KEY, listener)

    return this
  }

  /**
   * Unsubscribe a receiver.
   *
   * @param {{
   *   listener: EventHubListener
   * }} listener - Listener.
   * @returns {EventHub} - For method chaining.
   * @public
   */
  removeListener ({
    listener,
  }) {
    this.emitter
      .off(BROADCAST_EVENT_KEY, listener)

    return this
  }

  /**
   * Has listener.
   *
   * @param {{
   *   listener: EventHubListener
   * }} params - Parameters of this method.
   * @returns {boolean} - true: exists, false: not exists.
   */
  hasListener ({
    listener,
  }) {
    return this.emitter
      .listeners(BROADCAST_EVENT_KEY)
      .includes(listener)
  }
}

/**
 * @typedef {{
 *   channel: string
 *   emitter: EventEmitter
 * }} EventHubParams
 */

/**
 * @typedef {{
 *   channel: string
 *   emitter?: EventEmitter
 * }} EventHubFactoryParams
 */

/**
 * @typedef {(...args: Array<*>) => void} EventHubListener
 */
