import BaseMutationResolver from '../../../../../lib/server/graphql/resolvers/BaseMutationResolver'

export default class AlphaMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'alpha'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,

      FirstError: '200.M001.001',
      SecondError: '200.M001.002',
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
