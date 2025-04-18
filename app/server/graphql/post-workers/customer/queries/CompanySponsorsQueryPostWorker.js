import BaseGraphqlPostWorker from '../../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

const Timber = console

/**
 * SignIn Mutation Post Worker
 *
 * @extends {BaseGraphqlPostWorker<
 *   CompanySponsorsQueryPostWorkerVariables,
 *   CompanySponsorsQueryPostWorkerContext,
 *   CompanySponsorsQueryPostWorkerOutput
 * >}
 */
export default class CompanySponsorsQueryPostWorker extends BaseGraphqlPostWorker {
  /** @override */
  static get schema () {
    return 'companySponsors'
  }

  /**
   * On resolved hook.
   *
   * @override
   * @param {{
   *   variables: CompanySponsorsQueryPostWorkerVariables
   *   context: CompanySponsorsQueryPostWorkerContext
   *   information: GraphqlType.ResolverInputInformation
   *   response: {
   *     output: CompanySponsorsQueryPostWorkerOutput | null
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
    Timber.log('I am the post worker of CompanySponsors', {
      variables,
      output,
      error,
    })
  }
}

/**
 * @typedef {import('../../../resolvers/customer/actual/queries/CompanySponsorsQueryResolver.js').CompanySponsorsQueryResolverVariables} CompanySponsorsQueryPostWorkerVariables
 */

/**
 * @typedef {import('../../../contexts/CustomerGraphqlContext.js').default} CompanySponsorsQueryPostWorkerContext
 */

/**
 * @typedef {import('../../../resolvers/customer/actual/queries/CompanySponsorsQueryResolver.js').CompanySponsorsQueryResolverOutput} CompanySponsorsQueryPostWorkerOutput
 */
