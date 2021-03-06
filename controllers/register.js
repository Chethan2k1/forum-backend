const { User } = require('../models')

module.exports = {
    registerHandler: async (req, res) => {
        const { username, email, password } = req.body
        // search for users with that email
        try {
            let user

            user = await User.findOne({
                where: { username }
            })

            if (user != null)
                return res.status(200).json({ error: "Username Taken! Try picking another one" })

            user = await User.findOne({
                where: { email }
            })

            if (user != null)
                return res.status(200).json({ error: "Account linked to this email exists!" })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to create new user!" })
        }
        // create an entry in the DB
        try {
            const user = await User.create({ username, email, password, bbpoints: 0, isadmin: false })
            // not to return the password
            return res.status(200).json({ userid: user.userid });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to create new user!" })
        }
    }
}
