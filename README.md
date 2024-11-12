```디렉토리 구조
my-home-defense
├─ .gitignore
├─ .prettierrc
├─ package-lock.json
├─ package.json
├─ README.md
└─ src
   ├─ classes
   │  └─ models
   │     ├─ base.class.js
   │     ├─ game.class.js
   │     ├─ monster.class.js
   │     ├─ tower.class.js
   │     └─ user.class.js
   ├─ config
   │  └─ config.js
   ├─ constants
   │  ├─ env.js
   │  └─ header.js
   ├─ db
   │  ├─ database.js
   │  ├─ games
   │  │  ├─ game.db.js
   │  │  └─ game.queries.js
   │  ├─ index.js
   │  ├─ migrations
   │  │  └─ createSchema.js
   │  ├─ sql
   │  │  ├─ games_db.sql
   │  │  └─ users_db.sql
   │  └─ users
   │     ├─ user.db.js
   │     └─ user.queries.js
   ├─ events
   │  ├─ onConnection.js
   │  ├─ onData.js
   │  ├─ onEnd.js
   │  └─ onError.js
   ├─ handlers
   │  ├─ game
   │  │  ├─ match.handler.js
   │  │  ├─ monster.baseattack.js
   │  │  ├─ monsterDeath.handler.js
   │  │  └─ spawnMonster.handler.js
   │  ├─ index.js
   │  ├─ tower
   │  │  ├─ towerAttack.handler.js
   │  │  └─ towerPurchase.handler.js
   │  └─ user
   │     ├─ login.handler.js
   │     └─ register.handler.js
   ├─ init
   │  ├─ index.js
   │  └─ loadProto.js
   ├─ protobuf
   │  ├─ packetName.js
   │  └─ protobuf.proto
   ├─ server.js
   ├─ sessions
   │  ├─ game.session.js
   │  ├─ sessions.js
   │  └─ user.session.js
   └─ utils
      ├─ dateFormatter.js
      ├─ notification
      │  ├─ game.notification.js
      │  ├─ notificationPoroto.js
      │  └─ tower.notification.js
      ├─ parser
      │  └─ packetParser.js
      ├─ response
      │  ├─ createHeader.js
      │  ├─ createRespose.js
      │  └─ responseProto.js
      └─ transformCase.js

```

TCP를 활용한 게임 서버 구축
