import BaseMutationResolver from '../../../../../lib/server/graphql/resolvers/BaseMutationResolver'

export default class AlphaMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'beta'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,

      ThirdError: '200.M002.001',
      FourthError: '200.M002.002',
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
