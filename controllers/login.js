const { User } = require('../models')

module.exports = {
    loginHandler: async (req, res) => {
        const { email, password } = req.body
        // search the entry in the DB
        res.send("You have hit the login route!")
    }
}