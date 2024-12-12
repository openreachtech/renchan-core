import BaseResolver from './BaseResolver.js'

/**
 * Base graphql resolver for Query.
 *
 * @abstract
 */
export default class BaseMutationResolver extends BaseResolver {
  /** @override */
  static get operation () {
    return 'Mutation'
  }

  /**
   * Publish a topic.
   *
   * @param {{
   *   context: GraphqlType.Context
   *   topic: {
   *     channel: string
   *     message: *
   *   }
   * }} params - Parameters.
   * @returns {Promise<void>} - No return.
   */
  async publishTopic ({
    context,
    topic,
  }) {
    await context.broker.publish(topic)
  }
}
