import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'

/**
 * GraphQL upload express with resolving content type.
 *
 * @param {Parameters<graphqlUploadExpress>[0]} options - Options.
 * @returns {ExpressType.Middleware} Middleware.
 */
export default function graphqlUploadExpressWithResolvingContentType (options) {
  const originalMiddleware = graphqlUploadExpress(options)

  return (
    req,
    res,
    next
  ) => {
    return originalMiddleware(
      req,
      res,
      customNext
    )

    /**
     * @returns {void}
     */
    function customNext () {
      if (req.is('multipart/form-data')) {
        // eslint-disable-next-line no-param-reassign
        req.headers['content-type'] = 'application/json'
      }

      next()
    }
  }
}
