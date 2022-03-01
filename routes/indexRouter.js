const { Router } = require('express')
const passport = require('passport')

const router = Router()


// 회원가입 폼 -> 가입 요청
router.get('/', (req, res) => {
    if (req.user) {
        res.send(`
            <h1>EXPRESS 회원관리 API TEST</h1>
            <p>간단한 회원관리 API를 만들어 보는 프로젝트입니다.</p>

            <p>환영합니다, ${req.user.username}님</p>
            <button><a href="/logout">로그아웃하기</a></button>
        `)
    }
    else {
        res.send(`
            <h1>EXPRESS 회원관리 API TEST</h1>
            <p>간단한 회원관리 API를 만들어 보는 프로젝트입니다.</p>
            <button><a href="/login">로그인하기</a></button>
            <button><a href="/users">회원가입하기</a></button>
        `)
    }
})

// login form page
router.get('/login', (req, res) => {
    res.send(`
        <h1>EXPRESS 회원관리 API TEST</h1>
        <h3>로그인</h3>
        <form method="POST" action="/login">
            <input type="text" name="username">
            <input type="password" name="password">
            <input type="submit" value="login">
        </form>
    `)
})

// // login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

// logout
router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy(function (err) {
        if (err) { return next(err); }
        console.log({ authenticated: req.isAuthenticated() });
    });
    res.redirect('/');
})

module.exports = router;