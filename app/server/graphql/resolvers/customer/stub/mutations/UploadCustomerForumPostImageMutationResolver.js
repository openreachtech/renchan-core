import {
  setTimeout as sleep,
} from 'timers/promises'

import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

export default class UploadCustomerForumPostImageMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'uploadCustomerForumPostImage'
  }

  /** @override */
  async resolve () {
    await sleep(300)

    return {
      imageUrl: 'http://openreach.tech/avatar-url/200.png',
    }
  }
}
