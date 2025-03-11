import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

import ChatMessage from '../../../../../../sequelize/models/ChatMessage.js'
import OnObserveChatStatesSubscriptionResolver from '../subscriptions/OnObserveChatStatesSubscriptionResolver.js'

export default class SendChatMessageMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'sendChatMessage'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,

      FailToSave: '204.M010.001',
    }
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

    const callback = await this.generateTransactionCallback({
      attributeHash,
    })

    /** @type {import('../../../../../../sequelize/models/ChatMessage.js').ChatMessageEntity | null} */
    const result = await ChatMessage.beginTransaction(callback)

    if (!result) {
      throw new this.Error.FailToSave()
    }

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
   * Generate transaction callback.
   *
   * @param {{
   *   attributeHash,
   * }} params
   * @returns {function(): Promise<import('../../../../../../sequelize/models/ChatMessage.js').ChatMessageEntity>} - Returns transaction callback.
   */
  generateTransactionCallback ({
    attributeHash,
  }) {
    const chatMessageEntity = ChatMessage.build(attributeHash)

    return async transaction => /** @type {*} */ (
      chatMessageEntity.save({
        transaction,
      })
    )
  }

  /**
   * Broadcast chat message.
   *
   * @param {{
   *   context: GraphqlType.Context
   *   channelQuery: {
   *     roomId: number
   *   }
   * }} params - Parameters.
   * @returns {Promise<void>} - Returns nothing.
   */
  async broadcastChatMessage ({
    context,
    channelQuery,
  }) {
    await OnObserveChatStatesSubscriptionResolver.publishTopic({
      context,
      payload: {
        hasUnreadMessages: true,
        isUpdatedRooms: false,
        isUpdatedMembers: false,
      },
      channelQuery: {
        chatRoomId: channelQuery.roomId,
      },
    })

    return Promise.resolve()
  }
}
