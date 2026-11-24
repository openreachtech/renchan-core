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
     * Promise that the broadcaster of the event hub is ready, which is settled by the set up of the first receiver.
     */
    const {
      promise,
      resolve,
    } = Promise.withResolvers()

    /**
     * Resolve the event hub.
     */
    if (!existsChannel) {
      this.eventMap.set(
        channel,
        this.createEventHub({
          channel,
          broadcasterReadyPromise: promise,
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

    /*
     * The first receiver of the channel sets up to subscribe via event hub.
     */
    if (!existsChannel) {
      resolve(
        this.setupBroadcasterOnSubscribe({
          eventHub,
        })
      )
    }

    /*
     * Every receiver of the channel waits until the subscription is established.
     */
    try {
      await eventHub.broadcasterReadyPromise
    } catch (error) {
      this.revokeSubscription({
        channel,
        receiver,
      })

      throw error
    }
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
   * Revoke the subscription of a receiver, without calling the network.
   *
   * Remove the listener of the receiver from the event hub,
   * and delete the event hub from the event map when no listener remains.
   *
   * @param {GraphqlType.SubscribePubSubParams} params - Parameters of this method.
   * @returns {void}
   */
  revokeSubscription ({
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
      .delete(channel)
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
   *   broadcasterReadyPromise: Promise<void>
   * }} params - Parameters of this method.
   * @returns {EventHub} - Event hub.
   */
  createEventHub ({
    channel,
    broadcasterReadyPromise,
  }) {
    return EventHub.create({
      channel,
      broadcasterReadyPromise,
    })
  }
}

/**
 * @typedef {{}} BasePubSubFactoryParams
 */
