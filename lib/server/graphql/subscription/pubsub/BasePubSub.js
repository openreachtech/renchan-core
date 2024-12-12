import ConcreteMemberNotFoundGraphqlError from '../../errors/concretes/ConcreteMemberNotFoundGraphqlError.js'

import EventHub from './tools/EventHub.js'

/**
 * Base PubSub.
 *
 * @abstract
 * @property {Map<string, import('./tools/EventHub.js')>} eventMap - Event map.
 */
export default class BasePubSub {
  /**
   * Constructor.
   */
  constructor () {
    this.eventMap = new Map()
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BasePubSub ? X : never} T, X.
   * @param {BasePubSubFactoryParams} [params] - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create (params = {}) {
    return /** @type {InstanceType<T>} */ (
      new this()
    )
  }

  /**
   * Publish a payload.
   *
   * @abstract
   * @param {GraphqlType.PublishPubSubParams} params - Parameters of this method.
   * @returns {Promise<void>} - No return
   * @throws {Error} - An instance of ConcreteMemberNotFoundGraphqlError.
   */
  async publish ({
    channel,
    message,
  }) {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BasePubSub#publish()',
      },
    })
  }

  /**
   * Subscribe a receiver.
   *
   * @param {GraphqlType.SubscribePubSubParams} params - Parameters of this method.
   * @return {Promise<void>} - Promise of this method.
   */
  async subscribe ({
    channel,
    receiver,
  }) {
    const existsChannel = this.eventMap.has(channel)

    /**
     * Resolve the event hub.
     */
    if (!existsChannel) {
      this.eventMap.set(
        channel,
        this.createEventHub({
          channel,
        })
      )
    }
    const eventHub = this.eventMap.get(channel)

    /**
     * Add a listener to the event hub.
     */
    eventHub.addListener({
      listener: receiver.listener,
    })

    if (existsChannel) {
      return
    }

    /*
     * Setup to subscribe via event hub.
     */
    await this.setupBroadcasterOnSubscribe({
      eventHub,
    })
  }

  /**
   * Setup broadcaster on subscribe.
   *
   * @abstract
   * @param {{
   *   eventHub: EventHub
   * }} params - Parameters of this method.
   * @returns {Promise<void>} - Promise of this method.
   * @throws {Error} - An instance of ConcreteMemberNotFoundGraphqlError.
   */
  async setupBroadcasterOnSubscribe ({
    eventHub,
  }) {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BasePubSub#setupBroadcasterOnSubscribe()',
      },
    })
  }

  /**
   * Unsubscribe a receiver.
   *
   * @param {GraphqlType.UnsubscribePubSubParams} params - Parameters of this method.
   * @returns {Promise<void>} - Promise of this method.
   */
  async unsubscribe ({
    channel,
    receiver,
  }) {
    if (!this.eventMap.has(channel)) {
      return
    }

    const eventHub = this.eventMap.get(channel)

    eventHub.removeListener({
      listener: receiver.listener,
    })

    if (eventHub.existsListener()) {
      return
    }

    this.eventMap
      .delete(eventHub.channel)

    await this.teardownBroadcasterOnUnsubscribe({
      eventHub,
    })
  }

  /**
   * Teardown broadcaster on unsubscribe.
   *
   * @abstract
   * @param {{
   *   eventHub: EventHub
   * }} params - Parameters of this method.
   * @returns {Promise<void>} - Promise of this method.
   * @throws {Error} - An instance of ConcreteMemberNotFoundGraphqlError.
   */
  async teardownBroadcasterOnUnsubscribe ({
    eventHub,
  }) {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BasePubSub#teardownBroadcasterOnUnsubscribe()',
      },
    })
  }

  /**
   * Create an event hub.
   *
   * @param {{
   *   channel: string
   * }} params - Parameters of this method.
   * @returns {EventHub} - Event hub.
   */
  createEventHub ({
    channel,
  }) {
    return EventHub.create({
      channel,
    })
  }
}

/**
 * @typedef {{}} BasePubSubFactoryParams
 */
