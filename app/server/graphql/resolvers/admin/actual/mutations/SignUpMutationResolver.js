import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

/**
 * Sign up mutation resolver.
 */
export default class SignUpMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'signUp'
  }

  /** @override */
  async resolve () {
    return {
      accessToken: 'actual-access-token-0002',
      admin: {
        id: 10002,
        name: 'Actual admin',
      },
    }
  }
}
