import BaseRestfulApiResponseFlusher from '../BaseRestfulApiResponseFlusher.js'

/**
 * HTML RESTful API response flusher.
 */
export default class HtmlRestfulApiResponseFlusher extends BaseRestfulApiResponseFlusher {
  /** @override */
  static get contentType () {
    return 'text/html'
  }

  /** @override */
  flushResponseBody () {
    this.expressResponse.send(
      this.renderResponse.content
    )
  }
}
