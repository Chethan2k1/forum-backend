const { User, Post, Comment } = require('../models')

module.exports = {
    createcommentHandler: async (req, res) => {
        const { id, ppostid, content } = req.body
        console.log("Inside createcommmentHandler")
        console.log(req.body)
        // create an entry in the DB
        // get username with the id
        let user;
        try {
            user = await User.findOne({
                where: { id }
            })

            if (user == null) {
                return res.status(200).json({ error: 'login before creating the post!' })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to create a new comment!" })
        }

        let post;
        try {
            post = await Post.findOne({
                where: { postid: ppostid }
            })

            if (post == null) {
                return res.status(200).json({ error: 'Cannot find the post!' })
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to create a new comment!" })
        }

        // get actual id of the post with postid ppostid 
        try {
            const comment = await Comment.create({ parentid: post.id, postid: ppostid, content, username: user.username })
            // not to return the password
            return res.status(200).json({ cid: comment.dataValues.commentid });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to create a new comment!" })
        }
    }
}
