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
  }) {
    const pubSub = this.createPubSub({
      config,
    })

    return /** @type {InstanceType<T>} */ (
      new this({
        pubSub,
      })
    )
  }

  /**
   * Create PubSub.
   *
   * @param {{
   *   config: GraphqlType.Config
   * }} params - Parameters of this method.
   * @returns {GraphqlType.PubSub} - Redis PubSub
   */
  static createPubSub ({
    config,
  }) {
    if (config.redisOptions) {
      return RedisPubSub.create({
        options: config.redisOptions,
      })
    }

    return LocalPubSub.create()
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
 * }} SubscriptionBrokerFactoryParams
 */
