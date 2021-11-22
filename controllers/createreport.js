const { Report, Post, Comment } = require('../models')

module.exports = {
    createReportHandler: async (req, res) => {
        const { reportedid, category, ispost } = req.body
        // find the id corresponding to reportedid
        let reported_id;
        if (ispost) {
            try {
                const PostResult = await Post.findOne({
                    where: {
                        postid: reportedid,
                        category
                    }
                })

                if (PostResult == null) return res.status(400).json({ error: "Invalid reportedid!" })
                reported_id = PostResult.id;
            } catch (err) {
                console.log(err)
                return res.status(500).json({ error: "Failed to report!" })
            }
        } else {
            try {
                const CommentResult = await Comment.findOne({
                    where: {
                        commentid: reportedid
                    }
                })

                if (CommentResult == null) return res.status(400).json({ error: "Invalid reportedid!" })
                reported_id = CommentResult.id;
            } catch (err) {
                console.log(err)
                return res.status(500).json({ error: "Failed to report!" })
            }
        }
        
        // valid reportedid
        // create the report
        try {
            await Report.create({ reportedid: reported_id, category, ispost })
            return res.status(200).json({});
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to report!" })
        }
    }
}
