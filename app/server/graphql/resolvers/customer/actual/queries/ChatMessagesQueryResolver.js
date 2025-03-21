import {
  Op,
} from 'sequelize'

import BaseQueryResolver from '../../../../../../../lib/server/graphql/resolvers/BaseQueryResolver.js'
import ChatMessage from '../../../../../../sequelize/models/ChatMessage.js'
import Customer from '../../../../../../sequelize/models/Customer.js'
import CustomerBasic from '../../../../../../sequelize/models/CustomerBasic.js'

/**
 * Chat messages query resolver.
 */
export default class ChatMessagesQueryResolver extends BaseQueryResolver {
  /** @override */
  static get schema () {
    return 'chatMessages'
  }

  /** @override */
  async resolve ({
    variables: {
      input: {
        chatRoomId,
        offsetDateTime = null,
        fetchDirection = 'after',
        limit = null,
      },
    },
    context,
  }) {
    const whereClause = this.generateWhereClause({
      offsetDateTime,
      fetchDirection,
    })

    /** @type {Array<import('../../../../../../sequelize/models/ChatMessage.js').ChatMessageAssociatedEntity>} */
    const chatMessageEntities = /** @type {Array<*>} */ (
      await ChatMessage.findAll({
        where: {
          ...whereClause,

          ChatRoomId: chatRoomId,
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
          ['postedAt', 'ASC'],
        ],
        limit,
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
        postedAt,
        content,
        sender: `${username} [${CustomerId}]`,
      }))

    return {
      messages,
    }
  }

  /**
   * Generate where clause.
   *
   * @param {{
   *   offsetDateTime: Date
   *   fetchDirection: string
   * }} options - Options.
   * @returns {{
   *   [key: string]: *
   * }} - Where clause.
   */
  generateWhereClause ({
    offsetDateTime,
    fetchDirection,
  }) {
    if (!offsetDateTime) {
      return {}
    }

    const operator = fetchDirection === 'after'
      ? Op.gte
      : Op.lte

    return {
      postedAt: {
        [operator]: offsetDateTime,
      },
    }
  }
}
