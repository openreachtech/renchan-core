import BaseSubscriptionResolver from '../../../../../../../lib/server/graphql/resolvers/BaseSubscriptionResolver.js'

/**
 * OnBroadcastNotifications subscription graphql resolver.
 *
 * @extends {BaseSubscriptionResolver<OnBroadcastNotificationsSubscribeVariables, OnBroadcastNotificationsSubscribeResponse>}
 */
export default class OnBroadcastNotificationsSubscriptionResolver extends BaseSubscriptionResolver {
  /** @override */
  static get schema () {
    return 'onBroadcastNotifications'
  }

  /**
   * Generate channel query.
   *
   * @override
   * @param {{
   *   variables: OnBroadcastNotificationsSubscribeVariables
   * }} params - Parameters.
   * @returns {Record<string, string | number>} - Channel query.
   * @throws {Error} - this function must be inherited
   */
  generateChannelQuery ({
    variables: {
      input: {
        segment,
      },
    },
  }) {
    return {
      segment,
    }
  }
}

/**
 * @typedef {{
 *   input: {
 *     segment: string
 *   }
 * }} OnBroadcastNotificationsSubscribeVariables
 */

/**
 * @typedef {{
 *   onBroadcastNotifications: {
 *     notification: {
 *       message: string
 *       segment: string
 *       postedAt: Date
 *     }
 *   }
 * }} OnBroadcastNotificationsSubscribeResponse
 */
