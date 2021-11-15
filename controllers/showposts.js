const { Post } = require('../models')

module.exports = {
    showpostsHandler: async (req, res) => {
        // search the entry in the DB
        try {
            // remove postContent and id
            const posts = await Post.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ]
            })

            return res.status(200).json(posts)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: 'Posts could not be fetched at the moment!' })
        }
    }
}