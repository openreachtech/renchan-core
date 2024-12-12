import BaseQueryResolver from '../../../../../lib/server/graphql/resolvers/BaseQueryResolver'

export default class GammaQueryResolver extends BaseQueryResolver {
  /** @override */
  static get schema () {
    return 'gamma'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,

      FirstError: '200.Q001.001',
      SecondError: '200.Q001.002',
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
