require('dotenv').config()
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const User = require('../../db/models/User')


// 쿠키에서 토큰 추출
const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['jwt']
    }
    return token
}

// passport-jwt 전략 생성
const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SCRET_KEY,
}

// db에서 조회하는게 아니라 토큰 뺴와서 확인해야할텐데..? 뭔가 이상한듯
const jwtStrategy = new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById({ username: jwt_payload.username }, (err, user) => {
        if (err) { return done(null, false) }
        if (user) { return done(null, user) }
        else { return done(null, false) }
    })
})

// 유저 로그인 정보에 대한 확인을 위해 localStrategy 사용
const localStrategy = new LocalStrategy({
        usernameField: 'username', // 클라이언트에서 받는 변수를 usernameField에 담아 다음 함수에서 사용한다.
        passwordField: 'password',
}, async (username, password, done) => {
    const user = await User.findById({ username })
    const hashedPassword = bcrypt.hashSync(password, 10) // 패스워드 암호화
    const verifyPassword = bcrypt.compare(user.password, hashedPassword) // db에 저장된 패스워드와 비교

    if (!user) { return done(null, false) } // 일치하는 유저가 없는 경우
    if (!verifyPassword) { return done(null, false) } // 패스워드가 틀린 경우
    return done(null, user) // 검증된 유저 리턴
})


module.exports = () => {
    passport.use(localStrategy)
    passport.use(jwtStrategy)
}