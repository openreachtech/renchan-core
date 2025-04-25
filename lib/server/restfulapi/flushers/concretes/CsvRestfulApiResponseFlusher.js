import BaseRestfulApiResponseFlusher from '../BaseRestfulApiResponseFlusher.js'

/**
 * CSV RESTful API response flusher.
 */
export default class CsvRestfulApiResponseFlusher extends BaseRestfulApiResponseFlusher {
  /** @override */
  static get contentType () {
    return 'text/csv'
  }

  /** @override */
  flushResponseBody () {
    this.expressResponse.send(
      this.renderResponse.content
    )
  }
}
