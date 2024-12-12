import ChatRoom from '../../../../../../sequelize/models/ChatRoom.js'

import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

export default class CreateChatRoomMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'createChatRoom'
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

    rooms.sort((alpha, beta) =>
      alpha.name.localeCompare(beta.name)
    )

    return {
      rooms,
    }
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
