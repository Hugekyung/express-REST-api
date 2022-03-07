require('dotenv').config()
const { Router } = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = Router()

// login form page
router.get('/', (req, res) => {
    res.send(`
        <h1>EXPRESS 회원관리 API TEST</h1>
        <h3>로그인</h3>
        <form method="POST" action="/auth">
            <input type="text" name="username">
            <input type="password" name="password">
            <input type="submit" value="login">
        </form>
    `)
})

// /auth => 유저 로그인 시 passport-local로 유저 정보가 맞는지 확인(패스워드 일치하는지)
// 유저 정보가 일치한다면, jsonwebtoken 라이브러리로 jwt를 발급하고 쿠키에 담아 response
router.post('/', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (!user) {
            return res.status(400).json({ message: info.message })
        }
        // secret-key를 base64 형태로 넣어줘야 signature 에러가 안뜬다.
        const token = jwt.sign({ username: user.username }, process.env.JWT_SCRET_KEY, { expiresIn: 60 * 10 })
        res.cookie("access_token", token)
        res.json({ status: 200, access_token: token }) // res.cookie('token', token) 쿠키에 토큰 담아 리턴
    })(req, res, next) // <-이거 의미??
})

module.exports = router