const { Report, Post, Comment } = require('../models')

module.exports = {
    removeReportHandler: async (req, res) => {
        const { reportedid, ispost } = req.body;

        try {
            let reported_id;

            if (ispost) {
                const post = await Post.findOne({
                    where: {
                        postid: reportedid
                    }
                })

                if (post == null) return res.status(200).json({ error: "Invalid Reported id!" })
                else reported_id = post.dataValues.id

            } else {
                const comment = await Comment.findOne({
                    where: {
                        commentid: reportedid
                    }
                })

                if (comment == null) return res.status(200).json({ error: "Invalid Reported id!" })
                else reported_id = comment.dataValues.id
            }

            try {
                Report.destroy({
                    where: {
                        reportedid: reported_id,
                        ispost
                    }
                })

                return res.json({})
            } catch (err) {
                console.log(err)
                return res.status(500).json({ error: "Error in removing Report!" })
            }

        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Error in removing Report!" })
        }
    }
}