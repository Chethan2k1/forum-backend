const { Post } = require('../models')

module.exports = {
    createpostHandler: async (req, res) => {
        console.log(req.body)
        const { username, category, postHeading, postContent } = req.body
        // create an entry in the DB
        try {
            const post = await Post.create({ username, category, postHeading, postContent })
            // not to return the password
            return res.status(200).json({ postid: post.dataValues.postid });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to create new post!" })
        }
    }
}
