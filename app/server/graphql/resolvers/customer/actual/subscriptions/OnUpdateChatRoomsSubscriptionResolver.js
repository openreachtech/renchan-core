import BaseSubscriptionResolver from '../../../../../../../lib/server/graphql/resolvers/BaseSubscriptionResolver.js'

/**
 * OnUpdateChatRooms subscription graphql resolver.
 *
 * @extends {BaseSubscriptionResolver<OnUpdateChatRoomsSubscribeVariables, OnUpdateChatRoomsSubscribeResponse>}
 */
export default class OnUpdateChatRoomsSubscriptionResolver extends BaseSubscriptionResolver {
  /** @override */
  static get schema () {
    return 'onUpdateChatRooms'
  }

  /** @override */
  generateChannelQuery ({
    context,
  }) {
    return {
      customerId: context.customerId,
    }
  }
}

/**
 * @typedef {{}} OnUpdateChatRoomsSubscribeVariables
 */

/**
 * @typedef {{
 *   onUpdateChatRooms: {
 *     rooms: Array<{
 *       id: number
 *       name: string
 *     }>
 *   }
 * }} OnUpdateChatRoomsSubscribeResponse
 */
