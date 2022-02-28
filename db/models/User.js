const { UserModel } = require('../schemas/user');

class User {
    static async findById({ username }) {
        const user = await UserModel.findOne({ username })
        return user
    }

    static async create({}) {
        return
    }

    static async update({}) {
        return
    }

    static async delete({}) {
        return
    }
}

module.exports = User