import http from 'http'

import express from 'express'

import RestfulApiRoutesBuilder from './RestfulApiRoutesBuilder.js'
import MiddlewareExpressRoute from '../express/routes/MiddlewareExpressRoute.js'

/**
 * Restful API server builder.
 */
export default class RestfulApiServerBuilder {
  /**
   * Constructor.
   *
   * @param {RestfulApiServerBuilderParams} params - Parameters of this constructor.
   */
  constructor ({
    engine,
    routesBuilder,
    app,
  }) {
    this.engine = engine
    this.routesBuilder = routesBuilder
    this.app = app
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof RestfulApiServerBuilder ? X : never} T, X
   * @param {RestfulApiServerBuilderFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    engine,
    routesBuilder,
    app = this.createExpressApplication(),
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        engine,
        routesBuilder,
        app,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof RestfulApiServerBuilder ? X : never} T, X
   * @param {RestfulApiServerBuilderAsyncFactoryParams} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    Engine,
  }) {
    const engine = await Engine.createAsync()

    const routesBuilder = await this.RestfulApiRoutesBuilder
      .createAsync({
        engine,
      })

    return this.create({
      engine,
      routesBuilder,
    })
  }

  /**
   * Create Express application.
   *
   * @returns {ExpressType.Application} - Express application.
   */
  static createExpressApplication () {
    return express()
  }

  /**
   * get: Constructor.
   *
   * @template {X extends typeof RestfulApiServerBuilder ? X : never} T, X
   * @returns {T} - Constructor.
   */
  get Ctor () {
    return /** @type {T} */ (this.constructor)
  }

  /**
   * Collect middleware.
   *
   * @returns {Array<ExpressType.Middleware>} Array of Express middleware.
   */
  collectMiddleware () {
    return this.engine.collectMiddleware()
  }

  /**
   * get: Configuration.
   *
   * @returns {RestfulApiType.Config} - Configuration.
   */
  get config () {
    return this.engine.config
  }

  /**
   * get: RestfulApiRoutesBuilder class.
   *
   * @returns {typeof RestfulApiRoutesBuilder} - RestfulApiRoutesBuilder class.
   */
  static get RestfulApiRoutesBuilder () {
    return RestfulApiRoutesBuilder
  }

  /**
   * Build HTTP server.
   *
   * @returns {renchan.HttpServer} - HTTP server instance.
   * @public
   * @example
   * ```js
   * const server = DerivedRenchanServer.create()
   *   .buildHttpServer()
   *   .listen(
   *     3000,
   *     () => {
   *       console.log('Server started')
   *     }
   *   )
   * ```
   */
  buildHttpServer () {
    const middlewareRoutes = this.collectExpressRoutes()
    const rendererRoute = this.collectRendererRoutes()

    const mountedApp = this.mountRouteToApp({
      routes: [
        ...middlewareRoutes,
        ...rendererRoute,
      ],
    })

    const serverApp = this.buildServerRootApp({
      app: mountedApp,
    })

    const server = http.createServer(serverApp)

    return this.buildListenProxyServer({
      server,
    })
  }

  /**
   * Collect Express routes.
   *
   * @returns {Array<ExpressType.Route>} - Array of Express routes.
   */
  collectExpressRoutes () {
    const handlers = this.collectMiddleware()

    return [
      MiddlewareExpressRoute.create({
        handlers,
      }),
    ]
  }

  /**
   * Compose renderer routes.
   *
   * @returns {Array<ExpressType.Route>} - Array of Express routes.
   */
  collectRendererRoutes () {
    return this.routesBuilder.buildRoutes()
  }

  /**
   * Build Express application to mount middleware via routes.
   *
   * @param {{
   *   routes: Array<ExpressType.Route>
   * }} params - Parameters.
   * @returns {ExpressType.Application} - Express application.
   */
  mountRouteToApp ({
    routes,
  }) {
    return routes.reduce(
      (app, route) => route.mountTo({
        app,
      }),
      this.app
    )
  }

  /**
   * Build server root app.
   * When want to use app('/v1', subApp), override this method.
   *
   * @param {{
   *   app: ExpressType.Application
   * }} params - Parameters.
   * @returns {ExpressType.Application} - Express application.
   * @example
   * ```js
   * buildServerRootApp ({ app }) {
   *   return express()
   *     .use('/v1', app)
   * }
   * ```
   */
  buildServerRootApp ({
    app,
  }) {
    return app
  }

  /**
   * Build proxy server to override server#listen().
   *
   * @param {{
   *   server: renchan.HttpServer
   * }} params - Parameters.
   * @returns {renchan.HttpServer} - Proxy server.
   */
  buildListenProxyServer ({
    server,
  }) {
    return /** @type {*} */ ({
      __proto__: server,

      listen (port) {
        super.listen(
          port,
          () => {
            // eslint-disable-next-line no-console
            console.log(`Server is running on http://localhost:${port}/v1/`)
          }
        )
      },
    })
  }
}

/**
 * @typedef {{
 *   engine: RestfulApiType.ServerEngine
 *   routesBuilder: RestfulApiRoutesBuilder
 *   app: ExpressType.Application
 * }} RestfulApiServerBuilderParams
 */

/**
 * @typedef {{
 *   engine: RestfulApiType.ServerEngine
 *   routesBuilder: RestfulApiRoutesBuilder
 *   app?: ExpressType.Application
 * }} RestfulApiServerBuilderFactoryParams
 */

/**
 * @typedef {{
 *   Engine: RestfulApiType.ServerEngineCtor
 * }} RestfulApiServerBuilderAsyncFactoryParams
 */
