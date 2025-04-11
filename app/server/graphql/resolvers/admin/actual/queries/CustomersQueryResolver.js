import BaseQueryResolver from '../../../../../../../lib/server/graphql/resolvers/BaseQueryResolver.js'

export default class CustomersQueryResolver extends BaseQueryResolver {
  /** @override */
  static get schema () {
    return 'customers'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,
    }
  }

  /** @override */
  async resolve () {
    return [
      {
        id: 100,
        name: 'actual 01 John Doe',
        inviteCode: 'actual0123',
      },
      {
        id: 101,
        name: 'actual 02 John Doe',
        inviteCode: 'actual0124',
      },
      {
        id: 102,
        name: 'actual 03 John Doe',
        inviteCode: 'actual0125',
      },
    ]
  }
}
