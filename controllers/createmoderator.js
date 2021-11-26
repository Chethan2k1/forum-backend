const { User, Category, Moderator } = require('../models')

module.exports = {
    createModeratorHandler: async (req, res) => {
        const { username, category } = req.body
        // create an entry in the DB
        // get user object for that username
        let user;
        try {
            user = await User.findOne({
                where: { username }
            })

            if (user == null) {
                return res.status(200).json({ error: 'Invalid Username' })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to create a new moderator!" })
        }

        // check if the category is valid
        try {
            const cat = await Category.findOne({
                where: { name: category }
            })

            if (cat == null) {
                return res.status(200).json({ error: 'Cannot find the Category!' })
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to create a new moderator!" })
        }

        // create the entry in the moderator table
        try {
            await Moderator.create({ userid: user.dataValues.id, category })
            return res.status(200).json({});
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to create a new moderator!" })
        }
    }
}
