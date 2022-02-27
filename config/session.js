require('dotenv').config()
const fileStore = require('session-file-store')(session)
const session = require("express-session")


// Initialization for using session & passport
module.exports = (app) => app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // 세션을 언제나 저장할지 여부, false 권장
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true,
    secure: false,
  },
  store: new fileStore()
}))