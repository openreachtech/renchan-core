import BaseQueryResolver from '../../../../../../../lib/server/graphql/resolvers/BaseQueryResolver.js'

export default class AssetsQueryResolver extends BaseQueryResolver {
  /** @override */
  static get schema () {
    return 'assets'
  }

  /** @override */
  async resolve () {
    return [
      {
        customerId: 100100,
        stakedAmount: '10000.11223344',
        rewardsAmount: '10.99887766',
      },
      {
        customerId: 100200,
        stakedAmount: '20000.11223344',
        rewardsAmount: '20.99887766',
      },
      {
        customerId: 100300,
        stakedAmount: '30000.11223344',
        rewardsAmount: '30.99887766',
      },
    ]
  }
}
