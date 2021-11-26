const { Post, Report, Comment } = require('../models')
const { sequelize } = require('../models')

module.exports = {
    removePostHandler: async (req, res) => {
        // removes the row with this postid
        // use transactions to rollback any changes in case of error
        const { postid } = req.body;
        let id;

        try {
            const post = await Post.findOne({
                where: {
                    postid
                }
            })

            if (post == null) return res.status(200).json({ error: "Cannot find the post!" })
            id = post.dataValues.id
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Error in removing Post!" })
        }

        // create a transaction
        const transaction = await sequelize.transaction();
        // removes the post with that id
        try {
            await Post.destroy({
                where: {
                    id
                }
            }, { transaction });
        } catch (err) {
            console.log(err)
            await transaction.rollback();
            return res.status(500).json({ error: "Error in removing Post!" })
        }

        // checks and removes a report if with id exists
        try {
            await Report.destroy({
                where: {
                    reportedid: id,
                    ispost: true
                }
            }, { transaction })
        } catch (err) {
            console.log(err)
            await transaction.rollback();
            return res.status(500).json({ error: "Error in removing Post!" })
        }

        // remove all the comments related to the post
        try {
            await Comment.destroy({
                where: {
                    parentid: id
                }
            }, { transaction })

            await transaction.commit();
            return res.json({})
        } catch (err) {
            console.log(err)
            await transaction.rollback();
            return res.status(500).json({ error: "Error in removing Post!" })
        }
    }
}