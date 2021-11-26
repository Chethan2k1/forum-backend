const { User, Category, Moderator } = require('../models')

module.exports = {
    removeModeratorHandler: async (req, res) => {
        const { username, category } = req.body
        // check if the user is valid
        let user
        try {
            user = await User.findOne({
                where: {
                    username
                }
            })

            if (user == null) return res.status(200).json({ error: "Invalid Username!" })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to remove Moderator!" })
        }

        // check if the category is valid
        try {
            const cat = await Category.findOne({
                where: {
                    name: category
                }
            })

            if (cat == null) return res.status(200).json({ error: "Invalid Category!" })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to remove Moderator!" })
        }

        // finally remove the entry in moderator
        try {
            await Moderator.destroy({
                where: {
                    userid: user.dataValues.id,
                    category
                }
            })

            return res.json({})
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to remove Moderator!" })
        }
    }
}