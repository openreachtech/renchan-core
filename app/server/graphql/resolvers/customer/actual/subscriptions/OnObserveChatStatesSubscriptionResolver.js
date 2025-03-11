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
