import BaseQueryResolver from '../../../../../../../lib/server/graphql/resolvers/BaseQueryResolver.js'

export default class MessagesQueryResolver extends BaseQueryResolver {
  /** @override */
  static get schema () {
    return 'messages'
  }

  /** @override */
  async resolve () {
    return [
      {
        customerId: 1000,
        message: 'actual resolved message 01!',
      },
      {
        customerId: 1001,
        message: 'actual resolved message 02!',
      },
      {
        customerId: 1002,
        message: 'actual resolved message 03!',
      },
    ]
  }
}
