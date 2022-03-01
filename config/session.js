require('dotenv').config()
const session = require("express-session")
const fileStore = require('session-file-store')(session)


// Initialization for using session & passport
module.exports = (app) => app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // 세션을 언제나 저장할지 여부, false 권장
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour
    // maxAge: 60 * 1000, // test 60초 -> 60초가 지난 뒤 새로고침하면 로그인이 자동으로 풀림
    httpOnly: true,
    secure: false,
  },
  store: new fileStore()
}))