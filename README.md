# チャットアプリ習作 w/ mongodb stream

mongodb stream を使用して、リアルタイム更新が可能なチャットアプリの習作。

このアプリケーションの目的:

- full js/ts stack での実践
- ws でのリアルタイム更新の実践
- Next.js App Router での RSC の実践
- mongodb stream の使い心地

## 使用技術

- devcontainer
  - チーム開発での環境構築の簡略化
- Nx: monorepo 管理
- NestJS: api/ws server
  - Cookie に JWT を保存し、認証
    - 認証はユーザー名だけで簡単に実施している
- Next.js: frontend server
  - App Router
    - チャットコンポーネントは Socket.io を使用しリアルタイム更新するためクライアントコンポーネント使用。
    - それ以外はサーバーサイドレンダリングを使用・Server Actions でのデータ取得と更新。
  - Material UI
    - CSS in JS: Emotion
      - SSR との相性は良くないが、実装上の問題は特に発生しない・オーバーヘッドも大きくは感じない。
      - 2023/08 時点で SSR に対応した選定は難しい。
- Prisma: ORM
- mongodb: DB
  - Stream を使用し、変更を監視する
    - DB の変更を監視し、変更があった場合にクライアントに通知することができる。
    - この機能を使用し、チャットの更新をリアルタイムに反映する。
    - stream の接続を socket ごとに管理しており、socket が切断された場合には stream も切断するようにしている。

## setup

```bash
yarn install
```

### prisma mongodb schema 生成、およびクライアントの生成

```bash
yarn run nx run prisma-schema-main:prisma generate
yarn run nx run prisma-schema-main:prisma db push
```

### docker compose up

mongodb servicde を起動する

```bash
docker-compose up -d
```

### start all services

api server, web server を起動する

```bash
yarn run dev:all
```

## 所感

- stream の接続管理が面倒に感じた
  - 現状のつくりだと socket ごとに stream を管理しているため同時接続数が増えた際にスケールするのか？
    - 今回は chat だけだが、複数の stream を管理しようとするとだいぶ複雑になりそう
  - stream で受け取れるデータは document の full document のみで、join したデータを受け取ることができない
    - そのため、stream で受け取った document の id を使用して、別途データを取得する必要がある(今回の場合、sender の user 情報)
  - sticky session の対応が必要になっている
    - stream の接続を socket ごとに管理しているため、同じ api server に接続できるように考える必要がある
    - socket.io で redis adapter の使用などを考えると、stream でイベントを管理するのではなく、socket.io でイベントを管理した方が良いかも
