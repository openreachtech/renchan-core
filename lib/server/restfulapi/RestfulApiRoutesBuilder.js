import DeepBulkClassLoader from '../../tools/DeepBulkClassLoader.js'
import HttpMethodExpressRoute from '../express/routes/HttpMethodExpressRoute.js'

import BaseRenderer from './renderers/BaseRenderer.js'
import RestfulApiRequest from './interfaces/RestfulApiRequest.js'
import RestfulApiResponse from './interfaces/RestfulApiResponse.js'

/**
 * Restful API routes builder.
 */
export default class RestfulApiRoutesBuilder {
  /**
   * Constructor.
   *
   * @param {RestfulApiRoutesBuilderParams} params - Parameters of this constructor.
   */
  constructor ({
    engine,
    renderers,
  }) {
    this.engine = engine
    this.renderers = renderers
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof RestfulApiRoutesBuilder ? X : never} T, X
   * @param {RestfulApiRoutesBuilderFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    engine,
    renderers,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        engine,
        renderers,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof RestfulApiRoutesBuilder ? X : never} T, X
   * @param {RestfulApiRoutesBuilderAsyncFactoryParams} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    engine,
  }) {
    const renderers = await this.createRenderers({
      engine,
    })

    return this.create({
      engine,
      renderers,
    })
  }

  /**
   * Create renderers.
   *
   * @param {{
   *   engine: RestfulApiType.ServerEngine
   * }} params - Parameters of this method.
   * @returns {Promise<Array<RestfulApiType.Renderer>>} - Array of Renderer instance.
   */
  static async createRenderers ({
    engine,
  }) {
    const rendererClasses = await this.loadRenderers({
      poolPath: engine.config.renderersPath,
    })

    return Promise.all(
      rendererClasses.map(
        async Renderer => Renderer.createAsync()
      )
    )
  }

  /**
   * Load renderers.
   *
   * @param {{
   *   poolPath: string
   * }} params - Parameters of this method.
   * @returns {Promise<Array<RestfulApiType.RendererCtor>>} - Array of Renderer instance.
   */
  static async loadRenderers ({
    poolPath,
  }) {
    const loader = this.createClassLoader({
      poolPath,
    })

    return /** @type {Promise<Array<typeof BaseRenderer>>} */ (
      loader.loadClasses({
        filterFunc: it => it.prototype instanceof BaseRenderer,
      })
    )
  }

  /**
   * Create class loader.
   *
   * @param {{
   *   poolPath: string
   * }} params - Parameters of this method.
   * @returns {DeepBulkClassLoader} - Class loader.
   */
  static createClassLoader ({
    poolPath,
  }) {
    return DeepBulkClassLoader.create({
      poolPath,
    })
  }

  /**
   * get: Config.
   *
   * @returns {RestfulApiType.Config} - Config.
   */
  get config () {
    return this.engine.config
  }

  /**
   * Build routes.
   *
   * @returns {Array<ExpressType.Route>} - Array of Express route.
   * @public
   */
  buildRoutes () {
    const filterHandler = this.generateFilterHandler()

    return this.renderers
      .map(it => {
        const renderHandler = this.generateRendererHandler({
          renderer: it,
          filterHandler,
        })

        const fullPath = this.resolveRoutePath({
          path: it.routePath,
        })

        return HttpMethodExpressRoute.create({
          method: it.method,
          path: fullPath,
          handlers: [
            renderHandler,
          ],
        })
      })
  }

  /**
   * Filter render.
   *
   * @returns {(args: RestfulApiType.RenderInput<*, *>) => Promise<RestfulApiType.RenderResponse | null>} - Filter handler.
   */
  generateFilterHandler () {
    const filterHandler = this.engine.generateFilterHandler()

    if (!filterHandler) {
      return async () => null
    }

    return async args => filterHandler(args)
  }

  /**
   * Generate render handler per renderer.
   *
   * @param {{
   *   renderer: RestfulApiType.Renderer
   *   filterHandler: (args: RestfulApiType.RenderInput<*, *>) => Promise<RestfulApiType.RenderResponse | null>
   * }} params - Parameters of this method.
   * @returns {ExpressType.Middleware} - Express route handler.
   */
  generateRendererHandler ({
    renderer,
    filterHandler,
  }) {
    const filter = renderer.passesFilter
      ? async () => null
      : filterHandler

    const render = async input => renderer.render(input)

    /*
     * proxy render
     */
    const exceptionProxyRender = this.generateExceptionProxyRender({
      filter,
      render,
    })

    return async (req, res, next) => {
      const response = await exceptionProxyRender({
        expressRequest: req,
      })

      this.flushResponse({
        expressResponse: res,
        response,
      })
    }
  }

  /**
   * Resolve route path.
   *
   * @param {{
   *   path: string
   * }} params - Parameters of this method.
   * @returns {string} - Route path.
   */
  resolveRoutePath ({
    path,
  }) {
    const prefix = this.config.pathPrefix

    if (!prefix) {
      return path
    }

    return `${prefix}${path}`
  }

  /**
   * Generate context factory.
   *
   * @returns {(args: {
   *   expressRequest: ExpressType.Request
   *   engine: RestfulApiType.ServerEngine
   * }) => Promise<RestfulApiType.Context>} - RESTful API context factory.
   */
  generateContextFactory () {
    const ContextCtor = this.engine
      .Ctor
      .Context

    return async ({
      expressRequest,
    }) => ContextCtor.createAsync({
      expressRequest,
      engine: this.engine,
    })
  }

  /**
   * Generate exception proxy render.
   *
   * @param {{
   *   filter: (args: RestfulApiType.RenderInput<*, *>) => Promise<RestfulApiType.RenderResponse | null>
   *   render: (args: RestfulApiType.RenderInput<*, *>) => Promise<RestfulApiType.RenderResponse>
   * }} params - Parameters of this method.
   * @returns {(args: {
   *   expressRequest: ExpressType.Request
   * }) => Promise<RestfulApiType.RenderResponse>} - Exception proxy render.
   */
  generateExceptionProxyRender ({
    filter,
    render,
  }) {
    const contextFactory = this.generateContextFactory()

    return async ({
      expressRequest,
    }) => {
      try {
        const input = await this.generateRenderInput({
          expressRequest,
          contextFactory,
        })

        const errorResponse = await filter(input)

        if (errorResponse) {
          return errorResponse
        }

        const response = await render(input)

        return response
      } catch (error) {
        return this.createUnknownErrorResponse({
          error,
        })
      }
    }
  }

  /**
   * Create unknown error response.
   *
   * @param {{
   *   error: Error
   * }} params - Parameters of this method.
   * @returns {RestfulApiType.RenderResponse} - Render response.
   */
  createUnknownErrorResponse ({
    error,
  }) {
    const resolvedErrorMessage = this.engine.passesThoughError()
      ? error.message
      : 'Unknown Error'

    return RestfulApiResponse.createAsError({
      statusCode: 500,
      errorMessage: resolvedErrorMessage,
    })
  }

  /**
   * Generate render input.
   *
   * @param {{
   *   expressRequest: ExpressType.Request
   *   contextFactory: (args: {
   *     expressRequest: ExpressType.Request
   *     engine: RestfulApiType.ServerEngine
   *   }) => Promise<RestfulApiType.Context>
   * }} params - Parameters of this method.
   * @returns {Promise<RestfulApiType.RenderInput<*, *>>} - Render input.
   */
  async generateRenderInput ({
    expressRequest,
    contextFactory,
  }) {
    const request = this.createRestfulApiRequest({
      expressRequest,
    })

    const context = await contextFactory({
      expressRequest,
      engine: this.engine,
    })

    return {
      body: expressRequest.body,
      query: expressRequest.query,
      context,
      request,
    }
  }

  /**
   * Create RESTful API request.
   *
   * @param {{
   *   expressRequest: ExpressType.Request
   * }} params - Parameters of this method.
   * @returns {RestfulApiRequest} - RESTful API request.
   */
  createRestfulApiRequest ({
    expressRequest,
  }) {
    return RestfulApiRequest.create({
      expressRequest,
    })
  }

  /**
   * Flush response.
   *
   * @param {{
   *   expressResponse: import('express').Response
   *   response: RestfulApiType.RenderResponse
   * }} params - Parameters of this method.
   * @returns {void} - Nothing.
   */
  flushResponse ({
    expressResponse,
    response,
  }) {
    const json = response.toJson()

    expressResponse.status(response.status)
      .json(json)
  }
}

/**
 * @typedef {{
 *   engine: RestfulApiType.ServerEngine
 *   renderers: Array<RestfulApiType.Renderer>
 * }} RestfulApiRoutesBuilderParams
 */

/**
 * @typedef {RestfulApiRoutesBuilderParams} RestfulApiRoutesBuilderFactoryParams
 */

/**
 * @typedef {{
 *   engine: RestfulApiType.ServerEngine
 * }} RestfulApiRoutesBuilderAsyncFactoryParams
 */
