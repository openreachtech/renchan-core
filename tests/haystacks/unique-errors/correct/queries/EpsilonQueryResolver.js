import BaseQueryResolver from '../../../../../lib/server/graphql/resolvers/BaseQueryResolver'

export default class EpsilonQueryResolver extends BaseQueryResolver {
  /** @override */
  static get schema () {
    return 'epsilon'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,

      FifthError: '200.Q003.001',
      SixthError: '200.Q003.002',
      SeventhError: '200.Q003.003',
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
