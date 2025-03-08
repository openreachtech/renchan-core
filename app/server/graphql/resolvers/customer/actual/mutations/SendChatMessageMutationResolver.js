import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

import ChatMessage from '../../../../../../sequelize/models/ChatMessage.js'
import OnReceiveMessageSubscriptionResolver from '../subscriptions/OnReceiveMessageSubscriptionResolver.js'

export default class SendChatMessageMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'sendChatMessage'
  }

  /** @override */
  async resolve ({
    variables: {
      input: {
        chatRoomId,
        customerId,
        content,
      },
    },
    context,
  }) {
    const attributeHash = {
      ChatRoomId: chatRoomId,
      CustomerId: customerId,
      content,
      postedAt: context.now,
    }

    /** @type {import('../../../../../../sequelize/models/ChatMessage.js').ChatMessageEntity | null} */
    const result = /** @type {*} */ (
      await ChatMessage.create(attributeHash)
    )

    const message = {
      id: result.id,
      content,
      sender: `[${customerId}]`,
    }

    await this.broadcastChatMessage({
      context,
      payload: {
        message,
      },
      channelQuery: {
        roomId: chatRoomId,
      },
    })

    return {
      message,
    }
  }

  /**
   * Broadcast chat message.
   *
   * @param {{
   *   context: GraphqlType.Context
   *   payload: {
   *     message: {
   *       id: number
   *       content: string
   *       sender: string
   *     }
   *   }
   *   channelQuery: {
   *     roomId: number
   *   }
   * }} params - Parameters.
   * @returns {Promise<void>} - Returns nothing.
   */
  async broadcastChatMessage ({
    context,
    payload,
    channelQuery,
  }) {
    return OnReceiveMessageSubscriptionResolver.publishTopic({
      context,
      payload,
      channelQuery,
    })
  }
}
