const { restart } = require('nodemon');
const { User, Category, Post } = require('../models')

module.exports = {
    createPostHandler: async (req, res) => {
        const { userid, category, postHeading, postContent } = req.body
        // create an entry in the DB
        // get username with the id
        let user;
        try {
            user = await User.findOne({
                where: { userid }
            })

            if (user == null) {
                return res.status(200).json({ error: 'login before creating the post!' })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to create new post!" })
        }

        // category check
        try {
            const cat = await Category.findOne({
                where: {
                    name: category
                }
            })

            if (cat == null) {
                return res.status(200).json({ error: 'Invalid Category!' })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to create new post!" })
        }

        try {
            const post = await Post.create({ category, username: user.username, postHeading, postContent })
            // not to return the password
            return res.status(200).json({ postid: post.dataValues.postid });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to create new post!" })
        }
    }
}
