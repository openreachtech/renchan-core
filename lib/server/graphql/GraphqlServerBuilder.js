import {
  createRequire,
} from 'module'
const require = createRequire(import.meta.url)

import http from 'http'

import {
  WebSocketServer,
} from 'ws'

import express from 'express'

const {
  default: expressPlayground,
} = require('graphql-playground-middleware-express')

import {
  execute,
  subscribe,
} from 'graphql'

import {
  useServer,
} from 'graphql-ws/lib/use/ws'

import MiddlewareExpressRoute from '../express/routes/MiddlewareExpressRoute.js'
import GetMethodExpressRoute from '../express/routes/GetMethodExpressRoute.js'
import GraphqlHttpHandlerBuilder from './GraphqlHttpHandlerBuilder.js'

/**
 * GraphQL server builder.
 */
export default class GraphqlServerBuilder {
  /**
   * Constructor.
   *
   * @param {GraphqlServerBuilderParams} params - Parameters of this constructor.
   */
  constructor ({
    engine,
    graphqlHandlerBuilder,
    app,
  }) {
    this.engine = engine
    this.graphqlHandlerBuilder = graphqlHandlerBuilder
    this.app = app
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof GraphqlServerBuilder ? X : never} T, X
   * @param {GraphqlServerBuilderFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    engine,
    graphqlHandlerBuilder,
    app = this.createExpressApplication(),
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        engine,
        graphqlHandlerBuilder,
        app,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof GraphqlServerBuilder ? X : never} T, X
   * @param {GraphqlServerBuilderAsyncFactoryParams} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    Engine,
  }) {
    const engine = await Engine.createAsync()

    const graphqlHandlerBuilder = await this.GraphqlHttpHandlerBuilder
      .createAsync({
        engine,
      })

    return this.create({
      engine,
      graphqlHandlerBuilder,
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
   * @template {X extends typeof GraphqlServerBuilder ? X : never} T, X
   * @returns {T} - Constructor.
   */
  get Ctor () {
    return /** @type {T} */ (this.constructor)
  }

  /**
   * get: Environment.
   *
   * @returns {renchan.RenchanEnv} - Environment.
   */
  get env () {
    return this.engine.env
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
   * @returns {GraphqlType.Config} - Configuration.
   */
  get config () {
    return this.engine.config
  }

  /**
   * get: GraphqlHttpHandlerBuilder class.
   *
   * @returns {typeof GraphqlHttpHandlerBuilder} - GraphqlHttpHandlerBuilder class.
   */
  static get GraphqlHttpHandlerBuilder () {
    return GraphqlHttpHandlerBuilder
  }

  /**
   * get: WebSocketServer class.
   *
   * @returns {typeof WebSocketServer} - WebSocketServer class.
   */
  static get WebSocketServer () {
    return WebSocketServer
  }

  /**
   * get: useServer function.
   *
   * @returns {typeof useServer} - useServer function.
   */
  static get useServerHandler () {
    return useServer
  }

  /**
   * Build GraphiQL route. (GraphiQL = GraphQL interactive development tool)
   *
   * @returns {ExpressType.Route} - Graphiql route.
   */
  createGraphiqlRoute () {
    const endpoint = this.config.graphqlEndpoint

    const handler = expressPlayground({
      endpoint,
    })

    const graphiqlEndpoint = endpoint.replace(/graphql/u, 'graphiql')

    return GetMethodExpressRoute.create({
      path: graphiqlEndpoint,
      handlers: [
        handler,
      ],
    })
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
    const graphqlHttpRoute = this.createGraphqlHttpRoute()

    const mountedApp = this.mountRouteToApp({
      routes: [
        ...middlewareRoutes,
        graphqlHttpRoute, // NOTE: Must add GraphQL HTTP Route after route of GraphiQL
      ],
    })

    const serverApp = this.buildServerRootApp({
      app: mountedApp,
    })

    const server = http.createServer(serverApp)

    this.setupServer({
      server,
    })

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

    const middlewareRoutes = MiddlewareExpressRoute.create({
      handlers,
    })

    if (this.env.isProduction()) {
      return [
        middlewareRoutes,
      ]
    }

    const graphiqlRoute = this.createGraphiqlRoute()

    return [
      middlewareRoutes,

      // NOTE: Graphiql は、開発時のみ有効にする。
      // 同一のエンドポイントにする場合は、GraphQL HTTP Route の前に置く。
      graphiqlRoute,
    ]
  }

  /**
   * Build GraphQL HTTP route.
   *
   * @returns {ExpressType.Route} - GraphQL HTTP route.
   */
  createGraphqlHttpRoute () {
    const path = this.config.graphqlEndpoint
    const handler = this.graphqlHandlerBuilder.buildHandler()

    return MiddlewareExpressRoute.create({
      path,
      handlers: [
        handler,
      ],
    })
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
   * Setup server on pre-listen.
   * ex: setup WebSocket server.
   *
   * @param {{
   *   server: renchan.HttpServer
   * }} params - Parameters.
   */
  setupServer ({
    server,
  }) {
    const endpoint = this.config.graphqlEndpoint

    const wsServer = new this.Ctor.WebSocketServer({
      server,
      path: endpoint, // same as graphqlHTTP path without protocol
    })

    const contextFactory = this.graphqlHandlerBuilder.context

    this.Ctor.useServerHandler(
      {
        execute,
        subscribe,
        context: contextFactory,
        schema: this.graphqlHandlerBuilder.schema,
      },
      wsServer
    )
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
    const endpoint = this.config.graphqlEndpoint

    return /** @type {*} */ ({
      __proto__: server,

      listen (port) {
        super.listen(
          port,
          () => {
            // eslint-disable-next-line no-console
            console.log(`Server is running on http://localhost:${port}${endpoint}`)
          }
        )
      },
    })
  }
}

/**
 * @typedef {{
 *   engine: GraphqlType.ServerEngine
 *   graphqlHandlerBuilder: GraphqlType.HttpHandlerBuilder
 *   app: ExpressType.Application
 * }} GraphqlServerBuilderParams
 */

/**
 * @typedef {{
 *   engine: GraphqlType.ServerEngine
 *   graphqlHandlerBuilder: GraphqlType.HttpHandlerBuilder
 *   app?: ExpressType.Application
 * }} GraphqlServerBuilderFactoryParams
 */

/**
 * @typedef {{
 *   Engine: GraphqlType.ServerEngineCtor
 * }} GraphqlServerBuilderAsyncFactoryParams
 */
