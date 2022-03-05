require('dotenv').config()
const { PORT, MONGODB_URI } = process.env
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const passport = require('./config/passport/passport-jwt')
const indexRouter = require('./routes/indexRouter')
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')

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
// JWTpassportConfig() // passport-jwt 초기화 & 전략 설정 등

app.use('/', indexRouter) // 메인페이지, 로그아웃
app.use('/auth', authRouter) // login
app.use('/users', userRouter) // 유저정보 조회, 생성, 수정, 삭제 -> login_required 미들웨어 추가해야할듯?

app.listen(port, () => {
    console.log(`express app listen ${port} port...`)
})