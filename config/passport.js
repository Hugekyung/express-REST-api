const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt')

// passport Initialization
module.exports = (app) => {
    app.use(passport.initialize())
    app.use(passport.session())

    // Serialize

    // Deserialize

    // Strategy
}