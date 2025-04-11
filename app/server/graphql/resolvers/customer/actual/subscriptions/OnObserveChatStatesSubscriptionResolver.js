import BaseSubscriptionResolver from '../../../../../../../lib/server/graphql/resolvers/BaseSubscriptionResolver.js'

/**
 * OnObserveChatStates subscription graphql resolver.
 *
 * @extends {BaseSubscriptionResolver<OnObserveChatStatesSubscribeVariables, OnObserveChatStatesSubscribeResponse>}
 */
export default class OnObserveChatStatesSubscriptionResolver extends BaseSubscriptionResolver {
  /** @override */
  static get schema () {
    return 'onObserveChatStates'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,
    }
  }

  /** @override */
  generateChannelQuery ({
    variables: {
      input: {
        chatRoomId,
      },
    },
    context,
  }) {
    return {
      chatRoomId,
    }
  }

  /** @override */
  canSubscribe ({
    variables,
    context,
    information,
    parent,
  }) {
    return context.hasAuthenticated()
  }
}

/**
 * @typedef {{
 *   input: {
 *     chatRoomId: number
 *   }
 * }} OnObserveChatStatesSubscribeVariables
 */

/**
 * @typedef {{
 *   onObserveChatStates: {
 *     hasUnreadMessages: boolean
 *     isUpdatedRooms: boolean
 *     isUpdatedMembers: boolean
 *   }
 * }} OnObserveChatStatesSubscribeResponse
 */
