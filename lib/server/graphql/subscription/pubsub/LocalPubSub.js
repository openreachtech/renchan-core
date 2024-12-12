import {
  EventEmitter,
} from 'events'

import BasePubSub from './BasePubSub.js'

/**
 * Redis PubSub.
 *
 * @extends {BasePubSub}
 * @see https://claude.ai/chat/4c7500b2-2ec9-43be-b337-fb221c1baa3b
 */
export default class LocalPubSub extends BasePubSub {
  /**
   * Constructor.
   */
  constructor () {
    super()

    this.subscribersEventEmitterMap = new Map()
  }

  /**
   * Publish a payload.
   *
   * @override
   * @param {GraphqlType.PublishPubSubParams} params - Parameters of this method.
   * @returns {Promise<void>} - No return
   */
  async publish ({
    channel,
    message,
  }) {
    const emitter = this.subscribersEventEmitterMap.get(channel)

    if (!emitter) {
      return
    }

    emitter.emit(
      channel,
      channel,
      JSON.stringify(message)
    )
  }

  /**
   * Setup broadcaster on subscribe.
   *
   * @override
   * @param {{
   *   eventHub: GraphqlType.EventHub
   * }} params - Parameters of this method.
   * @returns {Promise<void>} - Promise of this method.
   */
  async setupBroadcasterOnSubscribe ({
    eventHub,
  }) {
    const emitter = this.createEventEmitter()

    emitter.on(eventHub.channel, eventHub.listener)

    this.subscribersEventEmitterMap
      .set(eventHub.channel, emitter)
  }

  /**
   * Teardown broadcaster on unsubscribe.
   *
   * @override
   * @param {{
   *   eventHub: GraphqlType.EventHub
   * }} params - Parameters of this method.
   * @returns {Promise<void>} - Promise of this method.
   */
  async teardownBroadcasterOnUnsubscribe ({
    eventHub,
  }) {
    const emitter = this.subscribersEventEmitterMap
      .get(eventHub.channel)

    if (!emitter) {
      return
    }

    emitter.off(eventHub.channel, eventHub.listener)

    this.subscribersEventEmitterMap
      .delete(eventHub.channel)
  }

  /**
   * Create an event emitter.
   *
   * @returns {EventEmitter} - Event emitter.
   */
  createEventEmitter () {
    return new EventEmitter()
  }
}

/**
 * @typedef {{
 *   alpha: string
 *   beta: number
 * }} LocalPubSubParams
 */

/**
 * @typedef {LocalPubSubParams} LocalPubSubFactoryParams
 */
