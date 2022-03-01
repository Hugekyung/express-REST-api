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

    static async update({}) {
        return
    }

    static async delete({}) {
        return
    }
}

module.exports = User