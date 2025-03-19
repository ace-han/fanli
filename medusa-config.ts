import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: [
    {
      // https://docs.medusajs.com/resources/architectural-modules/cache/redis
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.CACHE_REDIS_URL,
        ttl: 300,
        redisOptions: {
          // refer to https://github.com/redis/ioredis/blob/main/lib/redis/RedisOptions.ts#L8
          connectionName: "medusa-cache",
        },
      },
    },
    {
      // https://docs.medusajs.com/resources/architectural-modules/event/redis
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.EVENTS_REDIS_URL,
      },
    },
    {
      // https://docs.medusajs.com/resources/architectural-modules/locking/redis
      resolve: "@medusajs/medusa/locking",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/locking-redis",
            id: "locking-redis",
            // set this if you want this provider to be used by default
            // and you have other Locking Module Providers registered.
            is_default: true,
            options: {
              redisUrl: process.env.LOCKING_REDIS_URL,
            },
          },
        ],
      },
    },
    {
      // https://docs.medusajs.com/resources/architectural-modules/workflow-engine/redis
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.WE_REDIS_URL,
        },
      },
    },

    {
      resolve: "./src/modules/brand",
    },
  ],
});
