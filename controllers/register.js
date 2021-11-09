const { User } = require('../models')

module.exports = {
    registerHandler: async (req, res) => {
        const { name, email, password } = req.body
        // create an entry in the DB
        try {
            const user = await User.create({ name, email, password, bbpoints : 0})
            return res.status(200).json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).send("Failed to create new user!")
        }
    }
}
