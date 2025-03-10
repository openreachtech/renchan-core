import BaseQueryResolver from '../../../../../../../lib/server/graphql/resolvers/BaseQueryResolver.js'
import ChatMessage from '../../../../../../sequelize/models/ChatMessage.js'
import Customer from '../../../../../../sequelize/models/Customer.js'
import CustomerBasic from '../../../../../../sequelize/models/CustomerBasic.js'

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
    /** @type {Array<import('../../../../../../sequelize/models/ChatMessage.js').ChatMessageAssociatedEntity>} */
    const chatMessageEntities = /** @type {Array<*>} */ (
      await ChatMessage.findAll({
        where: {
          ChatRoomId: roomId,
        },
        include: [
          {
            model: Customer,
            include: [
              CustomerBasic,
            ],
          },
        ],
        order: [
          ['postedAt', 'DESC'],
        ],
      })
    )

    const messages = chatMessageEntities
      .map(({
        id,
        content,
        CustomerId,
        postedAt,
        Customer: {
          CustomerBasic: {
            username,
          },
        },
      }) => ({
        id,
        content,
        sender: `${username} [${CustomerId}]`,
      }))

    return {
      messages,
    }
  }
}
