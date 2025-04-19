import BaseGraphqlPostWorker from '../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

/**
 * SignIn Mutation Post Worker
 *
 * @extends {BaseGraphqlPostWorker<
 *   CompanySponsorsQueryPostWorkerVariables,
 *   GraphqlType.Context,
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
   *   context: GraphqlType.Context
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
    // noop
  }
}

/**
 * @typedef {{}} CompanySponsorsQueryPostWorkerVariables
 */

/**
 * @typedef {{
 *   companySponsors: Array<{
 *     id: number
 *     registeredAt: Date
 *     companyName: string
 *     companyDescription: string
 *     companySponsorHomepage: string
 *     companySponsorLogo: string
 *   }>
 * }} CompanySponsorsQueryPostWorkerOutput
 */
