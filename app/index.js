import activate from './sequelize/_.js'

import GraphqlServerBuilder from '../lib/server/graphql/GraphqlServerBuilder.js'

import CustomerGraphqlServerEngine from './server/graphql/CustomerGraphqlServerEngine.js'
import AdminGraphqlServerEngine from './server/graphql/AdminGraphqlServerEngine.js'

import RestfulApiSServerBuilder from '../lib/server/restfulapi/RestfulApiServerBuilder.js'

import AppRestfulApiServerEngine from './server/restfulapi/AppRestfulApiServerEngine.js'

await activate()

GraphqlServerBuilder.createAsync({
  Engine: CustomerGraphqlServerEngine,
})
  .then(builder =>
    builder.buildHttpServer()
      .listen(3900)
  )

GraphqlServerBuilder.createAsync({
  Engine: AdminGraphqlServerEngine,
})
  .then(builder =>
    builder.buildHttpServer()
      .listen(5800)
  )

RestfulApiSServerBuilder.createAsync({
  Engine: AppRestfulApiServerEngine,
})
  .then(builder =>
    builder.buildHttpServer()
      .listen(8001)
  )
