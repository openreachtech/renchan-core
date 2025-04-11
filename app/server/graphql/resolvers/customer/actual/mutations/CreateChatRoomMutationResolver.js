import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

import OnUpdateChatRoomsSubscriptionResolver from '../subscriptions/OnUpdateChatRoomsSubscriptionResolver.js'

import ChatRoom from '../../../../../../sequelize/models/ChatRoom.js'

export default class CreateChatRoomMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'createChatRoom'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,
    }
  }

  /** @override */
  async resolve ({
    variables: {
      input: {
        name,
      },
    },
    context,
  }) {
    await ChatRoom.findOrCreate({
      where: {
        name,
      },
    })

    /**
     * @type {Array<import('../../../../../../sequelize/models/ChatRoom').ChatRoomEntity>}
     */
    const chatRoomEntries = /** @type {Array<*>} */ (
      await ChatRoom.findAll()
    )

    const rooms = chatRoomEntries
      .map(({
        id,
        name,
      }) => ({
        id,
        name,
      }))

    rooms.toSorted((alpha, beta) =>
      alpha.name.localeCompare(beta.name)
    )

    await this.broadcastChatRooms({
      context,
      rooms,
    })

    return {
      rooms,
    }
  }

  /**
   * Broadcast notification.
   *
   * @param {{
   *   context: GraphqlType.Context
   *   rooms: Array<{
   *     id: number
   *     name: string
   *   }>
   * }} params - Parameters.
   * @returns {Promise<void>} - Returns nothing.
   */
  broadcastChatRooms ({
    context,
    rooms,
  }) {
    const payload = {
      rooms,
    }

    return OnUpdateChatRoomsSubscriptionResolver.publishTopic({
      context,
      payload,
    })
  }

  /**
   * Format the response.
   *
   * @param {{
   *   chatRoomEntries: Array<import('../../../../../../sequelize/models/ChatRoom').ChatRoomEntity>
   * }} params - Parameters.
   * @returns {{
   *   rooms: Array<{
   *     id: number
   *     name: string
   *   }>
   * }} The formatted response.
   */
  formatResponse ({
    chatRoomEntries,
  }) {
    const rooms = chatRoomEntries
      .map(({
        id,
        name,
      }) => ({
        id,
        name,
      }))

    rooms.sort((alpha, beta) =>
      alpha.name.localeCompare(beta.name)
    )

    return {
      rooms,
    }
  }
}
