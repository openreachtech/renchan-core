import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

export default class SignUpMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'signUp'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,
    }
  }

  /** @override */
  async resolve () {
    return {
      accessToken: 'stub-access-token-0002',
      admin: {
        id: 50002,
        name: 'Stub admin',
      },
    }
  }
}
