import type {
  GraphQLResolveInfo,
  GraphQLSchema,
  GraphQLScalarType,
} from 'graphql'

import type {
  RequestParams,
} from 'graphql-http'

import type {
  RedisOptions as RedisOptionsActual,
} from 'ioredis'

import BaseGraphqlServerEngine from '../lib/server/graphql/BaseGraphqlServerEngine'

import GraphqlHttpHandlerBuilder from '../lib/server/graphql/GraphqlHttpHandlerBuilder'
import BaseGraphqlContext from '../lib/server/graphql/contexts/BaseGraphqlContext'
import BaseGraphqlShare from '../lib/server/graphql/contexts/BaseGraphqlShare'
import GraphqlVisa from '../lib/server/graphql/contexts/GraphqlVisa'
import RenchanGraphqlError from '../lib/server/graphql/errors/RenchanGraphqlError'
import BaseResolver from '../lib/server/graphql/resolvers/BaseResolver'

import BaseScalar from '../lib/server/graphql/scalars/BaseScalar'

import SubscriptionBroker from '../lib/server/graphql/subscription/SubscriptionBroker'
import TopicReceiver from '../lib/server/graphql/subscription/TopicReceiver'
import BasePubSub from '../lib/server/graphql/subscription/pubsub/BasePubSub'
import { default as EventHubActual } from '../lib/server/graphql/subscription/pubsub/tools/EventHub'

import { default as FileContentReaderActual } from '../lib/tools/FileContentReader'

/**
 * Renchan GraphQL types
 */
declare global {
  namespace GraphqlType {
    type RedisOptions = RedisOptionsActual

    type ServerEngine = BaseGraphqlServerEngine
    type ServerEngineCtor = typeof BaseGraphqlServerEngine

    namespace Engine {
      interface skipSchemaHash {
        allowedSchemas?: Array<string> | null
        ignoredSchemas?: Array<string> | null
      }

      interface visaIssuers {
        hasAuthenticated?: (args: VisaIssuerParams) => Promise<boolean>
        hasAuthorized?: (args: VisaIssuerParams) => Promise<boolean>
        generateSchemaPermissionHash?: (args: VisaIssuerParams) => Promise<Record<string, boolean> | null>
      }

      type VisaIssuerParams = {
        expressRequest: ExpressRequest
        userEntity: UserEntity
        engine: ServerEngine
        requestedAt: Date
      }
    }

    type HttpHandlerBuilder = GraphqlHttpHandlerBuilder
    type HttpHandlerBuilderCtor = typeof GraphqlHttpHandlerBuilder

    type Config = {
      graphqlEndpoint: string
      staticPath: string
      schemaPath: string
      actualResolversPath: string | null
      stubResolversPath: string | null

      redisOptions?: RedisOptions
    }

    type Schema = GraphQLSchema
    type HttpRequestParams = RequestParams
    type WebSocketRequestParams = {
      id: string // '2aaaaaaa-1aaa-4aaa-a000-a00000000000'
      type: string // 'subscribe'
      payload: {
        query: string
        variables?: Record<string, *>
        context?: {
          headers: Record<string, *>
        }
      }
    }

    type Share = BaseGraphqlShare
    type ShareCtor = typeof BaseGraphqlShare

    type Visa = GraphqlVisa
    type VisaCtor = typeof GraphqlVisa
    type SchemaPermissionHash = Record<string, boolean>

    type Context = BaseGraphqlContext
    type ContextCtor = typeof BaseGraphqlContext

    type ContextFactory = HandlerOptions<C extends Context ? C : never>

    type ResolversOperationHash = {
      Query?: Record<string, ResolverResolveFunction>
      Mutation?: Record<string, ResolverResolveFunction>
      Subscription?: Record<string, {
        subscribe: SubscriptionSubscribeFunction
        resolve?: SubscriptionResolveFunction
      }>
    }

    // `variables` is alias of `args`.
    // `information` is alias of `info`.
    type ResolverInput<V extends ResolverInputVariables> = {
      variables: V // The arguments passed to the subscription field in the query.
      context: ResolverInputContext // The context object that is passed through the GraphQL execution.
      information?: ResolverInputInformation // a Contains information about the execution state of the query.
      parent?: ResolverInputParent // The parent object, which is usually undefined for subscription root fields.
    }

    type ResolverInputVariables = Record<string, *>
    type ResolverInputContext = BaseGraphqlContext
    type ResolverInputInformation = GraphQLResolveInfo
    type ResolverInputParent = ResolverOutput | null

    type ResolverOutput = Record<string, *>

    type Error = RenchanGraphqlError

    type Resolver = BaseResolver
    type ResolverCtor = typeof BaseResolver

    type CustomScalar = BaseScalar
    type CustomScalarCtor = typeof BaseScalar<*>
    type CustomerScalarHash = {
      [scalar: string]: GraphQLScalarType
    }

    interface SubscriptionHandler {
      subscribe: (args: SubscriptionHandlerParams) => Promise<void>
      unsubscribe: (args: SubscriptionHandlerParams) => Promise<void>
    }

    type SubscriptionHandlerParams = {
      channel: string
      receiver: object
    }

    type PubSub = BasePubSub
    type EventHub = EventHubActual

    interface PublishPubSubParams {
      channel: string
      message: Record<string, *>
    }

    type SubscriptionBroker = SubscriptionBroker
    type SubscriptionBrokerCtor = typeof SubscriptionBroker

    interface SubscribePubSubParams {
      channel: string
      receiver: TopicReceiver
    }

    interface UnsubscribePubSubParams {
      channel: string
      receiver: TopicReceiver
    }

    interface GenerateAsyncIteratorPubSubParams {
      channel: string
    }

    type ExceptionCatchingMap = Map<ErrorMatcher, ErrorResolver>
    type ExceptionCatchingMapEntry = [ErrorMatcher, ErrorResolver]

    type ErrorMatcher = (error: *) => boolean
    type ErrorResolver = (error: *) => Error

    type FileContentReader = FileContentReaderActual
  }
}
