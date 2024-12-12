import {
  setTimeout as sleep,
} from 'timers/promises'

import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

export default class SignUpMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'signUp'
  }

  /** @override */
  async resolve ({
    variables: {
      input: {
        email = 'extra@example.com',
        username = 'extra',
        firstName = 'John',
        lastName = 'Doe',
        password = 'p@ssw0rd',
      } = {},
    },
  }) {
    await sleep(500)

    return {
      sentTo: email,
    }
  }
}
