import LocalPubSub from './pubsub/LocalPubSub.js'
import RedisPubSub from './pubsub/RedisPubSub.js'
import TopicReceiver from './TopicReceiver.js'

/**
 * Subscription broker.
 */
export default class SubscriptionBroker {
  /**
   * Constructor.
   *
   * @param {SubscriptionBrokerParams} params - Parameters of this constructor.
   */
  constructor ({
    pubSub,
  }) {
    this.pubSub = pubSub
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof SubscriptionBroker ? X : never} T, X
   * @param {SubscriptionBrokerFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    config,
    publishingRedisClient = null,
    subscribingRedisClient = null,
  }) {
    const pubSub = this.createPubSub({
      config,
      publishingRedisClient,
      subscribingRedisClient,
    })

    return /** @type {InstanceType<T>} */ (
      new this({
        pubSub,
      })
    )
  }

  /**
   * get: RedisPubSub constructor.
   *
   * @returns {typeof RedisPubSub} - RedisPubSub constructor.
   */
  static get RedisPubSubCtor () {
    return RedisPubSub
  }

  /**
   * Create PubSub.
   *
   * @param {{
   *   config: GraphqlType.Config
   *   publishingRedisClient: import('ioredis').Redis | null
   *   subscribingRedisClient: import('ioredis').Redis | null
   * }} params - Parameters of this method.
   * @returns {GraphqlType.PubSub} - Redis PubSub
   */
  static createPubSub ({
    config,
    publishingRedisClient,
    subscribingRedisClient,
  }) {
    if (config.redisOptions) {
      return this.createRedisPubSub({
        options: config.redisOptions,
        publishingRedisClient,
        subscribingRedisClient,
      })
    }

    return LocalPubSub.create()
  }

  /**
   * Create Redis PubSub.
   *
   * @param {{
   *   options: import('ioredis').RedisOptions
   *   publishingRedisClient: import('ioredis').Redis | null
   *   subscribingRedisClient: import('ioredis').Redis | null
   * }} params - Parameters of this method.
   * @returns {GraphqlType.PubSub} - Redis PubSub
   */
  static createRedisPubSub ({
    options,
    publishingRedisClient,
    subscribingRedisClient,
  }) {
    return this.RedisPubSubCtor.create({
      options,
      publishingRedisClient,
      subscribingRedisClient,
    })
  }

  /**
   * Publish a payload.
   *
   * @param {GraphqlType.PublishPubSubParams} params - Parameters of this method.
   * @returns {Promise<void>} - No return.
   */
  async publish ({
    channel,
    message,
  }) {
    await this.pubSub
      .publish({
        channel,
        message,
      })
  }

  /**
   * Subscribe a receiver.
   *
   * @param {GraphqlType.SubscribePubSubParams} params - Parameters of this method.
   * @returns {Promise<void>} - Promise of this method.
   */
  async subscribe ({
    channel,
    receiver,
  }) {
    await this.pubSub
      .subscribe({
        channel,
        receiver,
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
    await this.pubSub
      .unsubscribe({
        channel,
        receiver,
      })
  }

  /**
   * Generate an async iterator.
   *
   * @param {GraphqlType.GenerateAsyncIteratorPubSubParams} params - Parameters of this method.
   * @returns {AsyncIterable<*>} - Async iterator.
   */
  generateAsyncIterable ({
    channel,
  }) {
    const receiver = TopicReceiver.create({
      channel,
      broker: this,
    })

    return receiver.generateAsyncIterable()
  }
}

/**
 * @typedef {{
 *   pubSub: GraphqlType.PubSub
 * }} SubscriptionBrokerParams
 */

/**
 * @typedef {{
 *   config: GraphqlType.Config
 *   publishingRedisClient?: import('ioredis').Redis | null
 *   subscribingRedisClient?: import('ioredis').Redis | null
 * }} SubscriptionBrokerFactoryParams
 */
