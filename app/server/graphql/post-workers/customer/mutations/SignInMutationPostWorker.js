import BaseGraphqlPostWorker from '../../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

const Timber = console

/**
 * SignIn Mutation Post Worker
 *
 * @extends {BaseGraphqlPostWorker<
 *   SignInMutationPostWorkerVariables,
 *   SignInMutationPostWorkerContext,
 *   SignInMutationPostWorkerOutput
 * >}
 */
export default class SignInMutationPostWorker extends BaseGraphqlPostWorker {
  /** @override */
  static get schema () {
    return 'signIn'
  }

  /**
   * On resolved hook.
   *
   * @override
   * @param {{
   *   variables: SignInMutationPostWorkerVariables
   *   context: SignInMutationPostWorkerContext
   *   information: GraphqlType.ResolverInputInformation
   *   response: {
   *     output: SignInMutationPostWorkerOutput | null
   *     error: Error | null
   *   }
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async onResolved ({
    variables,
    context,
    information,
    response: {
      output,
      error,
    },
  }) {
    const accessToken = output?.accessToken

    Timber.log('I am the post worker of SignInMutation', {
      accessToken,
      variables,
      output,
      error,
    })
  }
}

/**
 * @typedef {import('../../../resolvers/customer/actual/mutations/SignInMutationResolver.js').SignInMutationResolverVariables} SignInMutationPostWorkerVariables
 */

/**
 * @typedef {import('../../../contexts/CustomerGraphqlContext.js').default} SignInMutationPostWorkerContext
 */

/**
 * @typedef {import('../../../resolvers/customer/actual/mutations/SignInMutationResolver.js').SignInMutationResolverOutput} SignInMutationPostWorkerOutput
 */
