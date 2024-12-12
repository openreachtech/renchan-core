import {
  Redis,
} from 'ioredis'

import BasePubSub from './BasePubSub.js'

/**
 * Redis PubSub.
 *
 * @extends {BasePubSub}
 * @see https://claude.ai/chat/4c7500b2-2ec9-43be-b337-fb221c1baa3b
 */
export default class RedisPubSub extends BasePubSub {
  /**
   * Constructor.
   *
   * @param {RedisPubSubParams} params - Parameters of this constructor.
   */
  constructor ({
    publishingRedisClient,
    subscribingRedisClient,
  }) {
    super()

    this.publishingRedisClient = publishingRedisClient
    this.subscribingRedisClient = subscribingRedisClient
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof RedisPubSub ? X : never} T, X
   * @param {RedisPubSubFactoryParams} [params] - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    options = {
      host: 'localhost',
      port: 6379,
    },
  } = {}) {
    const publishingRedisClient = this.createRedis({
      options,
    })
    const subscribingRedisClient = this.createRedis({
      options,
    })

    return /** @type {InstanceType<T>} */ (
      new this({
        publishingRedisClient,
        subscribingRedisClient,
      })
    )
  }

  /**
   * Create Redis client.
   *
   * @param {{
   *   options: import('ioredis').RedisOptions
   * }} params - Parameters of this method.
   * @returns {Redis} - Redis client.
   */
  static createRedis ({
    options,
  }) {
    return new this.RedisCtor(options)
  }

  /**
   * get: Redis constructor.
   *
   * @returns {typeof Redis} - Redis constructor.
   */
  static get RedisCtor () {
    return Redis
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
    await this.publishingRedisClient.publish(
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
    /*
     * Start to subscription via Redis client.
     * Even if you subscribe to the same channel multiple times,
     * it will only be subscribed to it once.
     */
    this.subscribingRedisClient
      .off('message', eventHub.listener)
    this.subscribingRedisClient
      .on('message', eventHub.listener)

    /*
     * This promise returns the number of channels being subscribed to.
     */
    await this.subscribingRedisClient
      .subscribe(eventHub.channel)
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
    this.subscribingRedisClient
      .off('message', eventHub.listener)

    await this.subscribingRedisClient
      .unsubscribe(eventHub.channel)
  }
}

/**
 * @typedef {{
 *   publishingRedisClient: Redis
 *   subscribingRedisClient: Redis
 * }} RedisPubSubParams
 */

/**
 * @typedef {{
 *   options?: import('ioredis').RedisOptions
 * }} RedisPubSubFactoryParams
 */
