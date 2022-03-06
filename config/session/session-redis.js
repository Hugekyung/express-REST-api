require('dotenv').config()
const session = require("express-session")
const { createClient } = require("redis")
const RedisStore = require('connect-redis')(session)

const redisClient = createClient({ host: process.env.REDIS_HOST, legacyMode: true })
redisClient.connect().catch(console.error)

// Initialization for using session with Redis
module.exports = (app) => app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // 세션을 언제나 저장할지 여부, false 권장
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true,
    secure: false,
  },
  store: new RedisStore({ client: redisClient })
}))