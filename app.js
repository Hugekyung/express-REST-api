require('dotenv').config()
const { PORT, MONGODB_URI } = process.env
const express = require('express')
const mongoose = require('mongoose')
const sessionConfig = require('./config/session')
const passportConfig = require('./config/passport')

const indexRouter = require('./routes/indexRouter')
const userRouter = require('./routes/userRouter')

const app = express()
const port = PORT || 3000

// POST 요청 시 Body 사용을 위한 기본코드
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Connect MongoDB
connectionDB().catch(err => console.log(err));
async function connectionDB() {
    await mongoose.connect(MONGODB_URI).then(() => {
        console.log('Connected to MongoDB ~ SUCCESS')
    })
}

sessionConfig(app) // 세션 기본 세팅
passportConfig(app) // passport 초기화 & 전략 설정 등

app.use('/', indexRouter) // 메인페이지, 로그인, 로그아웃
app.use('/users', userRouter) // 유저정보 조회, 생성, 수정, 삭제 -> login_required 미들웨어 추가해야할듯?

app.listen(port, () => {
    console.log(`express app listen ${port} port...`)
})