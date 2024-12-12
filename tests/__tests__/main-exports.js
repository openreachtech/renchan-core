import { default as BaseExpressRouteActual } from '../../lib/server/express/routes/BaseExpressRoute.js'
import { default as HttpMethodExpressRouteActual } from '../../lib/server/express/routes/HttpMethodExpressRoute.js'
import { default as MiddlewareExpressRouteActual } from '../../lib/server/express/routes/MiddlewareExpressRoute.js'
import { default as GetMethodExpressRouteActual } from '../../lib/server/express/routes/GetMethodExpressRoute.js'
import { default as PostMethodExpressRouteActual } from '../../lib/server/express/routes/PostMethodExpressRoute.js'

import { default as GraphqlServerBuilderActual } from '../../lib/server/graphql/GraphqlServerBuilder.js'
import { default as BaseGraphqlServerEngineActual } from '../../lib/server/graphql/BaseGraphqlServerEngine.js'
import { default as GraphqlHttpHandlerBuilderActual } from '../../lib/server/graphql/GraphqlHttpHandlerBuilder.js'
import { default as GraphqlSchemaBuilderActual } from '../../lib/server/graphql/GraphqlSchemaBuilder.js'
import { default as BaseGraphqlContextActual } from '../../lib/server/graphql/contexts/BaseGraphqlContext.js'
import { default as BaseGraphqlShareActual } from '../../lib/server/graphql/contexts/BaseGraphqlShare.js'
import { default as GraphqlVisaActual } from '../../lib/server/graphql/contexts/GraphqlVisa.js'

import { default as BaseResolverActual } from '../../lib/server/graphql/resolvers/BaseResolver.js'
import { default as BaseQueryResolverActual } from '../../lib/server/graphql/resolvers/BaseQueryResolver.js'
import { default as BaseMutationResolverActual } from '../../lib/server/graphql/resolvers/BaseMutationResolver.js'
import { default as BaseSubscriptionResolverActual } from '../../lib/server/graphql/resolvers/BaseSubscriptionResolver.js'

import { default as FilterSchemaHashBuilderActual } from '../../lib/server/graphql/resolvers/FilterSchemaHashBuilder.js'
import { default as GraphqlResolversBuilderActual } from '../../lib/server/graphql/resolvers/GraphqlResolversBuilder.js'
import { default as GraphqlResolversLoaderActual } from '../../lib/server/graphql/resolvers/GraphqlResolversLoader.js'
import { default as ResolverSchemaHashBuilderActual } from '../../lib/server/graphql/resolvers/ResolverSchemaHashBuilder.js'

import { default as ExceptionCatchingProxyBuilderActual } from '../../lib/server/graphql/resolvers/ExceptionCatchingProxyBuilder.js'

import { default as SchemaFilesLoaderActual } from '../../lib/server/graphql/schemas/SchemaFilesLoader.js'

import { default as ScalarHashBuilderActual } from '../../lib/server/graphql/scalars/ScalarHashBuilder.js'
import { default as BaseScalarActual } from '../../lib/server/graphql/scalars/BaseScalar.js'
import { default as BigNumberScalarActual } from '../../lib/server/graphql/scalars/concretes/BigNumberScalar.js'
import { default as DateTimeScalarActual } from '../../lib/server/graphql/scalars/concretes/DateTimeScalar.js'

import { default as BasePubSubActual } from '../../lib/server/graphql/subscription/pubsub/BasePubSub.js'
import { default as LocalPubSubActual } from '../../lib/server/graphql/subscription/pubsub/LocalPubSub.js'
import { default as RedisPubSubActual } from '../../lib/server/graphql/subscription/pubsub/RedisPubSub.js'

import { default as EventHubActual } from '../../lib/server/graphql/subscription/pubsub/tools/EventHub.js'

import { default as ChannelGeneratorActual } from '../../lib/server/graphql/subscription/ChannelGenerator.js'
import { default as SubscriptionBrokerActual } from '../../lib/server/graphql/subscription/SubscriptionBroker.js'
import { default as TopicReceiverActual } from '../../lib/server/graphql/subscription/TopicReceiver.js'

/**
 * For RESTful API server.
 */
import { default as RestfulApiServerBuilderActual } from '../../lib/server/restfulapi/RestfulApiServerBuilder.js'
import { default as RestfulApiRoutesBuilderActual } from '../../lib/server/restfulapi/RestfulApiRoutesBuilder.js'
import { default as BaseRestfulApiServerEngineActual } from '../../lib/server/restfulapi/BaseRestfulApiServerEngine.js'

import { default as BaseRestfulApiContextActual } from '../../lib/server/restfulapi/contexts/BaseRestfulApiContext.js'
import { default as BaseRestfulApiShareActual } from '../../lib/server/restfulapi/contexts/BaseRestfulApiShare.js'
import { default as RestfulApiVisaActual } from '../../lib/server/restfulapi/contexts/RestfulApiVisa.js'

import { default as BaseRendererActual } from '../../lib/server/restfulapi/renderers/BaseRenderer.js'
import { default as BaseGetRendererActual } from '../../lib/server/restfulapi/renderers/BaseGetRenderer.js'
import { default as BasePostRendererActual } from '../../lib/server/restfulapi/renderers/BasePostRenderer.js'

import { default as RestfulApiRequestActual } from '../../lib/server/restfulapi/interfaces/RestfulApiRequest.js'
import { default as RestfulApiResponseActual } from '../../lib/server/restfulapi/interfaces/RestfulApiResponse.js'

import { default as RenchanRestfulApiErrorActual } from '../../lib/server/restfulapi/errors/RenchanRestfulApiError.js'
import { default as ConcreteMemberNotFoundRestfulApiErrorActual } from '../../lib/server/restfulapi/errors/concretes/ConcreteMemberNotFoundRestfulApiError.js'

/**
 * For modules.
 */
import { default as DeepBulkClassLoaderActual } from '../../lib/tools/DeepBulkClassLoader.js'
import { default as RootPathActual } from '../../lib/tools/RootPath.js'
import { default as ValueTemplateHydratorActual } from '../../lib/tools/ValueTemplateHydrator.js'

import { default as RenchanGraphqlErrorActual } from '../../lib/server/graphql/errors/RenchanGraphqlError.js'
import { default as ConcreteMemberNotFoundGraphqlErrorActual } from '../../lib/server/graphql/errors/concretes/ConcreteMemberNotFoundGraphqlError.js'

import {
  BaseExpressRoute,
  HttpMethodExpressRoute,
  MiddlewareExpressRoute,
  GetMethodExpressRoute,
  PostMethodExpressRoute,

  GraphqlServerBuilder,
  BaseGraphqlServerEngine,
  GraphqlHttpHandlerBuilder,
  GraphqlSchemaBuilder,
  BaseGraphqlContext,
  BaseGraphqlShare,
  GraphqlVisa,

  BaseResolver,
  BaseQueryResolver,
  BaseMutationResolver,
  BaseSubscriptionResolver,

  FilterSchemaHashBuilder,
  GraphqlResolversBuilder,
  GraphqlResolversLoader,
  ResolverSchemaHashBuilder,

  ExceptionCatchingProxyBuilder,

  SchemaFilesLoader,

  ScalarHashBuilder,
  BaseScalar,
  BigNumberScalar,
  DateTimeScalar,

  BasePubSub,
  LocalPubSub,
  RedisPubSub,

  EventHub,

  ChannelGenerator,
  SubscriptionBroker,
  TopicReceiver,

  RestfulApiServerBuilder,
  RestfulApiRoutesBuilder,
  BaseRestfulApiServerEngine,

  BaseRestfulApiContext,
  BaseRestfulApiShare,
  RestfulApiVisa,

  BaseRenderer,
  BaseGetRenderer,
  BasePostRenderer,

  RestfulApiRequest,
  RestfulApiResponse,

  RenchanRestfulApiError,
  ConcreteMemberNotFoundRestfulApiError,

  DeepBulkClassLoader,
  RootPath,
  ValueTemplateHydrator,

  RenchanGraphqlError,
  ConcreteMemberNotFoundGraphqlError,
} from '../../index.js'

describe('main exports', () => {
  const cases = [
    { ExportedClass: BaseExpressRoute, ActualClass: BaseExpressRouteActual },
    { ExportedClass: HttpMethodExpressRoute, ActualClass: HttpMethodExpressRouteActual },
    { ExportedClass: MiddlewareExpressRoute, ActualClass: MiddlewareExpressRouteActual },
    { ExportedClass: GetMethodExpressRoute, ActualClass: GetMethodExpressRouteActual },
    { ExportedClass: PostMethodExpressRoute, ActualClass: PostMethodExpressRouteActual },

    { ExportedClass: GraphqlServerBuilder, ActualClass: GraphqlServerBuilderActual },
    { ExportedClass: BaseGraphqlServerEngine, ActualClass: BaseGraphqlServerEngineActual },
    { ExportedClass: GraphqlHttpHandlerBuilder, ActualClass: GraphqlHttpHandlerBuilderActual },
    { ExportedClass: GraphqlSchemaBuilder, ActualClass: GraphqlSchemaBuilderActual },
    { ExportedClass: BaseGraphqlContext, ActualClass: BaseGraphqlContextActual },
    { ExportedClass: BaseGraphqlShare, ActualClass: BaseGraphqlShareActual },
    { ExportedClass: GraphqlVisa, ActualClass: GraphqlVisaActual },

    { ExportedClass: BaseResolver, ActualClass: BaseResolverActual },
    { ExportedClass: BaseQueryResolver, ActualClass: BaseQueryResolverActual },
    { ExportedClass: BaseMutationResolver, ActualClass: BaseMutationResolverActual },
    { ExportedClass: BaseSubscriptionResolver, ActualClass: BaseSubscriptionResolverActual },

    { ExportedClass: FilterSchemaHashBuilder, ActualClass: FilterSchemaHashBuilderActual },
    { ExportedClass: GraphqlResolversBuilder, ActualClass: GraphqlResolversBuilderActual },
    { ExportedClass: GraphqlResolversLoader, ActualClass: GraphqlResolversLoaderActual },
    { ExportedClass: ResolverSchemaHashBuilder, ActualClass: ResolverSchemaHashBuilderActual },

    { ExportedClass: ExceptionCatchingProxyBuilder, ActualClass: ExceptionCatchingProxyBuilderActual },

    { ExportedClass: SchemaFilesLoader, ActualClass: SchemaFilesLoaderActual },

    { ExportedClass: ScalarHashBuilder, ActualClass: ScalarHashBuilderActual },
    { ExportedClass: BaseScalar, ActualClass: BaseScalarActual },
    { ExportedClass: BigNumberScalar, ActualClass: BigNumberScalarActual },
    { ExportedClass: DateTimeScalar, ActualClass: DateTimeScalarActual },

    { ExportedClass: BasePubSub, ActualClass: BasePubSubActual },
    { ExportedClass: LocalPubSub, ActualClass: LocalPubSubActual },
    { ExportedClass: RedisPubSub, ActualClass: RedisPubSubActual },

    { ExportedClass: EventHub, ActualClass: EventHubActual },

    { ExportedClass: ChannelGenerator, ActualClass: ChannelGeneratorActual },
    { ExportedClass: SubscriptionBroker, ActualClass: SubscriptionBrokerActual },
    { ExportedClass: TopicReceiver, ActualClass: TopicReceiverActual },

    { ExportedClass: RestfulApiServerBuilder, ActualClass: RestfulApiServerBuilderActual },
    { ExportedClass: RestfulApiRoutesBuilder, ActualClass: RestfulApiRoutesBuilderActual },
    { ExportedClass: BaseRestfulApiServerEngine, ActualClass: BaseRestfulApiServerEngineActual },

    { ExportedClass: BaseRestfulApiContext, ActualClass: BaseRestfulApiContextActual },
    { ExportedClass: BaseRestfulApiShare, ActualClass: BaseRestfulApiShareActual },
    { ExportedClass: RestfulApiVisa, ActualClass: RestfulApiVisaActual },

    { ExportedClass: BaseRenderer, ActualClass: BaseRendererActual },
    { ExportedClass: BaseGetRenderer, ActualClass: BaseGetRendererActual },
    { ExportedClass: BasePostRenderer, ActualClass: BasePostRendererActual },

    { ExportedClass: RestfulApiRequest, ActualClass: RestfulApiRequestActual },
    { ExportedClass: RestfulApiResponse, ActualClass: RestfulApiResponseActual },

    { ExportedClass: RenchanRestfulApiError, ActualClass: RenchanRestfulApiErrorActual },
    { ExportedClass: ConcreteMemberNotFoundRestfulApiError, ActualClass: ConcreteMemberNotFoundRestfulApiErrorActual },

    { ExportedClass: DeepBulkClassLoader, ActualClass: DeepBulkClassLoaderActual },
    { ExportedClass: RootPath, ActualClass: RootPathActual },
    { ExportedClass: ValueTemplateHydrator, ActualClass: ValueTemplateHydratorActual },

    { ExportedClass: RenchanGraphqlError, ActualClass: RenchanGraphqlErrorActual },
    { ExportedClass: ConcreteMemberNotFoundGraphqlError, ActualClass: ConcreteMemberNotFoundGraphqlErrorActual },
  ]

  describe('to have property', () => {
    test.each(cases)('Class: $ExportedClass.name', ({ ExportedClass, ActualClass }) => {
      expect(ExportedClass)
        .toBe(ActualClass)
    })
  })
})
