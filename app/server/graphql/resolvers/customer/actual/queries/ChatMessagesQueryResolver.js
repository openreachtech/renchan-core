import BaseQueryResolver from '../../../../../../../lib/server/graphql/resolvers/BaseQueryResolver.js'
import ChatMessage from '../../../../../../sequelize/models/ChatMessage.js'

export default class ChatMessagesQueryResolver extends BaseQueryResolver {
  /** @override */
  static get schema () {
    return 'chatMessages'
  }

  /** @override */
  async resolve ({
    variables: {
      input: {
        roomId,
      },
    },
    context,
  }) {
    /** @type {Array<import('../../../../../../sequelize/models/ChatMessage.js').ChatMessageEntity>} */
    const chatMessageEntities = /** @type {Array<*>} */ (
      await ChatMessage.findAll({
        where: {
          RoomId: roomId,
        },
      })
    )

    const messages = chatMessageEntities
      .map(({
        id,
        content,
        sender,
      }) => ({
        id,
        content,
        sender,
      }))

    return {
      messages,
    }
  }
}
