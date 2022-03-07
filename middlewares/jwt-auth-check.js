// passport-jwt가 아닌 그냥 jsonwebtoken만을 이용한 인증 구현 시 활용할 토큰 확인 미들웨어
require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.access_token
    try {
        const user = jwt.Verify(token, process.env.JWT_SCRET_KEY)
        req.user = user
        next()
    } catch (err) { 
        res.clearCookie("token");
        return res.status(403).json({ msg: "token does not matched."})
    }
}