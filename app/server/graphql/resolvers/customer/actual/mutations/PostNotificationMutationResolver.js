import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

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

    return {
      notification,
    }
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
