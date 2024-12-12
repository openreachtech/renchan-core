import BaseQueryResolver from '../../../../../../../lib/server/graphql/resolvers/BaseQueryResolver.js'

export default class CustomersQueryResolver extends BaseQueryResolver {
  /** @override */
  static get schema () {
    return 'customers'
  }

  /** @override */
  async resolve () {
    return [
      {
        id: 200,
        name: 'stub 01 John Doe',
        inviteCode: 'stub0123',
      },
      {
        id: 201,
        name: 'stub 02 John Doe',
        inviteCode: 'stub0124',
      },
      {
        id: 202,
        name: 'stub 03 John Doe',
        inviteCode: 'stub0125',
      },
    ]
  }
}
