import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

export default class SignInMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'signIn'
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
      accessToken: 'stub-access-token-0001',
      customer: {
        id: 50001,
        name: 'Stub John Doe',
        inviteCode: 'stub0123',
      },
    }
  }
}
