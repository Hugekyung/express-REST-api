require('dotenv').config()
const { Router } = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = Router()

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (!user) {
            return res.status(400).json({ message: info.message })
        }
        const token = jwt.sign(user._id.toHexString(), process.env.JWT_SCRET_KEY)
        res.json({ token }) // res.cookie('token', token) 쿠키에 토큰 담아 리턴
    })(req, res, next) // <-이거 의미??
})

module.exports = router