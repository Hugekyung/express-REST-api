const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../db/models/User')

const bcrypt = require('bcrypt')

// passport Initialization
module.exports = (app) => {
    app.use(passport.initialize())
    app.use(passport.session())

    // Serialize: 최초 로그인 성공시 호출
    // session에 유저정보를 저장하는 단계
    passport.serializeUser((user, done) => {
        console.log("최초 인증한(로그인) 유저 >> ", user)
        done(null, user)
    })

    // Deserialize: 이미 로그인한(인증된) 유저일 경우 호출
    passport.deserializeUser((user, done) => {
        console.log("이미 인증된 유저에 대한 처리")
        done(null, user)
    })

    // Strategy
    // done(null, user)에서 첫번째 인자는 db조회와 같은 부분에서 발생한 서버 에러를 담는 곳이다.
    // 에러가 있을 경우에만 사용하는 인자이고, 없을 경우 null로 처리
    passport.use(
        new LocalStrategy({
            usernameField: 'username', // 클라이언트에서 받는 변수를 usernameField에 담아 다음 함수에서 사용한다.
            passwordField: 'password',
    }, (username, password, done) => {
        User.findById({ username }, (err, user) => {
            const hashedPassword = bcrypt.hashSync(password, 10) // 패스워드 암호화
            const verifyPassword = bcrypt.compare(user.password, hashedPassword) // db에 저장된 패스워드와 비교

            if (err) { return done(err) } // 서버 에러
            if (!user) { return done(null, false) } // 일치하는 유저가 없는 경우
            if (!verifyPassword) { return done(null, false) } // 패스워드가 틀린 경우
            return done(null, user) // 검증된 유저 리턴
        })
    }))
}