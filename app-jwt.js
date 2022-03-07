require('dotenv').config()
const { PORT, MONGODB_URI } = process.env
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const passport = require('passport')

const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')

const jwtAuthCheck = require('./middlewares/jwt-auth-check')
const loginRequired = require('./middlewares/login_required')
// const { localStrategy, jwtStrategy } = require('./config/passport/jwt')

require('./config/passport/passport-jwt')() // passport-jwt에 있는 Strategy를 passport.use로 등록

const app = express()
const port = PORT || 3000


// POST 요청 시 Body 사용을 위한 기본코드
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// Connect MongoDB
connectionDB().catch(err => console.log(err));
async function connectionDB() {
    await mongoose.connect(MONGODB_URI).then(() => {
        console.log('Connected to MongoDB ~ SUCCESS')
    })
}

app.use(passport.initialize());
// passport.use(localStrategy)
// app.use(passport.use(jwtStrategy))
// app.use(jwtAuthCheck) // 모든 경로의 라우터에 적용될 미들웨어

app.use('/auth', authRouter) // login
app.use('/users', loginRequired, jwtAuthCheck, userRouter) // 유저정보 조회, 생성, 수정, 삭제

app.listen(port, () => {
    console.log(`express app listen ${port} port...`)
})