const { Router } = require('express')
const User = require('../db/models/User')

const router = Router()

// 유저 회원가입 폼
router.get('/', (req, res) => {
    res.send(`
        <h1>EXPRESS 회원관리 API TEST</h1>
        <h3>회원가입</h3>
        <form method="POST" action="/users">
            이름 : <input type="text" name="username"><br>
            이메일 : <input type="email" name="email"><br>
            비밀번호 : <input type="password" name="password"><br>
            <input type="submit" value="가입하기">
        </form>
    `)
})

// 유저 정보 DB 등록
// 유저 정보를 이렇게 바디에 담아서 보내는게 맞나..? 보안 문제 있을듯?
router.post('/', async (req, res) => {
    const { username, email, password } = req.body
    const isCreated = await User.create({ username, email, password })
    if (isCreated) {
        res.redirect('/')
    } else {
        res.status(400).send(`400 Error`)
    }
})

// 특정 유저 정보 조회
router.get('/:username', async (req, res) => {
    const username = req.params.username
    const userData = await User.findById({ username })
    res.json({ userData })
})




module.exports = router