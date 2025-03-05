import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'
import OnBroadcastNotificationsSubscriptionResolver from '../subscriptions/OnBroadcastNotificationsSubscriptionResolver.js'

export default class PostNotificationMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'postNotification'
  }

  /** @override */
  async resolve ({
    variables: {
      input: {
        message,
        segment,
      },
    },
    context,
  }) {
    const notification = {
      message,
      segment,
    }

    await this.broadcastNotification({
      context,
      notification,
    })

    return {
      notification,
    }
  }

  /**
   * Broadcast notification.
   *
   * @param {{
   *   context: GraphqlType.Context
   *   notification: Notification
   * }} params - Parameters.
   * @returns {Promise<void>} - Returns nothing.
   */
  async broadcastNotification ({
    context,
    notification,
  }) {
    const payload = {
      notification,
    }
    const channelQuery = {
      segment: notification.segment,
    }
    const topic = OnBroadcastNotificationsSubscriptionResolver.buildTopic({
      payload,
      channelQuery,
    })

    return this.publishTopic({
      context,
      topic,
    })
  }
}

/**
 * @typedef {{
 *   input: Notification
 * }} PostNotificationMutationVariables
 */

/**
 * @typedef {{
 *   postNotification: {
 *     notification: Notification
 *   }
 * }} PostNotificationMutationResponse
 */

/**
 * @typedef {{
 *   message: string
 *   segment: string
 * }} Notification
 */
