const { Comment, Report } = require('../models')

module.exports = {
    removeCommentHandler: async (req, res) => {
        const { commentid } = req.body;

        try {
            const comment = await Comment.findOne({
                where: {
                    commentid
                }
            })

            const id = comment.dataValues.id
            try {
                await Comment.destroy({
                    where: {
                        id
                    }
                })

                // checks and removes a report if with id exists
                try {
                    await Report.destroy({
                        where: {
                            reportedid: id,
                            ispost: false
                        }
                    })

                    return res.json({})
                } catch (err) {
                    console.log(err)
                    return res.status(500).json({ error: "Error in removing Comment!" })
                }
            } catch (err) {
                console.log(err)
                return res.status(500).json({ error: "Error in removing Comment!" })
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Error in removing Comment!" })
        }
    }
}