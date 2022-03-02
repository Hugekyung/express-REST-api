const { UserModel } = require('../schemas/user');
const bcrypt = require('bcrypt')

class User {
    static async findById({ username }) {
        const user = await UserModel.findOne({ username })
        return user
    }

    static async create({ username, email, password }) {
        const user = await UserModel.findOne({ username })
        if (user) { return false } // 유저네임이 DB에 이미 등록된 경우
        const hashedPassword = bcrypt.hashSync(password, 10)
        try {
            await UserModel.create({ 
                username: username,
                email: email,
                password: hashedPassword, 
            })
            return true
        } catch (e) {
            console.log("error msg >>", e)
        }
    }

    // 비밀번호 수정?
    static async update({}) {
        return
    }

    // 회원 로그인 상태일 때
    static async remove({ username }) {
        try {
            await UserModel.deleteOne({ username: username })
            return true
        } catch (err) {
            console.log("Error deleting user >>", err)
            return false
        }
    }
}

module.exports = User