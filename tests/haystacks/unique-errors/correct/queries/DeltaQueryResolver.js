import BaseQueryResolver from '../../../../../lib/server/graphql/resolvers/BaseQueryResolver'

export default class DeltaQueryResolver extends BaseQueryResolver {
  /** @override */
  static get schema () {
    return 'delta'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,

      ThirdError: '200.Q002.001',
      FourthError: '200.Q002.002',
    }
  }

  /** @override */
  async resolve ({
    variables: {
      input: {
        value,
      },
    },
  }) {
    return {
      result: null,
    }
  }
}
