const { Category, Post, Report, Moderator, sequelize } = require('../models')

module.exports = {
    removeCategoryHandler: async (req, res) => {
        const { name } = req.body;
        // check if the category is valid
        try {
            const catRecord = Category.findOne({
                where: {
                    name
                }
            })

            if (catRecord == null) return res.status(200).json({ error: "Invalid Category!" })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Error in removing category!" })
        }
        // create a transaction
        const transaction = await sequelize.transaction();
        // remove the category from the category table
        try {
            await Category.destroy({
                where: {
                    name
                }
            }, { transaction })
        } catch (err) {
            console.log(err)
            await transaction.rollback();
            return res.status(500).json({ error: "Error in removing category!" })
        }
        // remove all the posts of that category
        try {
            await Post.destroy({
                where: {
                    category: name
                }
            }, {transaction})
        } catch (err) {
            console.log(err)
            await transaction.rollback();
            return res.status(500).json({ error: "Error in removing category!" })
        }
        // remove all the reports of that category
        try {
            await Report.destroy({
                where: {
                    category: name
                }
            }, {transaction})
        } catch (err) {
            console.log(err)
            await transaction.rollback();
            return res.status(500).json({ error: "Error in removing category!" })
        }
        // remove all the moderators of that category
        try {
            await Moderator.destroy({
                where: {
                    category: name
                }
            }, {transaction})

            await transaction.commit();
            return res.status(200).json({});
        } catch (err) {
            console.log(err)
            await transaction.rollback();
            return res.status(500).json({ error: "Error in removing category!" })
        }
    }
}