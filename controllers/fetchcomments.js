const { Comment } = require('../models')

module.exports = {
    getCommentsHandler: async (req, res) => {
        const { postid } = req.query
        // create an entry in the DB
        // remove id, parentid from the final result
        try {
            const comments = await Comment.findAll({
                where: { postid },
                order: [
                    ['createdAt', 'DESC'],
                ]
            })

            return res.status(200).json(comments)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to fetch comments!" })
        }
    }
}
