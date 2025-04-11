import BaseQueryResolver from '../../../../../../../lib/server/graphql/resolvers/BaseQueryResolver.js'

import ChatRoom from '../../../../../../sequelize/models/ChatRoom.js'

export default class ChatRoomsQueryResolver extends BaseQueryResolver {
  /** @override */
  static get schema () {
    return 'chatRooms'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,
    }
  }

  /** @override */
  async resolve ({
    context,
  }) {
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
}
