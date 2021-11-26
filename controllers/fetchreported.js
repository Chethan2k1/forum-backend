const { Report, Post, Comment } = require('../models')

module.exports = {
    getReportedHandler: async (req, res) => {
        const { mod_categories } = req.body
        console.log(mod_categories)
        let post_ids = [], comment_ids = []
        let posts = [], comments = [];
        await Promise.all(mod_categories.map(async (category) => {
            try {
                let where = {}
                if (category != '*') where = { category, ispost: true }
                // get all reported posts of that category
                const reported_post_ids = await Report.findAll({
                    attributes: ['reportedid'],
                    where
                })

                if (reported_post_ids.length == 0) return;

                return await Promise.all(reported_post_ids.map((itm) => {
                    post_ids.push(itm.dataValues.reportedid)
                }))
            } catch (err) {
                console.log(err)
            }
        }))

        await Promise.all(mod_categories.map(async (category) => {
            try {
                let where = {}
                if (category != '*') where = { category, ispost: false }
                // get all reported comments of that category
                const reported_comment_ids = await Report.findAll({
                    attributes: ['reportedid'],
                    where
                })

                if (reported_comment_ids.length == 0) return;

                return await Promise.all(reported_comment_ids.map((itm) => {
                    comment_ids.push(itm.dataValues.reportedid)
                }))
            } catch (err) {
                console.log(err)
            }
        }))

        await Promise.all(post_ids.map(async (postid) => {
            try {
                const post = await Post.findOne({
                    where: {
                        id: postid
                    }
                })

                if (post != null)
                    posts.push(post.dataValues)
            } catch (err) {
                console.log(err);
            }
        }))

        await Promise.all(comment_ids.map(async (commentid) => {
            try {
                const comment = await Comment.findOne({
                    where: {
                        id: commentid
                    }
                })

                if(comment != null)
                    comments.push(comment.dataValues)
            } catch (err) {
                console.log(err);
            }
        }))

        return res.status(200).json({ posts, comments })
    }
}
