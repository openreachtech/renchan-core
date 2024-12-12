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
        roomId,
        content,
        sender,
      },
    },
    context,
  }) {
    const attributeHash = {
      content,
      sender,
      RoomId: roomId,
    }

    /** @type {import('../../../../../../sequelize/models/ChatMessage.js').ChatMessageEntity | null} */
    const result = /** @type {*} */ (
      await ChatMessage.create(attributeHash)
    )

    const message = {
      id: result.id,
      content,
      sender,
    }

    const topic = OnReceiveMessageSubscriptionResolver.buildTopic({
      payload: {
        message,
      },
      channelQuery: {
        roomId,
      },
    })

    await this.publishTopic({
      context,
      topic,
    })

    return {
      message,
    }
  }
}
