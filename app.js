require('dotenv').config()
const { PORT, MONGODB_URI } = process.env
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const sessionConfig = require('./config/session')
const passportConfig = require('./config/passport')

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


app.get('/', (req, res) => {
    const status = res.statusCode
    res.json({ "status": "success", "statusCode": status })
})

app.listen(port, () => {
    console.log(`express app listen ${port} port...`)
})