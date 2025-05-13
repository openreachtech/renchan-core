# renchan-core

# 概要

Express をベースとして、GraphQL サーバーと RESTful API サーバーそれぞれのエンドポイントをテンプレート的に生成するフレームワークです。

# インストール

Node.jsが必要です。まだインストールされていない場合は、先にインストールしてください。

| ツール | バージョン |
| :-- | :-- |
| Node.js | ^20.14.0 |
| npm | ^10.9.0 |

## `.npmrc` のセットアップ

プロジェクトのルートディレクトリに `.npmrc` ファイルを作成し、必要な設定を追加してください。

`.npmrc` ファイルに以下の行を追加してください。

```
@openreachtech:registry=https://npm.pkg.github.com
```

## コマンド

以下のコマンドで `renchan` をインストールできます：

```
npm install @openreachtech/renchan
```

# GraphQL Server

GraphQL Server は、アプリケーションで必要な実装箇所をテンプレート形式で提供します。

ひとつの GraphQL エンドポイントを構築するのに必要なファイル構成は以下に示されます。

エンドポイントを `https://example.com/graphql-my-app` とした場合の構成

```
server/
└── graphql/
    ├── context/
    │   ├── MyAppGraphqlContext.js
    │   └── MyAppGraphqlShare.js
    ├── resolvers/
    │   └── my-app/
    │       ├── AlphaQueryResolver.js
    │       ├── BetaQueryResolver.js
    │       ├── GammaMutationResolver.js
    │       ├── DeltaMutationResolver.js
    │       └── ︙
    ├── schemas/
    │   └── my-app.graphql
    └── MyAppGraphqlServerEngine.js
```

## クラス構成

### `GraphqlServerEngine`

`BaseGraphqlServerEngine` を継承したクラス。Express + GraphQL サーバーで必須となる処理をテンプレート式で実装できます。

| Members | Kind of | Description |
| :-- | :-- | :-- |
| .get:config | static getter | Express + GraphQL サーバーで使う configuration を定義します |
| .get:standardErrorCodeHash | static getter | フロントエンドに返すビルトインエラーのエラーコードを定義します |
| .get:Context | static getter | 全 Resolver に渡される context インスタンスのクラスを指定します |
| .get:Share | static getter | 全 Resolver でシェアされるインスタンスのクラスを指定します |
| .collectMiddleware() | static method | GraphQL エンドポイントに付与する Express の middleware を定義します |
| #get:schemasToSkipFiltering | instance getter | 認可・認証の判定をスキップする schema field を指定します |
| #generateFilterHandler() | instance method | 全 schema field の直前で認可・認証するロジックを定義します |
| #get:visaIssuers () | instance getter | 認証、認可、schema field 毎のパーミッションを判定するロジックを定義します |
| #collectScalars() | instance method | カスタムスカラーのクラス群を指定します |

### `GraphqlServerEngine.get:config`

GraphQL サーバーの環境設定は、ServerEngine クラス内で定義します。

```
class MyAppGraphqlServerEngine extends BaseGraphqlServerEngine {
  ...

  .get:config () {
    return {
      graphqlEndpoint: '/graphql-my-app',
      staticPath: rootPath.to('public/'),
      schemaPath: rootPath.to('app/server/graphql/schemas/my-app.graphql'),
      actualResolversPath: rootPath.to('app/server/graphql/resolvers/my-app/'),
      stubResolversPath: null,
      redisOptions: null,
    }
  }

  ...
}
```

| Field | Description |
| :-- | :-- |
| `graphqlEndpoint` | GraphQL の endpoint となる path を指定します |
| `staticPath` | GraphQL サーバーと同じ origin でアクセスできる静的ファイルのフォルダを指定します |
| `schemaPath` | GraphQL schema ファイルを指定します<br>フォルダを指定すると、配下にある schema ファイルを連結したものを読み込みます |
| `actualResolversPath` | Resolver クラスを定義するフォルダパスを指定します<br>フォルダ内のファイルは、再帰的に取り込まれます |
| `stubResolversPath` | stub 用の Resolver クラスを定義するフォルダパスを指定します<br>フォルダ内のファイルは、再帰的に取り込まれます |
| `redisOptions` | Subscription で Redis を使う場合、この field で host と port を指定します |

### `GraphqlContext`

`BaseGraphqlContext` を継承したクラス。全 Resolver に渡される context のインスタンスを生成する際に使われます。

`BaseGraphqlContext.findUser()` をオーバーライドして、認証・認可の対象となるユーザーの entity を、GraphQL API リクエスト毎に生成できます。

全 Resolver に渡される `context` インスタンスから、以下を取得できます。

| Features | Kind of | Description |
| :-- | :-- | :-- |
| #userEntity | property | `.findUser()` で取得した user entity が保持されます |
| #uuid | property | リクエスト毎に生成される UUID を返す |
| #get:env | instance getter | 1. `.env` に設定した変数<br>2. terminal で定義した環境変数 |
| #get:NODE_ENV | instance getter | `#get:env.NODE_ENV` を返す |
| #get:userId | instance getter | `#userEntity.id` を返す |
| #get:now | instance getter | GraphQL API がリクエストされた日時を返す |
| #get:share | instance getter | 共有された `Share` クラスのインスタンスを返す |

### `GraphqlShare`

`BaseGraphqlShare` を継承したクラス。全 Resolver で共有したいインスタンス群を保持する Hub の役目を担います。

例えば、Subscription で頻繁に使われる `PubSub` クラスのインスタンスを Share クラスのプロパティとして保持しておくと、Resolver 呼び出し毎に共有されます。

アプリケーションで特に共有するインスタンスがない場合は、`BaseGraphqlShare` を継承した空のクラスを定義しておきます。

### `Resolver`

schema filed ひとつにつき、ひとつの Resolver クラスを定義します。

以下のメンバーを定義します。

| Members | kind of | Description |
| :-- | :-- | :-- |
| .get:schema | static getter | その Resolver が対応する schema filed 名を定義します |
| .get:errorCodeHash | static getter | Resolver 内で throw するエラーを定義します |
| #resolve() | instance method | schema field の値を返すロジックを定義します |

## GraphQL サーバーのセットアップ

サーバーを立ち上げる bootstrap となるファイルの実装例です。

```js
import {
  GraphqlServerBuilder,
} from '@openreachtech/renchan'

import MyAppGraphqlServerEngine from './server/graphql/MyAppGraphqlServerEngine.js'

const builder = await GraphqlServerBuilder.createAsync({
  Engine: MyAppGraphqlServerEngine,
})

builder.buildHttpServer()
  .listen(4000)
```

## ライセンス

このプロジェクトは MIT ライセンスの下でリリースされています。

詳細は [LICENSE](./LICENSE) をご覧ください。

## コントリビューション

バグレポート、機能リクエスト、コード貢献を歓迎します。

GitHub の Issues を通じてお気軽にご連絡ください。


```sh
git clone https://github.com/openreachtech/renchan-core.git
cd renchan-core
npm install
npm run lint
npm test
```

## 開発者

[Open Reach Tech inc.](https://openreach.tech)

## 著作権

© 2024 Open Reach Tech inc.
